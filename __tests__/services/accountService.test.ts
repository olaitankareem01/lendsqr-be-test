import { expect } from 'chai';
import sinon from 'sinon';
// import * as faker from 'faker';
import {faker} from '@faker-js/faker';
import CreateUserDto from '../../src/models/dtos/CreateUserDto';
import AccountService from '../../src/services/AccountService';
import UserRepository from '../../src/repositories/UserRepository';
import WalletRepository from '../../src/repositories/WalletRepository';
import { db } from "../../src/database/db";

const acctService = new AccountService();
const userRepo = new UserRepository();
const walletRepo = new WalletRepository();
describe("UserService", function() {


  const record = {
  
    firstName: "rahman",
    lastName: "kaeem",
    email: "kunle@gmail.com",
    password: "ola"   
  }


  describe("account service test", function() {
    

    describe("find account", () => {
      const sandbox = sinon.createSandbox();
      

      afterEach(function () {
        sinon.restore();
        sandbox.restore();
      });
  

  
      it("should  return empty array if account is not found ", async () => {
        // Arrange
        const Value = [];
         
         const stub = sinon.stub(userRepo, "findUserByEmail").returns(Promise.resolve(Value));
        // Act
        const response = await acctService.findAccount("")
    
        // Assert
      
        expect(response.length).to.equal(0);
      });


      
      it("should  return account if account is  found ", async () => {
        // Arrange
        const Value = [
          {
               email: "ade@gmail.com",
               firstName: "ade",
               id: 51,
               lastName: "lola",
               password: "$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi"
                
           }
        ];
         
         const stub = sinon.stub(userRepo, "findUserByEmail").returns(Promise.resolve(Value));
        // Act
        const response = await acctService.findAccount("ade@gmail.com");
    
        // Assert
      
        expect(response.length).to.equal(1);
        expect(response[0].email).to.equal("ade@gmail.com");
      });
       

      
     

     
      
  
    });


    describe("check balance method", () => {
      const sandbox = sinon.createSandbox();
      

      afterEach(function () {
        sinon.restore();
        sandbox.restore();
      });
  


      
      it("should  return account balance ", async () => {
        // Arrange
        const Value = [
          {
               email: "ade@gmail.com",
               firstName: "ade",
               id: 51,
               lastName: "lola",
               password: "$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi"
                
           }
        ];
         
        const wallet = [ {
          balance: '0.00'
        } ];
         
        sinon.stub(userRepo, "findUserByEmail").returns(Promise.resolve(Value));
        sinon.stub(walletRepo, "findWalletByUserId").returns(Promise.resolve())
        // Act
        const response = await acctService.checkBalance("ade@gmail.com")
    
        // Assert
      
        expect(response).to.equal(wallet[0].balance);
        
      });
       

      
     

     
      
  
    });

    describe("verify wallet method", () => {
      const sandbox = sinon.createSandbox();
      

      afterEach(function () {
        sinon.restore();
        sandbox.restore();
      });
  


      
      it("should  return owner's name if found ", async () => {
        // Arrange
        const Value = [
          {
               email: "ade@gmail.com",
               firstName: "ola",
               id: 51,
               lastName: "lola",
               password: "$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi"
                
           }
        ];
         
        const wallet = [ {
          balance: '0.00',
          userId: 51
        } ];
        
        sinon.stub(walletRepo, "findWallet").returns(Promise.resolve(wallet))
        sinon.stub(userRepo, "findById").returns(Promise.resolve(Value));
     
        // Act
        const response = await acctService.verifyWallet("4a4bba47-39dd-43dd-bbd4-b8d8cbee75df")
    
        // Assert
      
        expect(response.firstName).to.equal(Value[0].firstName);
        
      });
       

      it("should  return null  if not found ", async () => {
        // Arrange
        const Value = [
          {
               email: "ade@gmail.com",
               firstName: "ola",
               id: 51,
               lastName: "lola",
               password: "$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi"
                
           }
        ];
         
        const wallet = [];
        
        sinon.stub(walletRepo, "findWallet").returns(Promise.resolve(wallet))
        sinon.stub(userRepo, "findById").returns(Promise.resolve(Value));
     
        // Act
        const response = await acctService.verifyWallet("4a4bba47-39dd-43dd-bbd4-b8d8cbeedf")
    
        // Assert
      
        expect(response).to.equal(null);
        
      });
     

     
      
  
    });


  });
});