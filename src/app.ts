
import express from 'express';
import Container from 'typedi';
import cors from "cors";
import * as bodyParser from 'body-parser';
import { routes } from './routes';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT


export const app = express();
 

app.use(
  cors({
    exposedHeaders: ["token"],
  })
);

  
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(bodyParser.json());



// routes
app.use('/', routes);


app.listen(port, () => {
  console.log(`app listening on port: ${port} `);
});




