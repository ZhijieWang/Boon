// Karma configuration
// Generated on Sat Jan 31 2015 11:38:45 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "www/lib/ionic/js/ionic.bundle.js",
      "www/lib/angular-mocks/angular-mocks.js",
      //"www/lib/ngCordova/dist/ng-cordova.js",
      "www/lib/ionic-contrib-tinder-cards/ionic.tdcards.js",
      "www/lib/angular-animate/angular-animate.js",
      "www/lib/angular-sanitize/angular-sanitize.js",
        "www/lib/angular-cookies/angular-cookies.min.js",
        "www/lib/angular-timer/dist/angular-timer.min.js",
        "www/lib/angular-bootstrap/ui-bootstrap.min.js",
        "www/lib/ng-token-auth/dist/ng-token-auth.min.js",
      "www/lib/ngGeolocation/ngGeolocation.js",
        "www/deals/DealController.js",
        "www/splash/SplashCtrl.js",
        "www/stash/DealCacheController.js",
        "www/tags/TagController.js",
        "www/location/LocationController.js",
        "www/splash/LoginService.js",
        "www/deals/DealsService.js",

      "www/stash/DealCacheService.js",
      "www/tags/TagService.js",
        "www/location/LocationService.js",


        "www/app/app.js",
      "jasmine/spec/*_test.js"            
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
