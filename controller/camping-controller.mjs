import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import * as modelDB from '../model/model.mjs';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

export let renderIndex = function (req, res){
    let loggedIn;
    loggedIn = !!req.session.loggedUserId;

    res.render('index', {link:"", pageName:"Αρχική", loggedIn:loggedIn});
}

export let renderIndexEn = function (req, res){
    let loggedIn;
    loggedIn = !!req.session.loggedUserId;

    res.render('index-en', {link:"",pageName:"Home",layout : 'main-en.hbs', loggedIn:loggedIn})
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

export let adminMain = function(req, res){
    res.render('admin', {link:"admin/", pageName:"Main"});
}

export let renderNewBooking = function(req, res){
    const userId = req.session.loggedUserId

    modelDB.getClientById(userId, (err, info) =>{
        if(err){
            res.redirect('/bookings/')
        }
        else{
            res.render('new-booking', {link:"newBooking/", pageName:"Νέα Κράτηση", search:false, info:info})
        }
    })
}

export let renderNewBookingEn = function(req, res){
    const userId = req.session.loggedUserId

    modelDB.getClientById(userId, (err, info) =>{
        if(err){
            res.redirect('/en/bookings/')
        }
        else{
            res.render('new-booking-en', {link:"newBooking/", pageName:"New Booking", search:false, info:info, layout:"main-en.hbs"})
        }
    })
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
    modelDB.getSpaceFromBooking(req.params.bookingId,(err,bookings)=>{
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", message:"Δεν φορτώθηκε η κράτηση", css:true});
        }
        else{
            const booking = bookings[0];
            let spaces = []
            const bookingsInfo = [{
                "id":booking.id,
                "checkin":`${booking.checkin.getFullYear()}-${(booking.checkin.getMonth()+1).toString().length===1?"0"+(booking.checkin.getMonth()+1):(booking.checkin.getMonth()+1)}-${booking.checkin.getDate().toString().length===1?"0"+booking.checkin.getDate():booking.checkin.getDate()}`,
                "checkout":`${booking.checkout.getFullYear()}-${(booking.checkout.getMonth()+1).toString().length===1?"0"+(booking.checkout.getMonth()+1):(booking.checkout.getMonth()+1)}-${booking.checkout.getDate().toString().length===1?"0"+booking.checkout.getDate():booking.checkout.getDate()}`,
                "nop":booking.no_of_people.toString()
            }]

            for(let b of bookings){
                const book = {
                            "space_capacity":b.space_capacity,
                            "location":b.location
                         };
                spaces.push(book);
            }
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", space:spaces, booking:bookingsInfo, css:true});
        }
    })
}

