/**
 * Created by adnankhan on 2/22/15.
 */
describe ('communication servie', function() {
    beforeeach(module('boon'));

    // Mock json for testing backend comms
    var fullJson = "{\"promotions\":[{\"dealId=\":1,\"pricecategory=\":0,\"notes=\":\"half price menu item\",\"name=\":\"Half Time Afternoon\",\"shopId=\":1,\"startTime=\":\"April 17, 2025 01:24:00\",\"endTime=\":\"April 17, 2015 03:24:00\",\"imageUrl=\":\"http:\/\/lorempixel.com\/450\/350\/\"},{\"dealId=\":2,\"pricecategory=\":0,\"notes=\":\"half price menu item\",\"name=\":\"Half Time Afternoon\",\"shopId=\":1,\"startTime=\":\"April 17, 2025 01:24:00\",\"endTime=\":\"April 17, 2015 03:24:00\",\"imageUrl=\":\"http:\/\/lorempixel.com\/450\/350\/\"}],\"shops\":[{\"name=\":\"Heimingway\'s cafe\",\"id=\":1,\"distance=\":9159.43419009316},{\"name=\":\"Capital Grille\",\"id=\":2,\"distance=\":9619.5977918027}]}";

});