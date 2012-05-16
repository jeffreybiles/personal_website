
var all_my_chocolates = {
  levelname: 'All my chocolates',
  //this is the first level, and is meant to show how to select end-points, as well as introduce them to the concept of selecting by color.
  levelid: 1,
  orderText:  "Give me every chocolate you make!",
  hint: 'You should connect the chocolate sensor to the lightbulb by clicking on the connectors.',
  sensors:  ['C'],
  tools: [],
  types:  ['*o'], //this means "All flavors, only balls"
  script: 'all_my_chocolates'
};

var a_bar_walks_into_my_tummy = {
  levelname: 'A bar walks into my tummy',
  //this is the second level, and introduces the concept of shapes.  It also gives you choices as to which sensor to select.
  levelid: 2,
  orderText: 'I only want bar-shaped candies',
  hint: "You have some choices.  Remember, bar-shaped candies are rectangular.",
  sensors: ['|', 'o', '-'],
  tools: [],
  types: ['C*'],
  script: 'a_bar_walks_into_my_tummy'
}

var soyl_not_green = {
  levelname: 'Soyl not green',
  //this is the first level with a component, NOT.  We start with NOT because it only has one connector.
  levelid: 3,
  orderText: "I want everything that's not green!",
  hint: "You can add components now!  Try placing the 'NOT' component between the lightbulb and the green sensor and see what happens.",
  sensors: ['G'],
  tools: ['NOT'],
  types: ['*-'],
  script: 'soyl_not_green'
}

var mint_chocolate = {
  levelname: 'Mint_chocolate',
  //this is the first level with the OR component
  levelid: 4,
  orderText: 'I want to combine mint candies and chocolate candies into something EXTREMELY delicious.',
  hint: "This is the OR component.  It takes two inputs and lights up if either of them are on.  Try connecting" +
      " a green and a brown sensor to it.",
  sensors: ['G', 'C'],
  tools: ['OR'],
  types: ['*o'],
  script: 'mint_chocolate'
}

var indecisive = {
  levelname: 'Indecisive',
  //second level with the OR component
  levelid: 5,
  orderText: "I really like cherries, but I'm not sure if it's their flavor or their round shape." +
      "  Get me some things that are either round OR cherry-flavored, so I can declevelide.",
  hint:  "They want things that are round OR cherry-flavored.  This looks similar to what you dlevelid in the last level.",
  sensors: ['C', 'R', 'o', '-'],
  tools: ['OR'],
  types: ['**'],
  script: 'indecisive'
}

var picky = {
  levelname: 'Picky',
  //combines the OR and NOT component
  levelid: 6,
  orderText: "I don't know what I like, but I know what I don't like:  lemons and sticks.  Give me everything except lemons and sticks.",
  hint: "You'll have to combine an OR with either one or two NOTs.",
  sensors: ['Y', '|'],
  tools: ['OR', 'NOT'],
  types: ['**'],
  script: 'picky'
}

var mint_chocolate_returns = {
  levelname: 'Mint chocolate returns',
  //combine OR and NOT again.  Gets the player used to thinking in reverse with the NOT.
  levelid: 7,
  orderText: "I only want candies that are mint or chocolate.  I don't care if you got the wrong sensors, you can figure it out!",
  hint: "Looks like whoever delivers our sensors messed up and gave us the wrong ones!  You'll just have to use your brains to overcome that.",
  sensors: ['Y', 'R'],
  tools: ['OR', 'NOT'],
  types: ['**'],
  scripts: 'mint_chocolate_returns'
}

var classic = {
  levelname: 'Classic',
  //introduce the AND operator
  levelid: 8,
  orderText: "I want chocolate bars.  Not chocolate spheres, or cherry bars, but only things that are chocolate AND bars.",
  hint: "The AND operator combines two different sensors, and only lights up it both are true",
  sensors: ['C', '-'],
  tools: ['AND'],
  types: ['**'],
  script: 'classic'
}

var backlash = {
  levelname: 'Backlash',
  //combine the AND and the NOT operators
  levelid: 9,
  orderText: "Oh, that was a disaster!  Now my customers won't take chocolate bars!  I want everything that is NOT a chocolate bar.",
  hint: "We want the OPPOSITE of last time.  What operator gives you the opposite?",
  sensors: ['C', '-'],
  tools: ['AND', 'NOT'],
  types: ['**'],
  script: 'backlash'  
}

