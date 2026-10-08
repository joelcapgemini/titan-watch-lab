# World rules: Scenario 2, the bridge is floating

Fixed facts for this scenario. Do not invent monster facts. Human facts (how your organisation works, what you would do, what breaks) are yours to invent and label.

## The kaiju

| Fact | Value | Source |
|------|-------|--------|
| Codename | Terrakon | `data/monsters/terrakon.json` |
| Archetype | Tectonic Behemoth, ground-walking | `data/monsters/terrakon.json` |
| Size | 120 m, 67,000 t | `data/monsters/terrakon.json` |
| Speed | 22.5 km/h sustained, faster near shore | `data/monsters/terrakon.json`; shore burst is lore |
| Declared target | Mercer Island | `data/monsters/terrakon.json` |
| Current status | Elevated, surfaced | `src/mock/leviathans.ts` roster entry |
| Path | From the south-west across the city into Lake Washington, then along the lake bed toward the island. The I-90 floating span is in the way. It does not go around | Lore |

## Behaviour

- Terrakon walks. In the lake it walks the bed with its upper body above water; it does not swim and does not submerge. Every footfall sends a tremor through the ground and a pressure wave through the water.
- It does not attack the bridge deliberately. The span is in its path and it goes through. Anchor cables and pontoons are loaded by its wake before it arrives and by contact when it does.
- It accelerates near shore. Nobody in this scenario can say by how much.
- It does not stop, feed or turn in this scenario. It transits to the island.

## The clock

- 26 minutes from the scenario start until Terrakon reaches the "anchor line". That is Titan Watch's phrase.
- Nobody has yet confirmed whether the anchor line means the bridge, or the island shoreline that is the declared target, or something else.
- Titan Watch updates its track estimate every 30 seconds from satellite. The estimate is straight-line and does not model the shore burst.

## Sensing, by source

| Source | Sees | Does not see | Cadence |
|--------|------|--------------|---------|
| Titan Watch satellite | Position, heading, speed | Intent, what the bridge is doing | Every 30 s |
| Titan Watch field observers | Behaviour: posture, pace changes, turns | Position better than about a kilometre | On report |
| WSDOT bridge instrumentation | Anchor strain, pontoon tilt, wind and wave | Terrakon, the cause of the load | Continuous, cadence unknown |
| WSDOT cameras and loop detectors | Vehicle flow at the ends and mid-span, with gaps | A count of people, stuck vehicles | Continuous |
| Drivers on the span | Brake lights ahead | Why | Never told |

No single source sees both where Terrakon is and what the bridge can take.

## Hard choice

Clear the bridge and strand Mercer Island, or keep it open and gamble 4,000 vehicles on a cable.

## Not in this scenario

- Weapons, interception, engagement of Terrakon.
- Island shelter operations after the island has been told.
- Rebuilding the span.
