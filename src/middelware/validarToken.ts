import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";

export const validarToken = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({msg:'No hay token en la petición'});
    }else{
        verifyToken(token) && next();
    }
   
}