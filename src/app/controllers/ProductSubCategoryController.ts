import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductSubCategory from '@models/ProductSubCategory';

export default {
  async show(request: Request, response: Response) {
    const productSubCategoryRepository = getRepository(ProductSubCategory);

    const productSubCategorys = await productSubCategoryRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(productSubCategorys);
  },
  async create(request: Request, response: Response) {
    try {
      const productSubCategoryRepository = getRepository(ProductSubCategory);
      const { name, userId, productCategory } = request.body;

      const productSubCategoryExits = await productSubCategoryRepository.findOne({ where: { name } });

      if (productSubCategoryExits) {
        return response.sendStatus(400);
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
