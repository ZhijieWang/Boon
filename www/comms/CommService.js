/**
 * Created by adnankhan on 2/22/15.
 */
angular.module('boon.services')
/**
 *  This service handles getting the primary batch of deals and businesses associated with those deals
 *  from backend server
 */
.service('CommService', ['dealsService','BusinessService','locationService','$http' ,'$cookieStore',function(dealsService,BusinessService,locationService,$http,$cookieStore) {

        var businesses = [];

        this.getBusinesses = function() {
            return businesses;
        };



        //request deals from backend
        this.getDealsandBusinesses = function(location) {
            var currentTime = new Date();

            var jsonPayload = {
                action: 'getDeals',
                csrfToken: '1234567890',
                latitude: "",
                longitude: "",
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };

            // If location object is valid, then extract geo coords form it
            if (location) {
                jsonPayload.latitude = location.latitude;
                jsonPayload.longitude =location.longitude;
            }

            console.log("JSON object is: " + JSON.stringify(jsonPayload));
            return $http.post('http://intense-castle-3862.herokuapp.com/promotions', jsonPayload).then(function(response) {
                var promotions = [];
                var stores = [];
                var dealsList = angular.fromJson(response.data);
                angular.forEach(dealsList.promotions, function(deal) {
                    promotions.push(deal);
                });

                angular.forEach(dealsList.shops, function(deal) {
                    stores.push(deal);
                });

                BusinessService.setBusinesses(stores);
                dealsService.setDeals(promotions);
                businesses = stores;
                return promotions;
            });
        };

        // (still) yucky!
        if ($cookieStore.get('longitude') === undefined)  {
            console.log("No stored location data detected - grabbing new data from API!");
            locationService.updateLocation();

            this.getDealsandBusinesses(null);
        } else {
            console.log("Stored location data detected!");
            var coords = {
                latitude: $cookieStore.get('latitude'),
                longitude: $cookieStore.get('longitude')
            };
            this.getDealsandBusinesses(coords);
        }

    }]);