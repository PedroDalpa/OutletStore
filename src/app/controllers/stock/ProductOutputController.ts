/* eslint-disable camelcase */

import ProductOutputStock from '../../models/ProductOutputStock';

import ProductSell from '../../models/ProductSell';
import { getRepository } from 'typeorm';
import ProductStockController from './ProductStockController';

export default {
  async output(productsSell:ProductSell[]) {
    const productOutputStockRepository = getRepository(ProductOutputStock);
    const productOutputs = [];
    productsSell.map(async (item, index) => {
      const productOutput = productOutputStockRepository.create({
        productsSellId: item.id
      });

      productOutputs.push(productOutput);
      const hasStock = await ProductStockController.findInStock(item.product);

      if (hasStock !== undefined) {
        await ProductStockController.edit(item.product, ((item.amount * -1) + hasStock.amount)); // do negative to remove to stock
      }

      return productOutput;
    });
    await productOutputStockRepository.save(productOutputs);
    return productOutputs;
  }

};
