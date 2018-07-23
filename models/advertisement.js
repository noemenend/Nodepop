/**
 * Advert mongoose model
 * 
 * Created by Noelia Muñiz Menéndez 2018
 */

'use strict';

const mongoose = require('mongoose');
const configuration = require('./../config/local_config');


var AdvertSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

//List of allowed tags
AdvertSchema.statics.allowedTags = function() {
    return configuration.tags;
}



let Advert = mongoose.model('Advertisement', AdvertSchema);