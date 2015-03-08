/**
 * Created by adnankhan on 2/22/15.
 */
angular.module('boon.services')
.service('BusinessService', [function BusinessService() {

        var businesses = [];

        if ( localStorage["businesses"] !== null) {
            businesses = JSON.parse(localStorage["businesses"]);
        }

        this.getBusinesses = function() {
           return businesses;

        };

        this.setBusinesses = function(newBusinesses) {
            window.localStorage["businesses"] = JSON.stringify(newBusinesses);
        };

        // Get Businesses from backend comm service
        this.getBusinessById = function(id) {
            console.log("Getting businesses w/ ID" + id);
            var businesses = window.localStorage["businesses"];
            if (businesses[id] === null) {
                // TODO: Query server for business with specified ID
            }
            return businesses[id];
        };

}]);