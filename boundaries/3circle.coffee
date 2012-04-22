class Circle

  move: ->
    @dx *= decel
    @dy *= decel
    if 0 < @y < canvas.height && 0 < @x < canvas.width
      @draw()
    else
      @stillAlive = false
      loadAndPlaySound('defeat.ogg') #second parameter as a backup?

  draw: ->
    ctx.fillStyle = @color
    ctx.beginPath()
    ctx.arc(@x,@y, nucleusRad, 0, Math.PI * 2, false);
    ctx.fill()

class Nucleus extends Circle
  constructor: (@x, @y, @radius, @isPlayer, @color = 'black', @nucleusColor = '#A8652D') ->
    @angle = 0
    @dx = 0
    @dy = 0
    @stillAlive = true

  move: ->
    @angle += angleChangeRate/(30 + @radius)
    @x += @dx
    @y += @dy
    @electronX = @x + Math.cos(@angle)*@radius
    @electronY = @y + Math.sin(@angle)*@radius
    super

  draw: ->
    ctx.fillStyle = @nucleusColor
    ctx.beginPath()
    ctx.arc(@electronX, @electronY, electronRad, 0, Math.PI *2, false)
    ctx.fill()
    super



class Player extends Nucleus
  constructor: (x, y, radius) ->
    super(x, y, radius, true)

  update: ->
    if (Key.isDown(Key.UP) || Key.isDown(Key.W)) then @dy -= playerAcceleration
    if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) then @dy += playerAcceleration
    if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) then @dx -= playerAcceleration
    if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) then @dx += playerAcceleration
    if (Key.isDown(Key.SPACE))
      @radius += radChangeRate if @radius < radMax
    else if @radius > nucleusRad + electronRad + 1
      @radius -= radChangeRate

class Enemy extends Nucleus
  constructor: (x, y, radius) ->
    @outward = true
    super(x, y, radius, false, '#777777', '#333333')

  update: ->
    @dx += (player.x - @x) * 0.00035 * ((1.2 + level/10) - enemies.length/numEnemies())
    @dy += (player.y - @y) * 0.00035 * ((1.2 + level/10) - enemies.length/numEnemies())
    if Math.random() < 0.05
      @outward = !@outward
    if @outward
      @radius += radChangeRate if @radius < radMax
    else
      @radius -= radChangeRate if @radius > nucleusRad + electronRad + 1

enemyFactory = (number) ->
  enemies = []
  for i in [1..number]
    enemies.push(new Enemy(rand(canvas.width), rand(canvas.height), 20))


