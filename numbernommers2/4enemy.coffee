class Enemy extends Square
  constructor: ->
    @height = canvas.height/(boardHeight + 2)
    @width = canvas.width/(boardWidth + 2)
    @stillAround = true

    roll = Math.random()
    if roll < 0.4
      @type = 'horizontal'
      @x = 0
      @y = rand(boardHeight) + 1
      @color = '#906666'
    else if roll < 0.8
      @type = 'vertical'
      @y = 0
      @x = rand(boardWidth) + 1
      @color = '#C0A6A6'
    else if roll < 0.97
      @type = 'wander'
      @x = 0
      @y = rand(boardHeight) + 1
      @color = '#7D26CD'
    else
      @type = 'chase'
      @x = 0
      @y = rand(boardHeight) + 1
      @color = '#EE7621'


  move: ->
    switch @type
      when 'horizontal'
        @x += 1
      when 'vertical'
        @y += 1
      when 'wander'
        roll = Math.random()
        if roll < 0.25
          @x += 1
        else if roll < 0.5
          @x -= 1
        else if roll < 0.75
          @y += 1
        else
          @y -= 1
      else
        if @x > player.x
          @x -= 1
        else if @x < player.x
          @x += 1
        else if @y > player.y
          @y -= 1
        else
          @y += 1

    unless -1 < @x < boardWidth + 1 && -1 < @y < boardHeight + 1
      @stillAround = false

moveAllEnemies = (canvas) ->
  enemy.move() for enemy in enemies
  checkEnemies()
  if canvas.id == canvasId
    setTimeout(moveAllEnemies, frequency, canvas)

drawEnemies = ->
  for enemy in enemies
    enemy.draw()


enemyFactory = (num) ->
  if num <= 0
    return
  for i in [1..Math.floor(num)]
    newEnemy = new Enemy()
    enemies.push(newEnemy)
  return

checkEnemies = ->
  player.checkCollisions()
  i = 0
  while i < enemies.length
    if enemies[i].stillAround
      i++
    else
      enemies.splice(i, 1)
  enemyFactory(score/3 - enemies.length)
  if health <= 0
    startGame()