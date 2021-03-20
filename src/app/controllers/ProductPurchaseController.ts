import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';

import ProductPurchase from '../models/ProductPurchase';
import Purchase from '../models/Purchase';

interface IProductPurchase{
  userId:string,
  productSize:string,
  amount:number,
  totalValue:number,
  unitValue:number,
  fiscalNoteNumber:string,
  productProvider:string,
  productColor:string,
  products:ProductPurchase,

}

export default {
  async show(request: Request, response: Response) {
    const productPurchaseRepository = getRepository(ProductPurchase);

    const productPurchases = await productPurchaseRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(productPurchases);
  },
  async create(request: Request, response: Response) {
    const productPurchaseRepository = getRepository(Purchase);
    const data = request.body;
    const { authorization } = request.headers;

    const userId = returnUserIdFromToken(authorization);
    const productPurchases = [];

    try {
      data.map(async (item) => {
        const productPurchase = productPurchaseRepository.create({
          productsPurchase: item.products,
          fiscal_note: item.fiscalNote,
          total_value: item.totalValue,
          user: userId
        });

        productPurchases.push(productPurchase);
      });
      await productPurchaseRepository.save(productPurchases);

      return response.status(201).json(productPurchases);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
