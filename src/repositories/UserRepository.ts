
import { Service } from "typedi";
import User from "../models/User";
import { db } from "../database/db";
import { knex, Knex } from "knex";
import CreateUserDto from "../models/dtos/CreateUserDto";

@Service()
class UserRepository {
  
  async getAllUsers(): Promise<User[]> {
     return await db('user').select();
  }

  async registerUser(user:CreateUserDto){
      
    return await db('user').insert({
                  lastName:user.lastName,
                  firstName:user.firstName,
                  email:user.email,
                  password: user.password
                });
    
  }

  async findUserByEmail(email): Promise<any>{
    return await db('user').where('email','=',`${email}`);
  }


  async findById(id:number): Promise<any>{
    return await db('user').where('id','=',`${id}`);
  }

}

export default UserRepository;