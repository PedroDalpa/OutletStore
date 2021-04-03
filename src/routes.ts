import { Router } from 'express';

import authMiddleware from './app/middleware/authMiddleware';
import authAccessLevelMiddleware from './app/middleware/authAccessLevelMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import TenantController from './app/controllers/TenantController';
import ProductBrandController from './app/controllers/product/ProductBrandController';
import ProductController from './app/controllers/product/ProductController';
import ProductProviderController from './app/controllers/product/ProductProviderController';
import ProductColorController from './app/controllers/product/ProductColorController';
import ProductPurchaseController from './app/controllers/ProductPurchaseController';
import ProductCategoryController from './app/controllers/product/ProductCategoryController';
import ProductSubCategoryController from './app/controllers/product/ProductSubCategoryController';
import ProductStockController from './app/controllers/stock/ProductStockController';
import SellController from './app/controllers/SellController';
import ProductInputController from './app/controllers/stock/ProductInputController';

const routes = Router();

routes.post('/auth', AuthController.authenticate);

routes.post('/users', UserController.create);
routes.post('/tenant', TenantController.create);

routes.use(authMiddleware);

routes.get('/users', authAccessLevelMiddleware([1, 2]), UserController.show);

routes.post('/product/brand', ProductBrandController.create);
routes.get('/product/brand', ProductBrandController.show);

routes.post('/product', ProductController.create);
routes.get('/product', ProductController.show);
routes.get('/product/bar-code/:barCode', ProductController.index);

routes.post('/product/provider', ProductProviderController.create);
routes.get('/product/provider', ProductProviderController.show);
routes.get('/product/:id/provider', ProductProviderController.filterByProduct);

routes.post('/product/color', ProductColorController.create);

routes.post('/product/purchase', ProductPurchaseController.create);
routes.get('/product/purchase', ProductPurchaseController.show);

routes.post('/product/category', ProductCategoryController.create);
routes.get('/product/category', ProductCategoryController.show);

routes.post('/product/sub/category', ProductSubCategoryController.create);
routes.get('/product/sub/category', ProductSubCategoryController.show);

routes.get('/product/:id/stock', ProductStockController.index);

routes.post('/product/sell', SellController.create);

routes.get('/product/tag/:id', ProductInputController.showTags);

export default routes;
