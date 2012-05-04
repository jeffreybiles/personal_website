showImageNumber = (number) ->
  myImage = new Image()
  myImage.onload = ->
    myImage.width = canvas.width
    myImage.height = canvas.height*0.9
    ctx.drawImage(myImage, 0, introBarHeight, myImage.width, myImage.height)
    drawTopBar()
  myImage.src = "images/tt_introscreen_pic#{number}_u.gif"


drawTopBar = ->
  drawButtonCircles(introButtonsStart, introButtonsWidth)
  #call to high score here

drawButtonCircles = (start, width)->
  radius = Math.min(canvas.height*0.05, width/8)
  drawButton(start+width/4, radius*0.8)
  drawButton(start+width/2, radius)
  drawButton(start+3*width/4, radius*0.8)

nextSlide = ->
  if currentIntroSlide < numIntroSlides
    currentIntroSlide += 1
    showImageNumber(currentIntroSlide)
  else
    startGame()

previousSlide = ->
  if currentIntroSlide > 1
    currentIntroSlide -= 1
    showImageNumber(currentIntroSlide)

navigateIntro = (x, y) ->
  soundManager.play('buttonSelect')
  if 0 < y < introBarHeight
    if x < introButtonsStart + introButtonsWidth/3
      previousSlide()
    else if x < introButtonsStart + introButtonsWidth*2/3
      startGame()
    else if x < introButtonsStart + introButtonsWidth
      nextSlide()
  else
    nextSlide()



drawButton = (x, radius, color = 'black', url= null) ->
  if url

  else
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc(x, introBarHeight/2, radius, 0, Math.PI * 2, false);
    ctx.fill()
