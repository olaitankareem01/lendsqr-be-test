

// README.md
# Lendsqr-be-test
### Introduction
   This project is a node.js api project built as lenqr backend assessment.The project was deployed on heroku and it 
   is accessible [via]: https://kareem-rahman-lendsqr-be-test.herokuapp.com
   
### Project Features
* Users can create
* Users can login
* users can fund their account
* users can transfer funds to another user’s account
* users can withdraw funds from their account.


### Installation Guide
* Clone this repository [here](https://github.com/olaitankareem01/lendsqr-be-test.git).
* The main branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* setup a mysql database for this project . 
* Create an .env file in the project root folder and set the environment variables. See sample.env for assistance.
### Usage
* Run npm start to start the application.
* Connect to the API using Postman on the port you have  specified in your .env.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /v1/account/create | To create a new user account |
| POST | /v1/account/login | To login an existing user account |
| POST | /v1/account/fund | To fund an account |
| POST| /v1/account/withdraw | To withdraw from an account |
| POST| /v1/account/transfer | To transfer from one account to another |


1. Create Account: [https://kareem-rahman-lendsqr-be-test.herokuapp.com/v1/account/create]
    This endpoint is responsible for creating user's account as well as a wallet for the user and returns differet responses for different scenarios:
      
   * successful creation of account and wallet
     
     sample request:

     ```
      
      {
      "email":"johndoe@gmail.com",
      "password":"doe",
      "lastName":"john",
      "firstName":"doe"
      }
     
     ```

     response:

      ```
      
      {
         "status": 200,
         "message": "your Account has been successfully created and your wallet address is 4a4bba47-39dd-43dd-bbd4-b8d8cbee75df"
      }
     
     ```
   * when user sends an email that already exist

      sample request:

      ```
         
         {
         "email":"johndoe@gmail.com",
         "password":"doe",
         "lastName":"john",
         "firstName":"doe"
         }
      
      ```

      response:


      {
         "status": 400,
         "message": "Account already exist"
      }

      ```
   * when one or more required parameters are missing

     sample request:

     ```
       {
       "email":"uno@gmail.com"
      }
     ```

     response:

     ```
      {
      "status": 400,
      "message": "invalid input"
      }
     ```
 

2. Login :  [https://kareem-rahman-lendsqr-be-test.herokuapp.com/v1/account/login]
   This endpoint is responsible for authenticating the user and issuing the authentication token. The token issued is required to be set in the headers as follows: {token:"issuedtoken"}. The endpoint also returns various responses depending on the scenarios:

   * when user has been authenticated:

      sample request:

      ```
         {
         "email":"johndoe@gmail.com",
         "password":"doe"
         }
      ```

      response:

      ```
         {
            "status": 200,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoia2FkQGdtYWlsLmNvbSIsImlhdCI6MTY2NTUxODU1MSwiZXhwIjoxNjY1NTIyMTUxfQ.nFI81uMUtsGHVtAjFzhTZnIsE-xi6t3gSsRqDeDST44"
         }
      ```


   * when required parameters are missing:

      sample request:

      ```
      {
  
      }
      ```
      response:

      ```
      {
         "status": 400,
         "message": "email and password are required"
      }

     ```


   * when email or password is invalid:
     
     sample request:

      ```
      {
         "email":"ohndoe@gmail.com",
         "password":"ola"
      }

      ```
      response:

      ```
      {
         "status": 401,
         "message": "No Account found with this credentials"
      }

     ```

3. Fund Account [https://kareem-rahman-lendsqr-be-test.herokuapp.com/v1/account/fund]: This endpoint can be called by the user to fund his account.The user must have logged in and set token in the header before he is allowed to access this endpoint.  the user is required to provided his email and details of the card from which the fund would be charged. various responses can be returned form this endpoint as follows:

    * when account has been funded successfully:
      
      sample request:
      ```
      {
         "email":"johndoe@gmail.com",
         "amount":7000,
         "card_number":"5438898014560229",
         "cvv":"564",
         "pin":"8904",
         "expiry_month":"12",
         "expiry_year":"2022",
         "currency":"NGN"
      }

     ```
     response:

      ```
         {
            "status": 200,
            "message": "your Account has been successfully funded and your new balance is 30000"
         }

      ```
   

   * when one or more required parameters are missing:
    
      sample request:
      ```
      {
         "amount":7000,
         "card_number":"5438898014560229",
         "cvv":"564",
         "pin":"8904",
         "expiry_month":"12",
         "expiry_year":"2022",
         "currency":"NGN"
      }

      ```
      response:

      ```
      {
         "status": 400,
         "message": "All fields are required"
      }

      ```

   * when auth token is invalid or expired or missing:
     sample request:
      ```
      { 
         "email":"johndoe@gmail.com"
         "amount":7000,
         "card_number":"5438898014560229",
         "cvv":"564",
         "pin":"8904",
         "expiry_month":"12",
         "expiry_year":"2022",
         "currency":"NGN"
      }

      ```

     response:
     ```
      {
         "status": 401,
         "message": "unauthorized access"
      }
     ```

4. Withdraw From Account [https://kareem-rahman-lendsqr-be-test.herokuapp.com/v1/account/withdraw]:  This endpoint can be called by the user to withdraw from his account.The user must have logged in and set token in the header before he is allowed to access this endpoint.The user is required to provided his email and his bank  details where the money would be deposited. various responses can be returned from this endpoint as follows:

  * when withdrawal is successful
     
     sample request:

     ```
      {
   
      "email":"johndoe@gmail.com",
      "amount":3000,
      "account_bank":"044",
      "beneficiary_name":"john doe",
      "account_number":"0978765654"

      }
    ```

    response:

    ```
    {
      "status": 200,
      "message": "your withdrawal was successful and your new balance is 27000"
    }
    ```

   * when account balance is insufficient 

      sample request:

      ```
      {
         "email":"johndoe@gmail.com",
         "amount":70000,
         "account_bank":"044",
         "beneficiary_name":"john doe",
         "account_number":"0978765654"
      }

      ```

      response:

      ```
      {
         "status": 400,
         "message": "Insufficient Fund"
      }

      ```
   * when auth token is invalid or expired or missing:

      sample request:

       ```
       {
          "email":"johndoe@gmail.com",
         "amount":7000,
         "account_bank":"044",
         "beneficiary_name":"kareem abd-rahman",
         "account_number":"0978765654"
      }

      ```

      response:

       ```
       {
         "status": 401,
         "message": "unauthorized access"
      }

      ```

    [^N.B]: no real transfer of money actually occurs on this system as the test account(flutterwave) being used currently  can not complete transfers to banks.

5.  Transfer fund [https://kareem-rahman-lendsqr-be-test.herokuapp.com/v1/account/transfer]:  This endpoint can be called by the user to transfer from his account to another user's account.The user must have logged in and set token in the header before he is allowed to access this endpoint.The user is required to provided his email, amount and the wallet address of the other user where the money would be deposited. various responses can be returned from this endpoint as follows:



    * when transfer is successful:

      sample request:
       ```
        {
          "email":"kad@gmail.com",
         "amount":3000,
         "recipient_walletId":"4a4bba47-39dd-43dd-bbd4-b8d8cbee75df"
        }
      ```

      response:

      ```
      {
         "status": 200,
         "message": "your have successfully transferred 3000 to john doe and your new balance is 24000"
      }

     ```

   * when wallet address is invalid:
      
      sample request:
       ```
       {
         "email":"kad@gmail.com",
         "amount":3000,
         "recipient_walletId":"efda1efb-076d-47d8-9b0d-d82e25c6ba45"
       }
      ```

     response:

     ```
      {
         "status": 400,
         "message": "Invalid Wallet address"
      }

     ```

 * when account balance is insufficient:

     sample request:

      ``` 
      {
         "email":"kad@gmail.com",
         "amount":30000000,
         "recipient_walletId":"4a4bba47-39dd-43dd-bbd4-b8d8cbee75df"
      }
      ```
      response:

      ```
      {
         "status": 400,
         "message": "Insufficient Fund"
      }
      
      ```
 [^N.B]: no real transfer of money actually occurs on this system as the test account(flutterwave) being used currently  can not complete transfers to banks.


### Database Design
  There are 3 major entities in the system.:
   1. User: this represent a customer and it holds details such as the customer's email,fisrtname,lastname,password.
   2. Wallet: this represent the customer's wallet. each customer in the system has a wallet. The entity contains fields such as: walletId,balance,userId e.t.c
   3. Transaction: keeps track of the transaction made by the customer. it fields include: transactionRef,summary,description e.t.c

   Below is an entity relationship diagram illustrating the relationship among these models:

   <img src="lendqrerd.png"/>


### Technologies Used
 * Node.js
 * Express.js
 * Typescript
 * KnexORM
 * JWT: for authentication
 * FlutterWave API: for payment integration

### Links
[serverURL] : https://kareem-rahman-lendsqr-be-test.herokuapp.com

[APICollectionLink] : https://www.postman.com/olaitankareem01/workspace/lendsqr-be-test-api/collection/14443983-7b6ca3b9-589b-4e98-bbc7-cf8f5bb56252?action=share&creator=14443983
