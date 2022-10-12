import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import {faker} from '@faker-js/faker';
import CreateUserDto from '../../src/models/dtos/CreateUserDto';
import UserRepository from '../../src/repositories/UserRepository';
import { db } from "../../src/database/db";
import AccountController from "../../src/controllers/AccountController"
import AccountService from '../../src/services/AccountService'
import TransactionService from '../../src/services/TransactionService'
const acctController = new AccountController();
const acctService = new AccountService();
const transactService = new TransactionService();

describe("AccountController", () => {
    describe("login", () => {
      const sandbox = sinon.createSandbox();
      let status:any, json:any, res:any;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
      });

      afterEach(function () {
        sinon.restore();
        sandbox.restore();
      });
  

  
      it("should  return 400 if email or password is missing", async () => {
        // Arrange
        const Value = [];
          const req:any = { body: {} };
         const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
        // Act
        const response = await acctController.login(req, res);
    
        // Assert
        expect(status.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(400);
      });
       

      
      it("should  return 401 if email is valid but password is not valid", async () => {
        // Arrange
        const Value = [
            {
            id: 25,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: "ade@gmail.com",
            password: faker.name.lastName(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.past()
            }
          ];
          const req:any = { body: {email:"ade@gmail.com", password:"ade"} };
         const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
        // Act
        const response = await acctController.login(req, res);
    
        // Assert
        expect(status.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(401);
      });
      

     
      
  
    });



    describe("create account", () => {
        const sandbox = sinon.createSandbox();
        let status:any, json:any, res:any;
        beforeEach(() => {
          status = sinon.stub();
          json = sinon.spy();
          res = { json, status };
          status.returns(res);
        });
  
        afterEach(function () {
          sinon.restore();
          sandbox.restore();
        });
    
  
    
        it("should  return 400 if required parameter are missing", async () => {
          // Arrange
          const Value = [];
            const req:any = { body: {} };
           const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.createAccount(req, res);
      
          // Assert
          expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(400);
        });


        it("should  return 400 if account already exist", async () => {
            // Arrange
            const  Value = [
                {
                id: 25,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: "ade@gmail.com",
                password: faker.name.lastName(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past()
                }
              ];

              const req:any = { body: {   
                email:"ade@gmail.com",
                firstName:"ade",
                lastName: "lola",
                password:"lola"} };
             const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
            // Act
            const response = await acctController.createAccount(req, res);
        
            // Assert
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
          });
         
          it("should  return 200 if account creation is successful", async () => {
            // Arrange
            const account = [];
            const  Value =   {
                                success:true,
                                walletId:"j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi"
                            }
            
               sinon.stub(acctService, "findAccount").returns(Promise.resolve(account));

              const req:any = { body: {   
                email:"olu@gmail.com",
                firstName:"ade",
                lastName: "lola",
                password:"lola"} };
             const stub = sinon.stub(acctService, "createAccount").returns(Promise.resolve(Value));
            // Act
            const response = await acctController.createAccount(req, res);
        
            // Assert
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
          });
         
    
      });



      describe("withdraw method", () => {
        const sandbox = sinon.createSandbox();
        let status:any, json:any, res:any;
        beforeEach(() => {
          status = sinon.stub();
          json = sinon.spy();
          res = { json, status };
          status.returns(res);
        });
  
        afterEach(function () {
          sinon.restore();
          sandbox.restore();
        });
    
  
    
        it("should  return 400 if required parameter are missing", async () => {
          //Arrange
          // const Value = [];
            const req:any = { body: {} };
          //  const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.withdraw(req, res);
      
          // Assert
          // expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(400);
        });


        it("should  return 400 if email is invalid", async () => {
          //Arrange
          const Value = [
            {
              id: 51,
              firstName: 'ade',
              lastName: 'lola',
              email: 'ade@gmail.com',
              password: '$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi',
              IsDeleted: 0   
            }
          ];
            const req:any = { body: {
                    email:faker.internet.email(),     
                    amount:3000,
                    account_bank:"044",
                    beneficiary_name:"kareem abd-rahman",
                    account_number:"0978765654"
            } };
           const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.withdraw(req, res);
      
          // Assert
          // expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(400);
        });

        it("should  return 400 if account balance is insufficient", async () => {
          //Arrange
          const Value = [
            {
              id: 51,
              firstName: 'ade',
              lastName: 'lola',
              email: 'ade@gmail.com',
              password: '$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi',
              IsDeleted: 0   
            }
          ];
          const balance = 3000;
          const req:any = { body: {
                  email:faker.internet.email(),     
                  amount:4000,
                  account_bank:"044",
                  beneficiary_name:"kareem abd-rahman",
                  account_number:"0978765654"
          } };
            
          sinon.stub(acctService, "checkBalance").returns(Promise.resolve(balance));
          const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.withdraw(req, res);
      
          // Assert
          expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(400);
        });

   
        it("should  return 200 if withdrawal is successful", async () => {
          //Arrange
          const Value = [
            {
              id: 51,
              firstName: 'ade',
              lastName: 'lola',
              email: 'ade@gmail.com',
              password: '$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi',
              IsDeleted: 0   
            }
          ];
          const balance = 3000;
          const req:any = { body: {
                  email:'ade@gmail.com',     
                  amount:2000,
                  account_bank:"044",
                  beneficiary_name:"kareem abd-rahman",
                  account_number:"0978765654"
          } };
          
          const newBalance = 1000;
          sinon.stub(acctService, "checkBalance").returns(Promise.resolve(balance));
          sinon.stub(acctService, "withdrawFromAccount").returns(Promise.resolve(newBalance));
          const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.withdraw(req, res);
      
          // Assert
          expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(200);
        });

        

       
      
  
       
        
    
      });

     
      describe("transfer method", () => {
        const sandbox = sinon.createSandbox();
        let status:any, json:any, res:any;
        beforeEach(() => {
          status = sinon.stub();
          json = sinon.spy();
          res = { json, status };
          status.returns(res);
        });
  
        afterEach(function () {
          sinon.restore();
          sandbox.restore();
        });
    

        it("should  return 400 if email is invalid", async () => {
          //Arrange
          const Value = [];
            const req:any = { body: {
              
                email:"kad@gmail.com",
                 amount:30000000,
                 recipient_walletId:"4a4bba47-39dd-43dd-bbd4-b8d8cbee75df"
            
            } };
           const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.transferFund(req, res);
      
          // Assert
          // expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(400);
        });

        it("should  return 400 if wallet address is invalid", async () => {
          //Arrange
          const Value = [
            {
              id: 51,
              firstName: 'ade',
              lastName: 'lola',
              email: 'ade@gmail.com',
              password: '$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi',
              IsDeleted: 0   
            }
          ];
          const balance = 3000;
          const req:any = { body : {
            email:"kad@gmail.com",
             amount:30000000,
             recipient_walletId:"4a4bba47-39dd-43dd-bbd4-b8d8cbee75df"
        }  };
          
          const recipientWallet = null;

          sinon.stub(acctService, "verifyWallet").returns(Promise.resolve(null));
          sinon.stub(acctService, "checkBalance").returns(Promise.resolve(balance));
          const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          // Act
          const response = await acctController.withdraw(req, res);
      
          // Assert
          expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(400);
        });


        it("should  return 200 if transfer is successful", async () => {
          //Arrange
          const Value = [
            {
              id: 51,
              firstName: 'ade',
              lastName: 'lola',
              email: 'ade@gmail.com',
              password: '$2b$10$7ji4dzaDsM.j4kNzHkDpUOldzBs3r2Y9M8mWYT7KGI6Y.RnW65RQi',
              IsDeleted: 0   
            }
          ];
          const balance = 3000;
          const req:any = { body : {
            email:"ade@gmail.com",
             amount:1000,
             recipient_walletId:"4a4bba47-39dd-43dd-bbd4-b8d8cbee75df"
        }  };
          
          const recipientWallet =  {
            firstName:"ade",
            lastName: "kola"
          }

          const transfer =  {
            senderBalance: 2000
          }

          const stub = sinon.stub(acctService, "findAccount").returns(Promise.resolve(Value));
          sinon.stub(acctService, "verifyWallet").returns(Promise.resolve(recipientWallet));
          sinon.stub(acctService, "checkBalance").returns(Promise.resolve(balance));
          sinon.stub(acctService, "transferFund").returns(Promise.resolve(transfer));
          // Act
          const response = await acctController.withdraw(req, res);
      
          // Assert
          expect(status.calledOnce).to.be.true;
          expect(status.args[0][0]).to.equal(200);
        });

   
      
        

       
      
  
       
        
    
      });



  });




//       let status json, res, userController, userService;
//       beforeEach(() => {
//         status = sinon.stub();
//         json = sinon.spy();
//         res = { json, status };
//         status.returns(res);
//         const userRepo = sinon.spy();
//         userService = new UserService(userRepo);
//       });
//       it("should not register a user when name param is not provided", async function() {
//         const req = { body: { email: faker.internet.email() } };
//         await new UserController().register(req, res);
//         expect(status.calledOnce).to.be.true;
//         expect(status.args\[0\][0]).to.equal(400);
//         expect(json.calledOnce).to.be.true;
//         expect(json.args\[0\][0].message).to.equal("Invalid Params");
//       });
//       it("should not register a user when name and email params are not provided", async function() {
//         const req = { body: {} };
//         await new UserController().register(req, res);
//         expect(status.calledOnce).to.be.true;
//         expect(status.args\[0\][0]).to.equal(400);
//         expect(json.calledOnce).to.be.true;
//         expect(json.args\[0\][0].message).to.equal("Invalid Params");
//       });
//       it("should not register a user when email param is not provided", async function() {
//         const req = { body: { name: faker.name.findName() } };
//         await new UserController().register(req, res);
//         expect(status.calledOnce).to.be.true;
//         expect(status.args\[0\][0]).to.equal(400);
//         expect(json.calledOnce).to.be.true;
//         expect(json.args\[0\][0].message).to.equal("Invalid Params");
//       });
//       it("should register a user when email and name params are provided", async function() {
//         const req = {
//           body: { name: faker.name.findName(), email: faker.internet.email() }
//         };
//         const stubValue = {
//           id: faker.random.uuid(),
//           name: faker.name.findName(),
//           email: faker.internet.email(),
//           createdAt: faker.date.past(),
//           updatedAt: faker.date.past()
//         };
//         const stub = sinon.stub(userService, "create").returns(stubValue);
//         userController = new UserController(userService);
//         await userController.register(req, res);
//         expect(stub.calledOnce).to.be.true;
//         expect(status.calledOnce).to.be.true;
//         expect(status.args\[0\][0]).to.equal(201);
//         expect(json.calledOnce).to.be.true;
//         expect(json.args\[0\][0].data).to.equal(stubValue);
//       });
//     });
//   });