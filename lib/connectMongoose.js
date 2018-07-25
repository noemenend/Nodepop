/**
 * Script that makes the database connection
 * 
 * Created by Noelia Muñiz Menéndez on 10/07/18
 * 
 * */

'use strict';

require('dotenv').config();

//Loads mongoose library.
const mongoose = require('mongoose');

//Create the db connection
const conn = mongoose.connection;

//Events connection handlers

//Error
conn.on('error', (err) => {
    console.error('Error de conexión a MongoDB.', err);
    process.exit(1);
});

//First time that the database is open.
conn.once('open', () => {
    console.info('Conectado a Mongo DB!');
});

//Disconnection db.
conn.on('disconnected', () => {
    console.info('Desconectado de MongoDB!.');
});



//Make the database connection
mongoose.connect(process.env.NODEPOP_CONNECTION_STRING, { useNewUrlParser: true });


module.exports = conn;