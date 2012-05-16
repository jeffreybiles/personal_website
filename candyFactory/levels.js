all_levels = [
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
    gniwonniw
]

all_my_chocolates = {
  name: 'all my chocolates',
  //this is the first level, and is meant to show how to select end-points, as well as introduce them to the concept of selecting by color.
  id: 1,
  order:  "Give me every chocolate you make!",
  hint: 'You should connect the chocolate sensor to the lightbulb by clicking on the connectors.',
  sensors:  ['C'],
  tools: [],
  types:  ['*o'], //this means "All flavors, only balls"
  script: 'all_my_chocolates'
};

a_bar_walks_into_my_tummy = {
  name: 'a bar walks into my tummy...',
  //this is the second level, and introduces the concept of shapes.  It also gives you choices as to which sensor to select.
  id: 2,
  order: 'I only want bar-shaped candies',
  hint: "You have some choices.  Remember, bar-shaped candies are rectangular.",
  sensors: ['|', 'o', '-'],
  tools: [],
  types: ['C*'],
  script: 'a_bar_walks_into_my_tummy'
}

soyl_not_green = {
  name: 'soyl not green',
  //this is the first level with a component, NOT.  We start with NOT because it only has one connector.
  id: 3,
  order: "I want everything that's not green!",
  hint: "You can add components now!  Try placing the 'NOT' component between the lightbulb and the green sensor and see what happens.",
  sensors: ['G'],
  tools: ['NOT'],
  types: ['*-'],
  script: 'soyl_not_green'
}

mint_chocolate = {
  name: 'mint_chocolate',
  //this is the first level with the OR component
  id: 4,
  order: 'I want to combine mint candies and chocolate candies into something EXTREMELY delicious.',
  hint: "This is the OR component.  It takes two inputs and lights up if either of them are on.  Try connecting" +
      " a green and a brown sensor to it.",
  sensors: ['G', 'C'],
  tools: ['OR'],
  types: ['*o'],
  script: 'mint_chocolate'
}

indecisive = {
  name: 'indecisive',
  //second level with the OR component
  id: 5,
  order: "I really like cherries, but I'm not sure if it's their flavor or their round shape." +
      "  Get me some things that are either round OR cherry-flavored, so I can decide.",
  hint:  "They want things that are round OR cherry-flavored.  This looks similar to what you did in the last level.",
  sensors: ['C', 'R', 'o', '-'],
  tools: ['OR'],
  types: ['**'],
  script: 'indecisive'
}

picky = {
  name: 'picky',
  //combines the OR and NOT component
  id: 6,
  order: "I don't know what I like, but I know what I don't like:  lemons and sticks.  Give me everything except lemons and sticks.",
  hint: "You'll have to combine an OR with either one or two NOTs.",
  sensors: ['Y', '|'],
  tools: ['OR', 'NOT'],
  types: ['**'],
  script: 'picky'
}

mint_chocolate_returns = {
  name: 'mint chocolate returns',
  //combine OR and NOT again.  Gets the player used to thinking in reverse with the NOT.
  id: 7,
  order: "I only want candies that are mint or chocolate.  I don't care if you got the wrong sensors, you can figure it out!",
  hint: "Looks like whoever delivers our sensors messed up and gave us the wrong ones!  You'll just have to use your brains to overcome that.",
  sensors: ['Y', 'R'],
  tools: ['OR', 'NOT'],
  types: ['**'],
  scripts: 'mint_chocolate_returns'
}

classic = {
  name: 'classic',
  //introduce the AND operator
  id: 8,
  order: "I want chocolate bars.  Not chocolate spheres, or cherry bars, but only things that are chocolate AND bars.",
  hint: "The AND operator combines two different sensors, and only lights up it both are true",
  sensors: ['C', '-'],
  tools: ['AND'],
  types: ['**'],
  script: 'classic'
}

backlash = {
  name: 'backlash',
  //combine the AND and the NOT operators
  id: 9,
  order: "Oh, that was a disaster!  Now my customers won't take chocolate bars!  I want everything that is NOT a chocolate bar.",
  hint: "We want the OPPOSITE of last time.  What operator gives you the opposite?",
  sensors: ['C', '-'],
  tools: ['AND', 'NOT'],
  types: ['**'],
  script: 'backlash'
}

botique = {
  name: 'botique',
  //combine the AND and the OR operators
  id: 10,
  order: "I want lemon bars and chocolate balls. But not lemon balls or chocolate bars! "  ,
  hint: "Make something that finds lemon bars, then something that finds chocolate balls, then combine them.",
  sensors: ['C', 'Y', '-', 'o'],
  tools: ['AND', 'OR'],
  types: ['**'],
  script: 'botique'
}

//This is the end of the training levels.  From now on we should be able to include all three operators and combine them in ever more interesting ways.

winnowing = {
  name: 'winnowing',
  //this is another combination of AND and OR
  id: 11,
  order: "I want something cherry or lemon, and I want it in either a ball or a stick shape.",
  hint: "You'll have to combine an AND and two ORs to make this work.",
  sensors: ['Y', 'R', 'o', '|'],
  tools: ['AND', 'OR', 'NOT'],
  types: ['**'],
  script: 'winnowing'
}
gniwonniw = {
  name: 'gniwonniw',
  //combine all three for the first time
  id: 12,
  order: "I want something that is mint or chocolate, and I want it as a bar.",
  hint: "We've got the same tools as last time, but we want the exact opposite.  How do we reverse what the machine is telling us?",
  sensors: ['Y', 'R', 'o', '|'],
  tools: ['AND', 'OR', 'NOT'],
  types: ['**'],
  script: 'gniwonniw'
}





