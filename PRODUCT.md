# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user reviews their own recorded travels.

## Product Purpose

World-n-Trips presents recorded travel experiences and expenses. Country and trip summaries help the user understand travel duration, stays, walking distance, hitchhiking, and spending.

## Capabilities and Constraints

Country and trip pages share the Days & Nights and Expenses sections. Total travel cost and its daily average take priority; everyday living costs remain clearly secondary.

Duration and daily averages use full calendar duration when available, including arrival, departure, and days without records. When calendar duration is unavailable, use recorded days linked to recorded nights as the fallback and label the basis explicitly. The current implementation uses the recorded-night count for this fallback. Do not present it as calendar duration. The country statistics response currently has no explicit calendar-duration field; complete country visit intervals remain an open data requirement.

The existing everyday-spending calculation excludes visa, international transport, and insurance. Preserve the calculation and explain the exclusions. Everyday living costs stay beneath the main expense figures and their duration note.

Hitchhikes prioritizes total kilometers and rides taken, followed by kilometers and rides per road day. Road-day averages use days on the road, not the full travel duration; omit the average across all recorded days. Show total waiting time when waiting data exists, including a genuine zero. When waiting data is absent, place the rides-per-road-day figure in its position with the label below the number. Preserve longest, average, and shortest ride distances and available waiting-time comparisons. The Rides, Distance, and Waiting controls select hourly bar charts using real data; omit Waiting when waiting data is absent.

Country overviews identify the country, continent, and region together. Do not repeat the region in Country facts. “Visited on” identifies the recorded trips associated with the country; support multiple trips and long names without hiding them.

Country facts includes neighboring countries after the independence information. Neighboring countries link to their own country pages, show their names and explicit visited status, and distinguish countries with no land borders. Give the travel map sufficient space even when a country has few or no neighbors; its usefulness must not depend on the size of the neighboring-country list.

Places visited offers separate Cities and States views with counts, alphabetical letter groups, and compact wrapping chips within each group. Support both short lists and large collections such as Spain, keyboard navigation between the views, and explicit empty states. Show recorded states even when no cities have been recorded.

Some legacy state entries have no name and use a province label instead of a standard map code. Preserve their available labels in the place index; send only supported state codes to the map. Do not fabricate missing geographic mappings.

## Brand Commitments

The user wants these sections to blend travel-journal warmth with practical dashboard clarity. The statistics sections share navy headings, teal figures, restrained borders and dividers, clear labels, and responsive layouts. Supporting walking and hitchhiking metrics use meaningful icons and consistent number and label styling.

The country overview follows the same restrained visual language as the statistics. Country facts, Your travels, Places visited, Days & Nights, Hitchhikes, and Expenses are peer section titles with consistent, lighter emphasis. Keep that lighter treatment isolated to these titles; preserve the existing emphasis of country names, metric values, supporting headings, and controls.

The current main country flag uses the round asset, following the user's comparison request; neighboring flags also remain round. The main flag preserves its proportions and follows the height of the country-name and region stack. “Visited on” and its wrapping trip chips share a horizontal row at the bottom right of the desktop header and move beneath the country identity on mobile.

## Evidence on Hand

Existing country and trip pages, real travel statistics, accommodation categories, unusual sleeping-place notes, and expense category totals. France and Cambodia (KHM) provided populated examples during design review. Mockups set the visual direction; their illustrative chart bars are not product data.

Germany provided the nine-neighbor layout example; Japan covered the no-land-borders case. France's three recorded trips and Spain's eight trips and 119 visited places were used to evaluate wrapping and large lists. Illustrative extra trip chips in earlier mockups are not recorded visits.

## Product Principles

- Make the meaning and averaging basis of spending figures explicit.
- Prioritize duration and stays in Days & Nights.
- Present total cost and daily average before secondary everyday spending.
- Preserve personal travel details alongside readable comparisons.
- Make unavailable data distinct from a genuine zero.
- Keep hitchhiking road-day averages separate from calendar or recorded-day averages.
- Keep country identity, geographic reference facts, and personal travel records clearly understandable without duplicating information.
- Preserve map readability and access to long trip and place lists across desktop and mobile.
