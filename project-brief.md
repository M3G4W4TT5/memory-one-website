# Memory(One) website — project brief

**Working document · 30 September 2026**  
**Purpose:** Starting point for a separate project to design and build a new Memory(One) website at `memoryone.eu`.

This brief collects the ideas and decisions from the conversation so far. It is a design and content handoff, not approved website copy or a record that the new site has been built. Statements about client outcomes, live features, costs, and rights should be checked with the relevant source before publication.

## 1. The central idea

Memory(One) is the company under which **one person** works with clients. The site should speak as **“I”** and show the person behind the work. Collaborators can be brought in and managed when a project needs them.

The story is broader than AI consulting or a catalogue of software services. People can arrive with a defined project, an early idea, an existing system to review, or uncertainty about what AI and digital tools could do for their work. The work begins by understanding the situation, finding the useful scope, and choosing what is worth doing. It can then continue through concept, visual experience, product design, frontend and backend development, integrations, AI capabilities, launch, and ongoing improvement.

**Working positioning, for internal use:** Help people make sense of digital possibilities, decide what is worth building, and make the right solution real.

The site should make a visitor think: “This is exactly what I need,” or “This person could help me figure out what to do with the digital and AI possibilities in front of me.” It should invite people to start a conversation even if they do not yet have a brief.

### What should come through

- Direct access to the person doing the work.
- A combination of computer science, software engineering, product thinking, visual design, and conceptual creativity.
- Speed and momentum: the aim is to move from a first conversation to an early prototype within days where the scope allows, then launch as soon as the solution is ready. This is an approach, not a universal timeline promise.
- Practical judgment about what to build, what to add, and what not to spend time on.
- AI used extensively to extend capabilities and accelerate work, with the person directing, reviewing, and taking responsibility for the result. AI is integrated into a client solution when it adds value; simple solutions are welcome when they solve the problem well.
- A generous attitude toward sharing methods, templates, and useful ways of working with AI.

## 2. Audience and entry points

Do not restrict the site to a single industry or customer type. Potential clients include founders, independent professionals, creative businesses, and established teams. Organise the message around **the situation they bring**, not a narrow buyer persona:

1. **“I have an idea.”** Help define it, design the experience, prototype it, and build it.
2. **“We need something built or reviewed.”** Take on a defined implementation, improve an existing system, or advise on a practical next step.
3. **“I need help making sense of AI.”** Offer an approachable conversation, coaching, or exploration of how tools could improve their work and where a bespoke solution would help.

The user described the third entry point as an **“AI consultant chat buddy”**: someone to discuss AI with, who understands that the field feels overwhelming and spends time testing and sorting through it so others can see their options more clearly. This is a working phrase, not a final service name.

## 3. Voice and identity

- Write in the first person: **I**, not an agency-style **we**. Memory(One) is the company name.
- Be professional, direct, curious, confident, and personal. Show a face and a point of view; avoid an anonymous corporate tone.
- Keep the main site short and easy to grasp. Let concrete projects carry the proof instead of building a large service taxonomy.
- Show both technical discipline and a willingness to play, explore, and make visually distinctive work.

**Background the user is comfortable stating:** studied Computer Science at the University of Copenhagen (DIKU); worked for two years at Novo Nordisk as a full stack developer. Do not infer a degree or other credentials that were not stated.

### Headline directions discussed, not selected

- User’s line: **“AI creates potential. I create the solutions.”**
- Alternative: **“AI creates potential. I make it useful.”**
- Other directions raised: **“Good ideas deserve more than a demo”** and **“I help you figure out what to build—and build it.”**

These are prompts for later copy work. The opening should leave room for software and design work that does not involve AI.

## 4. Relationship to megawatts.world

`megawatts.world` is the truly personal site and may hold the fuller collection of personal projects and interests when it comes online. `memoryone.eu` is personal **for potential professional clients**. It can reveal personality and creative range, but the selection should help visitors understand the work, taste, and judgment they could hire.

The sites can link to each other. They do not need to carry the same amount of detail or the same project selection.

## 5. Proposed visitor journey and site structure

The intended visitor path is: **recognise my situation → see how this person thinks and works → see evidence → make contact**.

| Destination | Purpose and likely content |
| --- | --- |
| **Home** | Strong first-person introduction and image; the three entry situations; concise account of what the user brings; a few selected project and creative glimpses; a link explaining how this site was built; clear meeting and enquiry actions. |
| **Stories / Cases** | A curated collection of client work and selected build stories. Show the starting request, discoveries, decisions, what was made, and the result. Avoid a rigid agency case-study format. |
| **Resources** | Practical, openly shared templates, workflows, and explanations. Start with the website starter and a “how this site was made” walkthrough. Add useful AI practices and tools over time. |
| **About** | A short, personal account of background, curiosity, working style, and how collaborators fit when needed; portrait or photo. |
| **Digital card** | A compact, independently shareable page at a memorable path such as `/card`, designed for a direct link or QR code. |
| **Contact** | Embedded meeting booking and an enquiry form. Both should be easy to reach throughout the site. |

