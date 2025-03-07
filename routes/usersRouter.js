const express = require('express');
const userModel = require('../models/user-model');
const router = express.Router();

router.get("/", function(req, res){
    res.send("hey it's working");
});

router.post("/register", async function(req, res){
    let {email, password, fullname} = req.body;

    let user = await userModel.create({
        email,
        password,
        fullname,
    });
});


module.exports = router;