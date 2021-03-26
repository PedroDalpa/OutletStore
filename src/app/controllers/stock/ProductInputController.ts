/* eslint-disable camelcase */

import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import ProductInputStock from '../../models/ProductInputStock';
import ProductPurchase from '../../models/ProductPurchase';
import ProductStockController from './ProductStockController';

export default {
  async input(productsPurchase:ProductPurchase[]) {
    const productInputStockRepository = getRepository(ProductInputStock);
    const productInputs = [];

    productsPurchase.map(async (item, index) => {
      for (let index = 1; index <= item.amount; index++) {
        const productInput = productInputStockRepository.create({
          productsPurchaseId: item.id,
          product: item.product
        });
        productInputs.push(productInput);
      }
    });
    try {
      await productInputStockRepository.save(productInputs);

      await ProductStockController.create(productInputs);
    } catch (error) {
      console.error(error);
    }
    console.log(productInputs);

    return productInputs;
  },
  async showTags(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const tags = await getConnection()
        .createQueryBuilder()
        .select('product.name, product_input_stock.product_bar_code as barCode')
        .from(ProductInputStock, 'product_input_stock')
        .innerJoin('product_input_stock.productsPurchaseId', 'product_purchase')
        .innerJoin('product_input_stock.product', 'product')
        .where('product_purchase.purchase_id = :id', { id })
        .execute();

      return response.status(200).json(tags);
    } catch (error) {
      console.error(error);
    }
  }

};
