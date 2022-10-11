import { expect } from 'chai';
import sinon from 'sinon';
// import * as faker from 'faker';
import {faker} from '@faker-js/faker';
import CreateUserDto from '../../src/models/dtos/CreateUserDto';
import UserRepository from '../../src/repositories/UserRepository';
import { db } from "../../src/database/db";
import { updateSpread } from 'typescript';
import knex from 'knex';

describe("UserRepository", function() {


 
  describe("user repository  tests", function() {


     beforeEach(() => {
      sinon.restore();
    });

    it("should add a new user to the db", async function() {
       
      //Arrange
      const record = {
  
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.name.lastName()
      }
      const stubValue = [1];
      const stub = sinon.stub(db, "insert").returns(stubValue);
      const userRepository = new UserRepository();

      //Act
      const user = await userRepository.registerUser(record);

       //Assert
      expect(user).to.have.length(1);
  
    });

    it("findUserByEmail method should return a user's details", async function() {
      //Arrange
      const email = "ade@gmail.com"
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

    const selectStub = sinon.stub().returnsThis();
    const whereStub = sinon.stub().resolves(Value);
    sinon.stub(db, "from").callsFake((): any => {
      return {
        select: selectStub,
        where: whereStub
      };
    });
      
      const userRepository = new UserRepository();
      //Act
      const user = await userRepository.findUserByEmail(Value[0].email);
     
      //Assert
      expect(user).to.be.an("array");
    
  
    });

  });
});