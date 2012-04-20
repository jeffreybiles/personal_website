text = (text, x, y, color = '#000', size = 16, style = 'sans-serif')->
  ctx.fillStyle = color
  ctx.font = "bold #{size}px #{style}"
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)


rand = (max, min = 0) ->
  Math.floor(Math.random()*(max - min) + min)

#drawBackground = ->

makeEmptyGrid = ->
  for i in [1..boardWidth]
    grid[i] = []
    for j in [1..boardHeight]
      grid[i][j] = null

drawGrid = ->
  color = 200
  ctx.fillStyle = "rgb(#{color},#{color},#{color})"
  ctx.fillRect(0,0,canvas.width,canvas.height)

  for i in [1..boardWidth]
    for j in [1..boardHeight]
      ctx.fillStyle = orange
      ctx.fillRect(i*squareWidth, j*squareHeight, squareWidth, squareHeight)
      if grid[i][j] == 'red'
        ctx.fillStyle = red
      else if grid[i][j] == 'black'
        ctx.fillStyle = black
      else
        ctx.fillStyle = bgColor
      ctx.beginPath()
      ctx.arc((i+0.5)*squareWidth,(j+0.5)*squareHeight, squareHeight/2.2, 0, Math.PI * 2, false)
      ctx.fill()

  if playerTurn
    ctx.fillStyle = red
    ctx.beginPath()
    ctx.arc((playerPosition+0.5)*squareWidth,0.5*squareHeight, squareHeight/2.2, 0, Math.PI * 2, false)
    ctx.fill()

#
#  text("health: #{health}", 10, 30)
#  text("score: #{score}", 10, 50)
#  text("target: #{answer}", canvas.width - 150, 30)

playMove = (position) ->
  y = boardHeight
  while y > 0 #tests every square starting from the bottom
    if grid[position][y] #if the square is taken
      y--
    else #if square is open
      grid[position][y] = if playerTurn then 'red' else 'black'
      testWin()
      playerTurn = !playerTurn
      return

testWin = ->
  false #this obviously must change
  #should also test for pending cat's game

Key =
  _pressed: {},

  LEFT: 37,
  A: 65,
#  UP: 38,
#  W: 87,
  RIGHT: 39,
  D: 68,
#  DOWN: 40,
#  S: 83,
  SPACE: 32,
  ENTER: 13,

  isDown: (keyCode) ->
    this._pressed[keyCode]
  onKeydown: (event) ->
    if playerTurn
      this._pressed[event.keyCode] = true
      if event.keyCode == 32 or event.keyCode == 13
        playMove(playerPosition)
      else if event.keyCode == 37 or event.keyCode == 65
        if playerPosition > 1
          playerPosition--
      else if event.keyCode == 39 or event.keyCode == 68
        if playerPosition < boardWidth
          playerPosition++

  onKeyup: (event) ->
    delete this._pressed[event.keyCode]






