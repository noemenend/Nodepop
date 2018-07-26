/**
 * Created by Noelia Muñiz Menéndez 25.07.2018
 */
'use strict'

/**
 * Function that collects the filter criterias
 * passed into the request, process them and stores
 * in the object which will be passed to the query.
 */

function filter(req) {
    let criteria = {};

    //Filter by tag
    if (req.query.tag) {
        console.log(req.query.tag);
        criteria.tags = { $all: req.query.tag };
    }
    //Filter by venta or search
    if (req.query.venta) {
        criteria.venta = req.query.venta;
    }

    //Filter by name (starts with).
    if (req.query.nombre) {
        criteria.nombre = new RegExp('^' + req.query.nombre.toLowerCase() + '.*', 'i');
    }

    //Filter by tag

    //Filter by price range.
    if (req.query.precio) {

        let priceQuery = req.query.precio.split('-');

        //If the param values for price is malformed (length !=2 or length!=1), do nothing (list all the adverts.)
        if (priceQuery.length === 2) {
            let minPrice = priceQuery[0];
            let maxPrice = priceQuery[1];
            if (minPrice !== '' && maxPrice !== '') {
                criteria.precio = { $gte: minPrice, $lte: maxPrice };
            } else if (maxPrice === '') {
                criteria.precio = { $gte: minPrice };
            } else {
                criteria.precio = { $lte: maxPrice };
            }
        } else if (priceQuery.length === 1) {
            //searches all the adverts with price === priceQuery[0]
            criteria.precio = priceQuery[0];
        }

    }
    console.log(criteria);
    return criteria;
}

module.exports = filter;