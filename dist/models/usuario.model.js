"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    email: { type: String, unique: true, required: [true, 'El eMail es obligatorio'] },
    pwd: { type: String, required: [true, 'La contraseña es obligatoria'] },
    avatar: { type: String, default: 'no-img.png' }
});
;
exports.Usuario = mongoose_1.model('Usuario', usuarioSchema);
