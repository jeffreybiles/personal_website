canvas = document.getElementById("myCanvas")
canvasId = "myCanvas"
ctx = canvas.getContext("2d")
currentMousePos = [0, 0]

score = 0
maxHealth = 3
health = 3
maxSpeed = 2
maxTimer = 60
timer = 60
speedMultiplier = 1
imprecision = 4

numSmall = 4
numMedium = 4
numLarge = 4
numScary = 4

rectangles = []

heartHeight = 15
letterHeight = 15
heartColor = '#456789'

gameState = 'intro'
numIntroSlides = 8
currentIntroSlide = 1
introBarHeight = canvas.height * 0.3
introButtonsStart = 10
introButtonsWidth = canvas.width * 0.7
