import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Product from '@models/Product';

export default {
  async show(request: Request, response: Response) {
    const productRepository = getRepository(Product);

    const products = await productRepository.find();

    return response.status(200).json(products);
  },
  async create(request: Request, response: Response) {
    const productRepository = getRepository(Product);
    const { name, userId, productBrandId, productProviders } = request.body;

    const productExists = await productRepository.findOne({ where: { name } });

    if (productExists) {
      return response.sendStatus(400);
    }

    try {
      const product = productRepository.create({
        name,
        user: userId,
        productBrand: productBrandId,
        productProviderProducts: productProviders
      });

      await productRepository.save(product);

      return response.status(201).json(product);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
