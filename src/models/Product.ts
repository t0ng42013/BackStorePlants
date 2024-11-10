import { model, Schema } from "mongoose";
import { IProduct } from "../interface/IProduct";

const ProductSchema = new Schema<IProduct>({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        index: true,
    },
    img:{
        type: String,
        required:[true, 'La imagen principal es obligatoria'],
    },
    imgHover:{
        type: String,
        default:'http:img.com',        
    },
    describe:{
        type: String,
        default: 'Plantas de interior'
    },
    price:{
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    category:{
        type: String,
        default: 'interior'        
    },
    stock:{
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 10,
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