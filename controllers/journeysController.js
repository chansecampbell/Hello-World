var Journey   = require('../models/journey');

function journeysIndex(req, res) {
  Journey.find(function(err, journeys){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ journeys: journeys });
  });
}

function journeysShow(req, res){
  var id = req.params.id;
  Journey.findById(req.params.id, function(err, journey){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ journey: journey });
  });
}

// function usersShow(req, res){
//   User.findById({ _id: id }).populate("projects").exec(function(err, user) {
//     if (err) return res.status(500).send(err);
//     if (!user) return res.status(404).send(err);
//     res.status(200).send(user);
//   });
// }


function journeysUpdate(req, res){
  var id = req.body.journey;
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
  journeysShow:   journeysShow,
  journeysUpdate: journeysUpdate,
  journeysDelete: journeysDelete
};
