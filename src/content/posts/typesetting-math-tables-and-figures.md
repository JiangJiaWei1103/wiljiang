---
title: "Typesetting: math, tables, and wide figures"
date: 2026-08-06
description: A tour of the Markdown features this blog supports — LaTeX, GFM tables and footnotes, dual-theme code, and full-bleed figures.
tags: [meta, markdown]
---

This post exists to exercise the rendering pipeline. If everything below looks
right, the blog is wired up correctly.

## Math

Inline math like $e^{i\pi} + 1 = 0$ sits in a sentence, and display math gets its
own centered block:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

Wide equations scroll horizontally instead of breaking the layout:

$$
f(x) = a_0 + \sum_{n=1}^{\infty}\left(a_n \cos\frac{n\pi x}{L} + b_n \sin\frac{n\pi x}{L}\right)
$$

## Tables

GFM tables render, size to their content, and scroll if they get too wide:

| Component            | Role                    | Client JS |
| ------------------- | ----------------------- | --------: |
| Content collections | Typed Markdown / MDX    |      none |
| Shiki               | Build-time highlighting |      none |
| KaTeX               | Server-rendered math    |      none |

## Footnotes

Footnotes work too[^1], and collect themselves at the bottom of the page.

## Code

```python
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

## A full-bleed figure

Most content stays in a comfortable ~68-character column. Occasionally a figure
or a wide table wants more room — wrap it in `class="full-bleed"` to break out to
the full width of the viewport:

<figure class="full-bleed">
  <div class="figure-demo">full-bleed figure &mdash; drop an image or a wide table here</div>
  <figcaption>A figure that escapes the reading column.</figcaption>
</figure>

Back to the normal column.

[^1]: Like this — a small aside that doesn't interrupt the main thread.
