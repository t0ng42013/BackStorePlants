import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { comparePass, hashPass } from "../services/hashPass";
import { generateToken } from "../services/jwt";


interface Props{
    req:Request;
    res:Response;
}

export const register = async(req:Request,res:Response) => {
    const {nombre, password} = req.body;
    
    try {
        const usuario = await Usuario.findOne({ nombre });

    if(!usuario) {
        const usuario = new Usuario({nombre, password});
            console.log(usuario)
                usuario.password = await hashPass(password);
                await usuario.save();
                res.status(200).json(usuario);
                console.log(usuario)
                return;
    }               
        res.status(400).json({msg: 'El usuario ya existe'});
    } catch (error) {
        console.log(error,'Error en el registro')
    }
};



export const login = async(req:any,res:any) => {
    const {nombre, password} = req.body;
    try {
        const usuario = await Usuario.findOne({nombre});
        
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        const passMatch = await comparePass(password, usuario.password);

        if(!passMatch) {
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }

        const token = generateToken(usuario.id);
        res.status(200).json({token});
        return token!;
    } catch (error) {
        console.log(error)
    }
};

