import { useMemo, useState } from 'react';
import { Check, X, RotateCcw, Trophy, Brain, ChevronRight, Sparkles } from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '@/data/quiz';
import { jrQuizQuestions, type JrQuizQuestion } from '@/data/junior';
import type { Category } from '@/data/cheatsheets';
import type { JrCategory } from '@/data/junior';
import { useAgeLevel } from '@/context/AgeLevel';

type ProFilter = 'All' | Category;
type JrFilter = 'All' | JrCategory;

const proCats: ProFilter[] = ['All', 'Math', 'Physics', 'CS'];
const jrCats: JrFilter[] = ['All', 'Math', 'Science', 'Tech'];

type AnyQuestion = (QuizQuestion & { emoji?: string }) | (JrQuizQuestion & { category: string });

function isJr(q: AnyQuestion): q is JrQuizQuestion & { category: string } {
  return 'emoji' in q && typeof (q as JrQuizQuestion).emoji === 'string';
}

export function Quiz() {
  const { level } = useAgeLevel();
  const isJunior = level === 'junior';

  const [proFilter, setProFilter] = useState<ProFilter>('All');
  const [jrFilter, setJrFilter] = useState<JrFilter>('All');
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState<AnyQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const filter = isJunior ? jrFilter : proFilter;

  const filtered = useMemo<AnyQuestion[]>(() => {
    const base: AnyQuestion[] = isJunior
      ? jrQuizQuestions
      : quizQuestions;
    const f = isJunior ? jrFilter : proFilter;
    const list = f === 'All' ? base : base.filter((q) => q.category === f);
    return [...list].sort(() => Math.random() - 0.5);
  }, [isJunior, jrFilter, proFilter]);

  function start() {
    setPool(filtered);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setStarted(true);
  }

  function reset() {
    setStarted(false);
    setFinished(false);
    setIdx(0);
    setSelected(null);
    setAnswers([]);
  }

  function select(i: number) {
    if (selected !== null) return;
    setSelected(i);
  }

  function next() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (idx + 1 >= pool.length) setFinished(true);
    else setIdx(idx + 1);
  }

  function setFilterVal(v: ProFilter & JrFilter) {
    if (isJunior) setJrFilter(v as JrFilter);
    else setProFilter(v as ProFilter);
  }

  const cats = isJunior ? jrCats : proCats;
  const accent = isJunior ? 'from-fuchsia-500 to-pink-500' : 'from-sky-100 to-sky-500/15';

  if (!started) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isJunior ? 'Quiz Time!' : 'Quick Quiz'}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {isJunior
              ? 'Answer fun questions and learn something new!'
              : 'Test yourself with multiple-choice questions and instant explanations.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilterVal(c as ProFilter & JrFilter)}
              className={`chip ${
                filter === c
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="card card-hover p-8 text-center">
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white`}>
            {isJunior ? <Sparkles className="h-7 w-7" /> : <Brain className="h-7 w-7" />}
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            {isJunior ? 'Ready to play?' : 'Ready to start?'}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {filtered.length} question{filtered.length === 1 ? '' : 's'} in the {filter} set.
          </p>
          <button className="btn-primary mt-5" onClick={start} disabled={filtered.length === 0}>
            {isJunior ? 'Start playing' : 'Start quiz'}
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const score = answers.reduce((acc, a, i) => acc + (a === pool[i].answer ? 1 : 0), 0);
    const pct = Math.round((score / pool.length) * 100);
    const tier =
      pct >= 80 ? { label: isJunior ? 'Amazing!' : 'Excellent', color: 'text-emerald-600 dark:text-emerald-400' }
      : pct >= 50 ? { label: isJunior ? 'Nice job!' : 'Good effort', color: 'text-sky-600 dark:text-sky-400' }
      : { label: isJunior ? 'Keep going!' : 'Keep practicing', color: 'text-amber-600 dark:text-amber-400' };

    return (
      <div className="space-y-6">
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
            <Trophy className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
            {score} / {pool.length}
          </h3>
          <p className={`mt-1 text-sm font-semibold ${tier.color}`}>{tier.label} — {pct}%</p>
          <button className="btn-ghost mt-5" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            {isJunior ? 'Play again' : 'Try again'}
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Review</h4>
          {pool.map((q, i) => {
            const correct = answers[i] === q.answer;
            return (
              <div key={q.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-white ${correct ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {isJr(q) && <span className="mr-1">{q.emoji}</span>}
                      {i + 1}. {q.question}
                    </p>
                    {!correct && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Your answer: <span className="text-red-600 dark:text-red-400">{q.choices[answers[i]]}</span>
                        {' · '}
                        Correct: <span className="text-emerald-600 dark:text-emerald-400">{q.choices[q.answer]}</span>
                      </p>
                    )}
                    <p className="mt-2 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const q = pool[idx];
  if (!q) return null;
  const isAnswered = selected !== null;
  const progress = (idx / pool.length) * 100;
  const jr = isJr(q);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isJunior ? 'Quiz Time!' : 'Quick Quiz'}
        </h2>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{idx + 1} / {pool.length}</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className="h-full rounded-full bg-sky-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div key={q.id} className="card p-6 animate-fade-in-up">
        <div className="flex items-center gap-2">
          <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{q.category}</span>
          {jr && <span className="text-2xl">{q.emoji}</span>}
        </div>
        <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{q.question}</h3>

        <div className={`mt-4 grid gap-2.5 ${isJunior ? 'sm:grid-cols-1' : 'sm:grid-cols-2'}`}>
          {q.choices.map((choice, i) => {
            const isCorrect = i === q.answer;
            const isPicked = i === selected;
            let cls = 'border-slate-200 hover:border-sky-400 hover:bg-sky-50 dark:border-slate-700 dark:hover:border-sky-600 dark:hover:bg-sky-500/10';
            if (isAnswered) {
              if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10';
              else if (isPicked) cls = 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-500/10';
              else cls = 'border-slate-200 opacity-60 dark:border-slate-700';
            }
            return (
              <button
                key={i}
                onClick={() => select(i)}
                disabled={isAnswered}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-all duration-200 dark:text-slate-200 ${cls}`}
              >
                <span>{choice}</span>
                {isAnswered && isCorrect && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                {isAnswered && isPicked && !isCorrect && <X className="h-4 w-4 text-red-600 dark:text-red-400" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-4 animate-fade-in-up rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
              {isJunior ? 'Why?' : 'Explanation'}
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{q.explanation}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button onClick={next} disabled={!isAnswered} className="btn-primary">
            {idx + 1 >= pool.length ? 'Finish' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
