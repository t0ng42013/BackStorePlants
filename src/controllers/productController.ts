import { Request, Response } from "express"
import Product from "../models/Product";



export const getAllProducts = async (req: Request, res: Response): Promise<void> => {

    try {
        const product = await Product.find();
        res.status(200).json(product);
        console.log('object')
    } catch (error) {
        console.log(error)
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
   
    try {
        if (!req.user?.isAdmin) {
            res.status(401).json({
                msg: 'No autorizado'
            });
            return
        }
    } catch (error) {
        throw new Error('Failed token');
    }
    const { id, name, img, describe, price, category, stock } = req.body;


    try {
        const product = new Product({ id, name, img, describe, price, category, stock });

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

    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    if (!req.user?.isAdmin) {
        res.status(401).json({
            msg: 'No autorizado'
        });
        return
    }
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, resto, { new: true });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)

    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    if (!req.user?.isAdmin) {
        res.status(401).json({
            msg: 'No autorizado'
        });
        return
    }
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
            msg: `Producto con el id ${id} eliminado`
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el producto',
            error: error.message
        });
    }
};