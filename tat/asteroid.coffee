class Asteroid extends Circle
  constructor: (@x, @y, @radius = 13) ->
    this.dx = Math.random() * asteroidSpeed
    this.dy = Math.random() * asteroidSpeed
    this.bounce = true
    this.danger = true
    this.asteroid = true

  draw: ->
    if Math.random() < chanceShoot
      revengeBullet(this)
    super "#614E3D"
    return

asteroidFactory = (num) ->
  for i in [1..Math.floor(num)]
    newAsteroid = new Asteroid(10, rand(canvas.height))
    projectiles.push(newAsteroid)
#    asteroids.push(newAsteroid)
  return