const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { error: "" }); // Ensure error is always defined
});

module.exports = router;
