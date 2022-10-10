import   AccountService from "../../src/services/AccountService";
import AccountController from '../../src/controllers/AccountController';
import request from "supertest";
import { app } from "../../src/app";
// import { mocked } from 'ts-jest/utils';
import type { Request, Response } from 'express';

const acctController = new AccountController();
const acctService  = new AccountService();






 
describe("Login endpoint tests",  () => {
    beforeEach(() =>{
        jest.resetAllMocks();
    });

    
    test("it should return email and password are required when email or password is missing", async () => {
        jest.setTimeout(40000);
        const mReq = ({body:{}} as unknown) as Request;
        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;
        await acctController.login(mReq,mRes)
        expect(mRes.status).toBeCalledWith(400);
        expect(mRes.json).toBeCalledWith({ status:400, message:"email and password are required"});
    });

    test("it should return no account found when email or password is invalid", async () => {
        jest.setTimeout(40000);
        
        const mockResponse =  [];
           
        acctService.findAccount = jest.fn().mockResolvedValue(mockResponse);
    
        const mReq = ({body:{email:"ola@gmail.com", password:"ola"}}  as unknown) as Request;
        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        await acctController.login(mReq,mRes)
        expect(acctService.findAccount).toBeCalledWith("ola@gmail.com");
        expect(mRes.status).toBeCalledWith(401);
        expect(mRes.json).toBeCalledWith({ status:401, message:"No Account found with this credentials"});
    });

    test("it should return 200  when email and password is valid", async () => {
       
        
        jest.setTimeout(40000);
            //Arrange
            
             const email = "ade@gmail.com";

        // acctService.findAccount = jest.fn().mockResolvedValue(mockResponse);
        // jest.spyOn(acctService, 'findAccount').mockResolvedValue(mockResponse);
        
        acctService.findAccount = jest.fn();
        const mockedFunction = jest.mock('../../src/services/AccountService', () => {
            return {
            findAccount: jest.fn((email:string) => {
                    console.log('Test');
                    return Promise.resolve( [
                        {
                            id:1,
                            email:"ade@gmail.com",
                            firstName:"rahman",
                            lastName:"kareem",
                            password:"$2b$10$mdbHbI2MjXrVHWIZ9YkpxOv.R/M4bNNR88mkD0CMN48wQ2ZsnRmV."
                        }
                    ]);
                })

            };
        });

        const mReq = ({body:{email:"ade@gmail.com", password:"ola"}} as unknown) as Request;
        const mRes = ({ status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown) as Response;

        //Act
        await acctController.login(mReq,mRes);

        //Assert
        // expect(jest.mocked(mockedFunction)).toHaveBeenCalledTimes(1);
        // expect(acctService.findAccount).toHaveBeenCalledWith(email)
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.json).toBeCalledWith({ status:200, token:""});
    });





  });

