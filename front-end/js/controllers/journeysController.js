angular
  .module('logging')
  .controller('JourneysController', JourneysController);

JourneysController.$inject = ['Journey', '$state', 'CurrentUser'];
function JourneysController(Journey, $state, CurrentUser) {
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
    });
  }

  function updateJourney() {
    if (self.journey._id) {
      Journey.update({ id: self.journey._id }, { journey: self.journey }, function(){
        self.journey = {};
      });
    } else {
      Journey.save({ journey: self.journey }, function(journey) {
        // self.journeys.push(journey);
        self.journey = {};
        self.getJourneys();
      });
    }
  }

  self.getJourneys();

  }