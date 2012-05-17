var not_what_I_mint_events = function(){
  var elements = getElements();

  if (!has_element_where(elements, not('', ''))){
    createSpeechBubble(filter_elements(elements, lightbulb('')), "We'll be using the NOT operator.  Whatever is put into it comes out the opposite!")
  }

  else if (filter_elements(elements, not('', '')).length > 1){
    createSpeechBubble(filter_elements(elements, not('', ''))[0], "We'll only need one NOT operator for this.")
  }

  else if (has_element_where(elements, not('incoming', 'empty'))){
    var operator_input = find_incoming(filter_elements(elements, not('incoming', 'empty'))[0])
    var sensor_output = find_outgoing(filter_elements(elements, sensor('mint', ''))[0])
    highlightSection(operator_input, true)
    highlightSection(sensor_output, true)
    createSpeechBubble(operator_input, "Great!  Now connect the mint sensor to the input of the NOT operator") ;
  }

  else if (has_element_where(elements, not('incoming', 'any')) &&
      (has_element_where(elements, not('outgoing', 'empty')) ||
        has_element_where(elements, lightbulb('empty')))){
    //if the first part of the operator is filled in, but either the outgoing part of the NOT operator or the incoming part of the lightbulb is still empty
    var operator_output = find_outgoing(filter_elements(elements, not('outgoing', 'empty'))[0])
    var lightbulb_input = find_incoming(filter_elements(elements, lightbulb('empty')))
    highlightSection(operator_output, true)
    highlightSection(lightbulb_input, true)
    createSpeechBubble(operator_output, "Now just finish it off.")
  }
}