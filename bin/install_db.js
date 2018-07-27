/**
 * Script for database initialization.
 * 
 * Created by Noelia Muñiz Menéndez on 23/07/2018
 */
'use strict'

//Load the modules.
const readLine = require('readline');
const Advertisement = require('../models/Advertisement');
const utils = require('../lib/utils');

//Database connection
const db = require('../lib/connectMongoose');

//Advertisements to load.
const ads = require('../data/advertisements.json').advertisements;

/**
 * Opens the database collection, if no error ask to the user
 * for empty the database and load a list of initial adverts.
 */
db.once('open', async() => {

	try {
		const answer = await utils.askUser('Are you sure you want to empty the database?(No)');

		if(answer.toLowerCase () !== 'yes') {
            console.log('Script aborted');
            process.exit(0);
        }

		await initAdverts(ads);
		
	} catch (err) {
		console.log('There was an error', err);
		process.exit(1);
	} finally {
		db.close();
		process.exit(0);
	}
	
});

/**
 * Function that initialises the Advertisemts collection
 * @param {Advertisement} ads 
 */
async function initAdverts(ads) {

	//Deletes all the documents from the collection
	const deletedAds = await Advertisement.deleteMany();
	console.log(`Deleted ${deletedAds.n} adverts`);

	//Inserts the new ads into the collection
	const insertedAds = await Advertisement.insertMany(ads);
	console.log(`Inserted ${insertedAds.length} adverts`);
}