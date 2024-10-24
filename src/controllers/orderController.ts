import { Request, Response } from "express";
import Order from "../models/order";


export const getAllOrders = async (req:Request, res:Response):Promise<void> =>{
    const {id} = req.params;
    try {
        const orders = await Order.find({user:id}).populate('Usuario', 'name email');
            if(orders){
                res.status(200).json(orders);
                return;
            }
            res.status(404).json({message: 'No orders found'});
    } catch (error) {
        console.error(error);
    }
}

export const createOrder = async (req:Request, res:Response):Promise<void> =>{

    const {user, products, total} = req.body;
    try {
        const order = new Order({user, products, total});
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
    }


};