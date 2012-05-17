
var a_bar_walks_into_my_tummy_events = function(){
  var elements = getElements();
  var lightbulb_in = find_incoming(filter_elements(elements, lightbulb('empty'))[0], 'empty');

  if (filter_elements(elements, sensor('', 'empty')).length == 3) {
    //the start
    var sensors = filter_elements(sensor('', 'empty'))
    $.each(sensors, function(i, sensor){
       highlightSection(find_outgoing(sensor, 'empty'));
    })
    createSpeechBubble(sensors[0], "Candies can have 3 shapes: round(o), stick(|), and bar(-)");
  }

  else if (has_element_where(elements, sensor('bar', 'active'))  && has_element_where(lightbulb('empty'))) {
    highlightSection(lightbulb_in, true);
    createSpeechBubble(lightbulb_in, "Good choice!  Now click on the lightbulb just like last time.");
  }

  else if (has_element_where(sensor('', 'active')) && has_element_where(lightbulb('empty'))){
    createSpeechBubble(lightbulb_in, 'With great power comes great responsibility.');
  }

  else if (has_element_where(lightbulb('any')) && has_element_where(sensor('bar', 'empty'))){
    createSpeechBubble(lightbulb_in, "You can start the machine if you want, but you've been warned.");

    //hook up click event and timer to eventually say "here, try this instead" while highlighting the bar sensor
  }
}