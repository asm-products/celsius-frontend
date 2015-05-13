( function () {

angular.module("starter.controllers")
  .controller("CreatePollCtrl", ['$scope','$http','$stateParams',CreatePollCtrl]);

    function CreatePollCtrl($scope) {
        $scope.data = {};
        $scope.submit= function () {

        };

        $scope.items = [];
        $scope.moveItem = function(item, fromIndex, toIndex) {
            //Move the item in the array
            $scope.items.splice(fromIndex, 1);
            $scope.items.splice(toIndex, 0, item);
        };
        $scope.addOption = function(){
            var timestamp = (new Date()).getTime();
          $scope.items.push({id:timestamp});
        };
        $scope.removeOption = function(index){
            $scope.items.splice(index,1);
        }
    }

})();