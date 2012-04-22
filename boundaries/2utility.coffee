rand = (max) ->
  Math.ceil(Math.random()*max)

numEnemies = ->
  return Math.floor(Math.pow(level, 1.8))

drawBackground = ->
  ctx.fillStyle = '#CCA981'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

loadAndPlaySound = (fileName) ->
  sound = document.createElement('audio')
  sound.setAttribute('src', "#{fileName}")
  sound.load()
  sound.play()

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
