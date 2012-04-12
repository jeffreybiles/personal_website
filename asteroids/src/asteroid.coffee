Asteroid = (x, y, radius) ->
  this.x = x
  this.y = y
  this.radius = radius

Asteroid.prototype = new Circle()
Asteroid.prototype.danger = true


asteroidFactory = (num) ->
  for i in [1..num]
    asteroids.push(new Asteroid(rand(canvas.width), rand(canvas.height), 10))
  return