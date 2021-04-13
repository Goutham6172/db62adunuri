var Food = require('../models/food');
// List of all Food
exports.food_list =async function(req, res) {
    try{
    thefood = await Food.find();
    res.send(thefood);
    }
    catch(err){
        res.error(500,`{"error":${err}}`);
    }
    };
// for a specific Food.
exports.food_detail = async function(req,res){
    console.log("detail"+req.params.id)
    try{
        result = await Food.findById(req.params.id)
        res.send(result)
    }catch(error){
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found}`)
    }
};



// Handle Food create on POST.
exports.food_create_post = async function(req,res){
    console.log(req.body)
    let document = new Food();

    document.foodquantity = req.body.foodquantity;
    document.foodprice = req.body.foodprice;
    document.foodcolor = req.body.foodcolor;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.error(500,`{"error":${err}}`);
    }
};
// Handle Food delete form on DELETE.
exports.food_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Food delete DELETE ' + req.params.id);
};
// Handle Food update form on PUT.
exports.food_update_put = async function(req,res){
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try{
        let toUpdate = await Food.findById(req.params.id)

        if(req.body.foodcolor) toUpdate.foodcolor = req.body.foodcolor;
        if(req.body.foodquantity) toUpdate.foodquantity = req.body.foodquantity;
        if(req.body.foodprice) toUpdate.foodprice = req.body.foodprice;
        let result = await toUpdate.save();
        console.log("success "+ result);
        res.send(result)
    }
    catch(err){
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
    }
};


// VIEWS
// Handle a show all view
exports.food_view_all_Page = async function(req, res) {
    try{
    thefood = await Food.find();
    res.render('food', { title: 'Food Search Results', results: thefood });
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };


    // Handle a show one view with id specified by query
exports.food_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await Food.findById( req.query.id)
        res.render('fooddetail', 
{ title: 'Food Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.food_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('foodcreate', { title: 'Food Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
