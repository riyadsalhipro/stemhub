import { useMemo, useState } from 'react';
import { Copy, Check, FlaskConical, FileText } from 'lucide-react';

interface Fields {
  title: string;
  author: string;
  date: string;
  course: string;
  objective: string;
  hypothesis: string;
  materials: string;
  procedure: string;
  data: string;
  analysis: string;
  conclusion: string;
}

const empty: Fields = {
  title: '',
  author: '',
  date: new Date().toISOString().slice(0, 10),
  course: '',
  objective: '',
  hypothesis: '',
  materials: '',
  procedure: '',
  data: '',
  analysis: '',
  conclusion: '',
};

const sections: { key: keyof Fields; label: string; textarea: boolean; placeholder: string }[] = [
  { key: 'objective', label: 'Objective', textarea: false, placeholder: 'Measure the acceleration due to gravity.' },
  { key: 'hypothesis', label: 'Hypothesis', textarea: true, placeholder: 'If height increases, fall time increases with √(2h/g).' },
  { key: 'materials', label: 'Materials & Equipment', textarea: true, placeholder: 'Ruler, stopwatch, ball, clamp stand...' },
  { key: 'procedure', label: 'Procedure', textarea: true, placeholder: '1. Set up the stand...\n2. Drop the ball from height h...\n3. Record time for 5 trials.' },
  { key: 'data', label: 'Data & Observations', textarea: true, placeholder: '| Trial | h (m) | t (s) |\n|------|-------|------|\n| 1    | 1.0   | 0.45 |' },
  { key: 'analysis', label: 'Analysis', textarea: true, placeholder: 'Average t = 0.46 s. Using g = 2h/t² = 9.4 m/s².' },
  { key: 'conclusion', label: 'Conclusion', textarea: true, placeholder: 'Measured g ≈ 9.4 m/s², within 4% of 9.81. Hypothesis supported.' },
];

function buildMarkdown(f: Fields): string {
  const line = (label: string, val: string) =>
    val.trim() ? `- **${label}:** ${val.trim()}` : '';
  return [
    `# ${f.title.trim() || 'Lab Report'}`,
    '',
    `> **Course:** ${f.course.trim() || '—'}  `,
    `> **Author:** ${f.author.trim() || '—'}  `,
    `> **Date:** ${f.date.trim() || '—'}`,
    '',
    '---',
    '',
    '## Objective',
    f.objective.trim() || '_To be completed._',
    '',
    '## Hypothesis',
    f.hypothesis.trim() || '_To be completed._',
    '',
    '## Materials & Equipment',
    f.materials.trim() || '_To be completed._',
    '',
    '## Procedure',
    f.procedure.trim() || '_To be completed._',
    '',
    '## Data & Observations',
    f.data.trim() || '_To be completed._',
    '',
    '## Analysis',
    f.analysis.trim() || '_To be completed._',
    '',
    '## Conclusion',
    f.conclusion.trim() || '_To be completed._',
    '',
    '---',
    `*Generated with STEMHub on ${f.date || new Date().toISOString().slice(0, 10)}.*`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function LabReport() {
  const [fields, setFields] = useState<Fields>(empty);
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => buildMarkdown(fields), [fields]);

  function update(key: keyof Fields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Lab Report Generator</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill in the structured template, then copy the formatted Markdown.
          </p>
        </div>
        <button onClick={copy} className={copied ? 'btn bg-emerald-600 text-white' : 'btn-primary'}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <FlaskConical className="h-5 w-5" />
            <h3 className="font-bold text-slate-900 dark:text-white">Report details</h3>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Report title</label>
              <input
                className="input"
                value={fields.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Determining g by Free Fall"
              />
            </div>
            <div>
              <label className="label">Author</label>
              <input className="input" value={fields.author} onChange={(e) => update('author', e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="label">Date</label>
              <input type="date" className="input" value={fields.date} onChange={(e) => update('date', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Course</label>
              <input className="input" value={fields.course} onChange={(e) => update('course', e.target.value)} placeholder="PHYS 101 — Mechanics" />
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {sections.map((s) => (
              <div key={s.key}>
                <label className="label">{s.label}</label>
                {s.textarea ? (
                  <textarea
                    className="input min-h-[90px] resize-y font-mono text-xs leading-relaxed"
                    value={fields[s.key]}
                    onChange={(e) => update(s.key, e.target.value)}
                    placeholder={s.placeholder}
                  />
                ) : (
                  <input
                    className="input"
                    value={fields[s.key]}
                    onChange={(e) => update(s.key, e.target.value)}
                    placeholder={s.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card flex flex-col p-0 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <FileText className="h-5 w-5" />
              <h3 className="font-bold">Markdown preview</h3>
            </div>
            <button onClick={copy} className="btn-ghost px-3 py-1.5 text-xs">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-words p-5 font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {markdown}
          </pre>
        </div>
      </div>
    </div>
  );
}
