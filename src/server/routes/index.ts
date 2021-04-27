import express = require('express');
import CArticle from '../controllers/article';
import CArticleScore from '../controllers/article_score';
import CCustomer from '../controllers/customer';
import CDetailInvoice from '../controllers/detail_invoice';
import CInventory from '../controllers/inventory';
import CInvoice from '../controllers/invoice';


export default class Routes {
    private RApp: express.Application;

    constructor(){
        this.RApp = express();
        this.loadRoutes();
    }

    private loadRoutes(): void {
        this.RApp.use( CArticle );
        this.RApp.use( CCustomer );
        this.RApp.use( CArticleScore );
        this.RApp.use( CInvoice );
        this.RApp.use( CDetailInvoice );
        this.RApp.use( CInventory );
    }

    public getRoutes(): any {
        return this.RApp;
    }
}