angular
.module('logging')
.controller('JourneysController', JourneysController);

JourneysController.$inject = ['Journey', '$state', 'CurrentUser', 'User', '$stateParams', 'Upload', 'API', 'AWS_URL', 'URL'];
function JourneysController(Journey, $state, CurrentUser, User, $stateParams, Upload, API, AWS_URL, URL) {
  var self               = this;
  self.all               = [];
  self.journey           = null;
  self.error             = null;
  self.getJourneys       = getJourneys;
  self.updateJourney     = updateJourney;
  self.journeys = {};
  self.file = null;
  self.uploadedFile = null;
  self.files = null;
  self.uploadMulti =  uploadMulti;


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

  this.uploadSingle = function() {
    Upload.upload({
      url: URL + '/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      console.log("Success!");
      self.uploadedFile = AWS_URL + res.data.filename;
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  function uploadMulti() {
    console.log("hello");
    Upload.upload({
      url: URL + '/upload/multi',
      arrayKey: '', // IMPORTANT: without this multer will not accept the files
      data: { files: self.files }
    })
    .then(function(res) {
      console.log("Success!");
      self.journey.pictures = res.data.filenames.map(function(filename) {
        return AWS_URL + filename
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  }



  self.getJourneys();

}