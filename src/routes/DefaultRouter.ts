import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
  res.status(200).send({
    status:200,
    message:"hello"
  });
});