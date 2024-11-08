import { model, Schema } from "mongoose";
import { IUser } from "../interface/IUser";


const UsuarioSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: 'User'
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

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.id = _id;
    return usuario;
}
const Usuario = model('Usuario', UsuarioSchema);
export default Usuario;