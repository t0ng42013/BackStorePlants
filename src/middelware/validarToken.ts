import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";
import jwt from 'jsonwebtoken';


export interface IUserPayload{
    id:string;
    isAdmin:boolean;
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: IUserPayload; // o define una interface más específica
    }
}


export const validarToken = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.header('x-token');

    if(!token){
        res.status(401).json({msg:'No hay token en la petición'});
        return ;
    }
    try {
        const {id ,isAdmin}= verifyToken(token) as IUserPayload;
        req.user = {id,isAdmin};
        next();
    } catch (error:any) {
        res.status(401).json({ msg: error.message });
        return;
    }
       
    
   
}