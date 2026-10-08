# Security scoping answers: ballard-locks-alert

Pre-seeded answers for the security planner so it does not spend turns asking. Every answer is a facilitator assumption. Point the planner at this file and tell it to treat each row as answered and labelled.

| Question the planner asks | Answer | Label |
|---------------------------|--------|-------|
| Hosting | Azure, assume Government cloud, single region, manual fallback is the recovery plan | Assumed |
| Feed trust | Titan Watch sonar returns, Army Corps lock sensor readings and surface sighting reports arrive over partner networks the city does not control. Assume unauthenticated today. A spoofed return that raises confidence and triggers a three-city alert, or a suppressed return that keeps the gates open, is top severity | Assumed |
| Sign-in | City of Seattle Entra ID for emergency management staff. Army Corps, Coast Guard, King County, Kirkland, Bellevue and Titan Watch users as guests in that tenant | Assumed |
| AI use | None on the decision path. No language models. Confidence scoring is a fixed rule set, not a model. RAI flag false | Assumed |
| Data sensitivity | Sonar returns, lock sensor readings and the Skarnyx track are sensitive. Sighting reports may carry a caller's name and location; treat as personal data, minimise | Assumed |
| Admin access | City of Seattle platform team, two named people, PIM for high-risk changes. No decision-making role holds admin | Assumed |
| Compliance | FEMA alert and warning policy and Army Corps operating rules unknown. Treat as unknown, record as a gate | Assumed |
| Partner accounts | Guest accounts with time-boxed access for the duration of an event | Assumed |
| Retention | Decision log 7 years, telemetry 90 days, sighting reports 30 days then anonymised | Assumed |
| Tracker | None. Produce the backlog in GitHub issue format, create nothing | Given |

## How to use

Prompt for the planner, after `/hve-core:security-planner`:

```
Use the security planner to plan the production security for this solution.
PRD and architecture are under .copilot-tracking/dt/ballard-locks-alert/. Scoping
answers are in security-scoping-answers.md in the same folder; treat every row
as answered and labelled, do not ask them again. Threat-model the boundaries,
map controls to OWASP, NIST and CIS, produce a backlog. Ask me only about severe
or blocking issues. Run all phases without stopping. Prioritise by severity.
Do not commit or push.
```
