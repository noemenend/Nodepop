/**
 * Modelo Anuncio
 * 
 * Creado por Noelia Muñiz Menéndez 2018
 */

'use strict';

const mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


let Anuncio = mongoose.model('Anuncio', anuncioSchema);