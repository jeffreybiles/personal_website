soundManager.url = 'soundmanagerv297a-20120318/swf'

soundManager.onready ->

  soundManager.createSound
    id:'boxHit'
    url:'sounds/tt_boxhit.wav'

  soundManager.createSound
    id:'buttonSelect'
    url:'sounds/tt_buttonselect.wav'

  soundManager.createSound
    id:'gameOver'
    url:'sounds/tt_gameover.wav'

  soundManager.createSound
    id:'heartLost'
    url:'sounds/tt_heartlost.wav'