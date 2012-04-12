##= require ./utility

class Circle
  constructor: (@x, @y, @radius) ->
    this.dx = 0
    this.dy = 0
    this.bounce = true
    this.danger = true
    this.alive = true
    return

  move: ->
    this.x += this.dx;
    this.y += this.dy;
    margin = 5
    if this.loop
      if this.x < 0 then this.x += canvas.width
      if this.x > canvas.width then this.x -= canvas.width
      if this.y < 0 then this.y += canvas.height
      if this.y > canvas.height then this.y -= canvas.height
    else if this.stay || this.bounce
      if this.bounce
        if this.x < margin || this.x > canvas.width - margin
          this.dx *= -1
        if this.y < margin || this.y > canvas.height - margin
          this.dy *= -1
      if this.x < margin then this.x = margin
      if this.x > canvas.width - margin then this.x = canvas.width - margin
      if this.y < margin then this.y = margin
      if this.y > canvas.height - margin then this.y = canvas.height - margin
    return

  draw: (fillStyle = 'white', shadow = false) ->
    x = this.x
    y = this.y
    radius = this.radius
    ctx.fillStyle = fillStyle;
    ctx.beginPath()
    ctx.arc(x,y, radius, 0, Math.PI * 2, false);
    if shadow
      ctx.arc(x - shadowX*2, y - shadowY*2, radius, 0, Math.PI *2, false)
    ctx.fill() unless this.invisible
    return

  update: ->
    this.x += this.dx
    this.y += this.dy
    return
