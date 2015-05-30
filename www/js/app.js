// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.directives', 'starter.services', 'firebase'])

.constant('API_URL', 'https://cors-test.appspot.com/')
.constant('FIREBASE_URL', 'https://pollo.firebaseio.com/')
// .constant('AUTH_EVENTS', {
//   notAuthenticated: 'auth-not-authenticated',
//   notAuthorized: 'auth-not-authorized'
// })
.run(function($ionicPlatform, $rootScope, $state, AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //stateChange event
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      //todo add resource authorization check i.e only poll creator should be able to edit polls

      if (toState.name !== 'app.login' && toState.authRequired && !AuthService.isAuthenticated()){ //Assuming the AuthService holds authentication logic
        // User isn’t authenticated
        event.preventDefault(); 
        $state.transitionTo("app.login");
      }
    });
  });
})

//For each state that requires login, add `authRequired: true`
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

  .state('app.discover', {
    url: "/polls/list",
    views: {
      'menuContent': {
        templateUrl: "templates/discover.html",
        controller: 'DiscoverCtrl'
      }
    }
  })

  .state('app.createPoll', {
    url: "/polls/create",
    views: {
      'menuContent': {
        templateUrl: "templates/createPoll.html",
        controller: 'CreatePollCtrl'
      }
    },
    resolve: {
      poll: ['PollFactory', function(PollFactory){
        return PollFactory.newPoll();
      }]
    },
    authRequired: true
  })

  .state('app.showPoll', {
    url: "/polls/:pollId",
    views: {
      'menuContent': {
        templateUrl: "templates/showPoll.html",
        controller: 'ShowPollCtrl'
      }
    },
    resolve: {
      poll: ['PollFactory', function(PollFactory){
        return {
          poll: 'Where is happy hour tonight?',
          options: ['FarSide', 'NearSide', 'Hometown' ]
        }
      }]
    },
    authRequired: true
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/polls/list');
});
