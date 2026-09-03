---
title: "Training-Inference Mismatch - Day 0"
date: 2026-09-02
description: "Manage to build correct mental model of train-infer mismatch." 
tags: ["rl"]
---

> The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.
> ― Marcus Aurelius, Meditations

**TL;DR -** I'm trying to build correct mental model of training-inference mismatch from scratch.

## Jottings

- train-infer mismatch: given same model parameters $\theta$ and token prefix $h_t$, training and inference engines compute different next-token distributions
    - e.g., Qwen3.5-35B-A3B with sync weights, prompt A -> Megatron != prompt A -> vLLM
    - caused by different numerical execution paths, e.g., kernel impl, precision, etc.
- off-policyness: behavior policy $\mu$ used to generate rollouts differs from target policy $q$ being evaluated/optimized
    - train-infer mismatch: $\mu_{\theta} \neq q_{\theta}$
    - policy lag: stale weights in async RL -> $\theta_{\mu} \neq \theta_q$ 
    - cache/state staleness: mix old cached states with newer weights, e.g., stale KV cache during in-flight weight update
- **PROBLEM:** bitwise-identical logprobs == 0 mismath?

*Haven't had this feeling for such a long time. Excited about the new research direction, hoping I can build my own research taste someday.*
