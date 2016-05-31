angular
  .module('logging')
  .factory('Journey', Journey);

Journey.$inject = ['$resource', 'API'];
function Journey($resource, API){

  return $resource(
    API+'/journeys/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: false},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' },
  'update':    { method: 'PUT' }
}
  );
}
