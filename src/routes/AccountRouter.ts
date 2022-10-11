
import express, { Request, Response } from 'express';
import Container from 'typedi';
import AccountController from "../controllers/AccountController";
import { auth } from '../middlewares/Auth'
const acctController = new AccountController();

// const acctController = Container.get(AccountController);

export const accountRoute = express.Router();


accountRoute.post('/v1/account/login', async(req:Request, res:Response) => acctController.login(req, res));
accountRoute.post('/v1/account/create', async(req:Request, res:Response) => acctController.createAccount(req, res));
accountRoute.post('/v1/account/fund',auth, async(req:Request, res:Response) => acctController.fundAccount(req, res));
accountRoute.post('/v1/account/withdraw',auth, async(req:Request, res:Response) => acctController.withdraw(req, res));
accountRoute.post('/v1/account/transfer',auth, async(req:Request, res:Response) => acctController.transferFund(req, res));


