# Your card: Incident commander, Sea-Tac

**Scenario 3, Sea-Tac.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Outcome:** save as much human life as possible, then prevent as much public property damage as possible, in that order. The coach narrows it; that is fine.

**Slug:** `seatac-ground-stop-commander`

## Who you are

Every specialist reports to you; nobody formally appointed you. You make the call none of them owns. You decide. They act.

## Who you can call, and for what

- Tower: what is on final, landing clearances.
- Approach: where every aircraft is, sequencing, go-arounds.
- Duty manager: runways, ground crews, how many the airport can take.
- Airline ops: fuel and crew limits, their fleet only.
- Fire and rescue: what they can cover.
- Titan Watch liaison: the clock, and how stale it is.
- FAA command centre: a national ground stop, slowly.
- Portland: divert capacity.

Each sees a piece. You see what they tell you, when they tell you.

**You cannot see:** any screen of your own, or anything not yet reported.

## Your scope

In scope, you decide:
- Whether to order a ground stop, and when.
- Which aircraft land here and which go elsewhere, when the specialists disagree.
- When to stop trying to save everything and start choosing.

Out of scope, you hand off:
- How a runway is cleared, how an aircraft is sequenced, which captain is called. The specialists.
- Where Vespyra is. Titan Watch.

## Anchors, fixed

- Nobody has written down that you have this authority. Three agencies each think the call is theirs.
- Every report reaches you through at least one other person, late.

## Three phrases

"I do not know." - "Assume and label it." - "That is not my call. Ask the specialist."

## Your prompt

`/clear`, then `/hve-core:dt-coach`, then paste:

```
Resume project seatac-ground-stop. Scope is done under
.copilot-tracking/dt/seatac-ground-stop/; read it, including every interview
there, do not redo it. I play the incident commander: the specialists in those
interviews report to me, I see only what they report, I decide and they act.
Interview me as that role, five questions, using what the specialists said.
Then write interview-commander-roleplay.md under slug
seatac-ground-stop-commander. Label everything role-play. Expect a software
tool. Do not offer the canonical deck.
```

## After your interview

Commit locally. Do not push. Then run the synthesis prompt from the shared instructions, Section 1.
