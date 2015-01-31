/*
 *  Unit test module for controller functions
 *  author: rabornt (insomniac34@gmail.com)
 */

describe('controllers module', function() {
    beforeEach(module('starter'));

    var localStorageService, dealerService;

    var mockDeal = {
        dealId: 4,
        name: 'Panera Free Drink With Purchase!',
        image: 'test1.jpg',
        notes: 'Freshly baked bread daily!',
        startTime: 0500,
        endTime: 0700
    };    

    beforeEach(inject(function($rootScope, $controller, $injector, _localStorageService_, _dealerService_) {
        
        // use injector to grab default services
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        scope = $rootScope.$new();

        getController = function(theController) {
            return $controller(theController, {$scope: scope});
        };

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        localStorageService = _localStorageService_;
        dealerService = _dealerService_;

        // mock localservice
        var store = {};
        spyOn(localStorageService, 'get').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function (key, value) {
            return store[key] = value + '';
        });
        spyOn(localStorageService, 'remove').and.callFake(function (key) {
            store[key] = undefined;
        });        
    }));

    it ('should add an accepted deal to the services list of accepted deals', function() {
        var theController = getController('DealsCtrl');
        scope.cardSwipedRight(mockDeal);
        expect(dealerService.stashedDeals).toContain(mockDeal);
    });

    it ('should add a rejected deal to the services master list of rejected deals', function() {
        var theController = getController('DealsCtrl');
        scope.cardSwipedLeft(mockDeal);
        expect(dealerService.rejectedDeals).toContain(mockDeal);
    }); 


});