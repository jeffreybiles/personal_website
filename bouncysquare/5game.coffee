mainLoop = (canvas) ->
  drawBackground()
  rectangle.move() for rectangle in rectangles
  rectangle.draw() for rectangle in rectangles

  #now splice out any dead rectangles
  i = 0
  while i < rectangles.length
    currentBox = rectangles[i]
    if currentBox.stillAlive
      i++
    else
      type = currentBox.type
      rectangles.splice(i, 1)
      rectangleFactory(type, 1)

  #count down
  timer -= 1/60

  if health <= 0 || timer <= 0
    gameState = 'gameOver'
    gameOver()
  else
    setTimeout(mainLoop, 1000/60, canvas)

gameOver = ->
  drawGameOverScreen()

startGame = ->

  #reset some important variables
  maxTimer = 60
  timer = maxTimer
  speedMultiplier = 1
  score = 0
  health = maxHealth
  rectangles = []

  #make yourself some rectangles
  rectangleFactory('small', numSmall)
  rectangleFactory('medium', numMedium)
  rectangleFactory('large', numLarge)
  rectangleFactory('scary', numScary)

  #and go!
  mainLoop(canvas)

#put in jQuery click events!  These are crucial to the game!

jQuery ($) ->

  $(document).mousemove (event) ->
    currentMousePos = {
      x: event.pageX,
      y: event.pageY
    }

$(document).mousedown(getMousePos)
canvas = resize(canvas)
speedMultiplier *= canvas.width/320
startGame()