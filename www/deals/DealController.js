/**
 * Created by adnankhan on 2/21/15.
 */
angular.module('boon.controllers', [])

    // TODO: record time when user enters swipes
    .controller('DealsCtrl',[ '$scope','$ionicModal','dealsService','dealCacheService', 'BusinessService', function($scope ,$ionicModal,dealsService,dealCacheService,BusinessService) {
    $scope.coords = {};
    $scope.deals = [];

    $ionicModal.fromTemplateUrl('deals/deal-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
    });

    $scope.openModal = function() {


        $scope.modalBus = BusinessService.getBusinessById($scope.deals[0].shopId);

        $scope.modal.show()
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // Placeholder function, since card is destroyed after being swiped the
    // placeholder will never execute
    $scope.cardExitAction= function(currentDeal) {};
        $scope.showDeals = function() {
            $scope.deals = dealsService.getDeals();
            return $scope.deals;
        };

    // Reject button acts as if the card were swiped left
    $scope.rejectButton = function() {

        if ($scope.deals.length > 0) {
            $scope.cardExitAction = $scope.cardSwipedLeft;
            var tempDeal = $scope.deals.shift();
            $scope.cardExitAction(tempDeal);
        }
    };

    // Accept button acts as if card were swiped right
    $scope.acceptButton = function() {
        if ($scope.deals.length > 0) {
            $scope.cardExitAction = $scope.cardSwipedRight;
            var tempDeal = $scope.deals.shift();
            $scope.cardExitAction(tempDeal);
        }
    };
    /*
     Adds deal to stash
     TODO: log timing of accepting deal and send data to server in format:
     w/ dealID and time of swipe, also send the current geolocation

     */
    $scope.cardSwipedRight = function(currentDeal) {
        /* TODO Sort deals upon insertion in following manner:
         // Active deals athppear first
         // Deals yet to be active secon
         // Within each catagory deal with closest expiry time appears first
         */

        console.log("ACCEPTING!");
        dealCacheService.stashDeal(currentDeal);
        dealsService.acceptDeal(currentDeal);
    };

    // Adds deal to list of rejected deals
    $scope.cardSwipedLeft = function(currentDeal) {
            console.log("REJECTING!");
            dealsService.rejectDeal(currentDeal);
        };

    $scope.cardLeftSet = function() {
        $scope.cardExitAction = $scope.cardSwipedLeft;
    };

    $scope.cardRightSet = function() {
        $scope.cardExitAction = $scope.cardSwipedRight;
    };

    /*
     Gets deal with following ID from dealService
     */
    $scope.getDeal = function( dealId ) {
        return dealsService.getDeal(dealId);
    };

    /*

     */
    $scope.cardDestroyed = function(index) {
        $scope.deals.splice(index, 1);
    };


    // Controls deals that user has viewed and their selection
    // state of those deals ( user's reaction to deal, how long
    // they spent looking at the deal )
}]);