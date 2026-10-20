---
name: World-n-Trips — Home atlas
description: The implemented Home visual world, scoped to the root route.
colors:
  ocean-navy: '#123742'
  mineral-mist: '#eaf0ed'
  surface: 'white'
  atlas-teal: '#167d7e'
  action-hover: '#12666a'
  link-teal: '#126e70'
  muted-ink: '#526b75'
  quiet-border: '#d5e0df'
  active-chartreuse: '#d9ed93'
  field-surface: '#f9fbfc'
  visited: '#16888b'
  visited-light: '#70b7b1'
  unvisited: '#cdd8d5'
typography:
  display:
    fontFamily: 'Poppins, sans-serif'
    fontSize: 'clamp(30px, 3.5vw, 52px)'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.03em'
  title:
    fontFamily: 'Poppins, sans-serif'
    fontSize: 'clamp(24px, 2.1vw, 32px)'
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: 'Poppins, sans-serif'
    fontSize: '15px'
    lineHeight: 1.6
  label:
    fontFamily: 'Poppins, sans-serif'
    fontSize: '14px'
  metric:
    fontFamily: 'Poppins, sans-serif'
    fontSize: 'clamp(26px, 2.7vw, 40px)'
    fontWeight: 700
    lineHeight: 1.25
rounded:
  card: '12px'
  control: '6px'
spacing:
  small: '8px'
  compact: '12px'
  standard: '16px'
  card: '20px'
  roomy: '24px'
components:
  button-primary:
    backgroundColor: '{colors.atlas-teal}'
    textColor: '{colors.surface}'
    rounded: '{rounded.control}'
    padding: '14px 18px'
    typography: '{typography.label}'
  button-primary-hover:
    backgroundColor: '{colors.action-hover}'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ocean-navy}'
    rounded: '{rounded.card}'
  input-select:
    backgroundColor: '{colors.field-surface}'
    textColor: '{colors.ocean-navy}'
    rounded: '{rounded.control}'
    padding: '9px 28px 9px 12px'
    typography: '{typography.label}'
  navigation:
    backgroundColor: '{colors.ocean-navy}'
    textColor: '{colors.surface}'
    typography: '{typography.label}'
---

# Design System: World-n-Trips — Home atlas

## Overview

**Creative North Star: “Personal travel atlas.”**

Home combines geographic orientation with the warmth of a recorded journey. The original side navigation and top-right icon toolbar, mineral mist ground, white panels, and restrained teal controls make real travel records easy to scan. Existing Poppins typography connects this world to the rest of the application.

This document records the implemented **Home route (`/`) only**. It does not replace the global theme or the country, trip, journal, and statistics commitments in PRODUCT.md. Their existing colors, radii, navigation, theme behavior, and photographic trip hero remain authoritative. The Home palette is currently explicit rather than a complete dark-theme token set; do not infer dark-mode coverage from the global theme toggle.

**Key Characteristics:**

- Calm navy-and-teal hierarchy with softly outlined white surfaces.
- Live geographic data and authentic trip photography.
- Compact controls and readable, prominent travel totals.

## Colors

### Primary

Ocean navy anchors headings and totals. Atlas teal identifies primary actions and selected switches; link teal gives quieter text actions their own readable emphasis. Visited and visited-light provide the real map's coloring range.

### Secondary

Chartreuse marks selected text; the restored navigation and toolbar retain their existing focus and active states. It is a small signal rather than a panel fill.

### Neutral

Mineral mist forms the page ground. Surface white separates the atlas and trip panels. Muted ink supports dates, descriptions, and metric labels; quiet border defines cards and dividers. Field surface distinguishes editable controls, and unvisited distinguishes geography with no recorded visit.

**The Route Boundary Rule.** Apply this palette within Home; consult incumbent styles and PRODUCT.md before changing another route.

## Typography

Use the existing Poppins family with a sans-serif fallback. Bold, tightly tracked introductory type establishes hierarchy; softer supporting text preserves the journal character. Use the frontmatter's display, title, body, label, and metric roles. Metrics use tabular numerals. Trip names wrap naturally, including unusually long names; retain full supporting content.

## Layout

