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
    .controller('DealsCtrl',[ '$scope','$ionicSlideBoxDelegate','Deals','TDCardDelegate', function($scope, $ionicSlideBoxDelegate ,Deals,TDCardDelegate) {
        $scope.selectedDeals = [];
        $scope.rejectedDeals = [];

        // Controls deals that user has viewed and their selection
        // state of those deals ( user's reaction to deal, how long
        // they spent looking at the deal )

        $scope.deals = Deals.all();

        $ionicSlideBoxDelegate.update();

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
        };

        $scope.addCard = function() {
            var newCard = $scope.deals[Math.floor(Math.random() * $scope.deals.length)];
            newCard.id = Math.random();
            $scope.cards.unshift(angular.extend({}, newCard));
        }


        $scope.cards = [];
        for(var i = 0; i < 3; i++) $scope.addCard();


        // Rejects the deal and removes from user's possible list of deals for the day
        $scope.cardSwipedLeft = function(currentDeal) {
            $scope.rejectedDeals.push($scope.deals[ currentDeal ])
        }

        // Adds deal to stash and logs that user accepted the deal
        $scope.cardSwipedRight = function(currentDeal) {
            /* TODO Sort deals upon insertion in following manner:
             // Active deals appear first
             // Deals yet to be active second
             // Within each catagory deal with closest expiry time appears first
             */
            $scope.selectedDeals.push($scope.deals[ currentDeal ])
        }
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
