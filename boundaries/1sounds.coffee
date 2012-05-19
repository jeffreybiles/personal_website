soundManager.url = 'soundmanagerv297a-20120318/swf'

soundManager.onready ->

  soundManager.createSound
    id:'hit'
    url:'hit.mp3'

  soundManager.createSound
    id:'defeat'
    url:'defeat.mp3'
