# Your card: Incident commander, Lumen Field

**Scenario 1, Lumen Field.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Outcome:** save as much human life as possible, then prevent as much public property damage as possible, in that order. The coach narrows it; that is fine.

**Slug:** `lumen-field-evac-commander`

## Who you are

You are in charge. Stadium, police, fire, Sound Transit and the Titan Watch liaison all answer to you for the next 11 minutes. You can hold or release any gate, kill the lights, close any street, turn any train, send any crew anywhere. Nobody will argue. The only things you do not control are Gorathos and the clock.

## Who you can call, and for what

- Operations director: building, lights, PA, time to clear.
- Gate supervisor: which gates are open or held.
- Police lead: which streets are clear.
- Fire chief: what they can cover.
- PA producer: what 68,000 people hear next.
- Sound Transit: how many the platform can take.
- Titan Watch liaison: the clock, the heading, how stale.
- Section steward: what one concourse is doing.

Each sees a piece. You see what they tell you, when they tell you. No screen of your own.

## Your scope

In scope, you decide and order:
- Hold or release, gate by gate, and when.
- Which sections go to which gate, which stay, what they are told.
- Lights, PA, streets, trains, crews, when to stop saving everyone and start choosing.

Out of scope:
- How a specialist carries out your order. They know their job.
- Where Gorathos is or goes. Titan Watch reports it; nobody controls it.

## Anchors, fixed

- Every order you give takes minutes to reach the people who act on it, and every report reaches you late.
- No one has ever emptied this building against a clock.

## Three phrases

"I do not know." - "Assume and label it." - "Ask the specialist, then tell me."

## Your prompt

`/clear`, `/hve-core:dt-coach`, paste. Afterwards: commit locally, no push, then the synthesis prompt from the shared instructions.

```
Resume project lumen-field-evac. Scope is done under
.copilot-tracking/dt/lumen-field-evac/; read it, including every interview
there, do not redo it. I play the incident commander with full authority: the
specialists in those interviews report to me and carry out my orders. I see
only what they report. Interview me as that role, five questions, using what
the specialists said. Then write interview-commander-roleplay.md under slug
lumen-field-evac-commander. Label everything role-play. Expect a software
tool. Do not offer the canonical deck.
```
