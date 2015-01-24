angular.module('starter.services', [])


/**
 * A simple example service that returns some data.
 */
.factory('Deals', function() {
  // Might use a resource here that returns a JSON array

  // Fake Deals for Demo
  var deals = [{
    id: 0,
    name: 'Hemingway\'s Half Off Food',
    notes: 'Voted best college bar in Oakland!',
    displayImage: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Peter\'s Pub',
    notes: 'Odd obsession with everything',
    displayImage: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Hemingway\'s Free Drinks',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    displayImage: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Five Guys Bacon Dog',
    notes: 'Can\'t go wrong with bacon!',
    displayImage: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Panera Free Drink With Purchase!',
    notes: 'Freshly baked bread daily!',
    displayImage: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
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
});
