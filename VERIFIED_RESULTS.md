# Verified results

Generated from this packaged source on **2026-10-31 23:59 UTC**.

| Check | Result |
| --- | --- |
| Node tests | 75 passed, 0 failed |
| Seed 42 generated attacks | 500/500 contained |
| Seed 42 honest controls | 500/500 allowed |
| Held-out seed 42 | 300/300 attacks blocked; 300/300 legitimate allowed |
| Seven fixed seeds | 2100 attacks; 2100 legitimate controls; 0 observed bypasses; 0 false positives |
| Security hardening probes | 5 passed |

See `results/heldout-seed-42.json` and `results/heldout-multi.json` for the raw reports. These runs use synthetic inputs and repeated boundary designs. Zero observed bypasses is **not** a universal security guarantee or proof of on-chain settlement.
