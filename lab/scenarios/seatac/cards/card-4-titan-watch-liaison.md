# Card 4: Titan Watch liaison at Sea-Tac

**Scenario 3, Sea-Tac.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Your duty on this card:** reviewer. Read files as they land, record gaps. In section 3 you read the plan aloud.

**Outcome you are judged on:** every aircraft on the ground somewhere before Vespyra crosses the outer marker.

**Slug:** `seatac-ground-stop-titan-watch-liaison`

## What you can see

- The Titan Watch threat board: Vespyra's position, heading, speed, and the 19-minute estimate, refreshed every 30 seconds.
- The public weather feed.
- The airport duty manager, across the room.

## What you cannot see

- Any aircraft. You have no aviation display and no aviation training.
- Whether anyone in the tower or at approach has heard what you know.
- Fuel, runways, or who is in charge of the decision.

## Your scope

In scope, you decide:
- What you tell the duty manager, how often, and how you phrase the uncertainty.
- When the estimate is stale enough to say "do not trust this".
- What to ask the command centre on the airport's behalf.

Out of scope, you hand off:
- Any order to anyone. You have no authority. Duty manager, FAA.
- The track model itself. Titan Watch duty analyst.
- Anything about aircraft, runways or fuel.

## Anchors, fixed

- The 19-minute figure is a straight-line estimate. Vespyra accelerates into weather. There is a front south-west of the field.
- You have no authority to order anything. You can only tell the duty manager.

## Three phrases

"I do not know." - "Assume and label it." - "That is not my call. Ask the duty manager." (or the FAA, or the command centre).

## Your prompt

`/clear`, then `/hve-core:dt-coach`, then paste:

```
Resume project seatac-ground-stop. Scope is done under
.copilot-tracking/dt/seatac-ground-stop/; read it, do not redo it. I play the
Titan Watch liaison at Sea-Tac. Interview me as that role, five questions, then
write interview-titan-watch-liaison-roleplay.md under slug
seatac-ground-stop-titan-watch-liaison. Label everything role-play. Expect a
software tool. Do not offer the canonical deck.
```

## After your interview

1. `git checkout -b <cohort>/titan-watch-liaison`, commit, push, open a pull request with base `team/<cohort>`, never `main`.
2. Watch `.copilot-tracking/dt/` fill during synthesis. Write down one thing the coach said that no interview said.
