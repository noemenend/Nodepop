'use strict';

// Creamos un Controller para asociar a rutas en app.js


const Usuario = require('../models/User');
const bcrypt = require('bcrypt');

class LoginController {

  // GET 
  index(req, res, next) {
    res.locals.email = process.env.NODE_ENV === 'development' ? 'noeliamm@gmail.com​​' : '';
    res.locals.error = '';
    res.render('login');
  }


  async post(req, res, next) {
    try {
      // recoger parámetros del cuerpo de la petición
      const email = req.body.email;
      console.log(email);
      const password = req.body.password;
 
      //buscar el usuario
      const usuario = await Usuario.findOne({email:email});
      console.log('Usuario' + usuario);
      if (!usuario || !await bcrypt.compare( password, usuario.password)) {

        res.locals.email = email;
        res.locals.error = 'Invalid Credentials';
        res.render('login');
        return;
      }
   
   
      // guardar la identidad del usuario en una sesión
      req.session.authUser = { _id: usuario._id };
     
      // usuario encontrado y password ok
      // ...
      res.redirect('/adverts');

    } catch(err) {
      next(err);
    }
  }

  //GET /logout
  logout(req,res,next) {
    delete req.session.authUser; //borrar authUser de session
    req.session.regenerate(function(err)  {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/');
    });

  }
  
}

module.exports = new LoginController();
