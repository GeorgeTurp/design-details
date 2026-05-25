# Changelog

All notable changes to this skill suite are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the suite follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The suite version (shown in `package.json`) bumps whenever any skill in the suite changes. Each individual `SKILL.md` also carries its own `version:` field that bumps independently when that skill changes.

## [0.2.1] — 2026-05-25

### Added
- `scripts/install.js` and `scripts/uninstall.js` wired via npm `postinstall` / `preuninstall` lifecycle hooks. On install or update, the script prints `✦ design-details v<version> installed` so users see which version they're on, plus a link to the changelog.
- `package.json` gains `files`, `scripts`, and `engines` fields so the package follows standard npm conventions.

### Why
Previously the version field lived in `package.json` and each `SKILL.md` frontmatter, but the `npx skills update` flow never surfaced it. Now the postinstall script explicitly prints the suite version after every install or update.

## [0.2.0] — 2026-05-25

Restructure from a single animation-focused skill into a multi-skill design suite.

### Added
- **`start`** (new skill, v0.1.0) — Session opener. Establishes twelve working rules, gathers minimum project context, routes to the right craft skills before any code is written.
- **`design-details`** (parent router, v0.2.0) — Broader entry point. Holds shared Design System Protocol, Context Gathering Protocol, Full Audit Contract, and lettered-section output format. Routes to every applicable craft skill on a full audit.
- **`design-details-layout`** (new skill, v0.1.0) — Spacing, alignment, hierarchy, rhythm, sizing, concentric radius.
- **`design-details-copy`** (new skill, v0.1.0) — Microcopy, labels, errors, empty states, CTAs, tone, AI-slop loading message hygiene.
- **`design-details-typography`** (new skill, v0.1.0) — Hierarchy through contrast, scale, line-height, tabular figures, OpenType features, typographic characters.
- **`design-details-color`** (new skill, v0.1.0) — Palette structure, contrast minimums, dark-mode re-design, semantic color, state colors, color-blindness safety.
- **`design-details-accessibility`** (new skill, v0.1.0) — Keyboard traversal, focus indicators, hit areas, semantic structure, screen reader signals, reduced motion, modals.
- **`design-details-analytics`** (new skill, v0.1.0) — Instrumentation: outcome-based event naming, property hygiene, fire-on-success vs intent, common-flow coverage.
- `package.json`, `CHANGELOG.md`, and a Versioning section in the README.

### Changed
- **`design-details-animation`** (v0.1.0 → v0.2.0) — Renamed from `design-details`. Now auto-detects platform from project context (`package.json` for React Native / `.xcodeproj` for SwiftUI / default to Web) and loads the right implementation file automatically.
- Platform implementations (React Native, SwiftUI, Web) collapsed from independent sibling skills into `design-details-animation/platforms/{react-native,swiftui,web}.md`. They are no longer independently invokable — the animation skill picks one based on the project.
- README rewritten: broader intro (no longer animation-only), three-phase workflow story (`/start` → craft skills → `/design-details` audit), structure tree, update command, versioning convention.

### Removed
- Standalone `design-details-react-native`, `design-details-swiftui`, `design-details-web` skills. Their content lives in `design-details-animation/platforms/` and is selected automatically.

## [0.1.0] — 2026-05-04

Initial release.

### Added
- `design-details` parent skill (animation-focused) with references for press feedback, gesture, haptics, motion language, and platform mapping.
- `design-details-react-native` — Reanimated 3, Gesture Handler, Expo Haptics implementation patterns.
- `design-details-swiftui` — SwiftUI springs, UIFeedbackGenerator, gesture APIs implementation patterns.
- `design-details-web` — CSS transitions, Framer Motion, Web Animations API implementation patterns.
- README with installation instructions (`npx skills add` and manual `git clone`) and skill overview.
- `evals/` directory with accessibility, cross-platform, and press-feedback test cases.
