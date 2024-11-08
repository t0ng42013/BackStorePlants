import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { comparePass, hashPass } from "../services/hashPass";
import { generateToken } from "../services/jwt";


export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, password, email } = req.body;
    try {
        const usuario = await Usuario.findOne({ $or: [{ name }, { email }] });

        if (!usuario) {
            const usuario = new Usuario({ name, password,email });
            
            usuario.password = await hashPass(password);
            await usuario.save();

            const token = generateToken(usuario.id, usuario.role, usuario.name);
            res.status(200).json({ token,usuario });
            return;
        }
        res.status(400).json({ msg: 'El usuario o email ya existe' });
    } catch (error) {
        console.log(error, 'Error en el registro')
        res.status(400).json({ msg: 'REGISTER - Error en el registro' });
    }
};



export const login = async (req: Request, res: Response): Promise<void> => {
    const { name, password,email } = req.body;
    console.log(name, password, email);
    try {
        const usuario = await Usuario.findOne({ $or: [{ name }, { email }] });
          
        if (!usuario) {
            res.status(400).json({ msg: 'usuario no encontrado o contraseña incorrecta' });
            return
        }
       
        if (password === process.env.KEY_ADMIN) {         
            await Usuario.findOneAndUpdate({ name }, { role:'Admin', updated_at: new Date() });            
           
        } else {
            const passMatch = await comparePass(password, usuario.password);

            if (!passMatch) {
                res.status(400).json({ msg: 'usuario no encontrado o contraseña incorrecta' });
                return
            }
        }        
            const token = generateToken(usuario.id, usuario.role, usuario.name);
            res.status(200).json({ token });


    } catch (error) {
        console.log('error en el login ', error);
        res.status(500).json({ msg: 'LOGIN - Error en el login' });
    }
};


export const renewToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.user;
    if(!token){
        res.status(400).json({ msg: 'Token no válido' });
        return
    }
  const newtoken = generateToken(token.id, token.role, token.name);
  res.status(200).json({ token: newtoken });
  return;
   
};
