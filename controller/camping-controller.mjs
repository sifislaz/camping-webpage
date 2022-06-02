import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as modelDB from '../model/model.mjs';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

export let renderIndex = function (req, res){
    res.render('index', {link:"", pageName:"Αρχική"})
}

export let renderIndexEn = function (req, res){
    res.render('index-en', {link:"",pageName:"Home",layout : 'main-en.hbs'})
}

export let renderFacilities = function (req, res){
    res.render('facilities', {link:"camping/facilities/", pageName:"Εγκαταστάσεις"})
}

export let renderFacilitiesEn = function (req, res){
    res.render('facilities-en', {link:"camping/facilities/",pageName:"Facilities",layout : 'main-en.hbs'})
}

export let renderSeason = function (req, res){
    res.render('season', {link:"camping/season/", pageName:"Περίοδοι Λειτουργίας"})
}

export let renderSeasonEn = function (req, res){
    res.render('season-en', {link:"camping/season/", pageName:"Operating Periods", layout : 'main-en.hbs'})
}

export let renderActivities = function (req, res){
    res.render('activities', {link:"camping/activities/", pageName:"Δραστηριότητες"})
}

export let renderActivitiesEn = function (req, res){
    res.render('activities-en', {link:"camping/activities/", pageName:"Activities", layout : 'main-en.hbs'})
}

export let renderPricelist = function (req, res){
    res.render('pricelist', {link:"pricelist/", pageName:"Τιμοκατάλογος"})
}

export let renderPricelistEn = function (req, res){
    res.render('pricelist-en', {link:"pricelist/", pageName:"Pricelist", layout : 'main-en.hbs'})
}

export let renderCrete = function (req, res){
    res.render('crete', {link:"crete/", pageName:"Η Κρήτη"})
}

export let renderCreteEn = function (req, res){
    res.render('crete-en', {link:"crete/", pageName:"Crete", layout : 'main-en.hbs'})
}

export let renderForm = function (req, res){
    res.render('form', {link:"form/", pageName:"Σχόλια"})
}

export let renderFormEn = function (req, res){
    res.render('form-en', {link:"form/", pageName:"Comments", layout : 'main-en.hbs'})
}

export let renderFormNotLogged = function(req, res){
    res.render('form-log-in', {link:"form/", pageName:"Σχόλια"});
}

export let adminMain = function(req, res){
    res.render('admin', {link:"admin/", pageName:"Main"});
}

export let adminBookings = function(req, res){
    res.render('admin-bookings', {link:"admin/bookings/", pageName:"Bookings"});
}

export let adminSpace = function(req, res){
    res.render('admin-space', {link:"admin/space/", pageName:"Space"});
}

export let adminStatistics = function(req, res){
    res.render('admin-stats', {link:"admin/statistics/", pageName:"Statistics"});
}

export let renderBookings = function(req, res){
    modelDB.getUserReservations(req.session.loggedUserId, (err,bookings)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            res.render('booking-selection', {link:"bookings/", pageName:"Κρατήσεις", bookings:bookings});
        }
    })
    
}

export let renderBookingsEn = function(req, res){
    modelDB.getUserReservations(req.session.loggedUserId, (err,bookings)=>{
        if(err){
            console.log(err);
            res.redirect('/en/');
        }
        else{
            console.log(bookings)
            res.render('booking-selection-en', {link:"bookings/", pageName:"Bookings", bookings:bookings, layout:"main-en.hbs"});
        }
    })
}

export let renderProfile = function (req, res){
    const userId = req.session.loggedUserId
    modelDB.getClientById(userId, (err, info) => {
        if(err){
            res.redirect('/')
        }
        else{
            console.log(info)
            res.render('profile', {link:"profile/", pageName:'Προφίλ', info:info})
        }
    })
}

export let renderProfileEn = function (req, res){
    const userId = req.session.loggedUserId
    modelDB.getClientById(userId, (err, info) => {
        if(err){
            res.redirect('/en/')
        }
        else{
            console.log(info)
            res.render('profile-en', {link:"profile/", pageName:'Profile', info:info})
        }
    })
}

export let updateProfile = function (req, res){
    const id = req.session.loggedUserId;
    let client;
    modelDB.getClientById(id, (err, cl)=>{
        if(err){
            res.redirect("/profile/");
        }
        else{
            client = cl[0];
        }
    })
    const firstName = req.body.fname||client.firstname;
    const lastName = req.body.lname||client.lastname;
    const email = req.body.email||client.email;
    const mobile = req.body.mobile||client.mobile;
    const newPass = bcrypt.hashSync(req.body.newPass,10)||client.password;

    const newClientInfo = {
        "id":id,
        "firstname":firstName,
        "lastname":lastName,
        "email":email,
        "password":newPass,
        "mobile":mobile
    }

    modelDB.updateClient(newClientInfo, (err, result) => {
        if(err){
            res.redirect('/profile/')
            console.log(err);
        }
        else{
            res.redirect('/profile/')
        }
    })

}