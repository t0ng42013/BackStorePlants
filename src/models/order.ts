import { model, Schema } from "mongoose";
import { IOrder } from "../interface/IOrder";


const OrderSchema = new Schema<IOrder>({
    userID: { type: Schema.Types.ObjectId, ref:'Usuario' },
    products: [
        {
            productID: { type: Schema.Types.ObjectId, ref: 'Product' },
            name: { type: String, required:[ true, 'El nombre es obligatorio' ]},
            quantity: { type: Number, required:[ true, 'La cantidad es obligatorio' ]},
            price: { type: Number, required:[ true, 'El precio es obligatorio' ]}
        }
    ],
    amount: { type: Number, required: [true , 'El monto es obligatio'] },
    status: { type: Boolean, default: false },
    total: { type: Number, required: [true, 'El total de la compra es obligatorio'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

})

OrderSchema.methods.toJSON = function(){
    const { __v, _id, ...order } = this.toObject();
    order.id = _id;
    return order;
}

const Order = model('Order',OrderSchema);
export default Order;