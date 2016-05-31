var rp = require("request-promise");
var mongoose = require("mongoose");
var Country = require("..models/country");


rp("http://www.geognos.com/api/en/countries/info/all.json")
  .then(function(response) {
    response.Results.each(function(result) {
      var country = new Country({
        name: this.Name,
        countryCode: this. // get key of result using something like Object.keys
      })
      country.save(function(err, country) {
        console.log(country + " saved!");
      })
    })
  })