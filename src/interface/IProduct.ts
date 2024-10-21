export interface IProduct{
    name: string;
    img: string;
    describe: string;
    price: number;
    category: string;
    stock: number;
    created_at?: Date;
    updated_at?: Date;
}