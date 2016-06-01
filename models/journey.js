var mongoose = require("mongoose");

var journeySchema = mongoose.Schema({

    country: {type: mongoose.Schema.ObjectId, ref: 'Country'},
    start: { type: Date },
    end: { type: Date },
    description: { type: String },
    pictures: [{ type: String }],
    users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Journey", journeySchema);
