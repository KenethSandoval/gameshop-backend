import jwt from 'jsonwebtoken';
import {error} from '../network/response';

export const verifyToken: Handler = async (req, res, next) => {
  //cabecera del token
  let token = req.headers.authorization.split(' ')[1];

  if (!token) {
    next(error(res, 'no token provided', 401));
    return; 
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as IPayload;
    req.user = payload.user;
    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt expired':
        return error(res, 'Token expired', 401);
      default:
        return error(res, err.message, 401);
    }
  }
}
