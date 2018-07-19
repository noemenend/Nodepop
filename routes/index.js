'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    //Leemos el archivo README.MD
    fs.readFile(path.join(__dirname, '../README.md'), { encoding: 'utf8' }, (err, data) => {
        if (err) {
            console.log(err);
            return next(new Error('No se puede leer el fichero README.md'));
        }

        //Visualizamos el fichero README.md a través de la vista.
        //Le mandaremos como información variable el título de la API y el archivo README
        console.log(data);
        res.render('index', { title: 'Nodepop API', readme: data });
    });
});

module.exports = router;