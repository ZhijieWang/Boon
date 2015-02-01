/**
 * Created by adnankhan on 1/24/15.
 *
 *
 *      Initially we have mocked deal data for testing, but we will
 *      receive JSON deal data from our backend to populate deals with
 *
 */

angular.module('starter.services', [])

    .service('dealsService', ['$http', '$log', function dealsService($http, $log) {
        
        //mock deal data
        var freshDeals  = [{
            dealId: 0,
            name: 'Hemingway\'s Half Off Food',
            image: 'test1.jpg',
            notes: 'Voted best college bar in Oakland!',
            startTime: 0500,
            endTime: 0700

        }, {
            dealId: 1,
            name: 'Peter\'s Pub',
            image: 'test1.jpg',
            notes: 'Odd obsession with everything',
            startTime: 0500,
            endTime: 0700

        }, {
            dealId: 2,
            name: 'Hemingway\'s Free Drinks',
            image: 'test1.jpg',
            notes: 'Drinkup',
            startTime: 0500,
            endTime: 0700
        }, {
            dealId: 3,
            name: 'Five Guys Bacon Dog',
            image: 'test1.jpg',
            notes: 'Can\'t go wrong with bacon!',
            startTime: 0500,
            endTime: 0700
        }, {
            dealId: 4,
            name: 'Panera Free Drink With Purchase!',
            image: 'test1.jpg',
            notes: 'Freshly baked bread daily!',
            startTime: 0500,
            endTime: 0700
        }];

        this.deals = function() {
            return freshDeals;
        };


        this.rejectDeal = function(currentDeal) {

            var currentTime = new Date();
            var jsonPayload = {
                dealId: currentDeal.dealId,
                action: 'dealState',
                accepted: false,
                csrfToken: '1234567890',
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };            

            return $http.post('deals.htm', jsonPayload).then(function(response) {
                return angular.fromJson(response.data).model.results;
            });
        };

        //returns a promise resulting from posting the server with accepted deal data
        this.acceptDeal = function(currentDeal) {

            var currentTime = new Date();
            var jsonPayload = {
                dealId: currentDeal.dealId,
                action: 'dealState',
                accepted: true,
                csrfToken: '1234567890',
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };

            return $http.post('deals.htm', jsonPayload).then(function(response) {
                return angular.fromJson(response.data).model.results;
            });
        };

        // TODO
        this.getDeal = function (dealID) {

        };

        // TODO: uncomment ajax code when we have a backend
        this.getDeals = function(location, preferences) {

            /*
            var currentTime = new Date();
            var jsonPayload = {
                action: 'getDeals',
                location: location,
                preferences: preferences,
                csrfToken: '1234567890',
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };

            return $http.post('deals.htm', jsonPayload).then(function(response) {
                return angular.fromJson(response.data).model.results;
            });
            */

            return freshDeals;
        };
    }])
    .service('dealCacheService', function dealCacheService() {
        // Holds deals that user has stashed
        var stashedDeals = [];

        this.stashedDeals = function() {
            return stashedDeals;
        };

        this.stashDeal = function(dealToStash) {
            stashedDeals.push(dealToStash);
        };

    })



