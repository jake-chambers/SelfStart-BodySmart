var mongoose = require ('mongoose');
var userAccountSchema = mongoose.Schema (
    {
        userAccountName: String,
        encryptedPassword: String,
        isAdmin: Boolean
    });

module.exports = mongoose.model('useraccount', userAccountSchema);