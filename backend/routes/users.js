const express = require("express");
let User = require('../models/user.model');
const app = express.Router();
const passport = require("passport")
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get("/", async(req,res) => {
    const stocks = await User.find();
    res.send(stocks);
});

app.post("/register", function(req,res) {

	
	bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
		const newUser = new User({
			username : req.body.username,
			email: req.body.email,
			password: hash,
			images: []
		});

		newUser.save(function(err){
			if(err){
				if (err.name === 'MongoError' && err.code === 11000) {
					return res.status(409).send({ success: false, message: 'User/Email already exist!' });
				}
			
				return res.status(400).send(err);
				}
			res.send(newUser);
		});
	
	});
});

app.post("/testAdd", passport.authenticate("jwt", { session: false }), function(req, res) {
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		console.log(req.user);
		res.json({success: true});
	}
});

module.exports = app;