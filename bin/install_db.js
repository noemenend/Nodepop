/**
 * Script for database initialization.
 * 
 * Created by Noelia Muñiz Menéndez on 23/07/2018
 */
'use strict';

//Load the modules.
const Advertisement = require('../models/Advertisement');
const User = require('../models/User');
const utils = require('../lib/utils');

//Database connection
const db = require('../lib/connectMongoose');

//Advertisements to load.
const ads = require('../data/advertisements.json').advertisements;
//Users to load
const users = require('../data/Users.json').users;

/**
 * Opens the database collection, if no error ask to the user
 * for empty the database and load a list of initial adverts.
 */
db.once('open', async () => {

	try {
		const answer = await utils.askUser('Are you sure you want to empty the database?(No)');

		if(answer.toLowerCase () !== 'yes') {
			console.log('Script aborted');
			process.exit(0);
		}

		await initAdverts(ads);

		await initUsers(users);
		
		await createIndexes();
		
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

async function initUsers(users) {

	//Deletes all the documents from the collection
	const deleteUsr= await User.deleteMany();
	console.log(`Deleted ${deleteUsr.n} users`);

	
	// hacer hash de las passwords
	// usuarios.forEach( async usuario => { --> no usar .forEach con async/await
	for (let i = 0; i < users.length; i++) {
		users[i].password = await User.hashPassword(users[i].password);
	}


	//Inserts the new users into the collection
	const insertedUsr = await User.insertMany(users);
	console.log(`Inserted ${insertedUsr.length} users`);
}

/**
 * Creates indexes by nombre and precio
 */
async function createIndexes() {
	Advertisement.ensureIndexes({'nombre' : 1,'precio':-1});
}