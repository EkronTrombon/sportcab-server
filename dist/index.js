"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
// Bdy parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Configuración CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de la app
server.app.use('/user', usuario_1.default);
// Conexión con MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//     if (err) throw err;
//     console.log('Base de datos ONLINE');
// });
// mongoose.connect('mongodb://localhost:27017/sportcab', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
//     if (err) throw err;
//     console.log('Base de datos ONLINE');
// });
mongoose_1.default.connect('mongodb+srv://ekron:71wer6kJhNkfkOTL@cluster0-yaqk0.mongodb.net/sportcab', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Levantar el servidor express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
