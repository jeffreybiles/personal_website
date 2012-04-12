acc = 0.6
decel = 0.9
asteroidSpeed = 1.5
asteroidDecel = 0.97
health = 100
alive = true
canvas = document.getElementById("myCanvas")
canvasId = "myCanvas"
ctx = canvas.getContext("2d")
gameOver = false
gameMode = 'normal'
player = ""
projectiles = []
currentMousePos = {x: -1, y: -1}
friendly = false
dedicated = false

currentAsteroids = 2
maxAsteroids = 2

level = 1
myBulletSpeed = 3.5
theirBulletSpeed = 1.5
chanceShoot = 0.01
seeking = 0.3