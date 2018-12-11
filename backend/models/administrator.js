var mongoose = require ('mongoose');
var selfstartuser = require('./selfstartuser'); 
var options = { discriminatorKey: 'kind' };
var administrator = selfstartuser.discriminator('administratorSchema', 
    new mongoose.Schema({
        dateHired: String,
        dateFinished: String 
    },options)
    );
    module.exports = administrator;