var mongoose = require("mongoose");

var countrySchema = mongoose.Schema({

    name: { type: String },
    picture: { type: String },
    countryCode: { type: String },
    journeys: [{type: mongoose.Schema.ObjectId, ref: 'Journey'}],
    users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Country", countrySchema);
