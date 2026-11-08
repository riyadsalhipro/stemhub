import { createContext, useContext } from 'react';

export type AgeLevel = 'junior' | 'middle' | 'advanced';

export interface LevelMeta {
  key: AgeLevel;
  label: string;
  short: string;
  ages: string;
  blurb: string;
}

export const LEVELS: LevelMeta[] = [
  { key: 'junior', label: 'Junior', short: 'Junior', ages: '7–11', blurb: 'Fun visual explanations, basic sliders, and simple science facts.' },
  { key: 'middle', label: 'Middle School · 3AC', short: '3AC', ages: '12–15', blurb: 'Foundational Moroccan & international 3AC curriculum tools: Ohm\u2019s Law, Linear Equations, Pythagoras, basic Kinematics.' },
  { key: 'advanced', label: '2nd Year College · Advanced', short: 'Advanced', ages: '16+', blurb: 'Higher-level university solvers: Quadratic & Cubic, Complex Numbers, Derivatives, Advanced Physics kinematics.' },
];

export interface AgeLevelContextValue {
  level: AgeLevel;
  setLevel: (l: AgeLevel) => void;
  cycle: () => void;
}

export const AgeLevelContext = createContext<AgeLevelContextValue>({
  level: 'advanced',
  setLevel: () => {},
  cycle: () => {},
});

export function useAgeLevel() {
  return useContext(AgeLevelContext);
}
