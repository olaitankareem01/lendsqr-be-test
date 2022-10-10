
import { Service } from "typedi";
import { db } from "../database/db";
import CreateTransactionDto from "../models/dtos/CreateTransactionDto";
import Transaction from "../models/Transaction";

@Service()
class TransactionRepository {
  
    
    async createTransaction(transaction: CreateTransactionDto):Promise<any>{
      
      return await db('transaction').insert({
                        transactionRef: transaction.transactionRef,
                        paymentRef: transaction.paymentRef,
                        summary: transaction.summary,
                        userId: transaction.userId,
                        description: transaction.description
                    });
    }

    async findBytransactionRef(transactionRef:string) : Promise<any>{

      return await db('transaction').where('transactionRef','=',`${transactionRef}`);
    }
  

}

export default TransactionRepository;