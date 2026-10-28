# Casa Mishi

A kitten-match funnel on the Embeddables minimal starter. Seven declared pages
live in `embeddables/config.yaml` (`bienvenida` through `gracias`). `?force_page=`
opens the matching route. `pnpm build` skips `em build`: the published CLI
0.6.1 still rejects the `pages` key, and `embeddables/_dist/config.ts` already
includes them.

## Run

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and set:

- `EMBEDDABLES_PUBLISHABLE_KEY` — `pk_sandbox_…` for local dev, `pk_live_…` in production
- `EMBEDDABLES_PROJECT_ID` — your project UUID (overrides `embeddables/config.yaml` when set)

Values come from `em init` or Settings → Portal / SDK in the admin app.

## Connect your Embeddables project

`embeddables/config.yaml` ships with a placeholder project id and one sample
form (`Contact`) so the app typechecks and builds before login. Replace it
with your project:

```bash
pnpm exec em login
pnpm exec em init
pnpm build
```

Add more forms with `pnpm exec em form create --name "<name>"`, or protocols
with `pnpm exec em protocol install <protocol-id>` — then `pnpm build` and
import from `embeddables/_dist`.

Docs: https://docs.platform.embeddables.com/
