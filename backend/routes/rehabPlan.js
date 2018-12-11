const express= require("express");
const router=express.Router();
var rehabplans = require('../models/rehabilitationplans');
var exercises = require('../models/manageexercises');


router.route('/')

.get(function (request, response) 
    {
        rehabplans.find(function (error, rehabplans)
        {
            if (error) response.send(error);
            response.json({rehabPlan: rehabplans});
      
        });
})

.delete(function (req, res) 
    {
        rehabplans.find(function (err, rehabplans)
        {
            if(err) return res.send(err);
            res.json({rehabPlan: rehabplans});
        });
})

.post(function(req, res) {

        var rehabplan = new rehabplans();      // create a new instance of the Bear model
        rehabplan.name = req.body.name;  // set the exercise name
        rehabplan.description = req.body.description;
        rehabplan.authorName = req.body.authorName;
        rehabplan.goal = req.body.goal;
        rehabplan.timeFrameToComplete = req.body.timeFrameToComplete;
        rehabplan.complete = req.body.complete;
        rehabplan.exercises = req.body.exercises;
 
        // save the bear and check for errors
        rehabplan.save(function(err) {
            if (err)
                res.send(err);

            res.json({  PlanCreated: rehabplan });
        });

    });
router.route('/:post_id')

.get(function (request, response) 
{
    rehabplans.findById(request.params.post_id, function (error, rehabplans) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({rehabPlan: rehabplans});
    }
    });
})





// .put(function(request, response) {
    
     
//         var number;
//         var userId;
        
//     rehabplans.findById(request.params.post_id, function(error, rehabPlan) {
//         if (error)
//         {
//             response.send({error:error});
//         }
//         else
//         {
//             if (request.body.name != null)
//             rehabPlan.name = request.body.name;
//         if (request.body.description != null)
//             rehabPlan.description = request.body.description;
//         if (request.body.authorName != null)
//             rehabPlan.authorName = request.body.authorName;
//         if (request.body.goal != null)
//             rehabPlan.goal = request.body.goal;
//         if (request.body.timeFrameToComplete != null)
//             rehabPlan.timeFrameToComplete = request.body.timeFrameToComplete;
//         if (request.body.complete != null)
//             rehabPlan.complete = request.body.complete;
//         if (request.body.exercises != null)
//             rehabPlan.exercises = request.body.exercises;
//         if (request.body.userID != null)
//             userId = request.body.userID;
        
//             var toPush = {userID : userId, rating : request.body.rating};
            
//             var index = rehabPlan.exercises.findIndex(e=>e._id.toString() == request.params.exercise_id);
//             if (index != -1)
//             {
//                 rehabPlan.exercises[index].rating.push(toPush);
//                 rehabPlan.save(function(error)
//                 {
//                     if (error)
//                     {
//                         response.send({error: error});
//                     }
//                     response.json({updatedUser:rehabPlan})
//                 });

//             }
//         }
       
        
        
        // if (request.body.name != null)
        //     rehabPlan.name = request.body.name;
        // if (request.body.description != null)
        //     rehabPlan.description = request.body.description;
        // if (request.body.authorName != null)
        //     rehabPlan.authorName = request.body.authorName;
        // if (request.body.goal != null)
        //     rehabPlan.goal = request.body.goal;
        // if (request.body.timeFrameToComplete != null)
        //     rehabPlan.timeFrameToComplete = request.body.timeFrameToComplete;
        // if (request.body.complete != null)
        //     rehabPlan.complete = request.body.complete;
        // if (request.body.exercises != null)
        //     rehabPlan.exercises = request.body.exercises;
        // if (request.body.eID != null)
        //     eId = request.body.eID;
        // if (request.body.userID != null)
        //     userId = request.body.userID;
        // if (request.body.rating != null)
        //     {
        //         number = request.body.rating;
        //       // var exercise = new exercises();
        //         for (var i =0; i < rehabPlan.exercises.length; i ++)
        //         {
        //           // exercise = rehabPlan.exercises[i];
        //             if (rehabPlan.exercises[i]._id == eId)
        //             {
        //                 console.log("EID == EID")
        //                 if (rehabPlan.exercises[i].rating.length == 0)
        //                 {
        //                     console.log("IF STATEMENT ")
        //                     console.log("Exercise Name: " + rehabPlan.exercises[i].name);
        //                     rehabPlan.exercises[i].rating.push(toPush);
        //                     console.log("RATINGS ARRAY: " +  rehabPlan.exercises[i].rating);
        //                     break;
        //                 }
        //                 else
        //                 {
        //                     for (var j = 0; j < rehabPlan.exercises[i].rating.length; j++)
        //                     {
        //                         if (rehabPlan.exercises[i].rating[j] == userId)
        //                         {
        //                             rehabPlan.exercises[i].rating[j] =  {userID: userId, rating :request.body.rating};
        //                         }
        //                     }
        //                 }
                        
        //             }
        //             else
        //             {
        //                 console.log("EID != EID ");
        //             }
        //         }
        //     }
            
            
            
        // rehabPlan.save(function(error) {

        //     if (error) {
        //         response.send({ error: error });
        //     }
        //     else 
        //     {
        //         response.send({ updatedUser: rehabPlan });
        //     }
        // });


//     });
// });

router.delete('/:post_id', function(req, response) {
    rehabplans.findByIdAndRemove(req.params.post_id, function(err, deleted) {

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

module.exports=router;