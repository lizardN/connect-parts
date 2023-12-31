var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   

    name: {type: String, required: true},
    category: {type: String, required: true},
    type: {type: String, required: true},
    id:{type:String, required:true},
    qty: {type: Number, required: true},
    make:{type:String, required:true},
    buyerName:{type:String, required:true},
    buyerMobile:{type:String, required:true},
    status:{type:String, required:true},
    date:{type:String, required:true},
    price: {type: Number, required: true},
    price2: {type: Number, required: true},
  

});

module.exports = mongoose.model('Order2', schema);