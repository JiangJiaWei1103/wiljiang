---
title: "Ideal Parallel DSpark under Stale Hidden States"
date: 2026-08-09
description: "Can DSpark survive drafting from stale hidden states? Measured: ideal parallel throughput ~0.76× sync; ~40% accept-length drop at lag 1."
tags: ["speculative-decoding", "dspark", "sglang"]
---

> Today is the first day of the rest of your life.
> — commonly attributed to Charles Dederich

**TL;DR -** Ideal parallel throughput reaches only ~0.76x the sync baseline. Multiple factors are at play here: staleness cuts accept length by ~40%, while draft/verify stage imbalance significantly exceeds the profitable window allowed by this drop. Addressing either factor alone can change the outcome.

## Context

SGLang has an ongoing roadmap for parallel speculative decoding (decoupled drafter/verifier), currently POC'd with standalone drafters [1]. To see whether SOTA algorithms like DSpark can survive the parallel design, we ask: can parallel throughput beat the sync baseline? In a parallel design the drafter runs ahead of the verifier, so it can only inject stale target hidden states (from $l$ steps behind) into the draft KV. I simulate staleness by injecting lagged hiddens into draft KV slots [2], measured with a minimal harness [3].

## Result

Define $R = \tau_1 / \tau_0$ (stale/fresh accept-length ratio) and $k = t_v / t_d$ (verify/draft forward-time ratio). Under zero-comm assumptions, parallel DSpark only pays off when

$$
\frac{1-R}{R} \;<\; k \;<\; \frac{R}{1-R}
$$

This requires $R > 0.5$: if staleness reduces accept length by more than 50%, no degree of stage balancing can render the parallel design viable.

Concretely: $R = 0.598$ and $k = 3.64$. $k$ lands outside the profitable window $(0.672,\, 1.488)$; throughput is ~0.76× sync.

## Limitations

This rests on idealized costs (e.g., zero comm, perfect overlap), an idealized pre-speculation hit path (no miss), and one restricted config (single model pair, bs=1, temp=0). Full report in [4].

## What's next

- `#verifiers:#drafters = 1:N` to balance $k$.
- Self-conditioning training for the drafter.

*Day zero; new field, great start.*

[1]: https://github.com/sgl-project/sglang/issues/27462
[2]: https://github.com/JiangJiaWei1103/sglang/tree/dspark-stale-hidden-ablation
[3]: https://github.com/JiangJiaWei1103/ssd-stale-poc
[4]: https://docs.google.com/document/d/1X5dJuKs4w5t4t5G5FJCJUhqoDFUdvLeSVi_Aj30b-LA/edit?usp=sharing
