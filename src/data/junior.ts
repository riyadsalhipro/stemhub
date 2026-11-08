export type JrCategory = 'Math' | 'Science' | 'Tech';

export interface JrCheatsheet {
  id: string;
  category: JrCategory;
  title: string;
  emoji: string;
  blurb: string;
  facts: string[];
}

export const jrCheatsheets: JrCheatsheet[] = [
  {
    id: 'jr-addition',
    category: 'Math',
    title: 'Adding Numbers',
    emoji: '➕',
    blurb: 'When you add, you put things together to find the total.',
    facts: [
      'Adding zero never changes a number: 5 + 0 = 5.',
      'You can add in any order: 3 + 4 is the same as 4 + 3.',
      'Count up on your fingers or draw pictures to help!',
    ],
  },
  {
    id: 'jr-shapes',
    category: 'Math',
    title: 'Cool Shapes',
    emoji: '⭐',
    blurb: 'Shapes are everywhere! A triangle has 3 sides, a square has 4 equal sides.',
    facts: [
      'A circle is round and has no corners.',
      'A rectangle has 4 sides — opposite sides are equal.',
      'Count the sides to name the shape!',
    ],
  },
  {
    id: 'jr-multiplication',
    category: 'Math',
    title: 'Times Tables',
    emoji: '✖️',
    blurb: 'Multiplication is fast adding. 3 × 4 means 3 groups of 4.',
    facts: [
      '2 × anything is just doubling: 2 × 5 = 10.',
      'Anything × 1 stays the same: 7 × 1 = 7.',
      'Anything × 0 is always 0: 99 × 0 = 0.',
    ],
  },
  {
    id: 'jr-gravity',
    category: 'Science',
    title: 'Gravity',
    emoji: '🍎',
    blurb: 'Gravity is what pulls things down to the ground.',
    facts: [
      'Drop a ball and it falls — that is gravity!',
      'Gravity pulls everything down at the same speed.',
      'The Moon has gravity too, but weaker than Earth.',
    ],
  },
  {
    id: 'jr-states',
    category: 'Science',
    title: 'Solid, Liquid, Gas',
    emoji: '💧',
    blurb: 'Everything is made of tiny pieces. How they move makes the state.',
    facts: [
      'Ice is solid — pieces are stuck together.',
      'Water is liquid — pieces slide around.',
      'Steam is gas — pieces fly free!',
    ],
  },
  {
    id: 'jr-light',
    category: 'Science',
    title: 'Light & Colors',
    emoji: '🌈',
    blurb: 'White light is made of all the rainbow colors mixed together.',
    facts: [
      'A prism splits white light into a rainbow.',
      'Plants look green because they reflect green light.',
      'Light travels super fast — the fastest thing there is!',
    ],
  },
  {
    id: 'jr-computers',
    category: 'Tech',
    title: 'How Computers Work',
    emoji: '💻',
    blurb: 'Computers follow instructions called code, one step at a time.',
    facts: [
      'Computers only understand 0s and 1s — on and off.',
      'A program is a list of instructions for the computer.',
      'The CPU is the "brain" of the computer.',
    ],
  },
  {
    id: 'jr-algorithms',
    category: 'Tech',
    title: 'Algorithms',
    emoji: '🧩',
    blurb: 'An algorithm is a recipe — a step-by-step way to solve a problem.',
    facts: [
      'A recipe for cookies is like an algorithm!',
      'Computers use algorithms to sort and search.',
      'Good algorithms finish faster.',
    ],
  },
  {
    id: 'jr-patterns',
    category: 'Tech',
    title: 'Patterns & Logic',
    emoji: '🔁',
    blurb: 'A pattern repeats. Spotting patterns helps you guess what comes next.',
    facts: [
      'Red, blue, red, blue... what comes next? Red!',
      'Loops tell a computer to repeat steps.',
      'If-then is a rule: IF it rains, THEN take an umbrella.',
    ],
  },
];

