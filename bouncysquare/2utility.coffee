drawBackground = ->
  color = 200 #this is somehow controlled by score/timer.  Not sure exactly how
  ctx.fillStyle = "rgb(#{color}, #{color}, #{color})"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  #do hearts

  #do score