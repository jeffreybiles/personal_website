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
  dx = object1.x - object2.x
  dy = object1.y - object2.y
  distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))



bounding = (object) ->
  if object.wrap
    if object.x < 0 then object.x += canvas.width
    if object.x > canvas.width then object.x -= canvas.width
    if object.y < 0 then object.y += canvas.height
    if object.y > canvas.height then object.y -= canvas.height
  else
    margin = 10
    if object.x < margin then object.x = margin #+= canvas.width
    if object.x > canvas.width - margin then object.x = canvas.width - margin #-= canvas.width
    if object.y < margin then object.y = margin #+= canvas.height
    if object.y > canvas.height - margin then object.y = canvas.height - margin #-= canvas.height
  return


Key =
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

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

drawBackground = () ->
  if health > 10 then health = 10
  if health <= 0 then gameOver = true
  color = health*25 + 5
  if color > 255 then color = 255
  if color < 0 then gameOver = true
  ctx.fillStyle = "rgb(#{color},#{color},#{color})"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  text(gameMode, 10, 590)
  return