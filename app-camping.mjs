import express from "express";
import { engine } from "express-handlebars";
const app = express()
const router = express.Router();


//--------ROUTES---------//
// import {facilitiesRouter, facilitiesRouterEn} from "/routes/facilitiesRoute"

app.use(express.static('assets/'));

app.engine('hbs', engine({extname: 'hbs'}));

app.set('view engine', 'hbs');

//--------INDEX---------//
let renderIndex = function (req, res){
    res.render('index')
}

let renderIndexEn = function (req, res){
    res.render('index-en', {layout : 'main-en.hbs'})
}
//----------------------//

//--------FACILITIES---------//
let renderFacilities = function (req, res){
    res.render('facilities')
}

let renderFacilitiesEn = function (req, res){
    res.render('facilities-en', {layout : 'main-en.hbs'})
}
//---------------------------//


//--------SEASON---------//
let renderSeason = function (req, res){
    res.render('season')
}

let renderSeasonEn = function (req, res){
    res.render('season-en', {layout : 'main-en.hbs'})
}
//-----------------------//


//--------ACTIVITIES---------//
let renderActivities = function (req, res){
    res.render('activities')
}

let renderActivitiesEn = function (req, res){
    res.render('activities-en', {layout : 'main-en.hbs'})
}
//---------------------------//

//--------PRICELIST---------//
let renderPricelist = function (req, res){
    res.render('pricelist')
}

let renderPricelistEn = function (req, res){
    res.render('pricelist-en', {layout : 'main-en.hbs'})
}
//--------------------------//

//--------CRETE---------//
let renderCrete = function (req, res){
    res.render('crete')
}

let renderCreteEn = function (req, res){
    res.render('crete-en', {layout : 'main-en.hbs'})
}
//----------------------//

//--------FORM---------//
let renderForm = function (req, res){
    res.render('form')
}

let renderFormEn = function (req, res){
    res.render('form-en', {layout : 'main-en.hbs'})
}
//---------------------//

app.use(router);

//--------INDEX---------//
router.route('/').get(renderIndex);
router.route('/en/').get(renderIndexEn);
//----------------------//

//--------FACILITIES---------//
router.route('/facilities/').get(renderFacilities);
router.route('/en/facilities/').get(renderFacilitiesEn);
//---------------------------//

//--------SEASON---------//
router.route('/season/').get(renderSeason);
router.route('/en/season/').get(renderSeasonEn);
//-----------------------//

//--------ACTIVITIES---------//
router.route('/activities/').get(renderActivities);
router.route('/en/activities/').get(renderActivitiesEn);
//---------------------------//

//--------PRICELIST---------//
router.route('/pricelist/').get(renderPricelist);
router.route('/en/pricelist/').get(renderPricelistEn);
//--------------------------//

//--------CRETE---------//
router.route('/crete/').get(renderCrete);
router.route('/en/crete/').get(renderCreteEn);
//----------------------//

//--------FORM---------//
router.route('/contact/').get(renderForm);
router.route('/en/contact/').get(renderFormEn);
//---------------------//

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αίτηματα στο port: " + port)});