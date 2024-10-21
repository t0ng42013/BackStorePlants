import { model, Schema } from "mongoose";
import { IProduct } from "../interface/IProduct";

const ProductSchema = new Schema<IProduct>({
    name:{
        type: String,
        required: true,
        index: true,
    },
    img:{
        type: String,
        default:'http:img.com'
    },
    describe:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 50,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});

ProductSchema.methods.toJSON = function(){
    const { __v, _id, ...product } = this.toObject();
    product.id = _id;
    return product;
}

const Product = model('Product', ProductSchema);
export default Product;