var express = require("express");
var router = express.Router();
const jwt =require('jsonwebtoken');
const config=require('../config/database');
const passport=require('passport');
var User = require('../models/patientprofile');
var treatmentsSchema = require('../models/treatments');
var recommendationSchema = require('../models/recommendation');
var physiotherapistSchema = require('../models/physiotherapist');
var paymentsSchema = require('../models/payments');
var countrySchema = require('../models/country');
var provinceSchema = require('../models/province');
var citySchema = require('../models/city');
var genderSchema = require('../models/gender');
var appointmentSchema = require('../models/appointment');




//authentication
router.post('/authenticate', (req, res, next) => {
//get the user name and passowrd thats being submitted
const username=req.body.username;
const password=req.body.password;
//get user by username from database
    User.getUserByUsername(username,(err,user)=>{
      if(err)throw err;
      if(!user){//if there is not a user returned, then we want to send a response to the client
        return res.json({success:false,msg:'User not found'});
      }
      if(user.adminCode=="A"){
        user.isAdmin=true;
      }else{
        user.isAdmin=false;
      }
  

  //if there is a user, compare the entered password with the user password
  User.comparePassword(password,user.password,(err,isMatch)=>{
    if(err)throw err;
    if(isMatch){//if the password is correct, create a token
      const token=jwt.sign({data:user},config.secret,{
        expiresIn: 604800,//user is kept login in for a week and then logged out
      });

      //a response to the front end from database if the password matches
      res.json({
        success:true,//worked, they validated
        token:'JWT ' + token,
        user:{
          id: user._id,
          name: user.name,
          username:user.username,
          email:user.email,
          postalCode:user.postalCode,
          phone:user.phone,
          healthCardNumber:user.healthCardNumber,
          medicalHistory:user.medicalHistory,
          dateOfBirth:user.DOB,
          maritalStatus:user.maritalStatus,
          occupation:user.occupation,
          isAdmin:user.isAdmin
        }
      });
    }
    //a response to the front end if the password doesnt match
    else{
      return res.json({success:false, msg:'Wrong Password'});
    }
  });
});
});







//profile, adding passport.authenticate(..) helps us protected that route to a single user
router.get('/profile', passport.authenticate('jwt',{session:false}),(req, res,next) => {
 res.json({user: req.user});
 
});

// //authentication
// router.put('/profile', (req, res, next) => {
// //get the user name and passowrd thats being submitted
// const username=req.body.username;


// //get user by username from database
//     patientProfiles.getUserByUsername(username,(err,user)=>{
//       if(err)throw err;
//       if(!user){//if there is not a user returned, then we want to send a response to the client
//         return res.json({success:false,msg:'User not found'});
//       }
  
//     user.name=req.body.name;
//     user.email=req.body.email;
//     user.postalCode=req.body.postalCode;
//     user.phone=req.body.phone;
//     user.DOB=req.body.DOB;
//     user.maritalStatus=req.body.maritalStatus;
//     user.healthCardNumber=req.body.healthCardNumber;
//     user.medicalHistory=req.body.medicalHistory;
        
//      user.save(function (error) 
//             {
//                 if (error) 
//                 {
//                   user.send({error: error});
//                 }
//                 else 
//                 {
//                     res.json({user: user});
//                 }
//             });
       
        
//       });
  
// });




         
        

            
module.exports = router;

