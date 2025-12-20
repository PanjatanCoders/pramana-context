# Pramana Context – Development Plan

Tagline: **Remember why you opened it**

This document outlines the phased development strategy for building Pramana Context as a stable, long-term browser extension.

---

## Phase 0 – Foundation (Week 0)

Goal: Prepare the ground correctly before writing features.

- Finalize product name and tagline
- Lock Manifest V3 structure
- Define data schema for context storage
- Establish folder structure
- Set coding conventions
- Create README and project docs

Deliverable:
- Repository skeleton
- Manifest.json draft
- Storage schema defined

---

## Phase 1 – Core Memory (Week 1)

Goal: Capture and store intent reliably.

Features:
- Track tab open / close events
- Capture URL, title, timestamp
- Manual intent input (one-line text)
- Local storage implementation
- Basic popup UI

Rules:
- Zero friction
- No forced prompts
- Manual first, automation later

Deliverable:
- Working extension capturing context per tab
- Popup shows current tab context

---

## Phase 2 – Recall & Search (Week 2)

Goal: Retrieve context by meaning, not mechanics.

Features:
- Intent-based search
- Timeline view of stored contexts
- Filter by date, domain, revisit count
- Mark context as resolved / pending

Deliverable:
- Searchable memory interface
- Context recall in under 2 clicks

---

## Phase 3 – Behavioral Intelligence (Week 3)

Goal: Learn from user behavior without being intrusive.

Features:
- Revisit tracking
- Long-open tab detection
- Abandoned context identification
- Gentle nudges for unresolved items

Constraints:
- No notifications spam
- All logic runs locally

Deliverable:
- Smart signals, not alerts
- Insight without annoyance

---

## Phase 4 – Automatic Grouping (Week 4)

Goal: Reduce manual organization.

Features:
- Auto-group contexts by:
  - Time window
  - Domain similarity
  - Intent similarity
- Context clusters view
- Rename / merge groups manually

Deliverable:
- Meaningful clusters of work
- No manual tab management

---

## Phase 5 – UX Polish & Stability (Week 5)

Goal: Make the extension feel invisible and solid.

Features:
- Refined popup and options UI
- Performance optimization
- Storage cleanup rules
- Edge & Chrome store packaging
- Icons and branding finalization

Deliverable:
- Production-ready extension
- Store submission assets

---

## Phase 6 – Optional AI Layer (Future)

Goal: Enhance intelligence, not replace user control.

Features (Opt-in):
- Intent suggestions
- Context similarity detection
- Smart summaries
- Natural language recall

Rules:
- Explicit user consent
- Clear data boundaries
- Local-first where possible

---

## Long-Term Vision

Pramana Context becomes the memory layer of the Pramana ecosystem:
- Manager → orchestration
- Fill → execution
- Reporter → visibility
- Context → cognition

---

## Success Metrics

- Reduced tab abandonment
- Faster context recall
- Increased completion of long-running work
- Low cognitive overhead

If users stop thinking about the tool but miss it when it’s gone, it has succeeded.
