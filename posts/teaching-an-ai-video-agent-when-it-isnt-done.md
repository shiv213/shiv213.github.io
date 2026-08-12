---
title: "You're Not Done Yet"
permalink: /posts/youre-not-done-yet/index.html
date: 2026-08-11T10:00:00.000-07:00
author: Shiv Trivedi
summary: A finished render is easy to measure. A video worth showing is harder.
metaDescription: What it takes to teach an AI video agent about pacing, coherence, visual quality, and the moment a finished video still is not good enough.
tags:
  - post
  - ai
  - video
  - evals
---

Building AI video products like [Motion](https://motion.so) at [Mosaic](https://mosaic.so) has changed my definition of done.

![An operator guiding a film-making machine through a continuous review loop](/static/img/posts/ai-video-taste/human-taste-engineering-loop.jpg "Putting human taste inside the engineering loop of an AI video agent")

I used to call a video done when the backend said it was done. A job starts, the system does some work, and a file appears. If the job exits cleanly and the file opens, the feature worked.

Then I started watching the videos.

A backend job can finish successfully and still produce something I would never show anyone. The playback might freeze halfway through. A cut might arrive two seconds too late. Every scene might look reasonable while the whole video feels like a pile of unrelated decisions.

I keep coming back to three checks:

1. Did the job finish?
2. Is the output valid and playable?
3. Is the video actually good?

Logs and media checks handle the first two. The third has forced me to think differently about evaluation.

## A playable file can still be bad

The first check is familiar software engineering: logs, retries, timeouts, and exit codes. The second is also concrete. We can decode the entire file, inspect its duration and resolution, and confirm that its audio and video streams behave as expected.

Those checks catch real failures, but they cannot tell us whether someone would want to watch the result. A valid video can still have an unreadable title, a soundtrack that fights the voiceover, or a camera movement that becomes exhausting after the sixth repetition.

![Shiv inspecting a strip of film with a magnifying glass beside a set of mechanical testing instruments](/static/img/posts/ai-video-taste/shiv-film-inspection-original-pose.jpg "Inspecting whether the output works before judging whether it is good")

## Taste is made of smaller decisions

"Taste" sounds too subjective to engineer. But when a video feels off, the reaction usually has a cause. The edit pulled my attention to the wrong place. A shot ended before I understood it. The motion competed with the point.

Some preferences can become rules. Keep text on screen long enough to read. Do not cover the subject or cut off speech. Do not make the same element jump between positions without a reason.

Others depend on context. A fast cut can feel energetic in one video and frantic in another. Silence can be awkward or exactly what a moment needs. Fixed thresholds can satisfy the checklist while missing the video.

Two videos can both earn a seven for completely different reasons. One may be visually polished but incoherent. The other may tell a great story with rough motion and awkward typography. Averaging those problems into the same score gives the agent no clue what to fix.

Pairwise comparisons give the agent a clearer signal. Put two versions next to each other and ask which opening explains the subject sooner or which sequence has better pacing. When someone moves a caption, shortens a scene, or rejects an image, preserve that context. The action contains more information than a thumbs-down.

![Shiv comparing two projected film sequences with several specialized instruments](/static/img/posts/ai-video-taste/shiv-output-comparison-original-pose.jpg "Comparing creative decisions instead of hiding them inside one score")

## The whole video is its own test

AI video systems break work into pieces. One part writes, another finds media, another composes scenes, and another handles sound. That separation makes the system easier to build and debug. The viewer still experiences one video.

A scene can pass every local check and fail in sequence. Its pace may repeat a pattern that has already become boring. Its dramatic moment may arrive before the video has built any reason to care. A frame can reveal text covering a face, but only the full video reveals whether the text appeared at the right moment.

At some point, the evaluator has to watch the whole thing.

![Shiv watching a complete film after it passes through a sequence of connected mechanical stations](/static/img/posts/ai-video-taste/shiv-whole-video-original-pose.jpg "The whole video is its own test")

## Put judgment inside the loop

Human judgment often arrives after the system has declared victory. The agent publishes its result and waits for someone to discover what went wrong. I want that judgment to happen earlier.

If the agent detects an unreadable title, it should revise it. If two scenes make the same point, it should tighten the sequence. If the visual style drifts, it should find the odd scene and fix it before presenting the video as final.

The eval then shapes the next attempt instead of only grading the last one.

People still decide what is funny, moving, surprising, or worth saying. They also disagree and break their own rules when the result earns it. The agent should learn from that judgment without flattening it into a universal style.

We are experimenting with explicit preferences, output comparisons, visual checks, pacing, coherence, and the moment someone says, "this isn't good enough yet." Some of those moments will become reliable evals. Others will stay dependent on the person, audience, and video.

I want an AI video agent to watch its render, find the weak decisions, and keep working until the video is worth showing.

I'm excited to see future AI video benchmarks test pairwise choices, pacing, and full-video coherence.
