/**
 * Created by adnankhan on 2/21/15.
 */
angular.module('boon.services')

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
            console.log("comparing " + currentDate.getTime() + " to " + Date.parse(deal.endTime));
            if (currentDate.getTime() < Date.parse(deal.endTime)) {
                validDeals.push(deal);
            } else {
                console.log("PURGING DEAL with timestamp: " + Date.parse(deal.endTime));
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