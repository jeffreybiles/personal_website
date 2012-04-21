mainLoop = (canvas) ->
  drawBackground()
  player.update()
  player.move()
  charge.move() for charge in charges
  player.draw()
  charge.draw() for charge in charges
  if canvas.id == canvasId
    setTimeout(mainLoop, 1000/60, canvas)

window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = ->
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1

  player = new Circle(20, canvas.height/2, 2, true)
  chargeFactory(level*4)
  mainLoop(canvas)


level = 1
startGame()