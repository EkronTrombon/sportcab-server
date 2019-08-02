"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const userRoutes = express_1.Router();
// Creación de usuarios
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        pwd: req.body.pwd,
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            usuario: userDB
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            error: err
        });
    });
});
exports.default = userRoutes;
