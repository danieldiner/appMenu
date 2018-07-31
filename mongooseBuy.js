
const mongoose = require('mongoose')
mongoose.connect('mongodb://prueba:prueba1@ds159509.mlab.com:59509/api100')

const Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;

const buySchema = new Schema({
	buy_id: ObjectId,
	buy_list:   [String],
	buy_order: [String], 
	final_price: Number
	
});

var Buy = mongoose.model('Buy', buySchema);

module.exports = Buy;