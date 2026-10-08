# Card 2: TRACON approach controller, Sea-Tac

**Scenario 3, Sea-Tac.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Your duty on this card:** security driver. In section 2 you run the security planner.

**Outcome you are judged on:** every aircraft on the ground somewhere before Vespyra crosses the outer marker.

**Slug:** `seatac-ground-stop-approach-controller`

## What you can see

- Radar returns for every aircraft in your airspace: position, altitude, speed, callsign.
- Voice from each cockpit, one at a time, on your frequency.
- A large erratic primary return that is not an aircraft.

## What you cannot see

- Fuel state. You ask each pilot and wait for the answer.
- Vespyra's projected track. Titan Watch owns that and you are not on their board.
- Runway surface or ground readiness.

## Your scope

In scope, you decide:
- Sequence, heading and altitude for every aircraft in approach airspace.
- Who goes around and who holds.
- Which aircraft are sent toward a divert field once a divert is ordered.

Out of scope, you hand off:
- Whether a ground stop or divert is ordered at all. FAA command centre.
- Whether an aircraft has the fuel for the divert you give it. Airline ops.
- Landing clearance on the runway. Tower.

## Anchors, fixed

- 40 aircraft in your airspace. 12 are on final and will land or go around regardless.
- A ground stop takes 4 minutes to reach every cockpit.

## Three phrases

"I do not know." - "Assume and label it." - "That is not my call. Ask airline ops." (or the tower, or Titan Watch).

## Your prompt

`/clear`, then `/hve-core:dt-coach`, then paste:

```
Resume project seatac-ground-stop. Scope is done under
.copilot-tracking/dt/seatac-ground-stop/; read it, do not redo it. I play the
TRACON approach controller. Interview me as that role, five questions, then
write interview-approach-controller-roleplay.md under slug
seatac-ground-stop-approach-controller. Label everything role-play. Expect a
software tool. Do not offer the canonical deck.
```

## After your interview

1. `git checkout -b <cohort>/approach-controller`, commit, push, open a pull request with base `team/<cohort>`, never `main`.
2. Write three security findings you predict the planner will raise. Paper. Keep it for section 2.
