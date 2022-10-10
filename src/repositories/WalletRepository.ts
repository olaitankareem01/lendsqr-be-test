
import { Service } from "typedi";
import Wallet from "../models/Wallet";
import { db } from "../database/db";


@Service()
class WalletRepository {
  
 
  async createWallet(wallet:Wallet):Promise<any>{
      return await db('wallet').insert({
                          walletId: wallet.walletId,
                          balance: wallet.balance,
                          userId:wallet.userId
                        });
       }

  async findWallet(walletId:string){
    return await db('wallet').where('walletId','=',`${walletId}`);
  }

  async findWalletByUserId(userId:number){
    return await db('wallet').where('userId','=',`${userId}`);
  }

  async updateBalance(balance:number, userId:number){
    return db('wallet').update('balance',balance).where('userId',userId);
 }

}

export default WalletRepository;