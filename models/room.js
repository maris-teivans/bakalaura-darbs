// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedSchema = new Schema({
	text: String,
	username: String,
	userid: String,
	date: {
		type: Date,
		default: Date.now
	}
});

var roomSchema = new Schema({
	isPrivate: {
		type: Boolean,
		default: false
	},
	allowedIds: [String],
	title: String,
	userCount: {
		type: Number,
		default: 0
	},
	users: [String],
	tags: [String],
	ownerId: String,
	feed: [feedSchema]
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Room', roomSchema);