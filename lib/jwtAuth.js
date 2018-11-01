'use strict';

/**
 * Your utility library for express
 */

var jwt = require('jsonwebtoken');

/**
 * JWT auth middleware for use with Express 4.x.
 *
 * @example
 * app.use('/api-requiring-auth', jwtAuth());
 *
 * @returns {function} Express 4 middleware
 */
module.exports = function() {

	return function(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		console.log('Token:', token);

		// decode token
		if (token) {
			
			// verifies secret and checks exp
			jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
		
				if (err) {
					// if the token is not valid return error
					return res.status(401).json({
						ok: false,
						error: { code: 401, message: 'Invalid Token'}
					});

				} else {
			
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;
					console.log('decoded', decoded);
					next();
				}
			});

		} else {

			// if there is no token return error
			return res.status(401).json({
				ok: false,
				error: { code: 401, message: 'Token missing'}
			});

		}
	};
};