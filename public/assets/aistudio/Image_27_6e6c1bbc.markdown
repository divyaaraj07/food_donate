---
name: Earth & Table
colors:
  surface: '#f2fcf4'
  surface-dim: '#d2ddd5'
  surface-bright: '#f2fcf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf6ee'
  surface-container: '#e6f0e8'
  surface-container-high: '#e1ebe3'
  surface-container-highest: '#dbe5dd'
  on-surface: '#151d19'
  on-surface-variant: '#3e4942'
  inverse-surface: '#29322d'
  inverse-on-surface: '#e9f3eb'
  outline: '#6e7a71'
  outline-variant: '#bec9c0'
  surface-tint: '#006c46'
  primary: '#006b45'
  on-primary: '#ffffff'
  primary-container: '#21865b'
  on-primary-container: '#ffffff'
  inverse-primary: '#7bd9a7'
  secondary: '#615e57'
  on-secondary: '#ffffff'
  secondary-container: '#e7e2d8'
  on-secondary-container: '#67645c'
  tertiary: '#875100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a96700'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#97f6c2'
  primary-fixed-dim: '#7bd9a7'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#005234'
  secondary-fixed: '#e7e2d8'
  secondary-fixed-dim: '#cbc6bd'
  on-secondary-fixed: '#1d1b16'
  on-secondary-fixed-variant: '#494740'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#f2fcf4'
  on-background: '#151d19'
  surface-variant: '#dbe5dd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a modern, community-centered food rescue and distribution service. The aesthetic unites organic warmth with logistics-grade clarity. It balances two key user groups: fast-paced donors (restaurants, grocers, caterers) who require frictionless dispatch flows, and community recipients and volunteers who require trust, dignity, and welcoming clarity.

The visual direction merges **Clean Modernism** with **Tactile Warmth**. It eschews sterile institutional austerity in favor of wholesome, grounded surfaces, open breathing room, friendly rounded contours, and deliberate focal contrasts. The emotional posture is dependable, proactive, and compassionate.

## Colors

The palette is derived from wholesome harvest tones, fertile greens, and warm culinary neutrals:

- **Primary (`#21865B`):** Forest Green anchors structural identity, primary actions, and verified states, evoking vitality and environmental responsibility.
- **Secondary (`#FFF9EF`):** Warm Cream functions as a softening surface canvas, warming up white panels to establish an organic, neighborhood-driven atmosphere.
- **Tertiary / Accent (`#F4A340`):** Warm Vibrant Orange acts as the catalyst for immediate action, imminent expiry warnings, pickup milestones, and donation alerts.
- **Neutral (`#1E2722`):** Deep Forest Slate replaces standard jet black, maintaining AAA readability with organic undertones.

### Supporting Canvas & Surface Tones
- `surface-canvas`: `#FFFFFF`
- `surface-subtle`: `#F8FAF8` (soft warm slate tint for alternate table rows and secondary card decks)
- `surface-muted`: `#F3F4F6` (utility gray for form outlines and neutral tags)

### Functional Status Tokens
- **Available / Approved:** `#16A34A` (Emerald Green)
- **Pending / In Transit:** `#F59E0B` (Amber Orange)
- **Expired / Urgent / Rejected:** `#E11D48` (Rose Red)
- **Completed / Archived:** `#64748B` (Slate Gray)

## Typography

The typography strategy leverages **Plus Jakarta Sans** for headlines and display tiers, providing friendly geometric warmth with rounded terminal nuances. For operational, dense, and interactive information (listing specs, schedules, weights, nutrition facts, and forms), **Inter** delivers crisp, neutral precision.

Headlines adopt snug tracking (`-0.01em` to `-0.02em`) to maintain compositional solidity on marketing headers and card titles. Form labels and category chips deploy Inter in medium or semi-bold weights with slight positive tracking to preserve quick scannability during high-volume sorting.

## Layout & Spacing

The system runs on an 8-point spatial base with an integrated 4-point micro-scale (`space-xs` = 4px). 

