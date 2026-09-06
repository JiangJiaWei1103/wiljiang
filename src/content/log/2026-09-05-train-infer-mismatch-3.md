---
title: "Training-Inference Mismatch - Day 3"
date: 2026-09-05
description: "Start experimenting with IsoExec."
tags: ["rl"]
---

> If you don’t work on important problems, it’s not likely that you'll do important work.
> ― Richard Hamming

**TL;DR -** I started experimenting with IsoExec and planned to support a smaller model so it'd become more developer-friendly.

## Jottings

- forward gate main lifecycle
    ```
    initial weight sync -> rollout (rollout logprobs) -> trainer scoring (action logprobs) -> forward gate (logprobs diff)
    ```
    - assert logprobs diff mean/max within limits (toleration), not strictly zeros
- unified model: an abstraction aiming to unify model config, building blocks (modules), and the underlying compute implementation (ops and kernels) it calls
    - **PROBLEM:** relationship btw modules, ops, and kernels

*Finally settling in, I've learned how to do things with less emotion and less anger.*
