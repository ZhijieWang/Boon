angular.module('starter.controllers', [])

    .directive('noScroll', function() {

        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {

                $element.on('touchmove', function(e) {
                    e.preventDefault();
                });
            }
        };
    })
    .controller('MainCtrl',['$scope',function($scope) {

     }])
    .controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {

        // Opens the left menu when left button is hit
        $scope.showMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        // Opens the right menu when right button is hit
        $scope.showRightMenu = function () {
            $ionicSideMenuDelegate.toggleRight();
        };

    })
    .controller('DealsCtrl',[ '$scope','TDCardDelegate','dealsService','dealCacheService', '$log','$geolocation', function($scope ,TDCardDelegate,dealsService,dealCacheService, $log,$geolocation) {

        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        });
        $scope.myCoords = $geolocation.position.coords; // this is regularly updated
        $scope.myError = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs

        $log.info("The coords are" + $scope.myCoords);

        $scope.deals = [];

        // Placeholder function, since card is destroyed after being swiped the
        // placeholder will never execute
        $scope.cardExitAction= function(currentDeal) {};

        // Adds deal to list of rejected deals
        $scope.cardSwipedLeft = function(currentDeal) {
            //dealsService.rejectDeal(currentDeal);
            $log.info("REJECTING!");
            dealsService.rejectDeal(currentDeal).then(function(response) {
                
            });
        };

        // Reject button acts as if the card were swiped left
        $scope.rejectButton = function() {
            $scope.cardExitAction = $scope.cardSwipedLeft;
            var tempDeal = $scope.deals.shift();
            $scope.cardExitAction(tempDeal);

        };

        // Accept button acts as if card were swiped right
        $scope.acceptButton = function() {
            $scope.cardExitAction = $scope.cardSwipedRight;
            var tempDeal = $scope.deals.shift();
            $scope.cardExitAction(tempDeal);

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

            $log.info("ACCEPTING!");
            dealCacheService.stashDeal(currentDeal);
            dealsService.acceptDeal(currentDeal).then(function(response) {

            });
        };


        $scope.cardLeftSet = function() {
            $scope.cardExitAction = $scope.cardSwipedLeft;
        }

        $scope.cardRightSet = function() {
            $scope.cardExitAction = $scope.cardSwipedRight;
        }


        /*
        Gets deals from dealservice
         */
        $scope.getDeals = function() {
            return dealsService.deals();
        };

        /*
        Adds deal to rejected list
         */
        $scope.rejectDeal = function ( currentDeal ) {
            dealsService.rejectDeal(currentDeal);
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

        $scope.deals = $scope.getDeals();

        // Controls deals that user has viewed and their selection
        // state of those deals ( user's reaction to deal, how long
        // they spent looking at the deal )

    }])
    .controller('StashCtrl',['$scope','dealCacheService','$log', function($scope, dealCacheService, $log){

        $scope.acceptedDeals = function () {
            return dealCacheService.stashedDeals();
        };

    }])
    /**
     *  This controller handles each stash element from the ng-repeat
     */
    .controller('StashItemCtrl',['$scope',function($scope) {

        // Sets the start and end times of the respective deal
        $scope.setDealTime = function(startTime,endTime) {
            $scope.dealExpireTime = Date.parse(endTime);
            $scope.dealStartTime = Date.parse(startTime);
        }

        // Gets timers in unix timestamp for the deal, which was parsed in from the previous
        // datestamp,
        // 1 - Select Start Time
        // 2 - Select Ending Time
        $scope.getDealTimes = function(select) {
            if (select == 1) {
                return $scope.dealStartTime;

            } else if (select == 2) {
                return $scope.dealExpireTime;
            }
        };

    }])
    .controller('PriceCtrl',[ '$scope','preferencesService' , function($scope, preferencesService) {

        // Holds user's selections for price ranges
        $scope.devList = [
            { text: " 0 - 5 $ ",   checked: false, priceID: "lowPrice" },
            { text: " 5 - 10 $$ ", checked: false, priceID: "mediumPrice" },
            { text: " 10-20 $$$ ", checked: false, priceID: "highPrice"  }
        ];

        // Pushes new checkbox values to service
        $scope.check = function(checkValue, priceID) {

            if (checkValue === true) {
                preferencesService.enablePrice(priceID);
            } else {
                preferencesService.disablePrice(priceID);
            }

        };
    }])
    .controller('GeoCtrl',['$geolocation', '$scope', function($geolocation, $scope) {

    }]);
