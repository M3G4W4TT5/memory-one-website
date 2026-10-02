export async function revealWhenReady(background: Promise<unknown>) {
  const root = document.documentElement;
  const content = document.querySelector<HTMLElement>('.page-view');
  const github = document.querySelector<HTMLElement>('.github-button');
  const main = document.querySelector('main');
  content!.inert = true;
  github!.inert = true;
  main?.setAttribute('aria-busy', 'true');
  const started = Number(root.dataset.loadStarted) || performance.now();
  const minimum = new Promise(resolve => setTimeout(resolve, Math.max(0, 2000 - (performance.now() - started))));
  const assets = Promise.allSettled([document.fonts.ready, background]);
  // Keep failed or stalled graphics from trapping the visitor behind the loader.
  let timeout: ReturnType<typeof setTimeout>;
  await Promise.all([minimum, Promise.race([assets, new Promise(resolve => { timeout = setTimeout(resolve, 8000); })])]);
  clearTimeout(timeout!);
  // Allow the renderer's first frame to paint before fading the loading overlay.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add('is-revealing');
    root.classList.remove('is-loading');
    const finish = () => {
      root.classList.remove('is-revealing');
      content!.inert = false;
      github!.inert = false;
      main?.removeAttribute('aria-busy');
      document.querySelector('.page-loader')?.remove();
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else setTimeout(finish, 1000);
  }));
}
