const express = require("express");
const app = express.Router();
var fs = require('fs');
let Image = require('../models/image.model');
let User = require('../models/user.model');
const multer = require('multer');

const { oneOf, check, validationResult } = require('express-validator');

const passport = require("passport");


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array('file', 10), passport.authenticate("jwt", { session: false }), 
	[
		oneOf([
			check('permissions').equals('private'),
			check('permissions').equals('public')
		])
	], 
	async function(req, res) {

		if(!req.user){
			return res.status(401).send("Unauthorized");
		}

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}

		else {


			for(var i in req.files){
				var new_img = new Image;
				new_img.img.data = fs.readFileSync(req.files[i].path)
				new_img.img.contentType = 'image/jpeg';
				new_img.name = req.files[i].originalname;
				new_img.owner = req.user.id;
				new_img.permissions = req.body.permissions;

				new_img.save(function(err, image){
					User.findByIdAndUpdate(
						req.user.id,{
						$push: {
							images: {image: image.id}
						}},
						function(err){
							if(err){
								return res.status(400).send(err);
							}
						}
					);
				});
			}
			res.status(201).json({ message: 'Images added to the db!' });
		}
});

app.put('/:id/access', passport.authenticate("jwt", { session: false }), 
	[
		oneOf([
			check('permissions').equals('private'),
			check('permissions').equals('public')
		])
	], 
	async function(req, res) {
	
		const image = await Image.findById(req.params.id)
		.catch((err)=>{
			return res.status(400).send(err);
		});

		if(image == undefined){
			return res.status(404).send("Image not found");
		}

		if(image.owner != req.user.id){
			return res.status(401).send("Unauthorized");
		}

		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}

		Image.findByIdAndUpdate(
			req.params.id,
			{$set: { 
				permissions: req.body.permissions
			}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
				res.status(200).json({ message: 'Image permissions successfully updated.' });
			}
		);
	
	}
);

app.delete("/:id/delete", passport.authenticate("jwt", { session: false }),
	async function(req, res){
		const image = await Image.findById(req.params.id)
		.catch((err)=>{
			return res.status(400).send(err);
		});

		if(image == undefined){
			return res.status(404).send("Image not found");
		}

		if(image.owner != req.user.id){
			return res.status(401).send("Unauthorized");
		}

		Image.findByIdAndDelete(req.params.id, function (err, docs) { 
			if (err){ 
				return res.status(400).send(err); 
			} 
		});

		User.findByIdAndUpdate(
			req.user.id,
			{$pull: {'images': {image: req.params.id}}},
			function (err,) { 
				if (err){ 
					return res.status(400).send(err); 
				} 
			}
		);

		return res.status(202).send({ message: 'Image deleted successfully.' }); 
	}
);

app.get("/retrieve", 
	passport.authenticate("jwt", { session: false }),	
	async function(req, res) {

		let images = [];

		const user = await User.findById(req.user.id)
		.catch((err)=>{
			return res.status(400).send(err);
		});

		if(user == undefined){
			return res.status(404).send("User not found");
		}

		for(var i in user.images){
			const image = await Image.findById(user.images[i].image);

			images.push(image);
		}

		res.json({images: images});

		// Image.findOne({}, 'img createdAt', function(err, img) {
		// 	if (err)
		// 		res.send(err);
		// 	// console.log(img);
		// 	res.contentType('json');
		// 	res.send(img);
		// }).sort({ createdAt: 'desc' });

	}
);
module.exports = app;