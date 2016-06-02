angular
.module('logging')
.controller('JourneysController', JourneysController);

JourneysController.$inject = ['Journey', '$state', 'CurrentUser', 'User', '$stateParams'];
function JourneysController(Journey, $state, CurrentUser, User, $stateParams) {
  var self               = this;
  self.all               = [];
  self.journey           = null;
  self.error             = null;
  self.getJourneys       = getJourneys;
  self.updateJourney     = updateJourney;
  self.journeys = {};

  function getJourneys() {
    Journey.query(function(data){
      self.all = data.journeys;
      console.log(self.all);
      console.log($stateParams);
    });
  }

  function updateJourney() {
    var currentUser = CurrentUser.getUser();
    if (self.journey._id) {
      Journey.update({ id: self.journey._id }, { journey: self.journey, user: currentUser }, function(response){
        console.log(response);
        self.journey = {};
      });
    } else {
      Journey.save({ journey: self.journey, user: currentUser }, function(journey) {
        // self.journeys.push(journey);
        self.journey = {};
        self.getJourneys();
        $state.go("journeys");
      });
    }
  }


  self.getJourneys();

}