var express = require('express');
const foodcontroller = require('../controllers/food')
var router = express.Router();

/* GET Foods. */
router.get('/', foodcontroller.food_view_all_Page);
router.get('/detail', foodcontroller.food_view_one_Page);
/* GET create costume page */
router.get('/create', foodcontroller.food_create_Page);
/* GET create update page */
router.get('/update', foodcontroller.food_update_Page);

module.exports = router;
