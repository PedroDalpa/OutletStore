
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
  id: string;
  iat: number;
  exp: number;
  accessLevel: number;
}

const returnUserIdFromToken = (authorization:string) => {
  const token = authorization.replace('Bearer', '').trim();
  const data = jwt.verify(token, 'secret');

  const { id } = data as TokenPayLoad;
  return id;
};

export default returnUserIdFromToken
;
