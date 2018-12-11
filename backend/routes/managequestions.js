var express = require('express');
var router = express.Router();

var questions = require('../models/questions');

router.route('/')

.get(function (request, response) 
    {
        questions.find(function (error, question)
        {
            if (error) response.send(error);
            response.json({manageQuestions: question});
      
        });
})
.post(function (request, response)
{
    var question = new questions();
        question.questionText = request.body.questionText;
        question.helpDescription = request.body.questHelpDesc;
        question.order = request.body.questionOrder;
        // question.questiontype = request.body.questionType;
        
    question.save(function (error)
    {
        if (error) response.send(error);
        response.json({manageQuestions: question});
    });
});

router.route('/:post_id')

.get(function (request, response) 
{
    questions.findById(request.params.post_id, function (error, question) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({managequestions: questions});
    }
    });
})

.delete(function (request, response) 
{
    questions.findByIdAndRemove(request.params.post_id,
    function (error, deleted)
    {
        if (!error) 
        {
            response.json({managequestions: deleted});
        }
    }
    );
});

module.exports = router;