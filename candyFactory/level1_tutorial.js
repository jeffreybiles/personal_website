

var all_my_chocolates_events = function(){
  var elements = elements_finished//get_elements();
  console.log(elements)

  if (has_element_where(elements, sensor('chocolate', 'empty')) &&
      has_element_where(elements, lightbulb('empty'))) {
    var sensor_out = find_outgoing(filter_elements(elements, sensor('chocolate', 'empty'))[0], 'empty');
    highlightSection(sensor_out, true)
    createSpeechBubble(sensor_out, "We must tell the machine what to do.  Click on the sensor to start laying down wire.")
  }

  else if (has_element_where(elements, sensor('chocolate', 'active')) &&
              has_element_where(elements, lightbulb('empty'))){
    var lightbulb_in = find_incoming(filter_elements(elements, lightbulb('empty'))[0], 'empty');
    highlightSection(lightbulb_in, true);
    createSpeechBubble(lightbulb_in, "Good job!  Now connect it to the lightbulb!");
  }

  else if (has_element_where(elements, sensor('chocolate', 'any')) &&
              has_element_where(elements, lightbulb('any'))) {
    console.log("the user has connected the two");
    var lever = getLeverLocation()
    highlightSection(lever, false);
    createSpeechBubble(lever, "Click on the lever to test your machine!");

    //here we do something a little hacky... we set a click event on the lever,
    // which sets a timer (how long the checking animation takes to play) to a callback which highlights the chalkboard
//the following should be wrapped in some sort of click event, then a timeout event.  Take care of when there are things to test on, it is too difficult without feedback.
//    var advance_location = getAdvanceLocation();
//    highlightSection(advance_location)

  }
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

