import { Schema, model, Document } from 'mongoose';

const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El eMail es obligatorio'] },
    pwd: { type: String, required: [true, 'La contraseña es obligatoria'] },
    avatar: { type: String, default: 'no-img.png' }
});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
};

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);