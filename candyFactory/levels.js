
alldachocolate = {
  name: 'alldachocolate',
  //this is the first level, and is meant to show how to select end-points, as well as introduce them to the concept of selecting by color.
  id: 1,
  order:  'only chocolate candies',
  hint: 'this is a sample hint',
  sensors:  ['chocolate'],
//  analyze: function(){
//    return [
//      {type: 'chocolate ball', levelSays: true, circuitSays: true},
//      {type: 'cherry ball', levelSays: true, circuitSays: false},
//    ]
//  },
  tools: [],
  types:  ['*o'], //this means "All flavors, only balls"
  script: 'alldachocolate'
};

or1 = {
  name: 'or1',
  //this is the third level, and is meant to introduce the OR operator
  id: 3,
  order:  'The monster wants all the candies that are mint OR lemon.',
  hint: 'What\'s that new tool over on the left?  It may be useful.',
  sensors:  ['mint', 'lemon'],
  //I cannot emphasize enough how TEMPORARY this analyze function is
//  analyze: function(){
//    return [
//      {type: 'chocolate ball', levelSays: true, circuitSays: true},
//      {type: 'cherry ball', levelSays: true, circuitSays: false},
//    ]
//  },
  tools: ['OR'],
  types:  ['*-'], //this means "All flavors, only bars"
  script: 'or1'
};