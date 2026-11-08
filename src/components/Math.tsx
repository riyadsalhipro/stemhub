import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export function Math({ tex, display = false, className }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, {
        throwOnError: false,
        displayMode: display,
        output: 'html',
      });
    } catch {
      if (ref.current) ref.current.textContent = tex;
    }
  }, [tex, display]);

  return <span ref={ref} className={className} aria-label={tex} />;
}
