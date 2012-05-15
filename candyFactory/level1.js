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


//scripts.
var alldachocolate_events = function(){
  var elements = get_elements();
  if (filter_elements(elements, {type: 'sensor', sensor: 'chocolate', connection_criteria: {connected_to: ''}}) &&
      filter_elements(elements, {type: 'lightbulb', connection_criteria: {connected_to: ''}})){
    console.log("first event!!")                                     ;
    //highlight the outgoing connector of the chocolate sensor
    //put up a dialogue box nearby that says "we must tell the machine what to do!  click on the sensor to start laying down wire."
  } else if (filter_elements(elements, {type: 'sensor', sensor: 'chocolate', connection_criteria: {connected_to: 'active'}}) &&
      filter_elements(elements, {type: 'lightbulb', connection_criteria: {connected_to: ''}})){
    console.log("the user has selected the chocolate sensor!!");
    //highlight the incoming connector to the lightbulb.
    //put up a dialogue box nearby that says "good job!  Now connect it to the lightbulb!"
  } else if (filter_elements(elements, {type: 'sensor', sensor: 'chocolate', connection_criteria: {connected_to: 'any'}}) &&
      filter_elements(elements, {type: 'lightbulb', connection_criteria: {connected_to: 'any'}})) {
    console.log("the user has connected the two");
    //highlight the lever
    //put up a dialogue box that says to click on the lever
    //here we do something a little hacky... we set a click event on the lever,
    // which sets a timer (how long the checking animation takes to play) to a callback which highlights the chalkboard
  }
}

//tests
elements_start = [
  {
    id: 1,
    type: 'chocolate sensor',
    connections: [
      {
        type: 'outgoing',
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        connected_to: ''
      }
    ]
  },
  {
    id: 2,
    type: 'lightbulb',
    connections: [
      {
        type: 'incoming',
        x: 500,
        y: 100,
        width: 10,
        height: 10,
        connected_to: ''
      }
    ]
  }
]

elements_first_selected = [
  {
    id: 1,
    type: 'chocolate sensor',
    connections: [
      {
        type: 'outgoing',
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        connected_to: 'active'
      }
    ]
  },
  {
    id: 2,
    type: 'lightbulb',
    connections: [
      {
        type: 'incoming',
        x: 500,
        y: 100,
        width: 10,
        height: 10,
        connected_to: ''
      }
    ]
  }
]

elements_finished = [
  {
    id: 1,
    type: 'chocolate sensor',
    connections: [
      {
        type: 'outgoing',
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        connected_to: '2'
      }
    ]
  },
  {
    id: 2,
    type: 'lightbulb',
    connections: [
      {
        type: 'incoming',
        x: 500,
        y: 100,
        width: 10,
        height: 10,
        connected_to: '1'
      }
    ]
  }
]

