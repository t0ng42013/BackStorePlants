import { Router } from "express";
import { validarToken } from "../middelware/validarToken";
import { deleteUsers, getAllUsers, updateUsers } from "../controllers/usersController";
import { verificarAdmin } from "../middelware/verifyAdmin";


const router = Router();


router.get('/', validarToken, verificarAdmin, getAllUsers);
router.put('/:id', validarToken, verificarAdmin, updateUsers)
router.delete('/:id', validarToken, verificarAdmin, deleteUsers)


export default router;