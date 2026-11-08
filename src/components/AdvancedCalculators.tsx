import { useState } from 'react';
import { Zap, Sigma, ArrowRight, Gauge, FunctionSquare, Binary, TrendingUp } from 'lucide-react';
import { Math as TeX } from '@/components/Math';

const M = Math;

type CalcId = 'quadratic' | 'cubic' | 'complex' | 'derivative' | 'kinematics';

interface Step { text: string; tex?: string; }

const calcs: { id: CalcId; name: string; icon: typeof Zap }[] = [
  { id: 'quadratic', name: 'Quadratic Solver', icon: Sigma },
  { id: 'cubic', name: 'Cubic Solver', icon: FunctionSquare },
  { id: 'complex', name: 'Complex Numbers', icon: Binary },
  { id: 'derivative', name: 'Derivative', icon: TrendingUp },
  { id: 'kinematics', name: 'Adv. Kinematics', icon: Gauge },
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
      <div className="mt-2 font-mono text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{value}</div>
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

export function AdvancedCalculators() {
  const [active, setActive] = useState<CalcId>('quadratic');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Solvers</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          University-level tools with full step-by-step solutions and LaTeX rendering.
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
        {active === 'quadratic' && <QuadraticCalc />}
        {active === 'cubic' && <CubicCalc />}
        {active === 'complex' && <ComplexCalc />}
        {active === 'derivative' && <DerivativeCalc />}
        {active === 'kinematics' && <KinematicsCalc />}
      </div>
    </div>
  );
}

function QuadraticCalc() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('-5');
  const [c, setC] = useState('6');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const A = num(a); const B = num(b); const C = num(c);
    if (![A, B, C].every(Number.isFinite)) { setError('Enter valid numbers for a, b, and c.'); setResult(null); return; }
    if (A === 0) { setError('a cannot be 0 (not a quadratic).'); setResult(null); return; }
    const disc = B * B - 4 * A * C;
    const steps: Step[] = [
      { text: 'Identify coefficients:', tex: `a=${fmt(A)},\\ b=${fmt(B)},\\ c=${fmt(C)}` },
      { text: 'Discriminant:', tex: '\\Delta = b^2 - 4ac' },
      { text: 'Substitute:', tex: `\\Delta = (${fmt(B)})^2 - 4(${fmt(A)})(${fmt(C)})` },
      { text: 'Compute:', tex: `\\Delta = ${fmt(disc)}` },
    ];
    if (disc > 0) {
      const sq = M.sqrt(disc);
      const x1 = (-B + sq) / (2 * A); const x2 = (-B - sq) / (2 * A);
      steps.push({ text: '\u0394 > 0 \u2192 two real roots.' }, { text: 'Apply formula:', tex: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}' },
        { text: 'Substitute:', tex: `x = \\frac{-(${fmt(B)}) \\pm \\sqrt{${fmt(disc)}}}{2(${fmt(A)})}` },
        { text: 'Roots:', tex: `x_1 = ${fmt(x1)},\\quad x_2 = ${fmt(x2)}` });
      setResult({ value: `x\u2081 = ${fmt(x1)},  x\u2082 = ${fmt(x2)}`, steps });
    } else if (disc === 0) {
      const x = -B / (2 * A);
      steps.push({ text: '\u0394 = 0 \u2192 one repeated root.' }, { text: 'Root:', tex: `x = \\frac{-b}{2a} = ${fmt(x)}` });
      setResult({ value: `x = ${fmt(x)} (double root)`, steps });
    } else {
      const sq = M.sqrt(-disc);
      const re = -B / (2 * A); const im = sq / (2 * A);
      steps.push({ text: '\u0394 < 0 \u2192 two complex roots.' }, { text: 'Roots:', tex: `x = ${fmt(re)} \\pm ${fmt(im)}i` });
      setResult({ value: `x = ${fmt(re)} \u00b1 ${fmt(im)}i`, steps });
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quadratic Solver</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Solve ax\u00b2 + bx + c = 0 with full working.</p>
        </div>
        <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-500/10"><TeX tex="x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <InputField label="Coefficient a" value={a} onChange={setA} />
        <InputField label="Coefficient b" value={b} onChange={setB} />
        <InputField label="Coefficient c" value={c} onChange={setC} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Solve</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}

