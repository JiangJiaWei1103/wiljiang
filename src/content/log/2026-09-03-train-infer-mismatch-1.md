---
title: "Training-Inference Mismatch - Day 1"
date: 2026-09-03
description: "Study train-infer mismatch, breaking down IsoExec."
tags: ["rl"]
---

> Dream big. Start small. Act now.
> – Robin Sharma

**TL;DR -** I battled with PPO math in the morning, browsed the IsoExec overview at noon, and started tracing the IsoExec impl at night.

## Jottings

- PPO math
    - handwrite once, tbd...
- same logical model / weights + different execution modes -> unaligned numerical execution paths (e.g., kernel, reduction order, cached state) -> different logprobs
    - trainer recomputation
    - inference prefill
    - inference decode
- importance sampling ratio $\rho_t = \frac{q_t}{\mu_t}$: how probable the sampled token $a_t$ is under target policy relative to the behavior policy, given prefix $h_t$
    - **goal:** correct mismatches (multi-source) by weighting token-level gradients while optimizing RL objectives
        - **NOTE:** doesn't fix prefix mismatch since $h_t$ still comes froms $d^{\mu}$
    - underrepresented token in rollout data -> $\rho_t \gt 1$ -> upweight
    - overrepresented token in rollout data -> $\rho_t \lt 1$ -> downweight
    - decomposed into observable points -> $\rho_t = \frac{q_t}{s^P_t} \times \frac{s^P_t}{s^D_t} \times \frac{s^D_t}{\mu_t}$
        - $\frac{q_t}{s^P_t}$: trainer recomputation vs inference prefill
        - $\frac{s^P_t}{s^D_t}$: inference prefill vs inference decode
        - $\frac{s^D_t}{\mu_t}$: inference decode vs recorded prob during rollout sampling
            - **PROBLEM:** last staleness (weights/cache) term != 1 only for async RL?
            - will focus on the first two terms for now
- **goal:** remove source of off-policyness (selected-token logprobs should agree) by aligning numerical execution across modes, reducing training instability (doesn't guarantee convergence)
    - mismatch found
        - shared kernel
            - y: call inference kernel in trainer, use a unified kernel for both
            - n: enforce same arithmetic (rounding, addition ordering)
        - make reduction batch-invariant
    - validation ladder: localize mismatch to one op -> reproduce with same inputs -> vary batch shape / launch config -> compare train vs infer bytes -> compare during live sampling with same weight ver -> validate e2e training
    - takeaways
        - mathematically equivalent kernels can have different reduction orders
        - pin only bit-affecting parameters
        - replay distribution-changing sampling transforms on the trainer side
- IsoExec: a cross-runtime unified execution abstraction aiming to eliminate mismatch btw training and inference engines
    - align trainer forward (grad), trainer scoring foward (nograd), engine prefill, engine decode
    - two core abstractions
        - unified execution contract: specify bit-relavent choices both runtimes must agree on
        - unified model: batch-invariant kernels and model ops
    - **TODO:** trace code and correct mental model

*I enjoy what I'm doing at this stage, but I still don't know if this achieves Wil-market fit. Keep pushing!*

[1]: https://vllm.ai/blog/2026-08-21-isoexec