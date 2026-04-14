const QUESTIONS = [
  {
    id: 0, difficulty: 100, difficultyLabel: '100%', points: 10, type: 'standard',
    text: "How old is Tuesday turning today?",
    options: ["28", "29", "30", "31"],
    correct: 2,
    celebration: "The big 3-0! Welcome to a new decade! 🎉"
  },
  {
    id: 1, difficulty: 95, difficultyLabel: '95%', points: 15, type: 'standard',
    text: "Which city did Tuesday grow up in?",
    options: ["Bristol", "Bath", "Stroud", "Cheltenham"],
    correct: 2,
    celebration: "Born and raised in Stroud! 🏡"
  },
  {
    id: 2, difficulty: 90, difficultyLabel: '90%', points: 20, type: 'standard',
    text: "Where does Tuesday currently call home?",
    options: ["Manchester", "Leeds", "Sheffield", "Birmingham"],
    correct: 1,
    celebration: "Leeds is the place! 🏙️"
  },
  {
    id: 3, difficulty: 85, difficultyLabel: '85%', points: 25, type: 'picture',
    text: "What does Tuesday do for work?",
    pictureIcons: ['📚', '💉', '🏠❤️', '🎨'],
    options: ["Teacher", "Nurse", "Children's Home Worker", "Artist"],
    correct: 2,
    celebration: "Caring for children every day — a real one 💛"
  },
  {
    id: 4, difficulty: 80, difficultyLabel: '80%', points: 30, type: 'picture',
    text: "Which cocktail is Tuesday's go-to order?",
    pictureIcons: ['🍊🥂', '☕🍸', '🌿🍹', '🍓🍸'],
    options: ["Aperol Spritz", "Espresso Martini", "Mojito", "Cosmopolitan"],
    correct: 1,
    celebration: "Espresso Martini — coffee AND alcohol? Classic Tuesday ☕🍸"
  },
  {
    id: 5, difficulty: 75, difficultyLabel: '75%', points: 35, type: 'picture',
    text: "Which food would make Tuesday physically recoil in horror?",
    pictureIcons: ['🍄', '🍌', '🫒', '🍍'],
    options: ["Mushrooms", "Bananas", "Olives", "Pineapple"],
    correct: 1,
    celebration: "BANANAS. Absolutely not. Never. 🍌❌"
  },
  {
    id: 6, difficulty: 70, difficultyLabel: '70%', points: 40, type: 'picture',
    text: "What car does Tuesday drive?",
    pictureIcons: ['🚗💛', '🚙🔵', '🚗⚪', '🚗🔴'],
    options: ["Fiat 500", "Ford Fiesta", "VW Polo", "Mini"],
    correct: 1,
    celebration: "Ford Fiesta — a trusty classic! 🚙"
  },
  {
    id: 7, difficulty: 65, difficultyLabel: '65%', points: 45, type: 'standard',
    text: "Where is Tuesday's absolute favourite place to travel?",
    options: ["Thailand", "Bali", "The Philippines", "Greece"],
    correct: 2,
    celebration: "The Philippines — paradise found 🌴🌊"
  },
  {
    id: 8, difficulty: 60, difficultyLabel: '60%', points: 50, type: 'standard',
    text: "Which creative hobby does Tuesday love?",
    options: ["Photography", "Pottery", "Painting & Art", "Knitting"],
    correct: 2,
    celebration: "Painting, crafts, art — a creative soul 🎨✨"
  },
  {
    id: 9, difficulty: 55, difficultyLabel: '55%', points: 55, type: 'standard',
    text: "What type of cuisine is Tuesday's favourite for a night out?",
    options: ["Italian pasta", "Indian curry", "Chinese", "Tapas"],
    correct: 3,
    celebration: "Tapas — many small delicious things, very Tuesday 🥘"
  },
  {
    id: 10, difficulty: 50, difficultyLabel: '50%', points: 60, type: 'standard',
    text: "Tuesday's relationship with the sun can best be described as...",
    options: [
      "Burns easily and avoids it",
      "Fair weather fan only",
      "Sun worshipper — NEVER in the shade",
      "Prefers overcast days"
    ],
    correct: 2,
    celebration: "Certified shade-avoider. The shade dwellers don't know her ☀️"
  },
  {
    id: 11, difficulty: 45, difficultyLabel: '45%', points: 65, type: 'standard',
    text: "Does Tuesday have any siblings?",
    options: [
      "No, she's an only child",
      "Yes, one younger brother",
      "Yes, one older sister",
      "Yes, twin siblings"
    ],
    correct: 1,
    celebration: "One baby brother! 👶"
  },
  {
    id: 12, difficulty: 40, difficultyLabel: '40%', points: 70, type: 'standard',
    text: "How many years younger is Tuesday's sibling?",
    options: ["4 years", "6 years", "7 years", "8 years"],
    correct: 3,
    celebration: "8 years the junior! Quite the gap 🎂"
  },
  {
    id: 13, difficulty: 35, difficultyLabel: '35%', points: 75, type: 'standard',
    text: "How would you describe Tuesday's timekeeping?",
    options: [
      "Always early — never late",
      "Exactly on time, always",
      "Occasionally a bit late",
      "Always late or about to be"
    ],
    correct: 3,
    celebration: "She's on her way! (She has been for 20 minutes) ⏰😂"
  },
  {
    id: 14, difficulty: 30, difficultyLabel: '30%', points: 80, type: 'standard',
    text: "Tuesday has a strong interest beyond everyday life. What is it?",
    options: ["Astrology", "Spirituality", "True Crime", "History"],
    correct: 1,
    celebration: "Spirituality — connected to something deeper ✨🌌"
  },
  {
    id: 15, difficulty: 25, difficultyLabel: '25%', points: 90, type: 'standard',
    text: "When it comes to hot drinks, Tuesday has one very strict rule. What is it?",
    options: [
      "Loads of coffee, barely any tea",
      "Equal amounts of both throughout the day",
      "One coffee a day — unlimited teas",
      "Herbal teas only, no coffee"
    ],
    correct: 2,
    celebration: "One sacred coffee. Then tea, forever. ☕🍵"
  },
  {
    id: 16, difficulty: 20, difficultyLabel: '20%', points: 100, type: 'standard',
    text: "Tuesday's navigation skills on the road are best described as...",
    options: [
      "She has an incredible sense of direction",
      "Needs GPS everywhere — except a straight road",
      "She refuses to use GPS on principle",
      "Gets lost even WITH Google Maps running"
    ],
    correct: 1,
    celebration: "GPS for everything. Except straight roads. Those she's got. 🗺️😅"
  },
  {
    id: 17, difficulty: 15, difficultyLabel: '15%', points: 110, type: 'picture',
    text: "Which environment is Tuesday MOST in her element?",
    pictureIcons: ['☀️🌸', '🌳🌿', '🏠💤', '🌧️☁️'],
    options: [
      "Basking in full glorious sunshine",
      "Shaded woodland walk",
      "Cosy indoors, always",
      "Grey skies are fine by her"
    ],
    correct: 0,
    celebration: "Sun seeker. Always and forever. ☀️✨"
  },
  {
    id: 18, difficulty: 10, difficultyLabel: '10%', points: 125, type: 'standard',
    text: "How many coffees does Tuesday allow herself in a day?",
    options: [
      "Zero — she's all about tea",
      "Just the one",
      "Two or three",
      "As many as she fancies"
    ],
    correct: 1,
    celebration: "One. Sacred. Coffee. ☕🙏"
  },
  {
    id: 19, difficulty: 1, difficultyLabel: '1%', points: 150, type: 'standard',
    text: "Which of these is the most 'Tuesday Powell' sentence ever written?",
    options: [
      "\"Bang on time, banana smoothie in hand, loving this shade\"",
      "\"Running a bit late — espresso martini en route, sun worship incoming, no bananas anywhere\"",
      "\"Early as always, third coffee, found a lovely shady spot\"",
      "\"On time, in the shade, had three coffees, tried a banana\""
    ],
    correct: 1,
    celebration: "THAT is our Tuesday! Happy Birthday! 🌈☀️🍸🎉"
  }
];

