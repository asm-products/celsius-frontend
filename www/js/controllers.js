angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $ionicHistory, $state, AuthService, AUTH_EVENTS) {
        $scope.username = AuthService.username();
         
        $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
            var alertPopup = $ionicPopup.alert({
              title: 'Unauthorized!',
              template: 'You are not allowed to access this resource.'
            });
        });

        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            AuthService.logout();
            $state.go('login');
            var alertPopup = $ionicPopup.alert({
                title: 'Session Lost!',
                template: 'Sorry, You have to login again.'
            });
        });

        $scope.setCurrentUsername = function(name) {
            $scope.username = name;
        };

        $scope.logout = function(){
            AuthService.logout();
            $scope.setCurrentUsername(undefined);
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('app.discover', {}, {reload: true, location: 'replace'});
        }
    })

    .controller('LoginCtrl',function ($scope, $ionicModal, $ionicHistory, $ionicPopup, $state, AuthService) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope.openModal;
        $scope.isLoggingIn = true;

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login_email.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.emailModal = modal;  
        });

        // Triggered in the login modal to close it
        $scope.closeModal = function () {
            $scope.openModal.hide();
        };

        // Open the login modal
        $scope.openEmailLogin = function () {
            $scope.openModal = $scope.emailModal;
            $scope.emailModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doEmailLogin = function (isValid) {
            console.log('Doing login', $scope.loginData);
            if(!isValid)
                return;

            AuthService.loginEmail($scope.loginData)
                .then(function(data){
                    //todo go to previous state

                    $scope.closeModal();
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                    $state.go('app.discover', {}, {reload: true, location: "replace"});
                    $scope.setCurrentUsername(data.user.name);
                }
                ,function(error){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                });
        };
    })

    .controller('DiscoverCtrl', ['$scope', '$cordovaKeyboard','$timeout', '$ionicScrollDelegate', function ($scope, $cordovaKeyboard,$timeout, $ionicScrollDelegate) {
        var contentViewDelegate = $ionicScrollDelegate.$getByHandle('poll-list');
        var lastScrollPositionY = 0;

        function contentIsScrollingUp(currentPosition) {

            return currentPosition <= 0 ? false : (lastScrollPositionY - currentPosition > 0);
        }

        function contentIsScrollingDown(currentPosition) {
            return currentPosition <= 0 ? false : (lastScrollPositionY - currentPosition < 0);
        }


        function getScrollPositionY() {
            return contentViewDelegate ? contentViewDelegate.getScrollPosition().top : 0;
        }

        function setAddPollButtonHidden(hidden) {
            $timeout(function(){
                $scope.isAddButtonHidden = hidden;
            },0);
        };

        function updateAddPollButton() {
            var thisPosition = getScrollPositionY();
            if (contentIsScrollingUp(thisPosition)) {
                setAddPollButtonHidden(false);
            } else if (contentIsScrollingDown(thisPosition)) {
                setAddPollButtonHidden(true);
            }
            lastScrollPositionY = thisPosition;
        }

        $scope.scrolling = function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                $cordovaKeyboard.close();
            }
            updateAddPollButton();
        };
        $scope.polls = [
            {
                poll: 'Best starbucks coffee?',
                id: 1,
                user: "Rajat T",
                image: "https://gravatar.com/avatar/c4e9d538b393049aac29d7af9ead7d0b?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288",
                distance: '75m'
            },
            {
                poll: 'Where are we going for lunch today,haan tell me where,just tell me yaar?',
                id: 2,
                user: "Islam M",
                distance: '100m',
                image: "https://gravatar.com/avatar/fa91c6c945c539edb5de46c28e2600fa?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance: '125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance: '150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance: '500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance: '125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance: '150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance: '500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best starbucks coffee?',
                id: 1,
                user: "Rajat T",
                image: "https://gravatar.com/avatar/c4e9d538b393049aac29d7af9ead7d0b?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288",
                distance: '75m'
            },
            {
                poll: 'Where are we going for lunch today?',
                id: 2,
                user: "Islam M",
                distance: '100m',
                image: "https://gravatar.com/avatar/fa91c6c945c539edb5de46c28e2600fa?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance: '125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance: '150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance: '500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance: '125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance: '150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance: '500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            }

        ];
    }])

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
