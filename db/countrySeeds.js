var mongoose    = require("mongoose");

var databaseURL = 'mongodb://localhost:27017/hello-world-p4';
mongoose.connect(databaseURL);

var request     = require("request-promise");
var Country     = require("../models/country");



request("http://www.geognos.com/api/en/countries/info/all.json")
  .then(function(response) {
    var response = JSON.parse(response);
    var codes = Object.keys(response.Results);
    for (var i = 0; i < 241; i++) {
      var country = new Country({
        name: response.Results[codes[i]].Name,
        countryCode: codes[i]
      })
      country.save(function(err, country) {
        console.log(country);
      })
    }

  });