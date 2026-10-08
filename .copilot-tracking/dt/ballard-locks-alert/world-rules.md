# World rules: Scenario 4, the locks

Fixed facts for this scenario. Do not invent monster facts. Human facts (how your organisation works, what you would do, what breaks) are yours to invent and label.

## The kaiju

| Fact | Value | Source |
|------|-------|--------|
| Codename | Skarnyx | `data/monsters/skarnyx.json` |
| Archetype | Brine Serpent, submerged | `data/monsters/skarnyx.json`, `submerged: true` |
| Size | 88 m, 29,000 t | `data/monsters/skarnyx.json` |
| Speed | 55 km/h, when it moves at all | `data/monsters/skarnyx.json`; "when it moves" is lore |
| Declared target | Seattle | `data/monsters/skarnyx.json` |
| Current status | Sensor grid only, submerged | `data/sensor-grid.txt`; every return with a negative `elev` is below the surface |
| Path | Puget Sound toward the Ballard Locks, the gate between salt water and the Ship Canal, Lake Union and Lake Washington | Lore |

## Behaviour

- Skarnyx is drawn to fresh water. It will try to pass the locks. Nobody in this scenario can say when.
- If it breaches the lock gates the lake level drops and salt water comes in. Lake Union and Lake Washington are lost as fresh water. That is the "lose the lakes" outcome.
- It can stay submerged for hours. It has not surfaced in this scenario and may not.
- Sonar returns are intermittent. A single return could be a whale, a submarine or Skarnyx. Nobody has a way to tell from one return.
- It does not attack people deliberately. People on a waterfront it crosses are hit by surge and debris.

## The clock

- There is no clock. The sensor-grid log shows a submerged track in Puget Sound and nothing has surfaced.
- Titan Watch reports a return when the grid gets one. The gap between returns is minutes, sometimes longer. The log in `data/sensor-grid.txt` ends with the track still below the surface.
- The last agreed position is outside the locks on the salt side. Anything closer is a guess.

## Sensing, by source

| Source | Sees | Does not see | Cadence |
|--------|------|--------------|---------|
| Titan Watch sensor grid | A submerged return with position and depth | What it is, where it is between returns | Intermittent |
| Lock gate sensors | Water level, gate strain, salt intrusion at the gate | Anything outside the chamber | Continuous |
| Surface sightings | Wake, disturbed water, a shape | Anything under the surface | On report |
| Fisheries and whale watch | What normally swims here, and when | Skarnyx | On request |
| Coast Guard and harbour patrol | Vessels, the surface of the Sound and the lake | Below the surface | On patrol |

No single source can say both that something is there and what it is.

## Hard choice

Raise a three-city alert, Seattle, Kirkland and Bellevue, on a sonar log alone, or wait for something to surface and lose the lakes.

## Not in this scenario

- Weapons, interception, engagement of Skarnyx.
- Lake Washington bridges and anything on the eastern shore beyond the waterfront.
- Anything after the gates are breached or Skarnyx turns back.
