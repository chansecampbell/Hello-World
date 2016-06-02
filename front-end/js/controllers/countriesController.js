angular
.module('logging')
.controller('CountriesController', CountriesController);

CountriesController.$inject = ['Country', 'Journey', 'User', '$state', 'CurrentUser', 'Upload', 'API', 'AWS_URL', 'URL'];
function CountriesController(Country, Journey, User, $state, CurrentUser, Upload, API, AWS_URL, URL) {
  var self            = this;
  self.users            = [];
  self.countries      = [];
  self.getUsers        = getUsers;
  self.getCountries    = getCountries;
  self.countriesCount = 0;
  self.file = null;
  self.uploadedFile = null;
  self.files = null;
  self.uploadSingle = uploadSingle;


  function getCountries() {
    Country.query(function(data){
      self.all = data.countries;
    });
  }

  function getUsers() {
    self.users       = [];
    self.countries = [];
    User.query(function(data){
      self.users = data.users
      self.currentUser = CurrentUser.getUser();
      for (var j = 0; j < self.users.length; j++){
        if (self.users[j].firstName == self.currentUser.firstName ) {
          for (var i = 0; i < self.users[j].countries.length; i++ ) {
          console.log(self.users[j].countries);
          self.countriesCount = self.users[j].countries.length;
          self.countries.push(self.users[j].countries[i].countryCode);
        }
          $('#world-map').vectorMap({
                     map: 'world_mill_en',
                     zoomButtons : false,
                     backgroundColor: '#f5f5f5',
                     selectedRegions: self.countries,
                     regionStyle: {
                      initial: {
                        fill: '#616161'
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

  function uploadSingle() {
    Upload.upload({
      url: URL + '/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      console.log("Success!");
      self.user.picture = AWS_URL + res.data.filename;
    })
    .catch(function(err) {
      console.error(err);
    });
  }
 

  // self.getCountries();
  self.getUsers();
}