function CubicCalc() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('-6');
  const [c, setC] = useState('11');
  const [d, setD] = useState('-6');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const A = num(a); const B = num(b); const C = num(c); const D = num(d);
    if (![A, B, C, D].every(Number.isFinite)) { setError('Enter valid numbers for a, b, c, and d.'); setResult(null); return; }
    if (A === 0) { setError('a cannot be 0 (not a cubic).'); setResult(null); return; }

    // Normalize: x^3 + px^2 + qx + r = 0
    const p = B / A; const q = C / A; const r = D / A;
    // Depressed cubic: t^3 + pt_sub + q_sub = 0  (substitute x = t - p/3)
    const pSub = q - (p * p) / 3;
    const qSub = (2 * p * p * p) / 27 - (p * q) / 3 + r;
    const disc = (qSub * qSub) / 4 + (pSub * pSub * pSub) / 27;

    const steps: Step[] = [
      { text: 'Equation:', tex: `${fmt(A)}x^3 + ${fmt(B)}x^2 + ${fmt(C)}x + ${fmt(D)} = 0` },
      { text: 'Normalize (\u00f7a):', tex: `x^3 + ${fmt(p)}x^2 + ${fmt(q)}x + ${fmt(r)} = 0` },
      { text: 'Substitute x = t \u2212 p/3 to depress:', tex: `t^3 + ${fmt(pSub)}t + ${fmt(qSub)} = 0` },
      { text: 'Cardano discriminant:', tex: '\\Delta = \\frac{q^2}{4} + \\frac{p^3}{27}' },
      { text: 'Compute:', tex: `\\Delta = ${fmt(disc)}` },
    ];

    const shift = -p / 3;
    const roots: number[] = [];

    if (M.abs(disc) < 1e-10) {
      // Multiple roots
      if (M.abs(pSub) < 1e-10) {
        roots.push(shift);
        steps.push({ text: 'Triple real root:', tex: `x = ${fmt(shift)}` });
      } else {
        const t1 = 3 * qSub / (2 * pSub);
        const t2 = -3 * qSub / pSub;
        roots.push(t1 + shift, t2 + shift);
        steps.push({ text: 'Double + single root:', tex: `t_1 = ${fmt(t1)},\\ t_2 = ${fmt(t2)}` });
        steps.push({ text: 'Shift back x = t + p/3...:', tex: `x_1 = ${fmt(t1 + shift)},\\ x_{2,3} = ${fmt(t2 + shift)}` });
      }
    } else if (disc > 0) {
      // One real root (Cardano)
      const sqrtDisc = M.sqrt(disc);
      const u = -qSub / 2 + sqrtDisc;
      const v = -qSub / 2 - sqrtDisc;
      const uCbrt = M.cbrt(u);
      const vCbrt = M.cbrt(v);
      const tReal = uCbrt + vCbrt;
      const xReal = tReal + shift;
      roots.push(xReal);
      steps.push({ text: '\u0394 > 0 \u2192 one real root (Cardano formula):', tex: 't = \\sqrt[3]{-\\frac{q}{2}+\\sqrt{\\Delta}} + \\sqrt[3]{-\\frac{q}{2}-\\sqrt{\\Delta}}' });
      steps.push({ text: 'Compute:', tex: `t = ${fmt(tReal)}` });
      steps.push({ text: 'Shift back:', tex: `x = ${fmt(xReal)}` });
      steps.push({ text: 'Two complex roots also exist (conjugate pair).' });
    } else {
      // Three real roots (trigonometric)
      const m = 2 * M.sqrt(-pSub / 3);
      const acosArg = M.max(-1, M.min(1, (3 * qSub) / (pSub * m)));
      const theta = M.acos(acosArg);
      const k = 2 * M.PI / 3;
      for (let i = 0; i < 3; i++) {
        const t = m * M.cos(theta / 3 - i * k);
        roots.push(t + shift);
      }
      steps.push({ text: '\u0394 < 0 \u2192 three real roots (trigonometric method):', tex: 't_k = 2\\sqrt{\\frac{-p}{3}}\\cos\\!\\left(\\frac{1}{3}\\arccos\\!\\left(\\frac{3q}{p\\,m}\\right) - \\frac{2\\pi k}{3}\\right)' });
      steps.push({ text: 'Roots:', tex: `x_1 = ${fmt(roots[0])},\\ x_2 = ${fmt(roots[1])},\\ x_3 = ${fmt(roots[2])}` });
    }

    const realRoots = roots.map(fmt);
    setResult({ value: realRoots.join(',  '), steps });
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cubic Solver</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Solve ax\u00b3 + bx\u00b2 + cx + d = 0 via Cardano's method.</p>
        </div>
        <div className="rounded-xl bg-violet-50 px-4 py-3 dark:bg-violet-500/10"><TeX tex="ax^3+bx^2+cx+d=0" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-4">
        <InputField label="a" value={a} onChange={setA} />
        <InputField label="b" value={b} onChange={setB} />
        <InputField label="c" value={c} onChange={setC} />
        <InputField label="d" value={d} onChange={setD} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Solve</button>
      {result && <ResultCard title="Real roots" value={result.value} steps={result.steps} />}
    </div>
  );
}

