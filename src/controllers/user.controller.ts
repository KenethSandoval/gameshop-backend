import { genSaltSync, hashSync } from 'bcryptjs';
import User from '../models/user.model';
import { success, error } from '../network/response';
import { generarJWT } from '../helpers/jwt';

export const createUser: Handler = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const existEmail = await User.findOne({email});

    //que el email no este en uso
    if(existEmail) error(res, 'El email ya esta en uso', 400);

    const user = new User(req.body);

    //encriptamos contraseña 
    const salt = genSaltSync();
    user.password = hashSync(password, salt);
    const token = await generarJWT({user: { id: user.id, rol: user.rol } }); 

    await user.save();

    return success(res, { message: '', data: { user, token } }, 200);
  } catch (err) {
    console.log(err);
    error(res, 'Error inesperado', 500);
  }
}
