playerRound = (canvas) ->
  drawGrid()
  if playerTurn
    setTimeout(playerRound, 1000/60, canvas)
  else
    computerRound(canvas)

computerRound = (canvas) ->
  drawGrid()
  decision = rand(boardWidth) + 1
  playMove(decision)
  playerRound(canvas)


window.addEventListener 'keyup', ((event) -> Key.onKeyup(event); event.preventDefault(); return false), false
window.addEventListener 'keydown', ((event) -> Key.onKeydown(event); event.preventDefault(); return false), false

startGame = ->
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1
  setTimeout( winText = '', 3000)

  makeEmptyGrid()

  playerTurn = true

  playerRound(canvas)

startGame()