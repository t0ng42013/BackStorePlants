import express from "express";
import { login, register, renewToken } from "../controllers/authController";

import { errores } from "../middelware/errores";
import { check } from "express-validator/";
import { validarToken } from "../middelware/validarToken";


const router = express.Router();

router.post('/register', [
    check('name','El nombre es obligatorio').isLength({min:3}),
    check('password','El password es obligatorio').isLength({min:6}),
    check('email','El email es obligatorio').isEmail(),
    errores
],register);


router.post('/login',[
    check('name').optional(),
    check('password','El password es obligatorio!').isLength({min:6}),
    check('email').optional(),   
    errores
],login);


router.post('/renew',validarToken, renewToken);



export default router;