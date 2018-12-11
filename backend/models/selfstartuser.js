var mongoose = require ('mongoose');
var options = { discriminatorKey: 'kind' };
var selfStartUserSchema = mongoose.Schema (
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        account: {
            type: mongoose.Schema.ObjectId, ref: 'useraccount'
        }
    },options);
    
module.exports = mongoose.model('selfstartuser', selfStartUserSchema);