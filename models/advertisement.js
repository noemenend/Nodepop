/**
 * Advert mongoose model
 * 
 * Created by Noelia Muñiz Menéndez 2018
 */

'use strict';

const mongoose = require('mongoose');


var AdvertSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


let Advert = mongoose.model('Advert', AdvertSchema);