angular
  .module('logging')
  .controller('MapsController', MapsController);

function MapsController(NgMap) {

  this.hello = function(){
    console.log('hello!');
  };
}
