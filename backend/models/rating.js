var mongoose = require ('mongoose');
var ratingSchema = mongoose.Schema (
    {
 
           uID: String,
           eName: String,
           rating: Number
       
    });

module.exports = mongoose.model('rating', ratingSchema);