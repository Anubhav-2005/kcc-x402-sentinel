# KCC Sentinel

**Team KCC · x402 Red/Blue · SDG 16.4**

Sentinel is a buyer-side guard for an AI agent's x402 payments. The merchant supplies a `PAYMENT-REQUIRED` demand; a separate authority supplies a signed, short-lived spending permit. Sentinel compares the two before creating a wallet authorization. The included Red/Blue arena lets a judge mutate the demand and see whether the guard blocks attacks while allowing valid purchases.

## Run in two minutes

Requires **Node.js 20 or newer**. The default demo has no third-party runtime dependencies and uses no real funds.

```bash
npm start
```

Open these local pages:

| Page | Address | Purpose |
| --- | --- | --- |
| Red | `http://127.0.0.1:4173/red` | Choose or write a payment mutation |
| Blue | `http://127.0.0.1:4173/blue` | Set wallet policy and run a valid control |
| Judge | `http://127.0.0.1:4173/judge` | View the independent verdict and execution trace |

The server prints a **Blue admin token** at startup. Paste it into Blue for policy changes and local benchmark runs. The token is for this demo session; it is not packaged.

## Hosted demo

**Website:** [kcc-x402-sentinel.vercel.app](https://kcc-x402-sentinel.vercel.app)  
**Source:** [Anubhav-2005/kcc-x402-sentinel](https://github.com/Anubhav-2005/kcc-x402-sentinel) (public; a collaborator invitation is needed to push changes)

The Vercel deployment serves `public/` and runs `api/index.mjs` as a Node Function. A dedicated Neon Postgres row stores the shared arena, one-use challenges, permit and budget ledger, scores, and audit chain. Writes use a version check so two simultaneous requests cannot both consume one challenge. The browser uses state polling when a server-sent stream is unavailable.

Set `DATABASE_URL`, `SENTINEL_AUTHORITY_PRIVATE_KEY_B64`, and `SENTINEL_ADMIN_TOKEN` as Vercel project environment variables. Never commit their values. The Vercel admin token is separate from the token printed by `npm start`. This remains a dry-run simulation with no blockchain broadcast.

Teammates can follow [CONTRIBUTING.md](CONTRIBUTING.md) to make changes. The production site is public; Vercel preview deployments remain protected.

For a guided presentation, use [DEMO_RUNBOOK.md](DEMO_RUNBOOK.md). The text for a hackathon entry is in [SUBMISSION_FORM.md](SUBMISSION_FORM.md).

The arena also has an **explicitly labeled vulnerable training fixture**. With Blue's admin token, enable it and submit Red's **Timeout +1 second** mutation to demonstrate one genuine referee-scored bypass in a deliberately weakened permit issuer. Restore secure mode to show the same mutation blocked. This fixture does not change the production guard or the default benchmark; see the [judge runbook](DEMO_RUNBOOK.md) for exact steps.

## Reproduce the evidence

```bash
npm test
npm run heldout -- --seed 42 --attacks 300 --legitimate 300
npm run heldout:multi -- --attacks 300 --legitimate 300
```

The packaged [verified results](VERIFIED_RESULTS.md) and JSON files in `results/` are generated from this exact copy. Counts are controlled observations, not a proof that every attack is blocked. See [evaluation method](docs/EVALUATION.md) and [limits](docs/LIMITS.md).

## Where the code lives

| Folder | Responsibility |
| --- | --- |
| `src/core/` | x402 parsing and purchase intent |
| `src/security/` | signed permit verification and payment decision |
| `src/state/` | permit use, nonce, challenge, and budget state |
| `src/demo/` | merchant challenge, Red/Blue arena, and referee |
| `src/research/` | seeded fuzzing and held-out evaluation |
| `src/app/` | HTTP routes, runtime, live updates, and audit |
| `api/` | Vercel Function and durable Neon state transaction |
| `src/cli/` | reproducible command-line evaluations |
| `public/` | Red, Blue, Judge, and landing page |
| `tests/` | security and legitimate-flow regressions |

Read [the architecture](docs/ARCHITECTURE.md) for the trust boundary and [the references](docs/REFERENCES.md) for the protocol and research context. The default build is a **dry-run simulation**: it constructs x402-shaped requirements and an authorization payload but does not broadcast a blockchain transaction.
