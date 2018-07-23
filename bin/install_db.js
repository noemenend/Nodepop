/**
 * Script for database initialization.
 * 
 * Created by Noelia Muñiz Menéndez on 23/07/2018
 */
'use strict';

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');
const fs = require('fs');
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
            runInstallDB();
        } else {
            console.log('Database installation aborted!');
            return process.exit(0);
        }
    });
});

function runInstallDB() {
    //Through async.series we can execute a list of functions asyncronously and we stop the process if one of then fails.
    //We executes the advertisements initialization.
    async.series([deleteAdverts, initAdverts], function(err, results) {
        if (err) {
            console.log('There was an error during database initialization: ', err);
            db.close();
            return process.exit(1);
        } else {
            //All was ok.
            console.log(results);
            db.close();
            return process.exit(0);
        }
    });
}

function deleteAdverts(callback) {
    //Delete the database table for Advertisements
    db.collection('Advertisement').deleteMany({}, function(err, results) {
        if (err) {
            return callback(err);
        } else {
            console.log('Successfully remove ads');
            return callback(null, 'Number of ads removed' + results.deletedCount);
        }
    });
}


function initAdverts(callback) {
    //Inserts into the database the Advertisements from a json file.
    let fileJSON = path.join(__dirname, './../config/advertisements.json');
    const adjson = require(fileJSON);
    db.collection('Advertisement').insertMany(adjson.advertisements, function(err, results) {
        if (err) {
            return callback(err);
        }

        return callback(null, 'Number of ads inserted: ' + results.insertedCount);
    });
}