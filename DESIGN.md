---
name: Sarthak Kumar
description: A dark, exact engineering portfolio where project status is first-class data and the work is shown as real screens or real architecture.
colors:
  ground: "#0c1116"
  surface-1: "#121920"
  surface-2: "#182129"
  surface-3: "#212b35"
  rule: "#27323c"
  ink: "#edebe6"
  ink-2: "#a9aeb3"
  ink-3: "#88919a"
  accent: "#f2a93b"
  accent-hover: "#f6b856"
  accent-ink: "#1a1206"
  image-outline: "oklch(1 0 0 / 0.1)"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(64px, 19vw, 180px)"
    fontWeight: 640
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "\"wdth\" 112"
  display-title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(52px, 6vw, 104px)"
    fontWeight: 640
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "\"wdth\" 125"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(56px, 8.4vw, 148px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 116"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.25
    fontVariation: "\"wdth\" 108"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 420
    lineHeight: 1.3
  body-large:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 420
    lineHeight: 1.6
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 420
    lineHeight: 1.55
  label:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 420
    lineHeight: 1.45
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  none: "0px"
  focus: "2px"
  mark: "50%"
spacing:
  margin: "clamp(16px, 4vw, 56px)"
  section-gap: "clamp(120px, 16vw, 224px)"
  seam: "1px"
  panel-sm: "20px"
  panel-md: "32px"
  panel-lg: "40px"
  frame-max: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
  learn-more:
    textColor: "{colors.ink}"
    height: "44px"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    height: "44px"
    padding: "0 12px"
  nav-link-active:
    textColor: "{colors.ink}"
  chapter-panel:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.none}"
    padding: "{spacing.panel-lg}"
  stepper:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "56px"
  status-mark:
    size: "10px"
    rounded: "{rounded.mark}"
  mobile-menu:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    padding: "8px"
    width: "min(78vw, 320px)"
---

# Design System: Sarthak Kumar

## Overview

**Creative North Star: "The Status Board"**

A warm graphite room with one sodium lamp. The system reads like a well-kept engineering status board: every project carries its true state as a mark, the work appears as real screenshots or as diagrams drawn from the project's own architecture docs, and nothing is decorated to look busier than it is. Depth comes from stepping the ground up in tone, never from shadows, borders or glows.

One variable family, Mona Sans, does all the display work through its width axis. Names and titles stretch wide; body copy stays at normal width and a slightly heavy 420 weight for legibility on the dark ground. Mono appears only for literal source code. Corners are square everywhere a container appears; the only round forms are the status marks and the diagram packets, which are marks, not containers.

Motion is part of the material. Headings rise from behind their own baseline, the hero name stretches its width axis into place once, project chapters stack and settle as you scroll, and the system diagrams carry a small packet along each connection. Every recipe has a reduced-motion fallback that keeps the content and drops the movement.

**Key Characteristics:**
- Graphite ground stepped by tone (ground, surface-1, surface-2, surface-3); no structural shadows or borders.
- One accent, sodium amber, for live status, the primary action and the focus ring.
- Status carried by mark form, so it survives without colour.
- Mona Sans width axis as the display voice: wider means more important.
- Real screens and real architecture only; no mock-ups or illustration.
- Scroll-scrubbed and line-masked motion with complete reduced-motion fallbacks.

## Colors

Deep blue-graphite under a faint engineering-paper dot grid, with warm off-white ink and a single sodium-amber accent.

### Primary
- **Sodium Amber** (accent): the "live" status mark, the primary action fill ("Explore my work", "Email me"), the global focus ring, and the hover underline on the contact email address. Nothing else.
- **Amber Lit** (accent-hover): primary button hover only, on fine pointers.
- **Amber Shadow Ink** (accent-ink): text on amber fills (primary button, skip link).

### Neutral
- **Graphite Ground** (ground): page background, header bar, the colour that shows through 1px seams between tiles, and the dimming shade on covered chapters.
- **Graphite Step 1** (surface-1): chapter panels, contact block, footer, about/activities tiles, calculator body, row hover.
- **Graphite Step 2** (surface-2): secondary buttons, steppers, diagram nodes, the calculator result well, mobile menu, screenshot letterbox.
- **Graphite Step 3** (surface-3): secondary hover, mobile menu item hover, inactive reel track, attendance bar track, scrollbar thumb.
- **Rule Graphite** (rule): 1px row separators in real data tables only.
- **Warm Paper Ink** (ink): primary text, filled "verified" mark, ring marks, active nav underline, reel progress, the 75% threshold line, diagram packets.
- **Ink Second** (ink-2): supporting copy, inactive nav, secondary labels, dashed in-progress ring.
- **Ink Third** (ink-3): metadata, stacks, captions, diagram arrows, link underline at rest, square "blocked" outline mark.

