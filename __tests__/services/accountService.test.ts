import   AccountService from "../../src/services/AccountService";
import type { Request, Response } from 'express';

import UserRepository from "../../src/repositories/UserRepository";
const acctService  = new AccountService();
const  userRepo = new UserRepository();


 
// describe("find account service method test",  () => {
//     beforeEach(() =>{
//         jest.resetAllMocks();
//     });

    
//     test("it should return email and password are required when email or password is missing", async () => {
//         jest.setTimeout(40000);
//         const email = "ade@gmail.com";
//             const mockResponse =  [
//                         {
//                             id:1,
//                             email:"ade@gmail.com",
//                             firstName:"rahman",
//                             lastName:"kareem",
//                             password:"$2b$10$mdbHbI2MjXrVHWIZ9YkpxOv.R/M4bNNR88mkD0CMN48wQ2ZsnRmV."
//                         }
//                        ];

//         // acctService.findAccount = jest.fn().mockResolvedValue(mockResponse);
//         jest.spyOn(userRepo, 'findUserByEmail').mockImplementationOnce((email:string) => { 
//             return mockResponse
//         });
//          const result = await acctService.findAccount("ade@gmail.com");
//         expect(result.length).toEqual(1);
//         // expect(mRes.json).toBeCalledWith({ status:400, message:"email and password are required"});
//     });


  




//   });

