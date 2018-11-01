'use strict';

const Jimp = require('jimp');
const path= require('path');
const cote = require('cote');



const responder = new cote.Responder({ name: 'Image Resize responder' });


// petición (req): { from: 'eur', to: 'usd', amount: 25 }
 responder.on('imageResize',async (req, done) => {
	console.log('Servicio: petición de resizing de ', req.imagePath, Date.now());

	// calculamos el resultado
	var lenna =req.imagePath;
	
	var fileName = req.originalname.split('.')[0];
	var extension = req.originalname.split('.')[1];
	var desPath = path.join(__dirname,'../../public/images/');
	
	const result= await Jimp.read(lenna)
		.then(lenna => {
			 lenna
				.resize(100, 100) // resize
				.quality(60) // set JPEG quality
				.greyscale() // set greyscale
				.write(`${desPath}/${fileName}_small.${extension}`); // save
				return 'The thumbnail was created.';
		})
		.catch(err => {
			return 'Error during thumbnail creation: ' + err;
		});

	done(result);

});
