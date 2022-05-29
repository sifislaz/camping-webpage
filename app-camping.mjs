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
    res.render('index', {link:""})
}

let renderIndexEn = function (req, res){
    res.render('index-en', {link:"",layout : 'main-en.hbs'})
}
//----------------------//

//--------FACILITIES---------//
let renderFacilities = function (req, res){
    res.render('facilities', {link:"camping/facilities/"})
}

let renderFacilitiesEn = function (req, res){
    res.render('facilities-en', {link:"camping/facilities/",layout : 'main-en.hbs'})
}
//---------------------------//


//--------SEASON---------//
let renderSeason = function (req, res){
    res.render('season', {link:"camping/season/"})
}

let renderSeasonEn = function (req, res){
    res.render('season-en', {link:"camping/season/", layout : 'main-en.hbs'})
}
//-----------------------//


//--------ACTIVITIES---------//
let renderActivities = function (req, res){
    res.render('activities', {link:"camping/activities/"})
}

let renderActivitiesEn = function (req, res){
    res.render('activities-en', {link:"camping/activities/", layout : 'main-en.hbs'})
}
//---------------------------//

//--------PRICELIST---------//
let renderPricelist = function (req, res){
    res.render('pricelist', {link:"pricelist/"})
}

let renderPricelistEn = function (req, res){
    res.render('pricelist-en', {link:"pricelist/",layout : 'main-en.hbs'})
}
//--------------------------//

//--------CRETE---------//
let renderCrete = function (req, res){
    res.render('crete', {link:"crete/"})
}

let renderCreteEn = function (req, res){
    res.render('crete-en', {link:"crete/", layout : 'main-en.hbs'})
}
//----------------------//

//--------FORM---------//
let renderForm = function (req, res){
    res.render('form', {link:"form/"})
}

let renderFormEn = function (req, res){
    res.render('form-en', {link:"form/", layout : 'main-en.hbs'})
}
//---------------------//

//--------ADMIN---------//
let adminMain = function(req, res){
    res.render('admin');
}

let adminBookings = function(req, res){
    res.render('admin-bookings');
}

let adminSpace = function(req, res){
    res.render('admin-space');
}

let adminStatistics = function(req, res){
    res.render('admin-stats');
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

//--------ADMIN---------//
router.route('/admin/').get(adminMain);
router.route('/admin/bookings/').get(adminBookings);
router.route('/admin/space/').get(adminSpace);
router.route('/admin/statistics/').get(adminStatistics);
//---------------------//

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Περιμένω αίτηματα στο port: " + port)});