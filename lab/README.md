# Kaiju Lab, compressed format: Scenario 3, Sea-Tac

Team repo for one group of 2 to 4 people. Three sections, about 25, 20 and 25 minutes. Everyone touches discovery, security, Responsible AI and the research-plan-implement loop. Nobody finishes any of them. That is the point.

This fork commits `.copilot-tracking/` on purpose so the team can share artifacts through pull requests. A real project keeps it ignored.

## Before the session

- Claude Code with the hve-core plugin. `/plugin` lists it; `/hve-core:` shows commands.
- Node 22. `npm install`, `npm run dev`, four kaiju visible on the map.
- `git push` works from your terminal to this repo. Test it on a scratch branch.
- Open Claude Code **in this folder**, not a parent. Run `pwd` and check.
- Read your card in `lab/cards/`. One card per person. Fewer than four people: leave a card unassigned; its interview is in `lab/fallback/`.
- A reasoning model, chosen by hand. Approve every permission prompt by hand. Never auto-approve. Never push to any other repo.

## Cards and duties

| Card | Role | Duty |
|------|------|------|
| 1 | Airport duty manager | Lead: merges, synthesis, RPI |
| 2 | TRACON approach controller | Security driver |
| 3 | Airline operations controller | RAI driver |
| 4 | Titan Watch liaison | Reviewer: reads files, records gaps |

Three people: card 1 absorbs card 4's duty. Two people: cards 1 and 2; card 1 runs RAI after security is fired.

## Section 1, discovery, 25 minutes

| Time | What |
|------|------|
| 0:00 to 0:10 | Each person: own Claude session, own slug, the prompt on your card, five questions. Answer from inside your "can see" window. "I do not know" and "assume and label it" are good answers. |
| 0:10 to 0:13 | Each person: branch, commit, push, pull request. Lead merges all. Everyone pulls. |
| 0:13 to 0:25 | Lead, one prompt below. Everyone else watches `.copilot-tracking/dt/` fill. |

Lead's synthesis prompt, after `/clear` and `/hve-core:dt-coach`:

```
Project seatac-ground-stop. Read the shared scope under
.copilot-tracking/dt/seatac-ground-stop/ and every interview under
.copilot-tracking/dt/seatac-ground-stop*/. Summarise the problem as if hearing
it for the first time. List what you still need before a PRD. Then draft the
PRD with non-functional requirements, close gaps with labelled assumptions, and
state what it rests on. Then a technology-neutral diagram as Mermaid. Then an
opinionated Azure overlay with the minimum services, rejected alternatives
recorded, and a latency budget. Write everything under
.copilot-tracking/dt/seatac-ground-stop/. Run without stopping. Label all
interviews role-play.
```

Checkpoint at 0:25: PRD, diagram and overlay exist. Each person names one coach question they did not expect.

## Section 2, security and Responsible AI, 20 minutes

Two terminals. Before anyone types, everyone writes three security findings they predict, on paper.

| Time | Card 2, terminal 1 | Card 3, terminal 2 |
|------|-------------------|-------------------|
| 0:00 | `/clear`, `/hve-core:security-plan-from-prd`, prompt from `security-scoping-answers.md` | `/clear`, `/hve-core:rai-capture`, prompt below |
| 0:02 to 0:15 | Approve prompts. It should not ask scoping questions; if it does, point it at the answers file | Read the two opening observations before replying. Do not argue the risk down |
| 0:15 | Ask: "Plan summary by severity, counts per level, Critical items one line each, recommended next planner" | Read the go/no-go and the minimum conditions |
| 0:18 | Compare the Critical list with the paper predictions | |

RAI prompt, same for every group:

```
Run an RAI assessment on the single-save decision: the disaster-recovery AI in
this app's Last Stand scene that recommends which one of two cities to save
when only one can be saved. Today it outputs a single verdict with no
confidence, no explanation and no audit trail, and a commander approves it
under time pressure. Assess it against NIST AI RMF and treat the autonomous
life-safety decision as the central risk. Use project name single-save-decision.
Imagine the scoping answers, label them, run to completion unless blocking.
```

## Section 3, research, plan, implement, 25 minutes

Research and plan are pre-seeded from a facilitator run under `.copilot-tracking/research/`, `.copilot-tracking/plans/` and `.copilot-tracking/reviews/plans/`. The group starts at the plan gate.

| Time | What |
|------|------|
| 0:00 to 0:08 | Card 4 reads the plan aloud: executive summary and the three proposals PD1 to PD3. Group decides each one. Card 1 edits the plan file: one line per decision under "Planning Decisions and Feedback", and any new requirement it implies. |
| 0:08 | Card 1: `/clear`, `/hve-core:rpi-agent`, then "Resume task single-save-decision-governance at the plan gate. The plan file has been amended; re-read it, then implement." |
| 0:08 to 0:22 | Implement runs. Approve edits. If it asks for a tracker, backend or tenant: "none exists, mock or defer, log the gap". |
| 0:22 | `/hve-core:rpi-review`. Read the verdict. |

If implement does not finish in the room, it is homework. Bring the review verdict to the next session.

## Show-and-tell, 3 minutes per group

1. One coach question nobody expected.
2. One Critical threat nobody predicted.
3. One plan amendment and why.
4. The review verdict, or where implement stopped.

Gaps, not compliments.

## Rules

- Monster facts come from `world-rules.md` and `data/`. Never invent them.
- Human facts are yours. Invent, and label.
- Nothing real goes in the workspace.
- Commit code and tracking artifacts to this repo only. Never push anywhere else.
