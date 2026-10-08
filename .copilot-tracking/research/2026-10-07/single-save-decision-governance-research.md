<!-- markdownlint-disable-file -->
# Task Research: single-save-decision-governance

| Field              | Value                                  |
|--------------------|----------------------------------------|
| Date               | 2026-10-07                             |
| Researcher / agent | rpi-research (RPI Agent, manual mode)  |
| Output mode        | convergence                            |

## Executive Summary

* Bottom line: Today the Last Stand scene is a timer-driven coin flip. It declares one city SAVED and the other SACRIFICED after 4.6 seconds, with no human step, no confidence, and no record. All four acceptance criteria can be met inside the browser with mocked data, a client-side decision gate, and a client-side hash-chained audit log. The work fits in one component, one new pure module, one CSS block, and their tests.
* Why this matters: The scene currently models exactly the failure the RAI plan calls the central risk (T-RAI-001): the system decides, and nobody confirms anything. Fixing the scene is a small, contained change with no backend.
* Research status: Complete. You confirmed all three design choices on 2026-10-07: one combined story, a score with its basis and range, and an in-memory SHA-256 log.
* Confidence and uncertainty: High for the code facts and the baseline. Medium for the design approach, because "confidence" and "audit" can only be mocked here. Real calibration, identity, and immutable storage are out of reach without a backend and are recorded as gaps.

## What You May Not Know

* There is no human confirmation today at all. The verdict appears on its own when a timer fires (C1). That is worse than the RAI scenario's rushed approval: the "approval" step is missing, not only rushed.
* The code comment on `chooseCityToSave()` says "Do not add fairness or explanation here; this is the mocked decision seam" (C1). Your brief explicitly asks to replace that seam, so the brief wins. The plan should rewrite the comment, not ignore it.
* Your own user research warns against a single blended confidence percentage. A data lead calls it "decorative precision" because it mixes model behavior, source agreement, and analyst judgment (C9). The acceptance criterion asks for a confidence score. The research supports showing it with what it measures and a range, not as a bare number.
* The "LOST" cost line (for example "318,000 LOST") states a death toll as if it were certain (C1, C3). It carries the same framing as the saved and sacrificed labels and should go with them.
* A browser-only audit log can be tamper-evident (a hash chain detects edits), but it cannot be immutable or tied to a real commander identity. Those parts must be recorded as deferred gaps, not claimed.

## Findings

### The decision path is a timer-driven coin flip with no human step

`LastStandScene` picks the "saved" city with `Math.random() < 0.5` at mount and on RE-RUN. A `setTimeout` of 4600 ms (0 ms under reduced motion) sets `resolved`, and the outcome renders by itself. There is no confirm action, no score, no reason, and no record. The only control is RE-RUN, which rolls again.

* Questions: Q1
* Evidence state: Evidence-backed finding
* Evidence: C1, C3
* Confidence and limits: High. Read directly from the component and its tests.

### Saved and sacrificed framing appears in five places

Removing the labels means touching more than two strings:

* Node labels `SAVED` and `SACRIFICED`, and the footer `SAVED X · SACRIFICED Y` (C1).
* The cost line `N LOST · 1 KAIJU LANDED · 1 REPELLED` (C1).
* Header `AI AGENT · SINGLE-SAVE DECISION`, subtitle `SAVE ONLY 1`, and the aria-label "mocked AI agent chooses one of two cities to save" (C1). These frame the AI as the decider.
* CSS state classes `protected` and `overrun`, and comments that name SAVED and SACRIFICED (C4). The class names are not user-visible, but the comments and reduced-motion note describe the old framing.
* Seven tests assert the old strings and the coin-flip behavior (C3). They must be rewritten, not deleted.

* Questions: Q3
* Evidence state: Evidence-backed finding
* Evidence: C1, C3, C4
* Confidence and limits: High. Grep across src found no other usages (C5).

### The scene is self-contained, so the change stays in scope

The scene takes no props and reads no shared state. `App.tsx` lazy-loads it as a corner inset (C5). It does not touch `useCommandState` or the dispatch panel (C6). The new decision gate can live entirely inside the scene plus one new pure module, with no change to other panels.

* Questions: Q1, Q2
* Evidence state: Evidence-backed finding
* Evidence: C5, C6
* Confidence and limits: High. One caveat: `useCommandState` already has a Signal Feed. Logging the decision there would be tempting but widens scope. Keep it out of Story 1.

