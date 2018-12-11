var mongoose = require ('mongoose');

class exercisesSchema extends mongoose.Schema
{
    constructor ()
    {
        super
        ({
            name: String,
            description: String,
            authorName: String,
            objectives: String,
            actionSteps: String,
            location: String,
            frequency: String,
            duration: String,
            multimediaURL: String,
            rating: [{userID: String, rating : Number}]
        })
    }
}

//export default mongoose.model('manageexercises', new exercisesSchema) <-- thats where the error is
module.exports =  mongoose.model('manageexercises', new exercisesSchema)

// var exercisesSchema = mongoose.Schema (
//     {
//         name: String,
//         description: String,
//         authorName: String,
//         objectives: String,
//         actionSteps: String,
//         location: String,
//         frequency: Number,
//         duration: Number,
//         targetDate: Date,
//         multimediaURL: String
//     });

//module.exports = mongoose.model('manageexercises', exercisesSchema);

