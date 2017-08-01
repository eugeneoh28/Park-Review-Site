var mongoose = require("mongoose")

var userSchema = mongoose.Schema({
    text:String,
    author: String
})

module.exports = mongoose.model("User", userSchema);