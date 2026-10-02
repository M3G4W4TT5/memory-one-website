# Memory(One) design reference

Living reference for the website’s visual style. Expand and revise this file as the design develops. These notes capture the supplied brand foundations and distinguish them from choices still being explored.

Updated: 2 October 2026.

## Firm design rules

**NEVER use eyebrow text anywhere on the website.** Do not place a small label above a title or heading, including labels such as “About”, “01 / About”, or “A new chapter”. This applies to every page and component, without exceptions.

## Logo assets

[Memory(One) logos and 3D logomark GLB](https://drive.google.com/drive/folders/1McsZKn6_XSbPqdDvI8zM_DXSUOSwwh-J)

Use the official Memory(One) logo assets for brand placement. The folder above is the supplied source for both the logo collection and the 3D logomark. The construction page retains the supplied SVG favicon; the visible logo has been removed. Both logo variants are saved in `public/brand/`: `memory-one-logo-on-light.webp` (dark artwork) and `memory-one-logo-on-dark.webp` (light artwork). Use the matching original asset for each background rather than recreating the wordmark as text. For future visible logo placements, clip transparent margins in CSS so the artwork aligns with adjacent content.

### Construction page direction

Explore rendering the 3D logomark directly on the construction page with a chrome finish and lighting drawn from the brand palette, for example blue hues. The material, lighting, placement, scale, interaction and motion will be refined through iteration. This is a design direction; it has not yet been implemented.

## Colours

Supplied brand palette. The construction page uses black (`#000000`) beneath the `#012138` PixelBlast background, `#CFCFC5` for all text, including the booking link, and `#FF7F00` for the loading spinner, GitHub backing and the dot after “construction”. The top and bottom dividers are removed. The page has no visible wordmark or footer text. Roles for the remaining colours are still open.

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

Use a full-viewport, fixed PixelBlast layer on black with the supplied settings: circle, pixel size 5, colour `#012138`, pattern scale 4, density 1.2, jitter 2, ripples enabled (speed 0.4, thickness 0.12, intensity 1.5), liquid enabled (strength 0.12, radius 1.2, wobble speed 5), animation speed 0.7, edge fade 0.07 and transparency. Adapt the React Bits renderer to a local script, bundling Three.js and postprocessing without a CDN or React hydration. Keep the typography, main copy and text hover effect. The layer must not intercept links or scrolling. Pause when hidden, render a still pattern for reduced motion and retain a black fallback without WebGL.

### Loading reveal and buttons

Remove the visible Memory(One) logo and all footer text. On each page load, show the supplied orange 5×5 glowing tile spinner for at least two seconds over a solid black (`#000000`) background. Fade the spinner and its solid background away together over one second, waiting for fonts and the background module with a bounded fallback. Without JavaScript, show the page directly. Reduced-motion mode keeps the spinner still and reveals without animation after the same minimum delay.

Place a 45px GitHub profile link to `https://github.com/M3G4W4TT5` at the viewport’s bottom-right edge with a 16px/safe-area inset, independent of the content width. Use the supplied orange backing, rotating backing hover and translucent blurred icon container. Remove the booking button and arrow. Add `book a meeting` (lowercase) as the third contact entry after the phone number, inheriting the email and phone’s font, size, colour and link styling. Keep the supplied Proton booking URL. All three contact hyperlinks turn `#FF7F00` on hover. Keep email, phone and booking on one unbroken row on desktop; retain the stacked mobile contact layout. Vertically centre the entire title, intro and contact block with equal space above and below, retaining the existing content width and left margin. Use equal minimum top/bottom padding on short screens and allow scrolling when the content exceeds the viewport.

### Construction ThoughtLine

Replace OptionWheel with the supplied React Bits ThoughtLine component, bundled locally with Motion and Hugeicons. Place the 16px Thinking… header and service trace to the right of the main content on desktop; centre it below the content on mobile. Keep the existing main copy and desktop contact row. Use FK Grotesk for the component and FK Grotesk Mono for its timer, with `#CFCFC5` text. Include the thirteen remaining steps (omit “Searching your notes”), keeping “Finish building website ...” active indefinitely: always working, no auto-settle and no completion callback. Keep the sparkle, live elapsed timer, breathing/shimmer and collapsible trace; earlier steps show check marks. Reduced motion disables breathing, shimmer, pulse and transition animations. Remove the wheel implementation entirely.

## Evolving the design

### Construction page hover effect

The existing title and introductory body copy use a line-by-line hover scramble, radiating from the centre outward. Keep the current FK fonts and `#CFCFC5` resting text; the final dot returns to `#FF7F00`. Temporary characters, outlines and small width annotations use the supplied effect palette: `#85AF00`, `#FFCC00`, `#FB9CFD`, `#A19BFF`, `#FF4C00`. Preserve the wording and layout. Restore every character after the animation, resplit on responsive line changes, retain readable screen-reader text and disable the effect when reduced motion is requested. Contact details, buttons, logo and footer do not scramble.

Record agreed choices here as they emerge: colour roles, typography scale, layout and spacing, components, 3D materials and lighting, motion and responsive behaviour. Keep experiments identified as proposals until a direction is selected.

For positioning, content and visual inspiration, see [project-brief.md](project-brief.md). For preview and production workflow, see [docs/memory-one-deployment.md](docs/memory-one-deployment.md).
