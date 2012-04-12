mainLoop = (canvas) ->
  alive = true
  drawBackground()
  thing.draw() for thing in projectiles
  thingy.move() for thingy in projectiles
  thing2.update() for thing2 in projectiles
  i = 0
  while i < projectiles.length
    collidedWith = detectCollisions(i, projectiles)
    if collidedWith && !(projectiles[collidedWith].asteroid && projectiles[i].asteroid)
      if friendly || (projectiles[i].asteroid && projectiles[collidedWith].mine) ||
                     (projectiles[collidedWith].asteroid && projectiles[i].mine)
        projectiles.splice(collidedWith, 1)
        projectiles.splice(i, 1)
      else i++
    else i++
  if canvasId == canvas.id
    if alive && gameOver == false
      setTimeout(mainLoop, 1000/60, canvas)
    else if gameOver == false
      startGame(gameMode)
    else
      level = 1
      gameOver = false
      startGame(gameMode)
  return

window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = (mode = gameMode) ->
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1
  gameMode = mode
  projectiles.length = 0
  player = new Player()
  projectiles.push(player)
#  asteroids.push(player)
  asteroidFactory(level + Math.pow(level, 1.5))
  health = 100 + 10*level
  mainLoop(canvas)
  return

jQuery ($) ->
  $('#normal').click ->
    level = 1
    myBulletSpeed = 3.5
    theirBulletSpeed = 1.5
    tatChance = 0.3
    chanceShoot = 0
    startGame('normal')
    return

  $('#terror').click ->
    level = 1
    myBulletSpeed = 4
    theirBulletSpeed = 3.5
    chanceShoot = 0.01
    tatChance = 1
    startGame('terror')
    return

  $('#war').click ->
    level = 1
    myBulletSpeed = 4
    theirBulletSpeed = 0.8
    chanceShoot = 0.06
    tatChance = 0.4
    startGame('war')
    return

  $('#friendly').click ->
    level = 1
    friendly = true
    startGame()

  $('#fire').click ->
    level = 1
    friendly = false
    startGame()

  $(document).mousemove (event) ->
    currentMousePos = {
      x: event.pageX,
      y: event.pageY
    }

$(document).mousedown(getMousePos)
startGame(gameMode)

window.api = {
startGame: startGame
}
