//when you call circuit_changed, we know the circuit has changed, and we only need to update things when this is called?
//and also when leverPushed() is called
var circuit_changed = function(){
 var script = scripts[get_current_level.script()]
 script.call() //is this the right syntax?
}

scripts = {
//  alldachocolate: alldachocolate_events,
//  or1: or1_events
}
