
import { Service } from "typedi";
import User from "../models/User";
import { db } from "../database/db";
import { knex, Knex } from "knex";
import CreateUserDto from "../models/dtos/CreateUserDto";

@Service()
class UserRepository {


  async registerUser(user:CreateUserDto):Promise<any>{
      
    return await db('user').insert({
                  lastName:user.lastName,
                  firstName:user.firstName,
                  email:user.email,
                  password: user.password
                });
    
  }

  async findUserByEmail(email:string): Promise<any>{
    return await db('user').where('email','=',`${email}`);
  }


  async findById(id:number): Promise<any>{
    return await db('user').where('id','=',`${id}`);
  }

}

export default UserRepository;