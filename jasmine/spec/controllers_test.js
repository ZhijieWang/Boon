/*
 *  Unit test module for controller functions
 *  author: rabornt (insomniac34@gmail.com)
 */

describe('controllers module', function() {
    beforeEach(module('starter'));

    var dealsService;
    var getController;

    var mockDeal = {
        dealId: 4,
        name: 'Panera Free Drink With Purchase!',
        image: 'test1.jpg',
        notes: 'Freshly baked bread daily!',
        startTime: 0500,
        endTime: 0700
    };    

    beforeEach(inject(function($rootScope, $controller, $injector, _dealsService_) {
        
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
        dealsService = _dealsService_;   
    }));

    it ('should add an accepted deal to the services list of accepted deals', function() {
        var theController = getController('DealsCtrl');
        scope.cardSwipedRight(mockDeal);
        expect(scope.stashedDeals).toContain(mockDeal);
    });

    it ('should add a rejected deal to the services master list of rejected deals', function() {
        var theController = getController('DealsCtrl');
        scope.cardSwipedLeft(mockDeal);
        expect(scope.rejectedDeals).toContain(mockDeal);
    }); 


});