### Layout Grids
- **Desktop (1024px+):** 12-column fluid grid, max-width `1280px`, `gutter` 24px (`1.5rem`), outer `margin` 32px (`2rem`).
- **Tablet (768px – 1023px):** 8-column fluid grid, `gutter` 20px (`1.25rem`), outer `margin` 24px (`1.5rem`).
- **Mobile (320px – 767px):** 4-column fluid layout, `gutter-mobile` 16px (`1rem`), outer `margin-mobile` 16px (`1rem`).

Data panels, listing feeds, and donation dispatch dashboards prioritize horizontal grouping with vertical rhythm paced primarily by `space-md` (16px) for item clusters and `space-xl` (40px) between card modules and layout regions.

## Elevation & Depth

Visual hierarchy uses **tonal surfaces** combined with soft, **foliage-tinted ambient shadows** to suggest gentle physical lift without visual noise:

- **Level 0 (Flat Canvas):** `#FFFFFF` or `#F8FAF8` with no shadow; used for static backgrounds and baseline data table cells.
- **Level 1 (Card & Content Blocks):** `0 1px 3px rgba(30, 39, 34, 0.05), 0 4px 12px rgba(33, 134, 91, 0.04)`. Outlined with a fine, 1px border (`#E5E7EB` or `#E2EADF`).
- **Level 2 (Interactive Hover / Popovers):** `0 6px 16px rgba(30, 39, 34, 0.08), 0 2px 6px rgba(33, 134, 91, 0.06)`. Elevates hovered claims, cards, and dropdown sheets.
- **Level 3 (Modals & Sticky Action Trays):** `0 12px 32px rgba(30, 39, 34, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)`. Anchors priority claim confirmation sheets and donation creation modals.

## Shapes

The interface embraces inviting, organic curves. Primary cards, alerts, and container surfaces use level 2 curvature (`rounded-lg` at 16px and `rounded-xl` at 24px), signaling hospitality and food-safe approachable care. Interactive micro-elements (buttons, tags, input fields) align with rounded structural corners, while category badges and status indicator chips adopt full pill geometry (`9999px`) for quick tactile recognition.

## Components

### Buttons
- **Primary:** Solid `#21865B` background, `#FFFFFF` text, `rounded-xl` (12px), horizontal padding `space-lg`, vertical padding `space-sm`. Hover transitions to a deeper `#196A47`.
- **Secondary / Accent Action:** Solid `#F4A340` background with neutral dark text (`#1E2722`) for high-urgency reservations ("Claim Batch", "Deliver Now").
- **Subtle / Ghost:** Transparent background, `1.5px` border in `#21865B`, text `#21865B`. On hover, background fills with `#FFF9EF`.

### Category & Status Chips
- Full pill radii (`rounded-full`) with `label-md` uppercase-tracked typography.
- **Produce:** Crisp light olive-green ground (`#ECFDF5`), `#065F46` label.
- **Bakery:** Warm biscuit amber ground (`#FEF3C7`), `#92400E` label.
- **Prepared Meals:** Soft terra-orange ground (`#FFEDD5`), `#9A3412` label.
- **Dairy:** Cream azure ground (`#EFF6FF`), `#1E40AF` label.
- **Pantry:** Neutral warm gray ground (`#F3F4F6`), `#374151` label.
- **Status Indicators:** Include an embedded 6px solid circular pulse dot preceding status copy (Emerald, Amber, Rose, or Slate).

### Cards
- Base container in `#FFFFFF` on `#F8FAF8` background with an outer border of `1px solid #E5E7EB`.
- Generous internal padding (`space-lg`), featuring a split header: donor profile/location left-aligned, status chip right-aligned.
- Bottom actions feature dynamic expiry counters with an icon badge highlighted in `#F4A340`.

### Form Controls & Inputs
- Height 48px, background `#FFFFFF`, border `1.5px solid #E5E7EB`, corner radius `12px`.
- Active focus state uses a `#21865B` border with a subtle 3px outer ring tinted to `rgba(33, 134, 91, 0.15)`.
- Helper text rests at `body-sm` in `#64748B`.

### Lists & Inventory Logs
- Divider-less stacked cards on mobile; tabular data view with alternating rows (`#FFFFFF` to `#F8FAF8`) on desktop.
- Numerical units (e.g., "14.5 kg", "8 crates") set in `Inter` semi-bold tabular figures for immediate scannability.