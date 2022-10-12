
import { Service } from "typedi";
import UserRepository from "../repositories/UserRepository";
const userRepository:UserRepository = new UserRepository();
import TransactionRepository from "../repositories/TransactionRepository";
const transactRepository:TransactionRepository = new TransactionRepository();
import FundWalletDto  from "../models/dtos/FundWalletDto";
import axios from "axios";
import forge from 'node-forge';
import dotenv from "dotenv";
import CreateTransactionDto from "../models/dtos/CreateTransactionDto";
import WithdrawalDto from "../models/dtos/WithdrawalDto";


dotenv.config();

const secretKey:string = process.env.FLUTTERWAVE_SECRET_KEY;
const encryptionKey:string  = process.env.FLUTTERWAVE_ENCRYPTION_KEY;
const baseUrl:string = process.env.FLUTTERWAVE_BASE_URL;
const testBankAcct:string = process.env.TEST_BANKACCT;
const testBankCode:string = process.env.TEST_BANKCODE



@Service()
class TransactionService {

    
//withdrawal
 async transferToBank(data:WithdrawalDto){
    try {
    

      let transferData = {
        account_bank:testBankCode,
        account_number:testBankAcct,
        amount:data.amount,
        currency:"NGN",
        tx_ref:"MC-" + Date.now()
      }
      let encryptData = {
        client: this.encrypt(JSON.stringify(transferData))
      }
      const endpoint = `${baseUrl}/v3/transfers`
      let response = await axios.post(endpoint, encryptData, {
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      });

      return {
        success: true
      }
      //the  available test account being used doesn't have enough permissions to complete transfers
    }
    catch (err){
     
      return {
        success: false
      }
    }
   

  }



//deposit
async chargeCard (data:FundWalletDto){

    try {

      let chargeData = {
        amount:data.amount,
        currency:data.currency,
        card_number:data.cardNumber,
        cvv: data.cvv,
        expiry_month:data.expiryMonth,
        expiry_year:data.expiryYear,
        email:data.email,
        tx_ref:"MC-" + Date.now(),
        authorization: {
          mode: 'pin',
          pin: data.pin
        }
      }

      let encryptData = {
        client: this.encrypt(JSON.stringify(chargeData))
      }
      const endPoint = `${baseUrl}/v3/charges?type=card`

      let response = await axios.post(endPoint, encryptData, {
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      })
      const acctFound = await userRepository.findUserByEmail(data.email);
      const chargeValidated = await this.validateCharge(response.data.data.flw_ref);
       
      if(chargeValidated.success === true){
        const transaction:CreateTransactionDto = {
          transactionRef:response.data.data.tx_ref,
          paymentRef:response.data.data.flw_ref,
          summary: "credit",
          description:"",
          userId:acctFound[0].id
  
        }
        
        await this.createTransaction(transaction);

        return {
          success: true,
          ...response.data
        }

      }
    

    }
    catch (err){
     
      return {
        success: false,
        ...err.response.data
      }
    }
  }

  async createTransaction(transaction:CreateTransactionDto){
    return await transactRepository.createTransaction(transaction);
  }


  private async validateCharge (flwRef){
        try {
        
    
          let validateData = {
            otp:12345,
            flw_ref:flwRef
          }
    
          const endpoint = `${baseUrl}/v3/validate-charge`
          let response = await axios.post(endpoint, validateData, {
            headers: {
              Authorization: `Bearer ${secretKey}`
            }
          })
          return {
            success: true,
            ...response.data
          }
        }
        catch (err){
          return {
            success: false,
            ...err.response.data
          }
        }
      }
    

      
   private encrypt(text) {
    let key = encryptionKey
    let cipher = forge.cipher.createCipher(
      "3DES-ECB",
      forge.util.createBuffer(key)
    );
    cipher.start({ iv: "" });
    cipher.update(forge.util.createBuffer(text, "utf-8"));
    cipher.finish();
    let encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
    }

}

export default TransactionService;