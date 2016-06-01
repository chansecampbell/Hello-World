var mongoose    = require("mongoose");

var databaseURL = 'mongodb://localhost:27017/hello-world-p4';
mongoose.connect(databaseURL);

var request     = require("request-promise");
var Country     = require("..models/country");



request("http://www.geognos.com/api/en/countries/info/all.json")
  .then(function(response) {
    response.Results.each(function(result) {
      var country = new Country({
        name: country.name
        // countryCode: this. // get key of result using something like Object.keys
      })
      country.save(function(err, country) {
        console.log(country + " saved!");
      })

    })
  })