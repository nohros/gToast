angular
  .module('gToastExample', [
    'gToast'
  ])

  .controller('MainCtrl', function MainCtrl($scope, gToast) {
    $scope.showToast = function(message) {
      gToast.open(message, {theme: "gtoast-default-theme"});
    };
  });