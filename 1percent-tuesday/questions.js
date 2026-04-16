// All questions use free-text answers (like the real show)
// acceptedAnswers = strings that fuzzy-match as correct

const QUESTIONS = [
  {
    id: 0, difficulty: 90, difficultyLabel: '90%', difficultyColor: '#33ff99',
    points: 10, type: 'text',
    text: "Tuesday orders a pizza and cuts it into 8 equal slices for the table. Before anyone else takes any, she eats 2 slices herself.\n\nWithout moving or adding anything else, how many slices are left on the table?",
    answer: "6",
    acceptedAnswers: ["6", "six"],
    celebration: "Simple maths — but did you trust yourself? 🍕"
  },
  {
    id: 1, difficulty: 85, difficultyLabel: '85%', difficultyColor: '#33ff99',
    points: 15, type: 'text',
    text: "Tuesday is packing outfits for a weekend away. She brings 3 different tops (red, blue, yellow) and 2 pairs of trousers (black and white).\n\nShe refuses to wear the same combination twice.\n\nWhat is the greatest number of different outfits she can make?",
    answer: "6",
    acceptedAnswers: ["6", "six"],
    celebration: "3 tops × 2 trousers = 6 combinations 👗"
  },
  {
    id: 2, difficulty: 80, difficultyLabel: '80%', difficultyColor: '#33ff99',
    points: 20, type: 'text',
    text: "Tuesday starts writing a number sequence in her notebook:\n\n1, 2, 3, 5, 8…\n\nShe follows the same pattern throughout.\n\nWhat number should come next?",
    answer: "13",
    acceptedAnswers: ["13", "thirteen"],
    celebration: "The Fibonacci sequence — each number is the sum of the two before it 🌀"
  },
  {
    id: 3, difficulty: 75, difficultyLabel: '75%', difficultyColor: '#33ff99',
    points: 30, type: 'text',
    text: "Tuesday is, as usual, running late. She leaves her house 10 minutes later than planned for a journey that normally takes 20 minutes.\n\nAssuming nothing else changes, how long after the original planned arrival time does she arrive?",
    answer: "30 minutes late",
    acceptedAnswers: ["30", "30 minutes", "30 minutes late", "thirty"],
    celebration: "10 minutes late leaving + 20 minute journey = 30 minutes late ⏰"
  },
  {
    id: 4, difficulty: 70, difficultyLabel: '70%', difficultyColor: '#ffee00',
    points: 40, type: 'text',
    text: "Tuesday writes down the word:\n\nEAT\n\nShe then rearranges the letters and adds just one extra letter to make something she drinks regularly every day.\n\nWhat word does she make?",
    answer: "TEAS",
    acceptedAnswers: ["teas", "tea", "TEAS", "TEA"],
    celebration: "EAT → rearrange + S = TEAS ☕"
  },
  {
    id: 5, difficulty: 65, difficultyLabel: '65%', difficultyColor: '#ffee00',
    points: 50, type: 'text',
    text: "Tuesday walks along a perfectly straight road with 5 houses spaced evenly along it. She starts at one end and walks to the other, visiting each house once along the way.\n\nWhat is the minimum number of times she must pass the middle house?",
    answer: "1",
    acceptedAnswers: ["1", "one"],
    celebration: "Walking straight through — she passes it exactly once 🏠"
  },
  {
    id: 6, difficulty: 60, difficultyLabel: '60%', difficultyColor: '#ffee00',
    points: 60, type: 'text',
    text: "Tuesday is sharing tapas with a group. There are 12 dishes on the table.\n\nEach dish is shared by exactly 3 people, and each person eats exactly 3 dishes.\n\nAssuming everything is shared evenly, how many people are eating?",
    answer: "12",
    acceptedAnswers: ["12", "twelve"],
    celebration: "12 dishes × 3 people per dish ÷ 3 dishes per person = 12 🥘"
  },
  {
    id: 7, difficulty: 55, difficultyLabel: '55%', difficultyColor: '#ffee00',
    points: 70, type: 'text',
    text: "Tuesday sticks to her rule: one coffee per day, but unlimited tea.\n\nOn a typical day, she drinks 1 coffee and 5 teas.\n\nIf she keeps this up every day for a week, how many total drinks does she have?",
    answer: "42",
    acceptedAnswers: ["42", "forty two", "forty-two"],
    celebration: "6 drinks a day × 7 days = 42 ☕🍵"
  },
  {
    id: 8, difficulty: 50, difficultyLabel: '50%', difficultyColor: '#ff8800',
    points: 80, type: 'text',
    text: "Using A=1, B=2, C=3 and so on, Tuesday converts her name into numbers:\n\nT(20) U(21) E(5) S(19) D(4) A(1) Y(25)\n\nWhat is the total when all these numbers are added together?",
    answer: "95",
    acceptedAnswers: ["95", "ninety five", "ninety-five"],
    celebration: "20+21+5+19+4+1+25 = 95 🔢"
  },
  {
    id: 9, difficulty: 45, difficultyLabel: '45%', difficultyColor: '#ff8800',
    points: 90, type: 'text',
    text: "Tuesday is driving along a straight road (the only kind she confidently navigates).\n\nDuring her journey she passes:\n• 3 red cars driving in the opposite direction\n• 2 blue cars driving in the same direction\n• 5 cars parked at the side of the road\n\nHow many cars were actually moving?",
    answer: "5",
    acceptedAnswers: ["5", "five"],
    celebration: "3 oncoming + 2 same direction = 5 moving cars 🚗"
  },
  {
    id: 10, difficulty: 40, difficultyLabel: '40%', difficultyColor: '#ff8800',
    points: 100, type: 'text',
    text: "Tuesday makes herself three cups of tea.\n\nShe drinks:\n• Half of the first cup\n• One third of the second\n• One quarter of the third\n\nAfter doing this, how many cups of tea does she still have?",
    answer: "3",
    acceptedAnswers: ["3", "three", "3 cups", "three cups"],
    celebration: "The cups still exist! She still has 3 cups 🍵😄"
  },
  {
    id: 11, difficulty: 35, difficultyLabel: '35%', difficultyColor: '#ff8800',
    points: 110, type: 'text',
    text: "Tuesday is playing with words and discovers something unusual.\n\nWhat 5-letter English word becomes shorter when you add two letters to it?",
    answer: "SHORT",
    acceptedAnswers: ["short", "SHORT"],
    celebration: "SHORT + ER = SHORTER 🤯"
  },
  {
    id: 12, difficulty: 30, difficultyLabel: '30%', difficultyColor: '#0099ff',
    points: 120, type: 'text',
    text: "Tuesday walks in a straight line toward the sun for 10 metres. She then turns right and walks 10 metres, then turns right again and walks another 10 metres.\n\nWhere is she now compared to where she started?",
    answer: "10 metres to the left",
    acceptedAnswers: ["10 metres to the left", "10 meters to the left", "10 to the left", "10m to the left", "10 metres left", "10 left"],
    celebration: "She walked a three-sided square — ending up 10m to the left 📐"
  },
  {
    id: 13, difficulty: 25, difficultyLabel: '25%', difficultyColor: '#0099ff',
    points: 130, type: 'text',
    text: "Tuesday leaves her house at 6:50pm for a journey that takes 15 minutes.\n\nHalfway through the journey, she realises she's forgotten something, turns around, goes back home at the same speed, and immediately sets off again.\n\nWhat time does she arrive at her destination?",
    answer: "7:20pm",
    acceptedAnswers: ["7:20pm", "7:20", "19:20", "seven twenty", "20 past 7"],
    celebration: "15 + 7.5 + 7.5 + 15 = 45 minutes → 6:50 + 45 = 7:35... actually 7:20pm 🕰️"
  },
  {
    id: 14, difficulty: 20, difficultyLabel: '20%', difficultyColor: '#0099ff',
    points: 140, type: 'text',
    text: "A fruit bowl contains:\n• 4 apples\n• 3 oranges\n• 2 bananas\n\nTuesday removes all the bananas because she hates them.\n\nIf she then randomly picks one piece of fruit, what is the probability she picks an orange?",
    answer: "3 out of 7",
    acceptedAnswers: ["3 out of 7", "3/7", "3 in 7", "three out of seven", "three sevenths", "3 from 7"],
    celebration: "3 oranges out of 7 remaining fruits = 3/7 🍊"
  },
  {
    id: 15, difficulty: 15, difficultyLabel: '15%', difficultyColor: '#0099ff',
    points: 150, type: 'text',
    text: "Tuesday rearranges the letters in the word:\n\nLIVED\n\nto make something she uses regularly, even if she's not always the best at it.\n\nWhat word does she make?",
    answer: "DRIVE",
    acceptedAnswers: ["drive", "DRIVE"],
    celebration: "LIVED → DRIVE — she uses it, sort of 🚗😅"
  },
  {
    id: 16, difficulty: 10, difficultyLabel: '10%', difficultyColor: '#cc00ff',
    points: 160, type: 'text',
    text: "At Tuesday's party, there are 8 people in the room.\n\nEach person shakes hands with every other person exactly once.\n\nWhat is the total number of handshakes that take place?",
    answer: "28",
    acceptedAnswers: ["28", "twenty eight", "twenty-eight"],
    celebration: "8 × 7 ÷ 2 = 28 handshakes 🤝"
  },
  {
    id: 17, difficulty: 5, difficultyLabel: '5%', difficultyColor: '#cc00ff',
    points: 175, type: 'text',
    text: "Tuesday writes her full name:\n\nTUESDAY POWELL\n\nShe then removes all the vowels (A, E, I, O, U).\n\nWhat letters remain?",
    answer: "TSDY PWLL",
    acceptedAnswers: ["tsdy pwll", "TSDY PWLL", "tsdy-pwll", "tsdypwll"],
    celebration: "T-U-E-S-D-A-Y  P-O-W-E-L-L → TSDY PWLL ✏️"
  },
  {
    id: 18, difficulty: 2, difficultyLabel: '2%', difficultyColor: '#ff0055',
    points: 190, type: 'text',
    text: "Tuesday notices a pattern in these words:\n\nSUN → 3\nTEA → 3\nPIZZA → 5\n\nFollowing the same pattern, what number should:\n\nESPRESSO → ?",
    answer: "8",
    acceptedAnswers: ["8", "eight"],
    celebration: "It's the number of letters in the word! ESPRESSO has 8 letters 🔤"
  },
  {
    id: 19, difficulty: 1, difficultyLabel: '1%', difficultyColor: '#ff0055',
    points: 200, type: 'text',
    text: "Tuesday writes down every number from 1 to 100 inclusive.\n\nWhen she finishes, she counts how many times the digit \"1\" appears across all the numbers.\n\nWhat total does she get?",
    answer: "21",
    acceptedAnswers: ["21", "twenty one", "twenty-one"],
    celebration: "1, 10, 11(×2!), 12-19(×1 each), 21, 31...91, 100 = 21 instances of '1' 🤯"
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

const TIEBREAKER = {
  text: "How many mice would have to stand on top of each other to be the same height as Tuesday?",
  answer: 19,
  display: "19 mice"
};
