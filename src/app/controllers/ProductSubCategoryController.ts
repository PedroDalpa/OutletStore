import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductSubCategory from '../models/ProductSubCategory';
import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';
import subCategoryView from '../views/subCategoryView';

export default {
  async show(request: Request, response: Response) {
    const productSubCategoryRepository = getRepository(ProductSubCategory);

    const productSubCategorys = await productSubCategoryRepository.find({ where: [{ active: '1' }], relations: ['productCategory'] });

    return response.status(200).json(subCategoryView.renderMany(productSubCategorys));
  },
  async create(request: Request, response: Response) {
    try {
      const productSubCategoryRepository = getRepository(ProductSubCategory);
      const { name, productCategory } = request.body;

      const { authorization } = request.headers;

      const userId = returnUserIdFromToken(authorization);

      const productSubCategoryExits = await productSubCategoryRepository.findOne({ where: [{ name, active: '1' }] });

      if (productSubCategoryExits) {
        return response.status(400).json({ message: 'Já existe uma subcategoria com esse nome' });
      }
      const productSubCategory = productSubCategoryRepository.create({
        name,
        user: userId,
        productCategory
      });

      await productSubCategoryRepository.save(productSubCategory);

      return response.status(201).json(productSubCategory);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
