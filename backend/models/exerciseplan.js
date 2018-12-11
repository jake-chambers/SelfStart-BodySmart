var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ExercisePlanSchema = new Schema ({
        name: String,
        description: String,
        authorName: String,
        objectives: String,
        actionSteps: String,
        location: String,
        frequency: String,
        duration: String,
        multimediaURL: String,
        rating: [Number],
    });

module.exports = mongoose.model('ExercisePlan', ExercisePlanSchema);