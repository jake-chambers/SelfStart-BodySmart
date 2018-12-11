var express = require('express');
var router = express.Router();
var rehabPlans = require('../models/rehabilitationplans');
var manageExerciseSchema = require('../models/manageexercises');
var assessmentTestsSchema = require('../models/assessmenttests');
var formsSchema = require('../models/forms');
var administratorSchema = require('../models/administrator');
var questionSchema = require('../models/questions');
var questionTypeSchema = require('../models/questiontype');
var treatmentsSchema = require('../models/treatments');
var recommendationSchema = require('../models/recommendation');
var physiotherapistSchema = require('../models/physiotherapist');

router.route('/')

.get(function (request, response) 
    {
        
        rehabPlans.find(function(error, rehabPlans)
        {
            if (error) response.send(error);
            response.json({manageplans: rehabPlans});
        });
    
    })
    
.post(function (request, response)
{
    //default value type is string unless otherwise commented
   var rehabPlan = new rehabPlans();
       rehabPlan.name = request.body.rehabName;                     
       rehabPlan.description = request.body.rehabDescription;       
       rehabPlan.authorName = request.body.rehabAuthor;             
       rehabPlan.goal = request.body.rehabGoal;                     
       rehabPlan.timeFrameToComplete = request.body.rehabTimeFTC;    
   
   var manageExercise = new manageExerciseSchema();
       manageExercise.name = request.body.exerciseName;             
       manageExercise.description = request.body.exerciseDescription;
       manageExercise.authorName = request.body.exerciseAuthorName;
       manageExercise.objectives = request.body.exerciseObjectives;
       manageExercise.actionSteps = request.body.exerciseActionSteps;
       manageExercise.location = request.body.exerciseLocation;
       manageExercise.frequency = request.body.exerciseFrequency;   //number
       manageExercise.duration = request.body.exerciseDuration;     //number
       manageExercise.targetDate = request.body.exerciseTargetDate; //date
       manageExercise.multimediaURL = request.body.exerciseMultiMediaURL
     
    rehabPlan.exercise = manageExercise;
    
    var assessmentTest = new assessmentTestsSchema();
        assessmentTest.name = request.body.assTestName;
        assessmentTest.description = request.body.assTestDescription;
        assessmentTest.authorName = request.body.assTestAuthorName;
    
    var form = new formsSchema
        form.name = request.body.formName;
        form.description = request.body.formDescription;
    
    var admin = new administratorSchema();
        admin.dateHired = request.body.adminDateHired;  //date
        admin.dateFinished = request.body.dateFinished; //date
    
    form.author = admin;
    
    var question = new questionSchema();
        question.questionText = request.body.questionText;
        question.helpDescription = request.body.questionHelpDesc;
        question.order = request.body.questionNumber;   //number
    
    var questionType = new questionTypeSchema()
        questionType.name = request.body.questionTypeName;
    
    question.questionType = questionType;
    form.questions = question;
    assessmentTest.assessmentTool = form;
    rehabPlan.test = assessmentTest;
    
    var treatment = new treatmentsSchema();
        treatment.dateAssign = request.body.treatmentDate;
    
    var recommendation = new recommendationSchema();
        recommendation.timeStamp = request.body.recommendationTimeStamp; //date
        recommendation.decision = request.body.recommendationDecision;
    
    var physiotherapist = new physiotherapistSchema();
        physiotherapist.dateHired = request.body.physiotherapistDateHired;
        physiotherapist.dateFinished = request.body.physiotherapistDateFinished
    
    treatment.response = recommendation;
    treatment.physio = physiotherapist;
    rehabPlan.plan = treatment;
   
    
   rehabPlan.save(function(error)
   {
       if (error) response.send(error);
        response.json({manageplans: rehabPlan});
   });
   
});

router.route('/:post_id')

.get(function (request, response) 
{
    rehabPlans.findById(request.params.post_id, function (error, rehabPlans) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({manageplans: rehabPlans});
    }
    });
})

.put(function (request, response) 
{
    rehabPlans.findById(request.params.post_id, function (error, rehabPlan) 
    {
        if (error) 
        {
            response.send({error: error});
        }
        else
        {
            
            rehabPlan.name = request.body.name;
            rehabPlan.description = request.body.description;
            rehabPlan.authorName = request.body.authorName;
            rehabPlan.goal = request.body.goal;
            rehabPlan.timeFrameToComplete = request.body.timeFrameToComplete;
            
            rehabPlan.save(function (error) 
            {
                if (error) 
                {
                  response.send({error: error});
                }
                else 
                {
                    response.json({manageplan: rehabPlan});
                }
            });
        }
    });
})

.delete(function (request, response) 
{
    rehabPlans.findByIdAndRemove(request.params.post_id,
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