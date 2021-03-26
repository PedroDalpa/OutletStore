/* eslint-disable camelcase */

import ProductStock from '../../models/ProductStock';

import { getConnection, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import ProductInputStock from 'src/app/models/ProductInputStock';

const ProductStockController = {
  async index(request: Request, response: Response) {
    const { id } = request.params;

    const productStock = ProductStockController.findInStock(id);

    return response.status(200).json(productStock);
  },
  async findInStock(productId:string) {
    const productStockRepository = getRepository(ProductStock);
    const productStock = await productStockRepository.findOne({ where: [{ active: '1', productsId: productId }] });
    return productStock;
  },
  async create(productsInputStock:ProductInputStock[]) {
    const productStockRepository = getRepository(ProductStock);
    const productsStock = [];
    productsInputStock.map(item => {
      const productStock = productStockRepository.create({
        productsId: item.product,
        productInputStock: item.product_bar_code
      });

      productsStock.push(productStock);
      return productStock;
    });

    try {
      await productStockRepository.save(productsStock);
    } catch (error) {
      console.error(error);
    }
    return productsStock;
  },
  async edit(productId:string, amount:number) {
    // const productStock = await getConnection()
    //   .createQueryBuilder()
    //   .update(ProductStock)
    //   .set({ amount: amount })
    //   .where('product_id = :productId', { productId })
    //   .execute();

    // return productStock;
  }

};
export default ProductStockController;
