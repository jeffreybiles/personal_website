drawBackground = ->
  color = Math.round(256*timer/maxTimer)
  ctx.fillStyle = "rgb(#{color}, #{color}, #{color})"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  #do hearts
  x = 5
  startY = (letterHeight+1)*4
  if health > 0
    for i in [1..health]
      drawHeart(x, startY + i*(heartHeight + 5))

  #do score
  startY = letterHeight
  for i in [0..3]
    drawScoreNumber(x, startY  + letterHeight*i, (score*Math.pow(10, i) / 1000) % 10)

  drawTimer(canvas.width - 50, 10)

drawTimer = (x, y) ->
  ctx.fillStyle = 'black'
  ctx.font = "bold #{letterHeight}px helvetica sans-serif"
  ctx.textBaseline = 'middle'
  ctx.fillText(Math.round(timer), x, y)

drawHeart = (x, y) ->
  ctx.fillStyle = heartColor
  ctx.fillRect(x, y, heartHeight, heartHeight)

drawScoreNumber = (x, y, number) ->
  ctx.fillStyle = 'black'
  ctx.font = "bold #{letterHeight}px helvetica sans-serif"
  ctx.textBaseline = 'middle'
  ctx.fillText(Math.floor(number), x, y)

drawGameOverScreen = ->
  ctx.fillStyle = 'white'
  ctx.font = "bold #{Math.floor(letterHeight*2*canvas.width/320)}px helvetica sans-serif"
  ctx.textBaseline = 'middle'
  ctx.fillText('GAME OVER', 25, 150)

changeBasedOnScore = ->
  speedMultiplier = (1 + score/50)*canvas.width/320
  maxTimer = 60 / (1 + score/60)

resize = (canvas = canvas) ->
  #three different methods needed because IE is silly
  if (document.body && document.body.offsetWidth)
    winW = document.body.offsetWidth
    winH = document.body.offsetHeight
  if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth )
    winW = document.documentElement.offsetWidth
    winH = document.documentElement.offsetHeight
  if (window.innerWidth && window.innerHeight)
    winW = window.innerWidth
    winH = window.innerHeight

  #equalize
  if winW > winH
    winW = winH
  else
    winH = winW

  if winH < 320 then winH = winW = 320
  #assign to canvas
  canvas.width = winW
  canvas.height = winH
  return canvas