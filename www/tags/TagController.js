/**
 * Created by adnankhan on 2/21/15.
 */

angular.module('boon.controllers')


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
        {text: "Food", checked: false, categoryID: 4},
        {text: "Drink", checked: false, categoryID: 3 },
        {text: "Entertainment", checked: false, categoryID: 2 }
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
}]);