acc = 0.6
decel = 0.9
asteroidSpeed = 1.5
health = 5
alive = true
canvas = document.getElementById("myCanvas")
canvasId = "myCanvas"
ctx = canvas.getContext("2d")
gameOver = false
gameMode = 'terror'
player = ""
asteroids = []
bullets = []
projectiles = []
newProjectiles = []
currentMousePos = {x: -1, y: -1}
friendly = false

level = 1
myBulletSpeed = 4
theirBulletSpeed = 3.5
chanceShoot = 0.01
tatChance = 1

firstTime = true