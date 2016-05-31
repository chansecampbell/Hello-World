var User   = require('../models/user');

function usersIndex(req, res) {
  User.find()
    .populate("journeys")
    .exec(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ users: users });
  });
}

function usersShow(req, res){
  var id = req.params.id;
  User.findById({ _id: id })
    .populate({
      path: "journeys",
      populate: { path: 'country' } 
    })
    .exec(function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}





function usersUpdate(req, res){
  var id = req.body.user;
  User.findByIdAndUpdate({ _id: id }, req.body.user, { new: true }, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
    res.status(200).send(user);
  });
};

function usersDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'User has been successfully deleted'});
  });
}

module.exports = {
  usersIndex:  usersIndex,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
};
