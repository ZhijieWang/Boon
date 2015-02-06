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
    .controller('DealsCtrl',[ '$scope','TDCardDelegate','dealsService','dealCacheService', '$log','$geolocation', '$auth', function($scope ,TDCardDelegate,dealsService,dealCacheService, $log,$geolocation, $auth) {
        $scope.$geolocation = $geolocation;

        // basic usage
        $geolocation.getCurrentPosition().then(function(location) {
            $scope.location = location;
            $log.info("The coords are " + $scope.location.longitude + " " + $scope.location.latitude);
        });

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
        
        dealsService.getDeals().then(function(newDeals) {
            $scope.deals = newDeals;
            $log.info("deals is " + JSON.stringify($scope.deals));
        });

        /*
        $scope.deals = dealsService.getDeals();
        $log.info("$scope.deals is: " + JSON.stringify($scope.deals));
        */

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
            if (!$scope.detailView) {
                $scope.detailView = true;

            } else {
                $scope.detailView = false;
            }

        }
    }])
    .controller('PriceCtrl',[ '$scope','preferencesService' , function($scope, preferencesService) {

        // Holds user's selections for price ranges
        $scope.devList = [
            { text: "$",   checked: false, priceID: "lowPrice" },
            { text: "$$", checked: false, priceID: "mediumPrice" },
            { text: "$$$", checked: false, priceID: "highPrice"  }
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

    }])
    .controller('TagsCtrl',['$scope', function($scope) {

    }])
    .controller('SplashCtrl',['$scope','$state',function($scope,$state) {

        $scope.dealClick = function() {
            $state.go('tab.deal-finder');
        }
    }])
