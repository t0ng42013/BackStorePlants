import { model, Schema } from "mongoose";
import { IUser } from "../interface/IUser";


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    role: {
        type: Boolean,
        default: false
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

UserSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}
const Usuario = model('Usuario', UserSchema);
export default Usuario;