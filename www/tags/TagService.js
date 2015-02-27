/**
 * Created by adnankhan on 2/21/15.
 */

angular.module('boon.services')
/**
 *  This service communicates with the backend and the tags controller
 *  to handle different tags user has selected with which to filter deals.
 *
 *  TODO: Add ability to select distance thresholds for deals.
 */
    .service('tagService', ['$log','$http', function tagService($log,$http) {

    var toSend = { tags: {},prices: {}, categories:{} };


        /**
         *  Currently mocked tags
         * @type {{tagName: string, tagID: number, selection: boolean}[]}
         */
    var tags = [
        {
            tagName: 'Pizza',
            tagID: 1,
            selection: true
        },
        {
            tagName: 'Subs',
            tagID: 2,
            selection: true
        }
    ];

    this.switchCategory = function(categoryID, value) {
        toSend.categories[categoryID] = value;
    }

    this.switchPrice = function(priceID, value) {
        toSend.prices[priceID] = value;
    }

    this.switchTag = function(tagID,value) {
        toSend.tags[tagID] = value;
    }

    // sends the TagID and matching selection values
    // to backend
    this.sendResults = function () {

        var currentTime = new Date();
        var jsonPayload = {
            action: 'tagsUpdate',
            values: toSend,
            csrfToken: '1234567890',
            timestamp: currentTime.toDateString() + currentTime.getTime()
        };

        console.log("Sending:" + JSON.stringify(jsonPayload));

        $http.put('http://intense-castle-3862.herokuapp.com/tags/', jsonPayload);

    };

    // TODO implement http call to backend
    this.getCategories = function() {
        return tags;
    };
}])