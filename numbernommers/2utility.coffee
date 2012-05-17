
text = (text, x, y, color = '#000', size = 18, style = 'sans-serif')->
  ctx.fillStyle = color
  ctx.font = "bold #{size}px #{style}"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
  return

newEquation = ->
  "#{rand(difficulty)} + #{rand(difficulty)}"

makeNumberGrid = ->
  numbers.length = 0
  for i in [1..boardWidth]
    numberColumn = []
    for j in [1..boardHeight]
      equation = newEquation()
      numberColumn[j] = equation
    numbers[i] = numberColumn

drawBackground = ->
  color = 200
  ctx.fillStyle = "rgb(#{color},#{color},#{color})"
  ctx.fillRect(0,0,canvas.width,canvas.height)

drawGrid = ->
  height = canvas.height/(boardHeight + 2)
  width = canvas.width/(boardWidth + 2)
  ctx.strokeStyle = "black"
  for i in [1..boardWidth]
    for j in [1..boardHeight]
      ctx.strokeRect(i*width, j*height, width, height)

      text(numbers[i][j], (i+0.5)*width, (j+0.5)*height)
  text("health: #{health}", 100, 40)
  text("score: #{score}", canvas.width - 100, 40)
  text("target: #{answer}", canvas.width/2, 40)
  return

cooldownTimer = ->
  cooldown = false


Key =
  _pressed: {},

  LEFT: 37,
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
    if event.keyCode == 32
      player.nom()
    else
      unless cooldown
        cooldown = true
        setTimeout( cooldownTimer, 70)
        player.move(event.keyCode)
  onKeyup: (event) ->
    delete this._pressed[event.keyCode]

rand = (max, min = 0) ->
  Math.floor(Math.random()*(max - min) + min)

newAnswer = ->
  i = rand(boardWidth, 1)
  j = rand(boardHeight, 1)
  answer = eval(numbers[i][j])