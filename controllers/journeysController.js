var Journey   = require('../models/journey');

function journeysIndex(req, res) {
  Journey.find()
  .populate("users")
  .populate("country")
  .exec(function(err, journeys){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ journeys: journeys });
  });
}

function journeysCreate(req, res){
  var journey = new Journey(req.body.journey);
  journey.users = [req.body.user._id];
  journey.save(function(err, journey) {
    if (err) return res.status(500).send(err);
    res.status(201).send(journey);
  });
}

function journeysShow(req, res){
  var id = req.params.id;
  Journey.findById({ _id: id })
  .populate("users")
  .populate("country")
  .exec(function(err, journey){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ journey: journey });
  });
}

function journeysUpdate(req, res){
  var id = req.body.journey;
  req.body.journey.users = [req.body.user._id];
  Journey.findByIdAndUpdate({ _id: id }, req.body.journey, { new: true }, function(err, journey){
    if (err) return res.status(500).send(err);
    if (!journey) return res.status(404).send(err);
    res.status(200).send(journey);
  });
};

function journeysDelete(req, res){
  Journey.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Journey has been successfully deleted'});
 });
}


module.exports = {
  journeysIndex:  journeysIndex,
  journeysCreate: journeysCreate,
  journeysShow:   journeysShow,
  journeysUpdate: journeysUpdate,
  journeysDelete: journeysDelete
};
