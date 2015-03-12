    
angular.module('boon.controllers')

.controller('SplashCtrl', ['$scope', '$state', '$auth', '$log','CommService', function SplashCtrl($scope, $state, $auth, $log,CommService) {
    $scope.notifications = [{
        msg: 'Welcome!',
        type: 'success'
    }];

    $scope.empty = {};
    $scope.user = {};

    $scope.reset = function() {
        $scope.user = angular.copy($scope.empty);
    };

    $scope.closeNotification = function(index) {
        $scope.notifications.splice(index, 1);
    };    

    //TEMPORARY: for bypassing splash page
    $scope.goToApp = function() {
        $state.go('tab.deal-finder');
    }

    $scope.attemptLogin = function(attemptedEmail, attemptedPassword) {
        console.log("attempting splash with: " + attemptedEmail + " and " + attemptedPassword);
        if (attemptedEmail === undefined || attemptedEmail === '' || 
            attemptedPassword === undefined || attemptedPassword === '') {
            $scope.notifications.push({
                msg: 'Please fill in all forms!',
                type: 'danger'
            });
            return;
        }

        var authenticationParams = {
            email: attemptedEmail,
            password: attemptedPassword
        };

        $auth.submitLogin(authenticationParams).then(function(response) {
            if (angular.fromJson(response).data.status) {
                $state.go('tab.deal-finder');                
            }
        }).catch(function(error) {
            if (error) {
                console.log("User authentication error: " + JSON.stringify(error));
                $scope.notifications.push({
                    msg: 'We weren\'t able to find a user with those credentials!',
                    type: 'danger'
                });
            }
        });
        $scope.reset();
    };
}]);