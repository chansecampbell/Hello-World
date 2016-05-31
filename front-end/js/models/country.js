angular
  .module('logging')
  .factory('Country', Country);

Country.$inject = ['$resource', 'API'];
function Country($resource, API){

  return $resource(
    API+'/countries/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'query':     { method: 'GET', isArray: false}
    }
  );
}
