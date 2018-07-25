/**
 * Created by Noelia Muñiz Menéndez on 24/07/2018
 */

'use strict';

//Load the Express and mongoose modules
const express = require('express');
const mongoose = require('mongoose');


//Obtain the router and advertisement model
const router = express.Router();
const Advertisement = mongoose.model('Advertisement');


/**
 * 
 * GET/
 * 
 * Returns the adverts list which fullfill the filter conditions make in the request
 */
router.get('/', async function(req, res, next) {
    //Gets the parameters from the query string

    try {
        const adverts = await Advertisement.find().exec();
        res.json({ success: true, result: adverts });
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

router.post('/', async function(req, res, next) {
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
 * GET /tags
 * 
 * List of allowed tags for an advert.
 */

router.get('/tags', (req, res, next) => {
    const tags = process.env.TAGS_ARRAY;
    res.json({ success: true, allowedTags: tags });
});


module.exports = router;