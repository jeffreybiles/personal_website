var hash_sample = {type: 'sensor', sensor: 'chocolate', connection_criteria: {connection_type: 'outgoing', connected_to: 'active'}}

var filter_elements = function(elements, criterion){ //both criterion and elements are arrays
  var remaining_elements = elements
  $.each(criterion, function(key, value){
    remaining_elements = remaining_elements.filter(function(element){
      //filter will match up each to the criteria to create a new remaining_elements with only things that match
      return is_match(element, key, value)
    });
  });
  return remaining_elements
};

var has_element_where = function(elements, criterion){
  var element_matches = filter_elements(elements, criterion);
  if (element_matches.length > 0) {
    return true;
  } else {
    return false;
  }
}

var is_match = function(element, key, value){
  var i = 0;
  switch (key) {
    case 'type': return matches_key(value, element.type);
    case 'sensor': return matches_key(value, element.type);
    case 'connection_criteria':
      var valid_connections = element.connections.filter(connection_is_match, value) //feed in the entire hash of connection criteria
      if (valid_connections.length > 0) {return true} else {return false}
    default:
  }
}

var connection_is_match = function(connection){  //'this' is the criterion
  var this_is_a_match = true;
  $.each(this, function(connection_key, connection_value) {
    switch (connection_key) {
      case 'connection_type':
        this_is_a_match *= matches_key(connection_value, connection.type); //yes, you can multiply booleans
        break;
      case 'connected_to':
        if (connection_value == 'any') {
          var re = new RegExp(/[0-9]+/)
          this_is_a_match *= re.exec(connection.connected_to)
        } else {
          this_is_a_match *= matches_key(connection_value, connection.connected_to);
          break;
        }
    }
  });
  return this_is_a_match;
}
var matches_key = function(find_this, find_in){
  var re = new RegExp(''+find_this)
  if (re.exec(find_in)) {return true;} else {return false}
}