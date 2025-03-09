const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model"); // Import product model
const isLoggedin = require("../middlewares/isloggedin");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error }); // Ensure error is always defined
});



router.get("/shop", isLoggedin, async function(req, res) {
    try {
        let products = await productModel.find(); // Fetch all products from DB
        let success = req.flash("success");
        res.render("shop", { products, success }); // ✅ Pass products to EJS template

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error fetching products");
    }
});

router.get("/cart", isLoggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");

        // If user does not exist or cart is empty, render empty cart
        if (!user || !user.cart.length) {
            return res.render("cart", { user, cartItems: [], totalAmount: 0 });
        }

        // Map cart items and calculate totals
        let cartItems = user.cart.map(item => {
            let itemTotal = (Number(item.price) + 20) - Number(item.discount);
            return {
                ...item._doc, // Spread MongoDB document fields
                image: item.image ? item.image.toString("base64") : null, // Ensure image is Base64
                itemTotal,
            };
        });

        // Calculate the total cart amount
        let totalAmount = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

        res.render("cart", { user, cartItems, totalAmount });

    } catch (err) {
        console.error("Error fetching cart:", err.message);
        res.status(500).send("Error fetching cart");
    }
});

router.get("/addtocart/:productid", isLoggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }); // Find the user

        if (!user) { // Handle case where user is not found
            return res.status(404).send("User not found.");
        }

        user.cart.push(req.params.productid); // Add product ID to cart
        await user.save(); // Save the updated user document
        req.flash("success", "Added to cart");
        res.redirect("/shop"); // Redirect to shop after adding to cart
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error adding to cart");
    }
});



router.get("/logout", isLoggedin, function(req, res){
    res.render("shop");
});

module.exports = router;
