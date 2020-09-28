var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var request = require("request");
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/register');
var adminRouter = require('./routes/admin');
var addProfileRouter = require('./routes/addProfile');
const User = require("./models/user")
var dotenv = require("dotenv");
const connectdb=require('./config/db');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//connect to cloud db
dotenv.config({
	path:'./config/config.env'
  });
  connectdb();
  
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	type: String,
	cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cart"
	},
	view: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "View"
	}
});



app.use(require("express-session")({
	secret: "Anjaneya Tripathi",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var logout = require("./routes/logout");
app.use('/logout',logout);
var profileroute = require("./routes/profileroute");
app.use('/profile',profileroute);
var homee= require("./routes/home");
app.use('/home',homee);
var cartroute = require("./routes/cartroute");
app.use('/cart',cartroute)
var detailsroute = require("./routes/details");
app.use('/details',detailsroute)
var addprtofileroute = require("./routes/addprofile2");
app.use('/addProfile',addprtofileroute)
var billsroute = require("./routes/bills");
app.use('/bill',billsroute)
var historyroute = require("./routes/historyroute");
app.use('/history',historyroute)
var orderroute = require("./routes/orderroute");
app.use('/orders',orderroute)
var warehouseroute = require("./routes/warehouse");
app.use('/warehouse',warehouseroute)
var pendingorderroute = require("./routes/pendingorder");
app.use('/pendingOrders', pendingorderroute)
var updateroute = require("./routes/updateroute");
app.use('/update', updateroute)
var newsroute = require("./routes/news");
app.use('/news',newsroute)
var nearbysearchroute = require("./routes/search");
app.use('/search',nearbysearchroute)
var recordroute = require("./routes/record");
app.use('/record',recordroute)
//////// IMPORTING SCHEMAS
//const User = require("./models/user")


/*
var productSchema = new mongoose.Schema({
	name: String,
	price: String,
	category: String,
	description: String,
	status: String,
	stock: String, 
	image: String,
	popularity: String,
	quantity: String,
	unit: String
});

var Product = mongoose.model("Product", productSchema);

//stores the order history as a collection of discrete purchases along with date

var historySchema = mongoose.Schema({
	product: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}],
	date: String,
	completed: String,
	username: String
});

var History = mongoose.model("History", historySchema);

// for storing a customers items in a cart

var cartSchema = new mongoose.Schema({
	product: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	}]
});

var Cart = mongoose.model("Cart", cartSchema);

// for storing the products a user has viewed --- YET TO BE IMPLEMENTED --- NOT USED YET

var viewSchema = new mongoose.Schema({
	product: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product"
	}]
});

var View = mongoose.model("View", viewSchema);

var profileSchema = new mongoose.Schema({
	username: String,
	address: String,
	email: String,
	contact: String
});

var Profile = mongoose.model("Profile", profileSchema);


var User = mongoose.model("User", userSchema);*/



///////////////// - CUSTOMER - /////////////////

///////////////// - LOGIN & REGISTER - /////////////////

app.use('/login', loginRouter);
app.use('/register', signupRouter);
app.use('/admin', adminRouter);
app.use('/addProfile', addProfileRouter);

app.get("/", function(req, res) {
	res.redirect("/login");
});

//logout
/*app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});*/

/*app.post("/addProfile/:i", isLoggedIn, function(req, res) {
	var email = req.body.email;
	var contact = req.body.mobile;
	var address = req.params.i;
	var newProfile = {
		username: req.user.username,
		address: address,
		email: email,
		contact: contact
	}
	Profile.create(newProfile, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(newlyCreated);
			res.redirect("/home");
		}
	});
});*/

/*app.get("/profile", isLoggedIn, function(req, res) {
	Profile.find({}, function(err, profiles) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("profile.ejs", {profiles: profiles, user: req.user});
		}
	});
});*/

///////////////// - HOME PAGE - /////////////////

/*app.get("/home", isLoggedIn, function(req, res) {
	Product.find({}, function(err, allProducts) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("home.ejs", {products: allProducts, status: "Today's Special", user: req.user});
		}
	});
});

app.get("/home/:category", isLoggedIn, function(req, res) {
	var category = req.params.category;
	Product.find({}, function(err, allProducts) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("category.ejs", {products: allProducts, category: category, user: req.user});
		}
	});
});*/

///////////////// - DETAIL VIEW - /////////////////

/*app.get("/details/:productId", isLoggedIn, function(req, res) {
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
});*/

///////////////// - CART FUNCTIONALITY - /////////////////
/*

app.get("/cart", isLoggedIn, function(req, res) {
	var user = req.user;
	var total = 0;
	Cart.findById(user.cart).populate('product').exec(function(err, product) {
		if(err) {
			console.log(err);
		} 
		else {
			// console.log(product);
			product.product.forEach(function(p) {
				total += (p.quantity * p.price);
			});
			res.render("cart.ejs", {cart: product, total: total, user: req.user});
		}
	});
});

app.post("/cart/:category/:productId", isLoggedIn, function(req, res) {
	var productId = req.params.productId;
	var category = req.params.category;
	var user = req.user;
	var quantity = req.body.quantity;
	Product.findById(productId, function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			product.quantity = quantity;
			product.stock -= quantity;
			product.save();
		}
	});
	Cart.findById(user.cart, function(err, cart) {
		if(err) {
			console.log(err);
		}
		else {
			cart.product.push(productId);
			cart.save();
			res.redirect("/home/"+category+"");
		}
	});
});

app.delete("/cart/:id", isLoggedIn,function(req, res) {
	var user = req.user;
	Cart.findById(user.cart, function(err, cart) {
		if(err) {
			console.log(err);
		}
		else {
			console.log("Cart" + cart);
			for(var i = 0; i < cart.product.length; i++) {
				if(cart.product[i] == req.params.id) {
					cart.product.splice(i, 1);
					cart.save();
				}
			}
			Product.findById(req.params.id, function(err, product) {
				if(err) {
					console.log(err);
				}
				else {
					product.stock -= (product.quantity)*(-1);
					product.save();
				}
			});
			res.redirect("/cart");
		}
	});
});
*/
///////////////// - BILL & PURCHASE HISTORY - /////////////////

/*app.post("/bill", isLoggedIn, function(req, res) {
	var user = req.user;
	var temp = [];
	var n = 0;
	Cart.findById(user.cart, function(err, cart) {
		if(err) {
			console.log(err);
		}
		else {
			cart.product.forEach(function(products) {
				temp.push(products._id);
				n++;

			});
			var date = Date.now();
			var newHistory = {
				product: temp,
				date: date,
				completed: "red",
				username: user.username
			}
			History.create(newHistory, function(err, newHistory) {
				if(err) {
					console.log(err);
				}
				else {
					console.log(newHistory);
				}
			});
			cart.product = [];
			cart.save();
			res.redirect("/bill");
		}
	});
});

app.get("/bill", isLoggedIn, function(req, res) {
	var user = req.user;
	res.render("bill.ejs", {orderId: user.cart, user: req.user});
});*/

/*app.get("/history", isLoggedIn, function(req, res) {
	var user = req.user;
	History.find().populate('product').exec(function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("history.ejs", {history: product, user: user});
		}
	});
});*/

/*app.get("/orders", isLoggedIn, function(req, res) {
	History.find().populate('product').exec(function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("orders.ejs", {orders: product, user: req.user});
		}
	})
});*/

///////////////// - SHELF FUNCTIONALITY - /////////////////

/*app.get("/warehouse", isLoggedInA, function(req, res) {
	Product.find({}, function(err, allProducts) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("store.ejs", {products: allProducts});
		}
	});
});

app.get("/warehouse/add", isLoggedInA, function(req, res) {
	res.render("warehouse.ejs");
});

app.post("/warehouse", isLoggedInA, function(req, res) {
	var name = req.body.productName;
	var price = req.body.price;
	var category = req.body.category;
	var description = req.body.description;
	var status = req.body.status;
	var stock = req.body.stock;
	var image = req.body.image;
	var unit = req.body.unit;
	var newProduct = {
		name: name,
		price: price,
		category: category,
		description: description,
		status: status,
		stock: stock,
		image: image,
		unit: unit
	};
	Product.create(newProduct, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect("/warehouse");
		}
	});
});*/

/*app.get("/update/:id", isLoggedInA, function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if(err) {
			console.log(err);
		}
		else {
			res.render("edit.ejs", {product: product});
		}
	});
});*/

/*app.put("/warehouse/:id", isLoggedInA, function(req, res) {
	var name = req.body.productName;
	var price = req.body.price;
	var category = req.body.category;
	var description = req.body.description;
	var status = req.body.status;
	var stock = req.body.stock;
	var image = req.body.image;
	var unit = req.body.unit;
	var updatedProduct = {
		name: name,
		price: price,
		category: category,
		description: description,
		status: status,
		stock: stock,
		image: image,
		unit: unit
	};
	Product.findByIdAndUpdate(req.params.id, updatedProduct, function(err, product) {
		res.redirect("/warehouse");
	});
});*/

/*app.get("/pendingOrders", isLoggedInA, function(req, res) {
	History.find().populate('product').exec(function(err, allHistory) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(allHistory);
			res.render("pendingOrder.ejs", {orders: allHistory});
		}
	});
});

app.post("/pendingOrders/:id", isLoggedInA, function(req, res) {
	History.findById(req.params.id, function(err, history) {
		if(err) {
			console.log(history);
		}
		else {
			if(history.completed == "red") {
				history.completed = "green";
				history.save();
			}
			else if(history.completed == "green") {
				history.completed = "blue";
				history.save();
			}
			console.log(history);
			res.redirect("/pendingOrders");
		}
	});
});*/

/*function isLoggedIn(req, res, next) {
	if(req.isAuthenticated() && req.user.type === "customer") {
		return next();
	}
	res.redirect("/");
};

function isLoggedInA(req, res, next) {
	if(req.isAuthenticated() && req.user.type === "admin") {
		return next();
	}
	res.redirect("/admin/login");
};*/

app.listen(3000, function() {
	console.log("Listening");
});

// 1.Add billing History
// 2.Add view recent
// 3.Add update/remove in warehouse
// 4.Add edit in cart
// 5.Add navbar











