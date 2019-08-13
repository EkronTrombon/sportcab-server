"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventoSchema = new mongoose_1.Schema({
    fecha: { type: Date, default: new Date(), required: [true, 'La fecha es obligatoria'] },
    titulo: { type: String, required: [true, 'El titulo del evento es obligatorio'] },
    descripcion: { type: String, default: '' },
    tipo: { type: String, required: [true, 'El tipo de evento es obligatorio'] },
    lugar: { type: String, required: false }
});
;
exports.Evento = mongoose_1.model('Evento', eventoSchema);
