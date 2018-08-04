'use strict';

const readLine = require('readline');

/**
 * Function that checks if the url contains the 
 * substring /api/v1.
 * @param {request} req 
 */
module.exports.isAPI = function(req) {
	return req.originalUrl.indexOf('/api/v1') === 0;
};

/**
 * Function that returns a promise with the
 * answer to a question.
 * @param {string} question 
 */
module.exports.askUser = function (question) {
	return new Promise((resolve) =>{
		const rl = readLine.createInterface({
			input:process.stdin,
			output:process.stdout
		});
        
		rl.question(question,
			function(answer) {
				rl.close();
				resolve(answer);
			});
	});
};