import express from 'express';

export default class Server {
    public app: express.Application;
    // public port: number = 3000;
    public port : string|number = process.env.PORT || 3000;
    public env: string = process.env.NODE_ENV || 'dev';

    constructor() {
        this.app = express();
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
    }
}