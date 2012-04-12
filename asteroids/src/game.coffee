mainLoop = (things, canvas) ->
  alive = true
  drawBackground()
  thing.draw() for thing in things
  thingy.move() for thingy in things
  thing2.update() for thing2 in things
  if canvasId == canvas.id
    if alive && gameOver == false
      setTimeout(mainLoop, 1000/60, things, canvas)
    else if gameOver == false
      startGame(gameMode)
    else
      level = 1
      health = 5
      gameOver = false
      startGame(gameMode)
  return

window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = (mode = 'normal') ->
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1
  gameMode = mode
  asteroids = []
  if gameMode == 'spook' || gameMode == 'hardSpook'
    goalPost = new Goal(canvas.width * Math.random(), canvas.height * Math.random(), 80)
  else
    goalPost = new Goal(canvas.width * 0.9, canvas.height * 0.9, 50)
  asteroids.push(goalPost)
  if gameMode == 'spook'
    asteroidFactory((level + 2)* 3)
  else
    asteroidFactory(level * 3)
  spaceship = new Triangle(20, 20, 0)
  mainLoop(Array.prototype.concat.apply([], [spaceship, asteroids ]), canvas)
  return

jQuery ($) ->
  $('#hardMode').click ->
    level = 1
    startGame('hard')
    shipAcc = 0.2
    asteroidDecel = 0.85
    return

  $('#normalMode').click ->
    level = 1
    shipAcc = 0.2
    startGame('normal')
    asteroidDecel = 0.9
    return

  $('#insaneMode').click ->
    level = 1
    startGame('insane')
    shipAcc = 0.27
    asteroidDecel = 0.94
    return

  $('#spookMode').click ->
    level = 1
    startGame('spook')
    shipAcc = 0.2
    asteroidDecel = 0.9
    return

  $('#hardSpookMode').click ->
    level = 1
    startGame('hardSpook')
    shipAcc = 0.2
    asteroidDecel = 0.8

startGame()

window.api = {
startGame: startGame
}
