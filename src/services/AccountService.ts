
import { Service } from "typedi";
import UserRepository from "../repositories/UserRepository";
import CreateUserDto  from "../models/dtos/CreateUserDto";
const userRepository:UserRepository = new UserRepository();
import WalletRepository from "../repositories/WalletRepository";
const walletRepository:WalletRepository = new WalletRepository();
import Wallet from "../models/Wallet";
import {v4 as uuidv4} from 'uuid';
import FundWalletDto from "../models/dtos/fundWalletDto";
import TransactionService from "../services/TransactionService";
import WithdrawalDto from "../models/dtos/WithdrawalDto";
import TransferFundDto from "../models/dtos/TransferFundDto";
const transactionService  = new TransactionService();




// @Service()
export default  class AccountService {



  async createAccount(user:CreateUserDto): Promise<boolean> {
   
    const createdUser = await userRepository.registerUser(user);

     if(createdUser != undefined && createdUser.length > 0){
        
      let newWalletId = uuidv4();

       const newWallet:Wallet = {
         walletId:newWalletId,
         balance:0.00,
         userId:createdUser[0]
       }

       // creates a wallet 
      const createdWallet = await walletRepository.createWallet(newWallet);

      if(createdWallet != undefined && createdWallet.length > 0){
           return true;
      }

     }
   
    return false;

  }



  async findAccount(email:string): Promise<any> {

    const userFound = await userRepository.findUserByEmail(email);
    return userFound
  
  }


  async fundAccount(fundWalletDto:FundWalletDto):Promise<any>{
    const user = await userRepository.findUserByEmail(fundWalletDto.email);
    const wallet = await walletRepository.findWalletByUserId(user[0].id);
     
    const payment = await transactionService.chargeCard(fundWalletDto);
     if(payment.success === true){
      let newBalance = Number(wallet[0].balance) + Number(fundWalletDto.amount);
       await walletRepository.updateBalance(newBalance,user[0].id);
       return newBalance;
     }
    return null;  
  }
 

  async checkBalance(email:string):Promise<number>{

    const user = await userRepository.findUserByEmail(email);

    if(user != undefined && user.length > 0){
       const userWallet = await walletRepository.findWalletByUserId(user[0].id);
       if(userWallet != undefined && userWallet.length > 0){
         return userWallet[0].balance;
       }
    }
  }


  async withdrawFromAccount(data:WithdrawalDto):Promise<any>{

    const user = await userRepository.findUserByEmail(data.email);
    const wallet = await walletRepository.findWalletByUserId(user[0].id);
    const payment = await transactionService.transferToBank(data);
    
     if(payment !== undefined){
      let newBalance = Number(wallet[0].balance) - Number(data.amount);
       await walletRepository.updateBalance(newBalance,user[0].id);
       return newBalance;
      }
      return null; 
  }


  async transferFund(transfer:TransferFundDto):Promise<any>{
    const user = await userRepository.findUserByEmail(transfer.email);
    const senderWallet = await walletRepository.findWalletByUserId(user[0].id);
    const recipientWallet = await walletRepository.findWallet(transfer.recipientWalletId);
    // const payment = await transactionService.transferToBank(data);
    
    //  if(payment !== undefined){
      let newSenderBalance = Number(senderWallet[0].balance) - Number(transfer.amount);
      let newReceiverBalance = Number(recipientWallet[0].balance) + Number(transfer.amount);
      let senderBalanceUpdated =  await walletRepository.updateBalance(newSenderBalance,user[0].id);
      let  recipientBalanceUpdated = await walletRepository.updateBalance(newReceiverBalance,recipientWallet[0].userId);
      
      if(senderBalanceUpdated != undefined && recipientBalanceUpdated != undefined){
        return {
          senderBalance: newSenderBalance
        }
      }

      return null;
  }



  async verifyWallet(walletId:string):Promise<any>{
    const wallet = await walletRepository.findWallet(walletId);

    if(wallet != undefined && wallet.length > 0){

      let owner = await userRepository.findById(wallet[0].userId);
      return {
        firstName:owner[0].firstName,
        lastName: owner[0].lastName
      }
    }

    return null;

  }

}

