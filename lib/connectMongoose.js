/**
 * Script que conecta a la base de datos
 * 
 * Creado por Noelia Muñiz Menéndez on 10/07/18
 * 
 * */

'use strict';


//Cargamos el módulo de Mongoose.
const mongoose = require('mongoose');

//Creamos la connexion 
const conn = mongoose.connection;

//Manejadores de los eventos de la conexión

//Error
conn.on('error', () => {
    console.error('Error de conexión a MongoDB.', err);
    process.exit(1);
});

//Sólo se mostraría la primera vez que nos conectamos a la base de datos.
conn.once('open', () => {
    console.info('Conectado a Mongo DB!');
});

//Dexconexión
conn.on('disconnected', () => {
    console.info('Desconectado de MongoDB!.');
});



//Realizamos la conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/nodepop');

//Cargamos las definiciones de todos nuestros modelos

module.exports = connectMongoose;