export let renderBookingEn = function(req,res){
    modelDB.getSpaceFromBooking(req.params.bookingId,(err,bookings)=>{
        if(err){
            console.log(err);
            res.render('edit-booking-en', {layout:'main-en.hbs', link:`bookings/${req.params.bookingId}/`, pageName:"Edit Booking", message:"Couldn't load booking.", css:true});
        }
        else{
            const booking = bookings[0];
            let spaces = []
            const bookingsInfo = [{
                "id":booking.id,
                "checkin":`${booking.checkin.getFullYear()}-${(booking.checkin.getMonth()+1).toString().length===1?"0"+(booking.checkin.getMonth()+1):(booking.checkin.getMonth()+1)}-${booking.checkin.getDate().toString().length===1?"0"+booking.checkin.getDate():booking.checkin.getDate()}`,
                "checkout":`${booking.checkout.getFullYear()}-${(booking.checkout.getMonth()+1).toString().length===1?"0"+(booking.checkout.getMonth()+1):(booking.checkout.getMonth()+1)}-${booking.checkout.getDate().toString().length===1?"0"+booking.checkout.getDate():booking.checkout.getDate()}`,
                "nop":booking.no_of_people.toString()
            }]

            for(let b of bookings){
                const book = {
                            "space_capacity":b.space_capacity,
                            "location":b.location
                         };
                spaces.push(book);
            }
            res.render('edit-booking-en', {layout:'main-en.hbs', link:`bookings/${req.params.bookingId}/`, pageName:"Edit Booking", space:spaces, booking:bookingsInfo, css:true});
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
            res.render('profile-en', {link:"profile/", pageName:'Profile', info:info, layout:"main-en.hbs"})
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

export let updateProfileEn = function (req, res){
    const id = req.session.loggedUserId;
    let client;
    modelDB.getClientById(id, (err, cl)=>{
        if(err){
            res.redirect("/en/profile/");
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
            res.redirect('/en/profile/')
            console.log(err);
        }
        else{
            res.redirect('/en/profile/')
        }
    })

}

export let getAvailableSpaces = function(req, res){
    const id = req.session.loggedUserId;
    const nop = req.body.people;
    const details = {
        "fname":req.body.firstname,
        "lname":req.body.lastname,
        "mobile":req.body.cell,
        "zip":req.body.zip,
        "street":req.body.street,
        "num":req.body.num,
        "nop":nop,
        "checkin":req.body.checkin,
        "checkout":req.body.checkout
    }
    
    modelDB.getSpacesByPeople(details, (err, result) => {
        if(err){
            console.log(err);
            res.render('add-booking', {link:'newBooking/', pageName:'Νέα Κράτηση', msg: 'Κάτι πήγε στραβά', search:false})
        }
        else{
            res.render('add-booking', {link:'newBooking/', pageName:'Νέα Κράτηση', result: result, search:true, details:[details]})
        }
    })
}

export let getAvailableSpacesEn = function(req, res){
    const id = req.session.loggedUserId;
    const nop = req.body.people;
    const details = {
        "fname":req.body.firstname,
        "lname":req.body.lastname,
        "mobile":req.body.cell,
        "zip":req.body.zip,
        "street":req.body.street,
        "num":req.body.num,
        "nop":nop,
        "checkin":req.body.checkin,
        "checkout":req.body.checkout
    }

    modelDB.getSpacesByPeople(details, (err, result) => {
        if(err){
            console.log(err);
            res.render('add-booking-en', {link:'newBooking/', pageName:'New Booking', msg: 'Somehting went wrong', search:false, layout:'main-en.hbs'})
        }
        else{
            res.render('add-booking-en', {link:'newBooking/', pageName:'New Booking', result: result, search:true, details:[details] , layout:'main-en.hbs'})
        }
    })
}

export let updateClientBooking = function(req,res,next){
    if(req.body.firstname === undefined){
        console.log("empty");
        next();
    }
    else{
        const client = {
            "id" : req.session.loggedUserId,
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
            "street" : req.body.street,
            "num" : req.body.num,
            "zip" : req.body.zip,
            "cell" : req.body.cell
        };
        modelDB.updateClientFull(client,(err, result)=>{
            if(err){
                console.log(err);
                res.render('new-booking', {link:'newBooking/', pageName:'Νέα Κράτηση', result:false, msg:"Κάτι πήγε στραβά"});
            }
            else{
                next();
            }
        });
    }
    
}

export let updateClientBookingEn = function(req,res,next){
    const client = {
        "id" : req.session.loggedUserId,
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "street" : req.body.street,
        "num" : req.body.num,
        "zip" : req.body.zip,
        "cell" : req.body.cell
    };
    modelDB.updateClientFull(client,(err, result)=>{
        if(err){
            console.log(err);
            res.render('new-booking-en', {layout:'main-en.hbs', link:'newBooking/', pageName:'New Booking', result:false, msg:"Something went wrong"});
        }
        else{
            next();
        }
    })
}

export let checkBookingInfo = function(req,res,next){
    const checkIn = new Date(req.body.checkin);
    const checkOut = new Date(req.body.checkout);
    if(checkIn > checkOut){
        res.render('new-booking', {link:'newBooking/', pageName:'Νέα Κράτηση', result:false, msg:"Η ημερομηνία αναχώρησης δεν γίνεται να προηγείται της ημερομηνίας άφιξης"});
    }
    else if(checkIn < Date.now()){
        res.render('new-booking', {link:'newBooking/', pageName:'Νέα Κράτηση', result:false, msg:"Η ημερομηνία άφιξης δεν μπορεί να είναι πριν από σήμερα"});
    }
    else{
        next();
    }
}

export let checkBookingInfoEn = function(req,res,next){
    const checkIn = new Date(req.body.checkin);
    const checkOut = new Date(req.body.checkout);
    if(checkIn > checkOut){
        res.render('new-booking-en', {link:'newBooking/', pageName:'New Booking', result:false, msg:"Checkout date can't be before checkin date", layout:"main-en.hbs"});
    }
    else if(checkIn < Date.now()){
        res.render('new-booking-en', {link:'newBooking/', pageName:'New Booking', result:false, msg:"Checkin date can't be before today", layout:"main-en.hbs"});
    }
    else{
        next();
    }
}

export let getAvailableSpacesEdit = async function(req, res){
    const id = req.session.loggedUserId;
    const nop = req.body.people;
    const newCheckIn =  req.body.checkin;
    const newCheckOut = req.body.checkout;
    const bookingId = req.params.bookingId;
    let spaces = []

    const info = {
        'id':bookingId,
        'nop':nop,
        'checkin':newCheckIn,
        'checkout':newCheckOut,
        "check":false
    }

    await modelDB.getSpaceFromBooking(req.params.bookingId,(err,bookings)=>{
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", message:"Δεν φορτώθηκε κράτηση", css:true});
        }
        else{
            for(let b of bookings){
                const book = {
                            "space_capacity":b.space_capacity,
                            "location":b.location
                         };
                spaces.push(book);
            }
        }
    })

    await modelDB.getSpacesByPeople(info, (err, result) => {
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${bookingId}/`, pageName:'Τροποποίηση Κράτησης', message: 'Κατι πήγε στραβά ', search:false, css:true})
        }
        else{
            console.log(result);
            info.check = true;
            res.render('edit-booking', {link:`bookings/${bookingId}/`, pageName:'Τροποποίηση Κράτησης', newResults: result, space:spaces, booking:[info] ,css:true})
        }
    })
}

export let getAvailableSpacesEditEn = async function(req, res){
    const id = req.session.loggedUserId;
    const nop = req.body.people;
    const newCheckIn =  req.body.checkin;
    const newCheckOut = req.body.checkout;
    const bookingId = req.params.bookingId;
    let spaces = []

    const info = {
        'id':bookingId,
        'nop':nop,
        'checkin':newCheckIn,
        'checkout':newCheckOut
    }

    await modelDB.getSpaceFromBooking(req.params.bookingId,(err,bookings)=>{
        if(err){
            console.log(err);
            res.render('edit-booking-en', {link:`bookings/${req.params.bookingId}/`, layout:"main-en.hbs", pageName:"Edit Booking", message:"Couldn't load booking.", css:true});
        }
        else{
            for(let b of bookings){
                const book = {
                            "space_capacity":b.space_capacity,
                            "location":b.location
                         };
                spaces.push(book);
            }
            console.log(spaces);
        }
    })

    await modelDB.getSpacesByPeople(info, (err, result) => {
        if(err){
            console.log(err);
            res.render('edit-booking-en', {link:`bookings/${bookingId}/`, layout:"main-en.hbs", pageName:'Edit Booking', message: 'Somehting Went Wrong.', search:false, css:true})
        }
        else{
            console.log(result);
            res.render('edit-booking-en', {link:`bookings/${bookingId}/`, layout:"main-en.hbs", pageName:'Edit Booking', newResults: result, search:true, space:spaces, booking:[info] ,css:true})
        }
    })
}

export let updateBooking =  async function(req, res){
    const bookingId = req.params.bookingId;
    const nop = req.body.people;
    const newCheckin =  req.body.checkin;
    const newCheckout =  req.body.checkout;
    const  space = req.body.selectedspace;

    const newInfo = {
        'reservation_id':bookingId,
        'nop':nop,
        'checkin':newCheckin,
        'space_id': space,
        'checkout':newCheckout
    }


    await modelDB.updateReservation(newInfo, (err, result) => {
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", message:"Δεν φορτώθηκε κράτηση", css:true});
        }
    });

    await modelDB.deleteSpaceReservation(bookingId, (err, result) => {
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", message:"Δεν φορτώθηκε κράτηση", css:true});
        }
    });

    await modelDB.reservedSpace(newInfo, (err, result) =>{
        if(err){
            console.log(err);
            res.render('edit-booking', {link:`bookings/${req.params.bookingId}/`, pageName:"Επεξεργασία Κράτησης", message:"Δεν φορτώθηκε κράτηση", css:true});
        }
    })

    res.redirect('/bookings/')
}

export let updateBookingEn =  async function(req, res){
    const bookingId = req.params.bookingId;
    const nop = req.body.people;
    const newCheckin =  req.body.checkin;
    const newCheckout =  req.body.checkout;
    const  space = req.body.selectedspace;

    const newInfo = {
        'reservation_id':bookingId,
        'nop':nop,
        'checkin':newCheckin,
        'space_id': space,
        'checkout':newCheckout
    }


    await modelDB.updateReservation(newInfo, (err, result) => {
        if(err){
            console.log(err);
            res.render('edit-booking-en', {layout:"main-en.hbs",link:`bookings/${req.params.bookingId}/`, pageName:"Edit Booking", message:"Couldn't load booking", css:true});
        }
    });

    await modelDB.deleteSpaceReservation(bookingId, (err, result) => {
        if(err){
            console.log(err);
            res.render('edit-booking-en', {layout:"main-en.hbs",link:`bookings/${req.params.bookingId}/`, pageName:"Edit booking", message:"Couldn't load booking", css:true});
        }
    });

    await modelDB.reservedSpace(newInfo, (err, result) =>{
        if(err){
            console.log(err);
            res.render('edit-booking-en', {layout:"main-en.hbs", link:`bookings/${req.params.bookingId}/`, pageName:"Edit Booking", message:"Couldn't load booking", css:true});
        }
    })

    res.redirect('/en/bookings/')
}


export let addBooking = async function (req, res){
    const date = new Date();
    const reservationDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().length===1?"0"+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate().toString().length===1?"0"+date.getDate():date.getDate()}`;
    const reservation = {
        "checkin":req.body.checkin,
        "checkout":req.body.checkout,
        "situation":"ΕΝΕΡΓΗ",
        "no_of_people":req.body.people,
        "client_id":req.session.loggedUserId,
        "reservation_date": reservationDate,
        "space_id":req.body.selectedspace
    }
    let reservationId = 0;

    await modelDB.insertReservation(reservation, (err, result) => {
        if(err){
            console.log(err);
            res.redirect('/newBooking')
        }
    })

    await modelDB.getLastReservationId((err, id) => {
        if(err){
            console.log(err);
            res.redirect('/newBooking')
        }
        else{
            reservationId=id.id;
        }
    })

    for (let space of req.body.selectedspace){
        const reserves = {
            "reservation_id":reservationId,
            "space_id":space,
            "checkin":req.body.checkin,
            "checkout":req.body.checkout
        }
        await modelDB.reservedSpace(reserves, (err, result) => {
            if(err){
                console.log(err);
                res.redirect('/newBooking')
            }
        })
    }

    res.redirect('/bookings');
}

export let addBookingEn = async function (req, res){
    const date = new Date();
    const reservationDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().length===1?"0"+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate().toString().length===1?"0"+date.getDate():date.getDate()}`;
    const reservation = {
        "checkin":req.body.checkin,
        "checkout":req.body.checkout,
        "situation":"ACTIVE",
        "no_of_people":req.body.people,
        "client_id":req.session.loggedUserId,
        "reservation_date": reservationDate,
        "space_id":req.body.selectedspace
    }
    let reservationId = 0;

    await modelDB.insertReservation(reservation, (err, result) => {
        if(err){
            console.log(err);
            res.redirect('/en/newBooking')
        }
    })

    await modelDB.getLastReservationId((err, id) => {
        if(err){
            console.log(err);
            res.redirect('/en/newBooking')
        }
        else{
            reservationId=id.id;
        }
    })

    for (let space of req.body.selectedspace){
        const reserves = {
            "reservation_id":reservationId,
            "space_id":space,
            "checkin":req.body.checkin,
            "checkout":req.body.checkout
        }
        await modelDB.reservedSpace(reserves, (err, result) => {
            if(err){
                console.log(err);
                res.redirect('/en/newBooking')
            }
        })
    }

    res.redirect('/en/bookings');
}

export let cancelBooking = async function(req,res){
    const bookingId = req.params.bookingId;

    await modelDB.cancelBooking(bookingId, (err, result) => {
        if(err){
            console.log(err);
            res.redirect('/bookings/');
        }
    });

    await modelDB.deleteSpaceReservation(bookingId, (err, result) => {
        if(err){
            console.log(err);
            res.redirect('/bookings/');
        }
        else{
            res.redirect("/bookings/");
        }
    });
}

export let cancelBookingEn = async function(req,res){
    const bookingId = req.params.bookingId;

    await modelDB.cancelBooking(bookingId, (err, result) => {
        if(err){
            console.log(err);
            res.redirect('/en/bookings/');
        }
    });

    await modelDB.deleteSpaceReservation(bookingId, (err, result) => {
        if(err){
            console.log(err);
            res.redirect('/en/bookings/');
        }
        else{
            res.redirect("/en/bookings/");
        }
    });
}
