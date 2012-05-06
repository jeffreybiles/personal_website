showImageNumber = (number) ->
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  myImage = new Image()
  myImage.onload = ->
    myImage.width = canvas.width
    myImage.height = canvas.height - introBarHeight
    ctx.drawImage(myImage, 0, introBarHeight, myImage.width, myImage.height)
    drawTopBar()
  myImage.src = "images/tt_introscreen_pic#{number}_u.gif"


drawTopBar = ->
  drawButtons()
  #call to high score here

drawButtons = () ->
  drawButtonImage('left', 0, 'Back') if currentIntroSlide > 1
  drawButtonImage('right', 0, 'Forward')
  drawButtonImage('center', 0, 'Play')

nextSlide = ->
  if currentIntroSlide < numIntroSlides
    currentIntroSlide += 1
    showImageNumber(currentIntroSlide)
  else
    startGame()

drawButtonImage = (x, y, filename) ->
  myImage = new Image()
  myImage.onload = ->
    oldHeight = myImage.height
    myImage.height = introBarHeight
    myImage.width *= myImage.height/oldHeight

    if x == 'left' then x = 0
    if x == 'right' then x = canvas.width - myImage.width
    if x == 'center' then x = canvas.width/2 - myImage.width/2
    if x == 'center-left' then x = canvas.width/2 - myImage.width*3/2
    if x == 'center-right' then x =canvas.width/2 + myImage.width/2
    if y == 'center' then y = canvas.height/2 - myImage.height/2

    ctx.drawImage(myImage, x, y, myImage.width, myImage.height)
  myImage.src = "images/tt_#{filename}.gif"

previousSlide = ->
  if currentIntroSlide > 1
    currentIntroSlide -= 1
    showImageNumber(currentIntroSlide)

