# Memory One deployment

Confirmed setup, 2 October 2026.

- Repository: `M3G4W4TT5/memory-one-website`.
- Cloudflare account: `Dev@memoryone.eu's Account` (`b259f8a4a84c2435819ed369102f3724`).
- Pages project: `memory-one`; build `npm run build`, output `dist`, Node 24.
- `main` is production: `memoryone.eu` and `www.memoryone.eu`.
- `test` is the working preview: `preview.memoryone.eu`, pointing to `test.memory-one.pages.dev`.
- Preview deployments are enabled only for `test`. Production deployments are enabled for `main`.
- Initial `main` and `test` deployments succeeded when triggered through the Cloudflare API. Automatic deployments did not appear after subsequent GitHub commits, even after reconnecting the Git source. Check the Cloudflare Workers and Pages GitHub App installation's access to `M3G4W4TT5/memory-one-website` and verify a new push before relying on automatic deployment. Until that is fixed, trigger the branch deployment manually in Cloudflare.
- Cloudflare Access protects `preview.memoryone.eu` and `*.memory-one.pages.dev`, including branch and individual deployment URLs. Only `dev@memoryone.eu` is allowed, using an email login code; sessions last 24 hours.
- Public contact: `contact@memoryone.eu`, `+45 93951496`, and the supplied Proton Calendar booking link.
- The construction page is static and does not fetch Sanity content. Its HTML is marked `noindex`; remove that at launch. Cache-Control is `no-store` during development; revisit caching at launch.
- No GitHub Actions files or test workflows are configured in this repository. `main` has no branch protection or repository rulesets requiring checks. Cloudflare builds take time but do not block merging.

## Working workflow

Commit design changes to `test`, push, and review the protected preview. Merge `test` into `main` when ready to publish. Keep `main` on the construction page until the new site is approved for launch. After merging, update `test` from `main` to keep the branches aligned. Revert a published commit to roll back and let Cloudflare redeploy.

## Old site retirement

The old `memory-one-website`, `memory-one-website-preview`, and `memory-one-website-staging` Workers were deleted after the new production deployment succeeded. Their custom domains were detached and replaced with proxied CNAMEs to Pages. Proton mail DNS and unrelated projects were preserved.

The old repository `Memory-One/website` returned 404 through the connected GitHub account. The connection exposes only the personal account `M3G4W4TT5`; organisation repository access is still needed to inspect and disable its Actions/deployment workflows. No native Cloudflare Workers Builds configuration existed for the old production Worker. Do not claim that all old GitHub automation is disabled until this is verified. The old repository has not been deleted.

The local `/workspace/memory-one-before-migration.json` is a configuration inventory, not a full source, assets, or secrets backup. Recovery of the old site requires the old repository and its deployment credentials.
