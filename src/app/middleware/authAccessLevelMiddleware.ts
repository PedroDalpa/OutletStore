import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
  id: string;
  iat: number;
  exp: number;
  accessLevel: number;
}
const authAccessLevelMiddleware = (checkRoles: number[]) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { authorization } = request.headers;

    const token = authorization.replace('Bearer', '').trim();
    const data = jwt.verify(token, 'secret');

    const { accessLevel } = data as TokenPayLoad;

    if (accessLevel && !checkRoles.find(checkRole => checkRole === accessLevel)) {
      return response.sendStatus(401);
    }

    return next();
  };
export default authAccessLevelMiddleware;
