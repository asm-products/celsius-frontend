angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('DiscoverCtrl', function ($scope) {
        $scope.polls = [
            {
                poll: 'Best starbucks coffee?',
                id: 1,
                user: "Rajat T",
                image: "https://gravatar.com/avatar/c4e9d538b393049aac29d7af9ead7d0b?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288",
                distance:'75m'
            },
            {
                poll: 'Where are we going for lunch today?',
                id: 2,
                user: "Islam M",
                distance:'100m',
                image: "https://gravatar.com/avatar/fa91c6c945c539edb5de46c28e2600fa?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance:'125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance:'150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance:'500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance:'125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance:'150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance:'500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best starbucks coffee?',
                id: 1,
                user: "Rajat T",
                image: "https://gravatar.com/avatar/c4e9d538b393049aac29d7af9ead7d0b?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288",
                distance:'75m'
            },
            {
                poll: 'Where are we going for lunch today?',
                id: 2,
                user: "Islam M",
                distance:'100m',
                image: "https://gravatar.com/avatar/fa91c6c945c539edb5de46c28e2600fa?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance:'125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance:'150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance:'500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Where is happy hour tonight?',
                id: 3,
                user: "Gisela",
                distance:'125m',
                image: "https://gravatar.com/avatar/17c1063ccdb14ef29e9c36dc3a1384a5?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Best burrito in town?',
                id: 4,
                distance:'150m',
                user: "Buckstar",
                image: "https://gravatar.com/avatar/a03f640ab5a3c37bb53277925403da67?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            },
            {
                poll: 'Fast & furious worth watching?',
                id: 5,
                distance:'500m',
                user: "Anthony A",
                image: "https://gravatar.com/avatar/b87d99b15e2a5bc064e7a0ad44cf1e24?d=https%3A%2F%2Fassembly.com%2Fassets%2Fdefault_avatar.png&s=288"
            }

        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
