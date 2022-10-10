import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET


export const auth = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["token"];

  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({
        status:401,
        message:"unauthorized access"
    });
    return;
  }

  //The token is valid for 1 hour
 
  const { userId, email } = jwtPayload;
  const newToken = jwt.sign({ userId, email }, jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);


  next();
};