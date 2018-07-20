'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

    //Read file README.MD
    fs.readFile(path.join(__dirname, '../README.md'), { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.log(err);
            return next(new Error('No se puede leer el fichero README.md'));
        }

        //Render the README.md file throught the view.
        res.render('index', { title: 'Nodepop API', readme: data });
    });
});

module.exports = router;