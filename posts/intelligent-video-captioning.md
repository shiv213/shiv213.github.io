---
title: "Intelligent Video Captioning"
permalink: /posts/intelligent-video-captioning/index.html
date: 2025-06-10T12:00:00.000Z
author: Shiv Trivedi
summary: A deep dive into building an AI-assisted system for creating contextually-aware, dynamically-positioned captions.
metaDescription: A three-phase pipeline — Markup, Analyze, Emplace — for generating dynamically-placed captions that dodge motion and key content in a video.
canonical: https://mosaic.so/blog/intelligent-video-captioning
tags:
  - post
  - crosspost
  - mosaic
  - ml
---
> **Originally published on the [Mosaic blog](https://mosaic.so/blog/intelligent-video-captioning).**
> Read the full write-up there — the summary below is a quick teaser.

How do you put captions on a video without them ever covering the important thing on screen? At Mosaic we wanted captions that behave less like burned-in text and more like a thoughtful editor moving titles out of the way every time the action shifts.

I wrote up the system we landed on. It runs as a three-phase pipeline — **Markup → Analyze → Emplace**:

1. **Markup** — Intelligent boundary detection. Combines word-level ASR with multi-modal signals (pitch, amplitude, speech-rate, spectral features, scene-change detection, punctuation weighting) to find where one caption chunk should end and the next should begin.
2. **Analyze** — A *composite-frame* technique that replaces an earlier, much heavier YOLO + visual-saliency + temporal-tracking stack. By simply averaging the frames within a caption segment, static regions stay sharp and moving subjects "disappear" into the average — the safe zones for text placement emerge naturally, with no GPU, no tracking, no thresholds.
3. **Emplace** — AI-generated SVG caption layers with adaptive typography, word-level reveal animations, and positioning that adjusts per segment to whatever Phase 2 identified as safe.

The whole thing is orchestrated with LangGraph so the phases run in parallel where they can and recover cleanly when individual segments fail.

The most interesting part to me was the bit I didn't expect: we started out convinced we needed sophisticated saliency and temporal-attention models to "know" where not to place text. The breakthrough was realizing that a good-enough answer falls out of averaging pixels together. Elegance usually looks obvious in retrospect.

**[→ Read the full post on the Mosaic blog](https://mosaic.so/blog/intelligent-video-captioning)**
