##= require ./circle
class Asteroid extends Circle
  constructor: (@x, @y, @radius = 13) ->
    this.dx = Math.random() * asteroidSpeed
    this.dy = Math.random() * asteroidSpeed
    this.bounce = 1
    this.danger = true
    this.asteroid = true

  draw: ->
    multiplier = if this.dedicated then 5 else 1
    if Math.random() < chanceShoot*vengeance()*multiplier
      revengeBullet(this)
    super "#614E3D"
    return

  move: ->
    if vengeance()*instability > Math.random()
      this.dedicated = true
    if this.dedicated
      if (1-vengeance())*instability*0.7 > Math.random()
        this.dedicated = false
      this.dx += (player.x - this.x)*0.001*seeking*vengeance()*Math.random()
      this.dy += (player.y - this.y)*0.001*seeking*vengeance()*Math.random()
      this.dx *= asteroidDecel
      this.dy *= asteroidDecel
      this.x += this.dx
      this.y += this.dy
    else
#      this.x += (player.x - this.x)*seeking*vengeance()*(0.05 + Math.random()*0.05)
#      this.y += (player.y - this.y)*seeking*vengeance()*(0.05 + Math.random()*0.05)
      super



asteroidFactory = (num) ->
  for i in [1..Math.floor(num)]
    newAsteroid = new Asteroid(10, rand(canvas.height))
    projectiles.push(newAsteroid)
  return