/**
 * Created by adnankhan on 2/21/15.
 */

angular.module('boon.controllers')

/**
 *  This controller handles the deal stash pagea
 *
 *  TODO: allow user to click a button to map the deal with respect to their location
 */
.controller('StashCtrl',['$scope','dealCacheService','BusinessService','$ionicModal','$log', function($scope, dealCacheService, BusinessService,$ionicModal, $log){

        $scope.getPrice = function ( priceCat ) {
            switch (priceCat ) {
                case 1:
                    return "$";
                case 2:
                    return "$$";
                case 3:
                    return "$$$";
                default:
                    return "-";
            }
        };

        $ionicModal.fromTemplateUrl('stash/deal-stash-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
        })

        $scope.openModal = function(storeID) {
            $scope.business_slide = BusinessService.getBusinessById(storeID).photos;
            $scope.modal.show()
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

    $scope.acceptedDeals = function () {
        return dealCacheService.stashedDeals();
    };
}])
/**
 *  This controller handles each stash element from the ng-repeat
 */
    .controller('StashItemCtrl',['$scope',function($scope) {



        // Strings to be displayed depending on if deal is active to waiting to be active
        var expireText = "Expires In:";
        var startText = "Starts In:";
        $scope.detailView = false;

        // Ng-style variable to change timer color
        // based on deal starting
        $scope.timerStyle = {
            'color': "blue",
            'font-size': "200%"
        };

        $scope.timeText =  expireText;

        // Sets the start and end times of the respective deal
        $scope.setDealTime = function(startTime,endTime) {
            $scope.dealExpireTime = Date.parse(endTime);
            $scope.dealStartTime = Date.parse(startTime);
        }

        // Gets timers in unix timestamp for the deal, which was parsed in from the previous
        $scope.getDealTimes = function() {
            if (Date.now() > $scope.dealStartTime) {
                $scope.timerStyle.color = 'red';
                $scope.timeText = startText;
                return $scope.dealExpireTime;
            } else {
                $scope.timerStyle.color = 'blue';
                $scope.timeText = expireText;
                return $scope.dealStartTime;
            }
        };

        // Expands the size of the list element and adds information about
        // the deal
        $scope.showDetailView = function() {
            $scope.detailView = !$scope.detailView;
        }
    }]);