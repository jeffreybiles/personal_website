##= require ./bullet
##= require ./asteroid
##= require ./player

mainLoop = (canvas) ->
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
          score += level
          currentAsteroids = asteroidsLeft()
    else i++
  spliceBullets();
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
  asteroidFactory(level + Math.pow(level, 1.6))
  currentAsteroids = asteroidsLeft()
  maxAsteroids = asteroidsLeft()
  mainLoop(canvas)
  return

jQuery ($) ->
  $('#normal').click ->
    level = 1
    myBulletSpeed = 5
    theirBulletSpeed = 1.5
    chanceShoot = 0.005
    seeking = 0.2
    tatChance = 0.25
    bounceChance = 0.15
    instability = 0.01
    startGame('normal')
    return

  $('#hard').click ->
    level = 1
    myBulletSpeed = 5
    theirBulletSpeed = 1.5
    chanceShoot = 0.01
    seeking = 0.3
    tatChance = 0.5
    bounceChance = 0.3
    instability = 0.01
    startGame('hard')
    return

  $('#reality').click ->
    level = 1
    myBulletSpeed = 3
    theirBulletSpeed = 3
    chanceShoot = 0.015
    seeking = 0.4
    tatChance = 0.6
    bounceChance = 0.4
    instability = 0.03
    startGame('reality')
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

$(document).mousedown(getMousePos)
startGame(gameMode)

window.api = {
startGame: startGame
}
