'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

	//Read file README.MD
	fs.readFile(path.join(__dirname, '../README.md'), { encoding: 'utf8' }, (err, data) => {
		if (err) {
			console.log(err);
			return next(new Error('No se puede leer el fichero README.md'));
		}

		//Render the README.md file throught the view.
		const url = `${req.protocol}://${req.headers.host}/adverts/`;
		res.render('index', { title: 'Nodepop API', readme: data, urlTienda:url });
	});
});

module.exports = router;