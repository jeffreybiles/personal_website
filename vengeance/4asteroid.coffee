##= require ./circle
class Asteroid extends Circle
  constructor: (@x, @y, @radius = 13) ->
    this.dx = Math.random() * asteroidSpeed
    this.dy = Math.random() * asteroidSpeed
    this.bounce = true
    this.danger = true
    this.asteroid = true

  draw: ->
    if Math.random() < chanceShoot*vengeance()
      revengeBullet(this)
    super "#614E3D"
    return

  move: ->
    if dedicated
      this.dx += (player.x - this.x)*0.001*seeking*vengeance()*Math.random()
      this.dy += (player.y - this.y)*0.001*seeking*vengeance()*Math.random()
      this.dx *= asteroidDecel
      this.dy *= asteroidDecel
    else
      this.x += (player.x - this.x)*seeking*vengeance()*(0.05 + Math.random()*0.05)
      this.y += (player.y - this.y)*seeking*vengeance()*(0.05 + Math.random()*0.05)
    super



asteroidFactory = (num) ->
  for i in [1..Math.floor(num)]
    newAsteroid = new Asteroid(10, rand(canvas.height))
    projectiles.push(newAsteroid)
  return