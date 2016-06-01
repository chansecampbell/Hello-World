var mongoose = require("mongoose");

var countrySchema = mongoose.Schema({
  name: { type: String },
  countryCode: { type: String }
});

module.exports = mongoose.model("Country", countrySchema);