### Background
- **Dot grid:** the page ground carries a 28px engineering-paper grid of 1px dots in ink at 13% opacity, fixed behind all content (`z-index: -1`, ground colour on `<html>`). It drifts at 0.12x the scroll for depth.
- **Cursor glow:** a second copy of the grid, dots in ink at 55%, is masked to a 200px circle around a mouse pointer and fades in over 400ms. Hidden on touch devices and under reduced motion; the base grid stays.
- Surfaces (panels, tiles, footer) are opaque, so the grid only shows on the open ground between them.

### Named Rules
**The One Lamp Rule.** Amber marks what is live or what you should press next, and the focus ring. The one licensed exception is the amber channel that flickers through the name during a glitch burst (user request). If a new use is none of these, it is ink.

**The Tone Step Rule.** A container separates from its parent by moving one graphite step up, never by a border or shadow. Tiles that sit side by side are split by a 1px gap that lets the ground show through.

## Typography

**Display Font:** Mona Sans (variable, `wdth` axis loaded), with ui-sans-serif, system-ui
**Body Font:** Mona Sans
**Label/Mono Font:** JetBrains Mono, for literal code blocks only

**Character:** One engineered grotesque doing everything; hierarchy comes from width and weight, not from a second family. Wide, tight-tracked titles over plain, slightly heavy body text.

### Hierarchy
- **Display** (640, clamp(64px, 19vw, 180px), widening to 11.1vw on one line at desktop; 0.9; -0.04em; wdth 112): the hero name and the footer name (10.3vw). The hero name enters at wdth 75 / weight 380 and stretches to wdth 112 / 640 over 1100ms.
- **Display Title** (640; wdth 125; 0.9): names of things, chapter titles at clamp(52px, 6vw, 104px) and case-study titles at clamp(64px, 10vw, 176px), plus the calculator result number at clamp(88px, 11vw, 160px) (wdth 112).
- **Headline** (600, clamp(56px, 8.4vw, 148px), 1, -0.03em, wdth 116): section headings (Selected work, About, Skills, Activities, Contact); the contact email uses the same face at clamp(26px, 3.5vw, 54px).
- **Title** (600, 22px, wdth 108): case-study block headings, skill group names, activity titles. Smaller inline names (nav wordmark, diagram node titles) use 600 at wdth 112.
- **Lead** (420, clamp(22px, 2vw, 28px), 1.3): the one-sentence promise and case-study summaries, held to 30 to 44ch.
- **Body Large** (420, 19px, 1.6): prose in About, chapters and case studies, held to 62 to 72ch.
- **Body** (420, 17px, 1.55): base text, nav wordmark, footer links.
- **Label** (420, 15px): metadata, status labels, captions, field labels, nav items. Sentence case, no tracking, no uppercase.
- **Code** (400, 13.5px JetBrains Mono): the Bunkr source excerpt only.

### Named Rules
**The Width Is Rank Rule.** Importance is expressed on the width axis: body at default width, small names at 108 to 112, section headings at 116, titles of things at 125. Do not add a second display family to get contrast.

**The Mono Is Code Rule.** JetBrains Mono appears only inside literal `<pre><code>`. Labels, numbers and metadata stay in Mona Sans; numbers use tabular figures instead.

## Layout

A single frame (max 1600px, side margin clamp(16px, 4vw, 56px)) on a 12-column grid at desktop that collapses to one column below 1024px. Sections are separated by a large section gap (clamp(120px, 16vw, 224px)), not by rules. The hero is a full-width name above a 5/7 split; chapters split 4/8; case-study blocks put the heading in 4 columns and the prose in 7; contact splits 8/4.

