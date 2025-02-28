const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req, res){
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
                .status(503)
                .send("You don't have the permission to create a new owner.");
        }
        
        let {fullname, email, password} = req.body;

        let createdowner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdowner);
    });
}


router.get("/", function(req, res){
    res.send("hey it's working");
});


module.exports = router;