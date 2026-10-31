# Four-minute judge demo

## Before judges arrive

1. Run `npm start` from this folder and keep that terminal open.
2. Open `/blue`, `/red`, and `/judge` on the same local address. Paste the token printed by the server into Blue. Use the same token in Judge only when running benchmarks.
3. If using ngrok, start `ngrok http 4173` in another terminal. Keep the local server and tunnel running. Use the new URL it prints.

## Live sequence

| Time | Action | What to say |
| --- | --- | --- |
| 0:00 | Show Blue | “The merchant can request payment; the owner controls permission. Sentinel checks both before authorization.” |
| 0:35 | Click **Run local x402 control** | “The agent receives HTTP 402, the guard allows the matching demand, and the dry-run paid retry returns 200.” |
| 1:15 | In Red, choose **Wrong party**, then **Evaluate with referee** | “Only the recipient changed. Sentinel blocks it before the simulated wallet stage.” |
| 1:55 | Choose **Overpayment**, then evaluate | “The requested amount exceeds the signed intent and policy. The mutation preview shows the exact change.” |
| 2:30 | Click **Restore baseline**, then evaluate | “An unchanged legitimate payment passes. A guard that blocks everything would fail this control.” |
| 3:00 | Show Judge, run **Held-out Red Team** | “The referee starts from its own original challenge and reports true positives, false positives, and bypasses separately.” |
| 3:40 | Open **Security hardening probes** | “Permit reuse before settlement, forged time, and malformed fields are explicit tests. The default demo broadcasts no funds.” |

## Optional Red win: deliberately vulnerable training fixture

This is a controlled failure demonstration, **not a discovered bypass in the hardened guard**. Keep the default secure mode for the main benchmark.

1. In Blue, keep **Max timeout seconds** at `120` and apply the policy. The merchant's original challenge still asks for `60` seconds.
2. In Red, select **Timeout +1 second**. The preview should show `60 → 61`.
3. Evaluate once in secure mode. Judge shows **ATTACK BLOCKED** and `INTENT_TIMEOUT`; the simulated wallet signer is not reached.
4. In Blue, enter the admin token and click **Enable vulnerable mode** under **Training fixture · permit issuer**. Judge and Red both display a visible vulnerable-mode banner.
5. Select **Timeout +1 second** again in Red and evaluate. Judge now shows **TRUE BYPASS**: the referee still expects `BLOCK` from its original 60-second offer, while the deliberately weakened permit issuer signs the received 61-second ceiling. The guard allows it, and the dry-run signer stage opens. No transaction is broadcast or settled.
6. Return to Blue and click **Restore secure mode**. A repeat of the same attack is blocked again. This switch changes only the local arena permit issuer; the normal guard, agent flow, and held-out suite remain secure.

Say: “This is a fault-injection fixture. We intentionally removed one trust boundary to demonstrate how our referee detects a real Red win, then restored the bound permit to show the fix.”

## Optional policy-tuning example

In Blue, set **Max per payment** and **Merchant max** to `0.049` USDC and click **Apply policy**. In Red, submit the unchanged `0.05` USDC baseline. The guard blocks because the owner set a lower limit; the referee calls the unchanged merchant demand a false positive. Explain that this is a deliberately restrictive policy, then click **Load baseline** and **Apply policy** to restore the merchant amount.

## If the connection stalls

The status beside the role name shows **Live** or **Reconnecting**. Check that `npm start` is still running; refresh the page. A refresh fetches current JavaScript and CSS. The Judge's metrics and reports come from the running server, while the packaged JSON results are a reproducible fallback.
