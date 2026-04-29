---
title: Curbwatch
emoji: 🅿️
metaDescription: Telegram alerts before SF parking violations, fed by a CarPlay-triggered iOS Shortcut
date: 2026-03-05T00:00:00.000Z
summary: Telegram alerts before SF parking violations, fed by a CarPlay-triggered iOS Shortcut
tags:
  - python
  - typescript
---
Curbwatch detects when you've parked using an iOS Shortcuts automation that fires the moment CarPlay disconnects — the Shortcut grabs the phone's GPS and posts it to the curb.watch API. The backend matches that location against San Francisco's street cleaning and parking rule dataset and sends you a **Telegram alert** before the next violation window starts.

**Stack:** FastAPI + Postgres backend on Railway, Next.js frontend, and the CarPlay-disconnect iOS Shortcut as the parking-event source.

Live at [curb.watch](https://curb.watch) — currently a personal deployment, no public sign-ups.

![Curbwatch dashboard with current status, map view, Telegram integration panel, and recent activity log](/static/img/curbwatch.png)
