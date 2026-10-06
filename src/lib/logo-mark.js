import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';

// Bounds of the orange mark in the supplied 1200 × 640 loading clip.
const VIDEO_MARK = { x: 600, y: 168, width: 346, height: 250 };
const TAU = Math.PI * 2;
const mix = (a, b, t) => a + (b - a) * t;
const curve = (a, b, c, d, t) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;

export async function initLogoMark() {
  const button = document.querySelector('.logo-mark');
  const canvas = button?.querySelector('canvas');
  if (!button || !canvas) return;
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(256, 256, false);
  renderer.setClearColor(0x000000, 0);
  // Preserve the saturated brand orange instead of desaturating it toward gold.
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1.25, 1.25, 1.25, -1.25, .1, 20);
  camera.position.z = 6;
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const reflection = pmrem.fromScene(environment, .04);
  scene.environment = reflection.texture;
  environment.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xffb66b, .8);
  key.position.set(-3, 4, 5);
  const rim = new THREE.DirectionalLight(0xff9b4a, .6);
  rim.position.set(4, 1, 3);
  scene.add(key, rim, new THREE.AmbientLight(0xffffff, .3));

  let model;
  try {
    model = (await new GLTFLoader().loadAsync('/brand/memory-one-mark.glb')).scene;
  } catch {
    reflection.dispose();
    renderer.dispose();
    return;
  }
  const bounds = new THREE.Box3().setFromObject(model);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  model.position.copy(center).multiplyScalar(-1);
  const normalized = new THREE.Group();
  normalized.scale.setScalar(2 / size.x);
  normalized.add(model);
  const coin = new THREE.Group();
  coin.add(normalized);
  scene.add(coin);
  const glint = { value: -10 };
  const material = new THREE.MeshPhysicalMaterial({
    color: '#ff7f00', metalness: .72, roughness: .25,
    clearcoat: .2, clearcoatRoughness: .18,
    emissive: '#ff7f00', emissiveIntensity: .28, envMapIntensity: .3,
  });
  // A narrow reflection sweeps across the actual mesh, leaving the cut-outs clear.
  material.onBeforeCompile = shader => {
    shader.uniforms.uLogoGlint = glint;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLogoPosition;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLogoPosition = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLogoPosition;\nuniform float uLogoGlint;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float stripe = (vLogoPosition.x + vLogoPosition.y * .32 - uLogoGlint) / .16;
        float logoReflection = exp(-stripe * stripe);`)
      // Keep bright studio reflections orange; only the passing glint goes white.
      .replace('#include <opaque_fragment>', `
        outgoingLight = diffuseColor.rgb * min(outgoingLight.r, 1.0)
          + vec3(1.0, .86, .64) * logoReflection * 2.2;
        #include <opaque_fragment>`);
  };
  model.traverse(mesh => {
    if (mesh.isMesh) {
      const original = mesh.material;
      mesh.material = material;
      if (Array.isArray(original)) original.forEach(item => item.dispose());
      else original.dispose();
    }
  });
  button.dataset.renderer = 'webgl';
  let state = 'waiting';
  let flight;
  let spin;
  let shine;
  let frame = 0;
  let disposed = false;
  let origin;
  const pose = { progress: 0 };

  // Paint only while something changes; the resting mark has no animation loop.
  const paint = () => {
    if (disposed || document.hidden || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      renderer.render(scene, camera);
    });
  };
  const corner = () => {
    const styles = getComputedStyle(button);
    return { x: parseFloat(styles.left) + 22.5, y: parseFloat(styles.top) + 22.5, size: 45 };
  };
  const measureVideo = () => {
    const video = document.querySelector('.loading-logo');
    if (!video) return corner();
    const rect = video.getBoundingClientRect();
    // object-fit: contain can add letterboxing on short/landscape screens.
    const scale = Math.min(rect.width / 1200, rect.height / 640);
    return {
      x: rect.x + (rect.width - scale * 1200) / 2 + VIDEO_MARK.x * scale,
      y: rect.y + (rect.height - scale * 640) / 2 + VIDEO_MARK.y * scale,
      size: VIDEO_MARK.width * scale / .8,
    };
  };
  const place = (x, y, diameter) => {
    const target = corner();
    button.style.transform = `translate3d(${x - target.x}px, ${y - target.y}px, 0) scale(${diameter / 45})`;
  };
  const glow = amount => {
    canvas.style.filter = amount > .001 ? `drop-shadow(0 0 ${3 * amount}px rgb(255 127 0 / ${.55 * amount})) drop-shadow(0 0 ${9 * amount}px rgb(255 127 0 / ${.3 * amount}))` : '';
    material.emissiveIntensity = .28 + amount * .14;
  };
  const rest = () => {
    state = 'rest';
    button.dataset.state = state;
    button.disabled = false;
    button.style.transform = '';
    coin.rotation.set(0, 0, 0);
    coin.scale.set(1, 1, 1);
    glow(0);
    paint();
  };
  const align = () => {
    origin = measureVideo();
    place(origin.x, origin.y, origin.size);
    coin.rotation.set(0, 0, 0);
    // Match the video projection, then return to the model's native proportions.
    coin.scale.y = (VIDEO_MARK.height / VIDEO_MARK.width) * (size.x / size.y);
    glow(1);
    paint();
  };
  const updateFlight = () => {
    const p = pose.progress;
    const target = corner();
    const dx = target.x - origin.x;
    const dy = target.y - origin.y;
    const wobble = Math.sin(Math.PI * p) * (1 - p);
    const x = curve(origin.x, origin.x + dx * .18, target.x - dx * .12, target.x, p);
    const y = curve(origin.y, origin.y + dy * .6, target.y - dy * .12, target.y, p);
    place(x + Math.sin(p * Math.PI * 3) * wobble * 12, y, Math.exp(mix(Math.log(origin.size), Math.log(45), p)));
    coin.rotation.set(Math.sin(Math.PI * p) * .72 + Math.sin(p * Math.PI * 4) * wobble * .16,
      -Math.sin(Math.PI * p) * 1.3 + Math.sin(p * Math.PI * 3) * wobble * .22,
      Math.sin(p * Math.PI * 2) * wobble * .18);
    coin.scale.y = mix((VIDEO_MARK.height / VIDEO_MARK.width) * (size.x / size.y), 1, p);
    glow((1 - p) ** 2);
    paint();
  };
  const depart = () => {
    if (state !== 'waiting') return;
    if (motion.matches) { rest(); return; }
    state = 'flying';
    button.dataset.state = state;
    flight = gsap.to(pose, { progress: 1, duration: 1.8, ease: 'power3.inOut', onUpdate: updateFlight, onComplete: rest });
  };
  const syncReveal = () => {
    const loading = root.classList.contains('is-loading') || root.classList.contains('is-revealing');
    if (!loading) depart();
  };
  const hover = () => {
    if (state !== 'rest' || motion.matches || document.hidden) return;
    shine?.kill();
    glint.value = -3.4;
    shine = gsap.to(glint, { value: 3.4, duration: .8, ease: 'power1.inOut', onUpdate: paint,
      onComplete: () => { glint.value = -10; paint(); } });
  };
  const click = () => {
    if (state !== 'rest' || motion.matches || document.hidden) return;
    state = 'spinning';
    button.dataset.state = state;
    const turn = { progress: 0 };
    spin = gsap.to(turn, { progress: 1, duration: 4.6, ease: 'power3.out', onUpdate: () => {
      const t = turn.progress;
      coin.rotation.set(Math.sin(t * TAU * 3) * (1 - t) * .24, t * TAU * 6, Math.sin(t * TAU * 2) * (1 - t) * .08);
      paint();
    }, onComplete: rest });
  };
  const resize = () => {
    if (state === 'waiting' && !motion.matches) align();
    else if (state === 'flying') updateFlight();
    paint();
  };
  const preferences = () => {
    if (motion.matches) {
      flight?.kill(); spin?.kill(); shine?.kill();
      glint.value = -10;
      rest();
    }
  };
  const visibility = () => {
    for (const animation of [flight, spin, shine]) {
      if (document.hidden) animation?.pause();
      else animation?.resume();
    }
    if (!document.hidden) { syncReveal(); paint(); }
  };
  const observer = new MutationObserver(syncReveal);
  observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  button.addEventListener('pointerenter', hover);
  button.addEventListener('focus', hover);
  button.addEventListener('click', click);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', visibility);
  motion.addEventListener('change', preferences);
  const dispose = event => {
    if (event.persisted) return;
    disposed = true;
    flight?.kill(); spin?.kill(); shine?.kill();
    cancelAnimationFrame(frame);
    observer.disconnect();
    button.removeEventListener('pointerenter', hover);
    button.removeEventListener('focus', hover);
    button.removeEventListener('click', click);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pagehide', dispose);
    document.removeEventListener('visibilitychange', visibility);
    motion.removeEventListener('change', preferences);
    model.traverse(mesh => { if (mesh.isMesh) mesh.geometry.dispose(); });
    material.dispose(); reflection.dispose(); renderer.dispose();
  };
  window.addEventListener('pagehide', dispose);
  canvas.addEventListener('webglcontextlost', () => {
    button.dataset.renderer = 'fallback';
    dispose({ persisted: false });
    rest();
  }, { once: true });
  if (motion.matches || (!root.classList.contains('is-loading') && !root.classList.contains('is-revealing'))) rest();
  else { button.disabled = true; button.dataset.state = state; align(); }
}
