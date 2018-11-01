'use strict';

var express = require('express');
var router = express.Router();

var Usuario = require('../../../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

router.post('/authenticate', async function (req,res,next) {
	try {
      
		// recoger parámetros del cuerpo de la petición
		const email = req.body.email;
		const password = req.body.password;
        
		console.log(email);
		//buscar el usuario
		const usuario = await Usuario.findOne({email:email});
		
		if (!usuario || !await bcrypt.compare( password, usuario.password)) {
			res.json({ code: 401, message: 'Invalid credentials'});
			return;
		}
  
		// usuario encontrado y password ok
		// no meter instancias de mongoose en el token!
		jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
			expiresIn: '2d'
		}, (err, token) => {
			if (err) {
				next(err);
				return;
			}
			res.json({ code: 200, token: token });
		});
  
	} catch(err) {
		next(err);
	}
});



module.exports = router;