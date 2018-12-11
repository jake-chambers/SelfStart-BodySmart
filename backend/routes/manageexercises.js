var express = require('express');
var router = express.Router();
var exercises = require('../models/manageexercises');

router.route('/')

.get(function (request, response) 
    {
    
        exercises.find(function (error, exercises)
        {
            if (error) response.send(error);
            response.json({manageexercises: exercises});
      
        });
})

.post(function (request, response)
{
    var exercise = new exercises();
    exercise.name = request.body.name;
    exercise.description = request.body.description;
    exercise.authorName = request.body.authorName;
    exercise.objectives = request.body.objectives;
    exercise.actionSteps = request.body.actionSteps;
    exercise.location = request.body.location;
    exercise.frequency = request.body.frequency;
    exercise.duration = request.body.duration;
    exercise.multimediaURL = request.body.multimediaURL;
    exercise.rating = request.body.rating;
    
    exercise.save(function (error)
    {
        if (error) response.send(error);
        response.json({manageexercises: exercise});
    });
});

router.route('/:post_id')

.get(function (request, response) 
{
    exercises.findById(request.params.post_id, function (error, exercises) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({manageexercises: exercises});
    }
    });
})

.put(function (request, response) 
{
    exercises.findById(request.params.post_id, function (error, exercise) 
    {
        if (error) 
        {
            response.send({error: error});
        }
        else
        {
            var userID;
            if (request.body.name != null)
                exercise.name = request.body.name;
            if (request.body.description != null)
                exercise.description = request.body.description;
            if (request.body.authorName != null)
                exercise.authorName = request.body.authorName;
            if (request.body.objectives != null)
                exercise.objectives = request.body.objectives;
            if (request.body.actionSteps != null)
                exercise.actionSteps = request.body.actionSteps;
            if (request.body.location != null)
                exercise.location = request.body.location;
            if (request.body.frequency != null)
                exercise.frequency = request.body.frequency;
            if (request.body.duration != null)
                exercise.duration = request.body.duration;
            if (request.body.multimediaURL != null)
                exercise.multimediaURL = request.body.multimediaURL;
            if (request.body.userID != null)
                userId = request.body.userID;
            if (request.body.rating != null)
                exercise.rating.userID= request.body.rating
            
            exercise.save(function (error) 
            {
                if (error) 
                {
                  response.send({error: error});
                }
                else 
                {
                    response.json({manageexercises: exercise});
                }
            });
        }
    });
})

.delete(function (request, response) 
{
    exercises.findByIdAndRemove(request.params.post_id,
    function (error, deleted)
    {
        if (!error) 
        {
            response.json({post: deleted});
        }
    }
    );
});
    
module.exports = router;