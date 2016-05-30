var mongoose = require("mongoose");

var countrySchema = mongoose.Schema({

    name: { type: String },
    picture: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    journeys: [{type: mongoose.Schema.ObjectId, ref: 'Journey'}],
    users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Country", countrySchema);
