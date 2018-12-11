var express = require('express');
var router = express.Router();
var users = require('../models/useraccount');
var patientProfiles = require('../models/patientprofile');
var selfstartUsers = require('../models/selfstartuser');
const jwt =require('jsonwebtoken');
const bcrypt = require("bcryptjs");


router.get('/', function(request, response) {

    patientProfiles.find(function(error, user) {
        if (error) response.send(error);
        response.json({ allUsers: user });
    }).sort({name: 1});

    /*     selfstartUsers.find(function (error, user){
                     
                if (error) response.send(error);
                response.json({manageusers: user});
    });  */

});

router.post('/', function(request, response) {

});

router.put('/', function(request, response) {

    patientProfiles.findById(request.params.post_id, function(error, user) {

        if (error) {
            response.send({ error: error });
        }
        else {

            user.username = request.body.username;
            user.name = request.body.name;
            user.email = request.body.email;
            user.postalCode = request.body.postalCode;
            user.phone = request.body.phone;
            user.DOB = request.body.DOB;
            user.maritalStatus = request.body.maritalStatus;
            user.healthCardNumber = request.body.healthCardNumber;
            user.medicalHistory = request.body.medicalHistory;

            user.save(function(error) {
                if (error) {
                    response.send({ error: error });
                }
                else {
                    response.json({ updatedUser: user });
                }
            });

        }
    });

    /* patientProfiles.getUserByUsername(request.body.username ,  (error, user) => {
             
                if(error) throw error;
                 if(!user){//if there is not a user returned, then we want to send a response to the client
                         return response.json({success:false,msg:'User not found'});
                 }
                 
                 
                  user.name=request.body.name;
                 user.email=request.body.email;
                 user.postalCode=request.body.postalCode;
                 user.phone=request.body.phone;
                 user.DOB=request.body.DOB;
                 user.maritalStatus=request.body.maritalStatus;
                 user.healthCardNumber=request.body.healthCardNumber;
                 user.medicalHistory=request.body.medicalHistory;
     
         
                  patientProfiles.save(function (error) 
                  {
                      if (error) 
                      {
                        response.send({error: error});
                      }
                      else 
                      {
                          response.json({updatedUser: user});
                      }
                 });
         });
         */

});

//});

// router.delete('/',function(req, response){
//     patientProfiles.findByIdAndRemove(req.params.post_id ,function(err, deleted){

//                 if(err) {

//                     console.log(err);

//                     if(err.kind === 'ObjectId') {
//                         return response.json({message: "User not found with id " + req.params.post_id});                
//                     }
//                     return response.json({message: "Could not delete user with id " + req.params.post_id});
//                 } else {
//                     response.json({user: deleted});
//                 }

//             });
// });

router.get('/:post_id', function(request, response) {
    patientProfiles.findById(request.params.post_id, function(error, user) {

        if (error)
            response.send(error);
        else
            response.json({ manageUsers: user });

    });
});

// router.post('/:id',function(request, response){

// });

router.put('/:post_id', function(request, response) {

    patientProfiles.findById(request.params.post_id, function(error, user) {

        var username = request.body.username;
        var name=request.body.name;
        var email = request.body.email;
        var postalCode = request.body.postalCode;
        var phone = request.body.phone;
        var DOB = request.body.DOB;
        var maritalStatus = request.body.maritalStatus;
        var healthCardNumber = request.body.healthCardNumber;
        var medicalHistory = request.body.medicalHistory;
        var rehabPlan = request.body.rehabPlan;
        var form = request.body.formID;
        
        var password = request.body.password;

        if (error) {
            response.send({ error: error });
        }

        if (password != null) 
        {
            bcrypt.genSalt(10,(err,salt)=>{
    //take the password that is submitted in the form and into the newUser object, and hash it
         bcrypt.hash(password,salt,(err,hash)=>{
         if(err)throw err;
         user.password=hash;
        user.save();//save the user.
    });
  });

        }

        if (username != null)
        {
            user.username = request.body.username;
        }

        if (name != null)
        {
            user.name = request.body.name;
        }


        if (email != null)
            user.email = email;

        if (postalCode != null)
            user.postalCode = postalCode;

        if (phone != null)
            user.phone = phone;

        if (DOB != null)
            user.DOB = DOB;

        if (maritalStatus != null)
            user.maritalStatus = maritalStatus;

        if (healthCardNumber != null)
            user.healthCardNumber = healthCardNumber;

        if (medicalHistory != null)
            user.medicalHistory = medicalHistory;

        if (rehabPlan != null)
            user.rehabPlan = rehabPlan;
            
         if (form != null)
            user.forms.push(request.body.formID);


        user.save(function(error) {
            if (error) {
                response.send({ error: error });
            }
            else 
            {
                response.send({ updatedUser: user });
            }
        });


    });

    // patientProfiles.findByIdAndUpdate(request.params.post_id, function (error, user) 
    //         {
    //           if(error) throw error;


    //             user.username = request.body.username;
    //             user.name=request.body.name;
    //             user.email=request.body.email;
    //             user.postalCode=request.body.postalCode;
    //             user.phone=request.body.phone;
    //             user.DOB=request.body.DOB;
    //             user.maritalStatus=request.body.maritalStatus;
    //             user.healthCardNumber=request.body.healthCardNumber;
    //             user.medicalHistory=request.body.medicalHistory;

    //              user.save(function (error) 
    //              {
    //                  if (error) 
    //                  {
    //                   response.send({error: error});
    //                  }
    //                  else 
    //                  {
    //                      response.json({updatedUser: user});
    //                  }
    //             });
    //     });

});

router.delete('/:post_id', function(req, response) {
    patientProfiles.findByIdAndRemove(req.params.post_id, function(err, deleted) {

        if (err) {

            console.log(err);

            if (err.kind === 'ObjectId') {
                return response.json({ message: "User not found with id " + req.params.post_id });
            }
            return response.json({ message: "Could not delete user with id " + req.params.post_id });
        }
        else {
            response.json({ user: deleted });
        }

    });
});


router.post('/:post_id', function(req, response) 
{
    patientProfiles.findById(req.params.post_id, function(err, profile) {
    
        if (err) {
            console.log(err);
        }

        else {
            profile.forms.push(req.body.forms);
            
            profile.save(function(error) 
            {
                if (error) 
                {
                    response.send({ error: error });
                }
                else 
                {
                    response.json({ profile: profile });
                }
            });
        }
    });
});

module.exports = router;