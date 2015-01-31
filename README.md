# Boon

Development Branch for Boon App

Can be run with:

```ionic serve```

Which will launch your web browser with the webapp running

or

```ionic run```

Which will launch an iPhone VM running the cordova packaged app


Currently there is no database connectivity and deals are hardcoded in for testing.

# Unit Tests

Before executing tests the following commands need to be run to prepare local testing enviroment:

''' npm install -g karma
npm install -g karma-cli
npm install karma-jasmine
npm install karma-chrome-launcher '''

To Add a New Angular Unit Test: call the file \<name\>_test.js and put it under the jasmine/spec/ directory

To execute the Test Suite: execute_tests.sh contains the karma command for running browser tests
