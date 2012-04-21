canvas = document.getElementById("myCanvas")
canvasId = "myCanvas"
ctx = canvas.getContext("2d")

boardHeight = 7
boardWidth = 7
squareHeight = canvas.height / (boardHeight + 2)
squareWidth = canvas.width / (boardWidth + 2)

playerPosition = 1
gameMode = 'normal'
playerTurn = true
grid = []
winner = null
red = 'red'
black = 'black'
orange = 'orange'
bgColor = 'green'
winText = ''

AI = 'random'