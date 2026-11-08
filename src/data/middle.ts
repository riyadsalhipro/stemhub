export interface MidCheatsheet {
  id: string;
  category: 'Math' | 'Physics';
  title: string;
  formulas: { label: string; tex: string }[];
  tips: string[];
}

export const midCheatsheets: MidCheatsheet[] = [
  {
    id: 'mid-ohm',
    category: 'Physics',
    title: "Ohm's Law",
    formulas: [
      { label: "Ohm's law", tex: 'V = I \\times R' },
      { label: 'Current', tex: 'I = \\frac{V}{R}' },
      { label: 'Resistance', tex: 'R = \\frac{V}{I}' },
      { label: 'Power', tex: 'P = V \\times I' },
    ],
    tips: [
      'Voltage (V) is measured in volts, current (I) in amperes, resistance (R) in ohms.',
      'If resistance goes up and voltage stays the same, current goes down.',
    ],
  },
  {
    id: 'mid-linear',
    category: 'Math',
    title: 'Linear Equations (One Unknown)',
    formulas: [
      { label: 'Standard form', tex: 'ax + b = 0' },
      { label: 'Solution', tex: 'x = -\\frac{b}{a}' },
      { label: 'General form', tex: 'ax + b = cx + d' },
    ],
    tips: [
      'Move all x-terms to one side, numbers to the other.',
      'Divide both sides by the coefficient of x to solve.',
    ],
  },
  {
    id: 'mid-pythagoras',
    category: 'Math',
    title: 'Pythagoras Theorem',
    formulas: [
      { label: 'Theorem', tex: 'a^2 + b^2 = c^2' },
      { label: 'Hypotenuse', tex: 'c = \\sqrt{a^2 + b^2}' },
      { label: 'A leg', tex: 'a = \\sqrt{c^2 - b^2}' },
    ],
    tips: [
      'Only works for right-angled triangles.',
      'The hypotenuse c is always the longest side, opposite the right angle.',
    ],
  },
  {
    id: 'mid-kinematics',
    category: 'Physics',
    title: 'Basic Kinematics',
    formulas: [
      { label: 'Speed', tex: 'v = \\frac{d}{t}' },
      { label: 'Distance', tex: 'd = v \\times t' },
      { label: 'Acceleration', tex: 'a = \\frac{\\Delta v}{\\Delta t}' },
      { label: 'Velocity equation', tex: 'v = v_0 + at' },
    ],
    tips: [
      'Speed is how fast; velocity is speed with a direction.',
      'Acceleration is how quickly velocity changes over time.',
    ],
  },
  {
    id: 'mid-areas',
    category: 'Math',
    title: 'Areas & Perimeters',
    formulas: [
      { label: 'Rectangle area', tex: 'A = L \\times W' },
      { label: 'Triangle area', tex: 'A = \\frac{1}{2} b \\times h' },
      { label: 'Circle area', tex: 'A = \\pi r^2' },
      { label: 'Circle perimeter', tex: 'P = 2\\pi r' },
    ],
    tips: [
      'Always use the same units before calculating.',
      'The radius is half the diameter.',
    ],
  },
  {
    id: 'mid-fractions',
    category: 'Math',
    title: 'Fractions & Proportions',
    formulas: [
      { label: 'Cross product', tex: '\\frac{a}{b} = \\frac{c}{d} \\Rightarrow ad = bc' },
      { label: 'Addition', tex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}' },
      { label: 'Percentage', tex: '\\% = \\frac{\\text{part}}{\\text{whole}} \\times 100' },
    ],
    tips: [
      'Cross-multiply to solve proportions.',
      'To find a percentage, divide part by whole and multiply by 100.',
    ],
  },
];

export interface MidQuizQuestion {
  id: string;
  category: 'Math' | 'Physics';
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export const midQuizQuestions: MidQuizQuestion[] = [
  {
    id: 'mq1',
    category: 'Physics',
    question: 'Using Ohm\u2019s Law, if V = 12 V and R = 4 \u03a9, what is I?',
    choices: ['48 A', '3 A', '8 A', '0.33 A'],
    answer: 1,
    explanation: 'I = V / R = 12 / 4 = 3 A.',
  },
  {
    id: 'mq2',
    category: 'Math',
    question: 'Solve: 3x + 5 = 20. What is x?',
    choices: ['3', '5', '7', '15'],
    answer: 1,
    explanation: '3x = 20 \u2212 5 = 15, so x = 15 / 3 = 5.',
  },
  {
    id: 'mq3',
    category: 'Math',
    question: 'A right triangle has legs 3 and 4. What is the hypotenuse?',
    choices: ['5', '6', '7', '12'],
    answer: 0,
    explanation: 'c = \u221a(3\u00b2 + 4\u00b2) = \u221a(9 + 16) = \u221a25 = 5.',
  },
  {
    id: 'mq4',
    category: 'Physics',
    question: 'A car travels 100 km in 2 hours. What is its average speed?',
    choices: ['20 km/h', '50 km/h', '100 km/h', '200 km/h'],
    answer: 1,
    explanation: 'v = d / t = 100 / 2 = 50 km/h.',
  },
  {
    id: 'mq5',
    category: 'Math',
    question: 'Solve: 2x \u2212 7 = 3x + 1. What is x?',
    choices: ['8', '\u22128', '6', '\u22126'],
    answer: 1,
    explanation: '2x \u2212 3x = 1 + 7, so \u2212x = 8, x = \u22128.',
  },
  {
    id: 'mq6',
    category: 'Math',
    question: 'The area of a circle with radius 5 cm is approximately:',
    choices: ['10\u03c0 cm\u00b2', '25\u03c0 cm\u00b2', '15\u03c0 cm\u00b2', '50 cm\u00b2'],
    answer: 1,
    explanation: 'A = \u03c0r\u00b2 = \u03c0(5\u00b2) = 25\u03c0 cm\u00b2.',
  },
  {
    id: 'mq7',
    category: 'Physics',
    question: 'If acceleration is 3 m/s\u00b2 and initial velocity is 0, what is v after 4 s?',
    choices: ['7 m/s', '12 m/s', '0.75 m/s', '4 m/s'],
    answer: 1,
    explanation: 'v = v\u2080 + at = 0 + (3)(4) = 12 m/s.',
  },
  {
    id: 'mq8',
    category: 'Math',
    question: 'Solve the proportion: 2/5 = x/20. What is x?',
    choices: ['4', '8', '10', '40'],
    answer: 1,
    explanation: 'Cross multiply: 2\u00d720 = 5x, so 40 = 5x, x = 8.',
  },
  {
    id: 'mq9',
    category: 'Physics',
    question: 'A resistor has 6 V across it and 2 A flowing through it. What is R?',
    choices: ['12 \u03a9', '3 \u03a9', '0.33 \u03a9', '8 \u03a9'],
    answer: 1,
    explanation: 'R = V / I = 6 / 2 = 3 \u03a9.',
  },
  {
    id: 'mq10',
    category: 'Math',
    question: 'A rectangle is 8 cm long and 5 cm wide. What is its area?',
    choices: ['13 cm\u00b2', '26 cm\u00b2', '40 cm\u00b2', '45 cm\u00b2'],
    answer: 2,
    explanation: 'A = L \u00d7 W = 8 \u00d7 5 = 40 cm\u00b2.',
  },
];
