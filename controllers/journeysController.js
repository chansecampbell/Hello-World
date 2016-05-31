var Journey   = require('../models/journey');

function journeysIndex(req, res) {
  Journey.find(function(err, journeys){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ journeys: journeys });
  });
}

function journeysShow(req, res){
  Journey.findById(req.params.id, function(err, journey){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ journey: journey });
  });
}

module.exports = {
  journeysIndex:  journeysIndex,
  journeysShow:   journeysShow
};
