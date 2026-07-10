# Homepage Pixel Replica Design

Date: 2026-07-10
Project: Eileen's Flowing Thoughts

## Goal

Rework the homepage first screen so it closely matches the provided reference image at desktop sizes. The target is a pixel-close visual match for the top viewport: header, title, subtitle, navigation, search icon, main divider, hero illustration cluster, second divider, and the top of the "Latest Works" card section.

Mobile and narrow layouts should preserve the same hand-drawn visual language, but they do not need to match the reference image pixel-for-pixel.

## Reference

Primary reference image:

- Downloaded reference PNG in `C:/Users/Eilee/Downloads/`
- Matching project copy in the repository root with the Chinese homepage-design filename.
- Reference dimensions: 1672 x 941

Current implementation already has a hand-drawn SVG pack in `handdrawn_svg_icons_pack/`, so the redesign should reuse those assets instead of introducing a new asset system.

## Scope

In scope:

- `index.html` homepage layout and content structure.
- `css/style.css` homepage styling, spacing, typography, and responsive rules.
- Minimal `js/main.js` text fixes only if needed for search or visible UI strings.
- Reusing the existing SVG icon pack for all decorative elements.
- Desktop visual verification against the reference image.

Out of scope:

- Redesigning secondary pages such as `works.html`, `thoughts.html`, `docs.html`, `videos.html`, `guestbook.html`, or `about.html`.
- Replacing the site with a static image background.
- Creating a new build system or framework.
- Changing project content strategy beyond what is visible on the homepage first viewport.

## Current Findings

The repository is a static GitHub Pages site using plain HTML, CSS, and JavaScript. The current homepage already includes most of the needed decorative SVGs, but it differs from the reference in four visible ways:

- The title font is too ornamental and calligraphic compared with the reference's chunky handwritten print style.
- The header and hero vertical spacing are too loose, pushing the card section lower.
- Hero illustrations are arranged as separate decorative blocks instead of a tighter horizontal composition around the central text.
- Card borders and section dividers are too light and regular compared with the darker sketch lines in the reference.

There is also an encoding risk: the working tree's local reads showed mojibake in several text files, while `git show HEAD:index.html` displays correct Chinese. Implementation should preserve UTF-8 and avoid rewriting Chinese text from corrupted terminal output.

## Recommended Approach

Use a homepage-specific layout refinement rather than a full site rewrite.

The implementation should keep the existing static site architecture and reuse existing SVGs, but restructure the homepage first viewport into a calibrated desktop composition:

- Wide paper canvas matching the reference proportions.
- Centered header with title, subtitle, navigation, and top decorations.
- Fixed-position search icon in the upper-right visual corner.
- Main hand-drawn divider spanning nearly the full content width.
- Hero row with left book/cloud/leaf cluster, centered welcome copy, and right quill cluster.
- Dotted flight line and small icons positioned along the lower hero row.
- Second divider directly above the "Latest Works" title.
- Two-card grid begins inside the first viewport on desktop.

This provides a close desktop match while keeping semantic HTML and maintainable responsive behavior.

## Layout Design

### Page Canvas

The desktop page should use a wider max width than the current implementation. The target visual canvas should be approximately 1280-1360px wide in browser screenshots, with warm off-white background and centered content.

Recommended desktop rules:

- Body background: warm paper tone close to `#f8f1e8`.
- Main content width: `min(1280px, calc(100vw - 120px))` for large desktop.
- Reduce top padding so the title starts closer to the reference.
- Avoid card-like wrappers around major sections; the reference is an open paper layout.

### Header

The header should be shorter and more compact than the current version:

- Title centered, large, and handwritten-print rather than formal script.
- Subtitle directly below the title in muted gray Chinese text.
- Navigation below subtitle with generous horizontal spacing.
- Active nav uses a dark underline plus a pale blue offset underline.
- Header swoosh/star sits left of the title; sparkle cluster sits right of the title.
- Search icon remains top-right and uses the existing `search_box.svg`.

