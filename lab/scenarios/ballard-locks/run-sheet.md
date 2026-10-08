# How to proceed: Ballard Locks

Order of work, with every prompt filled in for this scenario. Full detail is in the shared instructions.

## Lab 1: Discovery

1. `/clear`, then `/hve-core:dt-coach`. It lists the projects it can resume. Pick yours, the one named on page 1. Then type: `I am the incident commander. Start the interview.` If no list appears, type `resume project <name on page 1>` first.

2. Answer five questions as the commander. Read your interview file once.
3. Same session, paste:

```
Project ballard-locks-alert. Read the shared scope under
.copilot-tracking/dt/ballard-locks-alert/, every interview there, and my
interview under .copilot-tracking/dt/ballard-locks-alert-commander/. Restate the
outcome in light of the interviews, keeping the original beside it. Summarise
the problem as if hearing it for the first time. List what you still need
before a PRD. Then draft the PRD with non-functional requirements, close gaps
with labelled assumptions, and state what it rests on. Then a
technology-neutral diagram as Mermaid. Then an opinionated Azure overlay with
the minimum services, rejected alternatives recorded, and a latency budget.
Write everything under .copilot-tracking/dt/ballard-locks-alert/. Run without
stopping. Label all interviews role-play.
```

4. PRD, diagram and overlay land under `dt/ballard-locks-alert/`.

---pagebreak---

## Lab 2: Security and Responsible AI

Write three predicted security findings on paper first. Two terminals.

5. Terminal 1: `/clear`, then `/hve-core:security-planner`. Paste:

```
Use the security planner to plan the production security for this solution.
PRD and architecture are under .copilot-tracking/dt/ballard-locks-alert/.
Scoping answers are in security-scoping-answers.md in the same folder; treat
every row as answered and labelled, do not ask them again. Threat-model the
boundaries, map controls to OWASP, NIST and CIS, produce a backlog. Ask me only
about severe or blocking issues. Run all phases without stopping. Prioritise by
severity. Do not commit or push.
```

6. Terminal 2: `/clear`, then `/hve-core:rai-planner-agent`. Paste:

```
Run an RAI assessment on the single-save decision: the disaster-recovery AI in
this app's Last Stand scene that recommends which one of two cities to save
when only one can be saved. Today it outputs a single verdict with no
confidence, no explanation and no audit trail, and a commander approves it
under time pressure. Assess it against NIST AI RMF and treat the autonomous
life-safety decision as the central risk. Use project name single-save-decision.
Imagine the scoping answers, label them, run to completion unless blocking.
```

7. When the security planner finishes: "Plan summary by severity: counts per level, Critical items one line each, recommended next planner." Compare with your paper. Read the RAI go/no-go.

## Lab 3: Research, Plan, Implement

8. Open your PRD under `dt/ballard-locks-alert/`. Pick one functional requirement the app could carry. One screen, one rule, one feed.
9. `/clear`, then `/hve-core:rpi-agent`. Ask: "What do you need from me to create an RPI plan?" Then paste, filled in:

```
Goal: implement <requirement, one sentence> from the PRD at
.copilot-tracking/dt/ballard-locks-alert/<prd file>.
Scope: <one component or module>. Nothing else.
Acceptance criteria: <two or three testable lines>.
Constraints: no backend, no tracker, no cloud tenant; mock or defer and log
the gap. No tracking paths in code or commits.
Validation: the existing test, lint and build scripts.
Context: the PRD and the Azure overlay in the same folder.
Mode: research, stop for my review; plan, stop for my approval.
```

10. Research stops: read it, fix the file if wrong, then `/hve-core:rpi-plan`.
11. Plan stops: amend one item in the plan file, tell the agent "plan amended in the file".
12. Homework: `/hve-core:rpi-implement`, then `/hve-core:rpi-review`.
