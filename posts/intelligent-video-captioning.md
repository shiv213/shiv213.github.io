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
> **Originally published on the [Mosaic blog](https://mosaic.so/blog/intelligent-video-captioning).** Mirrored here for archival; the Mosaic version is the canonical copy.

![Closed Captioning symbol](/static/img/posts/video-captioning/Closed_captioning_symbol.svg.png "A Multi-Modal Approach to Dynamic Text Placement")

Creating effective video captions is more complex than simply placing text at the bottom of the screen. Good captions must respect natural speech patterns, avoid obscuring important visual content, and enhance rather than distract from the viewing experience. After extensive research and experimentation, I developed an AI-assisted system that creates contextually-aware, dynamically-positioned captions that feel natural and never obstruct crucial visual information.

The solution employs a sophisticated three-phase workflow combining computer vision, natural language processing, and AI-powered design to generate captions that work harmoniously with video content.

## The Three-Phase Pipeline: Markup → Analyze → Emplace

Each phase tackles a distinct challenge in the captioning problem, from understanding speech flow to finding optimal visual placement.

## Phase 1: Markup — Intelligent Boundary Detection

The first phase performs comprehensive video analysis to determine where caption segments should begin and end. This goes far beyond simple sentence boundaries — effective captions must respect the natural rhythm of speech while accommodating visual constraints.

### Advanced Speech Recognition and Transcription

The system uses **Deepgram's API** to generate detailed transcriptions with:

- **Word-level timing** for precise temporal alignment
- **Speaker diarization** to handle multiple speakers
- **Utterance boundaries** to identify natural speech breaks
- **Semantic summaries** for context understanding

### Multi-Modal Boundary Analysis

A specialized `BoundaryAnalyzer` component employs multiple detection methods working in concert:

**Audio Pattern Recognition:**

- **Amplitude/Energy Detection** — Uses RMS energy analysis to identify natural pauses, scoring based on both pause length and depth of silence
- **Pitch/Intonation Analysis** — Extracts fundamental frequency patterns using librosa to detect sentence endings, questions, and emphasis changes
- **Speech Rate Analysis** — Monitors speaking pace changes that often coincide with thought boundaries
- **Spectral Analysis** — Uses MFCC features to identify phonetic transitions and acoustic characteristic changes

**Visual Scene Analysis:**

- **Scene Change Detection** — Uses histogram correlation, edge detection, and optical flow analysis to identify visual transitions
- **Temporal Smoothing** — Applies adaptive thresholding to detect meaningful scene boundaries while filtering out camera shake or minor movements
- **Strategic Frame Processing** — Analyzes frames at key intervals to balance accuracy with computational efficiency

**Linguistic Features:**

- **Punctuation Weighting** — Strong breaks (periods, exclamations) receive higher priority than commas or semicolons
- **Phrase Starter Detection** — Identifies transition words like "but," "however," "because" that naturally begin new segments

### Intelligent Scoring and Segmentation

The system combines all features through a sophisticated weighted scoring system:

```python
gap_score = (
    0.2 * gap_duration +
    0.4 * audio_alignment_score +
    0.3 * punctuation_weight +
    0.1 * phrase_starter_weight
)
```

As shown in the boundary analysis visualization, the system successfully identifies natural breaks (green lines) while strategically placing forced breaks (orange lines) when segments exceed optimal length limits. Scene changes (red dashed lines) force caption boundaries to ensure text doesn't obscure important visual transitions.

![Caption Boundary Analysis chart](/static/img/posts/video-captioning/visualization.png "Caption Boundary Analysis")

*The boundary analysis reveals how the system balances natural speech patterns with practical constraints, achieving 57.1% natural breaks while maintaining readability.*

## The Research Journey: From Complex Models to Elegant Solutions

Before arriving at the final composite frame approach, I explored several sophisticated computer vision techniques, each revealing important insights about the caption placement problem.

### Initial Approach: YOLO + Visual Saliency with Temporal Tracking

My first attempt combined **semantic object detection with visual saliency mapping** and added a sophisticated temporal tracking component. The process worked as follows:

1. **Identify Important Regions** — YOLO detected semantically important objects (people, text, key items)
2. **Generate Saliency Maps** — Visual saliency models predicted where viewers would naturally look
3. **Find Dead Regions** — Combined these analyses to identify "dead space" — areas with low saliency and no important objects
4. **Temporal Tracking** — Tracked these dead regions across consecutive frames throughout each caption segment
5. **Optimal Zone Selection** — Found areas that remained consistently "dead" for the entire caption duration

![YOLO + saliency dead-region analysis](/static/img/posts/video-captioning/frame_0003.jpg "Original frame, optimal caption region highlighted in green, and per-frame saliency maps")

The temporal tracking was particularly complex, involving frame-by-frame region correspondence analysis, stability scoring to ensure placement areas remained visually unimportant throughout the entire caption duration, and sophisticated filtering to handle edge cases like partial occlusions and gradual scene transitions.

The system performed extensive analysis to ensure optimal placement:

- **Stability** — How consistently the region remained unimportant across time
- **Size** — Whether the dead region could accommodate text of various sizes
- **Position** — Preference for traditional caption locations when possible
- **Motion Interference** — Avoiding areas where tracked objects might move into

Despite this technical sophistication, the approach revealed critical limitations:

- **Computational overhead** — Running YOLO + saliency inference on every frame was resource-intensive
- **Tracking complexity** — Maintaining consistent region correspondence across frames proved challenging
- **Model disagreement** — YOLO and saliency models sometimes conflicted on region importance
- **Temporal inconsistency** — Dead regions would shift or disappear unpredictably due to minor visual changes
- **Complex integration** — The multi-model pipeline created processing bottlenecks and potential failure points

### Advanced Saliency Models

I then experimented with more sophisticated approaches:

- **Mean Motion Detection** — Analyzing optical flow patterns to identify areas of consistent movement, theoretically allowing captions to avoid dynamic regions
- **Salient Object Detection Models** — Using deep learning models specifically trained to identify the most visually important objects in each frame
- **Temporal Saliency Models** — Attempting to understand how visual attention changes over time by analyzing sequences of frames

While these methods produced impressive technical results, they suffered from critical practical limitations:

- **Computational Requirements** — Temporal saliency models were particularly resource-heavy, requiring GPU processing for real-time analysis
- **Inconsistent Results** — Different saliency models often disagreed on what constituted "important" regions
- **Poor Temporal Coherence** — Frame-by-frame analysis didn't provide the stable, segment-long understanding needed for caption placement

### The Breakthrough Realization

The key insight came from recognizing that caption placement isn't about understanding individual frames — it's about understanding **what remains constant versus what changes** throughout an entire caption segment.

Traditional computer vision approaches were solving the wrong problem. YOLO could identify objects, saliency models could predict attention, but none addressed the fundamental question: **"Where can text safely exist for the entire duration of this caption without interfering with important visual information?"**

This realization led to abandoning complex multi-model pipelines in favor of a surprisingly simple approach: **temporal frame averaging**. Instead of trying to understand what's important in each frame, the system lets time itself reveal the answer.

**Why Simpler Worked Better:**

- **Temporal Coherence** — The composite frame inherently provides segment-long spatial understanding
- **Natural Emergence** — Safe zones appear organically without needing to define "importance"
- **Computational Efficiency** — Simple averaging requires no GPU, no deep learning models, no complex inference
- **Robust Results** — Works consistently across any video content without model-specific biases
- **Zero Configuration** — No threshold tuning, no model selection, no hyperparameter optimization

This represents a fundamental shift from **analytical complexity** to **temporal simplicity** — letting the video's own motion patterns reveal the optimal placement strategy.

## Phase 2: Analyze — Composite Frame Technique

Moving beyond complex multi-model approaches, this phase employs an innovative **temporal frame averaging** technique that elegantly solves the caption placement problem through simplicity rather than complexity.

### The Composite Frame Innovation

For each caption segment timespan, the system extracts all frames within that duration and creates a composite image by averaging them together. This creates a "long exposure" effect that reveals:

- **Static elements** (backgrounds, persistent objects) appear clearly and sharply
- **Moving elements** (people, foreground action) appear as semi-transparent ghosts
- **Areas of high motion** become nearly invisible or completely transparent
- **Safe zones** for text placement naturally emerge where motion has created "dead space"

![Temporal composite of a single-subject scene](/static/img/posts/video-captioning/out.png "Single-subject composite — the moving person dissolves into a ghost; the window, plant and couch stay crisp")

### Computational Efficiency

Unlike complex object detection systems requiring heavy neural networks, this approach needs only basic frame averaging — making it computationally efficient while achieving sophisticated results. The system processes specific frame ranges corresponding to each caption segment's timing, enabling:

- **Parallel Processing** — Multiple caption segments are processed concurrently using asyncio-based parallel processing
- **Scalable Architecture** — Each worker handles frame extraction and averaging for different time segments simultaneously
- **Minimal Resource Requirements** — No GPU needed for this phase, unlike YOLO or other detection methods

### Automatic Safe Zone Identification

The composite frame approach elegantly solves caption placement by making visually important areas naturally visible while motion areas become transparent. This composite effectively becomes a mask showing where text can be safely placed without obscuring important content — a solution that emerged from the visual characteristics of temporal averaging rather than complex algorithmic detection.

![Motion composite example](/static/img/posts/video-captioning/output.png "Motion Composite Example")

*A real example showing the composite frame technique in practice. The temporal averaging creates a natural ghosting effect where moving subjects (the two speakers) become semi-transparent while static elements (background, whiteboard) remain clear, automatically revealing optimal caption placement zones.*

## Phase 3: Emplace — AI-Powered Design and Animation

The final phase combines artificial intelligence with precise positioning to create professional-quality caption overlays.

### AI-Generated SVG Creation

For each caption segment, the system uses **Google's Gemini AI** to generate custom SVG graphics based on the composite frame analysis. The multimodal AI receives the composite frame as visual context and:

- **Analyzes visual composition** to identify optimal placement zones
- **Creates adaptive typography** that responds to background content
- **Makes aesthetic decisions** about font styling, sizing, and positioning
- **Ensures readability** across different background complexities

The AI has access to specialized tools that enable iterative testing of different positions and styles before finalizing placement decisions.

### Dynamic Word-Level Animation

Word-level timing data from Deepgram drives sophisticated SVG animations created by Gemini:

- **Letter-by-letter reveals** that follow speech rhythm
- **Color transitions** that emphasize key words
- **Motion graphics** that complement video content
- **Professional typography effects** that maintain viewer engagement

<video controls muted loop playsinline preload="metadata" style="width:100%; aspect-ratio: 16/9; height:auto; border:1px solid var(--hair); margin:24px 0;">
  <source src="/static/img/posts/video-captioning/anim.mp4" type="video/mp4">
  Your browser doesn't support embedded video. [Download the clip](/static/img/posts/video-captioning/anim.mp4).
</video>

*Example of dynamic word-level animation with synchronized timing and effects.*

### Adaptive Positioning System

Unlike traditional center-positioned captions, this system places text in the most visually appropriate location for each specific segment. Captions can appear at the top, bottom, sides, or even split across multiple regions based on what the composite frame analysis reveals.

### Multi-Format Integration

The system converts SVG animations to PNG overlays when needed and integrates seamlessly with existing video editing workflows through composition operations.

## Technical Architecture: LangGraph Orchestration

The entire workflow is built using **LangGraph** for orchestration, enabling:

- **Sophisticated State Management** — Complex data flows between phases
- **Error Recovery** — Robust handling of processing failures
- **Parallel Execution** — Concurrent processing of multiple segments
- **Workflow Flexibility** — Easy modification of processing steps

## Key Technical Innovations

### 1. Composite Frame Technique

The breakthrough innovation is using temporal averaging to understand spatial relationships:

- **Reveals Static Elements** — Backgrounds and persistent objects appear clearly
- **Identifies Motion Areas** — Moving subjects become ghost-like or disappear entirely
- **Creates Natural Masks** — Results effectively show safe zones for text placement
- **Requires Minimal Computation** — Simple averaging vs. complex object detection
- **Handles Any Content** — Works regardless of scene complexity or object types

### 2. Multi-Modal Boundary Detection

Combining audio analysis, visual scene detection, and linguistic processing creates more natural caption segmentation than any single approach.

### 3. AI-Assisted Design

Using multimodal AI for aesthetic decisions produces results that feel professionally designed rather than algorithmically generated.

## Results and Performance

The three-stage approach achieved:

- **57.1% natural speech breaks** with the remaining 40% being strategically placed forced breaks
- **Zero visual obstruction incidents** during scene changes
- **Significantly improved readability** compared to traditional fixed-position captions
- **Professional aesthetic quality** comparable to manually designed captions

## Technical Insights and Lessons Learned

**Simple temporal analysis outperformed complex spatial models.** After extensive experimentation with YOLO object detection, multiple saliency models, and temporal attention mechanisms, the breakthrough came from recognizing that caption placement is not only a spatial problem, but also a temporal one.

**Computational efficiency enables practical deployment.** While deep learning approaches (YOLO + saliency) produced impressive research results, the composite frame technique's minimal computational requirements make it viable for production use without specialized hardware.

**Motion reveals more than attention models.** Traditional saliency models attempt to predict where viewers will look, but for caption placement, understanding where motion occurs (and therefore where text would be distracting) proved more valuable than predicting attention patterns.

**Natural speech boundaries outperform grammatical rules.** Audio analysis consistently produced better segmentation than pure linguistic approaches because it captures the speaker's intended emphasis and pacing.

**AI excels at aesthetic integration.** While algorithmic approaches could identify safe zones, multimodal AI made superior decisions about typography, positioning, and visual harmony.

**Parallel processing enables scalability.** The async architecture allows the system to handle long-form videos efficiently by processing multiple segments simultaneously.

## Looking Forward

This approach opens possibilities for adaptive captioning that responds to content context, viewer preferences, and accessibility requirements. The modular pipeline makes it easy to experiment with different boundary detection methods or placement strategies while maintaining the overall workflow.

The key insight is that effective captioning requires understanding multiple modalities simultaneously — audio patterns, visual composition, linguistic structure, and aesthetic principles all contribute to the final result. By building systems that can reason across these different domains, we create captions that truly enhance rather than merely accompany video content.

The composite frame technique, in particular, represents a paradigm shift from complex object detection to elegant temporal analysis. This approach demonstrates that sometimes the most sophisticated solutions emerge from understanding the fundamental characteristics of the problem rather than applying increasingly complex algorithms.

---

**[→ Read the original post on the Mosaic blog](https://mosaic.so/blog/intelligent-video-captioning)**
