/**
 * Created by Noelia Muñiz Menéndez on 24/07/2018
 */

'use strict';

//Load the Express and mongoose modules
const express = require('express');
const mongoose = require('mongoose');
const filter = require('../../../lib/filters');


//Obtain the router and advertisement model
const router = express.Router();
const Advertisement = require('../../../models/Advertisement');


/**
 * 
 * GET/
 * 
 * Returns the adverts list which fullfill the filter conditions make in the request
 */
router.get('/', async (req, res, next)=> {

	try {
		//Gets the parameters from the query string
		let skip = parseInt(req.query.start) || 0;
		let limit = parseInt(req.query.limit) || 0;
		let sort = req.query.sort || null;
		//Get the filter criterias form request and process them
		let criteria = filter(req);
		const adverts = await Advertisement.list(criteria,skip,limit,sort);
		const url = `${req.protocol}://${req.headers.host}/images/anuncios/`;
		adverts.forEach(element => {
			element.foto=`${url}${element.foto}`;
		});
		res.json({ success: true, number: adverts.length, result: adverts });

	} catch (err) {
		next(err);
	}

});


/**
 * POST/
 * 
 * Creates an advert with the information passed on the req.body
 * 
 */

router.post('/', async (req, res, next)=> {
	try {
		const advertData = req.body;

		//Create an ad in memory
		const advert = new Advertisement(advertData);
		//Store in database
		const advertSaved = await advert.save();

		res.json({ success: true, result: advertSaved });
	} catch (err) {
		next(err);
	}
});


/**
 * Gets the list of tags
 */
router.get('/tags', async (req, res, next) => {
	try {
	const requestSort = req.query.sort;
	const tags = await Advertisement.listTags(requestSort);
	res.json({success:true, result:tags});
	} catch (err) {
		next(err);
	}
  });

module.exports = router;