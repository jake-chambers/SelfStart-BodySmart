var mongoose = require ('mongoose');
var appointmentSchema = mongoose.Schema (
    {
        clientID: String,
        date: Date,
        location: String,
        describePain:String,
        cause: String,
        dateOfInjury: String,
        description: String,
        ratingNow: String,
        ratingSevenDays: String,
        aggrevation: String,
        easePain: String,
        morningPain: String,
        eveningPain: String,
        otherTreatment: String,
        otherPains: String,
        otherConditions: String,
        explain: String,
        symptoms: String,
        history: String,
        describeHistory: String,
        occupation: String,
        activities: String,
        goals: String,
        image: {data: Buffer, contentType: String},
    });

module.exports = mongoose.model('appointment', appointmentSchema);