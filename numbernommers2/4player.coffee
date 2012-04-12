class Player extends Square

  move: ->
    if (Key.isDown(Key.UP) || Key.isDown(Key.W)) then @y -= 1
    else if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) then @y += 1
    else if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) then @x -= 1
    else if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) then @x += 1

    if @y < 1 then @y = 1
    if @y > boardHeight then @y = boardHeight
    if @x < 1 then @x = 1
    if @x > boardWidth then @x = boardWidth
    checkEnemies()


  checkCollisions: ->
    if @isHit()
      health -= 1

  isHit: ->
    for enemy in enemies
      if @y == enemy.y && @x == enemy.x
        enemy.stillAround = false
        return true
    return false

  nom: ->
    equation = numbers[@x][@y]
    oldColor = @color
    if eval(equation) == answer
      @color = 'green'
      setTimeout(revertColor, 300, oldColor)
      score += 1
      health += 0.25
      numbers[@x][@y] = newEquation()
      newAnswer()
    else
      @color = 'red'
      setTimeout(revertColor, 300, oldColor)
      health -= 1

revertColor = (color) ->
  player.color = color