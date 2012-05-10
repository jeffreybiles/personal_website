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
  while i < projectiles.length
    collidedWith = detectCollisions(i, projectiles)
    if collidedWith && !(projectiles[collidedWith].asteroid && projectiles[i].asteroid)
      projectiles.splice(collidedWith, 1) unless projectiles[collidedWith].isPlayer #this goes first because collidedWith will always be larger
      projectiles.splice(i, 1) unless projectiles[i].isPlayer
    else
      i++
  if gameMode == 'followingOrders' && Math.random() > 0.97
    shootBullet()
  if gameMode == 'devilMadeMe' && Math.random() > 0.92
    shootBullet()
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
  projectiles.length = 0
  player = new Player()
  projectiles.push(player)
  asteroidFactory(level + Math.pow(level, 1.5))
  health = 100 + 10*level
  if firstTime
    firstTime = false
    mainLoop(canvas)
  return

jQuery ($) ->
  $('#pacifist').click ->
    level = 1
    startGame('pacifist')
    return

  $('#normal').click ->
    level = 1
    startGame('normal')
    return

  $('#followingOrders').click ->
    level = 1
    startGame('followingOrders')
    return

  $('#devilMadeMe').click ->
    level = 1
    startGame('devilMadeMe')
    return

  $(document).mousemove (event) ->
    currentMousePos = {
      x: event.pageX,
      y: event.pageY
    }

$(document).mousedown(getMousePos)
startGame()

window.api = {
startGame: startGame
}
