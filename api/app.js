import EXPRESS from 'express';
import CORS from 'cors';
import ROUTER from './src/Routes/Routes.js';
import BODYPARSER from 'body-parser';

const APP = EXPRESS();

APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(EXPRESS.json());

APP.use(CORS());
APP.use(BODYPARSER.urlencoded({ extended: false }));
APP.use(ROUTER);

export default APP;
