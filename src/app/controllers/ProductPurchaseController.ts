import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductPurchase from '../models/ProductPurchase';

interface IProductPurchase{
  userId:string,
  productSize:string,
  amount:number,
  totalValue:number,
  unitValue:number,
  fiscalNoteNumber:string,
  productProvider:string,
  productColor:string,
  product:string
}

export default {
  async show(request: Request, response: Response) {
    const productPurchaseRepository = getRepository(ProductPurchase);

    const productPurchases = await productPurchaseRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(productPurchases);
  },
  async create(request: Request, response: Response) {
    const productPurchaseRepository = getRepository(ProductPurchase);
    const data = request.body;
    const productPurchases = [];

    try {
      data.map(async (item: IProductPurchase) => {
        const productPurchase = productPurchaseRepository.create({
          product_size: item.productSize,
          amount: item.amount,
          total_value: item.totalValue,
          unit_value: item.unitValue,
          fiscal_note_number: item.fiscalNoteNumber,
          user: item.userId,
          productProvider: item.productProvider,
          productColor: item.productColor,
          product: item.product
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
