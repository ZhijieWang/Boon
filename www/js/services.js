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
            priceCategory: 1,
            name: 'Hemingway\'s Half Off Food',
            image: 'test1.jpg',
            notes: 'Voted best college bar in Oakland!',
            startTime: 0500,
            endTime: 0700

        }, {
            dealId: 1,
            priceCategory: 1,
            name: 'Peter\'s Pub',
            image: 'test1.jpg',
            notes: 'Odd obsession with everything',
            startTime: 0500,
            endTime: 0700

        }, {
            dealId: 2,
            priceCategory: 1,
            name: 'Hemingway\'s Free Drinks',
            image: 'test1.jpg',
            notes: 'Drinkup',
            startTime: 0500,
            endTime: 0700
        }, {
            dealId: 3,
            priceCategory: 1,
            name: 'Five Guys Bacon Dog',
            image: 'test1.jpg',
            notes: 'Can\'t go wrong with bacon!',
            startTime: 0500,
            endTime: 0700
        }, {
            dealId: 4,
            priceCategory: 2,
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

            // inform server of deal rejection
            var jsonPayload = {
                dealId: currentDeal.dealId,
                action: 'dealState',
                accepted: false,
                csrfToken: '1234567890'
            };            

            return $http.post('deals.htm', jsonPayload).then(function(response) {
                return angular.fromJson(response.data).model.results;
            });
        };

        //returns a promise resulting from posting the server with accepted deal data
        this.acceptDeal = function(currentDeal) {

            var jsonPayload = {
                dealId: currentDeal.dealId,
                action: 'dealState',
                accepted: true,
                csrfToken: '1234567890'
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
            var jsonPayload = {
                action: 'getDeals',
                location: location,
                preferences: preferences,
                csrfToken: '1234567890'
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
    /** This service handles communicating user preferences about deals
     *  such as price, food type
     *
     *  TODO: add ability to store distances from user ( store internally in metric
     *  then convert to feet in view because America )
     * */
    .service('preferencesService', function preferencesService() {
        var prices = {
              lowPrice: false,
              mediumPrice: true,
              highPrice: true
        };

        var categories = {
              drink: true,
              pizza: true,
              mexican: true,
              italian: true,
              cafe: true
        };

        /* Index must not exceed that of the prices array */
        this.enablePrice = function(priceID) {
            prices[priceID] = true;
        };

        this.disablePrice = function(priceID) {
            prices[priceID] = false;
        };

        this.enableCategory = function(categoryID) {
            categories[categoryID] = true;
        };

        this.disableCategory = function(categoryID) {
           categories[categoryID] = false;
        }



    })