export interface JrQuizQuestion {
  id: string;
  category: JrCategory;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  emoji: string;
}

export const jrQuizQuestions: JrQuizQuestion[] = [
  {
    id: 'jq1',
    category: 'Math',
    question: 'What is 7 + 3?',
    choices: ['9', '10', '11', '8'],
    answer: 1,
    explanation: '7 plus 3 is 10! Count up: 8, 9, 10.',
    emoji: '➕',
  },
  {
    id: 'jq2',
    category: 'Math',
    question: 'How many sides does a triangle have?',
    choices: ['2', '3', '4', '5'],
    answer: 1,
    explanation: 'A triangle always has 3 sides and 3 corners.',
    emoji: '🔺',
  },
  {
    id: 'jq3',
    category: 'Math',
    question: 'What is 4 × 2?',
    choices: ['6', '8', '10', '4'],
    answer: 1,
    explanation: '4 × 2 means two groups of 4: 4 + 4 = 8.',
    emoji: '✖️',
  },
  {
    id: 'jq4',
    category: 'Math',
    question: 'What is 12 − 5?',
    choices: ['5', '6', '7', '8'],
    answer: 2,
    explanation: 'Count down from 12: 11, 10, 9, 8, 7 — that is 5 steps!',
    emoji: '➖',
  },
  {
    id: 'jq5',
    category: 'Science',
    question: 'What pulls a dropped ball to the ground?',
    choices: ['Wind', 'Gravity', 'Magnet', 'Light'],
    answer: 1,
    explanation: 'Gravity is the invisible force that pulls things down to Earth.',
    emoji: '🍎',
  },
  {
    id: 'jq6',
    category: 'Science',
    question: 'Ice is which state of matter?',
    choices: ['Solid', 'Liquid', 'Gas', 'Plasma'],
    answer: 0,
    explanation: 'Ice is frozen water — its pieces are locked together as a solid.',
    emoji: '🧊',
  },
  {
    id: 'jq7',
    category: 'Science',
    question: 'White light is made of...',
    choices: ['Only blue', 'Rainbow colors', 'Only yellow', 'Darkness'],
    answer: 1,
    explanation: 'A prism splits white light into all the rainbow colors!',
    emoji: '🌈',
  },
  {
    id: 'jq8',
    category: 'Science',
    question: 'Which is the fastest thing in the universe?',
    choices: ['Sound', 'A cheetah', 'Light', 'Wind'],
    answer: 2,
    explanation: 'Light travels faster than anything — about 300,000 km per second!',
    emoji: '⚡',
  },
  {
    id: 'jq9',
    category: 'Tech',
    question: 'Computers understand only...',
    choices: ['Words', '0s and 1s', 'Pictures', 'Songs'],
    answer: 1,
    explanation: 'Computers use binary — just 0 (off) and 1 (on) — for everything!',
    emoji: '🔢',
  },
  {
    id: 'jq10',
    category: 'Tech',
    question: 'An algorithm is like a...',
    choices: ['Song', 'Recipe', 'Game', 'Color'],
    answer: 1,
    explanation: 'An algorithm is a step-by-step recipe to solve a problem.',
    emoji: '🧩',
  },
  {
    id: 'jq11',
    category: 'Tech',
    question: 'What does a loop do in code?',
    choices: ['Stops everything', 'Repeats steps', 'Deletes files', 'Makes sound'],
    answer: 1,
    explanation: 'A loop tells the computer to do the same steps over and over.',
    emoji: '🔁',
  },
  {
    id: 'jq12',
    category: 'Tech',
    question: 'IF it rains, THEN... what should you do?',
    choices: ['Wear sunglasses', 'Take an umbrella', 'Go swimming', 'Nothing'],
    answer: 1,
    explanation: 'That is an if-then rule — a basic piece of logic computers use!',
    emoji: '☔',
  },
];
