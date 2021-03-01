import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductBrand from '@models/ProductBrand';

import returnUserIdFromToken from '../middleware/desetruckTokenMiddleware';

export default {
  async show(request: Request, response: Response) {
    const productBrandRepository = getRepository(ProductBrand);

    const productBrands = await productBrandRepository.find();

    return response.status(200).json(productBrands);
  },
  async create(request: Request, response: Response) {
    const productBrandRepository = getRepository(ProductBrand);
    const { name } = request.body;
    const { authorization } = request.headers;

    const id = returnUserIdFromToken(authorization);

    const productBrandExits = await productBrandRepository.findOne({ where: { name } });

    if (productBrandExits) {
      return response.sendStatus(400);
    }
    try {
      const productBrand = productBrandRepository.create({
        name,
        user: id
      });

      await productBrandRepository.save(productBrand);

      return response.status(201).json(productBrand);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
