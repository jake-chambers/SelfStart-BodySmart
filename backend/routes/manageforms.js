var express = require('express');
var router = express.Router();

var selfstartuser = require('../models/selfstartuser');
var forms = require('../models/forms');
var administrator = require('../models/administrator');
var questions = require('../models/questions');
var questiontype = require('../models/questiontype');


router.route('/')

.get(function (request, response) 
    {
        forms.find({},function (error, form)
        {
            if (error) response.send(error);
            response.json({manageforms: form});
      
        });
})

.post(function (request, response)
{
    var newForm = new forms();
        newForm.name = request.body.formName;
        newForm.description = request.body.formDescription;
    
    var admin = new administrator();
        admin.dateHired = request.body.adminDateHired;
        admin.dateFinished = request.body.adminDateFinished;
    
    newForm.author = admin;
    
    newForm.save(function (error)
    {
        if (error) response.send(error);
        response.json({manageforms: newForm});
    });
});

router.route('/:post_id')

.get(function (request, response) 
{
    forms.findById(request.params.post_id, function (error, form) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({manageforms: form});
    }
    });
})


.put(function (request, response) 
{
    forms.findById(request.params.post_id, function (error, form) 
    {
        if (error) 
        {
            response.send({error: error});
        }
        else
        {
            if(request.body.name == null|| request.body.description == null){
                var question = new questions();
                question.questionText = request.body.questionText;
                question.helpDescription = request.body.questHelpDesc;
                questions.order = request.body.questionOrder;
                form.questions.push(question);
            }
            else{
                form.name = request.body.name;
                form.description = request.body.description;
            }
            form.save(function (error) 
            {
                if (error) 
                {
                  response.send({error: error});
                }
                else 
                {
                    response.json({manageforms: form});
                }
            });
        }
    });
})

.delete(function (request, response) 
{
    forms.findByIdAndRemove(request.params.post_id,
    function (error, deleted)
    {
        if (!error) 
        {
            response.json({manageforms: deleted});
        }
    });
});

router.route('/:post_id/:question_id')
.delete(function (request, response) 
{
    forms.findById(request.params.post_id, function (error, form) 
    {
        if (error) 
        {
            response.send({error: error});
        }
        else
        {
            var index = form.questions.findIndex(q=>q._id.toString()==request.params.question_id);
            if(index != -1){
                form.questions.splice(index,1);
                form.save(function (error) 
                {
                    if (error) 
                    {
                      response.send({error: error});
                    }
                    else 
                    {
                        response.json({manageforms: form});
                    }
                });
            }
        }
    });
})

.post(function(request, response)
{
    forms.findById(request.params.post_id, function (error, form)
    {
        if (error)
        {
            response.send ({error:error});
        }
        
        else
        {
            var index = form.questions.findIndex(q=>q._id.toString()==request.params.question_id);
            console.log ("INDEX IS: " + index);
            if(index != -1){
                console.log("ANSWER IS: " + request.body.answer);
                console.log("QUESTION FOUND IS: " + form.questions[index]);
                form.questions[index].answer = request.body.answer;
                form.save(function (error) 
                {
                    if (error) 
                    {
                      response.send({error: error});
                    }
                    else 
                    {
                        response.json({manageforms: form});
                    }
                });
            }
        }
    })
})

module.exports = router;