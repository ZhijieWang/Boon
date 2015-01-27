/**
 * Created by adnankhan on 1/24/15.
 *
 *
 *      Initially we have mocked deal data for testing, but we will
 *      receive JSON deal data from our backend to populate deals with
 *
 */

angular.module('starter.services', [])

    .factory('Deals', function() {
        // Might use a resource here that returns a JSON array

        // Fake Deals for Testing
        var deals = [{
            id: 0,
            name: 'Hemingway\'s Half Off Food',
            notes: 'Voted best college bar in Oakland!',
            startTime: 0500,
            endTime: 0700

        }, {
            id: 1,
            name: 'Peter\'s Pub',
            notes: 'Odd obsession with everything',
            startTime: 0500,
            endTime: 0700

        }, {
            id: 2,
            name: 'Hemingway\'s Free Drinks',
            notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
            startTime: 0500,
            endTime: 0700
        }, {
            id: 3,
            name: 'Five Guys Bacon Dog',
            notes: 'Can\'t go wrong with bacon!',
            startTime: 0500,
            endTime: 0700
        }, {
            id: 4,
            name: 'Panera Free Drink With Purchase!',
            notes: 'Freshly baked bread daily!',
            startTime: 0500,
            endTime: 0700
        }];

        return {
            all: function() {
                return deals;
            },
            get: function(dealId) {
                // Simple index lookup
                return deals[dealId];
            }
        }
    })