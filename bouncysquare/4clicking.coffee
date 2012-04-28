getMousePos = (event) ->
  x = currentMousePos.x
  y = currentMousePos.y
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  if gameState == 'play'
    rectangles.forEach (rectangle) ->
      if rectangle.isInRange(x, y) then rectangle.onClick()
  if gameState == 'gameOver'
    gameState = 'play'
    startGame()




