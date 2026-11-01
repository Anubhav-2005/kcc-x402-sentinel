# Hackathon submission text

**Project:** KCC Sentinel  
**Team:** KCC  
**Challenge:** x402 Red/Blue  
**Theme:** SDG 16.4 · illicit financial flows

## One sentence

Sentinel stops an AI agent from authorizing an x402 payment that exceeds its owner's signed intent, then proves the decision in a controlled Red/Blue simulation.

## Short description

An x402 payment can be technically valid while paying too much, paying the wrong wallet, or buying a different resource. Sentinel places a deterministic check before the agent's wallet authorization. A separate authority signs a short-lived permit for the resource, recipient, network, asset, amount, timeout, and use count. Red mutates a server-held merchant challenge; Blue configures wallet policy; an independent referee scores both attacks blocked and legitimate payments allowed. The Judge screen shows the original demand, mutation, failed security property, and wallet stage. The included local demo is a dry-run and does not move real funds.

## What we built

- A signed-intent guard that checks x402 payment requirements before approval.
- Stateful controls for single-use permissions, nonce replay, pending budget, expiry, and settlement correspondence.
- A custom Red console for price, recipient, URL, network, asset, timeout, flow, transfer method, and offer-order mutations.
- A Blue console for wallet policy and a valid `402 → 200` control flow.
- An independent Judge with reproducible known and held-out evaluations, reason codes, and an audit trail.
- A labeled fault-injection mode: Blue deliberately lets the arena permit issuer trust Red's longer timeout; the independent referee catches the resulting Red win, and secure mode blocks the same attack.

## Evidence and differentiator

The submission package runs its own tests and seven-seed held-out evaluation during packaging. Read [VERIFIED_RESULTS.md](VERIFIED_RESULTS.md) for the measured counts. The referee labels expected behavior from the original merchant challenge independently of the guard's answer, so blocking everything cannot be presented as success.

The optional Red win is an intentionally introduced training vulnerability. It is not evidence of a bypass in Sentinel's default secure mode.

## Impact and honest scope

The intended contribution to SDG 16.4 is preventing unauthorized autonomous value transfers at the buyer's authorization boundary and making attempted transfers auditable. This prototype does not identify real-world criminals, perform AML/KYC checks, or prove on-chain settlement. The optional testnet experiment from the research workspace is not part of this verified submission.

## Submission links

- **Repository:** https://github.com/Anubhav-2005/kcc-x402-sentinel
- **Live demo:** https://kcc-x402-sentinel.vercel.app
- **Video:** record the current Red, Blue, and Judge screens using [DEMO_RUNBOOK.md](DEMO_RUNBOOK.md), then add the recording URL when ready.
