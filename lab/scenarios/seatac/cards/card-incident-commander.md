# Your card: Incident commander, Sea-Tac

**Scenario 3, Sea-Tac.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Outcome:** save as much human life as possible, then prevent as much public property damage as possible, in that order. The coach narrows it; that is fine.

**Slug:** `seatac-ground-stop-commander`

## Who you are

You are in charge. Airport, FAA, airlines, fire and rescue and Titan Watch all answer to you for the next 19 minutes. You can order a ground stop, close a runway, divert any aircraft, hold any aircraft, send any crew anywhere. Nobody will argue. The only things you do not control are Vespyra and the clock.

## Who you can call, and for what

- Tower: what is on final, landing clearances.
- Approach: where every aircraft is, sequencing, go-arounds.
- Duty manager: runways, ground crews, how many the airport can take.
- Airline ops: fuel and crew limits, their fleet only.
- Fire and rescue: what they can cover.
- Titan Watch liaison: the clock, and how stale it is.
- FAA command centre: a national ground stop, slowly.
- Portland: divert capacity.

Each sees a piece. You see what they tell you, when they tell you. No screen of your own.

## Your scope

In scope, you decide and order:
- Ground stop, yes or no, and when.
- Which aircraft land here, which divert where, which hold.
- Runway use, crew staging, when to stop saving everything and start choosing.

Out of scope:
- How a specialist carries out your order. They know their job.
- Where Vespyra is or goes. Titan Watch reports it; nobody controls it.

## Anchors, fixed

- Every order you give takes minutes to reach the people who act on it, and every report reaches you late.
- No one has ever run this against a clock shorter than an hour.

## Three phrases

"I do not know." - "Assume and label it." - "Ask the specialist, then tell me."

## Your prompt

`/clear`, `/hve-core:dt-coach`, paste. Afterwards: commit locally, no push, then the synthesis prompt from the shared instructions.

```
Resume project seatac-ground-stop. Scope is done under
.copilot-tracking/dt/seatac-ground-stop/; read it, including every interview
there, do not redo it. I play the incident commander with full authority: the
specialists in those interviews report to me and carry out my orders. I see
only what they report. Interview me as that role, five questions, using what
the specialists said. Then write interview-commander-roleplay.md under slug
seatac-ground-stop-commander. Label everything role-play. Expect a software
tool. Do not offer the canonical deck.
```
