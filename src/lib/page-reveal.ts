type LogoMark = { playIntro: () => Promise<unknown> };

export async function revealWhenReady(background: Promise<unknown>, logo: Promise<LogoMark | void>) {
  const root = document.documentElement;
  const content = document.querySelector<HTMLElement>('.page-view');
  const github = document.querySelector<HTMLElement>('.github-button');
  const main = document.querySelector('main');
  content!.inert = true;
  github!.inert = true;
  main?.setAttribute('aria-busy', 'true');
  const loader = document.querySelector<HTMLElement>('.page-loader');
  const mark: { controller?: LogoMark | void } = {};
  const assets = Promise.allSettled([document.fonts.ready, background, logo.then(value => { mark.controller = value; })]);
  // Keep failed or stalled graphics from trapping the visitor behind the loader.
  let timeout: ReturnType<typeof setTimeout>;
  await Promise.race([assets, new Promise(resolve => { timeout = setTimeout(resolve, 4000); })]);
  clearTimeout(timeout!);
  // Let the single 3D turn finish, with a bounded fallback for hidden/stalled rendering.
  await Promise.race([
    mark.controller?.playIntro() ?? Promise.resolve(),
    new Promise(resolve => { timeout = setTimeout(resolve, 5000); }),
  ]);
  clearTimeout(timeout!);
  const fade = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 800;
  if (loader) loader.style.transitionDuration = `${fade}ms`;
  root.classList.add('is-revealing');
  root.classList.remove('is-loading');
  const finish = () => {
    root.classList.remove('is-revealing');
    content!.inert = false;
    github!.inert = false;
    main?.removeAttribute('aria-busy');
    loader?.remove();
  };
  if (fade === 0) finish();
  else setTimeout(finish, fade);
}
