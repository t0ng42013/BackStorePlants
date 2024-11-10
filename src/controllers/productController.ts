import { Request, Response } from "express"
import Product from "../models/Product";



export const getAllProducts = async (req: Request, res: Response): Promise<void> => {

    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "GET - Product not found" })
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, name, img, imgHover , describe, price, category, stock } = req.body;
    
        const product = new Product({ id, name, img, imgHover,describe, price, category, stock });

        const productDB = await Product.findOne({ name });
        if (productDB) {
            res.status(400).json({
                msg: `El producto ${name} ya existe`
            });
            return;
        }

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "POST - Product not created" })
    }
};

export const getOneProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(400).json({
                msg: `El producto con el id ${id} no existe`
            });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "GET - Product not found" })
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, img, imgHover,describe, price, stock, category } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, 
            { name, img, imgHover,describe, price, stock, category, updated_at: new Date() },
            { new: true });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "PUT - Product not updated" })
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({
                msg: `Producto con el id ${id} no encontrado`
            });
            return
        }
        res.status(200).json({
            msg: `Producto con el id ${id} eliminado`,
            id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'DEL - Error al eliminar producto', error });
    }
};