---
title: "A Logical Execution Model, from Threads to Ray Actors"
date: 2026-09-01
description: "A draft mental model linking OS threads, ..., up to Ray actors." 
tags: ["os", "ray"]
---

> Concurrency is not parallelism.
> — Rob Pike

**TL;DR -** Before diving into the SkyRL startup lifecycle, I brushed up on OS concepts and Ray fundamentals.

## Jottings

- process = running program acting as a resource container (e.g., virtual memory space)
- thread = execution unit scheduled by os
- os -schedule-> thread -(some) run-> event loop -schedule-> ready async Task -wrap & drive-> coroutine
  - process = restaurant; thread = chef; event loop = chef's scheduler; Task = table order; coroutine = order content
  - coroutine await (e.g., unfinished IO) -> control back to event loop -> schedule next ready Task
  - Task wraps one root coroutine, driving nested coroutine chain (await coroutine()), and can be created in a coroutine
- CPU core availability != GIL [1] permission; limit Python CPU parallelism
- CPU pinning (affinity) maps runnable threads to specific cores for cache and NUMA locality
- actor [2] = long-lived, stateful worker process
  - actor method calls dispatch task spec to dedicated actor worker process, not any of idle worker processes; default to serial execution
  - threaded actor [3] = worker process enabling concurrent actor-method invocations via a thread pool capped by max_concurrency
    - run in different OS threads sharing the same actor instance mem
    - can't bypass GIL for pure Python code, only GIL-acquired thread can run CPython interpreter (can be released halfway through)
    - shared mutable states + concurrent access + exec ordering -> race condition risk
    - **PROBLEM:** threading.Lock, critical section, shared-state invariant, atomicity
- **PROBLEM:** Ray logical resource and scheduling

*Logged from Seattle!*

[1]: https://docs.python.org/3/glossary.html#term-global-interpreter-lock
[2]: https://docs.ray.io/en/latest/ray-core/actors.html
[3]: https://docs.ray.io/en/latest/ray-core/actors/async_api.html#threaded-actors
