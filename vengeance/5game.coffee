##= require ./bullet
##= require ./asteroid
##= require ./player

mainLoop = (canvas) ->
  if alive
    window.requestAnimationFrame(mainLoop, canvas)
  else
    startGame(gameMode)
  alive = true
  drawBackground()
  thing.draw() for thing in projectiles
  thingy.move() for thingy in projectiles
  thing2.update() for thing2 in projectiles
  i = 0
  skip = []
  while i < projectiles.length
    collidedWith = detectCollisions(i, projectiles, skip)
    skip.push(collidedWith)

    if collidedWith
      if !(projectiles[collidedWith].asteroid && projectiles[i].asteroid)
        if (projectiles[i].asteroid && projectiles[collidedWith].mine) ||
                     (projectiles[collidedWith].asteroid && projectiles[i].mine)
          projectiles.splice(collidedWith, 1)
          projectiles.splice(i, 1)
          currentAsteroids = asteroidsLeft()
    else i++
  spliceBullets();
  return

spliceBullets = ->
  i = 0
  while i < projectiles.length
    shot = projectiles[i]
    if shot.bullet && (shot.x < 0 || shot.x > canvas.width || shot.y < 0 || shot.y > canvas.height)
      projectiles.splice(i, 1)
    else
      i++
window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = (mode = gameMode) ->
  console.log("starting the game!")
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
  asteroidFactory(level + Math.pow(level, 1.8))
  health = 100 + 10*level
  currentAsteroids = asteroidsLeft()
  maxAsteroids = asteroidsLeft()
  console.log("About to call main loop")
  if first
    first = false
    mainLoop(canvas)
  return


jQuery ($) ->
  $('#normal').click ->
    level = 1
    myBulletSpeed = 3.5
    theirBulletSpeed = 1.5
    chanceShoot = 0.01
    seeking = 0.3
    startGame('normal')
    return

  $('#feud').click ->
    level = 1
    myBulletSpeed = 4
    theirBulletSpeed = 3
    chanceShoot = 0.04
    seeking = 0.8
    startGame('feud')
    return

  $('#occupation').click ->
    level = 1
    myBulletSpeed = 4
    theirBulletSpeed = 1.2
    chanceShoot = 0.1
    seeking = 0.4
    startGame('occupation')
    return

  $(document).mousemove (event) ->
    currentMousePos = {
      x: event.pageX,
      y: event.pageY
    }

  $('#dedicated').click ->
    level = 1
    dedicated = true
    startGame()

  $('#citizen-soldier').click ->
    level = 1
    dedicated = false
    startGame()

console.log("About to start the game!")
$(document).mousedown(getMousePos)
startGame(gameMode)

window.api = {
startGame: startGame
}
