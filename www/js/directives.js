angular.module("starter.directives", [])

.directive("compareTo", function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue === scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  }
})

.directive('polloRangeSetter', function(){
  return{
    require: "ngModel",
    scope: {
      poll: '=poll'
    },
    templateUrl: 'pollDistanceSetter.html',
    link: function(scope, element, attributes, ngModel){
      // ngModel.$validators.validRange = function(modelValue){
      //   return (100 <= modelValue && modelValue <= 1000); 
      // }
      // scope.$watch("poll.distance", function(){
      //   ngModel.$validate()
      // })
    }
  }
})