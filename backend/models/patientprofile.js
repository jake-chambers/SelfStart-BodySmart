var mongoose = require ('mongoose');
var selfstartuser = require('./selfstartuser'); 
const config=require('../config/database');
const bcrypt = require("bcryptjs");
// var options = { discriminatorKey: 'kind' };
var patientprofile = new mongoose.Schema({
        DOB: String,
        username:{type:String, required:true},
        password:{type:String, required:true},
        postalCode: String,
        phone: String,
        maritalStatus: String,
        healthCardNumber: String,
        occupation: String,
        email: String,
        name : String,
        medicalHistory : String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        isAdmin:Boolean,
        adminCode:String,
        forms:[{
          type:String
        }],
        rehabPlan: [{
          type:String
          }],
          rating :[{
            exerciseID : {rating : Number}
          }]
        
        
    //     plan: [{
    //         type: mongoose.Schema.ObjectId, ref: 'treatments'
    //     }],
        
    //     payment: [{
    //         type: mongoose.Schema.ObjectId, ref: 'payments'
    //     }],
        
    //     country: {
    //         type: mongoose.Schema.ObjectId, ref: 'country'
    //     },
       
    //     gender: {
    //         type: mongoose.Schema.ObjectId, ref: 'gender'
    //     },
        
    //     appointment: [{
    //         type: mongoose.Schema.ObjectId, ref: 'appointment'
    //     }]
     //},options)
     }
);
    
const User=module.exports = mongoose.model('User',patientprofile);



// //create two basic functions
// //get user by id, and get user by username.
// //module.exports allows us to call the functions outside this file.
module.exports.getUserById=function(id,callback){
  User.findById(id, callback);
};

module.exports.getUserByUsername=function(username,callback){
  const query={username:username};
  User.findOne(query, callback);
};


// //hash the password using genSalt(), genSalt generates a random key
module.exports.addUser=function(newUser,callback){
  //10 rounds
  bcrypt.genSalt(10,(err,salt)=>{
    //take the password that is submitted in the form and into the newUser object, and hash it
    bcrypt.hash(newUser.password,salt,(err,hash)=>{
      if(err)throw err;
      newUser.password=hash;
      newUser.save(callback);//save the user.
    });
  });
};

module.exports.comparePassword=function(canidatePassword,hash,callback){
  bcrypt.compare(canidatePassword,hash,(err,isMatch)=>{
    if(err)throw err;
    callback(null,isMatch);
  });
};


// //exporting the model.
// const PatientProfile=module.exports=mongoose.model('PatientProfile',PatientProfileSchema);