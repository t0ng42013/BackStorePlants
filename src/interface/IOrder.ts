import { IProduct } from "./IProduct";

export interface IOrder{
    user: string;
    amount: number;
    status: boolean;
    total: number;
    product: IProduct[];
    create_at: Date;
    update_at: Date;
}