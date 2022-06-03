import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as modelDB from '../model/model.mjs';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

export let renderIndex = function (req, res){
    res.render('index', {link:"", pageName:"Αρχική"});
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
    modelDB.getAllReservations((err,result)=>{
        if(err){
            console.log(err);
            res.redirect("/admin/");
        }
        else{
            const bookings = [];
            for(let book of result){
                let checkin = `${book.checkin.getFullYear()}/${(book.checkin.getMonth()+1).toString().length==1?"0"+(book.checkin.getMonth()+1):(book.checkin.getMonth()+1)}/${(book.checkin.getDate()).toString().length==1?"0"+(book.checkin.getDate()):(book.checkin.getDate())}`;
                let checkout = `${book.checkout.getFullYear()}/${(book.checkout.getMonth()+1).toString().length==1?"0"+(book.checkout.getMonth()+1):(book.checkout.getMonth()+1)}/${(book.checkout.getDate()).toString().length==1?"0"+(book.checkout.getDate()):(book.checkout.getDate())}`;
                let b = {"id":book.id, "lastname":book.lastname, "people":book.no_of_people, "tent":book.space_id, "checkin":checkin, "checkout":checkout}
                bookings.push(b);
            }
            res.render('admin-bookings', {link:"admin/bookings/", pageName:"Bookings", bookings:bookings});
        }
    });
    
}

export let adminSpace = function(req, res){
    res.render('admin-space', {link:"admin/space/", pageName:"Space"});
}

export let adminRegisterSpace = function(req,res){
    const space = {"location":req.body.location, "noOfPeople":req.body.people, "adminId":req.session.loggedUserId};
    modelDB.insertSpace(space,(err,result)=>{
        if(err){
            console.log(err);
            res.render("admin-space", {link:"admin/space/", pageName:"Space", messageReg:"Error: "+err});
        }
        else{
            res.render('admin-space',{link:"admin/space/", pageName:"Space", messageReg:"Added space successfully"});
        }
    });
}

export let adminDeleteSpace = function(req,res){
    modelDB.deleteSpace(req.body.spaceId, (err,result)=>{
        if(err){
            console.log(err);
            res.render('admin-space',{link:"admin/space/", pageName:"Space", messageDel:"Error: "+err});
        }
        else{
            res.render('admin-space',{link:"admin/space/", pageName:"Space", messageDel:"Deleted space successfully"});
        }
    });
}

export async function adminStatistics(req, res){
    let bookNum, usersNum, bestClient;
    let message1, message2, message3;
   await modelDB.getReservationNum((err,result)=>{
        if(err){
            message1 = err;
            console.log(err);
        }
        else{
            bookNum = result[0].count;
        }
    });
    await modelDB.getClientsNum((err,result)=>{
        if(err){
            message2 = err;
            console.log(err);
        }
        else{
            usersNum = result[0].count;
        }
    });
    await modelDB.getBestClient((err,result)=>{
        if(err){
            message3 = err;
            console.log(err);
        }
        else{
            if(result.length !== 0){
                bestClient = result[0].firstname + " "+ result[0].lastname;
            }
            else{
                bestClient = "None";
            }
        }
    });
    res.render('admin-stats', {link:"admin/statistics/", pageName:"Statistics", message1:message1, message2:message2, message3:message3, bookNum:bookNum, users:usersNum, bestClient:bestClient});
}

export let renderSpaces = function(req,res){
    modelDB.getSpaces((err,result)=>{
        if(err){
            console.log(err);
            res.redirect("/admin/");
        }
        else{
            const spaces=[];
            for(let reg of result){
                if(reg.checkin!==null && reg.checkout!==null && reg.checkin.getTime() < Date.now() && reg.checkout.getTime() > Date.now()){  // if currentDate between checkin and checkout
                    let s = {"id":reg.id, "location":reg.location, "people":reg.no_of_people, "free":false};
                    spaces.push(s);
                }
                else{
                    let s = {"id":reg.id, "location":reg.location, "people":reg.no_of_people, "free":true};
                    spaces.push(s);
                }
               
            }
            res.render('admin-get-spaces',{link:"admin/getSpaces/", pageName:"Spaces Panel", spaces:spaces});
        }
    });
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
    });
    
}

export let renderBookingsEn = function(req, res){
    modelDB.getUserReservations(req.session.loggedUserId, (err,bookings)=>{
        if(err){
            console.log(err);
            res.redirect('/en/');
        }
        else{
            res.render('booking-selection-en', {link:"bookings/", pageName:"Bookings", bookings:bookings, layout:"main-en.hbs"});
        }
    })
}


export let renderBooking = function(req,res){
    modelDB.getSpaceFromBooking(req.params.bookingId,(err,result)=>{
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", message:"Couldn't load booking.", css:true});
        }
        else{
            const booking = [{"id":result.id,
                            "checkin":`${result.checkin.getFullYear()}-${(result.checkin.getMonth()+1).toString().length===1?"0"+(result.checkin.getMonth()+1):(result.checkin.getMonth()+1)}-${result.checkin.getDate().toString().length===1?"0"+result.checkin.getDate():result.checkin.getDate()}`,
                            "checkout":`${result.checkout.getFullYear()}-${(result.checkout.getMonth()+1).toString().length===1?"0"+(result.checkout.getMonth()+1):(result.checkout.getMonth()+1)}-${result.checkout.getDate().toString().length===1?"0"+result.checkout.getDate():result.checkout.getDate()}`,
                            "booking_people":result.no_of_people,
                            "space_capacity":result.space_capacity,
                            "location":result.location
            }];
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", booking:booking, css:true});
        }
    })
}
export let renderBookingEn = function(req,res){
    modelDB.getSpaceFromBooking(req.params.bookingId,(err,result)=>{
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Edit Booking", message:"Couldn't load booking.", css:true});
        }
        else{
            const booking = [{"id":result.id,
                            "checkin":`${result.checkin.getFullYear()}-${(result.checkin.getMonth()+1).toString().length===1?"0"+(result.checkin.getMonth()+1):(result.checkin.getMonth()+1)}-${result.checkin.getDate().toString().length===1?"0"+result.checkin.getDate():result.checkin.getDate()}`,
                            "checkout":`${result.checkout.getFullYear()}-${(result.checkout.getMonth()+1).toString().length===1?"0"+(result.checkout.getMonth()+1):(result.checkout.getMonth()+1)}-${result.checkout.getDate().toString().length===1?"0"+result.checkout.getDate():result.checkout.getDate()}`,
                            "booking_people":result.no_of_people,
                            "space_capacity":result.space_capacity,
                            "location":result.location
            }];
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Edit Booking", booking:booking, css:true});
        }
    })
}

export let renderProfile = function (req, res){
    const userId = req.session.loggedUserId
    modelDB.getClientById(userId, (err, info) => {
        if(err){
            console.log(err);
            res.redirect('/')
        }
        else{
            res.render('profile', {link:"profile/", pageName:'Προφίλ', info:info})
        }
    })
}

export let renderProfileEn = function (req, res){
    const userId = req.session.loggedUserId
    modelDB.getClientById(userId, (err, info) => {
        if(err){
            console.log(err);
            res.redirect('/en/')
        }
        else{
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