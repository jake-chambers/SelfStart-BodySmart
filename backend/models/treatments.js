var mongoose = require ('mongoose');
var treatmentsSchema = mongoose.Schema (
    {
        dateAssign: String,
        response: [{
            type: mongoose.Schema.ObjectId, ref: 'recommendation'
        }],
        physio: {type: mongoose.Schema.ObjectId, ref: 'physiotherapist'}
    });

module.exports = mongoose.model('treatments', treatmentsSchema);