/* eslint-disable camelcase */

import ProductStock from '../../models/ProductStock';

import { getConnection, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import ProductInputStock from 'src/app/models/ProductInputStock';

const ProductStockController = {
  async index(request: Request, response: Response) {
    const { id } = request.params;
    const productStockRepository = getRepository(ProductStock);
    const productStock = await productStockRepository.findOne({ where: [{ active: '1', id: id }] });

    return response.status(200).json(productStock);
  },
  async findInStock(barCode:string) {
    const productStockRepository = getRepository(ProductStock);
    const productStock = await productStockRepository.findOne({ where: [{ active: '1', productInputStock: barCode }] });
    return productStock;
  },
  async create(productsInputStock:ProductInputStock[]) {
    const productStockRepository = getRepository(ProductStock);
    const productsStock = [];
    productsInputStock.map(item => {
      const productStock = productStockRepository.create({
        productsId: item.product.id,
        barCode: item.product_bar_code
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
  async edit(productBarCode:string) {
    try {
      const productStock = await getConnection()
        .createQueryBuilder()
        .update(ProductStock)
        .set({ is_stock: false })
        .where('barCode = :productBarCode', { productBarCode })
        .execute();
      return productStock;
    } catch (error) {
      console.error(error);
    }
  }

};
export default ProductStockController;
