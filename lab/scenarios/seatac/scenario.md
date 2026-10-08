# Scenario 3: Forty aircraft on approach

**Slug:** `seatac-ground-stop` - **Repo:** github.com/joelcapgemini/titan-watch-seatac

## The kaiju, in thirty seconds

- **Vespyra.** Airborne, 98 m, 62 km/h, faster into storms. Heading for Bellevue through the Sea-Tac approach corridor. Does not turn for aircraft. Does not stop. Cannot be stopped.
- **19 minutes** until it crosses the outer marker for runways 16L, 16C, 16R. Straight-line estimate from Titan Watch, refreshed every 30 seconds. Usually runs early.
- **Anything within 2 km of its track is lost.** Wake and debris, not intent.
- **Who sees it.** Titan Watch sees where it is, every 30 seconds. Radar sees a blip. Pilots see it inside 15 km in daylight. Nobody sees what it does next. That gap is the scenario.

Forty aircraft are inside approach airspace. Land them onto runways in its path, or divert them with fuel some do not have.

## Outcome, same for every scenario and every role

Save as much human life as possible, then prevent as much public property damage as possible, in that order. A software tool is expected to come out of this.

The coach interviews every role against this, narrows it to this clock and this landmark, and restates it after synthesis. The original stays in the scope file beside the restatement.

## Cards and duties

| Card | Role | Duty |
|------|------|------|
| 1 | Airport duty manager, Port of Seattle | Lead: merges, synthesis, RPI |
| 2 | TRACON approach controller | Security driver |
| 3 | Airline operations controller | RAI driver |
| 4 | Titan Watch liaison at Sea-Tac | Reviewer |

Three people: card 1 takes card 4's duty. Two people: cards 1 and 2. Unassigned cards have a ready interview in `lab/scenarios/seatac/fallback/`.

**Already done, do not redo:** scope, stakeholder map, assumptions, world rules, three interviews, security scoping answers, all under `.copilot-tracking/dt/seatac-ground-stop/`. **Out of scope for everyone:** engaging Vespyra, terminal evacuation, anything after it passes.
