import { Router } from 'express';

import authMiddleware from './app/middleware/authMiddleware';
import authAccessLevelMiddleware from './app/middleware/authAccessLevelMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import TenantController from '@controllers/TenantController';
import ProductBrandController from '@controllers/ProductBrandController';

const routes = Router();

routes.post('/auth', AuthController.authenticate);

routes.post('/users', UserController.create);
routes.get('/users', authMiddleware, authAccessLevelMiddleware([1, 2]), UserController.show);

routes.post('/tenant', TenantController.create);

routes.post('/product/brand', ProductBrandController.create);

export default routes;
