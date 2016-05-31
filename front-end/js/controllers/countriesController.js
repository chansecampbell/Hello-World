angular
  .module('logging')
  .controller('CountriesController', CountriesController);

CountriesController.$inject = ['Country', 'Journey', '$state'];
function CountriesController(Country, Journey, $state) {
  var self            = this;
  self.all            = [];
  self.getCountries   = getCountries;
  self.journeys       = [];
  self.getJourneys    = getJourneys;


  function getCountries() {
    Country.query(function(data){
      self.all = data.countries;
      for (var i = 0; i < self.all.length; i++) {
        console.log(self.all[i].countryCode);
      }
    });
  }

  function getJourneys() {
    Journey.query(function(data){
      self.journeys = data.journeys;
      console.log(self.journeys[0].country.countryCode);
    });
  }

  self.countries = {
    IN:'#33ccff',
    DK:'#33ccff',
    KP:'#33ccff',
    IR:'#33ccff',
    IQ:'#33ccff',
    PK:'#33ccff',
    UZ:'#33ccff',
    TM:'#33ccff',
    EG:'#33ccff',
    AZ:'#33ccff',
    TJ:'#33ccff',
    KG:'#33ccff',
    SY:'#33ccff',
    JO:'#33ccff',
    KZ:'#33ccff',
    LK:'#33ccff',
    US:'#33ccff'
  }

  self.map = 
  $('#world-map').vectorMap({
    map: 'world_mill_en',
   series: {
     regions: [{
       values: self.countries
     }]
   }


   });


}







