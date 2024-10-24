import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import { validarToken } from "../middelware/validarToken";

const router = Router();

router.get('/',validarToken, getAllOrders);
router.post('/',validarToken,createOrder);


export default router;