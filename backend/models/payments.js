var mongoose = require ('mongoose');
var paymentsSchema = mongoose.Schema (
    {
        paymentID: String,
        dayTimeStamp: String,
        amount: String,
        note: String
    
    });

module.exports = mongoose.model('payments', paymentsSchema);