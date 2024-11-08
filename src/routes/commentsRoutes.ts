import { Router } from "express";
import { createComment, deleteComment, getAllComments, updateComment } from "../controllers/commentsController";
import { verificarAdmin } from "../middelware/verifyAdmin";
import { validarToken } from "../middelware/validarToken";
import { check } from 'express-validator/';



const router = Router();


router.get('/', getAllComments)
router.post('/',check('comment','El comentario es obligatorio').isLength({min: 8}),validarToken, createComment)
router.put('/:id', validarToken, verificarAdmin, updateComment)//!TODO:ver como modificar propio
router.delete('/:id',validarToken,verificarAdmin, deleteComment)


export default router;
