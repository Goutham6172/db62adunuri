var express = require('express');
const foodcontroller = require('../controllers/food')
var router = express.Router();

/* GET Foods. */
router.get('/', foodcontroller.food_view_all_Page);
router.get('/detail', foodcontroller.food_view_one_Page);

// A little function to check if we have an authorized user and continue on
// or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
     return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }
/* GET update food page */
router.get('/update', secured, foodcontroller.food_update_Page);

/* GET create food page */
router.get('/create',secured, foodcontroller.food_create_Page);

router.get('/delete', secured, foodcontroller.food_delete_Page);
module.exports = router;
