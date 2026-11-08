import type { Category } from './cheatsheets';

export interface QuizQuestion {
  id: string;
  category: Category;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Math',
    question: 'What is the discriminant of 2x² − 4x + 1?',
    choices: ['0', '4', '8', '16'],
    answer: 2,
    explanation: 'Δ = b² − 4ac = (−4)² − 4(2)(1) = 16 − 8 = 8. Since Δ > 0, two distinct real roots.',
  },
  {
    id: 'q2',
    category: 'Math',
    question: 'The derivative of x³ is:',
    choices: ['3x', 'x²', '3x²', '3x³'],
    answer: 2,
    explanation: 'Power rule: d/dx xⁿ = n·xⁿ⁻¹. Here n=3, so 3x².',
  },
  {
    id: 'q3',
    category: 'Math',
    question: 'log₂(8) equals:',
    choices: ['2', '3', '4', '8'],
    answer: 1,
    explanation: '2³ = 8, so log₂(8) = 3.',
  },
  {
    id: 'q4',
    category: 'Math',
    question: 'sin²θ + cos²θ = ?',
    choices: ['0', '1', '2', 'tan θ'],
    answer: 1,
    explanation: 'The Pythagorean identity equals 1 for all θ.',
  },
  {
    id: 'q5',
    category: 'Physics',
    question: "Ohm's law states that V = ?",
    choices: ['I/R', 'IR', 'R/I', 'I + R'],
    answer: 1,
    explanation: 'Voltage equals current times resistance: V = IR.',
  },
  {
    id: 'q6',
    category: 'Physics',
    question: 'A car starts from rest and accelerates at 2 m/s² for 5 s. Final velocity?',
    choices: ['5 m/s', '7 m/s', '10 m/s', '25 m/s'],
    answer: 2,
    explanation: 'v = v₀ + at = 0 + (2)(5) = 10 m/s.',
  },
  {
    id: 'q7',
    category: 'Physics',
    question: 'Kinetic energy of a 2 kg object moving at 3 m/s:',
    choices: ['6 J', '9 J', '12 J', '18 J'],
    answer: 1,
    explanation: 'K = ½mv² = ½(2)(3²) = ½(2)(9) = 9 J.',
  },
  {
    id: 'q8',
    category: 'Physics',
    question: 'Two resistors (4 Ω, 6 Ω) in series give total resistance of:',
    choices: ['2.4 Ω', '10 Ω', '24 Ω', '5 Ω'],
    answer: 1,
    explanation: 'Series: R = R₁ + R₂ = 4 + 6 = 10 Ω.',
  },
  {
    id: 'q9',
    category: 'CS',
    question: 'What is the time complexity of binary search?',
    choices: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
    answer: 2,
    explanation: 'Each step halves the search space → O(log n).',
  },
  {
    id: 'q10',
    category: 'CS',
    question: 'Which is the average lookup time of a hash table?',
    choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 0,
    explanation: 'Average case O(1); worst case O(n) with many collisions.',
  },
  {
    id: 'q11',
    category: 'CS',
    question: "De Morgan's law: ¬(A ∧ B) = ?",
    choices: ['¬A ∧ ¬B', '¬A ∨ ¬B', 'A ∨ B', '¬(A ∨ B)'],
    answer: 1,
    explanation: '¬(A ∧ B) = ¬A ∨ ¬B — push the NOT in, flip AND to OR.',
  },
  {
    id: 'q12',
    category: 'CS',
    question: 'Merge sort has time complexity:',
    choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    answer: 1,
    explanation: 'T(n) = 2T(n/2) + O(n) → O(n log n) by the Master theorem.',
  },
];
