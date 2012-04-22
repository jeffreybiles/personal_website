canvas = document.getElementById("myCanvas")
canvasId = "myCanvas"
ctx = canvas.getContext("2d")


decel = 0.96
spikeSize = 10
nucleusRad = 15
electronRad = 7
radChangeRate = 2
radMax = 100
angleChangeRate = 15
hitSpeed = 15

otherSpeed = 1
level = 1
accelerationConstant = 0.0001
playerAcceleration = 0.20
maxVelocity = 1

player = ''
enemies = []