import { Router, Request, Response } from "express";
import { Evento } from '../models/evento.model';

const eventRoutes = Router();

// Obtener todos los eventos
eventRoutes.get('/', (req: Request, res: Response) => {
    Evento.find((err, eventosDB) => {
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
eventRoutes.post('/create', (req: Request, res: Response) => {
    const event = {
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar
    };
    Evento.create(event).then(eventDB => {
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
eventRoutes.post('/update/:id', (req: Request, res: Response) => {
    const idEvent = req.params.id;
    const event = {
        fecha: req.body.fecha,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar
    };
    Evento.findByIdAndUpdate(idEvent, event, { new: true }, (err, eventDB) => {
        if (err) throw err;
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
eventRoutes.post('/delete/:id', (req: Request, res: Response) => {
    const idEvent = req.params.id;
    Evento.findByIdAndDelete(idEvent, (err, eventBorrado) => {
        if (err) throw err;
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

export default eventRoutes;