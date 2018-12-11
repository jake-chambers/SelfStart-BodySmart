var mongoose = require ('mongoose');
var countrySchema = mongoose.Schema (
    {
        name: String,
        province: [{
            type: mongoose.Schema.ObjectId, ref: 'province'
        }]
   
    });

module.exports = mongoose.model('country', countrySchema);