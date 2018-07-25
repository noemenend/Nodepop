/**
 * Script for database initialization.
 * 
 * Created by Noelia Muñiz Menéndez on 23/07/2018
 */
'use strict';

//Load the modules.
const mongoose = require('mongoose');
const readLine = require('readline');
const path = require('path');

//Load the models
const db = require('../lib/connectMongoose');

//Open the database connection
db.once('open', function() {

    //Prepear for reading the console input
    const rline = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //Ask user if she/he wants to delete the database.
    rline.question('Are you sure you want to empty the database?(No)', function(answer) {
        rline.close();
        if (answer.toLowerCase() === 'yes') {
            //Clean the database and load the advertisement.json with the initial data.
            (async function() {
                try {
                    let result = await db.collection('advertisements').deleteMany({});
                    console.log('Number of adverts deleted ', result.deletedCount);

                    //Inserts the json advertisements into the Advertisement collection
                    let fileJSON = path.join(__dirname, './../config/advertisements.json');
                    const adjson = require(fileJSON);
                    let resultinsert = await db.collection('advertisements').insertMany(adjson.advertisements);
                    console.log('Number of adverts inserted ', resultinsert.insertedCount);

                    //Close the conection and finalize the script
                    db.close();
                    process.exit(0);
                } catch (err) {
                    console.log('There was an error', err);
                    db.close();
                    process.exit(1);
                }

            })()



        } else {
            console.log('Database installation aborted!');
            return process.exit(0);
        }
    });
});