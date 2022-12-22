const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: String,
    emailAddress: String,
    password: String,
    petName: String,
    country: String,
    city: String,
    profileImage: String,
    posts: Array,
    friends: Array
})

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema)

module.exports = {User};