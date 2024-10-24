import { Schema } from "mongoose";


export interface IOrderProduct {
    productID: Schema.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder{
    userID: Schema.Types.ObjectId;
    amount: number;
    status: boolean;
    total: number;
    products: IOrderProduct[];
    created_at: Date;
    updated_at: Date;
}