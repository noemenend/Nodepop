/**
 * Script that makes the database connection
 * 
 * Created by Noelia Muñiz Menéndez on 10/07/18
 * 
 * */

'use strict'

require('dotenv').config();

//Loads mongoose library.
const mongoose = require('mongoose');

//Create the db connection
const conn = mongoose.connection;

//Events connection handlers

//Error
conn.on('error', (err) => {
	console.error('Connection error with the Mongo Database.', err);
	process.exit(1);
});

//First time that the database is open.
conn.once('open', () => {
	console.info('Connected to Mongo Database!');
});

//Disconnection db.
conn.on('disconnected', () => {
	console.info('Desconnected from Mongo Database!.');
});



//Make the database connection
mongoose.connect(process.env.NODEPOP_CONNECTION_STRING, { useNewUrlParser: true });


module.exports = conn;