var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var food_controller = require('../controllers/food');

router.get('/', api_controller.api);

router.post('/food', food_controller.food_create_post);

router.delete('/food/:id', food_controller.food_delete);

router.put('/food/:id',food_controller.food_update_put);

router.get('/food/:id', food_controller.food_detail);

router.get('/food', food_controller.food_list);

module.exports = router;