'use strict';
const multer=require('multer');
const path=require('path');

//multer uploads config
const storage=multer.diskStorage({
	destination: function(req,file,cb) {
		cb(null,path.join(__dirname,'../public/images'));
	},
	filename: function(req,file,cb) {
		cb(null, file.fieldname + '_' + Date.now() + '_'+ file.originalname);
	}
});

const upload=multer({storage:storage});

module.exports=upload;