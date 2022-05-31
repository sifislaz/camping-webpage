import express  from 'express'
import dotenv from 'dotenv'
import * as loginControl from '../controller/login-controller.mjs';
import * as control from '../controller/camping-controller.mjs';
const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

//--------INDEX---------//
router.route('/').get(control.renderIndex);
router.route('/en/').get(control.renderIndexEn);
//----------------------//

//--------FACILITIES---------//
router.route('/camping/facilities/').get(control.renderFacilities);
router.route('/en/camping/facilities/').get(control.renderFacilitiesEn);
//---------------------------//

//--------SEASON---------//
router.route('/camping/season/').get(control.renderSeason);
router.route('/en/camping/season/').get(control.renderSeasonEn);
//-----------------------//

//--------ACTIVITIES---------//
router.route('/camping/activities/').get(control.renderActivities);
router.route('/en/camping/activities/').get(control.renderActivitiesEn);
//---------------------------//

//--------PRICELIST---------//
router.route('/pricelist/').get(control.renderPricelist);
router.route('/en/pricelist/').get(control.renderPricelistEn);
//--------------------------//

//--------CRETE---------//
router.route('/crete/').get(control.renderCrete);
router.route('/en/crete/').get(control.renderCreteEn);
//----------------------//

//--------FORM---------//
router.route('/form/').get(control.renderForm);
router.route('/en/form/').get(control.renderFormEn);
//---------------------//

//--------ADMIN---------//
router.route('/admin/').get(loginControl.checkAdmin, control.adminMain);
router.route('/admin/bookings/').get(loginControl.checkAdmin, control.adminBookings);
router.route('/admin/space/').get(loginControl.checkAdmin, control.adminSpace);
router.route('/admin/statistics/').get(loginControl.checkAdmin, control.adminStatistics);
//---------------------//
//--------LOGIN---------//
router.route('/signIn/').post(loginControl.doLogin);
router.route('/signUp/').post(loginControl.doRegister);
router.route('/logout/').get(loginControl.doLogout);
router.route('/en/signIn/').post(loginControl.doLogin);
router.route('/en/signUp/').post(loginControl.doRegister);
router.route('/en/logout/').get(loginControl.doLogout);

export default router;