### Four RAI minimum conditions map to code; the rest are governance

The RAI plan lists seven minimum conditions (C7). Mapping them against this repo:

| RAI condition | Work item | Can be built here | Notes |
|---|---|---|---|
| 1. Options with uncertainty and abstention | WI-RAI-001, 002 | Yes, mocked | Real calibration needs a model and simulation set: defer |
| 2. Per-option explanation | WI-RAI-003 | Yes, mocked | Drivers come from mock data, not a real model |
| 3. Decision record | WI-RAI-004 | Partly | Hash chain in browser memory. Immutable storage, retention, and legal hold: defer |
| 4. Ethical weighting sign-off | WI-RAI-005 | No | Governance. Defer and record |
| 5. Manual fallback procedure | WI-RAI-006 | Partly | UI can route to "use manual procedure". The procedure itself is an SOP: defer |
| 6. Commander training | WI-RAI-007 | No | Defer |
| 7. Independent TEVV and fairness | WI-RAI-008, 009 | No | Defer |

Commander identity (needed by WI-RAI-001 and 004) needs real authentication. With no backend, use a mocked operator ID and record the gap.

* Questions: Q2, Q5
* Evidence state: Evidence-backed finding
* Evidence: C7, C8
* Confidence and limits: High for the mapping. The split into stories is a recommendation (see below).

### A browser-only audit record is feasible and tamper-evident, but not immutable

Web Crypto `crypto.subtle.digest` (SHA-256) exists in the local Node runtime and in browsers on HTTPS or localhost (C10). The app deploys via a GitHub workflow, so it is served over HTTPS (C11). An append-only, in-memory list where each entry stores the hash of the previous entry can detect edits. It cannot stop someone clearing memory or editing the page. It also has no real identity and no retention.

`crypto.subtle.digest` is async. The confirm handler must wait for the record before committing. A synchronous non-cryptographic hash (for example FNV-1a) avoids async but gives weaker tamper evidence.

* Questions: Q5
* Evidence state: Partially supported claim
* Evidence: C10, C11
* Confidence and limits: Medium. jsdom tests run under Node, where `globalThis.crypto.subtle` exists (C10). Not yet proven inside a Vitest jsdom test; the plan should include one early test to confirm.

### A single confidence percentage conflicts with your user research

Interviews in the repo say three things. A blended confidence number is "decorative precision" (C9). Uncertainty must not be hidden because it is hard to show (C9). Command should not see a neater answer than the evidence supports, and dispatch should not be automated (C12). The safest way to meet "confidence score" is to show a score together with what it measures (for example "model agreement across 3 mocked sources") and a harm range per option. The UI then abstains when the ranges overlap too much or the score is under a threshold.

* Questions: Q4
* Evidence state: Evidence-backed finding (for the risk); design choice is a recommendation
* Evidence: C9, C12, C7 (TO-RAI-005)
* Confidence and limits: Medium. The interviews are fictional training material, but they are the repo's own requirement sources.

### Baseline validation is green

`npm test`: 21 files, 208 tests pass. `npm run lint`: clean. `npm run build`: succeeds with an existing chunk-size warning for maplibre. CI also runs `lint:sensor-log` and `lint:sim-overlay`, which the Last Stand change does not touch (C11).

* Questions: Q6
* Evidence state: Evidence-backed finding
* Evidence: C11, C13
* Confidence and limits: High. Run locally on Node 26.7.0. CI uses Node 22.

## Recommendation and Alternatives

* Recommendation: Implement one story first, "Governed decision gate". It covers all four acceptance criteria in one shippable slice:
  * A new pure module (for example `src/mock/lastStandDecision.ts`) that returns a mocked assessment per city: a harm range, a confidence score with its basis, and either a recommendation or an abstention. It also holds the hash-chained audit log.
  * `LastStandScene` shows both options side by side with ranges and the score. It never resolves on a timer. The commander must choose a city or "Decline: use manual procedure". Confirmation is blocked unless the assessment has a confidence score and the audit entry was written.
  * The saved, sacrificed, and LOST wording is replaced with neutral terms (for example "ASSETS COMMITTED" and "NOT COMMITTED"), and the tests are rewritten.
  * Per-option explanation (WI-RAI-003) becomes Story 2. Governance items are recorded as deferred.
