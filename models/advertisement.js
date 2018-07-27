/**
 * Advertisement mongoose model
 * 
 * Created by Noelia Muñiz Menéndez 2018
 */

'use strict'

const mongoose = require('mongoose');


var AdvertisementSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String]
});


let Advertisement = mongoose.model('Advertisement', AdvertisementSchema);

module.exports = Advertisement;