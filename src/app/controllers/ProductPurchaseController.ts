import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';

import Purchase from '../models/Purchase';
import purchaseView from '../views/purchaseView';
import ProductInputController from './stock/ProductInputController';

export default {
  async show(request: Request, response: Response) {
    const purchaseRepository = getRepository(Purchase);

    const purchases = await purchaseRepository.find({ order: { create_at: 'DESC' }, where: [{ active: '1' }] });

    return response.status(200).json(purchaseView.renderMany(purchases));
  },
  async create(request: Request, response: Response) {
    const productPurchaseRepository = getRepository(Purchase);
    const data = request.body;
    const { authorization } = request.headers;

    const userId = returnUserIdFromToken(authorization);

    try {
      const productPurchase = productPurchaseRepository.create({
        productsPurchase: data.products,
        fiscal_note: data.fiscalNote,
        total_value: data.totalValue,
        user: userId
      });

      await productPurchaseRepository.save(productPurchase);
      await ProductInputController.input(productPurchase.productsPurchase);

      return response.status(201).json(productPurchase);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