* Rationale: The acceptance criteria are coupled. "Never auto-confirms without a confidence score and an audit record" needs the gate, the score, and the record together (C1, C7). Shipping options without the record would leave the main criterion unmet.
* What could change this result: if you want a smaller first slice, or a different confidence display, or persistent storage.

| Option | Benefits | Costs and risks | Evidence | Disposition |
|---|---|---|---|---|
| A. One story: governed gate (options, uncertainty, abstention, confirm, audit, label removal) | Meets all four criteria in one change. One rewrite of the scene and its tests | Larger single change (about 4 files). Async confirm flow | C1, C3, C7, C10 | Selected (pending D1) |
| B. Story 1 = options, uncertainty, abstention, labels. Story 2 = audit record | Smaller first change | Story 1 alone still confirms without a record, so the main criterion fails until Story 2 | C7 | Viable |
| C. Story 1 = audit log only, UI unchanged | Smallest change | Logs a coin flip. No visible improvement. Labels remain | C1 | Rejected |
| D. Wire the decision into the shared command state and Signal Feed | Decision visible across the console | Widens scope beyond the Last Stand path. Touches tested shared state | C6 | Rejected for now; candidate follow-up |

## Scope and Questions

* Goal: take the single-save decision in the Last Stand scene from prototype to a governed feature.
* Audience and use: the user (reviewer and approver) and the Plan phase.
* In scope: Last Stand scene and its decision path under ./; RAI plan minimum conditions in .copilot-tracking/rai-plans/single-save-decision/rai-plan.md.
* Out of scope: other scenes and panels; backend, cloud tenant, work tracker (mock or defer and record gap).
* Decision and evidence criteria: AI never auto-confirms a life-safety verdict without a confidence score and an audit record; both options shown with uncertainty; system can decline to recommend; saved and sacrificed labels removed; no tracking paths in code or commit messages; existing test, lint and build pass.
* Requested output: recommendation and story breakdown that supports planning. Implementation limited to one story.

| ID | Question | Source | Status |
|----|----------|--------|--------|
| Q1 | How does the Last Stand scene produce, show and confirm the decision today? | inferred | answered |
| Q2 | Which RAI minimum conditions map to code here, and which must be deferred? | explicit | answered |
| Q3 | Where do saved and sacrificed labels appear? | explicit | answered |
| Q4 | What data exists or can be mocked for confidence, uncertainty, and abstention? | explicit | answered (none exists; mock in a pure module) |
| Q5 | How can an audit record be kept with no backend? | explicit | answered (partially supported; one test to confirm) |
| Q6 | What test, lint and build baselines exist, and do they pass? | explicit | answered |
| Q7 | What is the smallest first story that meets the most acceptance criteria safely? | explicit | answered, pending D1 |

## Decisions and Feedback

| Group | Decision or feedback item | Status | Owner | Rationale or input needed | Evidence | Impact of answer |
|---|---|---|---|---|---|---|
| D1 | Story slicing | confirmed: Option A, one governed gate story | user (2026-10-07) | A meets all criteria at once | C1, C7 | Story 1 = options, uncertainty, decline, explicit confirm, audit log, label removal. Explanation = Story 2 |
| D2 | Confidence display | confirmed: score labelled simulated, with basis, plus per-option harm range; decline on overlap or low score | user (2026-10-07) | Interviews warn against bare blended number | C9, C12 | Sets UI and data shape |
| D3 | Audit log storage | confirmed: in-memory SHA-256 hash chain, session only; confirm awaits write | user (2026-10-07) | Persistence is tamper-trivial; sync hash weaker | C10, C11 | Reload-loss gap recorded |
| D4 | Repo comment forbidding fairness or explanation at the seam is superseded by the brief | proposed | agent | Brief explicitly asks to govern the seam | C1 | Plan rewrites the comment |
| D5 | Deferred items: real calibration, auth identity, immutable storage, retention, ethical weighting sign-off, manual SOP, training, TEVV | confirmed | constraint | Brief forbids backend, cloud and tracker | C7, C8 | Recorded as gaps in plan and changes log |

## Risks and Open Questions

