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

  //todo add/save to user profile after registering
  return {
    getData: function(){
      return authData;
    },
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

.factory('PollFactory', ['$q', '$firebaseObject', '$firebaseArray', 'AuthService', 'FIREBASE_URL', function($q, $firebaseObject, $firebaseArray, AuthService, FIREBASE_URL){

  var ref = new Firebase(FIREBASE_URL+'/polls');

  var Poll = function(){
    this.title = '';
    this.range = 100;
    this.answers = [];
  }

  Poll.prototype.save = function(){

  }

  return {
    newPoll: function(){
      return new Poll();
    },
    all: function(){

    },
    save: function(polls){
    },
    create: function(poll){
      return $q(function(resolve, reject) {
        if(AuthService.isAuthenticated()){
          poll.owner_id = AuthService.getData().uid;
          pollId = $firebaseArray(ref).$add(poll).then(function(ref){
            resolve($firebaseObject(ref));
          }, function(error){
            reject(error);
          })

          //TODO use UserProfile service to add this poll to user's list of polls
        }else
          reject('Not logged in.');
      });
    }
  }
}])

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