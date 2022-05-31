import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import * as dbmodel from '../model/model.mjs';
import passport from 'passport'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export let doRegister = function (req, res) {
    if(req.body.username === 'admin'){
        res.redirect('/');  // can't register admin user
    }
    else{
        dbmodel.insertClient({"username":req.body.username, "email":req.body.email, "password":req.body.password,
                            "firstname":req.body.firstname, "lastname":req.body.lastname, "mobile":req.body.mobile},
                            (err,result)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    res.redirect("/");
                                }
                            });
    }
}

export let doLogin = function (req, res){
    if(req.body.user==="admin"){
        dbmodel.getAdminByUsername(req.body.user, (err,admin)=>{
            if(admin === undefined){
                res.redirect('/');
            }
            else{
                const match = bcrypt.compare(req.body.pass, admin.password, (err,match)=>{
                    if(match){
                        req.session.loggedUserId = admin.id;
                        res.redirect("/admin/");
                    }
                    else{
                        res.redirect("/");
                    }
                })
            }
        })
    }
    else{
        dbmodel.getClientByUsername(req.body.user,(err,user)=>{
            if(user === undefined){
                res.redirect('/')
            }
            else {
                const match = bcrypt.compare(req.body.pass, user.password, (err, match) => {
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
        })
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
        res.redirect('/');
    }
}

export let checkAdmin = function (req, res, next){
    if(req.session.loggedUserId === 1){
        next();
    }
    else{
        res.redirect('/');
    }
}