| Priority | Type | Risk, question, or research item | Impact | Smallest action or evidence needed | Owner |
|---|---|---|---|---|---|
| H | risk | A mocked confidence score could look like real calibration to a viewer | Repeats the "decorative precision" problem | Label the score as simulated and show its basis on screen | downstream |
| M | open question | Does `crypto.subtle` work inside Vitest jsdom tests? | Could force a different hash or a test shim | One early unit test in the plan | downstream |
| M | risk | Async confirm under fake timers can make tests flaky | Test churn | Await the record write with resolved promises, not timers | downstream |
| L | risk | The corner inset is small; two option cards plus controls may not fit | Layout overflow | Check at the existing inset size during implementation | downstream |
| L | further research | Per-option explanation content (Story 2) | Not needed for Story 1 | Revisit at Story 2 | research |

## Planning Readiness and Next Step

| Field | Record |
|---|---|
| Research disposition | executed |
| Decision participation | user-owned; manual RPI Agent mode; provenance: user brief 2026-10-07 |
| Planning Readiness | Ready. D1 to D3 answered 2026-10-07. Evidence: C1 to C13 |
| Research depth and helpers | One cycle: Wider, Deeper, Contrarian. No helpers |
| Blockers | none |
| Output mode and planning support | convergence; supports planning |
| Continuation owner | manual RPI Agent |
| Required gates or confirmations | User review of research (requested stop); D1 to D3 answers |
| Next action | User reviews research and answers D1 to D3, then runs /hve-core:rpi-plan |
| Primary evidence file | .copilot-tracking/research/2026-10-07/single-save-decision-governance-research.md; date source: current date |

## Research Record

### Method and Boundaries

| Field | Record |
|---|---|
| Research posture and provenance | focused; brief-based: bounded internal task with named source targets |
| Completion basis | All questions answered from code, RAI artifacts, and repo docs; next sources redundant |
| Explicit limits or deadline | none |
| Codebase and external scope | ./ Last Stand path, App wiring, shared state (to confirm isolation), CI, pre-prototype docs; RAI plan and backlog handoff. External: none |
| Initial candidate areas | src/components/LastStandScene.tsx, src/mock/lastStandCities.ts, tests, src/App.tsx, src/styles/tokens.css |
| Evidence root | .copilot-tracking/ (default); date source: current date |
| Constraints and excluded sources | read-only research; no backend or cloud; external web not needed |
| Prior knowledge | RAI plan (2026-10-07) reused as requirements source; its facts are labeled hypothetical |

### Extensions and Participation

#### Extension Registry

| Kind | Candidate | Provenance and scoped contract | Selected or skipped reason |
|---|---|---|---|
| instruction | ./AGENTS.md | repo root | Selected; all sections empty, adds no criteria |
| skill | .github/skills/commit-message | repo skill | Skipped for research; applies at implementation commit time |
| skill | hve-core:rai-planner / rai-standards | RAI domain | Skipped; RAI plan already produced, reused as source |
| skill | hve-core:accessibility | UI change | Skipped for research; relevant to plan (aria-live, focus on confirm) |

#### Direction and Participation Log

| Checkpoint or change | Question, direction, or rationale | Answer or no-interaction reason | Result and revalidation effect |
|---|---|---|---|
| intake | Mode and scope | Brief supplied full scope, criteria, constraints | No intake question needed |
| convergence | D1 to D3 | User chose all three recommendations (A; score+basis+range; in-memory SHA-256 chain) | Recommendation confirmed; Ready |

### Research Cycle Log

#### Cycle 1

* Active posture, controls, and limits: focused; brief constraints active.

##### Wave 1: Wider

* Focus and questions: locate all Last Stand code, tests, styles, wiring; RAI conditions; repo validation.
* Evidence: C1 to C8, C11.
* Reflection: Scene is isolated; four RAI conditions map to code; baseline needed.

##### Wave 2: Deeper

* Focus and questions: exact decision flow, label locations, test assertions, audit feasibility, baseline run.
* Evidence: C1, C3, C4, C10, C13.
* Reflection: No human step exists. Web Crypto available. Baseline green.

##### Wave 3: Contrarian

* Focus and questions: Is a confidence score harmful? Is a browser log meaningful? Does the repo forbid changes at the seam?
* Evidence: C9, C12 (warn against blended percentage and automated dispatch); C1 comment forbids fairness at seam; C10 limits of client-side logs.
* Reflection: Weakens "show a percentage" and strengthens "score with basis plus range". Confirms the log is tamper-evident only.

##### Synthesis and Re-entry

