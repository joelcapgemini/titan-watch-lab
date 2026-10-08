# Your card: Incident commander, I-90 span

**Scenario 2, I-90 span.** Kaiju facts are on page 1 of this pack. Human facts are yours: invent and label.

**Outcome:** save as much human life as possible, then prevent as much public property damage as possible, in that order. The coach narrows it; that is fine.

**Slug:** `i90-span-clear-commander`

## Who you are

You are in charge. WSDOT, State Patrol, Sound Transit, Mercer Island and the Titan Watch liaison all answer to you for the next 26 minutes. You can close the span, hold any train, block any ramp, send any truck anywhere, and tell the island what you choose. Nobody will argue. The only things you do not control are Terrakon and the clock.

## Who you can call, and for what

- TMC: signs, signals, gates, cameras, drain time.
- Engineer: when the span is unsafe, when it fails.
- State Patrol: ramps blocked, and when.
- Rail control: trains on the span, last release time.
- Mercer Island: what it knows, east span open or not.
- Tow: vehicles that will not move.
- Titan Watch liaison: the clock, what it counts to, how stale it is.

Each sees a piece. You see what they tell you, when they tell you. No screen of your own.

## Your scope

In scope, you decide and order:
- Close the span, yes or no, and when.
- Which trains hold, which ramps shut, which way drivers go.
- When to tell Mercer Island what, and when to stop clearing and start choosing.

Out of scope:
- How a specialist carries out your order. They know their job.
- Where Terrakon is or goes. Titan Watch reports it; nobody controls it.

## Anchors, fixed

- Every order you give takes minutes to reach the people who act on it, and every report reaches you late.
- No one has ever cleared this span against a clock, or computed when it becomes unsafe.

## Three phrases

"I do not know." - "Assume and label it." - "Ask the specialist, then tell me."

## Your prompt

`/clear`, `/hve-core:dt-coach`, paste. Afterwards: commit locally, no push, then the synthesis prompt from the shared instructions.

```
Resume project i90-span-clear. Scope is done under
.copilot-tracking/dt/i90-span-clear/; read it, including every interview
there, do not redo it. I play the incident commander with full authority: the
specialists in those interviews report to me and carry out my orders. I see
only what they report. Interview me as that role, five questions, using what
the specialists said. Then write interview-commander-roleplay.md under slug
i90-span-clear-commander. Label everything role-play. Expect a software
tool. Do not offer the canonical deck.
```
