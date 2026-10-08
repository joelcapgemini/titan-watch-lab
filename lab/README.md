# Kaiju Lab, compressed: Scenario 3, Sea-Tac

One team of 2 to 4. Three sections, about 25, 20 and 25 minutes. Everyone touches discovery, security, Responsible AI and the research-plan-implement loop. Nobody finishes any of them. That is the point.

This fork commits `.copilot-tracking/` on purpose so the team shares artifacts through pull requests. A real project keeps it ignored.

## Cards and duties

| Card | Role | Duty |
|------|------|------|
| 1 | Airport duty manager | Lead: merges, synthesis, RPI |
| 2 | TRACON approach controller | Security driver |
| 3 | Airline operations controller | RAI driver |
| 4 | Titan Watch liaison | Reviewer: reads files, records gaps |

Three people: card 1 takes card 4's duty. Two people: cards 1 and 2; card 1 runs RAI after security is fired. Unassigned cards have a ready interview in `lab/fallback/`.

## Rules

- Monster facts come from `world-rules.md` and `data/`. Never invent them.
- Human facts are yours. Invent them in role, and label them.
- "I do not know" and "assume and label it" are good answers.
- Approve every permission prompt by hand. Never auto-approve.
- Nothing real goes in the workspace. Push only to this repo.

---pagebreak---

# Before the session

Do these the week before. Blocked on any of them, tell the facilitator before the day.

1. Claude Code installed with the hve-core plugin. `/plugin` lists it; typing `/hve-core:` shows commands.
2. Node 22. In the repo: `npm install`, then `npm run dev`. Four kaiju visible on the map; the roster shows six.
3. `git push` works from your terminal to this repo. Prove it with a scratch branch.
4. Read your card. One card per person.
5. Pick a reasoning model by hand. Automatic selection gives shallow coaching.

On the day, before typing:

- Open Claude Code **in this repo folder**, not a parent. Run `pwd` and check. An agent writes wherever it is.
- `/clear` at the start of every section. A prompt typed into the wrong agent produces confident nonsense.
- Open `.copilot-tracking/` in your file explorer. Watch files appear. That folder is what gets reviewed, not your chat.

---pagebreak---

# Section 1: Discovery

**Goal.** Four role-play interviews, one each, merged into one folder. Then one synthesis that produces a PRD, a technology-neutral diagram and an Azure overlay.

**Everyone.** `/clear`, then `/hve-core:dt-coach`, then paste the prompt on your card. The coach reads the shared scope and asks five questions. Answer from inside your "can see" window. Outside it, say "I do not know" or "that is not my call, ask X". For fictional detail, "assume and label it". When the coach writes your interview file, read it once.

Then: `git checkout -b <your-role>`, commit, push, open a pull request.

**Lead.** Merge all pull requests. Fewer than four people: copy each unassigned card's folder from `lab/fallback/` into `.copilot-tracking/dt/` first. `git pull`. Then `/clear`, `/hve-core:dt-coach`, and:

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

**Everyone else, while it runs.** Read the three pre-seeded interviews. Find the one gap all three describe from different sides.

**Done when.** PRD, diagram and overlay exist. Each person can name one coach question they did not expect.

**If.** Coach restarts scope: tell it "scope is done, read coaching-state.md". Coach declares no software needed: say "a software tool is expected, continue". Coach offers the canonical deck: "no, do not ask again".

---pagebreak---

# Section 2: Security and Responsible AI

**Goal.** A severity-ranked threat model against the team's PRD, and a Responsible AI assessment of the app's Last Stand decision. Two terminals, two drivers, in parallel.

**Everyone, first.** Write three security findings you predict the planner will raise. Paper. Keep it.

**Card 2, security.** `/clear`, then `/hve-core:security-plan-from-prd`, then:

```
Use the security planner to plan the production security for this solution.
PRD and architecture are under .copilot-tracking/dt/seatac-ground-stop/. Scoping
answers are in security-scoping-answers.md in the same folder; treat every row
as answered and labelled, do not ask them again. Threat-model the boundaries,
map controls to OWASP, NIST and CIS, produce a backlog. Ask me only about severe
or blocking issues. Run all phases without stopping. Prioritise by severity.
Commit only, never push.
```

Approve prompts as they come. Allowed: it answers its own scoping. Not allowed: "assume I confirm everything". When done, ask for the plan summary by severity, counts per level, Critical items one line each, and its recommended next planner. Compare the Critical list with the paper predictions.

**Card 3, Responsible AI.** `/clear`, then `/hve-core:rai-capture`, then:

```
Run an RAI assessment on the single-save decision: the disaster-recovery AI in
this app's Last Stand scene that recommends which one of two cities to save
when only one can be saved. Today it outputs a single verdict with no
confidence, no explanation and no audit trail, and a commander approves it
under time pressure. Assess it against NIST AI RMF and treat the autonomous
life-safety decision as the central risk. Use project name single-save-decision.
Imagine the scoping answers, label them, run to completion unless blocking.
```

Read the two opening observations before replying. Do not argue the risk down; "it is only a game" is cheating. When done, read the go/no-go and the minimum conditions.

**Done when.** Both summaries exist. Team can name one Critical threat nobody predicted and one RAI minimum condition an engineer would have skipped.

---pagebreak---

# Section 3: Research, Plan, Implement

**Goal.** Take the Last Stand coin flip to a governed feature. Research and plan are pre-seeded from a facilitator run under `.copilot-tracking/research/`, `plans/` and `reviews/plans/`. The team starts at the plan gate, which is the human decision in this loop.

**Card 4, read aloud.** Open `.copilot-tracking/plans/2026-10-07/single-save-decision-governance-plan.md`. Read the executive summary and the three agent proposals PD1 to PD3 under "Planning Decisions and Feedback".

**Team, decide.** Each proposal: accept, reject, or accept with a condition. The usual argument is PD2, whether a commander must give a reason when overriding the recommendation. Decide it.

**Card 1, amend the file.** Under each PD row, change the status and add one line of rationale. If a decision adds behaviour, add a functional requirement and a test case. Save. Correct the artifact, not the chat.

**Card 1, implement.** `/clear`, `/hve-core:rpi-agent`, then:

```
Resume task single-save-decision-governance at the plan gate. The plan file has
been amended by the team; re-read it, then implement Story 1. Validation is the
existing test, lint and build scripts. No backend, no tracker, no cloud tenant:
mock or defer and log the gap. Keep tracking paths out of code and commits.
```

Approve edits as they come. It implements before you approved? Cancel, restart from the plan file.

**Card 1, review.** When implement stops: `/hve-core:rpi-review`. Read the verdict. Findings route to the phase that owns them, not to a patch.

**If time runs out.** Implement and review are homework. Bring the verdict to the next session.

**Done when.** Plan file carries the team's decisions. Implement has started or finished. Review verdict read, or scheduled.

---pagebreak---

# Show-and-tell and close

Three minutes per team. Four items, one sentence each.

1. One coach question nobody expected.
2. One Critical threat nobody predicted.
3. One plan amendment and why.
4. The review verdict, or where implement stopped.

Room names gaps, not compliments.

**Closing questions.**

- Which finding would your team have missed without the planner?
- The review found zero defects and still refused acceptance. Would you have shipped?
- What broke today, and would it break on a client machine?

**Afterwards.** Commit your branch. Code and tracking artifacts both, in this repo only. The agent writes the commit message. Never push anywhere else.
