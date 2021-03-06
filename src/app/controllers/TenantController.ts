import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Tenant from '../models/Tenant';

export default {
  async show(request: Request, response: Response) {
    const tenantRepository = getRepository(Tenant);

    const factorySectors = await tenantRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(factorySectors);
  },
  async create(request: Request, response: Response) {
    const tenantRepository = getRepository(Tenant);
    const { name, phone, street, city, state, zip, email } = request.body;

    const tenantExists = await tenantRepository.findOne({ where: { name } });

    if (tenantExists) {
      return response.sendStatus(400);
    }
    try {
      const tenant = tenantRepository.create({
        name,
        phone,
        street,
        city,
        state,
        zip,
        email
      });
      await tenantRepository.save(tenant);

      return response.status(201).json(tenant);
    } catch (error) {
      console.error(error);

      return response.sendStatus(500);
    }
  }
};
