import mongoose = require('mongoose');
import App from './server/app';
import { environment } from './environments/environment';
import log4js = require('log4js');
var logger = log4js.getLogger('index.ts');
logger.level = 'all';


mongoose.Promise = global.Promise;
mongoose.connect( String( environment.MONGO_URL ),{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} )
        .then(() => {
            logger.info('=========== Database connection established successfully ===========');

            //Server Creation
            const app = App.init(  environment.PORT );
            app.start( () => {

                if( !environment.production )
                {
                    logger.info(`Server running correctly in url: http://localhost:${environment.PORT}`);
                }
                else {
                    logger.info(`Server running correctly in url: https://roll-backend.herokuapp.com:${environment.PORT}`);
                    
                }
            
            });
        })
        .catch((err: any) => logger.error(err));