/**
 * Created by adnankhan on 2/21/15.
 */

angular.module('boon.services')

    .service('locationService', ['$geolocation', '$http', '$cookieStore', '$log', '$q', function locationService($geolocation, $http, $cookieStore, $log, $q) {

    this.getCurrentLocation = function() {
        if ($cookieStore.get('longitude') === undefined) {
            console.log("no cookie set yet! Calling GoogleMaps API!");
            return $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(response) {
                var locationObj = angular.fromJson(response);
                $cookieStore.put('longitude', locationObj.coords.longitude);
                $cookieStore.put('latitude', locationObj.coords.latitude);
                return locationObj;
            });
        } else {
            console.log("Location data already exists; returning stored lat/long values.");
            var deferred = $q.defer();
            setTimeout(function() {
                deferred.resolve({
                    coords: {
                        latitude: $cookieStore.get('latitude'),
                        longitude: $cookieStore.get('longitude')
                    }
                });
                console.log("cookies obj contains: " + $cookieStore.get('longitude') + " and " + $cookieStore.get('latitude'));
            }, 1000);
            return deferred.promise;
        }
    };

    this.getCurrentLocation();

    this.updateLocation = function() {
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(response) {
            console.log("Updated gelocation data: " + JSON.stringify(response));
            var locationObj = angular.fromJson(response);
            $cookieStore.put('longitude', locationObj.coords.longitude);
            $cookieStore.put('latitude', locationObj.coords.latitude);

            console.log("Long Lat" + locationObj.coords.longitude + " " + locationObj.coords.latitude);
            return locationObj;
        });
    };
}]);