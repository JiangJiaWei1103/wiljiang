---
title: "Training-Inference Mismatch - Day 4"
date: 2026-09-09
description: "Recap what I learned over the past week by active retrieval."
tags: ["rl"]
---

> Beginners are often focused on what to do, whereas they should focus on how much they do.
> ― Andrej Karpathy

**TL;DR -** I recapped what I learned over the past week by active retrieval; without the help of AI.

## Training-Inference Mismatch

Reinforcement learning infrastructure has two runtimes, the trainer and the rollout engine. The rollout engine generates trajectories which are used by the trainer to train the policy. In a setup intended to be on-policy, even when both runtimes use the same model parameters, the selected token logprobs conditioned on the same token prefix can still be different due to different execution paths (e.g., reduction order).

Let

- $\pi$: target policy to train on
- $\mu$: behavior policy to generate trajectories 
- $h_t$: token prefix before the $t$-th token is generated; $h_t = (x, a_1, a_2, ..., a_{t-1})$, where $x$ is the prompt sequence
- $a_t$: $t$-th selected token
- $\theta$: model weights parameterizing a policy

We define

- trainer logprob $l^{T}_t = log\pi_{\theta}(a_t\ |\ h_t)$
- rollout logprob $l^{E}_t = log\mu_{\theta}(a_t\ |\ h_t)$

Then, we compare the two runtimes under the following preconditions:

- model weights: both computations use the same model weights $\theta$
- conditioning prefix: both computations are conditioned on the same token prefix $h_t$
- selected token: the logprob is computed for the same selected token $a_t$

A token-level training-inference mismatch problem is observed when:

$$
log\pi_{\theta}(a_t\ |\ h_t) \neq log\mu_{\theta}(a_t\ |\ h_t) 
$$

## Pitfalls

- the trainer **recomputes** logprobs of rollout tokens, rather than generating the response from scratch
- token prefix $h_t$ covers the prompt sequence and all the previously generated tokens
- policy lag means the behavior policy is parameterized by the stale weights $\theta_{old}$; not fixed-weights mismatch we focus on in this context
- selecting the same action token doesn't mean eliminating mismatch, probability is what we care about

*Sick for three days, and now I'm back.*

*I spent some time pondering if excessive cognitive offload to AI could cause distraction, progressive decline in recall, and lack of critical thinking. This is actually based on what I observed in myself over the past month, not a mere speculation. For now, I'm trying to shape my ChatGPT into an examiner in Socratic / adversarial mode, forcing myself to bring back essential skills, including critical thinking, sustained reasoning, repeated retrieval (recall), original writing, and self-explanation combined with Feynman technique. This has been imported into my custom instructions. We'll see!*

*All contents above are written without AI.*