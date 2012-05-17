var sensor = function(flavor, connection_status){
  return {
    type: 'sensor',
    sensor: flavor,
    connection_criteria: {
      connected_to: connection_status
    }
  };
}

var lightbulb = function(connection_status){
  return {
    type: 'lightbulb',
    connection_criteria: {
      connected_to: connection_status
    }
  }
}

find_connection = function(element, status, type){
  return $.each(element.connections,function(i, connection){
    if (connection.type == type && connection.connected_to == status){
      return connection
    }
  })[0]
}

var find_incoming = function(element, status){return find_connection(element, status, 'incoming')}
var find_outgoing = function(element, status){return find_connection(element, status, 'outgoing');}

var highlightSection = function(highlighted, isCircular){
  console.log("highlighting: ", highlighted.x, highlighted.y, highlighted.height, highlighted.width, isCircular)
}

var createSpeechBubble = function(hightlighted, text) {
  console.log("creating speech bubble: ", hightlighted.x, hightlighted.y, text);

}

var all_my_chocolates_events = function(){
  var elements = elements_finished//get_elements();
  console.log(elements)
  if (has_element_where(elements, sensor('chocolate', 'empty')) &&
      has_element_where(elements, lightbulb('empty')))
  {
    var sensor_out = find_outgoing(filter_elements(elements, sensor('chocolate', 'empty'))[0], 'empty');
    highlightSection(sensor_out, true)
    createSpeechBubble(sensor_out, "We must tell the machine what to do.  Click on the sensor to start laying down wire.")
  }
  else if (has_element_where(elements, sensor('chocolate', 'active')) &&
              has_element_where(elements, lightbulb('empty')))
  {
    var lightbulb_in = find_incoming(filter_elements(elements, lightbulb('empty'))[0], 'empty');
    highlightSection(lightbulb_in, true);
    createSpeechBubble(lightbulb_in, "Good job!  Now connect it to the lightbulb!");
  }
  else if (has_element_where(elements, sensor('chocolate', 'any')) &&
              has_element_where(elements, lightbulb('any'))) {
    console.log("the user has connected the two");
    var lever = getLeverLocation()
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

