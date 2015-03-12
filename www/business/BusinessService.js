/**
 * Created by adnankhan on 2/22/15.
 */
angular.module('boon.services')
.service('BusinessService', [function BusinessService() {
        var businesses = [];

        this.getBusinesses = function() {
           return businesses;
        };

        this.setBusinesses = function(newBusinesses) {
            businesses = newBusinesses;
        };

        // Get Businesses from backend comm service
        this.getBusinessById = function(id) {
            console.log("Getting businesses w/ ID" + id);

            if (businesses[id] === null) {
                // TODO: Query server for business with specified ID
            }
            return businesses[id];
        };

}]);