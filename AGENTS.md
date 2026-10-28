# embeddables-starter-minimal

Entry point for agents working in this repo. Minimal Vite + React app wired to
Embeddables Core and Forms — the base to customize for a new project.

## Commands

```bash
pnpm install
pnpm dev              # local app
pnpm build            # tsc, vite build
pnpm typecheck        # tsc -b only
pnpm lint             # ESLint
pnpm format           # Prettier write
pnpm format:check     # Prettier check
pnpm check            # format:check + lint + typecheck
```

Copy `.env.example` to `.env` and set Embeddables keys. See
[README.md](./README.md) for `em login` / `em init`.

## Source of truth

| Area                                            | Location                             |
| ----------------------------------------------- | ------------------------------------ |
| App shell and routes (React Router)             | `src/App.tsx`                        |
| Worker that serves the build                    | `worker/index.ts`, `wrangler.jsonc`  |
| Embeddables project config                      | `embeddables/config.yaml`            |
| Form schemas (authoring)                        | `embeddables/forms/<id>/schema.yaml` |
| Generated Embeddables output (do not hand-edit) | `embeddables/_dist/`                 |

After schema changes: `pnpm build` and import from `embeddables/_dist`.

## Build output

`pnpm build` runs Vite with `@cloudflare/vite-plugin` and writes two folders:

- `dist/client/` — the static app.
- `dist/app/` — the Worker (`worker/index.ts`) and its `wrangler.json`.

That is the layout Embeddables Hosting deploys: a hosting app's `server` is
`dist/app` and its `client` is `dist/client`. Hosting serves a file from
`dist/client` when one matches; the Worker answers every other path with the
app shell, so React Router routes work on a refresh. Keep that fallback if you
change the Worker.

The publishable key can live in `wrangler.jsonc` under
`vars.EMBEDDABLES_PUBLISHABLE_KEY`; publishable keys are public. `vite build`
uses it when `EMBEDDABLES_PUBLISHABLE_KEY` is not set in the environment or a
`.env` file, so a deployed build gets the key without a CI secret. A project
start writes the project's sandbox key there.

## Customizing this starter

This repo ships with one sample form (`Contact`) and no protocol or brand
styling. To build a real intake flow:

1. Replace `projectId` in `embeddables/config.yaml` (`em init`).
2. Edit or add forms under `embeddables/forms/<id>/schema.yaml`, then
   `pnpm build`.
3. Replace the sample `Home` page in `src/App.tsx` with the real flow — add
   pages as `<Route>` entries and components as needed. Nothing here assumes
   a particular number of pages or a brand.
4. If the flow uses a protocol, run
   `pnpm exec em protocol install <protocol-id>` and set
   `enabledModules.protocols: true` in `embeddables/config.yaml`.
