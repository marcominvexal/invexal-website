# 07 · Animation Plan

Principle: one orchestrated moment per page (the hero), quiet everywhere else. All motion respects `prefers-reduced-motion` (Framer's `useReducedMotion` + CSS media query kill switches). No scroll-jacking; native smooth scrolling with `scroll-behavior: smooth` and Lenis optional (feature-flagged — only enable if it survives INP testing).

| Moment | Tool | Spec |
|---|---|---|
| Hero load | Framer Motion | Staggered sequence (0.08s): eyebrow → H1 (rise 24px, fade, 0.6s ease-out) → lede → CTAs; ambient glow cross-fades in over 1.2s; floating telemetry cards drift ±6px on a 6s ease-in-out loop |
| Signal lattice | CSS | Background dot grid pulses opacity .03→.06, 8s; static under reduced motion |
| Section reveals | Framer `whileInView` | Fade + 24px rise, once, viewport margin -80px, children stagger 0.06s |
| Stats | Framer + rAF counter | Count-up over 1.4s on view; amber delta chips fade in after |
| Logo marquee | CSS keyframes | 40s linear loop, pause on hover/focus, static row under reduced motion |
| Cards hover | CSS | Gradient border mask fades in 150ms; translateY(-2px); teal glow shadow |
| Buttons | CSS | Arrow translates 4px; primary gradient shifts hue 5° on hover |
| Mega menu | Framer `AnimatePresence` | Opacity+scale .98→1, 160ms; height auto-animates |
| Accordion | Framer | Height auto, 240ms ease; chevron rotates |
| Process timeline | GSAP ScrollTrigger | Progress line draws with scroll across the 5 steps (the one GSAP moment; falls back to static line) |
| Testimonials | Framer | Slide + fade, 5s auto-advance, pauses on hover, swipe on touch |
| Page transitions | none | Instant navigation beats decorative transitions for an enterprise audience |
| Lottie | reserved | Only for the two lead magnets (assessment intro, ROI calculator result) — lazy-loaded |

Budget: no animation may block LCP; GSAP loaded only on routes with the timeline; Framer Motion tree-shaken via `LazyMotion`/`domAnimation`.
