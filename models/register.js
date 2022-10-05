const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    firstname:{type : String},
    lirstname:{type : String},
    email:{type : String,unique:true},
    password:{type : String},
    confirmpassword:{type : String},
})
const Register = new mongoose.model("employee",employeeSchema);
module.exports = Register;