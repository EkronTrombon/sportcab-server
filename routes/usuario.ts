import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

// Login de usuario
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'El usuario/contraseña no es correcto'
            });
        }
        // Método propio de la clase Usuario para comparar la contraseña
        if (userDB.compararPwd(body.pwd)) {
            const token = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: token
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'El usuario/contraseña no es correcto'
            });
        }
    });
});

// Creación de usuarios
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        pwd: bcrypt.hashSync(req.body.pwd, 10),
        avatar: req.body.avatar
    };
    Usuario.create(user).then(userDB => {
        const token = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: token
        });
    }).catch(err => {
        res.status(500).json({
            ok: false,
            error: err
        });
    });
});

// Actualizar usuario
userRoutes.post('/update', verificaToken, (req: any, res: Response) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };
    Usuario.findByIdAndUpdate(req.usuario._id, user, {new: true}, (err, userDB) => {
        if (err) throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese Id'
            });
        }
        // Generamos un nuevo token
        const token = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
        res.json({
            ok: true,
            token: token
        });
    });
});

export default userRoutes;