import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator/";

export const errores = (req:Request,res:Response,next:NextFunction)=>{
    const errors: Result<ValidationError> = validationResult(req);
    !errors.isEmpty() ? res.status(400).json({ err: errors.array()}):next();
}