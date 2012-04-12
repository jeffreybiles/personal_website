class Bullet extends Circle
  constructor: (xclick, yclick, origin = player, bulletSpeed = myBulletSpeed, radius = 3) ->
    xdistance = xclick - origin.x
    ydistance = yclick - origin.y
    angle = Math.atan(ydistance/xdistance)
    if xdistance > 0 then multiplier = 1 else multiplier = -1
    this.dx = bulletSpeed*Math.cos(angle)*multiplier
    this.dy = bulletSpeed*Math.sin(angle)*multiplier
    this.x = Math.floor(origin.x + (origin.radius + radius + 2)*Math.cos(angle)*multiplier)
    this.y = Math.floor(origin.y + (origin.radius + radius + 2)*Math.sin(angle)*multiplier)
    this.bounce = false
    this.radius = radius

    this.danger = true

  draw: -> super '#2B241D'