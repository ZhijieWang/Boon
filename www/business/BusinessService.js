/**
 * Created by adnankhan on 2/22/15.
 */
angular.module('boon.services')
.service('BusinessService', [function BusinessService() {

        var businesses = [];


        function mergeBusinesses(toMerge) {
            var temp_businesses = toMerge;
            var len =  toMerge.length;
            for (var i = 0; i < len; i++) {
                var storeId = temp_businesses[i].id;
                console.log("Storing business with id of "+ storeId);
                businesses[storeId] = temp_businesses[i];
            }
        }



        // If there are cached businesses and none currently in service
        if (typeof localStorage["businesses"] !== 'undefined' && typeof businesses === 'undefined') {
            // Insert businesses into business cache using the storeId as the key.
           businesses = JSON.parse(localStorage["businesses"])


        }
        this.getBusinesses = function() {
            return businesses;

        };

        this.setBusinesses = function(newBusinesses) {


            // Update businesses
            mergeBusinesses(newBusinesses);

            // Update the stored JSON cache
            window.localStorage["businesses"] = JSON.stringify(businesses);
        };

        this.getBusinessById = function(id) {
            console.log("Getting businesses w/ ID" + id);
            if (typeof businesses[id] === 'undefined') {
                // TODO: Query server for business with specified ID
            }
            console.log("Getting business " + businesses[id].name);
            return businesses[id];
        };
}]);