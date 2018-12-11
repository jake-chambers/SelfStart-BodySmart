var mongoose = require ('mongoose');
var assessmentTestsSchema = mongoose.Schema (
    {
        name: String,
        description: String,
        authorName: String,
        
        assessmentTool: {
            type: mongoose.Schema.ObjectId, ref: 'forms'
        }
    });

module.exports = mongoose.model('assessmenttests', assessmentTestsSchema);
