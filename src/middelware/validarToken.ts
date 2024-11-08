import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";
import { IToken } from "../interface/IToken";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";



declare module 'express-serve-static-core' {
    interface Request {
        user?: IToken; // o define una interface más específica
    }
}


export const validarToken = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.header('x-token');

    if(!token){
        res.status(401).json({msg:'No hay token en la petición'});
        return ;
    }
    try {
        const {id ,role, name,}= verifyToken(token) as IToken;
        req.user = {id,role,name};
        next();
    } catch (error) {
        let errorMessage = 'Token inválido';

        if (error instanceof TokenExpiredError) {
            errorMessage = 'El token ha expirado';
        } else if (error instanceof JsonWebTokenError) {
            errorMessage = 'Token no válido';
        }

        res.status(401).json({ msg: errorMessage });
        return 
    }
}