angular
.module('logging')
.controller('CountriesController', CountriesController);

CountriesController.$inject = ['Country', 'Journey', 'User', '$state', 'CurrentUser'];
function CountriesController(Country, Journey, User, $state, CurrentUser) {
  var self            = this;
  self.all            = [];
  self.getCountries   = getCountries;
  self.countries      = {};
  self.mapOutCountries = mapOutCountries;
  self.getUsers        = getUsers;


  function getCountries(country) {
    Country.query(function(data){
      self.all = data.countries;
      // for (var i = 0; i < self.all.length; i++) {
      //   // console.log(self.all[i].countryCode);
      // }
      // console.log(data.countries[0].name);
      // console.log(data.countries[0].countryCode);
     // return self.all.map(function(country) {
     //  return country.name;
    });
  }

  function getUsers() {
    User.query(function(data){
      self.all = data.users
      // for (var i = 0; i < 3; i++ )
      // self.countries = {
      //   self.all[0].countries[i].countryCode: '#3498db',
      // }
      // console.log(self.countries);
    });
  }


  function mapOutCountries() {
    var currentUser = CurrentUser.getUser();
    console.log(currentUser);

     self.colour = '#3498db';

     self.countries["GB"] = self.colour;


     self.map = 
     $('#world-map').vectorMap({
       map: 'world_mill_en',
       zoomButtons : false,
       backgroundColor: '#f5f5f5',
       selectedRegions: ['GB', 'JP'],
       regionStyle: {
        initial: {

          fill: '#757575'
        }
      

      //   ,
      //   hover: {
      //     fill: "#d3d3d3"
      //   }
      // },
      // series: {
      //   regions: {[
      //   'GB'
      // ]},
      //   {
      //   values: '#3498db'
      //   }
      }

    });

  }


  // self.countries = {
  //   IN:'#33ccff',
  //   DK:'#33ccff',
  //   KP:'#33ccff',
  //   IR:'#33ccff',
  //   IQ:'#33ccff',
  //   PK:'#33ccff',
  //   UZ:'#33ccff',
  //   TM:'#33ccff',
  //   EG:'#33ccff',
  //   AZ:'#33ccff',
  //   TJ:'#33ccff',
  //   KG:'#33ccff',
  //   SY:'#33ccff',
  //   JO:'#33ccff',
  //   KZ:'#33ccff',
  //   LK:'#33ccff',
  //   US:'#33ccff'
  // }

  self.getCountries();
  self.mapOutCountries();
  self.getUsers();
}







