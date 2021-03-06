import { Router } from 'express';

import authMiddleware from './app/middleware/authMiddleware';
import authAccessLevelMiddleware from './app/middleware/authAccessLevelMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import TenantController from './app/controllers/TenantController';
import ProductBrandController from './app/controllers/ProductBrandController';
import ProductController from './app/controllers/ProductController';
import ProductProviderController from './app/controllers/ProductProviderController';
import ProductColorController from './app/controllers/ProductColorController';
import ProductPurchaseController from './app/controllers/ProductPurchaseController';
import ProductCategoryController from './app/controllers/ProductCategoryController';
import ProductSubCategoryController from './app/controllers/ProductSubCategoryController';

const routes = Router();

routes.post('/auth', AuthController.authenticate);

routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/users', authAccessLevelMiddleware([1, 2]), UserController.show);
routes.post('/tenant', TenantController.create);

routes.post('/product/brand', ProductBrandController.create);
routes.get('/product/brand', ProductBrandController.show);

routes.post('/product', ProductController.create);
routes.get('/product', ProductController.show);

routes.post('/product/provider', ProductProviderController.create);
routes.get('/product/provider', ProductProviderController.show);

routes.post('/product/color', ProductColorController.create);

routes.post('/product/purchase', ProductPurchaseController.create);

routes.post('/product/category', ProductCategoryController.create);
routes.get('/product/category', ProductCategoryController.show);

routes.post('/product/sub/category', ProductSubCategoryController.create);
routes.get('/product/sub/category', ProductSubCategoryController.show);

export default routes;
