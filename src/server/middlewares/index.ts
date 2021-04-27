import express = require('express');
import Global from './global';
import log4js = require('log4js');
var logger = log4js.getLogger('indexMiddlewares.ts');
logger.level = 'all';

export default  class Middlewares {
    public MApp: express.Application;
    public global: Global;

    constructor() {
        this.MApp = express();
        this.global = new Global();
        this.loadMiddlewaresGlobal();
    }

    /**
     * @description Method for load the middlewares global.
     * 02/05/2020
     * @author scespedes
     * @version 1.0.0
     */
    private loadMiddlewaresGlobal(): void {
        logger.info(`Start Routes Middlewares successfully`);
        this.MApp.use( this.global.getApp() );
    }

    /**
     * @description Return the settings for Middleware to settings principal index.
     * 02/05/2020
     * @author scespedes
     * @version 1.0.0
     */
    public  getMiddleware(): any {
        return this.MApp;
    }
}