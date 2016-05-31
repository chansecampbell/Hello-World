var mongoose = require("mongoose");

var journeySchema = mongoose.Schema({

    name: { type: String },
    start: { type: Date },
    end: { type: Date },
    description: { type: String },
    pictures: [{ type: String }],
    country: {type: mongoose.Schema.ObjectId, ref: 'Country'},
    users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Journey", journeySchema);
