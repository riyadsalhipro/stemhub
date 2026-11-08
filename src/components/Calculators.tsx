import { useState } from 'react';
import { Battery, Gauge, Turtle, Rabbit } from 'lucide-react';
import { useAgeLevel } from '@/context/AgeLevel';
import { MiddleCalculators } from '@/components/MiddleCalculators';
import { AdvancedCalculators } from '@/components/AdvancedCalculators';

function fmt(n: number): string {
  if (!Number.isFinite(n)) return '—';
  return Number(n.toPrecision(4)).toString();
}

export function Calculators() {
  const { level } = useAgeLevel();
  if (level === 'junior') return <JuniorCalculators />;
  if (level === 'middle') return <MiddleCalculators />;
  return <AdvancedCalculators />;
}

/* ============================ JUNIOR ============================ */

function JuniorCalculators() {
  const [active, setActive] = useState<'battery' | 'speed'>('battery');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Play &amp; Learn</h2>
        <p className="mt-1 text-base text-slate-500 dark:text-slate-400">
          Slide the controls and watch what happens! No tricky math — just cool science.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive('battery')}
          className={`btn ${active === 'battery' ? 'bg-amber-500 text-white' : 'btn-ghost'}`}
        >
          <Battery className="h-4 w-4" />
          Battery Power
        </button>
        <button
          onClick={() => setActive('speed')}
          className={`btn ${active === 'speed' ? 'bg-sky-500 text-white' : 'btn-ghost'}`}
        >
          <Gauge className="h-4 w-4" />
          Speed Tracker
        </button>
      </div>

      <div key={active} className="animate-fade-in-up">
        {active === 'battery' && <BatteryCalc />}
        {active === 'speed' && <SpeedCalc />}
      </div>
    </div>
  );
}

function BatteryCalc() {
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(3);
  const current = voltage / resistance;
  const power = voltage * current;
  const bars = Math.min(10, Math.max(1, Math.round(current * 1.5)));

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Battery className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Battery Power</h3>
            <p className="text-sm text-amber-50">How much current flows through a wire?</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>Battery strength</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">{voltage} V</span>
            </label>
            <input type="range" min={1} max={12} step={1} value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full accent-amber-500" />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Slide to change the battery</p>
          </div>
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>Wire trickiness</span>
              <span className="font-mono text-orange-600 dark:text-orange-400">{resistance} Ω</span>
            </label>
            <input type="range" min={1} max={10} step={1} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="w-full accent-orange-500" />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">A trickier wire slows the current down</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl bg-amber-50 p-5 dark:bg-amber-500/10">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">Current flowing</p>
          <div className="mt-1 text-4xl font-bold text-amber-600 dark:text-amber-400">{fmt(current)} A</div>
          <div className="mt-3 flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`h-8 flex-1 rounded-md transition-all duration-300 ${i < bars ? 'bg-gradient-to-t from-amber-500 to-amber-300' : 'bg-slate-200 dark:bg-slate-700'}`} />
            ))}
          </div>
          <p className="mt-3 text-sm text-amber-700/80 dark:text-amber-300/80">More bars = more current zooming through! Power = {fmt(power)} W (watts).</p>
        </div>
        <div className="mt-4 rounded-xl bg-sky-50 p-4 text-sm text-sky-800 dark:bg-sky-500/10 dark:text-sky-200">
          <span className="font-bold">Did you know?</span> A bigger battery (more volts) pushes more current. A trickier wire (more ohms) holds it back!
        </div>
      </div>
    </div>
  );
}

function SpeedCalc() {
  const [time, setTime] = useState(4);
  const [accel, setAccel] = useState(3);
  const speed = accel * time;
  const distance = 0.5 * accel * time * time;
  const speedPct = Math.min(100, (speed / 40) * 100);

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-br from-sky-400 to-cyan-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Gauge className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Speed Tracker</h3>
            <p className="text-sm text-sky-50">Watch a car speed up over time!</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>Time (seconds)</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{time} s</span>
            </label>
            <input type="range" min={1} max={10} step={1} value={time} onChange={(e) => setTime(Number(e.target.value))} className="w-full accent-sky-500" />
          </div>
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>Push (acceleration)</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">{accel} m/s²</span>
            </label>
            <input type="range" min={1} max={8} step={1} value={accel} onChange={(e) => setAccel(Number(e.target.value))} className="w-full accent-cyan-500" />
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-sky-50 p-5 dark:bg-sky-500/10">
            <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">Final speed</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-bold text-sky-600 dark:text-sky-400">{fmt(speed)}</span>
              <span className="mb-1 text-sm text-sky-600 dark:text-sky-400">m/s</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300" style={{ width: `${speedPct}%` }} />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-sky-700/80 dark:text-sky-300/80">
              {speed < 10 ? <Turtle className="h-4 w-4" /> : <Rabbit className="h-4 w-4" />}
              {speed < 10 ? 'Steady like a turtle' : 'Zooming like a rabbit!'}
            </p>
          </div>
          <div className="rounded-2xl bg-cyan-50 p-5 dark:bg-cyan-500/10">
            <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Distance traveled</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{fmt(distance)}</span>
              <span className="mb-1 text-sm text-cyan-600 dark:text-cyan-400">meters</span>
            </div>
            <p className="mt-3 text-xs text-cyan-700/80 dark:text-cyan-300/80">That is about {Math.round(distance)} big steps!</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">
          <span className="font-bold">Cool fact!</span> The longer you push something, the faster it goes. That is how rockets reach space!
        </div>
      </div>
    </div>
  );
}
