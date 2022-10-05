const mongoose = require('mongoose')
const DataSchema = new mongoose.Schema({
    Name:{type : String,unique:false},
    email:{type : String},
    id:{type : String},
    topics:{type : String},
    contact:{type:Number},
    internship:{type:Boolean},
    speciality:{type:String},
    devlopment:{type : String}    
})
const datadetail = new mongoose.model("DATA",DataSchema);
module.exports = datadetail;