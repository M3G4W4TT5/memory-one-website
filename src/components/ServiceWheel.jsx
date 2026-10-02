import { useEffect, useRef, useState } from 'react';
import OptionWheel from './OptionWheel';

const items = [
  'Web Design & UX', 'Web Development', 'Branding & Visual Identity',
  'Software Development', 'Agentic AI', 'System Integration',
  'AI Search Optimisation', 'SEO', 'Managed Operations', 'Consulting',
];

export default function ServiceWheel() {
  const container = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const update = () => setVisible(desktop.matches);
    update();
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);
  const [layout, setLayout] = useState({ fontSize: 3, inset: 80 });
  useEffect(() => {
    if (!visible || !container.current) return;
    let disposed = false;
    const measure = () => {
      const width = container.current?.clientWidth || 1;
      const inset = width >= 600 ? 80 : 24;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      // Preserve the existing responsive font size while changing the displayed face.
      context.font = `500 ${3 * rem}px 'FK Grotesk'`;
      const longest = Math.max(...items.map(item => context.measureText(item).width));
      const fontSize = Math.min(3, 3 * Math.max(1, width - inset - 16) / longest);
      setLayout({ fontSize, inset });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container.current);
    measure();
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => { disposed = true; observer.disconnect(); };
  }, [visible]);

  if (!visible) return null;
  return (
    <div ref={container} className="service-wheel">
      <OptionWheel items={items} defaultSelected={2} textColor="#CFCFC5"
        activeColor="#CFCFC5" side="right" fontSize={layout.fontSize}
        spacing={1.4} curve={1} tilt={6} blur={2} fade={0.25}
        smoothing={200} inset={layout.inset} loop draggable />
    </div>
  );
}
