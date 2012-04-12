Triangle = (x, y, angle, height = 30, width = 20) ->
  this.x = x
  this.y = y
  this.angle = angle
  this.height = height
  this.width = width
  this.speed = 0


Triangle.prototype.draw = ->
    x = this.x
    y = this.y
    angle = this.angle
    height = this.height
    width = this.width
    toTop = [Math.cos(angle) * height/2, Math.sin(angle)*height/2]
    toSide = [Math.cos(angle + Math.PI/2)*width/2, Math.sin(angle + Math.PI/2)*width/2]
    topPoint = [x + toTop[0], y + toTop[1]]
    leftPoint = [x + toSide[0] - toTop[0], y + toSide[1] - toTop[1]]
    rightPoint = [x - toSide[0] - toTop[0], y - toSide[1] - toTop[1]]
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.moveTo(topPoint[0], topPoint[1])
    ctx.lineTo(leftPoint[0], leftPoint[1])
    ctx.lineTo(rightPoint[0], rightPoint[1])
    ctx.moveTo(topPoint[0], topPoint[1])
    ctx.fill()
    return

Triangle.prototype.update = ->
    if gameMode == 'normal' || gameMode == 'spook'
      if (Key.isDown(Key.UP)) then this.speed += shipAcc
      if (Key.isDown(Key.DOWN)) then this.speed -= shipAcc/2
    else
      this.speed += shipAcc
    if (Key.isDown(Key.LEFT)) then this.angle -= spin
    if (Key.isDown(Key.RIGHT)) then this.angle += spin
    this.speed *= shipDecel
    return

Triangle.prototype.move = ->
  this.bounding()
  this.detectCollision(asteroid) for asteroid in asteroids
  this.x += this.speed * Math.cos(this.angle)
  this.y += this.speed * Math.sin(this.angle)
  return

Triangle.prototype.detectCollision = (object) ->
  if object.danger && withinRadius(this, object)
    health -= 1
    alive = false
  if object.goal && withinRadius(this, object)
    health +=1
    level +=1
    alive = false
  return

Triangle.prototype.bounding = -> bounding(this)


