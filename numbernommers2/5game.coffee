mainLoop = (canvas) ->
  alive = true
  drawBackground()
  player.draw()
  drawEnemies()
  drawGrid()
  if canvasId == canvas.id
    setTimeout(mainLoop, 1000/60, canvas)
  return


window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = ->
  makeNumberGrid()
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1
  cooldown = false
  score = 0
  level = 1
  health = 3
  enemies = []
  player = new Player(3,3)
  newAnswer()
  enemyFactory(score)

  setTimeout(moveAllEnemies, frequency, canvas) #is this what's causing the blowup?
  mainLoop(canvas)



jQuery ($) ->
  $('#easy').click ->
    difficulty = 5
    startGame()
    return

  $('#normal').click ->
    difficulty = 11
    startGame()
    return

  $('#hard').click ->
    difficulty = 31
    startGame()
    return

  $('#add').click ->
    style = 'add'
    startGame()
    return

  $('#subtract').click ->
    style = 'subtract'
    startGame()
    return

#Make it so there are green squares as well as red squares.  If you touch the green ones you get a point and 1/4 of a health.
#If you touch the red ones you lose a health.  Always one green one, red ones start at one, grow every 3 points.

startGame()