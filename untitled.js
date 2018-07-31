
//Cadena de conexión hacia mlab y 
//Configuramos la base de datos para que no sea tan dinámica 

const mongoose = require('mongoose')
mongoose.connect('mongodb://prueba:prueba1@ds159509.mlab.com:59509/api100')

const Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;
//requerido y necesario cada vez en una db
const foodSchema = new Schema({
	//requerido y necesario cada vez
	food_id: ObjectId,
	food: String, 
	description: String, 
	price: Number
	
});


const buySchema = new Schema({
	buy_id: ObjectId,
	buy_list:   [],
	buy_order: [], 
	final_price: Number
	
});

var Buy = mongoose.model('Menu',buySchema);
var Food = mongoose.model('Menu',foodSchema);


module.exports = Buy;
module.exports = Food;