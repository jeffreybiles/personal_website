rand = (max) ->
  Math.ceil(Math.random()*max)

drawBackground = ->
  color = if player.charge > 0 then '#CCA981' else '#95ACB4'
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)


Key =
  _pressed: {},

  LEFT: 37 || 65,
  A: 65,
  UP: 38,
  W: 87,
  RIGHT: 39,
  D: 68,
  DOWN: 40,
  S: 83,
  SPACE: 32,

  isDown: (keyCode) ->
    this._pressed[keyCode]
  onKeydown: (event) ->
    this._pressed[event.keyCode] = true
  onKeyup: (event) ->
    delete this._pressed[event.keyCode]
