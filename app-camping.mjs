import express from "express";
import * as hbs from "express-handlebars";
const app = express()
const router = express.Router();


app.use(express.static('assets/'));

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

//--------INDEX---------//
let renderIndex = function (req, res){
    res.render('index', {link:"", pageName:"Αρχική"})
}

let renderIndexEn = function (req, res){
    res.render('index-en', {link:"",pageName:"Home",layout : 'main-en.hbs'})
}
//----------------------//

//--------FACILITIES---------//
let renderFacilities = function (req, res){
    res.render('facilities', {link:"camping/facilities/", pageName:"Εγκαταστάσεις"})
}

let renderFacilitiesEn = function (req, res){
    res.render('facilities-en', {link:"camping/facilities/",pageName:"Facilities",layout : 'main-en.hbs'})
}
//---------------------------//


//--------SEASON---------//
let renderSeason = function (req, res){
    res.render('season', {link:"camping/season/", pageName:"Περίοδοι Λειτουργίας"})
}

let renderSeasonEn = function (req, res){
    res.render('season-en', {link:"camping/season/", pageName:"Operating Periods", layout : 'main-en.hbs'})
}
//-----------------------//


//--------ACTIVITIES---------//
let renderActivities = function (req, res){
    res.render('activities', {link:"camping/activities/", pageName:"Δραστηριότητες"})
}

let renderActivitiesEn = function (req, res){
    res.render('activities-en', {link:"camping/activities/", pageName:"Activities", layout : 'main-en.hbs'})
}
//---------------------------//

//--------PRICELIST---------//
let renderPricelist = function (req, res){
    res.render('pricelist', {link:"pricelist/", pageName:"Τιμοκατάλογος"})
}

let renderPricelistEn = function (req, res){
    res.render('pricelist-en', {link:"pricelist/", pageName:"Pricelist", layout : 'main-en.hbs'})
}
//--------------------------//

//--------CRETE---------//
let renderCrete = function (req, res){
    res.render('crete', {link:"crete/", pageName:"Η Κρήτη"})
}

let renderCreteEn = function (req, res){
    res.render('crete-en', {link:"crete/", pageName:"Crete", layout : 'main-en.hbs'})
}
//----------------------//

//--------FORM---------//
let renderForm = function (req, res){
    res.render('form', {link:"form/", pageName:"Σχόλια"})
}

let renderFormEn = function (req, res){
    res.render('form-en', {link:"form/", pageName:"Comments", layout : 'main-en.hbs'})
}
//---------------------//

app.use(router);

//--------INDEX---------//
router.route('/').get(renderIndex);
router.route('/en/').get(renderIndexEn);
//----------------------//

//--------FACILITIES---------//
router.route('/camping/facilities/').get(renderFacilities);
router.route('/en/camping/facilities/').get(renderFacilitiesEn);
//---------------------------//

//--------SEASON---------//
router.route('/camping/season/').get(renderSeason);
router.route('/en/camping/season/').get(renderSeasonEn);
//-----------------------//

//--------ACTIVITIES---------//
router.route('/camping/activities/').get(renderActivities);
router.route('/en/camping/activities/').get(renderActivitiesEn);
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
router.route('/form/').get(renderForm);
router.route('/en/form/').get(renderFormEn);
//---------------------//

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αίτηματα στο port: " + port)});