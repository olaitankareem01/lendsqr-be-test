
import { Request, Response } from "express";
import { Service } from "typedi";
import CreateUserDto from "../models/dtos/CreateUserDto";
import AccountService from "../services/AccountService";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import FundWalletDto from "../models/dtos/fundWalletDto";
import WithdrawalDto from "../models/dtos/WithdrawalDto";
import TransferFundDto from "../models/dtos/TransferFundDto";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const acctService = new AccountService();

// @Service()
export default class AccountController {
  // constructor(private readonly userService: UserService) { }


  async createAccount(req:Request, res: Response){


    const { email,password,firstName,lastName } = req.body;

      if(email && password && firstName && lastName){
        

          const acctFound = await acctService.findAccount(email);
          
          if(acctFound != undefined && acctFound.length > 0){
            return res.json({
              status: 400,
              message:"Account already exist"
            });
          }
         const  hashedPassword = await bcrypt.hash(password,10);
        
         const newUser:CreateUserDto = {
          email:email,
          firstName:firstName,
          lastName: lastName,
          password:hashedPassword
         }

         const userCreated = await acctService.createAccount(newUser);
     
         if(userCreated){
           return res.json({
             status: 200,
             message:"your Account has been successfully created"
           });
         }
         else{
          return res.json({
            status: 500,
            message:"something went wrong"
          });
         }
      }
      else{
        return res.json({
          status: 400,
          message:"invalid input"
        });
      }
    
  }


  async fundAccount(req:Request, res: Response){
    const { email,amount,currency,card_number,cvv,expiry_month,expiry_year,pin} = req.body;

    if(email && amount && currency && card_number && cvv  && expiry_month && expiry_year && pin){
      // const userBalance:number = await acctService.checkBalance(email);

      // if(userBalance != undefined && userBalance < amount){
      //   return res.json({
      //     status: 400,
      //     message:"Insufficient Fund"
      //   });
      // }

      const acctFound = await acctService.findAccount(email);
          
      if(acctFound === undefined || acctFound.length <= 0){
        return res.json({
          status: 400,
          message:"No Account found with this email"
        });
      }
      const fund: FundWalletDto = {
        email: email,
        amount: amount,
        currency:currency,
        cardNumber:card_number,
        cvv: cvv,
        expiryMonth:expiry_month,
        expiryYear:expiry_year,
        pin: pin
      }

      const fundedAccount = await acctService.fundAccount(fund);
    
      if(fundedAccount !== null){
        return res.json({
          status: 200,
          message:`your Account has been successfully funded and your new balance is ${fundedAccount}`
        });
      }
      else{
        return res.json({
          status: 500,
          message:"something went wrong"
        });
       }
    }
    else{
      return res.json({
        status: 400,
        message:"All fields are required"
      });
    }

  }


  async withdraw(req:Request, res:Response){

    const { email,account_bank,account_number,amount,beneficiary_name} = req.body;

    if(email && amount && account_bank && account_number && amount && beneficiary_name){

      const userBalance:number = await acctService.checkBalance(email);

      if(userBalance != undefined && userBalance < amount){
        return res.json({
          status: 400,
          message:"Insufficient Fund"
        });
      }

      const acctFound = await acctService.findAccount(email);
          
      if(acctFound === undefined || acctFound.length <= 0){
        return res.json({
          status: 400,
          message:"No Account found with this email"
        });
      }
      const withdrawal: WithdrawalDto = {
        email: email,
        amount: amount,
        accountBank:account_bank,
        accountNumber:account_number,
        beneficiaryName:beneficiary_name
      }

      const withdraw = await acctService.withdrawFromAccount(withdrawal)
    
      if(withdraw !== null){
        return res.json({
          status: 200,
          message:`your withdrawal was successful and your new balance is ${withdraw}`
        });
      }
      else{
        return res.json({
          status: 500,
          message:"something went wrong"
        });
       }
    }
    else{
      return res.json({
        status: 400,
        message:"All fields are required"
      });
    }
  }


  async transferFund(req:Request, res:Response){
    
    const { email,recipient_walletId,amount} = req.body;

    if(email && amount && recipient_walletId){

      
      const acctFound = await acctService.findAccount(email);
          
      if(acctFound === undefined || acctFound.length <= 0){
        return res.json({
          status: 400,
          message:"No Account found with this email"
        });
      }

      const recipientWallet = await acctService.verifyWallet(recipient_walletId);
          
      if(recipientWallet === null){
        return res.json({
          status: 400,
          message:"Invalid Wallet address"
        });
      }

      const userBalance:number = await acctService.checkBalance(email);

      if(userBalance != undefined && userBalance < amount){
        return res.json({
          status: 400,
          message:"Insufficient Fund"
        });
      }

      const transfer: TransferFundDto = {
        email:email,
        recipientWalletId:recipient_walletId,
        amount:amount
      }

      const  fundTransfer = await acctService.transferFund(transfer)
    
      if(fundTransfer !== null){
        return res.json({
          status: 200,
          message:`your have successfully transferred ${amount} to ${recipientWallet.firstName} ${recipientWallet.lastName} and your new balance is ${fundTransfer.senderBalance}`
        });
      }
      else{
        return res.json({
          status: 500,
          message:"something went wrong"
        });
       }
    }
    else{
      return res.json({
        status: 400,
        message:"All fields are required"
      });
    }
  }


  async login(req:Request,res:Response){

    let { email, password } = req.body;
     console.log(req.body);
    if (!(email && password)) {
      return res.status(400).json({
        status:400,
        message: "email and password are required"
      });
    }


    const acctFound = await acctService.findAccount(email);
      console.log(acctFound);
    if(acctFound === undefined || acctFound.length <= 0){
      return res.status(401).json({
        status: 401,
        message:"No Account found with this credentials"
      });
    }

    const validPassword = bcrypt.compareSync(password, acctFound[0].password);
     
     if (!validPassword) {
       return res.status(401).send({
        status: 401,
        message:"No Account found with this credentials"
      });
     }

     const token = jwt.sign(
      { userId: acctFound[0].id, email: acctFound[0].email },
      jwtSecret,
      { expiresIn: "1h" }
    );

  
    res.status(200).json({
      status: 200,
      token: token
    })
  
  };
}




 