import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MONGO_URI } from './config/config';

const server = new Server();

// Bdy parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Rutas de la app
server.app.use('/user', userRoutes);

// Conexión con MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

// Levantar el servidor express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});