// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('boon', ['ionic','ionic.contrib.ui.tinderCards','boon.services','boon.controllers','timer','ngGeolocation', 'ng-token-auth', 'ngCookies', 'ui.bootstrap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $authProvider,$ionicConfigProvider) {
        // Bar to bottom for android even
        $ionicConfigProvider.tabs.style('ios');
        $ionicConfigProvider.tabs.position('ios');

        // We need to setup some parameters for http requests
        // These three lines are all you need for CORS support
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('splash', {
                 url: "/splash",
                 templateUrl: "splash/splash.html",
                 controller: 'SplashCtrl'
            })
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "app/tabs.html"
            })
            // Each tab has its own nav history stack:
            .state('tab.deal-finder', {
                url: '/deal-finder',
                views: {
                    'deal-finder': {
                        templateUrl: 'deals/deal-finder.html',
                        controller: 'DealsCtrl'
                    }
                }
            })
            .state('tab.deal-stash', {
                url: '/deal-stash',
                views: {
                    'deal-stash': {
                        templateUrl: 'stash/deal-stash.html',
                        controller: 'StashCtrl'
                    }
                }
            })
            .state('tab.tag-cloud', {
              url: '/tag-cloud',
              views: {
                  'tag-cloud': {
                      templateUrl: 'tags/tag-cloud.html',
                      controller: 'TagsCtrl'
                  }
              }
            })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/splash');

        $authProvider.configure({
            apiUrl:                  '/api',
            tokenValidationPath:     '/auth/validate_token',
            signOutUrl:              '/auth/sign_out',
            emailRegistrationPath:   '/auth',
            accountUpdatePath:       '/auth',
            accountDeletePath:       '/auth',
            confirmationSuccessUrl:  window.location.href,
            passwordResetPath:       '/auth/password',
            passwordUpdatePath:      '/auth/password',
            passwordResetSuccessUrl: window.location.href,
            emailSignInPath:         '/auth/sign_in',
            storage:                 'cookies',
            proxyIf:                 function() { return false; },
            proxyUrl:                '/proxy',
            authProviderPaths: {
                github:   '/auth/github',
                facebook: '/auth/facebook',
                google:   '/auth/google'
            },
            tokenFormat: {
                "access-token": "{{ token }}",
                "token-type":   "Bearer",
                "client":       "{{ clientId }}",
                "expiry":       "{{ expiry }}",
                "uid":          "{{ uid }}"
            },
            parseExpiry: function(headers) {
                // convert from UTC ruby (seconds) to UTC js (milliseconds)
                return (parseInt(headers['expiry']) * 1000) || null;
            },
            handleLoginResponse: function(response) {
                return response.data;
            },
            handleAccountResponse: function(response) {
                return response.data;
            },
            handleTokenValidationResponse: function(response) {
                return response.data;
            }
        });        
    });
