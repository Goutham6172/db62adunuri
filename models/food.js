const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
    foodquantity: String,
    foodprice: {type:Number, min:[4,'Minimum quantity is 4'],max:[25,'Maximum quantity is 4']},
    foodcolor: String
})

module.exports = mongoose.model("food",foodSchema)
