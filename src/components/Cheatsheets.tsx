import { useMemo, useState } from 'react';
import { Search, Lightbulb, FunctionSquare, Sparkles } from 'lucide-react';
import { cheatsheets, type Category } from '@/data/cheatsheets';
import { jrCheatsheets, type JrCategory } from '@/data/junior';
import { midCheatsheets, type MidCheatsheet } from '@/data/middle';
import { Math } from '@/components/Math';
import { useAgeLevel } from '@/context/AgeLevel';

type ProFilter = 'All' | Category;
type JrFilter = 'All' | JrCategory;
type MidFilter = 'All' | 'Math' | 'Physics';

const proCats: ProFilter[] = ['All', 'Math', 'Physics', 'CS'];
const jrCats: JrFilter[] = ['All', 'Math', 'Science', 'Tech'];
const midCats: MidFilter[] = ['All', 'Math', 'Physics'];

const proColor: Record<Category, string> = {
  Math: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Physics: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  CS: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
};
const jrColor: Record<JrCategory, string> = {
  Math: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Science: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Tech: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
};
const midColor: Record<'Math' | 'Physics', string> = {
  Math: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  Physics: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
};

export function Cheatsheets() {
  const { level } = useAgeLevel();
  const isJunior = level === 'junior';
  const isMiddle = level === 'middle';

  const [proFilter, setProFilter] = useState<ProFilter>('All');
  const [jrFilter, setJrFilter] = useState<JrFilter>('All');
  const [midFilter, setMidFilter] = useState<MidFilter>('All');
  const [query, setQuery] = useState('');

  const proFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cheatsheets.filter((c) => {
      if (proFilter !== 'All' && c.category !== proFilter) return false;
      if (!q) return true;
      return c.title.toLowerCase().includes(q) || c.tips.some((t) => t.toLowerCase().includes(q)) || c.formulas.some((f) => f.label.toLowerCase().includes(q));
    });
  }, [proFilter, query]);

  const jrFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jrCheatsheets.filter((c) => {
      if (jrFilter !== 'All' && c.category !== jrFilter) return false;
      if (!q) return true;
      return c.title.toLowerCase().includes(q) || c.blurb.toLowerCase().includes(q) || c.facts.some((f) => f.toLowerCase().includes(q));
    });
  }, [jrFilter, query]);

  const midFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return midCheatsheets.filter((c: MidCheatsheet) => {
      if (midFilter !== 'All' && c.category !== midFilter) return false;
      if (!q) return true;
      return c.title.toLowerCase().includes(q) || c.tips.some((t) => t.toLowerCase().includes(q)) || c.formulas.some((f) => f.label.toLowerCase().includes(q));
    });
  }, [midFilter, query]);

  const filter = isJunior ? jrFilter : isMiddle ? midFilter : proFilter;
  const setFilter = isJunior ? setJrFilter : isMiddle ? setMidFilter : setProFilter;
  const cats = isJunior ? jrCats : isMiddle ? midCats : proCats;
  const list = isJunior ? jrFiltered : isMiddle ? midFiltered : proFiltered;

  const title = isJunior ? 'Fun Fact Cards' : isMiddle ? '3AC Reference Sheets' : 'STEM Cheatsheets';
  const subtitle = isJunior
    ? 'Pick a topic and discover awesome science and math facts!'
    : isMiddle
    ? 'Curriculum formulas and tips for middle school. Filter by category or search.'
    : 'Browse advanced formulas and quick tips. Filter by category or search.';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const isActive = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c as ProFilter & JrFilter & MidFilter)}
                className={`chip ${isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder={isJunior ? 'Search fun facts...' : 'Search formulas, tips...'} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {isJunior ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {jrFiltered.map((sheet) => (
            <article key={sheet.id} className="card card-hover overflow-hidden">
              <div className="flex items-center gap-3 bg-gradient-to-br from-sky-50 to-cyan-50 p-5 dark:from-sky-500/10 dark:to-cyan-500/10">
                <span className="text-4xl">{sheet.emoji}</span>
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-slate-900 dark:text-white">{sheet.title}</h3>
                  <span className={`chip mt-1 ${jrColor[sheet.category]}`}>{sheet.category}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300">{sheet.blurb}</p>
                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400"><Sparkles className="h-3.5 w-3.5" />Cool facts</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {sheet.facts.map((f, i) => (<li key={i} className="flex gap-2"><span className="mt-0.5 text-sky-400">★</span>{f}</li>))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((sheet) => {
            const isMid = isMiddle;
            const cat = sheet.category as 'Math' | 'Physics' | 'CS';
            const colorClass = isMid ? midColor[cat as 'Math' | 'Physics'] : proColor[cat as Category];
            return (
              <article key={sheet.id} className="card card-hover p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white">{sheet.title}</h3>
                  <span className={`chip ${colorClass}`}>{sheet.category}</span>
                </div>
                <dl className="mt-4 space-y-2.5">
                  {sheet.formulas.map((f, i) => (
                    <div key={i} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"><FunctionSquare className="h-3.5 w-3.5" />{f.label}</dt>
                      <dd className="mt-1 overflow-x-auto text-slate-800 dark:text-slate-100"><Math tex={f.tex} display /></dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400"><Lightbulb className="h-3.5 w-3.5" />Quick tips</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                    {sheet.tips.map((t, i) => (<li key={i} className="flex gap-2"><span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-amber-400" />{t}</li>))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {list.length === 0 && (
        <p className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">No {isJunior ? 'fact cards' : 'cheatsheets'} match your search.</p>
      )}
    </div>
  );
}
