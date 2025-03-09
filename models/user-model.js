const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId, // ✅ Array of product references
        ref: "product"
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

// Avoid OverwriteModelError
const userModel = mongoose.models.User || mongoose.model("user", userSchema);

module.exports = userModel;
