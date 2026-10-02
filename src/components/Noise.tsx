/*!
MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Adapted from the supplied React Bits Noise component.
'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import './Noise.css';

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250, patternScaleX = 1, patternScaleY = 1,
  patternRefreshInterval = 2, patternAlpha = 15,
}) => {
  const grainRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = grainRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;
    const pattern = document.createElement('canvas');
    const size = Math.max(1, Math.round(patternSize));
    pattern.width = pattern.height = size;
    const patternContext = pattern.getContext('2d');
    if (!patternContext) return;
    const pixels = patternContext.createImageData(size, size);
    const alpha = Math.min(255, Math.max(0, Math.round(patternAlpha)));
    const interval = Math.max(1, Math.round(patternRefreshInterval));
    const scaleX = Math.max(0.01, patternScaleX);
    const scaleY = Math.max(0.01, patternScaleY);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let animationId = 0;

    const drawGrain = () => {
      // Refresh only the small repeating tile rather than a full-screen pixel buffer.
      for (let i = 0; i < pixels.data.length; i += 4) {
        const value = Math.floor(Math.random() * 256);
        pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = value;
        pixels.data[i + 3] = alpha;
      }
      patternContext.putImageData(pixels, 0, 0);
      const fill = ctx.createPattern(pattern, 'repeat');
      if (!fill) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, canvas.width / scaleX, canvas.height / scaleY);
    };
    const loop = () => {
      animationId = 0;
      if (document.hidden || motion.matches) return;
      if (frame++ % interval === 0) drawGrain();
      animationId = requestAnimationFrame(loop);
    };
    const resume = () => {
      cancelAnimationFrame(animationId);
      animationId = 0;
      if (!document.hidden && !motion.matches) animationId = requestAnimationFrame(loop);
    };
    const resize = () => {
      canvas.width = Math.max(1, window.innerWidth);
      canvas.height = Math.max(1, window.innerHeight);
      drawGrain();
      resume();
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', resume);
    motion.addEventListener('change', resume);
    resize();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', resume);
      motion.removeEventListener('change', resume);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);
  return <canvas className="noise-overlay" ref={grainRef} aria-hidden="true" style={{ imageRendering: 'pixelated' }} />;
};
export default Noise;
