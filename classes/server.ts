import express from 'express';

export default class Server {
    public app: express.Application;
    // public port: number = 3000;
    public port : string|number = process.env.PORT || 3000;
    public env: string = process.env.NODE_ENV || 'dev';
    public urlDB: string = '';

    constructor() {
        this.app = express();
        if (this.env === 'dev') {
            this.urlDB = 'mongodb://localhost:27017/sportcab';
        } else {
            this.urlDB = 'mongodb+srv://ekron:71wer6kJhNkfkOTL@cluster0-yaqk0.mongodb.net/sportcab';
        }
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
    }
}