const CONNECTION_QUESTIONS = [
  {
    id: 'c0',
    text: "If Tuesday had to eat the same meal for the rest of her life, what would she pick?",
    options: ["Full English breakfast", "Tapas platter", "Pizza Margherita", "Sushi platter"],
    tuesdayAnswer: 1
  },
  {
    id: 'c1',
    text: "What would Tuesday's perfect day look like?",
    options: [
      "Cosy day inside painting",
      "Full sunshine, good food, good company",
      "Solo adventure somewhere new",
      "Spa day and early night"
    ],
    tuesdayAnswer: 1
  },
  {
    id: 'c2',
    text: "If Tuesday moved abroad permanently, where would she go?",
    options: ["Italy", "Spain", "The Philippines", "Bali"],
    tuesdayAnswer: 2
  },
  {
    id: 'c3',
    text: "What is Tuesday's happy place?",
    options: [
      "A gallery or craft fair",
      "In the sun somewhere warm",
      "In bed with unlimited tea",
      "At a tapas spot with friends"
    ],
    tuesdayAnswer: 1
  },
  {
    id: 'c4',
    text: "Which of these is the most 'Tuesday' Sunday morning scenario?",
    options: [
      "Up early, banana on toast, out the door",
      "Late to wake up, her one coffee made, sun is out — life is good",
      "Sat in the shade with a good book",
      "Alarm set for 7am, GPS ready, determined to be on time"
    ],
    tuesdayAnswer: 1
  }
];
