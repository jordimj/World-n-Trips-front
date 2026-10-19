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

Trip pages reuse the country Hitchhikes card between Days & Nights and Expenses when rides are recorded in the trip’s inclusive date range. Totals span all countries within that range. Missing waiting times remain distinct from zero; hourly charts include only rides with recorded hours.

Hitchhikes prioritizes total kilometers and rides taken, followed by kilometers and rides per road day. Road-day averages use days on the road, not the full travel duration; omit the average across all recorded days. Show total waiting time when waiting data exists, including a genuine zero. When waiting data is absent, place the rides-per-road-day figure in its position with the label below the number. Preserve longest, average, and shortest ride distances and available waiting-time comparisons. The Rides, Distance, and Waiting controls select hourly bar charts using real data; omit Waiting when waiting data is absent.

Hitchhikes also presents Behind the rides: vehicle-type and driver-nationality breakdowns, compact open-air distance and share alongside the Behind the rides heading, and an expandable chronological ride log. Country and trip views share one calculation. Breakdowns count successful recorded segments; fractional ride counts preserve split journeys in ride totals and hourly ride charts. Failed attempts are counted explicitly beneath the road-day note, excluded from ride distance comparisons and ride totals, retained in waiting totals and hourly waiting charts, and labeled in the log. Days on the road include unsuccessful attempts. Unknown values remain distinct from zero. Ride logs include country labels across countries, available route, vehicle, nationality, waiting, open-air and note details; long logs reveal entries progressively. Normalize display labels without altering source records.

Country overviews identify the country, continent, and region together. Do not repeat the region in Country facts. “Visited on” identifies the recorded trips associated with the country; support multiple trips and long names without hiding them.

Country facts includes neighboring countries after the independence information. Neighboring countries link to their own country pages, show their names and explicit visited status, and distinguish countries with no land borders. Give the travel map sufficient space even when a country has few or no neighbors; its usefulness must not depend on the size of the neighboring-country list.

Places visited offers separate Cities and States views with counts, alphabetical letter groups, and compact wrapping chips within each group. Support both short lists and large collections such as Spain, keyboard navigation between the views, and explicit empty states. Show recorded states even when no cities have been recorded.

Some legacy state entries have no name and use a province label instead of a standard map code. Preserve their available labels in the place index; send only supported state codes to the map. Do not fabricate missing geographic mappings.

Trip journals present real entries in a compact chronological timeline, oldest first, with one expanded reading entry at a time. Search covers the full title and journal text without case or accent sensitivity and shows excerpts for body matches. Opening a search result preserves the search. Date jumping and previous/next entry navigation open the chosen entry and clear the search; entries collapse through their title control without a separate close button. Keep search and date controls sticky below the global toolbar, and preserve loading, retry, empty-journal creation, and no-search-results states.

Search highlights matching words in titles, excerpts, and expanded journal text while preserving original accents and formatting. Clearing the search removes highlights. Opening or navigating to an entry scrolls it smoothly into position. When filtering reduces the displayed entry count, including to zero, smoothly reposition the journal section without losing input focus; any space retained during the animation is temporary, not a permanent minimum height. Respect reduced-motion preferences for both behaviors.

## Brand Commitments

The trip detail hero spans the full viewport width with a single cover photograph. Its white title, optional summary, date range with a calendar icon, and existing telework or work-trip badge sit at the lower left over a dark gradient. The hero starts at the top of the viewport behind the toolbar, with a responsive desktop height between 700px and 900px (80% of the small viewport height) and a 600px minimum on mobile. The fixed toolbar buttons use transparent backgrounds with a light backdrop blur and subtly shadowed white icons to remain understated and readable over the photograph. This treatment applies only while the controls overlap the hero; scrolling past it restores the standard toolbar button appearance. Over the image, clicked and focused buttons remain transparent without a colored ripple; preserve a visible keyboard focus outline. Trip statistics and journals beneath it retain the existing content-width setting.

The user wants these sections to blend travel-journal warmth with practical dashboard clarity. The statistics sections share navy headings, teal figures, restrained borders and dividers, clear labels, and responsive layouts. Supporting walking and hitchhiking metrics use meaningful icons and consistent number and label styling.

Trip journals share the full content width, card surface, border, radius, and padding of Days & Nights and Expenses. They extend that navy-and-teal language with playful, slightly tilted date tiles along a dotted vertical rail without horizontal connectors. Keep expanded journal prose in Poppins with a comfortable reading width and line spacing. The card header contains only “Journals”: omit the duplicate entry count, date range, and introductory sentence. Show the entry count or search result count below the search controls. While those controls are sticky, an opaque surface covers the gap up to the toolbar so scrolling text cannot show above them.

The empty Journals card uses a compact notebook motif, “Your trip, in your words” copy, and “No entries yet. Add a moment, a day, or the whole story.” supporting text. “Add first entry” opens the inserter directly on the journal-writing step (step 2), skipping the data-type chooser. The toolbar’s general inserter still opens at the chooser, and closing the journal shortcut clears its initial-kind parameter. Use the same compact button sizing on desktop and mobile, with automatic height rather than stretching to fill the row. Keep the content horizontal on desktop and stack the action below the copy on mobile.

The country overview follows the same restrained visual language as the statistics. Country facts, Your travels, Places visited, Days & Nights, Hitchhikes, and Expenses are peer section titles with consistent, lighter emphasis. Keep that lighter treatment isolated to these titles; preserve the existing emphasis of country names, metric values, supporting headings, and controls.

The current main country flag uses the round asset, following the user's comparison request; neighboring flags also remain round. The main flag preserves its proportions and follows the height of the country-name and region stack. “Visited on” and its wrapping trip chips share a horizontal row at the bottom right of the desktop header and move beneath the country identity on mobile.

## Evidence on Hand

Existing country and trip pages, real travel statistics, accommodation categories, unusual sleeping-place notes, and expense category totals. France and Cambodia (KHM) provided populated examples during design review. Mockups set the visual direction; their illustrative chart bars are not product data.

Germany provided the nine-neighbor layout example; Japan covered the no-land-borders case. France's three recorded trips and Spain's eight trips and 119 visited places were used to evaluate wrapping and large lists. Illustrative extra trip chips in earlier mockups are not recorded visits.

Greek Honeymoon (trip 31) supplied 17 real entries for the journal timeline, search, and navigation review. First World Trip (trip 0) supplied a populated trip Hitchhikes card and the empty-journal state.

## Product Principles

- Make the meaning and averaging basis of spending figures explicit.
- Prioritize duration and stays in Days & Nights.
- Present total cost and daily average before secondary everyday spending.
- Preserve personal travel details alongside readable comparisons.
- Make unavailable data distinct from a genuine zero.
- Keep hitchhiking road-day averages separate from calendar or recorded-day averages.
- Keep country identity, geographic reference facts, and personal travel records clearly understandable without duplicating information.
- Preserve map readability and access to long trip and place lists across desktop and mobile.