var botique = {
  levelname: 'Botique',
  //combine the AND and the OR operators
  levelid: 10,
  orderText: "I want lemon bars and chocolate balls. But not lemon balls or chocolate bars! "  ,
  hint: "Make something that finds lemon bars, then something that finds chocolate balls, then combine them.",
  sensors: ['C', 'Y', '-', 'o'],
  tools: ['AND', 'OR'],
  types: ['**'],
  script: 'botique'
}

//This is the end of the training levels.  From now on we should be able to include all three operators and combine them in ever more interesting ways.

var winnowing = {
  levelname: 'Winnowing',
  //this is another combination of AND and OR
  levelid: 11,
  orderText: "I want something cherry or lemon, and I want it in either a ball or a stick shape.",
  hint: "You'll have to combine an AND and two ORs to make this work.",
  sensors: ['Y', 'R', 'o', '|'],
  tools: ['AND', 'OR', 'NOT'],
  types: ['**'],
  script: 'winnowing'
}
var gniwonniw = {
  levelname: 'Gniwonniw',
  //combine all three for the first time.  The solution is the same as the last one, but with a 'not' at the end
  levelid: 12,
  orderText: "I want something that is mint or chocolate, and I want it as a bar.",
  hint: "We've got the same tools as last time, but we want the exact opposite.  How do we reverse what the machine is telling us?",
  sensors: ['Y', 'R', 'o', '|'],
  tools: ['AND', 'OR', 'NOT'],
  types: ['**'],
  script: 'gniwonniw'
}

var mish_mash = {
  levelname: 'Mishmash',
  //combine all three again, but in a more varied way than last time.
  levelid: 13,
  orderText: "We want cherry bars or any ball that isn't chocolate.",
  hint: "You'll have to use all of the operators creatively.  Try making a machine that fills the first part of the order, then a machine that fills the second part, then one that combines them.",
  sensors: ['R', 'C', 'o', '|'],
  tools: ['AND', 'OR', 'NOT'],
  types: ['**'],
  script: 'mishmash'
}

var conditional = {
  levelname: 'Conditional',
  //use the same sensor twice... scandolous!
  levelid: 14,
  orderText: "I don't want any chocolates... unless it's a chocolate bar.",
  hint: "Each operator gets used EXACTLY once.",
  tools: ['AND', 'OR', 'NOT'],
  sensors: ['C', '-', 'C'],
  types: ['**'],
  script: 'conditional'
}

var fake_it = {
  levelname: 'Fake it',
  //make an OR operator without the OR operator
  levelid: 15,
  orderText: "I want chocolate OR mint... oh, and I'll be borrowing your OR operator.  I hope you don't need it.",
  hint: "Oh no!  Whatever will we do?  Somehow you'll have to make an OR operator from the AND and NOT operators.  ",
  tools: ['AND', 'NOT'],
  sensors: ['C', 'G'],
  types: ['**'],
  script: 'fake_it'
}

var fake_out = {
  levelname: 'Fake out',
  levelid: 16,
  orderText: "I want lemon balls!  And your AND operator!  Raaaaaawr!",
  hint: "Wait, hasn't this happened before?  Let's try and solve it the same way as last time.",
  tools: ['OR', 'NOT'],
  sensors: ['Y', 'o'],
  types: ['**'],
  script: 'fake_out'
}

var stop_gap = {
  levelname: 'Stop gap',
  levelid: 17,
  orderText: "I'll take anything not mint... and I'll take your NOT operator too!",
  tools: ['AND', 'OR'],
  sensors: ['C', 'G', 'R', 'Y'],
  types: ['**'],
  script: 'stop_gap'
}

var kludge = {
  levelname: 'Kludge',
  levelid: 18,
  orderText: "I want chocolate balls and sticks that aren't mint.  By the way, I'm loving that NOT operator, I hope you don't need it back!",
  hint: "When they said 'and', it's a trick of the English language.  In our world, that means OR.  Anything we let pass will be a chocolate bar OR a stick that isn't mint.",
  tools: ['AND', 'OR'],
  sensors: ['|', 'R', 'Y', 'C', 'o', 'C'],
  types: ['**'],
  script: 'kludge'
}


var all_levels = [
    all_my_chocolates,
    a_bar_walks_into_my_tummy,
    soyl_not_green,
    mint_chocolate,
    indecisive,
    picky,
    mint_chocolate_returns,
    classic,
    backlash,
    botique,
    winnowing,
    gniwonniw,
    mish_mash,
    conditional,
    fake_it,
    fake_out,
    stop_gap,
    kludge
];





