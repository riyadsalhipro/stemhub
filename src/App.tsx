import { useEffect, useState } from 'react';
import { Calculator, BookOpen, FlaskConical, BrainCircuit, Moon, Sun, Menu, X, Atom, Rocket, GraduationCap } from 'lucide-react';
import { Calculators } from '@/components/Calculators';
import { Cheatsheets } from '@/components/Cheatsheets';
import { LabReport } from '@/components/LabReport';
import { Quiz } from '@/components/Quiz';
import { AgeLevelContext, type AgeLevel } from '@/context/AgeLevel';

type Tab = 'calculators' | 'cheatsheets' | 'lab' | 'quiz';

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('stemhub-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('stemhub-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

function useAgeLevelState(): { level: AgeLevel; toggle: () => void; setLevel: (l: AgeLevel) => void } {
  const [level, setLevel] = useState<AgeLevel>(() => {
    const stored = localStorage.getItem('stemhub-age');
    return stored === 'junior' ? 'junior' : 'pro';
  });

  useEffect(() => {
    localStorage.setItem('stemhub-age', level);
  }, [level]);

  return { level, setLevel, toggle: () => setLevel((l) => (l === 'junior' ? 'pro' : 'junior')) };
}

export default function App() {
  const [tab, setTab] = useState<Tab>('calculators');
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useDarkMode();
  const age = useAgeLevelState();
  const isJunior = age.level === 'junior';

  // Junior mode: hide the Lab Report tab (advanced tool)
  const tabs: { id: Tab; label: string; icon: typeof Calculator; blurb: string }[] = isJunior
    ? [
        { id: 'calculators', label: 'Play & Learn', icon: Calculator, blurb: 'Slide and explore' },
        { id: 'cheatsheets', label: 'Fun Facts', icon: BookOpen, blurb: 'Cool science' },
        { id: 'quiz', label: 'Quiz Time', icon: BrainCircuit, blurb: 'Test yourself' },
      ]
    : [
        { id: 'calculators', label: 'Calculators', icon: Calculator, blurb: 'Solve with steps' },
        { id: 'cheatsheets', label: 'Cheatsheets', icon: BookOpen, blurb: 'Formulas & tips' },
        { id: 'lab', label: 'Lab Report', icon: FlaskConical, blurb: 'Markdown export' },
        { id: 'quiz', label: 'Quick Quiz', icon: BrainCircuit, blurb: 'Test yourself' },
      ];

  function selectTab(t: Tab) {
    setTab(t);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <AgeLevelContext.Provider value={age}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-ink-950 dark:text-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/80">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            <button onClick={() => selectTab('calculators')} className="flex flex-none items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-sm shadow-sky-500/30">
                <Atom className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                STEM<span className="text-sky-500">Hub</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectTab(t.id)}
                    className={`group flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={age.toggle}
                aria-label="Toggle age level"
                className={`flex h-9 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-bold transition-all duration-200 ${
                  isJunior
                    ? 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/15 dark:text-fuchsia-300'
                    : 'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/15 dark:text-sky-300'
                }`}
                title={isJunior ? 'Switch to Pro Mode (Ages 12+)' : 'Switch to Junior Mode (Ages 7–11)'}
              >
                {isJunior ? <GraduationCap className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}
                <span className="hidden sm:inline">{isJunior ? 'Junior' : 'Pro'}</span>
              </button>
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => selectTab(t.id)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          )}
        </header>

        {/* Age Level Switcher banner */}
        <AgeLevelBanner level={age.level} onChange={age.setLevel} />

        {/* Hero */}
        {tab === 'calculators' && (
          <section className={`relative overflow-hidden border-b border-slate-200 dark:border-slate-800 ${
            isJunior ? 'bg-gradient-to-br from-fuchsia-50 via-white to-sky-50 dark:from-fuchsia-950/20 dark:via-ink-950 dark:to-sky-950/20' : ''
          }`}>
            {!isJunior && <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-cyan-50 dark:from-sky-950/30 dark:via-ink-950 dark:to-cyan-950/20" />}
            <div className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10" />
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
              <span className={`chip ${isJunior ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300' : 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300'}`}>
                {isJunior ? <GraduationCap className="h-3.5 w-3.5" /> : <Atom className="h-3.5 w-3.5" />}
                {isJunior ? 'Junior Mode · Ages 7–11' : 'Your all-in-one STEM toolkit'}
              </span>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {isJunior
                  ? 'Explore science and math — the fun way!'
                  : 'Calculators, cheatsheets, lab reports & quizzes — in one place.'}
              </h1>
              <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400">
                {isJunior
                  ? 'Slide the controls, read cool facts, and take fun quizzes. No tricky equations — just awesome discoveries.'
                  : 'STEMHub brings four essential study tools together with beautiful math rendering, step-by-step solutions, and a clean card-based interface.'}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => selectTab(t.id)}
                      className="card card-hover group flex items-center gap-3 px-4 py-3 text-left"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-sky-500 group-hover:text-white dark:bg-slate-800 dark:text-slate-200">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900 dark:text-white">{t.label}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">{t.blurb}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Main content */}
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div key={`${tab}-${age.level}`} className="animate-fade-in-up">
            {tab === 'calculators' && <Calculators />}
            {tab === 'cheatsheets' && <Cheatsheets />}
            {tab === 'lab' && (isJunior ? <JuniorLabMessage /> : <LabReport />)}
            {tab === 'quiz' && <Quiz />}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Atom className="h-4 w-4 text-sky-500" />
              <span className="font-semibold">STEMHub</span>
              <span className="hidden sm:inline">· Built for curious minds of every age.</span>
            </div>
            <span>{isJunior ? 'Junior Mode · ' : 'Pro Mode · '}Math rendered with KaTeX · {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </AgeLevelContext.Provider>
  );
}

function AgeLevelBanner({ level, onChange }: { level: AgeLevel; onChange: (l: AgeLevel) => void }) {
  const isJunior = level === 'junior';
  return (
    <div className="border-b border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2.5 sm:px-6">
        <div className="relative flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => onChange('junior')}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
              isJunior ? 'text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Junior
            <span className="hidden text-[10px] font-medium opacity-80 sm:inline">7–11</span>
          </button>
          <button
            onClick={() => onChange('pro')}
            className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
              !isJunior ? 'text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Rocket className="h-3.5 w-3.5" />
            Pro
            <span className="hidden text-[10px] font-medium opacity-80 sm:inline">12+</span>
          </button>
          <span
            className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ${
              isJunior
                ? 'left-1 right-1/2 bg-gradient-to-r from-fuchsia-500 to-pink-500'
                : 'left-1/2 right-1 bg-gradient-to-r from-sky-500 to-cyan-500'
            }`}
            style={{ zIndex: 0 }}
          />
        </div>
      </div>
    </div>
  );
}

function JuniorLabMessage() {
  return (
    <div className="card p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/15 dark:text-fuchsia-300">
        <FlaskConical className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Lab Report is a Pro tool</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The Lab Report Generator is designed for older students (12+). Switch to Pro Mode up top to unlock it!
      </p>
    </div>
  );
}
