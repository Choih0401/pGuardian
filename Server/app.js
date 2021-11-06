import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config();

import v1 from './routes/v1/v1';
import main from './routes/main';

const app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);

app.use(express.json());
app.use(
    express.urlencoded( {
        extended: false
    })
);
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

app.use('/', main);

app.use('/api/v1', v1);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        code: 500,
        v: 'v1',
        status: 'ERR_SERVER'
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});