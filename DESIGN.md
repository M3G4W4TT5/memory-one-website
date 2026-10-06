# Memory(One) design reference

Living reference for the website’s visual style. Expand and revise this file as the design develops. These notes capture the supplied brand foundations and distinguish them from choices still being explored.

Updated: 6 October 2026.

## Firm design rules

**NEVER use eyebrow text anywhere on the website.** Do not place a small label above a title or heading, including labels such as “About”, “01 / About”, or “A new chapter”. This applies to every page and component, without exceptions.

## Logo assets

[Memory(One) logos and 3D logomark GLB](https://drive.google.com/drive/folders/1McsZKn6_XSbPqdDvI8zM_DXSUOSwwh-J)

Use the official Memory(One) logo assets for brand placement. The folder above is the supplied source for both the logo collection and the 3D logomark. The construction page retains the supplied SVG favicon and now displays the standalone 3D mark. Both logo variants are saved in `public/brand/`: `memory-one-logo-on-light.webp` (dark artwork) and `memory-one-logo-on-dark.webp` (light artwork). Use the matching original asset for each background rather than recreating the wordmark as text. For future visible logo placements, clip transparent margins in CSS so the artwork aligns with adjacent content.

### Construction page direction

Render the supplied `m1-logomark-coin-thick.glb`, self-hosted as `public/brand/memory-one-mark.glb`, with Three.js on a small transparent canvas. Use `#FF7F00` with a polished metallic material, soft studio reflections and warm lighting. Rest head-on inside a 45px button at the top-left viewport corner, using the same 16px/safe-area inset as the bottom-right GitHub button.

On loading, centre the 3D mark on a solid black screen at a responsive size, with no video. Spin it once over 1.7 seconds with pitch/roll wobble and a passing glare, finishing head-on. Then fade only the black overlay over 0.8 seconds, keeping the mark visible in place. Only after the loading overlay is gone, move it to the corner over 1.8 seconds on a curved path, shrinking to its permanent size while pitching and yawing with small secondary movements. Fade the soft orange halo during travel and settle without an angle. Hover or keyboard focus sweeps a narrow light reflection across the actual mesh; click or keyboard activation spins it six turns with a decaying wobble and slowing speed over 4.6 seconds, returning exactly head-on. Render on changes rather than continuously when idle, pause active effects in hidden tabs and release resources on navigation. Reduced motion skips travel, glint and spinning. Without JavaScript, WebGL, or the model asset, retain a static orange mark derived from the official favicon geometry.

## Colours

Supplied brand palette. The construction page uses black (`#000000`) beneath the `#012138` PixelBlast background, `#CFCFC5` for all text, including the booking link, and `#FF7F00` for the GitHub backing and the dot after “construction”. The loading screen uses the same orange 3D mark. The top and bottom dividers are removed. The revealed page has no visible wordmark or footer text. Roles for the remaining colours are still open.

| Colour | Hex |
| --- | --- |
| Light neutral | `#CFCFC5` |
| Black | `#000000` |
| Dark blue | `#012138` |
| Teal | `#008580` |
| Red-orange | `#FE3E00` |
| Orange | `#FF7F00` |
| Green | `#54b984` |

## Typography

[Font files](https://drive.google.com/drive/folders/1C_aFSmNZlXtlsHl64DBa39-5KY4cdwFT)

| Role | Typeface |
| --- | --- |
| Application headings | FK Grotesk Neue |
| Interface body | FK Grotesk Neue |
| Labels and controls | FK Grotesk Neue |
| Timestamps and identifiers | FK Grotesk Mono |
| Technical metadata | FK Grotesk Mono |
| Logs, payloads and code | FK Grotesk Mono |
| KPI numerals | FK Grotesk Neue, with tabular numerals where available |
| Brand placement | Official Memory(One) logo assets |
| Alternative body text, such as client cases and testimonials | FK Roman |

### Construction page typography

| Element | Typeface and weight |
| --- | --- |
| “Under construction.” title | FK Grotesk Medium (500) |
| Contact details | FK Grotesk Mono Medium (500) |
| Introductory body text | FK Grotesk Regular (400) |
| Footer | Removed; no footer text |
| Booking link | FK Grotesk Mono Medium (500), matching the email and phone |

The original OTF files are self-hosted in `public/fonts/` and loaded with `@font-face`. This page-specific mapping takes precedence over the general roles above. Future typography scale and spacing decisions remain iterative. The construction page has no eyebrow text or “Work in progress” status indicator.

### Construction page background

Use a full-viewport, fixed PixelBlast layer on black with the supplied settings: circle, pixel size 5, colour `#012138`, pattern scale 4, density 1.2, jitter 2, animation speed 0.7, edge fade 0.07 and transparency. Apply `brightness(1.6)` only to the PixelBlast layer to lift the coloured pixels by 60%, preserving their relative intensity and keeping black black. Preserve the original shader settings and postprocessing pipeline, including its colour conversion. Disable cursor trails and click ripples by leaving pointer input listeners unregistered; the background continues its original ambient animation. Adapt the React Bits renderer to a local script, bundling Three.js and postprocessing without a CDN or React hydration. Keep the typography, main copy and text hover effect. The layer must not intercept links or scrolling. Pause when hidden, render a still pattern for reduced motion and retain a black fallback without WebGL.

### Loading reveal and buttons

Keep the revealed page without a full wordmark or footer text, with the standalone corner mark described above. The video loader and its poster asset are removed for all screen sizes to reduce mobile downloads. During loading, show the orange 3D mark centred on black. Use a canvas diameter of min(220px, 42vw, 45vh), with artwork filling 80% of the canvas width; preserve the model's native proportions. Prepare fonts, the background module and model, then spin the mark once over 1.7 seconds with lively pitch/roll and a passing glare. After it settles head-on, fade the black overlay away over 0.8 seconds while keeping the mark fully visible. Once the overlay is gone, begin the existing 1.8-second move to the top-left corner. Keep bounded fallbacks for unavailable graphics or stalled scripts. Use the official static orange mark on the loading screen if WebGL/model loading fails. Reduced motion skips the spin, fade and travel. Without JavaScript, show the page and corner mark directly.

Place a 45px GitHub profile link to `https://github.com/M3G4W4TT5` at the viewport’s bottom-right edge with a 16px/safe-area inset, independent of the content width. Use the supplied orange backing, rotating backing hover and translucent blurred icon container. Remove the booking button and arrow. Add `book a meeting` (lowercase) as the third contact entry after the phone number, inheriting the email and phone’s font, size, colour and link styling. Keep the supplied Proton booking URL. All three contact hyperlinks turn `#FF7F00` on hover. Keep email, phone and booking on one unbroken row on desktop; retain the stacked mobile contact layout. Vertically centre the entire title, intro and contact block with equal space above and below, retaining the existing content width and left margin. Use equal minimum top/bottom padding on short screens and allow scrolling when the content exceeds the viewport.

### Construction ThoughtLine

Replace OptionWheel with the supplied React Bits ThoughtLine component, bundled locally with Motion and Hugeicons. Place the 16px Thinking… header and service trace to the right of the main content on desktop, aligning its top with the title without shifting the title; centre it below the content on mobile. Keep the existing main copy and desktop contact row. Use FK Grotesk for the component and FK Grotesk Mono for its timer, with `#CFCFC5` text. Include the thirteen remaining steps (omit “Searching your notes”), revealing one step at a time, 1.6 seconds apart after the loading overlay clears. Mark each previous step complete as the next appears, then keep “Finish building website ...” active indefinitely: always working, no auto-settle and no completion callback. Keep the sparkle, live elapsed timer, breathing/shimmer and collapsible trace; earlier steps show check marks. Reduced motion disables breathing, shimmer, pulse and transition animations. Remove the wheel implementation entirely.

### Noise overlay

Add the local React Bits Noise component as a subtle, full-viewport grain overlay above every page layer, including the loading overlay. Use pattern size 290, X/Y scale 1, refresh every two frames and alpha 10 (out of 255). Generate a repeating 290px tile to honour the pattern settings without regenerating a full-screen pixel buffer each time. Keep it decorative and transparent to pointer input; retain the layout, links and sequential ThoughtLine. Render still grain for reduced motion and pause rendering while the tab is hidden.

## Evolving the design

### Construction page hover effect

The existing title and introductory body copy use a line-by-line hover scramble, radiating from the centre outward. Keep the current FK fonts and `#CFCFC5` resting text; the final dot returns to `#FF7F00`. Temporary characters, outlines and small width annotations use the supplied effect palette: `#85AF00`, `#FFCC00`, `#FB9CFD`, `#A19BFF`, `#FF4C00`. Preserve the wording and layout. Restore every character after the animation, resplit on responsive line changes, retain readable screen-reader text and disable the effect when reduced motion is requested. Contact details, buttons, logo and footer do not scramble.

Record agreed choices here as they emerge: colour roles, typography scale, layout and spacing, components, 3D materials and lighting, motion and responsive behaviour. Keep experiments identified as proposals until a direction is selected.

For positioning, content and visual inspiration, see [project-brief.md](project-brief.md). For preview and production workflow, see [docs/memory-one-deployment.md](docs/memory-one-deployment.md).
