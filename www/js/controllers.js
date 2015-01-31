angular.module('starter.controllers', [])

    .directive('noScroll', function() {

        return {
            restrict: 'A',
            link: function($scope, $element, $attr) {

                $element.on('touchmove', function(e) {
                    e.preventDefault();
                });
            }
        }
    })
    .controller('MainCtrl', function($scope) {})
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
    .controller('DealsCtrl',[ '$scope','$ionicSlideBoxDelegate','TDCardDelegate','dealsService', function($scope, $ionicSlideBoxDelegate ,TDCardDelegate,dealsService) {
        $scope.deals = [];

        // Holds deals that have been rejected
        $scope.rejectedDeals = [];
        // Holds deals that user has stashed
        $scope.stashedDeals = [];

        // Adds deal to list of rejected deals
        $scope.cardSwipedLeft = function(currentDeal) {
            //dealsService.rejectDeal(currentDeal);
            $scope.rejectedDeals.push(currentDeal);
        }

        /*
         Adds deal to stash
         TODO: log timing of accepting deal and send data to server in format:
         w/ dealID and time of swipe, also send the current geolocation

         */
        $scope.cardSwipedRight = function(currentDeal) {
            /* TODO Sort deals upon insertion in following manner:
             // Active deals appear first
             // Deals yet to be active secon
             // Within each catagory deal with closest expiry time appears first
             */
            //dealsService.acceptDeal(currentDeal);
            $scope.stashedDeals.push(currentDeal);
            dealsService.acceptDeal(currentDeal).then(function(response) {

            });
        }

        /*
        Gets deals from dealservice
         */
        $scope.getDeals = function() {
            return dealsService.deals();
        }

        /*
        Adds deal to rejected list
         */
        $scope.rejectDeal = function ( currentDeal ) {
            dealsService.rejectDeal( currentDeal );
        }

        /*
        Gets deal with following ID from dealService
         */
        $scope.getDeal = function( dealId ) {
            return dealsService.getDeal(dealId);
        }

        /*
        Returns accepted deals array
         */
        $scope.acceptedDeals = function () {
            return dealsService.acceptedDeals();
        }

        /*

         */
        $scope.cardDestroyed = function(index) {
            $scope.deals.splice(index, 1);
        };

        $scope.deals = $scope.getDeals();

        // Controls deals that user has viewed and their selection
        // state of those deals ( user's reaction to deal, how long
        // they spent looking at the deal )


        $ionicSlideBoxDelegate.update();
    }])
    .controller('PriceCtrl', function($scope) {

        // Holds user's selections for price ranges
        $scope.devList = [
            { text: " 0 - 5 $ ", checked: false },
            { text: " 5 - 10 $$ ", checked: false },
            { text: " 10-20 $$$ ", checked: false }
        ];
    })
    .controller('GeoCtrl',['$geolocation', '$scope', function($geolocation, $scope) {
        $scope.myPosition = $geolocation.getCurrentPosition({
            timeout: 60000
        })
    }])
