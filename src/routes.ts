import { Router } from 'express';

import authMiddleware from './app/middleware/authMiddleware';
import authAccessLevelMiddleware from './app/middleware/authAccessLevelMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import TenantController from '@controllers/TenantController';
import ProductBrandController from '@controllers/ProductBrandController';
import ProductController from '@controllers/ProductController';
import ProductProviderController from '@controllers/ProductProviderController';
import ProductColorController from '@controllers/ProductColorController';
import ProductPurchaseController from '@controllers/ProductPurchaseController';

const routes = Router();

routes.post('/auth', AuthController.authenticate);

routes.post('/users', UserController.create);
routes.get('/users', authMiddleware, authAccessLevelMiddleware([1, 2]), UserController.show);

routes.post('/tenant', TenantController.create);

routes.post('/product/brand', ProductBrandController.create);

routes.post('/product', ProductController.create);

routes.post('/product/provider', ProductProviderController.create);

routes.post('/product/color', ProductColorController.create);

routes.post('/product/purchase', ProductPurchaseController.create);

export default routes;
