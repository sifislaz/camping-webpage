import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

export let websiteSession = session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true
    }
});

export default websiteSession;