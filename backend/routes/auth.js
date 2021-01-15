const express = require('express');
const passport = require("passport")
const jwt = require("jsonwebtoken")
const app = express.Router();


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if(err){
      return next(err)
    }
    if(!user){
      return res.status(401).send({ success: false, message: 'Invalid Login' });
    }
    req.login(user, () => {
      const body = {_id: user.id, email: user.email }

      const token = jwt.sign({user: body}, "jwt_secret")
      return res.json({token})
    })
  })(req, res, next)
})

app.get("/secret", passport.authenticate("jwt", { session: false }), (req, res) => {
  if(!req.user){
    res.json({
      username: "nobody"
    })
  } else {
    res.json(req.user)
  }
})

app.get('/logout', function(req, res){
	req.logout();
	return res.json({success: "true"});
});

module.exports = app;