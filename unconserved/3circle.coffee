class Circle

  constructor: (@x, @y, @charge, @isPlayer = false) ->
    @radius = Math.abs(@charge)*5
    if @isPlayer
      @color = if @charge > 0 then '#A8652D' else '#1B6565'
      @dx = @dy = 0
    else
      @color = if @charge > 0 then '#9A692C' else '#325F66'
      @dx = Math.random()*otherSpeed
      @dy = Math.random()*otherSpeed

  move: ->
    @x += @dx
    @y += @dy
    if @y < 0
      @y = 0
      @dy *= -1
    if @y > canvas.height
      @y = canvas.height
      @dy *= -1
    if @x < 0
      @x = 0
      @dx *= -1
    if @x > canvas.width
      @x = canvas.width
      @dx *= -1

  update: ->
    #from player
    if (Key.isDown(Key.UP) || Key.isDown(Key.W)) then @dy -= playerAcceleration
    if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) then @dy += playerAcceleration
    if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) then @dx -= playerAcceleration
    if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) then @dx += playerAcceleration
    #set this so it only happens on keyDown(once per press)
    if (Key.isDown(Key.SPACE))
      @charge *= -1
      @color = if @charge > 0 then '#A8652D' else '#1B6565'

    #from charges
    influenceX = 0
    influenceY = 0
    for charge in charges
      #do a partial pythagorean
      distanceX = @x - charge.x
      distanceY = @y - charge.y
      distanceSquared = Math.max(distanceX^2 + distanceY^2, 5)
      #now distribute the charge based on proportional distance.  This is where most accuracy is lost
      influenceX += charge.charge*distanceX/distanceSquared
      influenceY += charge.charge*distanceY/distanceSquared
    @dx -= influenceX*@charge*accelerationConstant
    @dy -= influenceY*@charge*accelerationConstant
    if @x >= canvas.width
      console.log(@x, @y, @dx, @dy, canvas.width, level)
      level += 1
      startGame()

  draw: ->
    ctx.fillStyle = @color
    ctx.beginPath()
    ctx.arc(@x,@y, @radius, 0, Math.PI * 2, false);
    ctx.fill()

chargeFactory = (number) ->
  charges = []
  for i in [1..number]
    charges.push(new Circle(rand(canvas.width - 50) + 50, rand(canvas.height), rand(10) - 5))

