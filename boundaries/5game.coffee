mainLoop = (canvas) ->
  window.requestAnimationFrame(mainLoop, canvas)
  if enemies.length == 0
    level++
    startGame()
  if !player.stillAlive
    startGame()

  drawBackground()
  player.update()
  player.move()
  player.draw()
  enemy.update() for enemy in enemies
  enemy.move() for enemy in enemies
  enemy.draw() for enemy in enemies
  checkAllCollisions()

window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = ->
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1

  player = new Player(canvas.width/2, canvas.height/2, 20, true)
  enemyFactory(numEnemies())
  if firstTime
    firstTime == false
    mainLoop(canvas)


level = 1
startGame()