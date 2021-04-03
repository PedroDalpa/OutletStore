import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';
import Sell from '../models/Sell';
import ProductOutputController from './stock/ProductOutputController';

export default {
  async show(request: Request, response: Response) {
    const sellRepository = getRepository(Sell);

    const sells = await sellRepository.find({ order: { id: 'DESC' }, where: [{ active: '1' }] });

    return response.status(200).json(sells);
  },
  async create(request: Request, response: Response) {
    const sellRepository = getRepository(Sell);
    const data = request.body;
    const { authorization } = request.headers;

    const userId = returnUserIdFromToken(authorization);

    try {
      const productSell = sellRepository.create({
        total_value: data.totalValue,
        user: userId,
        productsSell: data.products
      });

      await sellRepository.save(productSell);

      await ProductOutputController.output(productSell.productsSell);

      return response.status(201).json(productSell);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
