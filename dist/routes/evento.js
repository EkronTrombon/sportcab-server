"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evento_model_1 = require("../models/evento.model");
const eventRoutes = express_1.Router();
// Obtener todos los eventos
eventRoutes.get('/', (req, res) => {
    evento_model_1.Evento.find((err, eventosDB) => {
        if (err) {
            return res.json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            eventos: eventosDB
        });
    });
});
// Creación de evento
eventRoutes.post('/create', (req, res) => {
    const event = {
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar
    };
    evento_model_1.Evento.create(event).then(eventDB => {
        res.json({
            ok: true,
            evento: eventDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            error: err
        });
    });
});
// Actualizar evento por ID
eventRoutes.post('/update/:id', (req, res) => {
    const idEvent = req.params.id;
    const event = {
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar
    };
    evento_model_1.Evento.findByIdAndUpdate(idEvent, event, { new: true }, (err, eventDB) => {
        if (err)
            throw err;
        if (!eventDB) {
            return res.json({
                ok: false,
                error: 'No existe ningún evento con ese Id'
            });
        }
        res.json({
            ok: true,
            evento: eventDB
        });
    });
});
// Eliminar evento por ID
eventRoutes.post('/delete/:id', (req, res) => {
    const idEvent = req.params.id;
    evento_model_1.Evento.findByIdAndDelete(idEvent, (err, eventBorrado) => {
        if (err)
            throw err;
        if (!eventBorrado) {
            return res.json({
                ok: false,
                error: 'No existe ningún evento con ese Id'
            });
        }
        res.json({
            ok: true,
            evento: eventBorrado
        });
    });
});
exports.default = eventRoutes;
