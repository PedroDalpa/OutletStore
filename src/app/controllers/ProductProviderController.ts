import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductProvider from '../models/ProductProvider';
import returnUserIdFromToken from '../middleware/disruptTokenMiddleware';
import providerView from '../views/providerView';
import ProductProviderProduct from '../models/ProductProviderProduct';
import productProviderView from '../views/productProviderView';

export default {
  async show(request: Request, response: Response) {
    const productProviderRepository = getRepository(ProductProvider);

    const productProviders = await productProviderRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(providerView.renderMany(productProviders));
  },
  async filterByProduct(request: Request, response: Response) {
    const productProviderRepository = getRepository(ProductProviderProduct);
    const { id } = request.params;

    const productProviders = await productProviderRepository.find({
      where: [{ product: id }],
      relations: ['productProvider']
    });

    return response.status(200).json(productProviderView.renderMany(productProviders));
  },
  async create(request: Request, response: Response) {
    const productProviderRepository = getRepository(ProductProvider);
    const { name, phone, email } = request.body;

    const { authorization } = request.headers;

    const userId = returnUserIdFromToken(authorization);

    const productProviderExists = await productProviderRepository.findOne({
      where: [{ name, active: '1' }]
    });

    if (productProviderExists) {
      return response.status(400).json({ message: 'Já existe um fornecedor com esse nome' });
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
