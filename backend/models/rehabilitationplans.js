var mongoose = require ('mongoose');
var rehabilitationplansSchema = mongoose.Schema (
    {
        name: String,
        description: String,
        authorName: String,
        goal: String,
        timeFrameToComplete: String,
        complete: Boolean,
        
        exercises: [],
    });

module.exports = mongoose.model('rehabilitationplans', rehabilitationplansSchema);