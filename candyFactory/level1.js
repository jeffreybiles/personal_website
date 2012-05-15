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
   //switch statement that uses information from elements to determine which script to run

//  first: function (){
//    var html = '<div id="splash">Welcome to the candy factory!  We need your help to fix the machine that fills our orders.</div>';
//    $(body).append(html);
//    $('#splash').click(firstExplanation);
//  },
//  firstExplanation: function() {
//    $('#splash').hide();
//    var elements = getElements();
//    //find chocolate sensor and get positioning info of its outgoing connector
//    var chocolate_sensor_outgoing_connection = jQuery.each(elements, function(i, element) {
//      if (element.type == 'chocolate sensor') {
//        return element.connections.first();
//      }
//    });
//    var outgoing = chocolate_sensor_outgoing_connection;
//    //make message box
//
//    //define clickable area
//    var clickable_area = '<div id="first_hint_clickable_area" class="absolute"></div>';
//    clickable_area.offset({left: outgoing.x, top: outgoing.y});
//    clickable_area.height = outgoing.height;
//    clickable_area.width = outgoing.width;
//    clickable_area.click(secondExplanation);
//  },
//  secondExplanation: function(){
//
//  }
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

