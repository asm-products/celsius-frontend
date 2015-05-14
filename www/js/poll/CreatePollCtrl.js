( function () {

angular.module("starter.controllers")
  .controller("CreatePollCtrl", ['$scope', '$ionicPopup', '$ionicLoading', 'PollFactory', 'poll', CreatePollCtrl]);

    function CreatePollCtrl($scope, $ionicPopup, $ionicLoading, PollFactory, poll) {
        $scope.data = {
            getRangeValue: function(range){
                rangeValue = 0;
                switch(range){
                    case 300:
                        rangeValue = 1;
                        break;
                    case 500: 
                        rangeValue = 2;
                        break;
                    case 700:
                        rangeValue = 3;
                        break;
                    case 1000:
                        rangeValue = 4;
                        break;
                }
                return rangeValue;
            },
            //todo convert distance range (0-4) to actual distance
            setRangeValue: function(rangeValue){
                range = 100;
                switch(parseInt(rangeValue)){
                    case 1:
                        range = 300;
                        break;
                    case 2: 
                        range = 500;
                        break;
                    case 3:
                        range = 700;
                        break;
                    case 4:
                        range = 1000;
                        break;
                }
                return range;        

            },
            rangeValue: function(range){
                return arguments.length ? poll.range = this.setRangeValue(range) : this.getRangeValue(poll.range);
            }
        };
        $scope.poll = poll;
        $scope.submit= function (isValid) {
            if(!isValid)
                return;

            $ionicLoading.show({
                template: 'Creating poll...'
            });

            PollFactory.create($scope.poll).then(function(poll){
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Poll created!'
                });
            }, function(error){
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'Poll creation failed!',
                    template: error.message
                });
            });
        };

        $scope.items = [];
        $scope.moveItem = function(item, fromIndex, toIndex) {
            //Move the item in the array
            $scope.poll.answers.splice(fromIndex, 1);
            $scope.poll.answers.splice(toIndex, 0, item);
        };

        $scope.addOption = function(){
            var timestamp = (new Date()).getTime();
            $scope.poll.answers.push({id: timestamp});
        };

        $scope.removeOption = function(index){
            $scope.poll.answers.splice(index,1);
        };
    }
})();