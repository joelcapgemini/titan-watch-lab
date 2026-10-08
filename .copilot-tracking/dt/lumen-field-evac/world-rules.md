# World rules: Scenario 1, sixty-eight thousand at Lumen Field

Fixed facts for this scenario. Do not invent monster facts. Human facts (how your organisation works, what you would do, what breaks) are yours to invent and label.

## The kaiju

| Fact | Value | Source |
|------|-------|--------|
| Codename | Gorathos | `data/monsters/gorathos.json` |
| Archetype | Abyssal Colossus, walks ashore | `data/monsters/gorathos.json` |
| Size | 142 m, 88,000 t | `data/monsters/gorathos.json` |
| Speed | 34.5 km/h, steady, does not sprint | `data/monsters/gorathos.json` |
| Declared target | Seattle, downtown | `data/monsters/gorathos.json`, `targetPos` |
| Current status | Cataclysm, landfall | Titan Watch threat board |
| Last position | Elliott Bay, surfaced, first ping 47.660 N 122.470 W | `data/sensor-grid.txt`, first line |
| Path | Straight line from the last ping to the central seawall, then south-east through Pioneer Square into SoDo. Lumen Field sits inside that corridor | Lore |

## Behaviour

- Gorathos comes ashore slowly. Nothing in this scenario stops it or turns it back. Anything it walks through is lost.
- It is drawn toward dense noise and light. A sold-out stadium under floodlights is the loudest and brightest thing in the city tonight. Whether going dark and quiet changes its path is not known to anyone in this scenario.
- It does not pursue individuals. A person in the open is at risk only by being where it walks.
- It is visible from the waterfront once it surfaces. Titan Watch's sensor grid tracks it separately. Fans' phones will see it before any official channel does.

## The clock

- 11 minutes from the scenario start until Gorathos reaches the seawall at Alaskan Way.
- "Seawall" is Titan Watch's phrase. Nobody has yet confirmed whether the stadium is at risk when Gorathos reaches the seawall, or two minutes later when it reaches the stadium, or not at all if it bends north toward downtown.
- Titan Watch updates its track estimate every 30 seconds. The estimate is straight-line and does not model the pull of noise and light.

## Sensing, by source

| Source | Sees | Does not see | Cadence |
|--------|------|--------------|---------|
| Titan Watch sensor grid | Position, heading, speed | Intent, where it turns | Every 30 s |
| Stadium CCTV and gate counters | Concourses, gates, bowl | The street beyond the gate line | Continuous |
| Police street cameras and officers | Streets, intersections, crowd on the ground | Inside the stadium | On report |
| Sound Transit control | Platforms and trains | Anything above ground beyond the station | Continuous |
| Fans' phones | Everything, unverified | Nothing, and nothing is confirmed | Faster than any of the above |

No single source sees both where Gorathos is and which gate is safe to open.

## Hard choice

Empty a sold-out stadium into streets that face the kaiju, or hold 68,000 people in a building never built to take a hit.

## Not in this scenario

- Weapons, interception, engagement of Gorathos.
- Downtown and waterfront evacuation beyond the stadium district.
- Anything after Gorathos has passed.
