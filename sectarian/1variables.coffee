acc = 0.6
decel = 0.9
asteroidSpeed = 1.5
asteroidDecel = 0.97
score = 0
alive = true
canvas = document.getElementById("myCanvas")
canvasId = "myCanvas"
ctx = canvas.getContext("2d")
gameOver = false
gameMode = 'normal'
player = ""
projectiles = []
currentMousePos = {x: -1, y: -1}

currentAsteroids = 2
maxAsteroids = 2

level = 1
myBulletSpeed = 5
theirBulletSpeed = 1.5
chanceShoot = 0.007
seeking = 0.2
tatChance = 0.3
bounceChance = 0.2
instability = 0.01

firstTime = true