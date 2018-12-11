var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors=require('cors');
const passport =require('passport');
var router = express.Router();
var jwt    = require('jsonwebtoken'); 
var multer = require('multer');
 

// import URL routes

var manageExercises = require('./routes/manageexercises');
var manageForms = require('./routes/manageforms');
var managePlans = require('./routes/manageplans');
var manageUsers = require('./routes/manageusers');
var makePayment = require('./routes/makepayment');
var executePayment = require('./routes/executepayment');
var patientprofile = require('./routes/patientprofile');
var bookappointment = require('./routes/bookappointment');
var managequestions = require('./routes/managequestions');
var register=require('./register');
var forgotpassword=require('./routes/forgotpassword');
var exercisePlan = require('./routes/exercisePlan');
var rehabPlan = require('./routes/rehabPlan');
var fileRoutes=require('./routes/file');
var ratingRoute = require('./routes/rating');

// remove the following middleware in the production version


app.use(function(request, response, next)
{
    response.header("Access-Control-Allow-Origin", "*");
    //response.setHeader('Access-Control-Allow-Origin', 'https://selfstartbodysmart-jakechambers12.c9users.io');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    //response.header('Access-Control-Allow-Credentials', 'true');
    next();
});


// uncomment the following line for the production version
//app.use(express.static('public'));
// the following 2 middleware convert the URL req and res to json format
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
//We use passport for authentication
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');


require('./config/passport')(passport);//passing in passport
// use Express to handle routes

app.use('/api', router);
// app.use('/file',fileRoutes);

router.use('/manageexercises',manageExercises);
router.use('/manageforms',manageForms);
router.use('/manageplans',managePlans);
router.use('/rating',ratingRoute);

router.use('/makepayment',makePayment); //sets up the payment prior to execution
router.use('/executepayment',executePayment); //self-explanatory

router.use('/manageusers',manageUsers);

router.use('/patientprofile', patientprofile); //route file name in the 2nd coloumn

router.use('/bookappointment',bookappointment);
router.use('/register',register);
router.use('/managequestions',managequestions);
router.use('/exercisePlan',exercisePlan);
router.use('/rehabPlan', rehabPlan);

//our file upload function.
router.post('/', function (req, res, next) {
     var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
  });     
})


mongoose.connect('mongodb://localhost/startUp');
app.listen(8081, function() 
{
    console.log('The Start-up server is listening on port 8081');
});