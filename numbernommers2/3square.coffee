class Square
  constructor: (@x, @y) ->
    @height = canvas.height/(boardHeight + 2)
    @width = canvas.width/(boardWidth + 2)
    @color = '#938493'

  draw: (fillStyle = @color) ->
    x = @x * @width
    y = @y * @height
    ctx.fillStyle = fillStyle
    ctx.fillRect(x, y, @width, @height)
    return
