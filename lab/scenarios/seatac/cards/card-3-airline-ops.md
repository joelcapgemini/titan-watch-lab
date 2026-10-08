# Card 3: Airline operations controller

**Scenario 3, Sea-Tac.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Your duty on this card:** RAI driver. In section 2 you run the Responsible AI planner in a second terminal.

**Outcome:** save as much human life as possible, then prevent as much public property damage as possible, in that order. The coach narrows it; that is fine.

**Slug:** `seatac-ground-stop-airline-ops`

## What you can see

- Fuel on board, crew duty time remaining, and passenger count for every aircraft in your own fleet, from the operations system.
- Which divert fields your airline has handling agreements with.
- A phone to each of your captains, one at a time, through dispatch.

## What you cannot see

- Any aircraft that is not yours. There are six airlines in the forty.
- Radar. You know where your aircraft were at the last position report.
- Vespyra, Titan Watch, or the tower frequency.

## Your scope

In scope, you decide:
- Which of your 14 aircraft can divert, and to where, on fuel and crew limits.
- What your captains are told, through dispatch.
- Whether to declare a fuel or medical priority for one of yours.

Out of scope, you hand off:
- Any aircraft that is not yours. The other five airlines.
- Sequencing and headings. Approach.
- Whether a divert is ordered at all. FAA command centre.

## Anchors, fixed

- Your fleet is 14 of the 40 aircraft.
- At least two of yours cannot reach Portland on the fuel they have. Which two is yours to decide.

## Three phrases

"I do not know." - "Assume and label it." - "That is not my call. Ask approach." (or the tower, or the other airlines).

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
