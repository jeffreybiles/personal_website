class Enemy extends Square
  constructor: ->
    if Math.random() > 0.5
      @direction = 'horizontal'
      @x = 0
      @y = Math.ceil(Math.random()*boardHeight)
    else
      @direction = 'vertical'
      @y = 0
      @x = Math.ceil(Math.random()*boardWidth)
    @height = canvas.height/(boardHeight + 2)
    @width = canvas.width/(boardWidth + 2)
    @color = '#A07676'
    @stillAround = true

  move: ->
    if @direction == 'horizontal'
      @x += 1
      if @x > boardWidth + 1
        @stillAround = false
    else
      @y += 1
      if @y > boardHeight + 1
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