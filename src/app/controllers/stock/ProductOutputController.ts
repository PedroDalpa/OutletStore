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
        productSellId: item.id
      });

      productOutputs.push(productOutput);

      await ProductStockController.edit(item.barCode);

      return productOutput;
    });
    await productOutputStockRepository.save(productOutputs);
    return productOutputs;
  }

};
