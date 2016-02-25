var validationApp = angular.module('WizardApp', [])

validationApp.controller('WizardController', ['$scope', '$sce', '$http', function($scope, $sce, $http){

  $scope.showValidation = false;
  $scope.countryslist = [];
  $scope.newUser={};

  $scope.regExp = {
        email: /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
      };

  $http.get('data/countries.json').success(function(data) {
        $scope.countryslist = data;
  });

  $scope.$watch('validForm.$valid', function(newVal) {
      $scope.valid = newVal;
  });

  $scope.update = function(userDetails,Stage) {
    
    if ($scope.valid) {
      $scope.selection = Stage;
      $scope.showValidation = false;
      if (nextStage=="stage3"){
        alert("Form sent");
        console.log(userDetails);
        // tto
        // push user detalist to server
      }
    }else{
      $scope.showValidation = true;
    }
  }

 $scope.backTo = function(stage) {
    $scope.selection = stage;
  };

  $scope.getError = function (error) {
    if (angular.isDefined(error)) {
      if (error.required) {
        return $sce.trustAsHtml('<p class="bg-danger arrow">Error message</p>');
      } else if (error.pattern) {
        return $sce.trustAsHtml('<p class="bg-danger arrow">Please enter a valid e-mail address</p>');
      }else if (error.mismatch) {
        return $sce.trustAsHtml('<p class="bg-danger arrow">Password and Confirm Password must match</p>');
      }
    }
  }

}]);

validationApp.directive('match', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
      });
    }
  };
});
