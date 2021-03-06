import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import userView from '../views/userView';
export default {
  async show(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find({ where: [{ active: '1' }] });

    return response.status(200).json(userView.renderMany(users));
  },
  async create(request: Request, response: Response) {
    const repository = getRepository(User);
    const { name, phone, email, tenantId, password, accessLevel } = request.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return response.sendStatus(400);
    }

    const user = repository.create({
      email,
      password,
      access_level: accessLevel,
      name,
      phone,
      tenant: tenantId
    });

    await repository.save(user);

    return response.status(201).json(user);
  }

};
