var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


const utils = require('./lib/utils');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const api_routes= require('./routes/api/v1/advertisements');
const adverts_routes = require('./routes/adverts');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Adverts images
app.use('/images/anuncios', express.static(path.join(__dirname, 'public/images')));

//Open the database connection.
require('./lib/connectMongoose');

//Loads the model definitions
require('./models/Advertisement');
require('./models/User');

// Variables globales de template
app.locals.title = 'Nodepop API';

//API ROUTES
app.use('/api/v1/advertisements', api_routes);



// auth helper middleware - dar acceso a sesión desde las vistas
app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
});
  
//Middlewares web application
const loginController=require('./routes/loginController');

//Establezco los valores para la sesión de usuario.
app.use(session({
	name:'nodeapi-session',
	secret:'YpyqDbvZ6M4EzTRpjxAAZgsSkU73rLx2tEwP7MMSW5wP',
	resave: false,
	saveUninitialized:true,
	cookie:{maxAge: 1* 24 *60 *60 * 1000 } // a los 2 dias de inactividad caduca
}));

app.use('/', require('./routes/index'));
app.use('/adverts', adverts_routes);
//Usamos el estilo de Controladores para estructurar las rutas
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// error de validación
	if (err.array) {
		err.status = 422;
		const errorInfo = err.array({ onlyFirstError: true })[0];
		err.message = utils.isAPI(req) ? { message: 'Not valid', errors: err.mapped() } :
			`Not valid - ${errorInfo.param} ${errorInfo.msg}`;
	}

	res.status(err.status || 500);

	if (utils.isAPI(req)) {
		res.json({ success: false, error: err.message });
		return;
	}
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;