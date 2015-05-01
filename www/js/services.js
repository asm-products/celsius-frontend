angular.module('starter.services', [])

.service('AuthService', function($q, $http, API_URL){
  var userInfo;
  var LOCAL_USER_INFO_KEY = 'userInfo';
  var isAuthenticated = false;

  function loadUserCredentials() {
    var info = angular.fromJson(window.localStorage.getItem(LOCAL_USER_INFO_KEY));
    if (info && info.token) {
      useCredentials(info);
    }
  }

  function storeUserCredentials(info) {
    window.localStorage.setItem(LOCAL_USER_INFO_KEY, angular.toJson(info));
    useCredentials(info);
  }

  function useCredentials(info) {
    userInfo = info
    isAuthenticated = true;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = info.token;
  }

  function destroyUserCredentials() {
    userInfo = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_USER_INFO_KEY);
  }

  var loginEmail = function(loginData) {
    return $q(function(resolve, reject) {
      if(loginData.email && loginData.password){
        if(loginData.password_confirmation){
          method = '/signup';
        }else{
          method = '/login';
        }

        //todo add call to login/signup api and store in sessionstorage
        // $http.post(API_URL+method, loginData)
        //   .then(function(result){
        //     userInfo = {
        //       accessToken: result.data.access_token,
        //       user: result.data.user
        //     };

        //     //sessionStore
        //     deferred.resolve(userInfo);
        //   }, function(error){
        //     deferred.reject(error);
        //   });
        storeUserCredentials({token: 'someAccessToken', user: {name: 'Jane Bob'}});
        resolve(userInfo);
      }else
        reject('Login Failed.');
    });
  }

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(resource) {
    //todo add auth checing i.e only poll owner should be able to edit poll
    return isAuthenticated;
  };

  loadUserCredentials();

  return {
    loginEmail: loginEmail,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {
      return isAuthenticated;
    },
    username: function() {
      return (userInfo ? userInfo.user.name : '');
    }
  }
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});