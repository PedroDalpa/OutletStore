/* eslint-disable camelcase */

import ProductInputStock from 'src/app/models/ProductInputStock';
import ProductPurchase from 'src/app/models/ProductPurchase';
import { getRepository } from 'typeorm';
import ProductStockController from './ProductStockController';

export default {
  async input(productsPurchase:ProductPurchase[]) {
    const productInputStockRepository = getRepository(ProductInputStock);
    const productInputs = [];
    productsPurchase.map(async (item, index) => {
      const productInput = productInputStockRepository.create({
        productsPurchaseId: item.id
      });

      productInputs.push(productInput);
      const hasStock = await ProductStockController.findInStock(item.product);

      if (hasStock !== undefined) {
        await ProductStockController.edit(item.product, (+item.amount + hasStock.amount));
      } else {
        await ProductStockController.create(item.product, (item.amount));
      }

      return productInput;
    });
    await productInputStockRepository.save(productInputs);
    return productInputs;
  }

};