| Material or claim | Evidence | Disposition | Rationale | User-facing effect |
|---|---|---|---|---|
| Scene auto-resolves with no human step | C1, C3 | accepted | Direct code read | Finding 1 |
| Single blended percentage is acceptable | C9 | rejected | Repo research calls it decorative precision | D2 recommendation |
| Browser hash chain gives immutability | C10 | rejected | Only tamper-evident | Gap recorded |
| Repo comment blocks seam changes | C1 | rejected as binding | Brief overrides | D4 |

* Another complete three-wave cycle needed: no
* Trigger or stop basis: all questions answered; remaining items are user decisions, not evidence gaps
* Readiness or revalidation effect: Ready pending D1 to D3

### Evidence Log

* Helpers: none

| ID | Claim or finding | Source or location | Retrieved and version | Tool | Confidence | Notes |
|---|---|---|---|---|---|---|
| C1 | Coin-flip pick, timer resolve, SAVED/SACRIFICED/LOST strings, AI-decider framing, seam comment | ./src/components/LastStandScene.tsx `chooseCityToSave`, `LastStandScene` | not applicable | read | high | No confirm action exists |
| C2 | Two mocked cities with populations | ./src/mock/lastStandCities.ts `LAST_STAND_CITIES` | not applicable | read | high | Geography test guards names |
| C3 | Seven tests assert old strings and coin-flip behavior | ./src/components/LastStandScene.test.tsx | not applicable | read | high | Uses fake timers and Math.random spy |
| C4 | `.ls-*` styles, `protected`/`overrun` classes, reduced-motion note naming labels | ./src/styles/tokens.css, Last-stand block and reduced-motion block | not applicable | grep | high | |
| C5 | Scene lazy-loaded as inset, no props | ./src/App.tsx `LastStandScene` lazy import | not applicable | read | high | Grep found no other usages |
| C6 | Shared state has feed and dispatch, unrelated to scene | ./src/state/useCommandState.ts `useCommandState` | not applicable | read | high | |
| C7 | Seven minimum conditions; tradeoff TO-RAI-005 abstention routes to manual | .copilot-tracking/rai-plans/single-save-decision/rai-plan.md, Review Summary > Posture; Tradeoffs | not applicable | read | high | Hypothetical system |
| C8 | WI-RAI-001 to 004 implementation and acceptance criteria | .copilot-tracking/rai-plans/single-save-decision/github-backlog-handoff.md, RAI-TEMP-1 to 4 | not applicable | read | high | Drafts only |
| C9 | Blended confidence is "decorative precision"; do not hide uncertainty | ./docs/pre-prototype/05-interview-amalia-cardoso.md | not applicable | read | medium | Fictional training material |
| C10 | `globalThis.crypto.subtle.digest` available in local Node; tests default to node env, jsdom per file | Local runtime check; ./vite.config.ts `test` | not applicable | bash, read | medium | Node v26.7.0 |
| C11 | CI runs lint, two artifact checks, test, build on Node 22; deploy workflow exists | ./.github/workflows/ci.yml; deploy.yml | not applicable | read | high | |
| C12 | "Do not automate dispatch. Do not make the visual neatness stronger than the evidence." | ./docs/pre-prototype/03-interview-frans-vasala.md | not applicable | read | medium | Fictional training material |
| C13 | Baseline: 21 files, 208 tests pass; lint clean; build OK with chunk warning | npm test, npm run lint, npm run build | not applicable | bash | high | Run 2026-10-07 |

#### Contradictions and Conflicts

* Seam comment vs brief: C1 says do not add fairness or explanation at the seam; the user brief asks to govern it. Resolved by caller scope precedence: brief wins.

### Artifact Self-Check

* [x] User-facing sections stand alone.
* [x] Every question answered or names the missing evidence.
* [x] Findings keep explanation, state, and confidence together.
* [x] All codebase findings have C# IDs with paths and symbols. No external sources.
* [x] Cycle 1 records Wider, Deeper, Contrarian, synthesis, re-entry.
* [x] Method, extensions, participation recorded.
* [x] Convergence recommendation selected with rejected alternatives.
* [x] Decision groups recorded; D1 to D3 pending user answers.
* [x] Disposition, readiness, blockers, owner, next action complete.
* [x] Untrusted content inert; no secrets; writes stayed in .copilot-tracking/.
* Checked sections: all
* Missing or limited sections: none
