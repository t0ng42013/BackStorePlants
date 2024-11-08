import { Request, Response } from "express";
import Order from '../models/order';


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

export const createOrder = async (req: Request, res: Response): Promise<void> => { //crea las ordenes de compras
    const id = req.user?.id;
    const { products, name, amount, status, total } = req.body;

    try {
        const order = new Order({
            userID: id,
            name,
            products,
            amount,
            status,
            total
        });
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'POST - Error creating order' });
    }


};