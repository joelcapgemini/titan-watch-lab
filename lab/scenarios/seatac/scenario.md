# Scenario 3: Forty aircraft on approach

**Slug:** `seatac-ground-stop` - **Repo:** github.com/joelcapgemini/titan-watch-seatac

## The kaiju, in thirty seconds

- **Vespyra.** Airborne. 98 m long. Flies at 62 km/h, faster into storms.
- **Heading for Bellevue.** Crosses the Sea-Tac approach corridor on the way. Does not change course for aircraft. Does not stop.
- **19 minutes** until it crosses the outer marker for runways 16L, 16C, 16R. That number is a straight-line estimate from Titan Watch, refreshed every 30 seconds. It usually runs early.
- **Anything within 2 km of its track is lost.** Wake and debris, not intent.
- **Nobody can stop it.** No weapons, no interception in this scenario.

## Who sees what

| Source | Sees | Does not see | How often |
|--------|------|--------------|-----------|
| Titan Watch sensor grid | Position, heading, speed | Intent, weather response | Every 30 s |
| ATC primary radar | A large erratic blip | What it is, its altitude | Continuous |
| Pilots | Visual inside 15 km in daylight | Anything in cloud | On report |
| Public weather feed | Storm fronts | Vespyra | Every 10 min |

No single source sees both where it is and what it is about to do. That gap is the scenario.

## The hard choice

Land everything onto runways in its path, or divert forty aircraft with fuel some of them do not have.

## Outcome, same for every role

Every aircraft on the ground somewhere before Vespyra crosses the outer marker.

## Cards and duties

| Card | Role | Duty |
|------|------|------|
| 1 | Airport duty manager, Port of Seattle | Lead: merges, synthesis, RPI |
| 2 | TRACON approach controller | Security driver |
| 3 | Airline operations controller | RAI driver |
| 4 | Titan Watch liaison at Sea-Tac | Reviewer |

Three people: card 1 takes card 4's duty. Two people: cards 1 and 2. Unassigned cards have a ready interview in `lab/scenarios/seatac/fallback/`.

## Already done for you

Under `.copilot-tracking/dt/seatac-ground-stop/`: scope, stakeholder map, assumptions log, world rules, three finished interviews (FAA tower, airport fire chief, Titan Watch analyst), and the security scoping answers. Do not redo any of it. The coach reads it.

## Out of scope for everyone

Engaging Vespyra. Terminal evacuation. Anything after it has passed.
