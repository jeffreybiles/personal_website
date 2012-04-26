drawBackground = ->
  color = 200 #this is somehow controlled by score/timer.  Not sure exactly how
  ctx.fillStyle = "rgb(#{color}, #{color}, #{color})"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  #do hearts
  x = 5
  startY = (letterHeight+1)*4
  for i in [1..health]
    drawHeart(x, startY + i*(heartHeight + 5))

  #do score
  startY = letterHeight
  for i in [0..3]
    drawScoreNumber(x, startY  + letterHeight*i, score*Math.pow(10, i) / 1000)


drawHeart = (x, y) ->
  ctx.fillStyle = heartColor
  ctx.fillRect(x, y, heartHeight, heartHeight)

drawScoreNumber = (x, y, number) ->
  ctx.fillStyle = 'black'
  ctx.font = "bold #{letterHeight}px helvetica sans-serif"
  ctx.textBaseline = 'middle'
  ctx.fillText(number, x, y)
