---
title: SPOTS
emoji: 🔦
metaDescription: Stored Parts Optical Tracking System — computer vision parts inventory with a gimbaled laser pointer
date: 2024-12-20T00:00:00.000Z
summary: Computer vision parts inventory with a gimbaled laser pointer that aims at the right drawer
tags:
  - python
  - computer vision
  - arduino
---
<figure class="video-aside">
  <video src="/static/video/spots-calibration.mp4" controls playsinline preload="metadata"></video>
  <figcaption>Calibration demo</figcaption>
</figure>

SPOTS (Stored Parts Optical Tracking System) is a parts management rig for a stack of drawered parts cabinets. A webcam continuously watches the cabinets to keep an inventory database in sync with what's actually inside, and an Arduino-driven gimbaled laser physically points at the drawer holding whatever you ask for.

**Hardware:** Raspberry Pi 4B + Logitech C925-E webcam + Arduino-controlled 2-axis stepper gimbal with a laser pointer module, mounted above two stacked IRIS USA parts cabinets.

### [GitHub](https://github.com/shiv213/SPOTS)
