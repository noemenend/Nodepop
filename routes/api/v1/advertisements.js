/**
 * Created by Noelia Muñiz Menéndez on 24/07/2018
 */

'use strict';

//Load the Express and mongoose modules
const express = require('express');
const filter = require('../../../lib/filters');


//Obtain the router and advertisement model
const router = express.Router();
const Advertisement = require('../../../models/Advertisement');
const upload = require('../../../lib/upload');

const { check, validationResult } = require('express-validator/check');




/**
 * 
 * GET/
 * 
 * Returns the adverts list which fullfill the filter conditions make in the request
 */
router.get('/', [check('venta').optional({ checkFalsy: true }).isBoolean().withMessage('venta is not a boolean value'),
	check('start').optional({ checkFalsy: true }).isInt().withMessage('start is not an int value'),
	check('limit').optional({ checkFalsy: true }).isInt().withMessage('limit is not an int value'),
	check('tag').optional({checkFalsy: true}).isIn(['mobile','work','lifestyle','motor']).withMessage('The tag parameter must belongs to [mobile,motor,lifestyle,work]')], async (req, res, next) => {

	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		//Gets the parameters from the query string
		let start = parseInt(req.query.start) || 0;
		let limit = parseInt(req.query.limit) || 0;
		let sort = req.query.sort || null;
		//Get the filter criterias form request and process them
		let criteria = filter(req);
		const adverts = await Advertisement.list(criteria, start, limit, sort);
		const url = `${req.protocol}://${req.headers.host}/images/anuncios/`;
		adverts.forEach(element => {
			element.foto = `${url}${element.foto}`;
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

router.post('/', upload.single('image'), async (req, res, next) => {
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
		res.json({ success: true, result: tags });
	} catch (err) {
		next(err);
	}
});

module.exports = router;