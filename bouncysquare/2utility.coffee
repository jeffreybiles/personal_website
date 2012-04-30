drawBackground = ->
  color = Math.round(256*timer/maxTimer)
  console.log(color)
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
  ctx.font = "bold #{letterHeight*2}px helvetica sans-serif"
  ctx.textBaseline = 'middle'
  ctx.fillText('GAME OVER', 25, 150)

changeBasedOnScore = ->
  if score >= 40
    speedMultiplier = 3
  else if score >= 30
    speedMultiplier = 2.5
    maxTimer = 10
  else if score >= 20
    speedMultiplier = 2
    maxTimer = 20
  else if score >= 10
    speedMultiplier = 1.5
    maxTimer = 30