
const express = require('express');
const router = express.Router();
const {isLoggedIn,isLoggedInA} = require("../middleware/fixers");


router.get("/",isLoggedIn,(req,res) =>{
    res.render("trackhomepage")
})
router.get("/doctorvisit",isLoggedIn,(req,res) =>{
    res.render("doctorreminder")
})
router.get("/medicationReminder",isLoggedIn,(req,res) =>{
    res.render("medicationreminder")
})
router.get("/attackrecord",isLoggedIn,(req,res) =>{
    res.render("attackrecord")
})




module.exports=router;