withinRadius = (object1, object2) ->
  if object1.radius
    dist1 = object1.radius
  else if object1.width
    dist1 = object1.width/2
  else
    return false
  if object2.radius
    dist2 = object2.radius
  else if object2.width
    dist2 = object2.width/2
  else
    return false
  if findDistance(object1, object2) < dist1 + dist2
    true
  else
    false

findDistance = (object1, object2) ->
  if object1.x == object2.x && object1.y == object2.y
    return 2000
  else
    dx = object1.x - object2.x
    dy = object1.y - object2.y
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))


#bounding = (margin = 5) ->
#  if this.loop
#    if this.x < 0 then this.x += canvas.width
#    if this.x > canvas.width then this.x -= canvas.width
#    if this.y < 0 then this.y += canvas.height
#    if this.y > canvas.height then this.y -= canvas.height
#  else if this.stay || this.bounce
#    if this.bounce
#      if this.x < margin || this.x > canvas.width - margin
#        this.dx *= -1
#      if this.y < margin || this.y > canvas.height - margin
#        this.dy *= -1
#    if this.x < margin then this.x = margin
#    if this.x > canvas.width - margin then this.x = canvas.width - margin
#    if this.y < margin then this.y = margin
#    if this.y > canvas.height - margin then this.y = canvas.height - margin
#  return


Key =
  _pressed: {},

  LEFT: 37 || 65,
  A: 65,
  UP: 38,
  W: 87,
  RIGHT: 39,
  D: 68,
  DOWN: 40,
  S: 83,

  isDown: (keyCode) ->
    this._pressed[keyCode]
  onKeydown: (event) ->
    this._pressed[event.keyCode] = true
  onKeyup: (event) ->
    delete this._pressed[event.keyCode]


rand = (max, min = 0) ->
  Math.floor(Math.random()*(max - min) + min)

text = (text, x, y, color = '#000', size = 18, style = 'sans-serif')->
  ctx.fillStyle = color
  ctx.font = "bold #{size}px #{style}"
  ctx.textBaseline = 'bottom'
  ctx.fillText(text, x, y)
  return

asteroidsLeft = ->
  num = 0
  (num += 1 if projectile.asteroid) for projectile in projectiles
  num

drawBackground = () ->
  if health <= 0 then startGame(gameMode)
  color = 128
  ctx.fillStyle = "rgb(#{color},#{color},#{color})"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  numAsteroids = asteroidsLeft()
  if numAsteroids == 0
    level += 1
    startGame(gameMode)
  else
    text(asteroidsLeft(), 10, 590)
  return

getMousePos = (event) ->
  shootBullet()  unless gameMode == 'followingOrders' || gameMode == 'pacifist'

shootBullet = ->
  x = currentMousePos.x
  y = currentMousePos.y
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  projectiles.push(new Bullet(x, y))


collided = (thisObj, otherObj) ->
  if withinRadius(thisObj, otherObj) && otherObj.danger
    if thisObj.isPlayer && health > 0
      health -= 60
      if health < 0
        return true
      else return false
    else return true
  else return false

detectCollisions = (index, allObjects) ->
  i = index
  collisions = null
  thisObject = allObjects[i]
  i++
  while collisions == null && i < allObjects.length
    if collided(thisObject, allObjects[i])
      return i
    else
      i++
  null
