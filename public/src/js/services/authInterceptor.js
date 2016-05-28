angular
  .module('logging')
  .factory('authInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['URL', 'TokenService'];
function AuthInterceptor(URL, TokenService) {

  return {
    request: function(config) {
    var token = TokenService.getToken();

    if (config.url.indexOf(URL) === 0 && token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
    response: function(res){
      console.log(res);

      if (res.config.url.indexOf(URL) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
