const jwt = require('jsonwebtoken');
//const User = require('../models/user')
//const {body} = require('express-validator')

const verifyToken = (req,res,next)=>{
    let encoded = process.env.SECRET_KEY
    console.log(encoded);
    try{
        jwt.verify(req.headers["authorization"], encoded);
        return next();
    }catch(err){
        return res.status(500).send(err);
    }
}
/*const validateData = (req,res,next)=>{
    console.log("alukabli");
 let {name, email, phone, password} = req.body;
 console.log({name, email, phone,password});
 var user = new User({name:name, email:email, phone:phone, password:password});
 console.log("testUser",user);
 var err = user.joiValidate({name,email,phone,password});
 console.log("testUserAfter===",user);

 if(err) {
     throw err;
 }else{
 user.save((err,saved)=>{
     if(saved){
         return next()
     }
 })
 }
}*/
/*const passwordCheck = async(req,res,next)=>{
    let checkedPassword = body(req.body.password).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    console.log("checked password", checkedPassword);
    if(checkedPassword){
        return next()
    }else{
        res.status(500).send({message:"Please provide valid password"})
    }
}*/
const validatePassword=(req,res,next)=> {
    var {password} = req.body;
    console.log("size amader",password.length);
    let errors = [];
    if(password){
    if (password.length < 8) {
        // res.status(500).send({message:"Your password must be at least 8 characters"});
         errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[A-Z]/) < 0) {
        console.log("zero kano acompare hoche???",password.search(/[A-Z]/));
        // res.status(500).send({message:"Your password must have one uppercase letter"});
        errors.push("Your password must have one uppercase letter");
    }
    if (password.search(/[a-z]/) < 0) {
        console.log("zero kano acompare hoche lowercase???",password.search(/[a-z]/));
        // res.status(500).send({message:"Your password must have one lowercase letter"});
        errors.push("Your password must have one lowercase letter");
    }
    if (password.search(/[0-9]/) < 0) {
        console.log("zero kano compare hoche lowercase???",password.search(/[0-9]/));
        // res.status(500).send({message:"Your password must have at least 1 number"});
        errors.push("Your password must have atleast one number");
    }
    if (password.search(/(?=.*?[#?!@$%^&*-])/) < 0) {
        // res.status(500).send({message:"Your password must have at least 1 number"});
        errors.push("Your password must have atleast one special character");
    }
   if (errors.length > 0) {
        return res.status(500).send({message: errors.join("  ")});
        
    }
    return next();
}else{
    return next()
} 
}

module.exports = {verifyToken, validatePassword}

/* "/[a-z]/i" & "/[A-Z]i" basically means same that is accepts any character between lowercase and uppercase alphabets*/