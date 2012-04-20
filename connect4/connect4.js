(function() {
  var Key, bgColor, black, boardHeight, boardWidth, canvas, canvasId, computerRound, ctx, drawGrid, gameMode, grid, mainLoop, makeEmptyGrid, orange, playMove, playerPosition, playerRound, playerTurn, rand, red, squareHeight, squareWidth, startGame, testWin, text, winner;

  canvas = document.getElementById("myCanvas");

  canvasId = "myCanvas";

  ctx = canvas.getContext("2d");

  boardHeight = 7;

  boardWidth = 7;

  squareHeight = canvas.height / (boardHeight + 2);

  squareWidth = canvas.width / (boardWidth + 2);

  playerPosition = 1;

  gameMode = 'normal';

  playerTurn = true;

  grid = [];

  winner = null;

  red = 'red';

  black = 'black';

  orange = 'orange';

  bgColor = 'green';

  text = function(text, x, y, color, size, style) {
    if (color == null) color = '#000';
    if (size == null) size = 16;
    if (style == null) style = 'sans-serif';
    ctx.fillStyle = color;
    ctx.font = "bold " + size + "px " + style;
    ctx.textBaseline = 'middle';
    return ctx.fillText(text, x, y);
  };

  rand = function(max, min) {
    if (min == null) min = 0;
    return Math.floor(Math.random() * (max - min) + min);
  };

  makeEmptyGrid = function() {
    var i, j, _results;
    _results = [];
    for (i = 1; 1 <= boardWidth ? i <= boardWidth : i >= boardWidth; 1 <= boardWidth ? i++ : i--) {
      grid[i] = [];
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (j = 1; 1 <= boardHeight ? j <= boardHeight : j >= boardHeight; 1 <= boardHeight ? j++ : j--) {
          _results2.push(grid[i][j] = null);
        }
        return _results2;
      })());
    }
    return _results;
  };

  drawGrid = function() {
    var color, i, j;
    color = 200;
    ctx.fillStyle = "rgb(" + color + "," + color + "," + color + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (i = 1; 1 <= boardWidth ? i <= boardWidth : i >= boardWidth; 1 <= boardWidth ? i++ : i--) {
      for (j = 1; 1 <= boardHeight ? j <= boardHeight : j >= boardHeight; 1 <= boardHeight ? j++ : j--) {
        ctx.fillStyle = orange;
        ctx.fillRect(i * squareWidth, j * squareHeight, squareWidth, squareHeight);
        if (grid[i][j] === 'red') {
          ctx.fillStyle = red;
        } else if (grid[i][j] === 'black') {
          ctx.fillStyle = black;
        } else {
          ctx.fillStyle = bgColor;
        }
        ctx.beginPath();
        ctx.arc((i + 0.5) * squareWidth, (j + 0.5) * squareHeight, squareHeight / 2.2, 0, Math.PI * 2, false);
        ctx.fill();
      }
    }
    if (playerTurn) {
      ctx.fillStyle = red;
      ctx.beginPath();
      ctx.arc((playerPosition + 0.5) * squareWidth, 0.5 * squareHeight, squareHeight / 2.2, 0, Math.PI * 2, false);
      return ctx.fill();
    }
  };

  playMove = function(position) {
    var y;
    y = boardHeight;
    while (y > 0) {
      if (grid[position][y]) {
        y--;
      } else {
        grid[position][y] = playerTurn ? 'red' : 'black';
        testWin();
        playerTurn = !playerTurn;
        return;
      }
    }
  };

  testWin = function() {
    return false;
  };

  Key = {
    _pressed: {},
    LEFT: 37,
    A: 65,
    RIGHT: 39,
    D: 68,
    SPACE: 32,
    ENTER: 13,
    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },
    onKeydown: function(event) {
      if (playerTurn) {
        this._pressed[event.keyCode] = true;
        if (event.keyCode === 32 || event.keyCode === 13) {
          return playMove(playerPosition);
        } else if (event.keyCode === 37 || event.keyCode === 65) {
          if (playerPosition > 1) return playerPosition--;
        } else if (event.keyCode === 39 || event.keyCode === 68) {
          if (playerPosition < boardWidth) return playerPosition++;
        }
      }
    },
    onKeyup: function(event) {
      return delete this._pressed[event.keyCode];
    }
  };

  mainLoop = function(canvas) {
    drawGrid();
    if (canvasId === canvas.id) setTimeout(mainLoop, 1000 / 60, canvas);
  };

  playerRound = function(canvas) {
    drawGrid();
    if (playerTurn) {
      return setTimeout(playerRound, 1000 / 60, canvas);
    } else {
      return computerRound(canvas);
    }
  };

  computerRound = function(canvas) {
    var decision;
    console.log('start of computer round');
    drawGrid();
    decision = rand(boardWidth) + 1;
    console.log('decision made');
    playMove(decision);
    return playerRound(canvas);
  };

  window.addEventListener('keyup', (function(event) {
    Key.onKeyup(event);
    event.preventDefault();
    return false;
  }), false);

  window.addEventListener('keydown', (function(event) {
    Key.onKeydown(event);
    event.preventDefault();
    return false;
  }), false);

  startGame = function() {
    var oldCanvas;
    canvasId = Math.random().toString();
    oldCanvas = $('#holdsMyGame canvas').remove();
    $('#holdsMyGame').html("<canvas id='" + canvasId + "' width=" + oldCanvas[0].width + " height=" + oldCanvas[0].height + "></canvas>");
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    canvas.tabIndex = 1;
    makeEmptyGrid();
    playerTurn = true;
    return playerRound(canvas);
  };

  startGame();

}).call(this);
