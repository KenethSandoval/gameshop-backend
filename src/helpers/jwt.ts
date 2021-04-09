import jwt, {JsonWebTokenError} from 'jsonwebtoken';

export const generarJWT = (payload:IPayload) => {
  return new Promise((resolve, reject) => {

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, (err: JsonWebTokenError, token: string) => {
      if (err) {
        console.log(err);
        reject('No se pudo crear el token')
      } else {
        resolve(token);
      }
    });
  });
} 
