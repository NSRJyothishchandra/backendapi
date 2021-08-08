const express= require("express")
const loginS = require("../models/loginModel.js")
const cors = require("cors")
const loginandsignupRouter  = express.Router();
const bodyParser = require("body-parser");
const app = require("../server.js");
loginandsignupRouter.use(cors())
loginandsignupRouter.use(bodyParser.json())
loginandsignupRouter.get("/",(req,res,next)=>{
     loginS.find({})
     .then((login)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json")
         res.json({login})
         
     })
     .catch((err)=>console.log(err))
})
loginandsignupRouter.post("/",(req,res,next)=>{
    loginandsignupS.create({username : req.body.username, password: req.body.password})
    .then((login)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json")
        res.json(login);
    })
    .catch((err)=>{
        res.statusCode = 402;
       
        res.send("Error,Please try again")
    })
})
loginandsignupRouter.delete("/:id",(req,res,next)=>{
    LoginS.deleteOne({_id:req.params.id})
    .then((news)=>{
        res.statusCode = 200;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Content-Type","application/json");
        LoginS.find({})
    
        .then((resp)=>{
            res.statusCode = 200;
            res.header("Access-Control-Allow-Origin", "*");
            res.setHeader("Content-Type","application/json")
            res.json(resp)
        })
    })
    .catch((err)=>{
        res.statusCode = 402;
        res.send("Error,Please try again")
    })
})
module.exports = LoginandsignupRouter