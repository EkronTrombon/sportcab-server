import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El eMail es obligatorio'] },
    pwd: { type: String, required: [true, 'La contraseña es obligatoria'] },
    avatar: { type: String, default: 'no-img.png' }
});

usuarioSchema.method('compararPwd', function(pwd: string = ''): boolean {
    if (bcrypt.compareSync(pwd, this.pwd)) {
        return true;
    } else {
        return false;
    }
});

interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    compararPwd(pwd: string): boolean;
};

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);