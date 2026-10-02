import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const colours = ['#85AF00', '#FFCC00', '#FB9CFD', '#A19BFF', '#FF4C00'];
const glyphs = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+={}[]|\\:;"?/~`');
const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let splits: SplitText[] = [];

function splitText(element: HTMLElement) {
  if (!element.hasAttribute('aria-label')) {
    element.setAttribute('aria-label', element.textContent!.replace(/\s+/g, ' ').trim());
  }
  let cleanUp = () => {};
  return SplitText.create(element, {
    type: 'lines,chars',
    linesClass: 'scramble-line',
    charsClass: 'scramble-char',
    autoSplit: true,
    aria: 'none',
    onRevert: () => cleanUp(),
    onSplit: (split) => {
      cleanUp();
      const disposers: Array<() => void> = [];

      split.lines.forEach((line) => {
        line.setAttribute('aria-hidden', 'true');
        const chars = split.chars.filter((char) => line.contains(char)) as HTMLElement[];
        const states = chars.map((char) => {
          const original = document.createElement('span');
          original.textContent = char.textContent;
          char.replaceChildren(original);
          return { char, original, colour: getComputedStyle(char).color };
        });
        let animation: gsap.core.Timeline | undefined;

        const restore = () => {
          animation?.kill();
          states.forEach(({ char, original, colour }) => {
            char.replaceChildren(original);
            original.style.visibility = '';
            char.style.color = colour;
            char.style.outline = '';
          });
        };

        const animate = () => {
          restore();
          animation = gsap.timeline();
          const middle = (states.length - 1) / 2;
          states.forEach(({ char, original, colour }, index) => {
            animation!.fromTo(char, { color: colour }, {
              color: pick(colours),
              duration: 0.3,
              ease: 'power3.out',
              repeat: 1,
              yoyo: true,
              onStart: () => {
                // An overlay keeps the original glyph's width throughout the scramble.
                if (Math.random() < 0.5) {
                  const glyph = document.createElement('span');
                  glyph.className = 'scramble-glyph';
                  glyph.textContent = pick(glyphs);
                  original.style.visibility = 'hidden';
                  char.append(glyph);
                }
                if (Math.random() < 1 / 3) {
                  const detail = document.createElement('span');
                  detail.className = 'scramble-detail';
                  detail.textContent = `△x = ${Math.round(char.getBoundingClientRect().width)}px`;
                  char.append(detail);
                  char.style.outline = `1px solid ${pick(colours)}`;
                }
              },
              onComplete: () => {
                char.replaceChildren(original);
                original.style.visibility = '';
                char.style.color = colour;
                char.style.outline = '';
              },
            }, Math.abs(index - middle) * 0.03);
          });
        };

        line.addEventListener('mouseenter', animate);
        disposers.push(() => {
          line.removeEventListener('mouseenter', animate);
          restore();
        });
      });

      cleanUp = () => disposers.forEach((dispose) => dispose());
    },
  });
}

function initialise() {
  splits.forEach((split) => { split.revert(); split.kill(); });
  splits = [];
  if (!reducedMotion.matches) {
    splits = Array.from(document.querySelectorAll<HTMLElement>('[data-scramble]'), splitText);
  }
}

document.fonts.ready.then(() => {
  initialise();
  reducedMotion.addEventListener('change', initialise);
});
