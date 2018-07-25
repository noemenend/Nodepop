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
    let criteria ={};

    //Filter by venta or search
    if(req.query.venta) {
        criteria.venta = req.query.venta;
    }

    //Filter by name.
    if (req.query.nombre) {
        criteria.nombre = new RegExp('^' + req.query.nombre.toLowerCase() + '.*', 'i');
    }

    //Filter by tag

    //Filter by price range.

    return criteria;
}

module.exports=filter;
