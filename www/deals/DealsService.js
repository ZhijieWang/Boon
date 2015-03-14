/**
 * Created by adnankhan on 2/21/15.
 */
angular.module('boon.services')

    .service('dealsService', ['$http', '$log', '$auth', function dealsService($http, $log, $auth) {

    var deals = [];

    if (localStorage["deals"] !== null) {
        deals = JSON.parse(localStorage["deals"]);
    }

    this.setDeals = function(newDeals) {
        // direct assignment for first use
        deals = newDeals;
        // Deals cached in localstorage
        localStorage["deals"] = JSON.stringify(newDeals);
    };

    this.getDeals = function() {
        return deals;
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

        return $http.post('http://intense-castle-3862.herokuapp.com/'+ currentDeal.dealId +'/reject', jsonPayload).then(function(response) {
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

        return $http.post('http://intense-castle-3862.herokuapp.com/'+ currentDeal.dealId+'/accept', jsonPayload).then(function(response) {
            return angular.fromJson(response.data).model.results;
        });
    };


}]);