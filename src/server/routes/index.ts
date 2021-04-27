import express = require('express');
import CArticle from '../controllers/article';


export default class Routes {
    private RApp: express.Application;

    constructor(){
        this.RApp = express();
        this.loadRoutes();
    }

    private loadRoutes(): void {
        this.RApp.use( CArticle );
    }

    public getRoutes(): any {
        return this.RApp;
    }
}