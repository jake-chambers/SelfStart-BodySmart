var mongoose = require ('mongoose');
var selfstartuser = require('./selfstartuser'); 
var options = { discriminatorKey: 'kind' };
var physiotherapist = selfstartuser.discriminator('physiotherapistSchema', 
    new mongoose.Schema({
        dateHired: String,
        dateFinished: String 
    },options)
);
    
module.exports = physiotherapist;