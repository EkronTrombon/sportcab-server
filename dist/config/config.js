"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// Base de datos
let urlDB;
if (process.env.NODE_ENV = 'dev') {
    urlDB = 'mongodb://localhost:27017/sportcab';
}
else {
    urlDB = 'mongodb+srv://ekron:71wer6kJhNkfkOTL@cluster0-yaqk0.mongodb.net/sportcab';
}
exports.MONGO_URI = urlDB;
