import express = require('express');
import Routes from './routes/index';
import Middlewares from './middlewares/index';

export default class App {

    public app: express.Application;
    public port: number;
    public MApp: Middlewares;
    public RApp: Routes;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.MApp = new Middlewares();
        this.RApp = new Routes();
    }

    static init(port: number) {
        return new App( port );
    }


    private loadRoutes() {
        this.app.use( '/enmedio',this.RApp.getRoutes() );
    }

    private loadMiddleware() {
        this.app.use( this.MApp.getMiddleware() );
    }

    private configHeader() {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    start(callback: Function) {
        this.app.listen( this.port, callback() );
        this.configHeader();
        this.loadMiddleware();
        this.loadRoutes();
    }
}