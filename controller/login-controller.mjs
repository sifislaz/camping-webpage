import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import passport from 'passport'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export let doRegister = function (req, res) {
    // bash.registerUserMethod(username, password, fname, lname, kinhto, mail (err, result)) =>
    {
        if(err){
            console.err('Registration error: ' + err)
        }
        else{
            res.redirect('/');
        }
    }
}

export let doLogin = function (req, res){
    // bash.getUserMethod(username, (err, user) =>
    {
        if(user === undefined){
            res.redirect('/')
        }
        else {
            const match = bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (match) {
                    req.session.loggedUserId = user.id;
                    const redirectTo = req.session.originalUrl || "/";
                    res.redirect(redirectTo);
                }
                else {
                    res.render("/")
                }
            })
        }
    }
}

export let doLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

export let checkAuthenticated = function (req, res, next) {

    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        next();
    }
    else {
        console.log("not authenticated, redirecting to /login")
        res.redirect('/', {logged: false});
    }
}