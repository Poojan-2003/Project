const mongoose = require('mongoose')
const LoginSchema = new mongoose.Schema({
    email:{type : String,required :true,unique:true},
    pass:{type : String,required :true},
    
})
const Logindetail = new mongoose.model("Logger",LoginSchema);
module.exports = Logindetail;