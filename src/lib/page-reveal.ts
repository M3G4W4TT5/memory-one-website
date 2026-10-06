export async function revealWhenReady(background: Promise<unknown>) {
  const root = document.documentElement;
  const content = document.querySelector<HTMLElement>('.page-view');
  const github = document.querySelector<HTMLElement>('.github-button');
  const main = document.querySelector('main');
  content!.inert = true;
  github!.inert = true;
  main?.setAttribute('aria-busy', 'true');
  const video = document.querySelector<HTMLVideoElement>('.loading-logo');
  const loader = document.querySelector<HTMLElement>('.page-loader');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Prepare the website before starting the video so asset loading cannot delay its fade.
  const assets = Promise.allSettled([document.fonts.ready, background]);
  // Keep failed or stalled graphics from trapping the visitor behind the loader.
  let timeout: ReturnType<typeof setTimeout>;
  await Promise.race([assets, new Promise(resolve => { timeout = setTimeout(resolve, 4000); })]);
  clearTimeout(timeout!);
  await new Promise<void>(resolve => {
    let frame = 0;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(fallback);
      cancelAnimationFrame(frame);
      resolve();
    };
    // Use playback time so buffering never counts toward the three-second intro.
    const check = () => {
      if (settled) return;
      if (video!.currentTime >= 3 || video!.ended) finish();
      else frame = requestAnimationFrame(check);
    };
    let fallback = setTimeout(finish, video && !reducedMotion ? 5000 : 3000);
    if (video && !reducedMotion) {
      check();
      video.play().catch(() => {
        if (settled) return;
        // Keep a still logo visible briefly when video playback is unavailable.
        clearTimeout(fallback);
        fallback = setTimeout(finish, 3000);
      });
    }
  });
  // Compensate for a late frame so the overlay is gone by playback second four.
  const fade = reducedMotion ? 0 : Math.min(1000, Math.max(0, (4 - (video?.currentTime || 3)) * 1000));
  if (loader) loader.style.transitionDuration = `${fade}ms`;
  root.classList.add('is-revealing');
  root.classList.remove('is-loading');
  const finish = () => {
    root.classList.remove('is-revealing');
    content!.inert = false;
    github!.inert = false;
    main?.removeAttribute('aria-busy');
    video?.pause();
    loader?.remove();
  };
  if (fade === 0) finish();
  else setTimeout(finish, fade);
}
