angular
  .module('logging', ['angular-jwt', 'ngResource', 'ui.router', 'satellizer', 'ui.bootstrap', 'ngFileUpload'])
  .constant('API', 'http://localhost:3000/api')
  .constant('URL', 'http://localhost:3000')
  .constant('AWS_URL', 'https://s3-eu-west-1.amazonaws.com/wd19-skwap/')
  .config(MainRouter)
  .config(oauthConfig)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('usersEdit', {
      url: "/users/:id/edit",
      templateUrl: "./js/views/users/edit.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('countries', {
      url: "/countries",
      templateUrl: "./js/views/countries/index.html"
    })
    .state('country', {
      url: "/countries/:id",
      templateUrl: "./js/views/countries/show.html",
      controller: function($scope, $stateParams, Country) {
        Country.get({ id: $stateParams.id }, function(res){
          $scope.$parent.countries.country = res.country;
        });
      }
    })
    .state('journeys', {
      url: "/journeys",
      templateUrl: "./js/views/journeys/index.html"
    })
    .state('journeysNew', {
      url: "/journeys/new",
      templateUrl: "./js/views/journeys/new.html"
    })
    .state('journey', {
      url: "/journeys/:id",
      templateUrl: "./js/views/journeys/show.html",
      controller: 'JourneyShowController',
      controllerAs: 'journeyShow'
    });

  $urlRouterProvider.otherwise("/");
}

oauthConfig.$inject = ['API', '$authProvider'];
function oauthConfig(API, $authProvider) {
  $authProvider.facebook({
    url: API + '/auth/facebook',
    clientId: '141789976235702' // replace with your facebook client id
  });
}
