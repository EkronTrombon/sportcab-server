import { Schema, model, Document } from 'mongoose';


const eventoSchema = new Schema({
    fecha: { type: Date, default: new Date(), required: [true, 'La fecha es obligatoria'] },
    titulo: { type: String, required: [true, 'El titulo del evento es obligatorio'] },
    descripcion: { type: String, default: '' },
    tipo: { type: String, required: [true, 'El tipo de evento es obligatorio'] },
    lugar: { type: String, required: false }
});

interface IEvento extends Document {
    fecha: string;
    titulo: string;
    descripcion: string;
    tipo: string;
    lugar: string;
};

export const Evento = model<IEvento>('Evento', eventoSchema);