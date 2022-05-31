import express from "express";
import dotenv from 'dotenv'
import * as hbs from 'express-handlebars'
import routes from './routes/routes.mjs'
import webSession from './app-setup/app-setup-session.mjs'

const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}


app.use(express.urlencoded({extended: false}));

//Session Init
app.use(webSession);

app.use(express.static('assets/'));

app.use((req, res, next)=>{
    res.locals.userId = req.session.loggedUserId;
    next();
});

app.use('/', routes);

app.engine('hbs', hbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');

//--------REGISTER HELPERS--------//
const ifEq = hbs.create({});
ifEq.handlebars.registerHelper('ifEqual', function () {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    const options = arguments[arguments.length - 1];
    const allEqual = args.every(function (expression) {
        return args[0] === expression;
    });

    return allEqual ? options.fn(this) : options.inverse(this);
});

let port = process.env.PORT || '3000';
const server = app.listen(port, () => { console.log("Περιμένω αιτήματα στο port: " + port)});
