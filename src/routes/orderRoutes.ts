import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import { validarToken } from "../middelware/validarToken";
import { check } from "express-validator/";
import { errores } from "../middelware/errores";

const router = Router();

router.get('/',validarToken, getAllOrders);
router.post('/',[
    check('userID', 'userID'),
    check('products','products is required').not().isEmpty(),
    check('amount','amount is required').not().isEmpty(),
    check('total','total is required').not().isEmpty(),
errores
],validarToken,createOrder);


export default router;