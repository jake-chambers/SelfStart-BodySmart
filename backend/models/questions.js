var mongoose = require ('mongoose');
var questionsSchema = mongoose.Schema (
    {
        questionText: String,
        helpDescription: String,
        order: String,
        answer: String,
        questiontype: 
        {
            type: mongoose.Schema.ObjectId, ref: 'questiontype'
        }
    });

module.exports = mongoose.model('questions', questionsSchema);