function ComplexCalc() {
  const [aRe, setARe] = useState('3');
  const [aIm, setAIm] = useState('2');
  const [bRe, setBRe] = useState('1');
  const [bIm, setBIm] = useState('-4');
  const [op, setOp] = useState<'add' | 'sub' | 'mul' | 'div'>('mul');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);

  function compute() {
    const ar = num(aRe); const ai = num(aIm); const br = num(bRe); const bi = num(bIm);
    if (![ar, ai, br, bi].every(Number.isFinite)) { setResult(null); return; }
    let re = 0; let im = 0;
    const steps: Step[] = [
      { text: 'Given:', tex: `z_1 = ${fmt(ar)} + ${fmt(ai)}i,\\quad z_2 = ${fmt(br)} + ${fmt(bi)}i` },
    ];
    if (op === 'add') {
      re = ar + br; im = ai + bi;
      steps.push({ text: 'Add real and imaginary parts:', tex: `(${fmt(ar)}+${fmt(br)}) + (${fmt(ai)}+${fmt(bi)})i` });
    } else if (op === 'sub') {
      re = ar - br; im = ai - bi;
      steps.push({ text: 'Subtract:', tex: `(${fmt(ar)}-${fmt(br)}) + (${fmt(ai)}-${fmt(bi)})i` });
    } else if (op === 'mul') {
      re = ar * br - ai * bi; im = ar * bi + ai * br;
      steps.push({ text: 'Multiply:', tex: '(a+bi)(c+di) = (ac-bd) + (ad+bc)i' });
      steps.push({ text: 'Substitute:', tex: `(${fmt(ar)}\\cdot${fmt(br)}-${fmt(ai)}\\cdot${fmt(bi)}) + (${fmt(ar)}\\cdot${fmt(bi)}+${fmt(ai)}\\cdot${fmt(br)})i` });
    } else {
      const denom = br * br + bi * bi;
      if (M.abs(denom) < 1e-12) { setResult({ value: 'Division by zero', steps: [{ text: 'z\u2082 = 0, cannot divide.' }] }); return; }
      re = (ar * br + ai * bi) / denom; im = (ai * br - ar * bi) / denom;
      steps.push({ text: 'Divide (multiply by conjugate):', tex: '\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{c^2+d^2}' });
      steps.push({ text: 'Denominator:', tex: `c^2+d^2 = ${fmt(denom)}` });
    }
    steps.push({ text: 'Result:', tex: `z = ${fmt(re)} + ${fmt(im)}i` });
    setResult({ value: `${fmt(re)} ${im >= 0 ? '+' : '\u2212'} ${fmt(M.abs(im))}i`, steps });
  }

  const opLabel = { add: 'z\u2081 + z\u2082', sub: 'z\u2081 \u2212 z\u2082', mul: 'z\u2081 \u00d7 z\u2082', div: 'z\u2081 \u00f7 z\u2082' };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Complex Number Operations</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add, subtract, multiply, or divide two complex numbers.</p>
        </div>
        <div className="rounded-xl bg-sky-50 px-4 py-3 dark:bg-sky-500/10"><TeX tex="z = a + bi" /></div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">z\u2081</p>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Real a" value={aRe} onChange={setARe} />
            <InputField label="Imaginary b" value={aIm} onChange={setAIm} />
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">z\u2082</p>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Real c" value={bRe} onChange={setBRe} />
            <InputField label="Imaginary d" value={bIm} onChange={setBIm} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(opLabel) as ('add' | 'sub' | 'mul' | 'div')[]).map((k) => (
          <button key={k} onClick={() => setOp(k)} className={`chip ${op === k ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}>
            {opLabel[k]}
          </button>
        ))}
      </div>

      <button className="btn-primary mt-4" onClick={compute}>Compute</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}

function DerivativeCalc() {
  const [n, setN] = useState('3');
  const [x, setX] = useState('2');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const N = num(n); const X = num(x);
    if (!Number.isFinite(N) || !Number.isFinite(X)) { setError('Enter valid numbers for n and x.'); setResult(null); return; }
    if (N <= 0 || !Number.isInteger(N)) { setError('n must be a positive integer.'); setResult(null); return; }
    // d/dx x^n = n*x^(n-1); at x: n * x^(n-1)
    const deriv = N * M.pow(X, N - 1);
    const steps: Step[] = [
      { text: 'Function:', tex: `f(x) = x^{${fmt(N)}}` },
      { text: 'Power rule:', tex: '\\frac{d}{dx}x^n = n\\,x^{n-1}' },
      { text: 'Apply:', tex: `f'(x) = ${fmt(N)}\\,x^{${fmt(N - 1)}}` },
      { text: 'Evaluate at x:', tex: `f'(${fmt(X)}) = ${fmt(N)} \\cdot ${fmt(X)}^{${fmt(N - 1)}}` },
      { text: 'Compute:', tex: `f'(${fmt(X)}) = ${fmt(deriv)}` },
    ];
    setResult({ value: `f'(${fmt(X)}) = ${fmt(deriv)}`, steps });
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Derivative Calculator</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Compute d/dx of x\u207f and evaluate at a point.</p>
        </div>
        <div className="rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-500/10"><TeX tex="\\frac{d}{dx}x^n = n\\,x^{n-1}" /></div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InputField label="Exponent n" value={n} onChange={setN} />
        <InputField label="Evaluate at x" value={x} onChange={setX} />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      <button className="btn-primary mt-4" onClick={compute}>Compute</button>
      {result && <ResultCard title="Result" value={result.value} steps={result.steps} />}
    </div>
  );
}

