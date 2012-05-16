
var empty_lightbulb = {type: 'lightbulb', connection_criteria: {connected_to: 'empty'}}

var all_my_chocolates_events = function(){
  var elements = elements_first_selected //get_elements();
  console.log(elements)
  if (has_element_where(elements, {type: 'sensor', sensor: 'chocolate', connection_criteria: {connected_to: 'empty'}}) &&
      has_element_where(elements, empty_lightbulb)){
    console.log("first event!!")                                     ;
    //highlight the outgoing connector of the chocolate sensor
    //put up a dialogue box nearby that says "we must tell the machine what to do!  click on the sensor to start laying down wire."
  } else if (has_element_where(elements, {type: 'sensor', sensor: 'chocolate', connection_criteria: {connected_to: 'active'}}) &&
      has_element_where(elements, empty_lightbulb)){
    console.log("the user has selected the chocolate sensor!!");
    //highlight the incoming connector to the lightbulb.
    //put up a dialogue box nearby that says "good job!  Now connect it to the lightbulb!"
  } else if (has_element_where(elements, {type: 'sensor', sensor: 'chocolate', connection_criteria: {connected_to: 'any'}}) &&
      has_element_where(elements, {type: 'lightbulb', connection_criteria: {connected_to: 'any'}})) {
    console.log("the user has connected the two");
    //highlight the lever
    //put up a dialogue box that says to click on the lever
    //here we do something a little hacky... we set a click event on the lever,
    // which sets a timer (how long the checking animation takes to play) to a callback which highlights the chalkboard
  }
}

var a_bar_walks_into_my_tummy_events = function(){

}





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
        connected_to: 'empty'
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
        connected_to: 'empty'
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
        connected_to: 'empty'
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

