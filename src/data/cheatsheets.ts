export type Category = 'Math' | 'Physics' | 'CS';

export interface Cheatsheet {
  id: string;
  category: Category;
  title: string;
  formulas: { label: string; tex: string }[];
  tips: string[];
}

export const cheatsheets: Cheatsheet[] = [
  {
    id: 'quad-formula',
    category: 'Math',
    title: 'Quadratic Equations',
    formulas: [
      { label: 'Standard form', tex: 'ax^2 + bx + c = 0' },
      { label: 'Quadratic formula', tex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
      { label: 'Discriminant', tex: '\\Delta = b^2 - 4ac' },
    ],
    tips: [
      'If Δ > 0: two distinct real roots.',
      'If Δ = 0: one repeated real root.',
      'If Δ < 0: two complex conjugate roots.',
    ],
  },
  {
    id: 'trig-identities',
    category: 'Math',
    title: 'Trigonometric Identities',
    formulas: [
      { label: 'Pythagorean', tex: '\\sin^2\\theta + \\cos^2\\theta = 1' },
      { label: 'Sum of angles', tex: '\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b' },
      { label: 'Double angle', tex: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta' },
      { label: 'Law of cosines', tex: 'c^2 = a^2 + b^2 - 2ab\\cos C' },
    ],
    tips: [
      'Convert everything to sin and cos when stuck.',
      'tan θ = sin θ / cos θ — watch for cos θ = 0.',
    ],
  },
  {
    id: 'calc-derivatives',
    category: 'Math',
    title: 'Derivatives & Integrals',
    formulas: [
      { label: 'Power rule', tex: '\\frac{d}{dx}x^n = nx^{n-1}' },
      { label: 'Product rule', tex: '(fg)\' = f\'g + fg\'' },
      { label: 'Chain rule', tex: '\\frac{d}{dx}f(g(x)) = f\'(g(x))\\,g\'(x)' },
      { label: 'Integral of power', tex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C' },
    ],
    tips: [
      'Don\'t forget the + C on indefinite integrals.',
      'u-substitution reverses the chain rule.',
    ],
  },
  {
    id: 'log-rules',
    category: 'Math',
    title: 'Logarithm Rules',
    formulas: [
      { label: 'Product', tex: '\\log_b(xy) = \\log_b x + \\log_b y' },
      { label: 'Quotient', tex: '\\log_b\\!\\left(\\frac{x}{y}\\right) = \\log_b x - \\log_b y' },
      { label: 'Power', tex: '\\log_b(x^n) = n\\log_b x' },
      { label: 'Change of base', tex: '\\log_b x = \\frac{\\ln x}{\\ln b}' },
    ],
    tips: ['ln is just log base e (≈ 2.718).', 'log of a product → sum of logs.'],
  },
  {
    id: 'kinematics',
    category: 'Physics',
    title: 'Kinematics (1D)',
    formulas: [
      { label: 'Velocity', tex: 'v = v_0 + at' },
      { label: 'Position', tex: 'x = x_0 + v_0 t + \\tfrac{1}{2}at^2' },
      { label: 'Timeless', tex: 'v^2 = v_0^2 + 2a\\Delta x' },
      { label: 'Average velocity', tex: '\\bar{v} = \\frac{v_0 + v}{2}' },
    ],
    tips: [
      'Pick the equation with exactly one unknown.',
      'Decide a positive direction and stick to it.',
    ],
  },
  {
    id: 'newton-laws',
    category: 'Physics',
    title: "Newton's Laws & Forces",
    formulas: [
      { label: 'Second law', tex: 'F = ma' },
      { label: 'Friction', tex: 'f_k = \\mu_k N' },
      { label: 'Weight', tex: 'W = mg' },
      { label: 'Momentum', tex: 'p = mv' },
    ],
    tips: [
      'Draw a free-body diagram before writing equations.',
      'Normal force N is not always equal to mg on an incline.',
    ],
  },
  {
    id: 'energy',
    category: 'Physics',
    title: 'Work & Energy',
    formulas: [
      { label: 'Kinetic energy', tex: 'K = \\tfrac{1}{2}mv^2' },
      { label: 'Gravitational PE', tex: 'U_g = mgh' },
      { label: 'Work', tex: 'W = Fd\\cos\\theta' },
      { label: 'Power', tex: 'P = \\frac{W}{t}' },
    ],
    tips: ['Conservation of energy: Kᵢ + Uᵢ = K_f + U_f (no friction).'],
  },
  {
    id: 'ohms-law',
    category: 'Physics',
    title: 'Electrical Circuits',
    formulas: [
      { label: "Ohm's law", tex: 'V = IR' },
      { label: 'Power', tex: 'P = VI = I^2R = \\frac{V^2}{R}' },
      { label: 'Series resistance', tex: 'R_{eq} = R_1 + R_2 + \\cdots' },
      { label: 'Parallel resistance', tex: '\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots' },
    ],
    tips: [
      'Series: same current, add resistances.',
      'Parallel: same voltage, add conductances.',
    ],
  },
  {
    id: 'big-o',
    category: 'CS',
    title: 'Big-O Complexity',
    formulas: [
      { label: 'Constant', tex: 'O(1)' },
      { label: 'Logarithmic', tex: 'O(\\log n)' },
      { label: 'Linear', tex: 'O(n)' },
      { label: 'Quadratic', tex: 'O(n^2)' },
    ],
    tips: [
      'Binary search → O(log n).',
      'Nested loops over n → usually O(n²).',
      'Sort with comparison → Ω(n log n) lower bound.',
    ],
  },
  {
    id: 'data-structures',
    category: 'CS',
    title: 'Data Structure Ops',
    formulas: [
      { label: 'Array access', tex: 'O(1)' },
      { label: 'Hash lookup', tex: 'O(1)\\ \\text{avg}' },
      { label: 'BST search', tex: 'O(\\log n)\\ \\text{balanced}' },
      { label: 'Linked list insert', tex: 'O(1)\\ \\text{at head}' },
    ],
    tips: [
      'Hash maps are fast but unordered.',
      'Use a balanced BST when you need ordered keys.',
    ],
  },
  {
    id: 'boolean-logic',
    category: 'CS',
    title: 'Boolean Algebra',
    formulas: [
      { label: 'Identity', tex: 'A \\lor \\text{false} = A' },
      { label: 'Domination', tex: 'A \\land \\text{true} = A' },
      { label: 'Idempotent', tex: 'A \\lor A = A' },
      { label: "De Morgan's", tex: '\\neg(A \\land B) = \\neg A \\lor \\neg B' },
    ],
    tips: [
      'De Morgan\'s: push the NOT in, flip AND/OR.',
      'XOR is true when inputs differ.',
    ],
  },
  {
    id: 'recurrence',
    category: 'CS',
    title: 'Recurrence Relations',
    formulas: [
      { label: 'Merge sort', tex: 'T(n) = 2T(n/2) + O(n)' },
      { label: 'Binary search', tex: 'T(n) = T(n/2) + O(1)' },
      { label: 'Master theorem', tex: 'T(n) = aT(n/b) + f(n)' },
    ],
    tips: ['Master theorem: compare f(n) with n^(log_b a).'],
  },
];