Panels pad at 20px on phones, 32px at md and 40px at lg. On desktop each project chapter is a sticky panel under the 64px nav (top 88px, height 100svh minus 104px, min 620px) with 18vh between chapters; on phones and under reduced motion they are a plain stack 24px apart. The header is sticky, and `scroll-padding-top` is 88px so anchors land below it. Interactive rows and links hold at least 44px of height; buttons 48px.

## Elevation & Depth

Flat and tonal. Depth is conveyed by the four graphite steps and by motion (the covered chapter scales to 0.92 and dims under a ground-coloured shade at 0.72 opacity). Screenshots get a hairline inner outline (1px white at 10% opacity) so their edges hold against the dark ground. The only true shadow belongs to the one floating overlay, the mobile menu.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45)`): the mobile navigation dropdown, because it genuinely floats over content. Nothing else.

### Named Rules
**The Only Overlays Float Rule.** A shadow is allowed only on an element that sits over other content (menus, popovers). Cards, panels and images never cast one.

## Shapes

Square corners (0px) on every container, button, panel, stepper, tile, image and menu. The focus ring takes a 2px radius so it reads as a ring. Round forms are reserved for marks: the 10px status dots and rings, the 6px diagram packets. Small squares (4px) serve as list bullets in diagrams and a 12px by 2px dash for case-study lists. 1px lines appear only as data-table row separators (rule colour) and 2px lines only as indicators: the active nav underline, the reel track and progress, and the 75% threshold.

### Named Rules
**The Marks Are Round Rule.** A circle means a status or a signal in motion. Containers stay square; marks may be round.

## Components

### Buttons
Solid, quiet and tactile; they press in.
- **Shape:** square (0px), 48px minimum height, 22px side padding, 600 weight at 16px, 10px icon gap.
- **Primary:** sodium amber fill with amber-shadow ink. One per view region (hero, contact).
- **Secondary:** graphite step 2 fill with ink text; steps to graphite 3 on hover.
- **Hover / Focus / Active:** hover colour changes only on fine pointers (150ms); active scales to 0.96 (160ms, strong ease-out); focus is the global 2px amber outline offset 3px.
- **Compact:** nav Resume and the mobile Menu toggle use the secondary button at 40 to 44px height and 16px padding.

### Learn More Link
- **Style:** 600 ink text, 44px minimum height, followed by a 16px drawn chevron.
- **Hover:** the chevron shifts 3px right and its two arms spread 8deg each way into an arrow (350ms, smooth-out). Used for case study, live site, source and contact links.

### Inline Link
- **Style:** ink text with a 1px underline in ink-3 offset 0.22em; underline brightens to ink on hover. Footer links.

### Status Marks
State is carried by form, not only colour (10px):
- **Live:** filled amber dot.
- **Verified:** filled ink dot.
- **Beta / Built, not verified:** 2px solid ink ring.
- **In progress / Still unfinished:** 2px dashed ink-2 ring.
- **Blocked:** 2px ink-3 square outline (square corners).
- **Status tag:** mark plus 15px ink label with 8px gap and the status meaning as a title.

### Cards / Containers
- **Corner Style:** square.
- **Background:** graphite 1 for panels and tiles, graphite 2 for nested wells and diagram nodes.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none. Tile groups (about facts, case-study decisions, activities) are split by 1px seams of ground.
- **Internal Padding:** 20px tiles; panels 20, 32 or 40px by breakpoint.

### Inputs / Fields
- **Stepper:** a 56px graphite-2 bar with minus and plus icon buttons (18px Lucide icons, ink-2 to ink on hover) around a centred 22px 600 tabular number; native spinners hidden. Label above in 15px ink-2.
- **Focus:** the global amber ring.
- **Disabled:** at the min or max bound the step button is disabled.

### Navigation
- **Desktop:** 64px sticky bar on ground. Wordmark at 17px 600, wdth 112. Section links at 15px ink-2, ink when hovered or current; the current section gets a 2px ink underline that scales in from the left (250ms, smooth-out).
- **Hide on scroll:** the bar slides up out of view (350ms, smooth-out) when scrolling down past 240px and returns on any scroll up or keyboard focus.
- **Mobile:** a "Menu" secondary button opens a graphite-2 dropdown (overlay shadow) anchored top right, scaling from 0.97 over 250ms and closing to 0.99 over 150ms; items are 48px rows at 17px; Escape and outside press close it.

### Project Chapters (signature)
Each project is a full-height graphite-1 panel: title in Display Title, status tag and category, summary, status note, stack, then links, against the project's visual in 8 columns. On desktop with motion allowed, GSAP ScrollTrigger scrubs (0.5) the covered panel to scale 0.92 from its top edge and its shade to 0.72 opacity while the next panel slides over it. Phones and reduced motion get a plain stack.

### Screens Reel
Real screenshots in a 16:10 graphite-2 frame crossfade (900ms, smooth-out) while the incoming frame settles from scale 1.04 over 6000ms linear. Below it, one tab per screen with a 2px track; the active tab's ink progress bar fills over the 5200ms hold. It pauses on hover and focus, only runs while 40% visible, and never auto-advances under reduced motion.

### System Diagram
A vertical list of graphite-2 nodes (title, note, role tag, square-bulleted items) joined by drawn ink-3 arrows, each captioned with the protocol it carries. A 6px ink packet travels each connection on a 2800ms loop (strong in-out ease, staggered 0.7s); under reduced motion the packet rests mid-track.

### Attendance Calculator
Two steppers, an attendance bar (10px graphite-3 track, ink-2 fill that eases over 500ms, ink-3 when in danger) with a 2px ink line at 75%, and a result well whose number pops in digit by digit.

### Motion Recipes
- **Texts reveal:** lines marked for reveal fade from 0, rise 16px and unblur 3px over 600ms (smooth-out), staggered 70ms by index, when the block is 12% inside the viewport. Hidden only once the document is flagged as scripted. Reduced motion: 200ms opacity only.
- **Line-mask split:** headings split by word (55ms step) or letter (32ms, hero 38ms); each unit rises from 112% below inside an overflow-hidden box over 1100ms (strong ease-out). Screen readers get the plain text once. Reduced motion: static.
- **Hero name:** width axis 75 to 112 and weight 380 to 640 over 1100ms; on scroll the name drifts up 18% and dims to 0.2, scrubbed. Reduced motion: final state, no scrub.
- **Card tilt:** the hero screenshot leans up to 7deg toward a mouse pointer (400ms while tracking, 1000ms back to flat) and its image settles from scale 1.06. Touch and reduced motion stay flat.
- **Plate reveal:** the portrait opens with a clip-path wipe from the top (400ms, strong in-out) while settling from scale 1.08 over 1400ms. Reduced motion: opacity only.
- **Text morph:** "Copy email" crossfades to "Copied" with a 2px blur (180ms) while its width resizes (240ms).
- **Number pop-in:** only changed digits re-enter, rising 8px from a 2px blur over 500ms, last digit 70ms later.
- **Name glitch:** two decorative copies of the name (amber channel, ink-3 ghost) flash in torn horizontal bands (clip-path inset steps) offset up to 0.05em while the base jitters and skews up to 4deg, 640ms in hard steps. Fires once 1.9s after load, on mouse hover, and every 7 to 11s while on screen and the tab is visible. Never under reduced motion.
- **View transitions:** root crossfade 250ms; the shared project plate morphs between home and case study over 400ms. All disabled under reduced motion.

## Do's and Don'ts

### Do:
- **Do** separate surfaces by stepping one graphite tone (ground to surface-1 to surface-2 to surface-3).
- **Do** give every project a status mark whose form, not only colour, states live, beta or in progress.
- **Do** use the Mona Sans width axis for rank: wdth 112 to 125 for names and titles, default width for body.
- **Do** keep amber to live marks, the primary action and the focus ring.
- **Do** show work as real screenshots (with the 10% white hairline outline) or diagrams drawn from the project's real architecture.
- **Do** ship a reduced-motion fallback with every motion recipe that keeps the content visible and drops transform, blur and scrubbing.
- **Do** keep interactive targets at 44px minimum and buttons at 48px.

### Don't:
- **Don't** round containers, buttons or images; round forms are for status marks and packets only.
- **Don't** add shadows to cards, panels or images; the overlay shadow is for floating menus only.
- **Don't** draw 1px borders around containers; 1px rule lines belong to real data tables.
- **Don't** use JetBrains Mono for labels, numbers or metadata; it is for literal code.
- **Don't** add a second accent or use amber for decoration, headings or illustration.
- **Don't** replace real screens with mock-ups, gradient blobs or stock imagery.
- **Don't** add uppercase tracked labels or kickers above headings; metadata is 15px sentence case.
