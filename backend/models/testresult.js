var mongoose = require ('mongoose');
var testResultSchema = mongoose.Schema (
    {
        question: String,
        answer: String,
       
        test: {
            type: mongoose.Schema.ObjectId, ref: 'assessmenttests'
        }
    });

module.exports = mongoose.model('testresult', testResultSchema);