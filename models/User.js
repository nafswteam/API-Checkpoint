const {Schema, model} = require("mongoose")

// schema for defining the structure of the user model
const userSchema = new Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        unique: true,
        lowercase: true
    }
});

// user model for achieving CRUD
const User = model("User", userSchema)

module.exports = User;