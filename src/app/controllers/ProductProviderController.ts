import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductProvider from '@models/ProductProvider';

export default {
  async show(request: Request, response: Response) {
    const productProviderRepository = getRepository(ProductProvider);

    const productProviders = await productProviderRepository.find();

    return response.status(200).json(productProviders);
  },
  async create(request: Request, response: Response) {
    const productProviderRepository = getRepository(ProductProvider);
    const { userId, name, phone, email } = request.body;

    const productProviderExists = await productProviderRepository.findOne({
      where: { name }
    });

    if (productProviderExists) {
      return response.sendStatus(400);
    }

    try {
      const productProvider = productProviderRepository.create({
        name,
        user: userId,
        phone,
        email
      });

      await productProviderRepository.save(productProvider);

      return response.status(201).json(productProvider);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
