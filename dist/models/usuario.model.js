"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El eMail es obligatorio'] },
    pwd: { type: String, required: [true, 'La contraseña es obligatoria'] },
    avatar: { type: String, default: 'no-img.png' },
    rol: { type: String, default: 'USER_ROLE', required: [true, 'El rol del usuario es obligatorio'] }
});
usuarioSchema.method('compararPwd', function (pwd = '') {
    if (bcrypt_1.default.compareSync(pwd, this.pwd)) {
        return true;
    }
    else {
        return false;
    }
});
;
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
