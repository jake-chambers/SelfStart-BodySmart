const express= require("express");
const router=express.Router();
const passport=require('passport');
const jwt =require('jsonwebtoken');
var secret = 'harrypotter'; // Create custom secret for use in JWT
var nodemailer = require('nodemailer'); // Import Nodemailer Package
var sgTransport = require('nodemailer-sendgrid-transport'); // Import Nodemailer Sengrid Transport Package

const User=require('./models/patientprofile');

 var client = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'brogrammersgang@gmail.com', 
            pass: '123456_ABC' // Your password
        },
        tls: { rejectUnauthorized: false }
        });

router.post('/', (req,res,next)=>{
   let newUser= new User({
       name:req.body.name,
       email:req.body.email,
       username:req.body.username,
       password:req.body.password,
       DOB:req.body.DOB,
       phone:req.body.phone,
       postalCode:req.body.postalCode,
       maritalStatus:req.body.maritalStatus,
       healthCardNumber:req.body.healthCardNumber,
       medicalHistory:req.body.medicalHistory,
       adminCode:req.body.adminCode,
   }); 
   

       
   
  User.addUser(newUser,(err,user)=>{
       console.log('adding user');
       if(err){
           res.json({success:false,msg:'failed to register user'});
       }else{
            
           console.log('setting isAdmin');
           if(newUser.adminCode=='A'){
               user.isAdmin=true;
           }else{
               user.isAdmin=false;
           }
 
            res.json({success:true,msg:'user registered'});
            
       }
   });
});

// //authentication
// router.post('/authenticate', (req, res, next) => {
// //get the user name and passowrd thats being submitted
// const username=req.body.username;
// const password=req.body.password;
// //get user by username from database
//     User.getUserByUsername(username,(err,user)=>{
//       if(err)throw err;
//       if(!user){//if there is not a user returned, then we want to send a response to the client
//         return res.json({success:false,msg:'User not found'});
//       }
//       if(user.adminCode=="A"){
//         user.isAdmin=true;
//       }else{
//         user.isAdmin=false;
//       }
  

//     var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user 
//      // Password does not match password in database
       
//       if (!validPassword) {res.json({ success: false, message: 'Could not authenticate password' });}
//       else if (!user.active) {res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.', expired: true }); }
//       else {var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });
//                             res.json({ success: true, message: 'User authenticated!', token:'JWT ' + token,
//         user:{
//           id: user._id,
//           name: user.name,
//           username:user.username,
//           email:user.email,
//           postalCode:user.postalCode,
//           phone:user.phone,
//           healthCardNumber:user.healthCardNumber,
//           medicalHistory:user.medicalHistory,
//           dateOfBirth:user.DOB,
//           maritalStatus:user.maritalStatus,
//           occupation:user.occupation,
//           isAdmin:user.isAdmin
//         }
//       });
//     }
//   });
// });
// //});




// // Route to activate the user's account 
//     router.put('/authenticate/:token', function(req, res) {
//         User.findOne({ temporarytoken: req.params.token }, function(err, user) {
//             if (err) {
//                 // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
//                 var email = {
//                     from: 'Self Start, brogrammersgang@gmail.com',
//                     to: 'brogrammersgang@gmail.com',
//                     subject: 'Error Logged',
//                     text: 'The following error has been reported in the MEAN Stack Application: ' + err,
//                     html: 'The following error has been reported in the MEAN Stack Application:<br><br>' + err
//                 };
//                 // Function to send e-mail to myself
//                 client.sendMail(email, function(err, info) {
//                     if (err) {
//                         console.log(err); // If error with sending e-mail, log to console/terminal
//                     } else {
//                         console.log(info); // Log success message to console if sent
//                         console.log(user.email); // Display e-mail that it was sent to
//                     }
//                 });
//                 res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
//             } else {
//                 var token = req.params.token; // Save the token from URL for verification 
//                 // Function to verify the user's token
//                 jwt.verify(token, secret, function(err, decoded) {
//                     if (err) {
//                         res.json({ success: false, message: 'Activation link has expired.' }); // Token is expired
//                     } else if (!user) {
//                         res.json({ success: false, message: 'Activation link has expired.' }); // Token may be valid but does not match any user in the database
//                     } else {
//                         user.temporarytoken = false; // Remove temporary token
//                         user.active = true; // Change account status to Activated
//                         // Mongoose Method to save user into the database
//                         user.save(function(err) {
//                             if (err) {
//                                 console.log(err); // If unable to save user, log error info to console/terminal
//                             } else {
//                                 // If save succeeds, create e-mail object
//                                 var email = {
//                                     from: 'Self Start, brogrammersgang@gmail.com',
//                                     to: user.email,
//                                     subject: 'Account Activated',
//                                     text: 'Hello ' + user.name + ', Your account has been successfully activated!',
//                                     html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
//                                 };
//                                 // Send e-mail object to user
//                                 client.sendMail(email, function(err, info) {
//                                     if (err) console.log(err); // If unable to send e-mail, log error info to console/terminal
//                                 });
//                                 res.json({ success: true, message: 'Account activated!' }); // Return success message to controller
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     });




module.exports=router;