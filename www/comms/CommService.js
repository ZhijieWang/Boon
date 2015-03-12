/**
 * Created by adnankhan on 2/22/15.
 */
angular.module('boon.services')
/**
 *  This service handles getting the primary batch of deals and businesses associated with those deals
 *  from backend server
 */
.service('CommService', ['dealsService','BusinessService','locationService','$http' ,'$cookieStore',function(dealsService,BusinessService,locationService,$http,$cookieStore) {

        //request deals from backend
        this.getDealsandBusinesses = function() {
            var currentTime = new Date();

            var jsonPayload = {
                action: 'getDeals',
                csrfToken: '1234567890',
                latitude: "",
                longitude: "",
                timestamp: currentTime.toDateString() + currentTime.getTime()
            };

            // Populate payload with values if they exist
            locationService.getStashedLocation(jsonPayload);

            console.log("JSON object is: " + JSON.stringify(jsonPayload));

            $http.post('http://intense-castle-3862.herokuapp.com/promotions', jsonPayload).then(function(response) {

                console.log("JSON object is: " + JSON.stringify(response.data));


                var dealsList = angular.fromJson(response.data);

                /**
                 * Set promotions and stores
                 */
                var promotions = dealsList.promotions;
                var stores = dealsList.shops;

                BusinessService.setBusinesses(stores);
                dealsService.setDeals(promotions);

            });
        };

        this.getDealsandBusinesses();

    }]);