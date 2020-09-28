const Profile = require("../models/profile")
const View = require("../models/view")
const express = require('express');
const router = express.Router();
const {isLoggedIn,isLoggedInA} = require("../middleware/fixers");
const Product = require("../models/product")
router.get("/:productId", isLoggedIn, function(req, res) {
	var id = req.params.productId;
	var user = req.user;
	View.findById(user.view, function(err, view) {
		if(err) {
			console.log(err);
		}
		else {
			view.product.push(id);
			view.save();
		}
	});
	Product.findById(id, function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("detail.ejs", {product: product, user: req.user});
		}
	});
});

module.exports=router;