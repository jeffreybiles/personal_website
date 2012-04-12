class Bullet extends Circle
  constructor: (xclick, yclick, radius = 3) ->
    xdistance = xclick - player.x
    ydistance = yclick - player.y
    angle = Math.atan(ydistance/xdistance)
    if xdistance > 0 then multiplier = 1 else multiplier = -1
    this.dx = bulletSpeed*Math.cos(angle)*multiplier
    this.dy = bulletSpeed*Math.sin(angle)*multiplier
    this.x = Math.floor(player.x + (player.radius + radius + 2)*Math.cos(angle)*multiplier)
    this.y = Math.floor(player.y + (player.radius + radius + 2)*Math.sin(angle)*multiplier)
    this.bounce = true
    this.radius = radius

    this.danger = true

  draw: -> super '#2B241D'