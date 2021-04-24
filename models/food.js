const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
    foodquantity: {type:Stringg,required:[true,'Quantity required'],enum:['Large','Small','Medium']},
    foodprice: {type:Number, min:[4,'Minimum quantity is 4'],max:[25,'Maximum quantity is 4']},
    foodcolor: {type:String,required:[true,'color required']}
})

module.exports = mongoose.model("food",foodSchema)
