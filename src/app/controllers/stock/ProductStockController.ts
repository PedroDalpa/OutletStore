/* eslint-disable camelcase */

import ProductStock from 'src/app/models/ProductStock';

import { getConnection, getRepository } from 'typeorm';
import { Request, Response } from 'express';

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
  async create(productId:string, amount:number) {
    const productStockRepository = getRepository(ProductStock);
    const productStock = productStockRepository.create({
      productsId: productId,
      amount: amount
    });

    await productStockRepository.save(productStock);
    return productStock;
  },
  async edit(productId:string, amount:number) {
    const productStock = await getConnection()
      .createQueryBuilder()
      .update(ProductStock)
      .set({ amount: amount })
      .where('product_id = :productId', { productId })
      .execute();

    return productStock;
  }

};
export default ProductStockController;
