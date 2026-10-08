# Scenario 3: Forty aircraft on approach

**Slug:** `seatac-ground-stop` - **Repo:** github.com/joelcapgemini/titan-watch-seatac

## The kaiju, in thirty seconds

- **Vespyra.** Airborne, 98 m, 62 km/h, faster into storms. Heading for Bellevue through the Sea-Tac approach corridor. Does not turn for aircraft. Does not stop. Cannot be stopped.
- **19 minutes** until it crosses the outer marker for runways 16L, 16C, 16R. Straight-line estimate from Titan Watch, refreshed every 30 seconds. Usually runs early.
- **Anything within 2 km of its track is lost.** Wake and debris, not intent.
- **Who sees it.** Titan Watch sees where it is, every 30 seconds. Radar sees a blip. Pilots see it inside 15 km in daylight. Nobody sees what it does next. That gap is the scenario.

Forty aircraft are inside approach airspace. Land them onto runways in its path, or divert them with fuel some do not have.

## Pick your outcome, two minutes, whole team

One outcome for the whole team. Every interview is done with it in mind. Pick one, or write your own if it still implies software.

| Tier | Outcome | What it does to the interviews |
|------|---------|-------------------------------|
| Heroic | All forty on the ground, nobody hurt, no runway lost | You will be hunting for capacity nobody has today |
| Pragmatic | Every aircraft on the ground somewhere before the outer marker. Wrong airport or off-field counts | You will be matching fuel to fields against the clock |
| Grim | You cannot save all forty. Decide which you lose, and make it a recorded decision, not an accident | You will be asking who owns the choice. Feeds straight into the Responsible AI lab |

Lead writes it into `.copilot-tracking/dt/seatac-ground-stop/scope-boundaries.md` under "Outcome", commits, pushes to `team/<cohort>`. Everyone pulls before their interview. A solution in disguise ("build a divert dashboard") gets sent back. No software in it ("pilots get a phone call") and the coach solves it on paper and stops.

## Cards and duties

| Card | Role | Duty |
|------|------|------|
| 1 | Airport duty manager, Port of Seattle | Lead: merges, synthesis, RPI |
| 2 | TRACON approach controller | Security driver |
| 3 | Airline operations controller | RAI driver |
| 4 | Titan Watch liaison at Sea-Tac | Reviewer |

Three people: card 1 takes card 4's duty. Two people: cards 1 and 2. Unassigned cards have a ready interview in `lab/scenarios/seatac/fallback/`.

**Already done, do not redo:** scope, stakeholder map, assumptions, world rules, three interviews, security scoping answers, all under `.copilot-tracking/dt/seatac-ground-stop/`. **Out of scope for everyone:** engaging Vespyra, terminal evacuation, anything after it passes.
