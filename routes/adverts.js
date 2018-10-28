'use strict';

const express = require('express');
const router = express.Router();
const filter=require('../lib/filters');
const Advertisement= require('../models/Advertisement');
const sessionAuth = require('../lib/sessionAuth');

// Todas las llamadas a este router requieren autenticación
router.use(sessionAuth());


/* GET home page. */
router.get('/', async (req, res, next)  => {


	try {
		//Gets the parameters from the query string
		let skip = parseInt(req.query.start) || 0;
		let limit = parseInt(req.query.limit) || 0;
		let sort = req.query.sort || null;
		//Get the filter criterias form request and process them
		let criteria = filter(req);
		console.log(criteria);
		const adverts = await Advertisement.list(criteria,skip,limit,sort);
		const url = `${req.protocol}://${req.headers.host}/images/anuncios/`;
		adverts.forEach(element => {
			element.foto=`${url}${element.foto}`;
		});
		//Render the adverts list throught the view.
		res.render('advert', { title: 'Nodepop Tienda', subtitle: 'Anuncios', result: adverts });

	} catch (err) {
		next(err);
	}		
});

module.exports = router;