import { useState } from 'react';
import { Zap, Sigma, ArrowRight, Triangle, Gauge } from 'lucide-react';
import { Math as TeX } from '@/components/Math';

const M = Math;

type CalcId = 'ohm' | 'linear' | 'pythagoras' | 'kinematics';

interface Step { text: string; tex?: string; }

const calcs: { id: CalcId; name: string; icon: typeof Zap }[] = [
  { id: 'ohm', name: "Ohm's Law", icon: Zap },
  { id: 'linear', name: 'Linear Equation', icon: Sigma },
  { id: 'pythagoras', name: 'Pythagoras', icon: Triangle },
  { id: 'kinematics', name: 'Kinematics', icon: Gauge },
];

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : NaN;
}
function fmt(n: number): string {
  if (!Number.isFinite(n)) return '—';
  if (M.abs(n) < 1e-9) return '0';
  return Number(n.toPrecision(6)).toString();
}

function ResultCard({ title, value, steps }: { title: string; value: string; steps: Step[] }) {
  if (!value) return null;
  return (
    <div className="card mt-5 p-5 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <ArrowRight className="h-4 w-4 text-sky-500" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h4>
      </div>
      <div className="mt-2 font-mono text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
      {steps.length > 0 && (
        <ol className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{i + 1}</span>
              <span className="flex flex-wrap items-center gap-x-2">
                <span>{s.text}</span>
                {s.tex && <TeX tex={s.tex} display={false} />}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

export function MiddleCalculators() {
  const [active, setActive] = useState<CalcId>('ohm');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3AC Curriculum Tools</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Middle school solvers with step-by-step working. Enter the knowns and solve.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {calcs.map((c) => {
          const Icon = c.icon;
          const isActive = active === c.id;
          return (
            <button key={c.id} onClick={() => setActive(c.id)} className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}>
              <Icon className="h-4 w-4" />
              {c.name}
            </button>
          );
        })}
      </div>

      <div key={active} className="animate-fade-in-up">
        {active === 'ohm' && <OhmCalc />}
        {active === 'linear' && <LinearCalc />}
        {active === 'pythagoras' && <PythagorasCalc />}
        {active === 'kinematics' && <KinematicsCalc />}
      </div>
    </div>
  );
}

function OhmCalc() {
  const [v, setV] = useState('12');
  const [i, setI] = useState('');
  const [r, setR] = useState('4');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const V = v.trim() !== '' ? num(v) : NaN;
    const I = i.trim() !== '' ? num(i) : NaN;
    const R = r.trim() !== '' ? num(r) : NaN;
    const knowns = [V, I, R].filter((n) => Number.isFinite(n));
    if (knowns.length < 2) { setError('Enter at least two values (leave the unknown blank).'); setResult(null); return; }
    if (Number.isFinite(V) && Number.isFinite(I) && !Number.isFinite(R)) {
      setResult({ value: `R = ${fmt(V / I)} \u03a9`, steps: [
        { text: 'Start from', tex: 'V = I \\times R' },
        { text: 'Rearrange:', tex: 'R = \\frac{V}{I}' },
        { text: 'Substitute:', tex: `R = \\frac{${fmt(V)}}{${fmt(I)}}` },
        { text: 'Compute:', tex: `R = ${fmt(V / I)}\\ \\Omega` },
      ]});
    } else if (Number.isFinite(V) && Number.isFinite(R) && !Number.isFinite(I)) {
      setResult({ value: `I = ${fmt(V / R)} A`, steps: [
        { text: 'Start from', tex: 'V = I \\times R' },
        { text: 'Rearrange:', tex: 'I = \\frac{V}{R}' },
        { text: 'Substitute:', tex: `I = \\frac{${fmt(V)}}{${fmt(R)}}` },
        { text: 'Compute:', tex: `I = ${fmt(V / R)}\\ \\text{A}` },
      ]});
    } else if (Number.isFinite(I) && Number.isFinite(R) && !Number.isFinite(V)) {
      setResult({ value: `V = ${fmt(I * R)} V`, steps: [
        { text: 'Use', tex: 'V = I \\times R' },
        { text: 'Substitute:', tex: `V = ${fmt(I)} \\times ${fmt(R)}` },
        { text: 'Compute:', tex: `V = ${fmt(I * R)}\\ \\text{V}` },
      ]});
    } else { setError('Leave exactly one field blank to solve for it.'); setResult(null); }
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ohm's Law</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter two of V, I, R. Leave the unknown blank.</p>
        </div>
        <div className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-500/10"><TeX tex="V = I \\times R" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <InputField label="Voltage V (V)" value={v} onChange={setV} placeholder="leave blank" />
        <InputField label="Current I (A)" value={i} onChange={setI} placeholder="leave blank" />
        <InputField label="Resistance R (\u03a9)" value={r} onChange={setR} placeholder="leave blank" />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Solve</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}

function LinearCalc() {
  const [a, setA] = useState('3');
  const [b, setB] = useState('5');
  const [c, setC] = useState('');
  const [d, setD] = useState('20');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const A = num(a); const B = num(b); const C = c.trim() !== '' ? num(c) : 0; const D = num(d);
    if (![A, B, D].every(Number.isFinite)) { setError('Enter valid numbers for a, b, and d.'); setResult(null); return; }
    if (A - 0 === 0 && !Number.isFinite(C)) { setError('Coefficient of x cannot be 0.'); setResult(null); return; }
    // ax + b = cx + d  =>  (a-c)x = d - b  =>  x = (d-b)/(a-c)
    const denom = A - C;
    if (M.abs(denom) < 1e-12) { setError('No unique solution (coefficient of x is 0).'); setResult(null); return; }
    const x = (D - B) / denom;
    const steps: Step[] = [
      { text: 'Start from', tex: `${fmt(A)}x + ${fmt(B)} = ${fmt(C)}x + ${fmt(D)}` },
      { text: 'Move x-terms left, constants right:', tex: `${fmt(A)}x - ${fmt(C)}x = ${fmt(D)} - ${fmt(B)}` },
      { text: 'Simplify:', tex: `${fmt(denom)}x = ${fmt(D - B)}` },
      { text: 'Divide both sides:', tex: `x = \\frac{${fmt(D - B)}}{${fmt(denom)}}` },
      { text: 'Compute:', tex: `x = ${fmt(x)}` },
    ];
    setResult({ value: `x = ${fmt(x)}`, steps });
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Linear Equation (One Unknown)</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Solve ax + b = cx + d. Enter all four coefficients.</p>
        </div>
        <div className="rounded-xl bg-sky-50 px-4 py-3 dark:bg-sky-500/10"><TeX tex="ax + b = cx + d" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-4">
        <InputField label="a" value={a} onChange={setA} />
        <InputField label="b" value={b} onChange={setB} />
        <InputField label="c (0 if blank)" value={c} onChange={setC} placeholder="0" />
        <InputField label="d" value={d} onChange={setD} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Solve</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}

function PythagorasCalc() {
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [c, setC] = useState('');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const A = a.trim() !== '' ? num(a) : NaN;
    const B = b.trim() !== '' ? num(b) : NaN;
    const C = c.trim() !== '' ? num(c) : NaN;
    const knowns = [A, B, C].filter((n) => Number.isFinite(n) && n >= 0);
    if (knowns.length < 2) { setError('Enter two sides (leave the unknown blank). Values must be \u2265 0.'); setResult(null); return; }
    if (Number.isFinite(A) && Number.isFinite(B) && !Number.isFinite(C)) {
      const hyp = M.sqrt(A * A + B * B);
      setResult({ value: `c = ${fmt(hyp)}`, steps: [
        { text: 'Pythagoras:', tex: 'a^2 + b^2 = c^2' },
        { text: 'Substitute:', tex: `c = \\sqrt{${fmt(A)}^2 + ${fmt(B)}^2}` },
        { text: 'Compute squares:', tex: `c = \\sqrt{${fmt(A * A)} + ${fmt(B * B)}}` },
        { text: 'Result:', tex: `c = ${fmt(hyp)}` },
      ]});
    } else if (Number.isFinite(A) && Number.isFinite(C) && !Number.isFinite(B)) {
      if (C < A) { setError('Hypotenuse must be the longest side (c \u2265 a).'); setResult(null); return; }
      const leg = M.sqrt(C * C - A * A);
      setResult({ value: `b = ${fmt(leg)}`, steps: [
        { text: 'Rearrange:', tex: 'b = \\sqrt{c^2 - a^2}' },
        { text: 'Substitute:', tex: `b = \\sqrt{${fmt(C)}^2 - ${fmt(A)}^2}` },
        { text: 'Result:', tex: `b = ${fmt(leg)}` },
      ]});
    } else if (Number.isFinite(B) && Number.isFinite(C) && !Number.isFinite(A)) {
      if (C < B) { setError('Hypotenuse must be the longest side (c \u2265 b).'); setResult(null); return; }
      const leg = M.sqrt(C * C - B * B);
      setResult({ value: `a = ${fmt(leg)}`, steps: [
        { text: 'Rearrange:', tex: 'a = \\sqrt{c^2 - b^2}' },
        { text: 'Substitute:', tex: `a = \\sqrt{${fmt(C)}^2 - ${fmt(B)}^2}` },
        { text: 'Result:', tex: `a = ${fmt(leg)}` },
      ]});
    } else { setError('Leave exactly one side blank to solve for it.'); setResult(null); }
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pythagoras Theorem</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Right-angled triangle. Enter two sides, leave the unknown blank.</p>
        </div>
        <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-500/10"><TeX tex="a^2 + b^2 = c^2" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <InputField label="Leg a" value={a} onChange={setA} placeholder="leave blank" />
        <InputField label="Leg b" value={b} onChange={setB} placeholder="leave blank" />
        <InputField label="Hypotenuse c" value={c} onChange={setC} placeholder="leave blank" />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Solve</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}

function KinematicsCalc() {
  const [v0, setV0] = useState('0');
  const [a, setA] = useState('3');
  const [t, setT] = useState('4');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const V0 = num(v0); const A = num(a); const T = num(t);
    if (![V0, A, T].every(Number.isFinite)) { setError('Enter valid numbers for v\u2080, a, and t.'); setResult(null); return; }
    if (T < 0) { setError('Time t must be non-negative.'); setResult(null); return; }
    const v = V0 + A * T;
    const x = V0 * T + 0.5 * A * T * T;
    setResult({ value: `v = ${fmt(v)} m/s,  d = ${fmt(x)} m`, steps: [
      { text: 'Final velocity:', tex: 'v = v_0 + at' },
      { text: 'Substitute:', tex: `v = ${fmt(V0)} + (${fmt(A)})(${fmt(T)})` },
      { text: 'Compute:', tex: `v = ${fmt(v)}\\ \\text{m/s}` },
      { text: 'Distance:', tex: 'd = v_0 t + \\tfrac{1}{2}at^2' },
      { text: 'Substitute:', tex: `d = (${fmt(V0)})(${fmt(T)}) + \\tfrac{1}{2}(${fmt(A)})(${fmt(T)})^2` },
      { text: 'Compute:', tex: `d = ${fmt(x)}\\ \\text{m}` },
    ]});
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Basic Kinematics</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Constant acceleration: find final velocity and distance.</p>
        </div>
        <div className="rounded-xl bg-sky-50 px-4 py-3 dark:bg-sky-500/10"><TeX tex="v = v_0 + at" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <InputField label="Initial velocity v\u2080 (m/s)" value={v0} onChange={setV0} />
        <InputField label="Acceleration a (m/s\u00b2)" value={a} onChange={setA} />
        <InputField label="Time t (s)" value={t} onChange={setT} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Solve</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}
