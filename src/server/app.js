import path from 'path';
import express from 'express';
import * as loggers from './util/loggers';
import router from './routes';

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), '/dist/public'));

app.use('/favicon.ico', express.static('public/images/favicon.ico'));
app.use('/', express.static(path.join(process.cwd(), '/dist/public'), { maxAge: '365d' }));// todo: move assets folder to asset public and add base path

// Place the express-winston logger before the router.
app.use(loggers.infoConsoleLogger);

app.use('/', router);

// Place the express-winston errorLogger after the router.
app.use(loggers.errorConsoleLogger);

export default app;
