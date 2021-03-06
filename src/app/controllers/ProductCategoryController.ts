import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductCategory from '@models/ProductCategory';
import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';

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

      const productCategoryExits = await productCategoryRepository.findOne({ where: [{ name, active: '1' }] });

      if (productCategoryExits) {
        return response.status(400).json({ message: 'Já existe uma categoria com esse nome' });
      }
      const productCategory = productCategoryRepository.create({
        name,
        user: id
      });

      await productCategoryRepository.save(productCategory);

      return response.status(201).json(productCategory);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Já existe uma categoria com esse nome' });
    }
  }
};
