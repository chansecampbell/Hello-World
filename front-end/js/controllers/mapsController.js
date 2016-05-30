angular
  .module('logging')
  .controller('MapsController', MapsController);

// MainController.$inject = ['$auth'];
function MapsController(NgMap) {
  
  this.hello = function(){
    console.log('hello!');
  };
}
