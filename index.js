const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Register = require("./models/register");
const Logindetail = require("./models/login");
const datadetail = require("./models/data");
mongoose.connect("mongodb://localhost:27017/Userdata").then(() => {
console.log("connection succesfull");
});

const app = express();
const ejs = require('ejs')
app.set('view engine','ejs')
const static_path = path.join(__dirname,"FINALPROJECT", "../public");

const Static_Path = path.join(__dirname,"FINALPROJECT","../views")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
 
app.get("/",(req,res)=>{
    res.sendFile('signup.html', { root: static_path })
})

app.get("/Login",(req,res)=>{
    res.sendFile('Login.html', { root: static_path })
})
app.post("/", async (req, res) => {
    try {
      password = req.body.password;
      cpassword = req.body.confirmpassword;
  
      if (password === cpassword) {
        const registeremployee = new Register({
          firstname: req.body.firstname,
          lirstname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
        });
        const registered = registeremployee.save();
  
        res.status(201).redirect("/Login.html")
      } else {
        res.send("please enter correct password");
      }
    } catch (error) {
      res.status(404).send(error);
    }
  });
  app.post("/Login.html", async (req, res) => {
    try {
      (email1 = req.body.email), (pass = req.body.pass);
  
      const user = await Register.findOne({ email: email1 }).lean();
  
      if (!user ) {
         res.redirect("/");
             }
      else if (user.password === pass) {
       res.redirect("/LoginAs.html");
        
      } else {
         res.redirect("/Login.html");

      }
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });

  app.post("/info.html", async (req, res) => {
    try {
        const registeremployee1 = new datadetail({
         
          Name:req.body.name,
          email:req.body.email,
          id:req.body.id,
          topics:req.body.topic,
          contact:req.body.con,
          internship:req.body.intern,
          speciality:req.body.speciality,
         devlopment:req.body.devlopment
        });
        const registered1 = registeremployee1.save();
  
        res.status(201).redirect("/Fpage")
      }
    catch (error) {
      res.status(404).send(error);
    }
  })
app.get("/Fpage",(req,res)=>{
  
  datadetail .find({},function(err,datadetail){
    res.render('Fpage',{
        employeelist : datadetail
    })
})
})




app.listen(port, () => {
    console.log(`sever is running on port ${port}`);
  });
  