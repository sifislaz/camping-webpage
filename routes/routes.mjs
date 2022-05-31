import express  from 'express'
import dotenv from 'dotenv'
const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

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