angular
.module('logging')
.controller('CountriesController', CountriesController);

CountriesController.$inject = ['Country', 'Journey', 'User', '$state', 'CurrentUser'];
function CountriesController(Country, Journey, User, $state, CurrentUser) {
  var self            = this;
  self.users            = [];
  self.countries      = [];
  self.getUsers        = getUsers;
  // self.getCountries   = getCountries;
  // self.mapOutCountries = mapOutCountries;


  // function getCountries(country) {
  //   Country.query(function(data){
  //     self.all = data.countries;
  //   });
  // }

  function getUsers() {
    self.users       = [];
    self.countries = [];
    User.query(function(data){
      self.users = data.users
      self.currentUser = CurrentUser.getUser();
      for (var j = 0; j < self.users.length; j++){
        if (self.users[j].name == self.currentUser.name ) {
          for (var i = 0; i < self.users[j].countries.length; i++ ) {
          console.log(self.users[j].countries);
          self.countries.push(self.users[j].countries[i].countryCode);
        }
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

        }
      }
    })
  }

      // for (var i = 0; i < self.users[0].countries.length; i++ ) {
      //   self.countries.push(self.users[0].countries[i].countryCode);
      //   console.log(self.countries);
      //    self.map = 
            //  }
 

  // self.getCountries();
  self.getUsers();
}







