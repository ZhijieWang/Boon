angular.module('starter.controllers', [])


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
.controller('DealsCtrl',[ '$scope','$ionicSlideBoxDelegate','Deals', function($scope, $ionicSlideBoxDelegate ,Deals) {
        // Controls deals that user has viewed and their selection
        // state of those deals ( user's reaction to deal, how long
        // they spent looking at the deal )

         $scope.deals = Deals.all();

        $ionicSlideBoxDelegate.update();

        // Rejects the deal and removes from user's possible list of deals for the day
        $scope.leftSwipe = function(currentDeal) {

        }

        // Adds deal to stash and logs that user accepted the deal
        $scope.rightSwipe = function(currentDeal) {

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