class Player extends Circle
  constructor: (@x = canvas.width/2, @y = canvas.height/2, @radius = 10, @health = 100) ->
    this.bounce = true
    this.danger = true
    this.dx = 0
    this.dy = 0
    this.isPlayer = true

  update: ->
    if (Key.isDown(Key.UP) || Key.isDown(Key.W)) then this.dy -= acc
    if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) then this.dy += acc
    if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) then this.dx -= acc
    if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) then this.dx += acc
    this.dy *= decel
    this.dx *= decel
    return

  draw: -> super '#B5A18F'