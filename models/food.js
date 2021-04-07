const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
    foodquantity: String,
    foodprice: Number,
    foodcolor: String
})

module.exports = mongoose.model("food",foodSchema)
