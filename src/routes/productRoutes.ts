import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController";
import { validarToken } from "../middelware/validarToken";



const router = Router();

router.get('/', getAllProducts);


router.get('/:id', getOneProduct);

router.post('/', validarToken, createProduct);

router.put('/:id', validarToken, updateProduct);

router.delete('/:id', validarToken, deleteProduct);


export default router;