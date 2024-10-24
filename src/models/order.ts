import { model, Schema } from "mongoose";
import { IOrder } from "../interface/IOrder";


const OrderSchema = new Schema<IOrder>({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productID: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    amount: { type: Number, required: true },
    status: { type: Boolean, default: false },
    total: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

})



const Order = model('Order',OrderSchema);
export default Order;