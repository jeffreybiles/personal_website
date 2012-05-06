getMousePos = (event) ->
  x = currentMousePos.x
  y = currentMousePos.y
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  if gameState == 'play'
    rectangles.forEach (rectangle) ->
      if rectangle.isInRange(x, y) then rectangle.onClick()
  if gameState == 'gameOver'
    navigateGameOver(x, y)
  if gameState == 'intro'
    navigateIntro(x, y)

navigateIntro = (x, y) ->
  if x < canvas.width/4
    soundManager.play('buttonSelect')
    previousSlide()
  else if x > 3*canvas.width/4
    soundManager.play('buttonSelect')
    nextSlide()
  else if y < introBarHeight
    soundManager.play('buttonSelect')
    startGame()

navigateGameOver = (x, y) ->
  if canvas.height*2/5 < y < canvas.width*3/5
    if canvas.width/3 < x < canvas.width/2
      #This is hitting the left button
      console.log(x, y, 'hitting the intro button!')
      gameState = 'intro'
      currentIntroSlide = 1
      showImageNumber(currentIntroSlide)
    else if canvas.width/2 < x < canvas.width*2/3
      #This is hitting the replay button
      gameState = 'play'
      startGame()


