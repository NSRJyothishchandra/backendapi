const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    loginHeading : {
        type:String,
        required:true
    },
    Password :{
        type:String,
        default:"NA"
    }
},{timestamps:true})

const loginS = mongoose.model('loginList', loginSchema);

module.exports = loginS