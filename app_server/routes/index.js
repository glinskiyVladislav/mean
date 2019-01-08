let express = require('express');
let router = express.Router();
// @Подключение контроллера
let mainController = require('../conrollers/main');

// @Использование контроллера
/* GET home page. */
router.get('/', mainController.index );

module.exports = router;
