import express, { Request, Response } from "express";
import { login, register } from "../controllers/authController";

import { errores } from "../middelware/errores";
import { check } from "express-validator/";


const router = express.Router();

router.post('/register', [
    check('name','El nombre es obligatorio').isLength({min:3}),
    check('password','El password es obligatorio').isLength({min:6}),
    errores
],register);


router.post('/login',[
    check('name', 'El nombre es obligatorio').isLength({ min: 3 }),
    check('password','El password es obligatorio!').isLength({min:6}),
    errores
],login);


// router.put('/pass', recuperar ); recuperar password


export default router;