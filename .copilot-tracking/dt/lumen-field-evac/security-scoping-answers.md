# Security scoping answers: lumen-field-evac

Pre-seeded answers for the security planner so it does not spend turns asking. Every answer is a facilitator assumption. Point the planner at this file and tell it to treat each row as answered and labelled.

| Question the planner asks | Answer | Label |
|---------------------------|--------|-------|
| Hosting | Azure, assume Government cloud, single region, manual fallback (radio and runners) is the recovery plan | Assumed |
| Feed trust | Titan Watch track, stadium gate counters and police street status arrive over partner networks the stadium does not control. Assume unauthenticated today. A spoofed or replayed track that moves the deadline later, or a false gate state that marks a gate facing the kaiju as clear, is top severity | Assumed |
| Sign-in | Stadium operator Entra ID for stadium staff. Police, fire, Sound Transit and Titan Watch users as guests in that tenant | Assumed |
| AI use | None on the decision path. No language models. RAI flag false | Assumed |
| Data sensitivity | Gate states, crowd counts and the hold-or-release log are sensitive operational data. Gorathos track is sensitive. No fan personal data and no CCTV frames in the tool | Assumed |
| Admin access | Stadium operator platform team, two named people, PIM for high-risk changes. No decision-making role holds admin | Assumed |
| Compliance | City emergency management and venue life-safety policy unknown. Treat as unknown, record as a gate | Assumed |
| Partner accounts | Guest accounts with time-boxed access for the duration of an event | Assumed |
| Retention | Decision log 7 years, telemetry 90 days | Assumed |
| Tracker | None. Produce the backlog in GitHub issue format, create nothing | Given |

## How to use

Prompt for the planner, after `/hve-core:security-planner`:

```
Use the security planner to plan the production security for this solution.
PRD and architecture are under .copilot-tracking/dt/lumen-field-evac/. Scoping
answers are in security-scoping-answers.md in the same folder; treat every row
as answered and labelled, do not ask them again. Threat-model the boundaries,
map controls to OWASP, NIST and CIS, produce a backlog. Ask me only about severe
or blocking issues. Run all phases without stopping. Prioritise by severity.
Do not commit or push.
```
