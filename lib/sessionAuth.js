'use strict';

/**
 * Middleware que sirve para comprobar si un usuario está autenticado.
 * 
 * Verifica si la sesión tiene un _id y si no lo tiene redirige al usuario al login
 */

const Usuario = require('../models/User');

module.exports = function() {
	return function(req, res, next) {
		if (!req.session.authUser) { // si no está logado
			res.redirect('/login');
			return;
		}

		// recuperamos el usuario
		Usuario.findById(req.session.authUser._id).then( usuario => {
			req.user = usuario;
			next();
		});

    
	};
};