const express = require('express');
const router = express.Router();
const passport = require('passport');
//const User = require("./models/user")
const User = require("../models/user")
const View = require("../models/view")
router.get("/", function(req, res) {
	res.render("register.ejs");
});

router.post("/", function(req, res) {
	if(req.body.password == req.body.cpassword) {
		User.register(new User({username: req.body.username, type: "customer"}), req.body.password, function(err, user) {
			if(err) {
				console.log(err);
				return res.render("register.ejs");
			}
			var newView = {
				product: []
			}
			View.create(newView, function(err, newView) {
				if(err) {
					console.log(err);
				}
				else {
					user.view = newView._id;
					user.save(function(err,callback) {
						var newCart = {
							product: []
						}
						Cart.create(newCart, function(err, newCart) {
							if(err) {
								console.log(err);
							}
							else {
								user.cart = newCart._id;
								user.save(function(err,callback) {
                                    passport.authenticate("local")(req, res, function() {
									res.redirect("/addProfile");
									});
								});
							}
						});

					});
				}
			});
		});
	}
	else {
		res.redirect("/");
	}
});

module.exports=router;