/**
 * Written by Adnan Khan & Tyler Raborn
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
            startTime: 'December 17, 2015 17:30:00',
            endTime: 'December 17, 2015 19:30:00'
        }, {
            dealId: 1,
            priceCategory: 1,
            name: 'Peter\'s Pub',
            image: 'test1.jpg',
            notes: 'Odd obsession with everything',
            startTime: 'December 17, 2015 17:30:00',
            endTime: 'December 17, 2015 19:30:00'
        }, {
            dealId: 2,
            priceCategory: 1,
            name: 'Hemingway\'s Free Drinks',
            image: 'test1.jpg',
            notes: 'Drinkup',
            startTime: 'December 17, 2015 17:30:00',
            endTime: 'December 17, 2015 19:30:00'
        }, {
            dealId: 3,
            priceCategory: 1,
            name: 'Five Guys Bacon Dog',
            image: 'test1.jpg',
            notes: 'Can\'t go wrong with bacon!',
            startTime: 'December 17, 2015 17:30:00',
            endTime: 'December 17, 2015 19:30:00'
        }, {
            dealId: 4,
            priceCategory: 2,
            name: 'Panera Free Drink With Purchase!',
            image: 'test1.jpg',
            notes: 'Freshly baked bread daily!',
            startTime: 'December 17, 2015 17:30:00',
            endTime: 'December 17, 2015 19:30:00'
        }, {
            dealId: 5,
            priceCategory: 2,
            name: 'Free alcohol!',
            image: 'test2.jpg',
            notes: 'deal stuff',
            startTime: 'December 17, 2014 15:30:00',
            endTime: 'December 17, 2014 17:30:00'
        }];

/*
        [{
          "promotion": {
            "dealId": 1,
            "priceCategory": 0,
            "notes": "half price menu item",
            "expire": "December 17, 1995, 03:24:00"
          }
        }, {
          "promotion": {
            "dealId": 2,
            "priceCategory": 0,
            "notes": "half price menu item",
            "expire": "December 17, 1995, 03:24:00"
          }
        }]        
*/

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
            var currentTime = new Date();
            var jsonPayload = {
                action: 'getDeals',
                location: location,
                preferences: preferences,
                csrfToken: '1234567890',
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };

            //$log.info("about to receive data...");
            return $http.get('http://intense-castle-3862.herokuapp.com/promotions', jsonPayload).then(function(response) {
                $log.info(JSON.stringify(response.data));
                return angular.fromJson(response.data);
            });
            //return freshDeals;
        };
    }])

    .service('dealCacheService', ['$log', function dealCacheService($log) {
        // Holds deals that user has stashed
        var stashedDeals = [];

        //every time deal data is requested from the cache, it purges expired deals
        this.stashedDeals = function() {
            purgeExpiredDeals();
            return stashedDeals;
        };

        this.stashDeal = function(dealToStash) {
            stashedDeals.push(dealToStash);

            //sort deals - this will ensure that deal order is maintained from most current to least current
            stashedDeals = sortByKey(
                stashedDeals, 
                'startTime'
            );   
        };

        //remove deals from stash that have expired
        var purgeExpiredDeals = function() {
            var currentDate = new Date();
            var validDeals = [];
            angular.forEach(stashedDeals, function(deal) {
                $log.info("comparing " + currentDate.getTime() + " to " + Date.parse(deal.endTime));
                if (currentDate.getTime() < Date.parse(deal.endTime)) {
                    validDeals.push(deal);
                }
            });
            stashedDeals = validDeals;
        };     

        var sortByKey = function(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };

        var reverseSortByKey = function(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        };          

    }])

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
        };



    })
;


