var mongoose = require ('mongoose');
var recommendationSchema = mongoose.Schema (
    {
        timeStamp: String,
        decision: String,
    });

module.exports = mongoose.model('recommendation', recommendationSchema);