The approved Home surface puts map and totals on the left and the latest trip on the right. Its desktop grid uses a larger atlas column (2.8fr) and a narrower trip column (1fr, at least 280px), separated by 16px. The centered content caps at 1800px; the existing full-width preference removes that cap. Fluid outer padding ranges from 16px to 40px horizontally and 24px to 56px above the introduction.

Map filters loosen into wrapping rows at 1150px. At 800px the panels stack with the trip after the atlas, the introduction stacks, and the map footer becomes vertical. At 450px select rows fill the available width. The three totals remain in a three-column row with wrapping labels. Latest-trip photos use a compact 16:9 crop at every width. The right column stacks Last trip above Recent trips. On desktop (801px and wider), the column stretches to the atlas height and Last trip absorbs spare height, aligning the Recent trips bottom edge with the atlas. Mobile cards retain their natural height.

These are Home composition decisions, not mandatory layouts for other surfaces.

## Elevation & Depth

Home's major panels have no added shadows. Contrast between the mist ground and white surfaces, thin quiet borders, and internal dividers supplies depth. Preserve this restrained layering when extending Home.

## Shapes

Major panels use the card radius. Controls, loading placeholders, and trip photographs use the smaller control radius. The switch is pill-shaped with a circular thumb; map legend markers are circular. Map geometry remains unframed inside the enclosing atlas card.

## Components

### Buttons

Teal actions use white labels, the control radius, and the primary padding. The trip-details action is a right-aligned teal text link with a 44px minimum target height and underline on hover. Recent trips retains its 21px bold heading. The photo-backed Last trip card uses a quiet 16px regular heading, a larger 28–36px medium-weight destination, 16px regular dates, and a lighter 13px summary and text action. Home content exposes a visible teal focus outline (3px, offset 4px). Quieter links underline on hover.

### Inputs / Fields

Continent and region are MUI Select components with separate inline labels and white backgrounds with a thin border and a 50px minimum height and 190px desktop width. Region is disabled when the world is selected. The coloring switch uses a 44px by 26px track and a 20px white thumb. Its thumb moves over 180ms with ease-out; reduced motion removes the transition. Preserve the actual input and visible keyboard focus.

### Cards / Containers

The atlas card uses 24px top, 20px horizontal and bottom padding on desktop, then 16px on mobile. The latest-trip card uses 20px top and 24px remaining padding, then 20px on mobile. Keep missing values distinct from zero; loading, retry, empty-trip, empty-map, and failed-photo states are part of these components.

### Navigation

Home uses the original left-side navigation dock and the original fixed top-right icon toolbar. There is no Home brand bar or horizontal navigation. Main content reserves 70px above it for the toolbar. The page heading is “My world, so far.”, with no subtitle or statistics shortcut beside it.

### Travel atlas and totals

Google GeoChart supplies geography; live API country codes and visit counts supply selected areas and optional intensity. Inline filters redraw the map. Totals sit below a horizontal divider and use vertical separators between three metrics. Country selections navigate through the available country-code mapping. The map is not a generated raster.

### Recent trips

Below Last trip, show up to three earlier trips from the same cached trip list, excluding the featured first entry. Each full-row link contains a 64×56px thumbnail, wrapping trip name, available dates and arrow. Use quiet separators and an All trips link. Hide the section when there are no earlier trips. Failed thumbnails use the landscape icon.

### Latest trip

The accepted photo treatment fills the whole card, keeps the prior card proportions, and places white text over a dark gradient. The card has no border. Preserve the ordinary fallback and loading states if the image is unavailable.

Use the existing API cover photograph, name, available date range, summary, and details link. A failed image falls back to the trip name and a landscape icon. No generated raster assets ship with this Home implementation.

## Do's and Don'ts

- **Do** keep the approved map-and-totals / latest-trip desktop hierarchy and its mobile reading order.
- **Do** preserve real data, full labels, existing settings actions, and explicit unavailable states.
- **Do** retain the existing font and route-specific brand commitments.
- **Don't** reintroduce the rejected photographic banner on Home.
- **Don't** ship mockup map shading, illustrative totals, or mockup photography as recorded travel data.
- **Don't** treat this Home document as authorization to restyle other routes.
