import { useEffect, useState } from 'react';
import ThoughtLine from './ThoughtLine';

export default function ConstructionThought({ steps }: { steps: string[] }) {
  const [visibleCount, setVisibleCount] = useState(1);
  useEffect(() => {
    let count = 1;
    let interval: ReturnType<typeof setInterval> | undefined;
    const root = document.documentElement;
    const observer = new MutationObserver(begin);
    function begin() {
      if (root.classList.contains('is-loading') || root.classList.contains('is-revealing') || interval) return;
      observer.disconnect();
      interval = setInterval(() => {
        count = Math.min(count + 1, steps.length);
        setVisibleCount(count);
        if (count === steps.length) clearInterval(interval);
      }, 1600);
    }
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    begin();
    return () => { observer.disconnect(); clearInterval(interval); };
  }, [steps]);

  return <ThoughtLine working steps={steps.slice(0, visibleCount)} label="Thinking…"
    doneLabel="Thought for" glyph="sparkle" fontSize={16} breathPeriod={1.6}
    breathDepth={0.45} settleDuration={350} settleBlur={2} collapsible
    collapseOnSettle showTimer settleAfter={0} color="#CFCFC5" />;
}
