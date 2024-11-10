import { Request, Response } from "express";
import Usuario from "../models/Usuario";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener usuarios', error });
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const newUsuario = await Usuario.findByIdAndUpdate(id, { name, email, role }, { new: true })
        res.status(200).json(newUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar usuario', error });
    }

}

export const deleteUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            res.status(404).json({ msg: `Usuario con el id ${id} no encontrado`});
            return;
        }
        res.status(200).json({ msg: `Usuario con el id ${id} eliminado`,id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar usuario', error });
    }
}