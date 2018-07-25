/**
 * Advertisement mongoose model
 * 
 * Created by Noelia Muñiz Menéndez 2018
 */

'use strict';

const mongoose = require('mongoose');
const configuration = require('./../config/local_config');


var AdvertisementSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


let Advertisement = mongoose.model('Advertisement', AdvertisementSchema);