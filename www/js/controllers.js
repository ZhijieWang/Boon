angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('DealsCtrl', function($scope, Deals, $ionicSlideBoxDelegate ) {
  $scope.deals = Deals.all();
   $ionicSlideBoxDelegate.update();
})

.controller('DealDetailCtrl', function($scope, $stateParams, Deals) {
  $scope.deal = Deals.get($stateParams.dealId);
})
