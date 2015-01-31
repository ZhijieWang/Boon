/**
 * Created by adnankhan on 1/24/15.
 *
 *
 *      Initially we have mocked deal data for testing, but we will
 *      receive JSON deal data from our backend to populate deals with
 *
 */

angular.module('starter.services', [])

    .service('dealsService', function() {
        var freshDeals  = [{
            dealId: 0,
            name: 'Hemingway\'s Half Off Food',
            image: 'test1.jpg',
            notes: 'Voted best college bar in Oakland!',
            startTime: 0500,
            endTime: 0700

        }, {
            dealId: 1,
            name: 'Peter\'s Pub',
            image: 'test1.jpg',
            notes: 'Odd obsession with everything',
            startTime: 0500,
            endTime: 0700

        }, {
            dealId: 2,
            name: 'Hemingway\'s Free Drinks',
            image: 'test1.jpg',
            notes: 'Drinkup',
            startTime: 0500,
            endTime: 0700
        }, {
            dealId: 3,
            name: 'Five Guys Bacon Dog',
            image: 'test1.jpg',
            notes: 'Can\'t go wrong with bacon!',
            startTime: 0500,
            endTime: 0700
        }, {
            dealId: 4,
            name: 'Panera Free Drink With Purchase!',
            image: 'test1.jpg',
            notes: 'Freshly baked bread daily!',
            startTime: 0500,
            endTime: 0700
        }];
        // Holds deals that have been rejected
        var rejectedDeals = [];
        // Holds deals that user has stashed
        var stashedDeals = [];

        this.deals = function() {
            return freshDeals;
        };

        this.acceptedDeals = function() {
            return stashedDeals;
        };

        this.rejectDeal = function(currentDeal) {
            rejectedDeals.push(currentDeal);
        };

        this.acceptDeal = function(currentDeal) {
            stashedDeals.push(currentDeal);
        };

        // TODO
        this.getDeal = function (dealID) {

        };

        // TODO: get fresh deals from server using location and preferences
        this.getDeals = function(location, preferences) {
                return freshDeals;
        };

    })