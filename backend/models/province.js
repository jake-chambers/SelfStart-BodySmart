var mongoose = require ('mongoose');
var provinceSchema = mongoose.Schema (
    {
        name: String,
        city: [{
            type: mongoose.Schema.ObjectId, ref: 'city'
        }]
   
    });


module.exports = mongoose.model('province', provinceSchema);