import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import ProductColor from '@models/ProductColor';

export default {
  async show(request: Request, response: Response) {
    const productColorRepository = getRepository(ProductColor);

    const productColors = await productColorRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(productColors);
  },
  async create(request: Request, response: Response) {
    const productColorRepository = getRepository(ProductColor);
    const { name, userId } = request.body;

    const productColorExits = await productColorRepository.findOne({ where: { name } });

    if (productColorExits) {
      return response.sendStatus(400);
    }
    try {
      const productColor = productColorRepository.create({
        name,
        user: userId
      });

      await productColorRepository.save(productColor);

      return response.status(201).json(productColor);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  }
};
