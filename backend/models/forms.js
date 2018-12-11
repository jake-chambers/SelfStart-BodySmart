var mongoose = require ('mongoose');
var formsSchema = mongoose.Schema (
    {
        name: String,
        description: String,
        author: {
            type: mongoose.Schema.ObjectId, ref: 'administrator'
        },
        
        questions: [{
            questionText: String,
            helpDescription: String,
            order: String,
            questiontype: String,
            answer: String}]
    });

module.exports = mongoose.model('forms', formsSchema);
