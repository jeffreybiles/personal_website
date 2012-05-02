(function() {
  var attack, attackIndex, attacks, enemy, enemyAttacks, hero, heroAttacks, json, _i, _len;

  json = {
    hero: {
      id: 4,
      name: "Thesis",
      strength: 10,
      hp: 20,
      defense: 5,
      attacks: [0, 1],
      image_url: "http://avatarswizard.com/uploads/av/2009-03/thumbs/100x100_1236347910_lego-pokemon-1.jpg"
    },
    enemy: {
      id: 1,
      name: "AntiThesis",
      strength: 9,
      hp: 18,
      defense: 4,
      attacks: [0],
      image_url: "http://avatarmaker.eu/free-avatars/avatars/games_225/super_mario_259/super_mario_panic_avatar_100x100_25831.gif"
    }
  };

  attacks = {
    0: {
      name: 'push',
      power: 2
    },
    1: {
      name: 'shove',
      power: 4
    }
  };

  hero = json['hero'];

  enemy = json['enemy'];

  heroAttacks = hero['attacks'];

  enemyAttacks = enemy['attacks'];

  $('#hero .hp').text(hero.hp);

  $('#enemy .hp').text(enemy.hp);

  $('#hero .portrait img').attr('src', hero.image_url);

  $('#enemy .portrait img').attr('src', enemy.image_url);

  $('#attacks').html('<ul></ul>');

  for (_i = 0, _len = heroAttacks.length; _i < _len; _i++) {
    attackIndex = heroAttacks[_i];
    attack = attacks[attackIndex];
    $('#attacks').append("<li class='" + attack.name + " attack' data-power='" + attack.power + "' data-name='" + attack.name + "'>" + attack.name + "</li>");
    $("#attacks ." + attack.name).click(function() {
      enemy.hp -= $(this).data('power');
      $('#enemy .hp').text(enemy.hp);
      $('#attacks').slideUp();
      $('#message').text("" + hero.name + " hits " + enemy.name + " with " + ($(this).data('name'))).slideDown();
      return console.log($('#message').text());
    });
  }

  window.hero = hero;

  window.enemy = enemy;

}).call(this);
