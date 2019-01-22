// @Создание API
let express = require('express');
let router = express.Router();
let ctrlLocations = require('../controllers/locations');
let ctrReviews = require('../controllers/reviews');

router.get('/locations', ctrlLocations.locationListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

router.post('/locations/:locationid/reviews', ctrReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrReviews.reviewsDeleteOne);

module.exports = router;