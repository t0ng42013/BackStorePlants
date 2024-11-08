import { Request, Response } from "express";
import Comment from "../models/Comment";
import Usuario from "../models/Usuario";


export const getAllComments = async (req: Request, res: Response) => {    
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'GET - Error al obtener usuarios', error });
    }
}

export const createComment = async (req: Request, res: Response) => {
    const id = req.user?.id;
    console.log(req.user)
    const { comment } = req.body;
    try {
        const newComment = new Comment({ comment, userID: id, userName: req.user?.name });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'POST - Error al crear comentario', error });
    }
}

export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const newComment = await Comment.findByIdAndUpdate(id, { comment, updated_at: new Date() }, { new: true });
        res.status(200).json(newComment);
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'PUT -Error al actualizar comentario', error });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            res.status(404).json({ msg: `Comentario con el id ${id} no encontrado` });
            return;
        }
        res.status(200).json({ msg: `Comentario con el id ${id} eliminado`,id });
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'DEL - Error al eliminar comentario', error });
    }
};