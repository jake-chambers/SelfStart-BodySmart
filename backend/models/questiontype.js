var mongoose = require ('mongoose');
var questionTypeSchema = mongoose.Schema (
    {
        name: String
    });

module.exports = mongoose.model('questionType', questionTypeSchema);
