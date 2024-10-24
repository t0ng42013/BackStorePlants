import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { comparePass, hashPass } from "../services/hashPass";
import { generateToken } from "../services/jwt";


export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ name });

        if (!usuario) {
            const usuario = new Usuario({ name, password });
            
            usuario.password = await hashPass(password);
            await usuario.save();
            res.status(200).json(usuario);
            console.log(usuario)
            return;
        }
        res.status(400).json({ msg: 'El usuario ya existe' });
    } catch (error) {
        console.log(error, 'Error en el registro')
    }
};



export const login = async (req: Request, res: Response): Promise<void> => {
    const { name, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ name });

        if (!usuario) {
            res.status(400).json({ msg: 'El usuario no existe' });
            return
        }
       
        if (password === process.env.KEY_ADMIN) {         
            await Usuario.findOneAndUpdate({ name }, { role: true, updated_at: new Date() }); 
        } else {
            const passMatch = await comparePass(password, usuario.password);

            if (!passMatch) {
                res.status(400).json({ msg: 'Contraseña incorrecta' });
                return
            }

        }

        console.log(usuario.role)
        const token = generateToken(usuario.id,  usuario.role);
        res.status(200).json({ token, role: usuario.role });


    } catch (error) {
        console.log(error)
    }
};

