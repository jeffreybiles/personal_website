text = (text, x, y, color = '#000', size = 16, style = 'sans-serif')->
  ctx.fillStyle = color
  ctx.font = "bold #{size}px #{style}"
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)


rand = (max, min = 0) ->
  Math.floor(Math.random()*(max - min) + min)

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

  text(winText, canvas.width/2 - 50, 30)

playMove = (position) ->
  y = boardHeight
  while y > 0 #tests every square starting from the bottom
    if grid[position][y] #if the square is taken
      y--
    else #if square is open
      grid[position][y] = if playerTurn then 'red' else 'black'
      testWin(position, y)
      return

testWin = (x, y) ->
  if isWin(x, y)
    if playerTurn
      winText = "YOU WIN!!!!!!!!!"
    else
      winText = "COMPUTER WINS!!!!!!!!!"
    setTimeout(startGame, 3000)
  else if catGame()
    winText =  "EVERYONE/NOONE WINS!!!!!!"
    setTimeout(startGame, 3000)
  else
    playerTurn = !playerTurn

isWin = (x, y) ->
  [upDown, leftRight, diag1, diag2] = scores(x, y)
  return upDown >= 4 or leftRight >= 4 or diag1 >= 4 or diag2 >= 4

scores = (x, y) ->
  myColor = grid[x][y]
  upDown = 1 + traceDirection(x, y, 0, 1, myColor) + traceDirection(x, y, 0, -1, myColor)
  leftRight = 1 + traceDirection(x, y, 1, 0, myColor) + traceDirection(x, y, -1, 0, myColor)
  diag1 = 1 + traceDirection(x, y, 1, 1, myColor) + traceDirection(x, y, -1, -1, myColor)
  diag2 = 1 + traceDirection(x, y, 1, -1, myColor) + traceDirection(x, y, -1, 1, myColor)
  return [upDown, leftRight, diag1, diag2]

catGame = ->
  cat = true
  for i in [1..boardWidth]
    cat = false unless grid[i][1]
  cat


traceDirection = (x, y, dx, dy, color) ->
  if 1 <= x + dx <= boardWidth && 1 <= y + dy <= boardHeight &&
      color == grid[x+dx][y+dy]
    return 1 + traceDirection(x + dx, y+ dy, dx, dy, color)
  else
    return 0

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

decideMove = ->
  if AI == 'random'
    return rand(boardWidth) + 1
  else if AI == 'easy'
    return lookAhead(2)
  else if AI == 'normal'
    return lookAhead(4)
  else if AI == 'hard'
    return lookAhead(8)
  else if AI == 'terminator'
    return lookAhead(12)

alphaBeta = (grid, depth, alpha, beta, color) ->
  if depth == 0 then return heuristic(color, grid)

  if player == 'black'

  else
#lookAhead = (steps) ->
#  Math.max(simulatePlayerMove())


heuristic = (color, grid) ->
  total = 0
  for i in [1..boardWidth]
    for j in [1..boardHeight]
      gridColor = grid[i][j]
      if gridColor
        scoresArray = scores(i, j)
        #if win:
        if scoresArray.some((length)-> length >= 4)
          if gridColor == 'black' then return Number.POSITIVE_INFINITY else return Number.NEGATIVE_INFINITY
        else
          squareScore = sum(scoresArray)
          console.log(squareScore)
          if gridColor == 'black'
            total += squareScore
          else if gridColor == 'red'
            total -= squareScore
  return total