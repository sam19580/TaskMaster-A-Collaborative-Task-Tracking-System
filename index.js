
const express =require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const Ajv=require('ajv');
const Validation=require('./functions/Validations')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { issueToken } = require('./functions/Validations');
const userSchema=require('./models/users.json');
const eventSchema = require('./models/events.json');
const port=3000;
const ajv = new Ajv();
ajv.addSchema(userSchema,"userSchema");
ajv.addSchema(eventSchema,"eventSchema");
app.listen(port,()=>{
    console.log("server started in in port 3000");
})
app.get("/",(req,res)=>{
    res.status(200).json("server working");
})
app.post("/event-management/api/v1/register",(req,res)=>{
    const valid = ajv.validate('userSchema',req.body);
   const  userExists=Validation.checkUser(req.body.username);
    if(userExists===true){
        res.status(400).json("user exists");
    }else{
       const hash= Validation.hashPassword(req.body.user.password);
       JSON.stringify(hash);
       
      const token= Validation.issueToken(req.body);
      JSON.stringify(token)
    res.status(200).json("user successfully registered $hash "+hash+"token is"+token);
    }
})
app.post("/event-management/api/v1/login",(req,res)=>{
    username=req.body.user["username"];
    userValidity = Validation.checkUser(username);
    if(userValidity===false){
    res.status(200).json("user successfully logged in");
    }else{
        res.status(400).json("user doesn't exists");
    }
})
app.post("/event-management/api/v1/events",(req,res)=>{
    
    const valid = ajv.validate('eventSchema',req.body);

    res.status(200).json("Event successfully registered");
})
app.post("/event-management/api/v1/events/:id/registration",(req,res)=>{
    res.status(200).json(" Participant Successfully registered for event");
})