This is a working information architecture. Home should remain concise even though Stories and Resources can grow.

### Home page sequence

1. **Opening:** Who is behind Memory(One), what kind of help is available, and a visible **Book a meeting** action.
2. **Recognisable starts:** An idea, a defined build or review, or a conversation about AI in someone’s work.
3. **Range with a purpose:** Briefly connect concept, design, software, AI, and launch without listing every tool.
4. **Proof:** Feature two strong stories and a few short creative snippets.
5. **Working relationship:** Talk → define the useful scope → prototype → build → launch and improve. Explain direct contact and the option to manage collaborators.
6. **The person:** Photo, short background, and a link to About.
7. **Invitation:** Meeting widget and enquiry form. A visitor does not need to arrive with a polished brief.

## 6. Initial stories and evidence

The following are the project narratives as described by the user in conversation. Confirm final wording, live status, media, exact costs, and what can be shown before turning them into public cases.

### Didde / didde-mie.com / dance studio

**Starting request:** A custom, visually distinctive booking site for dance-studio rental and tickets to classes and workshops, rather than a generic booking SaaS experience.

**How the scope developed:** Secure the `.com` domain; create a personal portfolio site with a contact form and newsletter sign-ups; define the sites’ visual style and a new studio identity, including colours and logo; build the booking experience around Pretix and Stripe; set up related email and hosting; connect Sanity so Didde can manage content herself; provide ChatGPT-assisted content updates; and develop a newsletter workflow that helps her gather material and write her own newsletters, including support from social-feed monitoring.

**Point of the story:** A small initial request revealed adjacent needs that formed a more useful connected solution. Each addition should be explained by the value it created, not by technical novelty.

**Technologies the user mentioned:** Pretix, Stripe, Purelymail, Nodemailer, VPS hosting, Sanity, and a ChatGPT/Sanity integration. The user described the combined ongoing cost as **under US$20 per month**. Check what that figure includes and whether it still holds before using it publicly. Also verify which components are live, tested, or still in progress when preparing the case.

### Independent Danish music professional

**Starting point:** A Danish talent agent managing five major artists made limited use of AI and large language models in daily work.

**Work described:** Helped the client become much more comfortable and capable with AI across communication, artist streams and media-mention monitoring, a knowledge bank for artists and partners, and royalty or publishing administration and reporting work.

**Point of the story:** Show the change in an individual’s working day and sense of capability. The user described it as feeling as though the client had gained several assistants. Avoid presenting that metaphor as a measured staffing or productivity claim without supporting evidence. Decide what to name or show publicly with the client.

## 7. Creative snippets and experiments

The user also makes Unity game demos, edits video from older archive footage, and creates other visual and code-based experiments. Include a **small, curated selection** to show creativity and range.

- On Home, use a few short glimpses that bring personality and movement to the page.
- In Stories / Cases, consider a separate **Experiments** or **Sketchbook** stream for pieces that do not follow a client-problem narrative.
- Give each piece enough context to say what the user made or explored; do not turn the professional site into a comprehensive personal archive.
- Prefer short, accessible clips over large GIF files where practical. Check mobile behaviour, motion preferences, and rights for archive material before publication.

## 8. Writing, stories, and resources

The user plans to write articles about builds and other work. The **personal blog** is intended to be the primary home for the writing, with Medium as another publication channel. Memory(One) should feature selected articles that are relevant to potential clients. During implementation, decide per article whether M(1) hosts a full version or a short introduction linking to the original, and set the appropriate original/canonical URL where applicable.

Keep the editorial roles distinct:

- **Cases:** What the user helped someone make or change.
- **Stories / build notes:** What was built, discovered, or learned along the way.
- **Resources:** Templates, tools, guides, and workflows others can use themselves.
- **Experiments:** Selected creative work that shows taste and curiosity.

These can share one index with clear labels if that makes the site simpler; they do not all need separate top-level pages.

### “You can do it yourself” feature

The user wants a playful exchange along these lines: **“But I can just do that myself!” → “Yes. Here is how.” → “If you want me to handle it, you can hire me.”** It should communicate openness rather than defend the value of paid work.

