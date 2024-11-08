import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController";
import { validarToken } from "../middelware/validarToken";
import { verificarAdmin } from "../middelware/verifyAdmin";



const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/', validarToken,verificarAdmin, createProduct);
router.put('/:id', validarToken, verificarAdmin,updateProduct);
router.delete('/:id', validarToken, verificarAdmin,deleteProduct);


export default router;