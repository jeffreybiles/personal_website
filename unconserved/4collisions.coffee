collision = (hitter, hittee, modifiers = 1) ->
  hittee.dx = Math.cos(hitter.angle + Math.PI/2)*hitSpeed*modifiers
  hittee.dy = Math.sin(hitter.angle + Math.PI/2)*hitSpeed*modifiers

#both bounce, but not as much as a full hit
electronCollision = (atom1, atom2) ->
  collision(atom1, atom2, 0.3)
  collision(atom2, atom1, 0.3)

checkOneCollision = (x1, y1, x2, y2, radius) ->
  distance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
  if distance < Math.pow(radius, 2)
    return true
  else
    return false

checkAtomsCollision = (atom1, atom2) ->
  if checkOneCollision(atom1.x, atom1.y, atom2.electronX, atom2.electronY, nucleusRad + electronRad)
    collision(atom2, atom1)
  if checkOneCollision(atom1.electronX, atom1.electronY, atom2.x, atom2.y, nucleusRad + electronRad)
    collision(atom1, atom2)
  if checkOneCollision(atom1.electronX, atom1.electronY, atom2.electronX, atom2.electronY, electronRad + electronRad)
    electronCollision(atom1, atom2)

checkAllCollisions = ->
  i = 0
  while i < enemies.length
    enemy = enemies[i]
    checkAtomsCollision(enemy, player)
    j = i + 1
    while j < enemies.length
      checkAtomsCollision(enemy, enemies[j])
      j++
    i++

  filterEnemies()

filterEnemies = ->
  i = 0
  while i < enemies.length
    if enemies[i].stillAlive
      i++
    else
      enemies.splice(i, 1)
