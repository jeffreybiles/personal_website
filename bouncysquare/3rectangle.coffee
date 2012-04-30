class Rectangle
  constructor: (@height, @width, @color, @points, @x, @y, @type, @speed) ->
    @angle = Math.random()*2*Math.PI
    @dx = Math.cos(@angle)*@speed
    @dy = Math.sin(@angle)*@speed
    @stillAlive = true
  #because javascript runs asynchronously, we cannot simply destroy the rectangle immediately after being hit.
  #Instead, we must wait and later run through the list to check which ones are no longer alive
  #Of course, "immediate" is relative.  It will seem immediate enough to the player.

  draw: ->
    ctx.fillStyle = @color
    ctx.fillRect(@x, @y, @width, @height)

  #returns true if click in inside the rectangle
  isInRange: (clickX, clickY) ->
    @x < clickX < @x + @width &&
      @y < clickY < @y + @height

  onClick: ->
    if @points > 0
      score += @points
      timer = maxTimer
      changeBasedOnScore()
    else
      health -= 1
    #because javascript runs asynchronously, we cannot simply destroy the rectangle immediately after being hit.
    #Instead, we must wait and later run through the list to check which ones are no longer alive
    #Of course, "immediate" is relative.  It will seem immediate enough to the player.
    @stillAlive = false

  move: ->
    @x += @dx
    @y += @dy
    #bouncing
    if @x <= 0
      @x=0
      @dx *= -1
    if @y <= 0
      @y=0
      @dy *= -1
    if @x >= canvas.width - @width
      @x = canvas.width - @width
      @dx *= -1
    if @y >= canvas.height - @height
      @y = canvas.height - @height
      @dy *= -1

class smallBox extends Rectangle
  constructor: (x, y) ->
    super 16, 16, 'black', 3, x, y, 'small', 2*speedMultiplier

class mediumBox extends Rectangle
  constructor: (x, y) ->
    super 24, 24, 'black', 2, x, y, 'medium', 1.5*speedMultiplier

class largeBox extends Rectangle
  constructor: (x, y) ->
    super 36, 36, 'black', 1, x, y, 'large', 1*speedMultiplier

class scaryRedThing extends Rectangle
  constructor: (x, y) ->
    super 10, 100, 'red', -1, x, y, 'scary', 1.5*speedMultiplier

rectangleFactory = (type, number) ->
  for i in [1..number]
    x = Math.random()*canvas.width
    y = Math.random()*canvas.height
    newRectangle = switch type
      when 'small'
        new smallBox(x, y)
      when 'medium'
        new mediumBox(x, y)
      when 'large'
        new largeBox(x, y)
      when 'scary'
        new scaryRedThing(x, y)

    rectangles.push(newRectangle)