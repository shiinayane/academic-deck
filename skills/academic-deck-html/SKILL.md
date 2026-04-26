---
name: academic-deck-html
description: Use when creating or revising HTML presentation decks for research group meetings, academic progress reports, project updates, paper walkthroughs, or reusable PPT alternatives based on AcademicDeck.
---

# AcademicDeck HTML Presentations

## Overview

Create reusable HTML slide decks using the AcademicDeck visual system: quiet, dense enough for technical work, responsive across 1080p/2K/4K, and validated before delivery.

Core principle: treat each deck as a reusable presentation artifact, not a one-off web page.

## When to Use

Use this skill for:
- Group meeting HTML slides, progress reports, research demos, paper walkthroughs, and project proposal decks.
- Requests to convert notes, docs, papers, experiment results, or plans into a browser-presentable deck.
- Changes to `index.html`, `decks/*.html`, `styles.css`, or `scripts/presentation.js` inside an AcademicDeck repository.
- Follow-up decks that should preserve the established Academic Clean visual style.

Do not use it for ordinary websites, blog posts, Markdown-only notes, `.pptx` decks, or Keynote theme generation.

## Repository Contract

When the current directory is already an AcademicDeck repository, work in that repository. If the user wants a new standalone deck workspace, scaffold it from this skill's bundled templates instead of cloning AcademicDeck.

Expected structure:

```text
index.html                    # English reusable template
styles.css                    # Shared Academic Clean visual system
scripts/presentation.js       # Shared navigation/runtime
decks/*.html                  # Generated meeting decks
assets/                       # Local images, diagrams, video placeholders
tests/validate-template.mjs
tests/validate-deck.mjs
package.json
README.md
```

Prefer editing a generated deck for concrete meeting content. Edit `index.html`, `styles.css`, or `scripts/presentation.js` only when reusable template behavior or the visual system itself must change.

## Bundled Templates

The installed skill is self-contained. It includes:

```text
templates/index.html
templates/styles.css
templates/scripts/presentation.js
templates/assets/scene-grounding-placeholder.svg
```

Use these files when creating a new AcademicDeck workspace for a user. Copy them into the target directory, then create generated talks under `decks/`.

## Workflow

1. Confirm the deck type and inputs.
   - Audience: internal group meeting, proposal discussion, paper reading, demo review.
   - Output: template update, new generated deck, or revision to an existing deck.
   - Media needs: images, video, code, tables, experimental metrics, diagrams.
   - Language: use the user's requested language for generated decks; keep the reusable template English unless asked otherwise.

2. Choose the right base.
   - New reusable pattern: start from `index.html`.
   - Real meeting deck: create, copy, or adapt an existing file under `decks/`.
   - New standalone workspace: copy this skill's `templates/` files into the target directory first.
   - Media-heavy discussion: use existing image/video/media grid patterns before inventing a layout.

3. Build slides with existing patterns first.
   - Cover: title, subtitle, status cards.
   - Decision/summary: conclusion, keep/pause/focus/output table.
   - Context: framing and constraints.
   - Evidence: metrics, table, before/after, failure analysis.
   - Media: image/video side-by-side, caption rail, annotation rows.
   - Plan: timeline, milestones, risks, next actions.

4. Preserve the visual system.
   - Quiet academic style: restrained color, strong whitespace, readable hierarchy.
   - No marketing hero pages, decorative gradients, nested cards, or ornamental blobs.
   - Keep slide content within the 16:9 frame and safe footer/header areas.
   - Maintain responsive tiers for 1080p, 2K, and 4K.

5. Validate before completion.
   - Run `npm run validate` from the AcademicDeck repository root.
   - For visual/layout changes, preview in a browser and inspect representative slides.
   - For navigation changes, test next/previous and manual scroll behavior.
   - For media decks, verify local asset paths exist and no remote assets are required.

## Content Rules

- Make slides presentation-ready, not documentation pasted into boxes.
- Prefer concise claims, explicit decisions, and evidence blocks.
- Use tables when comparing status, options, tasks, risks, or experiment conditions.
- Keep each slide to one job. If a slide needs two unrelated explanations, split it.
- Use local assets under `assets/`; do not hotlink remote images.
- For videos, ensure overlays do not block playback controls.

## Engineering Rules

- Use `apply_patch` for manual edits.
- Do not inline shared runtime code into generated decks.
- Do not add one-off CSS inside generated decks unless the deck has a clearly unique need.
- Keep generated decks separate from the reusable template.
- If changing template behavior, add or update validation checks.
- Keep `.DS_Store`, build outputs, logs, and dependency folders out of git.

## Verification Checklist

Before saying the deck is done:

```bash
npm run validate
```

Then confirm:
- Navigation counter is correct.
- Next/previous respect the sticky toolbar safe area.
- Footer page markers are populated.
- 16:9 layout holds at the relevant viewport size.
- Images/videos render without blocking controls.
- Print/PDF CSS still defines a 16:9 page.

## Common Mistakes

- Editing `index.html` with real meeting content instead of creating a generated deck.
- Making content smaller to fit instead of splitting slides.
- Adding a new visual language for one deck.
- Relying on browser smooth scrolling for navigation; use deterministic safe-area scrolling.
- Treating validation as optional after CSS or runtime changes.
