const express= require("express");
const router=express.Router();
var ratingModel = require('../models/rating');

router.route('/')

.get(function (request, response) 
    {
        ratingModel.find(function (error, ratings)
        {
            if (error) response.send(error);
            response.json({ratings: ratings});
        });
})

.post(function (request, response)
{
    var ratingP = new ratingModel();
    ratingP.rating = request.body.rating;
    ratingP.eName = request.body.eName;
    ratingP.uID = request.body.uID;
    
    ratingP.save(function (error)
    {
        if (error) response.send(error);
        response.json({ratingPost: ratingP});
    });
});

router.route('/:u_id/:e_name/')

.get(function (request, response) 
{
    ratingModel.find({ "uID" : request.params.u_id, "eName" : request.params.e_name}, function (error, rating) 
    {
    if (error) 
    {
        response.send({error: error});
    }
    else 
    {
        response.json({ratingByID: rating});
    }
    });

    // ratingModel.findById(request.params.post_id, function (error, rating) 
    // {
    // if (error) 
    // {
    //     response.send({error: error});
    // }
    // else 
    // {
    //     response.json({ratingByID: rating});
    // }
    // });
})
.put(function (request, response) 
{   
    // ratingModel.find({ "uID" : request.params.u_id, "eName" : request.params.e_name}, function (error, foundRating) 
    // {
    // if (error) 
    // {
    //     response.send({error: error});   
    // }
    // else
    // {
    //     foundRating.rating = request.body.rating;
    //     foundRating.eName = request.body.eName;
    //     foundRating.uID = request.body.uID;
                    
    //     foundRating.save(function (error) 
    //     {
    //     if (error) 
    //     {
    //         response.send({error: error});
    //     }
    //     else 
    //     {
    //         response.json({updatedRating: foundRating});
    //     }
    //     });
    // }
    // });
    // ratingModel.findById(request.params.post_id, function (error, rating) 
    // {
    //     if (error) 
    //     {
    //         response.send({error: error});
    //     }
    //     else
    //     {
    //         if (request.body.rating != null)
    //             rating.rating = request.body.rating;
    //         if (request.body.eName != null)
    //             rating.eName = request.body.eName;
    //         if (request.body.uID != null)
    //             rating.uID = request.body.uID
                
    //         rating.save(function (error) 
    //         {
    //             if (error) 
    //             {
    //               response.send({error: error});
    //             }
    //             else 
    //             {
    //                 response.json({updatedRating: rating});
    //             }
    //         });
    //     }
    // });
})


router.route('/:post_id/')
.delete(function (request, response) 
{
    ratingModel.findByIdAndRemove(request.params.post_id,
    function (error, deleted)
    {
        if (!error) 
        {
            response.json({ratingById: deleted});
        }
    });
})

.put(function (request, response) 
{
    ratingModel.findById(request.params.post_id, function (error, rating) 
    {
        if (error) 
        {
            response.send({error: error});
        }
        else
        {
            if (request.body.rating != null)
                rating.rating = request.body.rating;
            if (request.body.eName != null)
                rating.eName = request.body.eName;
            if (request.body.uID != null)
                rating.uID = request.body.uID
                
            rating.save(function (error) 
            {
                if (error) 
                {
                  response.send({error: error});
                }
                else 
                {
                    response.json({updatedRating: rating});
                }
            });
        }
    });
})


module.exports = router;