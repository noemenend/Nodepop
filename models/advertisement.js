/**
 * Advertisement mongoose model
 * 
 * Created by Noelia Muñiz Menéndez 2018
 */

'use strict';

const mongoose = require('mongoose');


var AdvertisementSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true
	},
	venta: {
		type: Boolean,
		required: true
	},
	precio: {
		type: Number,
		required: true
	},
	foto: {
		type: String,
		default: ''
	},
	tags: {
		type: [
			{
				type: String,
				enum: ['work', 'lifestyle', 'motor', 'mobile']
			}
		],
		required: true
	}
});


/**
 * Gets the advertisements 
 * @param {} filter to apply to the search
 * @param {Number} skip elements from the collection
 * @param {Number} limit max number of elements to show
 * @param {String} sort
 */
AdvertisementSchema.statics.list = function (filter, start, limit, sort) {
	const query = Advertisement.find(filter).skip(start);
	query.limit(limit);
	query.sort(sort);
	return query.exec();
};

/**
 * 
 * @param {*} requestSort 
 */
AdvertisementSchema.statics.listTags = function (requestSort) {
	const unwind = { $unwind: '$tags' };
	const group = {
		$group: {
			_id: '$tags',
			tag: { $first: '$tags' },
			advertisements: { $sum: 1 },
		},
	};
	const project = {
		$project: {
			_id: 0,
			tag: 1,
			advertisements: 1,
		},
	};
	const sort = { $sort: {} };
	if (requestSort === 'advertisements' || requestSort === '-advertisements') {
		sort.$sort = { advertisements: requestSort.indexOf('-') === 0 ? -1 : 1 };
	}
	sort.$sort.tag = 1;
	return Advertisement.aggregate([unwind, group, project, sort]).exec();
};

let Advertisement = mongoose.model('Advertisement', AdvertisementSchema);

module.exports = Advertisement;