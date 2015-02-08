/**
 * Written by Adnan Khan & Tyler Raborn
 *
 *
 *      Initially we have mocked deal data for testing, but we will
 *      receive JSON deal data from our backend to populate deals with
 *
 */

angular.module('starter.services', [])

    .service('dealsService', ['$http', '$log', '$auth', function dealsService($http, $log, $auth) {
        
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

            return $http.post('http://intense-castle-3862.herokuapp.com/reject', jsonPayload).then(function(response) {
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

            return $http.post('http://intense-castle-3862.herokuapp.com/accept', jsonPayload).then(function(response) {
                return angular.fromJson(response.data).model.results;
            });
        };

        // TODO
        this.getDeal = function (dealID) {

        };

        //request deals from backend
        this.getDeals = function(location) {
            var currentTime = new Date();
            var jsonPayload = {
                action: 'getDeals',
                latitude: location.latitude,
                longitude: location.longitude,
                csrfToken: '1234567890',
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };

            $log.info("JSON object is: " + JSON.stringify(jsonPayload));
            return $http.post('http://intense-castle-3862.herokuapp.com/promotions', jsonPayload).then(function(response) {
                var promotions = [];
                var dealsList = angular.fromJson(response.data);
                angular.forEach(dealsList, function(deal) {
                    promotions.push(deal.promotion);
                });
                return promotions;
            });
        };
    }])
    /**
     *  This service handles the caching ot deals and facilitates communication between the deal finder
     *  where deals are added to the stash and the stash list where the stashed deals are
     *  displayed to the user.
     */
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
                } else {
                    $log.info("PURGING DEAL with timestamp: " + Date.parse(deal.endTime));
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
    /**
     *  This service communicates with the backend and the tags controller
     *  to handle different tags user has selected with which to filter deals.
     *
     *  TODO: Add ability to select distance thresholds for deals.
     */
    .service('tagService', ['$log', function tagService($log) {

        var toSend = { tags: [],prices: [], categories:[] };

        var tags = [
            {
              tagName: 'Pizza',
              tagID: 1,
              selection: true
            },
            {
                tagName: 'Pizza 2',
                tagID: 2,
                selection: true
            }
        ];

        this.switchCategory = function(categoryID, value) {
            toSend.categories[categoryID] = {categoryID: categoryID,selection:value};
        }

        this.switchPrice = function(priceID, value) {
            toSend.prices[priceID] = {priceID: priceID,selection:value};
        }

        this.switchTag = function(tagID,value) {
            toSend.tags[tagID] = {tagID: tagID, selection:value};
        }

        // TODO: send the TagID and matching selection values
        // to backend
        this.sendResults = function () {
            $log.info("Sending:" + JSON.stringify(toSend));
        };

        // TODO implement http call to backend
        this.getCategories = function() {
            return tags;
        };
    }])
    .service('locationService', ['$geolocation', '$http', '$cookieStore', '$log', '$q', function locationService($geolocation, $http, $cookieStore, $log, $q) {
        this.getCurrentLocation = function() {
            if ($cookieStore.get('longitude') === undefined) {
                $log.info("no cookie set yet! Calling GoogleMaps API!");
                return $geolocation.getCurrentPosition({
                    timeout: 60000
                }).then(function(response) {
                    var locationObj = angular.fromJson(response);
                    $cookieStore.put('longitude', locationObj.coords.longitude);
                    $cookieStore.put('latitude', locationObj.coords.longitude);
                    return locationObj;
                });                
            } else {
                $log.info("Location data already exists; returning stored lat/long values.");
                var deferred = $q.defer();
                setTimeout(function() {
                    deferred.resolve({
                        coords: {
                            latitude: $cookieStore.get('latitude'),
                            longitude: $cookieStore.get('longitude')
                        }
                    });
                    $log.info("cookies obj contains: " + $cookieStore.get('longitude') + " and " + $cookieStore.get('latitude'));
                }, 1000);
                return deferred.promise;
            }
        };

        this.updateLocation = function() {
            var currentPosition = $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(response) {
                $log.info("Updated gelocation data: " + JSON.stringify(response));
                $cookies.longitude = angular.fromJson(response).longitude;
                $cookies.latitude = angular.fromJson(response).latitude;
            });
            $log.info("currentPosition is: " + JSON.stringify(currentPosition));
        };
    }])
;


