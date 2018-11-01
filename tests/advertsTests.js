'use strict';


const request = require('supertest');

const app = require('../app');

describe('GET /api/v1/advertisements without token', function() {
	it('respond with json Token Missing', function(done) {
		request(app)
			.get('/api/v1/advertisements')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(401, done)
			.expect('{"ok":false,"error":{"code":401,"message":"Token missing"}}');
	});
});

describe('GET /api/v1/advertisements with invalid token', function() {
	it('respond with json Invalid Token', function(done) {
		request(app)
			.get('/api/v1/advertisements/?token=kkkkfasdfdsfdasfdsafsdafdsfdsfadfdsaf')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(401, done)
			.expect('{"ok":false,"error":{"code":401,"message":"Invalid Token"}}');
	});
});





describe('GET /api/v1/advertisements with valid token', function() {

	it('should require authorization', function(done) {
		request(app)
			.get('/api/v1/advertisements')
			.expect(401)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});

	var auth = {};
	before(loginUser(auth));

	it('should respond with JSON array', function(done) {
		request(app)
			.get('/api/v1/advertisements?token='+ auth.token)
			.expect(200)
            .expect('Content-Type', /json/)
			.end(function(err) {
				if (err) return done(err);
				done();
			});
	});

});

describe('GET /api/v1/advertisements/tags with valid token', function() {

	it('should require authorization', function(done) {
		request(app)
			.get('/api/v1/advertisements/tags')
			.expect(401)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});

	var auth = {};
	before(loginUser(auth));

	it('should respond with JSON array', function(done) {
		request(app)
			.get('/api/v1/advertisements/tags?token='+ auth.token)
			.expect(200)
            .expect('Content-Type', /json/)
			.end(function(err) {
				if (err) return done(err);
				done();
			});
	});

});


function loginUser(auth) {
	return function(done) {
		request(app)
			.post('/api/v1/users/authenticate')
			.send({
				email: 'noelia@gmail.com',
				password: '1234'
			})
			.expect(200)
			.end(onResponse);

		function onResponse(err, res) {
			auth.token = res.body.token;
			return done();
		}
	};
}


