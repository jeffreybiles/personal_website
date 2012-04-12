Goal = (x, y, radius) ->
  this.x = x
  this.y = y
  this.radius = radius
  this.goal = true

Goal.prototype = new Circle()

Goal.prototype.move = ->
  return