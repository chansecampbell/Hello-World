angular
.module('logging')
.controller('JourneyShowController', JourneyShowController);

JourneyShowController.$inject = ['Journey', '$stateParams'];
function JourneyShowController(Journey, $stateParams) {
  self.journey = {};
  self.getJourney = getJourney;

  function getJourney() {
    Journey.get({ id: $stateParams.id}, function(response) {
      return self.journey = response.journey;
    })
  }

  getJourney();
  return self;
}