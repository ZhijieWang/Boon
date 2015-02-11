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

    // UNNEEDED
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
    .controller('DealsCtrl',[ '$scope','TDCardDelegate','dealsService','dealCacheService', '$log','$geolocation', '$auth', 'locationService', '$cookieStore', function($scope ,TDCardDelegate,dealsService,dealCacheService, $log,$geolocation, $auth, locationService, $cookieStore) {
        $scope.coords = {};
        $scope.deals = [];

        // Placeholder function, since card is destroyed after being swiped the
        // placeholder will never execute
        $scope.cardExitAction= function(currentDeal) {};

        // Adds deal to list of rejected deals
        $scope.cardSwipedLeft = function(currentDeal) {
            //dealsService.rejectDeal(currentDeal);
            console.log("REJECTING!");
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

            console.log("ACCEPTING!");
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

        //yucky!
        if ($cookieStore.get('longitude') === undefined)  {
            console.log("No stored location data detected - grabbing new data from API!");
            navigator.geolocation.getCurrentPosition(function(locationObj) {
                $scope.coords = locationObj.coords;
                $cookieStore.put('latitude', $scope.coords.latitude);
                $cookieStore.put('longitude', $scope.coords.longitude);
                console.log("currentLocation: " + JSON.stringify($scope.coords));
                dealsService.getDeals($scope.coords).then(function(newDeals) {
                    $scope.deals = newDeals;
                    console.log("deals is " + JSON.stringify($scope.deals));
                });        
            }, function(error) {
              alert('Unable to get location coordinates: ' + error.message);
            });     
        } else {
            console.log("Stored location data detected!");
            var coords = {
                latitude: $cookieStore.get('latitude'),
                longitude: $cookieStore.get('longitude')
            };
            dealsService.getDeals(coords).then(function(newDeals) {
                $scope.deals = newDeals;
                console.log("deals is " + JSON.stringify($scope.deals));
            });               
        }



        //locationService.updateLocation();

        /*
        $scope.deals = dealsService.getDeals();
        console.log("$scope.deals is: " + JSON.stringify($scope.deals));
        */

        // Controls deals that user has viewed and their selection
        // state of those deals ( user's reaction to deal, how long
        // they spent looking at the deal )
    }])
    /**
     *  This controller handles the deal stash pagea
     *
     *  TODO: allow user to click a button to map the deal with respect to their location
     */
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
            $scope.detailView = !$scope.detailView;
        }
    }])
/**
 *  This controller handles user tags for:
 *
 *  prices - currently 3 options for low medium and high
 *  categories - preset categories
 *  specific tags - loaded from the server and can change based on user tastes
 *
 */
    .controller('TagsCtrl',['$scope','tagService','$log','$state', function($scope, tagService,$log,$state) {
        $scope.stashedTags = tagService.getCategories();

        $scope.priceList = [
            { text: "$",   checked: true, priceID: 1},
            { text: "$$", checked: false, priceID: 2 },
            { text: "$$$", checked: false, priceID: 3 }
        ];

        $scope.categories = [
            {text: "Pizza", checked: false, categoryID: 4},
            {text: "Bar Food", checked: false, categoryID: 3 },
            {text: "Ice Cream", checked: false, categoryID: 2 }
        ];

        // Default value when no prices are selected
        $scope.priceSelect = 0;

        $scope.selectPrice = function(index) {
            // Clear old value if there was one set
            if ($scope.priceSelect >= 0) {
                $scope.priceList[$scope.priceSelect].checked = false;
                tagService.switchPrice($scope.priceList[$scope.priceSelect].priceID,$scope.priceList[$scope.priceSelect].checked);
            }

            // Select new price
            $scope.priceSelect = index;
            $scope.priceList[index].checked = true;

            // Send to tag service
            tagService.switchPrice($scope.priceList[index].priceID,$scope.priceList[index].checked);
        };


        // Since only one price can be highlighted at once it
        // highlights current price it equals the index
        $scope.priceHighlight = function (index) {
            return ($scope.priceList[index].checked);
        }

        // Select new category and send to service for staging
        $scope.selectCategory = function(index) {
            // Toggle Values for given category
            $scope.categories[index].checked = ($scope.categories[index].checked === false);
            tagService.switchCategory($scope.categories[index].categoryID,$scope.categories[index].checked );
        };

        // Selects the catagory and sends it to tags service for processing
        $scope.selectTag = function(index) {
            // Toggle Value in tag representation
            $scope.stashedTags[index].selection = ($scope.stashedTags[index].selection === false);
            var dealToSend = $scope.stashedTags[index];

            tagService.switchTag(dealToSend.tagID,dealToSend.selection);
            console.log("Sending tag " + index +  " to tagService");
        };

        $state.get('tab.tag-cloud').onExit = function() {
            tagService.sendResults();
        }
    }])
;
