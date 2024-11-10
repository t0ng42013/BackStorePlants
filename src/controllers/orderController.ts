import { Request, Response } from "express";
import Order from '../models/order';
import Product from '../models/Product';
import { IProduct } from "../interface/IProduct";


export const getAllOrders = async (req: Request, res: Response): Promise<void> => {//busca todas las ordenes de compra del usuario logueado

    try {
        const orders = await Order.find({ userID: req.user?.id }).populate('products');
        
        if (orders) {
            res.status(200).json(orders);
            return;
        }
        res.status(404).json({ message: 'No orders found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'GET ORDER No orders found' });
    }
}



export const createOrder = async (req: Request, res: Response): Promise<void> => {
    const id = req.user?.id;
    const { products, name, amount, status, total } = req.body;

    try {
        // Verificar todos los productos en paralelo
        const productSearches = await Promise.all(
            products.map(async (product: { productID: string, name: string, quantity: number, price: number }) => {
                const foundProduct = await Product.findById(product.productID);
                console.log(`Searching for product ${product.productID}:`, foundProduct); // Ver qué encuentra
                return foundProduct;
            })
        );
        const allProductsExist = productSearches.every(product => product !== null);
        console.log("Product searches results:", productSearches); // Ver resultados
        console.log("All products exist?", allProductsExist);

        if (!allProductsExist) {
            res.status(400).json({
                message: 'One or more products do not exist'
            });
            return;
        }
        // Si todos los productos existen, crear la orden
        const order = new Order({
            userID: id,
            name,
            products,
            amount,
            status,
            total
        });

        await order.save();
        res.status(201).json(order); // Usar 201 para creación exitosa

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'POST - Error creating order' });
    }
};