import express from 'express';
import { defaultRoute } from './DefaultRouter';
import { accountRoute } from './AccountRouter';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(accountRoute);