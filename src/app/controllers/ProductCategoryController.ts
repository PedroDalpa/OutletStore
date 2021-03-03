import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductCategory from '@models/ProductCategory';
import returnUserIdFromToken from '../middleware/desetruckTokenMiddleware';

export default {
  async show(request: Request, response: Response) {
    const productCategoryRepository = getRepository(ProductCategory);

    const productCategorys = await productCategoryRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(productCategorys);
  },
  async create(request: Request, response: Response) {
    try {
      const productCategoryRepository = getRepository(ProductCategory);
      const { name } = request.body;
      const { authorization } = request.headers;

      const id = returnUserIdFromToken(authorization);

      const productCategoryExits = await productCategoryRepository.findOne({ where: { name } });

      if (productCategoryExits) {
        return response.sendStatus(400);
      }
      const productCategory = productCategoryRepository.create({
        name,
        user: id
      });

      await productCategoryRepository.save(productCategory);

      return response.status(201).json(productCategory);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
