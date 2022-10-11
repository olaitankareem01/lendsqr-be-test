import { expect } from 'chai';
import sinon from 'sinon';
// import * as faker from 'faker';
import {faker} from '@faker-js/faker';
import CreateUserDto from '../../src/models/dtos/CreateUserDto';
import UserRepository from '../../src/repositories/UserRepository';
import { db } from "../../src/database/db";

const userRepo = new UserRepository();

const stubValue = {
  id: 1,
  firstName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.name.findName(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past()
};

const stub = sinon.stub(userRepo, "findById").resolves(stubValue);

import AccountService from '../../src/services/AccountService';

describe("UserRepository", function() {


  const record = {
  
    firstName: "rahman",
    lastName: "kaeem",
    email: "kunle@gmail.com",
    password: "ola"   
  }
  describe("account serice test", function() {
    it("it should return an account that matches the provided email", async function() {
    //   const stub = sinon.stub(db, "insert").returns(stubValue);
    //   const userRepository = new UserRepository();
    //   const user = await userRepository.registerUser(record);
    //   expect(stub.calledOnce).to.be.true;


  
      const acctService = new AccountService();
      const user = await acctService.findAccount(stubValue.email);
      expect(stub.called).to.be.true;
      expect(user.id).to.equal(stubValue.id);
    //   expect(user.name).to.equal(stubValue.name);
      expect(user.email).to.equal(stubValue.email);
      expect(user.createdAt).to.equal(stubValue.createdAt);
      expect(user.updatedAt).to.equal(stubValue.updatedAt);
   
    });
  });
});