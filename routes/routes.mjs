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

//--------BOOKINGS---------//
router.route('/bookings/').get(loginControl.checkAuthenticated, control.renderBookings);
router.route('/en/bookings/').get(loginControl.checkAuthenticated, control.renderBookingsEn);

router.route('/bookings/:bookingId/').get(loginControl.checkAuthenticated, control.renderBooking);
router.route('/en/bookings/:bookingId/').get(loginControl.checkAuthenticated, control.renderBookingEn);

router.route('/bookings/:bookingId/').post(loginControl.checkAuthenticated, control.getAvailableSpacesEdit);
router.route('/en/bookings/:bookingId/').post(loginControl.checkAuthenticated, control.getAvailableSpacesEditEn);

router.route('/bookings/:bookingId/edit/').post(loginControl.checkAuthenticated, control.updateBooking);
router.route('/en/bookings/:bookingId/edit/').post(loginControl.checkAuthenticated, control.updateBooking);

router.route('/newBooking/').get(loginControl.checkAuthenticated, control.renderNewBooking);
router.route('/en/newBooking/').get(loginControl.checkAuthenticated, control.renderNewBookingEn);

router.route('/newBooking/addBooking/').post(loginControl.checkAuthenticated, control.updateClientBooking, control.checkBookingInfo, control.getAvailableSpaces);
router.route('/en/newBooking/addBooking/').post(loginControl.checkAuthenticated, control.updateClientBookingEn, control.checkBookingInfoEn, control.getAvailableSpacesEn);

router.route('/addBooking').post(loginControl.checkAuthenticated, control.addBooking);
router.route('/en/addBooking').post(loginControl.checkAuthenticated, control.addBookingEn);

router.route('/cancelBookings/:bookingId/').post(loginControl.checkAuthenticated, control.cancelBooking);
//-------------------------//

//--------PROFILE---------//
router.route('/profile/').get(loginControl.checkAuthenticated, control.renderProfile);
router.route('/profile/').post(control.updateProfile);
router.route('/en/profile/').get(loginControl.checkAuthenticated, control.renderProfileEn);
router.route('/en/profile/').post(control.updateProfileEn);
//-----------------------//

//--------ADMIN---------//
router.route('/admin/').get(loginControl.checkAdmin, control.adminMain);
router.route('/admin/bookings/').get(loginControl.checkAdmin, control.adminBookings);
router.route('/admin/space/').get(loginControl.checkAdmin, control.adminSpace);
router.route('/admin/statistics/').get(loginControl.checkAdmin, control.adminStatistics);
router.route('/admin/registerSpace/').post(loginControl.checkAdmin, control.adminRegisterSpace);
router.route('/admin/deleteSpace/').post(loginControl.checkAdmin, control.adminDeleteSpace);
router.route('/admin/getSpaces/').get(loginControl.checkAdmin, control.renderSpaces);
//---------------------//

//--------LOGIN---------//
router.route('/signIn/').post(loginControl.doLogin);
router.route('/signUp/').post(loginControl.doRegister);
router.route('/logout/').get(loginControl.doLogout);

router.route('/en/signIn/').post(loginControl.doLoginEn);
router.route('/en/signUp/').post(loginControl.doRegisterEn);
router.route('/en/logout/').get(loginControl.doLogoutEn);
//----------------------//

export default router;