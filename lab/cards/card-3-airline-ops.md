# Card 3: Airline operations controller

**Scenario 3: forty aircraft on approach.** Vespyra crosses the Sea-Tac approach corridor in 19 minutes. Monster facts are in `.copilot-tracking/dt/seatac-ground-stop/world-rules.md`. Do not invent them. Human facts are yours: invent them and say "assume and label it".

**Your duty on this card:** RAI driver. In section 2 you run the Responsible AI planner in a second terminal.

**Outcome you are judged on:** every aircraft on the ground somewhere before Vespyra crosses the outer marker.

**Slug:** `seatac-ground-stop-airline-ops`

## What you can see

- Fuel on board, crew duty time remaining, and passenger count for every aircraft in your own fleet, from the operations system.
- Which divert fields your airline has handling agreements with.
- A phone to each of your captains, one at a time, through dispatch.

## What you cannot see

- Any aircraft that is not yours. There are six airlines in the forty.
- Radar. You know where your aircraft were at the last position report.
- Vespyra, Titan Watch, or the tower frequency.

## Anchors, fixed

- Your fleet is 14 of the 40 aircraft.
- At least two of yours cannot reach Portland on the fuel they have. Which two is yours to decide.

## Three phrases

- "I do not know."
- "Assume and label it."
- "That is not my call. Ask approach." (or the tower, or the other airlines)

## Your prompt

`/clear`, then `/hve-core:dt-coach`, then paste:

```
Resume project seatac-ground-stop. Scope is done under
.copilot-tracking/dt/seatac-ground-stop/; read it, do not redo it. I play an
airline operations controller with 14 of the 40 aircraft. Interview me as that
role, five questions, then write interview-airline-ops-roleplay.md under slug
seatac-ground-stop-airline-ops. Label everything role-play. Expect a software
tool. Do not offer the canonical deck.
```

## After your interview

1. `git checkout -b <cohort>/airline-ops`, commit, push, open a pull request with base `team/<cohort>`, never `main`.
2. Open a second terminal in the repo root for section 2.
