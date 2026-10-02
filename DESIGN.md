# Memory(One) design reference

Living reference for the website’s visual style. Expand and revise this file as the design develops. These notes capture the supplied brand foundations and distinguish them from choices still being explored.

Updated: 2 October 2026.

## Firm design rules

**NEVER use eyebrow text anywhere on the website.** Do not place a small label above a title or heading, including labels such as “About”, “01 / About”, or “A new chapter”. This applies to every page and component, without exceptions.

## Logo assets

[Memory(One) logos and 3D logomark GLB](https://drive.google.com/drive/folders/1McsZKn6_XSbPqdDvI8zM_DXSUOSwwh-J)

Use the official Memory(One) logo assets for brand placement. The folder above is the supplied source for both the logo collection and the 3D logomark. The construction page uses the official light one-colour logo for a dark background and the supplied SVG favicon. Both logo variants are saved in `public/brand/`: `memory-one-logo-on-light.webp` (dark artwork) and `memory-one-logo-on-dark.webp` (light artwork). Use the matching original asset for each background rather than recreating the wordmark as text. Clip the image’s transparent margins in CSS so the visible top-left logo aligns with the left edge of the heading and body text.

### Construction page direction

Explore rendering the 3D logomark directly on the construction page with a chrome finish and lighting drawn from the brand palette, for example blue hues. The material, lighting, placement, scale, interaction and motion will be refined through iteration. This is a design direction; it has not yet been implemented.

## Colours

Supplied brand palette. The construction page uses `#012138` for the background, `#CFCFC5` for all text, including button text, and `#FF7F00` for button fill and the dot after “construction”. The top and bottom dividers are removed. Use the light logo artwork on this dark background. Roles for the remaining colours are still open.

| Colour | Hex |
| --- | --- |
| Light neutral | `#CFCFC5` |
| Black | `#000000` |
| Dark blue | `#012138` |
| Teal | `#008580` |
| Red-orange | `#FE3E00` |
| Orange | `#FF7F00` |

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
| Footer | FK Grotesk SemiMono Medium (500) |
| Button text | FK Grotesk Neue Light (300) |

These five original OTF files are self-hosted in `public/fonts/` and loaded with `@font-face`. This page-specific mapping takes precedence over the general roles above. Future typography scale and spacing decisions remain iterative. The construction page has no eyebrow text or “Work in progress” status indicator.

## Evolving the design

### Construction page hover effect

The existing title and introductory body copy use a line-by-line hover scramble, radiating from the centre outward. Keep the current FK fonts and `#CFCFC5` resting text; the final dot returns to `#FF7F00`. Temporary characters, outlines and small width annotations use the supplied effect palette: `#85AF00`, `#FFCC00`, `#FB9CFD`, `#A19BFF`, `#FF4C00`. Preserve the wording and layout. Restore every character after the animation, resplit on responsive line changes, retain readable screen-reader text and disable the effect when reduced motion is requested. Contact details, buttons, logo and footer do not scramble.

Record agreed choices here as they emerge: colour roles, typography scale, layout and spacing, components, 3D materials and lighting, motion and responsive behaviour. Keep experiments identified as proposals until a direction is selected.

For positioning, content and visual inspiration, see [project-brief.md](project-brief.md). For preview and production workflow, see [docs/memory-one-deployment.md](docs/memory-one-deployment.md).
