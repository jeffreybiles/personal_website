$(document).ready ->
  width = 24
  popped = 0
  escaped = 0

  updateScore = ->
    $('#score').html("Popped: #{popped} <br> Escaped: #{escaped}")

  updateBubbles = ->
    if (Math.random() < 0.05)
      bubble = $('<img src="bubble.png"></img>')
      bubble.width(width)
      body = $('body')
      x = Math.floor((body.width() - width) * Math.random())
      bubble.offset({left: x, top: body.height()})
      body.append(bubble)
      bubble.click ->
        bubble.remove()
        popped++
        updateScore()

    $('img').each  ->
      bubble = $(this);
      pos = bubble.offset();
      pos.top -= 2;
      if (pos.top + bubble.height() < 0)
        bubble.remove()
        escaped++
        updateScore()
      else
        bubble.offset(pos)

  updateScore()
  setInterval(updateBubbles, 50)


