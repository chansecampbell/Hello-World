var Country   = require('../models/country');

function countriesIndex(req, res) {
  Country.find({}, function(err, countries){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    console.log(countries);
    res.status(200).json({ countries: countries });
  });
}

function countriesShow(req, res){
  Country.findById(req.params.id, function(err, country){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ country: country });
  });
}

function countriesSearch(req, res){
  var string = titleCase(req.body.query);
  Country.find({ name: { $regex : ".*" + string + ".*" }}, function(err, countries) {
    if (err) return res.status(500).json(err);
    res.status(200).json(countries);
  })
}

function titleCase(str) {
  var newstr = str.split(" ");
  for(i=0;i<newstr.length;i++){
    var copy = newstr[i].substring(1).toLowerCase();
    newstr[i] = newstr[i][0].toUpperCase() + copy;
  }
   newstr = newstr.join(" ");
   return newstr;
}  

module.exports = {
  countriesIndex:  countriesIndex,
  countriesShow:   countriesShow,
  countriesSearch: countriesSearch
};
