const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true}, 
	password: {type: String, required: true, unique: true},
	images: [{
		image: {
			type: Schema.Types.ObjectId,
			ref: 'Image'
		}
	}]
});

const User = mongoose.model('User', userSchema);

User.init().then(() =>
{
});

module.exports = User;