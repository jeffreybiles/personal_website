class Rectangle
  constructor: (@height, @width, @color, @points, @x, @y, @type, dx = null, dy = null) ->
    @dx = dx || Math.random()*maxSpeed
    @dy = dy || Math.random()*maxSpeed
    @alive = true
  #because javascript runs asynchronously, we cannot simply destroy the rectangle immediately after being hit.
  #Instead, we must wait and later run through the list to check which ones are no longer alive
  #Of course, "immediate" is relative.  It will seem immediate enough to the player.

  draw: ->
    ctx.fillStyle = @color
    ctx.fillRect(@x, @y, @width, @height)

  #returns true if click in inside the rectangle
  isInRange: (clickX, clickY) ->
    @x < clickX < @x + @width &&
      @y < clickY < @y + height

  onClick: ->
    if @points > 0
      score += @points
    else
      health -= 1
    #because javascript runs asynchronously, we cannot simply destroy the rectangle immediately after being hit.
    #Instead, we must wait and later run through the list to check which ones are no longer alive
    #Of course, "immediate" is relative.  It will seem immediate enough to the player.
    @alive = false

  move: ->
    @x += @dx
    @y += @dx
    #should there be bouncing off the edges?

class smallBox extends Rectangle
  constructor: (x, y) ->
    super 16, 16, 'black', 1, x, y, 'small'

class mediumBox extends Rectangle
  constructor: (x, y) ->
    super 24, 24, 'black', 2, x, y, 'medium'

class largeBox extends Rectangle
  constructor: (x, y) ->
    super 36, 36, 'black', 3, x, y, 'large'

class scaryRedThing extends Rectangle
  constructor: (x, y) ->
    super 10, 100, 'red', -1, x, y, 'scary'

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