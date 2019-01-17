let express = require('express');
let router = express.Router();
// @Подключение контроллера
let mainController = require('../conrollers/main');
let locationController = require('../conrollers/location');
let otherController = require('../conrollers/other');

// @Использование контроллера
/* GET home page. */
router.get('/', locationController.homelist);
router.get('/location', locationController.locationInfo);
router.get('/location/review/new', locationController.addReview);

router.get('/about', otherController.about);

module.exports = router;
