const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model"); // Import product model
const isLoggedin = require("../middlewares/isloggedin");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error }); // Ensure error is always defined
});



router.get("/shop", isLoggedin, async function(req, res) {
    try {
        let products = await productModel.find(); // Fetch all products from DB
        res.render("shop", { products }); // ✅ Pass products to EJS template
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error fetching products");
    }
});


router.get("/logout", isLoggedin, function(req, res){
    res.render("shop");
});

module.exports = router;
