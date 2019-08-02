import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';

const userRoutes = Router();

// Creación de usuarios
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        pwd: req.body.pwd,
        avatar: req.body.avatar
    };
    Usuario.create(user).then(userDB => {
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

export default userRoutes;