The first concrete resource is the public [Astro + Sanity + Cloudflare Pages starter](https://github.com/M3G4W4TT5/astro-sanity-cloudflare-starter). Explain the pipeline simply:

`Astro static site → Sanity-edited content → Cloudflare Pages build and hosting → contact endpoint with Turnstile and Resend`

Show the finished Memory(One) site as a real example of that approach. Link to the starter, its setup guide, and—if created and made public—a guided GPT or similar learning companion. Offer a direct path to book the user for design, implementation, review, or coaching.

The resource should make clear that a template is a starting point: a real site still needs its own design, content, accounts, contact configuration, testing, and launch decisions. The starter’s README says its local demo contact form is disabled and the demo is marked `noindex` until a real site is ready.

**Cost wording:** Small sites may fit within free service tiers at modest usage, with the domain often the main recurring cost. Do not promise “only pay for the domain” for every site; provider limits, usage, extra services, and future pricing can change that. Check current terms before publishing a cost example.

### The site as its own case

Add a small **“How I built this site”** link on Home and a fuller Resource or Story showing the design decisions, starter repository, Sanity setup, and how Codex assisted the process. This demonstrates the user’s real workflow: a person defines the direction and evaluates the result while AI helps with speed and execution.

## 9. Digital business card

Create a dedicated card page that can be opened directly from a link or QR code shared in person. The desired feel is a **flashy holographic card, loosely inspired by Balatro**, while remaining legible and usable on a phone.

Suggested essentials: name, Memory(One), a very short description, portrait or visual identity, **Book a meeting**, email/contact, a way to save contact details, and selected links such as the main M(1) site and `megawatts.world`. Final links, title, QR destination, and card content remain to be selected. Motion should have an accessible still or reduced-motion presentation.

## 10. Technical foundation

The new site is intended to be built from the user’s [public starter repository](https://github.com/M3G4W4TT5/astro-sanity-cloudflare-starter), with **Astro, Sanity, React where interaction needs it, and Cloudflare Pages**. The starter provides a generic local demo, a Sanity Studio workspace, and a Cloudflare Pages contact endpoint using Turnstile and Resend. The Memory(One) site will be designed and built with **Codex assistance**.

At the time this brief was prepared, the starter’s default branch exposed a homepage Sanity schema, not ready-made case, article, resource, or experiment models. Those content types, along with their pages and editorial fields, are part of the new site work. Keep the starter generic; create the Memory(One) implementation from it rather than treating the demo as publishable content.

Possible Sanity content model, to refine during implementation:

- **Case:** Title, starting situation, scope/decisions, result, media, featured status, publication approval.
- **Writing/story:** Title, summary, date, topic, body or external/original URL, featured status.
- **Resource:** Purpose, who it helps, link/download, setup guidance, last reviewed date.
- **Experiment:** Short description, media, type, external link, rights/status.
- **Site singletons:** Home, About, contact details, and digital-card details, only where editing them through Sanity is useful.

### Primary calls to action

- **Book a meeting:** direct meeting widget or booking flow, provider and availability to be chosen.
- **Send an enquiry:** contact form.
- From relevant resources: **Use the template / learn how** and **work with me**.

## 11. Visual references to review

The user supplied these as inspiration, not as approved designs or sources to copy. Review them together to identify which qualities matter for Memory(One):

- https://levo-studio.com/
- https://deadnorth.io/
- https://ajbury.com/
- https://www.runrobrun.com/
- https://www.mariajoaoabrantes.work/
- https://www.zui.ooo/#home
- https://interractlabs.com/
- https://karolbinkow.ski/
- https://weevolveit.com/
- https://loudsrl.com/studio

## 12. Items to resolve in the build project

These are the main pieces of information or material still needed. They are not reasons to delay concept and prototype work.

- The exact name, portrait, short biography, social/contact links, and card details to publish.
- The meeting-booking provider and the contact form destination.
- Which Didde components and outcomes are public and current, and what the under-US$20 figure covers.
- The music professional’s preferred level of identification, available visuals, and any testimonial or outcome evidence.
- Which Unity demos and archive-video excerpts best represent the creative side, with publication rights checked.
- The personal blog’s eventual URL and the publication/linking policy for articles also shown on M(1) or Medium.
- Whether a public guided GPT will be created for the website starter, and what it should and should not guide users through.
- Which visual qualities from the inspiration sites to carry into the original Memory(One) design.
- Current free-tier limits and service costs when publishing claims about the website pipeline.

## 13. Implementation sequence for the new project

1. **Content and visual direction:** Set the page architecture, choose the strongest cases and creative clips, settle the opening message, and review the inspiration sites.
2. **Prototype:** Create a distinctive Home and digital card experience from the starter; review on desktop and mobile.
3. **Editorial system:** Add Sanity models and templates for Cases, writing, Resources, and selected experiments. Make the user’s editing workflow straightforward.
4. **Contact and proof:** Connect the meeting widget and enquiry form; prepare publishable case material and the first “how this site was built” resource.
5. **Launch review:** Check content accuracy, media rights, accessibility, performance, form delivery, SEO/original links, analytics/privacy decisions, domain routing, and rollback before replacing the current site.

## Source links

- Current site: https://memoryone.eu/
- Intended starter: https://github.com/M3G4W4TT5/astro-sanity-cloudflare-starter
- Starter README: https://github.com/M3G4W4TT5/astro-sanity-cloudflare-starter/blob/main/README.md
- Current provider information for future cost copy: [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [Sanity pricing](https://www.sanity.io/pricing), [Turnstile plans](https://developers.cloudflare.com/turnstile/plans/), [Resend pricing](https://resend.com/pricing).

The conversation with the user is the source for the positioning, desired tone, stories, site division, examples, and priorities above. The repository and provider links support the technical and cost-related notes; they do not validate client outcomes or constitute launch approval.
