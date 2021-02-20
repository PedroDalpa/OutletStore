import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
export default {
  async authenticate(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const payload = {
      id: user.id,
      accessLevel: user.access_level
    };

    const token = jwt.sign(payload, 'secret', { expiresIn: '1d' });

    return response.json({
      user,
      token
    });
  }
};
