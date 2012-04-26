mainLoop = (canvas) ->


  if canvas.id == canvasId
    setTimeout(mainLoop, 1000/60, canvas)


startGame = ->
  #This is a hack to keep there from being multiple canvases floating around
  canvasId = Math.random().toString()
  oldCanvas = $('#holdsMyGame canvas').remove()
  $('#holdsMyGame').html("<canvas id='#{canvasId}' width=#{oldCanvas[0].width} height=#{oldCanvas[0].height}></canvas>")
  canvas = document.getElementById(canvasId)
  ctx = canvas.getContext("2d")
  canvas.tabIndex = 1

  #reset some important variables
  timer = 30
  score = 0

  #make yourself some rectangles
  rectangleFactory('small', numSmall)
  rectangleFactory('medium', numMedium)
  rectangleFactory('large', numLarge)
  rectangleFactory('scary', numScary)

  #and go!
  mainLoop(canvas)


startGame()