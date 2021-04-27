import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
import morgan = require('morgan');
import log4js = require('log4js');
var logger = log4js.getLogger('global.ts');
logger.level = 'all';

export default class Global {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.configGlobal();
        this.publicFolder();
    }

    /**
     * @description Global middlewares settings.
     * 02/05/2020
     * @author scespedes
     * @version 1.0.0
     */
     private configGlobal(): void {
        logger.info(`Start config global successfully`);
        this.app.use( bodyParser.urlencoded( {extended:false} ) );
        this.app.use( bodyParser.json() );
        this.app.use( morgan('dev') );
    }

    /**
     * @description Public folder settings.
     * 02/05/2020
     * @author scespedes
     * @version 1.0.0
     */
    private publicFolder(): void {
        logger.info(`Start public folder successfully`);
        const publicPath = path.resolve(__dirname, '../../public');
        this.app.use( express.static( publicPath ));
    }

    /**
     * @description Return the settings for express to settings index.
     * 02/05/2020
     * @author scespedes
     * @version 1.0.0
     */
    public getApp(): any {
        return this.app;
    }
}