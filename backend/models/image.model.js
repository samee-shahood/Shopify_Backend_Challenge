const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const imageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    img:
    {
        data: Buffer,
        contentType: String
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	permissions: {
		type: String,
		required: true
	}
});

const Image = mongoose.model('Image', imageSchema);

Image.init().then(() =>
{
});

module.exports = Image;