angular
  .module('logging')
  .controller('UsersController', UsersController);

  UsersController.$inject = ['User', 'CurrentUser', '$state', '$auth'];
  function UsersController(User, CurrentUser, $state, $auth){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  // self.showUser      = showUser;
  self.updateUser    = updateUser;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.checkToSee    = checkToSee;

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function checkToSee(){
    self.currentUser = CurrentUser.getUser();
      console.log(self.currentUser.name);
    }

  // function showUser(user){
  //   User.get({id: user._id}, function(user){
  //     console.log('user: ', user)
  //     self.user = user;
  //   });
  // }

  function updateUser() {
      User.update({ id: self.user._id }, { user: self.user }, function(data){
        console.log('data: ', data)
        self.user = data;
      });
      self.currentUser = CurrentUser.getUser();
      self.getUsers();
    } 


  self.authenticate = function(provider) {
    $auth.authenticate(provider);
    self.currentUser = CurrentUser.getUser();
    self.getUsers();
    $state.go("home");
  };


  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('home');
    }
    self.currentUser = CurrentUser.getUser();
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}
