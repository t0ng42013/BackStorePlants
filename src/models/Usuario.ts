import { model, Schema } from "mongoose";




const UserSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}
const Usuario = model('Usuario', UserSchema);
export default Usuario;