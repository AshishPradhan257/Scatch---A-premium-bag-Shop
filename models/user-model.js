const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

// ✅ Check if model already exists before defining
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;