### Hero

The hero should occupy a compressed horizontal band:

- Left cluster: open book, cloud, and leaf sprig placed near the left side of the hero.
- Center copy: the Chinese "welcome to my little world" heading, with a short warm underline and small heart.
- Body text: two centered Chinese lines.
- Lower hero: dotted wavy path with small book, lightbulb, and paper airplane aligned along it.
- Right cluster: quill and ink placed at a similar scale and height to the reference.

The hero should not be vertically centered with excessive whitespace. It should guide the eye from left illustration to center text to right illustration.

### Latest Works Preview

The "Latest Works" section should appear before the bottom of the first desktop screenshot:

- Section title aligns near the left content edge.
- Latest works icon sits before the text.
- Pale blue underline under the Chinese title.
- First two cards are wide sketch cards with darker hand-drawn borders, tape accents, corner stars, and paperclip decorations.
- Card cover areas should be large enough to resemble the reference, but content below can continue naturally.

## Typography

Use a font stack that moves closer to hand-drawn print:

- English title: prefer a chunky handwritten display font available through Google Fonts if reliable, with local fallbacks.
- Chinese text: use a handwritten-friendly Chinese fallback stack when possible, while preserving readability.
- Avoid negative letter spacing.
- Keep heading and nav sizes stable instead of scaling directly with viewport width.

If the best visual font requires a new Google Fonts import, add it in both `index.html` and `css/style.css` consistently.

## Components

The homepage can be organized with these classes:

- `site-header`: compact title/navigation region.
- `header-deco-left`, `header-deco-right`: decorative SVG positions.
- `search-wrapper`: fixed or absolute upper-right search affordance.
- `divider-main`: full-width hand-drawn divider.
- `hero`, `hero-layout`, `hero-left`, `hero-center`, `hero-right`: calibrated first-screen hero.
- `hero-dash-row`, `hero-icons`: lower hero path and icons.
- `section-title`: latest works title treatment.
- `card-grid`, `sketch-card`, `card-cover`: repeated homepage content cards.

Existing class names should be reused where possible to reduce the blast radius.

## Data Flow

There is no backend data flow. The homepage content is static HTML. Search behavior continues to use the existing in-browser `searchIndex` in `js/main.js`.

If visible search strings or labels are touched, they must remain correct UTF-8 Chinese.

## Error Handling

Because this is a static site, the main failure modes are visual and asset-related:

- If an SVG path fails, the layout should still leave reasonable space and not collapse.
- Search open/close behavior should remain usable after header positioning changes.
- Responsive rules should hide or stack dense decorative clusters on mobile to avoid overlap.

## Responsive Behavior

Desktop is the priority for the pixel-close target.

For tablets and phones:

- Keep title, subtitle, navigation, and search usable.
- Collapse hero side illustrations or reduce them into a simpler stacked layout.
- Keep cards in one column on narrow screens.
- Ensure Chinese text and buttons do not overlap or overflow.

## Verification

Implementation should be verified with:

- Local static preview in a browser or lightweight HTTP server.
- Desktop screenshot comparison against the reference at a wide viewport.
- Mobile screenshot check for overlap and readability.
- Manual search open/close test.
- Git diff review to confirm only intended homepage files changed.

## Risks

- Font availability may prevent an exact title match. Use the closest web-safe or Google-hosted option and tune size/weight to compensate.
- Current working-tree text appears vulnerable to encoding corruption. Use UTF-8-aware editing and compare against `git show HEAD:index.html` when preserving Chinese copy.
- Existing SVGs were reconstructed from the reference but are simplified; exact sketch texture may remain slightly cleaner than the target image.

## Decision

Proceed with the homepage-specific pixel-close desktop redesign, using existing static HTML/CSS/JS and current SVG assets. Do not use the reference image as a background. Preserve maintainability and mobile usability while making the desktop first viewport match the reference as closely as practical.
