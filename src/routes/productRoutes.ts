import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController";
import { validarToken } from "../middelware/validarToken";
import { verificarAdmin } from "../middelware/verifyAdmin";
import { check } from "express-validator/";
import { errores } from "../middelware/errores";



const router = Router();


router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/',[
    check('name','El nombre es obligatorio').isLength({min:3}),
    check('img','La imagen es obligatoria').isLength({min:3}),
    check('price', 'El valor del producto es obligatorio').isNumeric(),
    check('stock', 'La cantidad de stock es obligatoria').isNumeric(),
    errores
] ,validarToken,verificarAdmin, createProduct);
router.put('/:id', validarToken, verificarAdmin,updateProduct);
router.delete('/:id', validarToken, verificarAdmin,deleteProduct);


export default router;