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

module.exports = {
  countriesIndex:  countriesIndex,
  countriesShow:   countriesShow
};
