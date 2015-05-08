angular.module('starter.services', ['firebase'])

.service('AuthService', function($q, $firebaseAuth, FIREBASE_URL){
  var ref = new Firebase(FIREBASE_URL);
  var Auth = $firebaseAuth(ref);
  var authData;

  function ucfirst (str) {
    // inspired by: http://kevin.vanzonneveld.net
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
  }
  function firstPartOfEmail(email) {
    return ucfirst(email.substr(0, email.indexOf('@'))||'');
  }

  function loginEmail(loginData, resolve, reject){
    Auth.$authWithPassword({email: loginData.email, password: loginData.password})
      .then(function(user){
        user.username = firstPartOfEmail(user.password.email);
        resolve(user);
      })
      .catch(function(error){
        reject(error);
      });
  }

  var authEmail = function(loginData) {
    return $q(function(resolve, reject) {
      if(loginData.email && loginData.password){
        if(loginData.password_confirmation){
          Auth.$createUser({email: loginData.email, password: loginData.password})
            .then(function(user){
              loginEmail(loginData, resolve, reject);
            })
            .catch(function(error){
              reject(error);
            });
        }else{
          loginEmail(loginData, resolve, reject);
        }
      }else
        reject('Login Failed.');
    });
  }

  var logout = function() {
    Auth.$unauth();
  };

  var isAuthorized = function(resource) {
    //todo add auth checking i.e only poll owner should be able to edit poll
    return isAuthenticated;
  };

  Auth.$onAuth(function(data){
    authData = data;
  });

  return {
    authEmail: authEmail,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {
      return authData != null;
    },
    username: function() {
      return (authData ? firstPartOfEmail(authData.password.email) : '');
    }
  }
})

// .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
//   return {
//     responseError: function (response) {
//       $rootScope.$broadcast({
//         401: AUTH_EVENTS.notAuthenticated,
//         403: AUTH_EVENTS.notAuthorized
//       }[response.status], response);
//       return $q.reject(response);
//     }
//   };
// })
 
// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('AuthInterceptor');
// });