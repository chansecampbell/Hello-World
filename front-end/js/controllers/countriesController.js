angular
.module('logging')
.controller('CountriesController', CountriesController);

CountriesController.$inject = ['Country', 'Journey', 'User', '$state', 'CurrentUser'];
function CountriesController(Country, Journey, User, $state, CurrentUser) {
  var self            = this;
  self.all            = [];
  self.getCountries   = getCountries;
  self.countries      = [];
  // self.mapOutCountries = mapOutCountries;
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
      for (var i = 0; i < 3; i++ )
        self.countries.push(self.all[0].countries[i].countryCode);
        console.log(self.countries);
         self.map = 
         $('#world-map').vectorMap({
           map: 'world_mill_en',
           zoomButtons : false,
           backgroundColor: '#f5f5f5',
           selectedRegions: self.countries,
           regionStyle: {
            initial: {

              fill: '#757575'
            },
            selected: {
                fill: '#3498db'
              }
          }

        });
    });


  }


  // function mapOutCountries() {
  //   var currentUser = CurrentUser.getUser();
  //   console.log(currentUser);



  // }


  self.getCountries();
  // self.mapOutCountries();
  self.getUsers();
}







