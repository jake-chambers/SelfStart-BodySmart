var express = require('express');
var router = express.Router();
var appointments = require('../models/appointment');
var fs = require ("fs");

router.route('/')

.get(function (request, response) 
    {
    
        appointments.find(function (error, appointments)
        {
            if (error) 
            {
                return response.send(error);
            }
            
            else
            {
                return response.json({bookappointment: appointments});
            }
      
        });
})

.post(function (request, response)
{
    var appointment = new appointments();
    appointment.clientID = request.body.clientID;
    appointment.date = request.body.date;
    appointment.location = request.body.location;
    appointment.describePain = request.body.describePain;
    appointment.cause = request.body.cause;
    appointment.dateOfInjury = request.body.dateOfInjury;
    appointment.description = request.body.description;
    appointment.ratingNow = request.body.ratingNow;
    appointment.ratingSevenDays = request.body.ratingSevenDays;
    appointment.aggrevation = request.body.aggrevation;
    appointment.easePain = request.body.easePain;
    appointment.morningPain = request.body.morningPain;
    appointment.eveningPain = request.body.eveningPain;
    appointment.otherTreatment = request.body.otherTreatment;
    appointment.otherPains = request.body.otherPains;
    appointment.otherConditions = request.body.otherConditions;
    appointment.explain = request.body.explain;
    appointment.symptoms = request.body.symptoms;
    appointment.history = request.body.history;
    appointment.describeHistory = request.body.describeHistory;
    appointment.occupation = request.body.occupation;
    appointment.activities = request.body.activities;
    appointment.goals = request.body.goals;
    // appointment.image.data = fs.readFileSync(request.body.image);
    // appointment.image.contentType = 'image/png';
    
    appointment.save(function (error)
    {
        if (error) 
            response.send(error);
        else
        {
         response.json({bookappointment: appointment});
        }
    });
});

router.route('/:post_id')

.get(function (request, response) 
{
    appointments.findById(request.params.post_id, function (error, appointments) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({bookappointment: appointments});
    }
    });
})

.put(function (request, response) 
{
    appointments.findById(request.params.post_id, function (error, appointment) 
    {
        if (error) 
        {
            response.send({error: error});
        }
        else
        {
            appointment.clientID = request.body.clientID;
            appointment.location = request.body.location;
            appointment.describePain = request.body.describePain;
            appointment.cause = request.body.cause;
            appointment.dateOfInjury = request.body.dateOfInjury;
            appointment.description = request.body.description;
            appointment.ratingNow = request.body.ratingNow;
            appointment.ratingSevenDays = request.body.ratingSevenDays;
            appointment.aggrevation = request.body.aggrevation;
            appointment.easePain = request.body.easePain;
            appointment.morningPain = request.body.morningPain;
            appointment.eveningPain = request.body.eveningPain;
            appointment.otherTreatment = request.body.otherTreatment;
            appointment.otherPains = request.body.otherPains;
            appointment.otherConditions = request.body.otherConditions;
            appointment.explain = request.body.explain;
            appointment.symptoms = request.body.symptoms;
            appointment.history = request.body.history;
            appointment.describeHistory = request.body.describeHistory;
            appointment.occupation = request.body.occupation;
            appointment.activities = request.body.activities;
            appointment.goals = request.body.goals;
            // appointment.image.data = fs.readFileSync(request.body.image);
            // appointment.image.contentType = 'image/png';
            
            appointment.save(function (error) 
            {
                if (error) 
                {
                  response.send({error: error});
                }
                else 
                {
                    response.json({bookappointment: appointment});
                }
            });
        }
    });
})

.delete(function (request, response) 
{
    appointments.findByIdAndRemove(request.params.post_id,
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