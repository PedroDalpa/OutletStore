import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductBrand from '../models/ProductBrand';

import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';

export default {
  async show(request: Request, response: Response) {
    const productBrandRepository = getRepository(ProductBrand);

    const productBrands = await productBrandRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(productBrands);
  },
  async create(request: Request, response: Response) {
    const productBrandRepository = getRepository(ProductBrand);
    const { name } = request.body;
    const { authorization } = request.headers;

    const id = returnUserIdFromToken(authorization);

    const productBrandExits = await productBrandRepository.findOne({ where: [{ name, active: '1' }] });

    if (productBrandExits) {
      return response.status(400).json({ message: 'Já existe uma marca com esse nome' });
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
