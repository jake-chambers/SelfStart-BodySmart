const express= require("express");
const router=express.Router();
var exerciseplans = require('../models/exerciseplan');

router.route('/')


.get(function (request, response) 
    {
        exerciseplans.find(function (error, exerciseplans)
        {
            if (error) response.send(error);
            response.json({exercisePlan: exerciseplans});
      
        });
})

.post(function (request, response)
{
    var exerciseplan = new exerciseplans();
    exerciseplan.exercise = request.body.exercise;
    
    exerciseplan.save(function (error)
    {
        if (error) response.send(error);
        response.json({exercisePlan: exerciseplans});
    });
});


module.exports=router;