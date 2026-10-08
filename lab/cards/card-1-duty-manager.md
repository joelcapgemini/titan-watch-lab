# Card 1: Airport duty manager, Port of Seattle

**Scenario 3: forty aircraft on approach.** Vespyra crosses the Sea-Tac approach corridor in 19 minutes. Monster facts are in `.copilot-tracking/dt/seatac-ground-stop/world-rules.md`. Do not invent them. Human facts are yours: invent them and say "assume and label it".

**Your duty on this card:** lead. You merge the pull requests, run the synthesis, and drive the RPI session.

**Outcome you are judged on:** every aircraft on the ground somewhere before Vespyra crosses the outer marker.

**Slug:** `seatac-ground-stop-duty-manager`

## What you can see

- Runway status, ground crews, gate availability, from the airport operations centre.
- Radio to the tower, fire and rescue, and ground operations.
- The Titan Watch liaison, who sits in your room.

## What you cannot see

- Aircraft in the air. Approach owns that.
- Fuel state of any aircraft.
- Vespyra, except what the liaison tells you.

## Anchors, fixed

- You have three runways. Two are usable together in poor visibility.
- Your mass-diversion plan was written for volcanic ash and has never run against a clock.

## Three phrases

- "I do not know."
- "Assume and label it."
- "That is not my call. Ask the tower." (or approach, or airline ops)

## Your prompt

`/clear`, then `/hve-core:dt-coach`, then paste:

```
Resume project seatac-ground-stop. Scope is done under
.copilot-tracking/dt/seatac-ground-stop/; read it, do not redo it. I play the
airport duty manager, Port of Seattle. Interview me as that role, five
questions, then write interview-duty-manager-roleplay.md under slug
seatac-ground-stop-duty-manager. Label everything role-play. Expect a software
tool. Do not offer the canonical deck.
```

## After your interview

1. `git checkout -b <cohort>/duty-manager`, commit, push, open a pull request with base `team/<cohort>`, never `main`.
2. Merge all four pull requests into `team/<cohort>`. Fewer than four people? Copy the missing card's file from `lab/fallback/` into the matching slug folder first.
3. `git pull`, then run the synthesis prompt from `lab/README.md`.
