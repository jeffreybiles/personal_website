//when you call circuit_changed, we know the circuit has changed, and we only need to update things when this is called?
//and also when leverPushed() is called
var circuit_changed = function(){
 var script = scripts[get_current_level.script()]
 script.call() //is this the right syntax?
}
window.testFirst = function(){
  all_my_chocolates_events()
}
var scripts = {
  'all_my_chocolates': all_my_chocolates_events,
  'a_bar_walks_into_my_tummy': a_bar_walks_into_my_tummy_events
}