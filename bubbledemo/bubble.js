(function() {

  $(document).ready(function() {
    var escaped, popped, updateBubbles, updateScore, width;
    width = 24;
    popped = 0;
    escaped = 0;
    updateScore = function() {
      return $('#score').html("Popped: " + popped + " <br> Escaped: " + escaped);
    };
    updateBubbles = function() {
      var body, bubble, x;
      if (Math.random() < 0.05) {
        bubble = $('<img src="bubble.png"></img>');
        bubble.width(width);
        body = $('body');
        x = Math.floor((body.width() - width) * Math.random());
        bubble.offset({
          left: x,
          top: body.height()
        });
        body.append(bubble);
        bubble.click(function() {
          bubble.remove();
          popped++;
          return updateScore();
        });
      }
      return $('img').each(function() {
        var pos;
        bubble = $(this);
        pos = bubble.offset();
        pos.top -= 2;
        if (pos.top + bubble.height() < 0) {
          bubble.remove();
          escaped++;
          return updateScore();
        } else {
          return bubble.offset(pos);
        }
      });
    };
    updateScore();
    return setInterval(updateBubbles, 50);
  });

}).call(this);
