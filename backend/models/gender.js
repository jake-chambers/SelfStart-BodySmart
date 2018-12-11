var mongoose = require ('mongoose');
var genderSchema = mongoose.Schema (
    {
        name: String,
    });

module.exports = mongoose.model('gender', genderSchema);