function KinematicsCalc() {
  const [v0, setV0] = useState('10');
  const [a, setA] = useState('-2');
  const [t, setT] = useState('5');
  const [result, setResult] = useState<{ value: string; steps: Step[] } | null>(null);
  const [error, setError] = useState('');

  function compute() {
    setError('');
    const V0 = num(v0); const A = num(a); const T = num(t);
    if (![V0, A, T].every(Number.isFinite)) { setError('Enter valid numbers for v\u2080, a, and t.'); setResult(null); return; }
    if (T < 0) { setError('Time t must be non-negative.'); setResult(null); return; }
    const v = V0 + A * T;
    const x = V0 * T + 0.5 * A * T * T;
    const v2 = v * v;
    const steps: Step[] = [
      { text: 'Final velocity:', tex: 'v = v_0 + at' },
      { text: 'Substitute:', tex: `v = ${fmt(V0)} + (${fmt(A)})(${fmt(T)})` },
      { text: 'Compute:', tex: `v = ${fmt(v)}\\ \\text{m/s}` },
      { text: 'Displacement:', tex: 'x = v_0 t + \\tfrac{1}{2}at^2' },
      { text: 'Compute:', tex: `x = ${fmt(x)}\\ \\text{m}` },
      { text: 'Timeless check:', tex: 'v^2 = v_0^2 + 2a\\Delta x' },
      { text: 'Verify:', tex: `v^2 = ${fmt(v2)},\\quad v_0^2 + 2ax = ${fmt(V0 * V0 + 2 * A * x)}` },
    ];
    setResult({ value: `v = ${fmt(v)} m/s,  \u0394x = ${fmt(x)} m,  v\u00b2 = ${fmt(v2)}`, steps });
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Advanced Kinematics</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Full 1D kinematics with v\u00b2 = v\u2080\u00b2 + 2a\u0394x verification.</p>
        </div>
        <div className="rounded-xl bg-sky-50 px-4 py-3 dark:bg-sky-500/10"><TeX tex="v^2 = v_0^2 + 2a\\Delta x" /></div>
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
