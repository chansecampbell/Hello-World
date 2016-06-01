var mongoose = require("mongoose");

var countrySchema = mongoose.Schema({
  name: { type: String },
  countryCode: { type: String }
});

countrySchema.index({ name: "text"});


module.exports = mongoose.model("Country", countrySchema);
