<!-- markdownlint-disable-file -->
# RPI Plan Critique: Single-save decision governance, Story 1 (governed decision gate)

## Metadata

* Task ID: single-save-decision-governance
* Critique date: 2026-10-07
* Plan: .copilot-tracking/plans/2026-10-07/single-save-decision-governance-plan.md
* Critique execution: Complete
* Critique depth: standard
* Depth provenance: default
* Critique type: initial
* Earlier critique: not applicable

## Inputs and Criterion Boundary

* Task context and caller requirements: Story 1 governed gate in the Last Stand scene. Acceptance: no auto-confirm of a life-safety verdict without a confidence score and an audit record; both options with uncertainty; system can decline; saved and sacrificed labels removed. Constraints: no backend, cloud, or tracker; no tracking paths in code or commits. Validation: npm test, lint, build.
* Research and evidence considered: .copilot-tracking/research/2026-10-07/single-save-decision-governance-research.md; .copilot-tracking/rai-plans/single-save-decision/rai-plan.md (Review Summary > Posture, Tradeoffs TO-RAI-002, TO-RAI-005); .copilot-tracking/rai-plans/single-save-decision/github-backlog-handoff.md (RAI-TEMP-1 to 5); .copilot-tracking/rpi-state/single-save-decision-governance.json; ./src/components/LastStandScene.tsx, LastStandScene.test.tsx, src/mock/lastStandCities.ts, src/styles/tokens.css, src/App.tsx, vite.config.ts, package.json, eslint.config.js, .github/workflows/ci.yml.
* Decisions, dependencies, task Goals, and task Requirements considered: D1 to D3 (authoritative), PD1 to PD3 (proposed), FR-001 to FR-008, NFR-001 to NFR-005, all six Pxx-Txx tasks and dependencies.
* Assessment boundary: The supplied plan against supplied evidence and current code. The critique does not run code or re-verify the planning probe for crypto.subtle in jsdom; that probe is accepted as caller-supplied.

## Coverage Assessment

| Requirement, research, phase, or task ID | Coverage | Evidence or concern |
|---|---|---|
| Acceptance: no auto-confirm without score and audit (FR-003, FR-004) | Covered | P02-T01 removes timer path, blocks city confirm on null confidence, commits only after append resolves; P03-T01 cases 2, 4, 6, 7. Race on RE-RUN during pending append is open (PC-003). |
| Acceptance: both options with uncertainty (FR-001) | Covered | P01-T01 contract plus P03-T01 case 1. |
| Acceptance: system can decline (FR-002, FR-006) | Partial | Abstain path and decline covered; the recommendation direction and overlap metric are not unambiguously defined (PC-001, PC-002). |
| Acceptance: labels removed (FR-007) | Covered | P02-T01 wording, P02-T02 CSS cleanup, P03-T01 case 8; grep gate gap is minor (PC-006). |
| FR-005 audit chain, D3 | Partial | Contract sound; serialization and copy depth leave nested tamper detection and chain immutability unspecified (PC-004). |
| FR-008, RE-RUN | Covered | P01-T01 three scenarios, wrap; P03-T01 case 9. |
| NFR-001, NFR-003, NFR-004 | Covered | P03-T02 matches ci.yml steps and package.json scripts; baseline 21 files and 208 tests from research C13. |
| NFR-002, NFR-005 | Partial | Inset growth checked only at lg; parent container clips below lg (PC-005). |
| RAI Posture conditions 1 and 3 (WI-RAI-001, 002, 004) | Covered as mocked | Simulated score, abstention, tamper-evident chain; immutability, identity, calibration, override reason recorded as Follow-Up Items. |
| RAI conditions 2, 4 to 7 | Deferred and recorded | Follow-Up Items with owners; consistent with D1 and constraints. |
| TO-RAI-002 weighting placeholder (PD3) | Partial | Placeholder is appropriately deferred, but its direction is internally contradictory (PC-001). |
| TO-RAI-005 abstention routes to manual | Covered | P02-T01 makes decline primary and preselects no city on abstention. |

## Verdict

* Verdict: Revise
* Rationale: The plan is well grounded and covers all four acceptance criteria and every confirmed decision. One High finding (contradictory recommendation rule in a life-safety demo) and four Medium findings (overlap metric, audit serialization and copy depth, pending-append race, small-viewport clipping) need small, planner-owned clarifications before implementation. None requires a user decision.

## Findings

<!-- rpi:critique id=PC-001 -->
### PC-001 [High]: Recommendation rule states opposite directions

* Related IDs: P01-T01, PD3, FR-002, TO-RAI-002
* Evidence: Plan P01-T01 Requirements: "recommend the city with the lower expected harm". P01-T01 Details: "means protect the city whose people face more harm if left unprotected". PD3: "recommend protecting the city with the higher expected harm". The `CityAssessment` contract does not say whether `harmLow`/`harmHigh` is harm if unprotected or residual harm after protection.
* Concern: Three statements of the binding rule use "lower" and "higher" for what is meant to be the same rule, and the harm field semantics that would disambiguate them are not defined. The P01-T01 tests only check that the clear scenario "recommends", so an inverted rule would pass.
* Impact: The implementer can encode the opposite of the intended placeholder, and the UI would show a confident recommendation to protect the less-threatened city. This is the highest-stakes behavior in the story.
* Smallest useful change: In P01-T01, define `harmLow`/`harmHigh` as "people at serious risk if this city is not protected", define expected harm as the range midpoint, state one rule ("recommend protecting the city with the higher expected harm"), align PD3 and the Details line to that wording, and add a test asserting the clear scenario recommends the specific city with the higher midpoint.
* Action owner: planning parent
* Exact resolving evidence: P01-T01 Requirements, Details, and PD3 use one identical rule; the contract comment on `harmLow` names the "if not protected" basis; a P01-T01 test case names the expected recommended city.
* Decision route: direct planner correction (placeholder already accepted as deferred to WI-RAI-005)

<!-- rpi:critique id=PC-002 -->
### PC-002 [Medium]: Overlap threshold metric is undefined

* Related IDs: P01-T01, FR-002, D2
* Evidence: P01-T01: "when the two harm ranges overlap beyond a named threshold constant". No metric is defined. D2 says decline "on overlap or low score"; RAI-TEMP-2 says "overlap past an agreed threshold".
* Concern: "Overlap beyond a threshold" could be absolute people, fraction of the smaller range, or fraction of the union. Different choices change which scenarios abstain.
* Impact: Scenario data and threshold may disagree, so a "clear" scenario may silently abstain or an "overlap" scenario may recommend. It also leaves D2's plain "decline on overlap" reading unclear for small overlaps.
* Smallest useful change: Name the metric (for example, overlap length divided by the narrower range width) and the threshold value, and require the clear scenario's ranges to be fully disjoint so it satisfies D2 under either reading.
* Action owner: planning parent
* Exact resolving evidence: P01-T01 states the overlap formula and constant value; the clear scenario is specified as non-overlapping; a test covers the boundary just above and below the threshold.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-003 -->
### PC-003 [Medium]: RE-RUN or unmount during a pending append can commit against the wrong scenario

* Related IDs: P02-T01, P03-T01, FR-003, FR-004, FR-008
* Evidence: P02-T01 disables only the confirm controls while the append is pending. RE-RUN "loads the next scenario and resets to the pending state". The append is async (research Finding 5).
* Concern: If RE-RUN is pressed while `append` is in flight, the resolution handler sets a committed state on the new scenario, which the commander never confirmed. The audit entry records scenario N while the UI shows a commit on scenario N+1.
* Impact: Breaks "commit only from an explicit confirm" and makes the audit record disagree with the screen shown.
* Smallest useful change: In P02-T01, disable RE-RUN while an append is pending, and guard the resolution with a run token (ignore results whose scenario index no longer matches). Add a P03-T01 case: confirm, press RE-RUN before resolve (or assert RE-RUN is disabled), and verify no commit appears on the new scenario.
* Action owner: planning parent
* Exact resolving evidence: P02-T01 Requirements include the RE-RUN disable and stale-result guard; P03-T01 required cases include the race case within the 12-test cap.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-004 -->
### PC-004 [Medium]: Audit serialization and copies are not specified as deep

* Related IDs: P01-T02, FR-005, RAI-TEMP-4 ("tamper test detected")
* Evidence: P01-T02: "stable serialization ... (fixed key order)" and "`entries()` returns copies". `AuditRecordInput.assessment` is a nested object (options tuple, recommendation union).
* Concern: A common implementation, `JSON.stringify(entry, keyArray)`, filters nested keys not in the array, so nested fields such as `options[1].harmHigh` drop out of the hash and tampering with them is not detected. A shallow copy in `entries()` lets callers mutate the nested assessment inside the stored chain.
* Impact: The tamper-evidence claim of D3 can pass its tests while being false for the most important fields.
* Smallest useful change: Require a recursive canonical serialization (sorted keys at every depth) and deep copies (for example `structuredClone`) in `entries()` and on `append` input. Add tests that tamper a nested assessment field and that mutating a returned entry does not change the stored chain.
* Action owner: planning parent
* Exact resolving evidence: P01-T02 Requirements state recursive key ordering and deep copy; P01-T02 test list includes nested-field tamper and returned-copy mutation cases.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-005 -->
### PC-005 [Medium]: Grown inset can be clipped below the lg layout, hiding the controls

* Related IDs: P02-T02, NFR-002, NFR-005
* Evidence: ./src/App.tsx lines 100 to 117: the map container is `relative min-h-[20rem] overflow-hidden` and hosts the absolutely positioned inset. tokens.css `.ls-panel` is `position: absolute; top: 10px; height: 200px`. P02-T02 proposes `height: auto` with a `max-height`, and NFR-005 checks only the lg layout.
* Concern: Below lg the container can be about 320 px tall. Two option cards, recommendation line, and confirm, decline, and RE-RUN buttons may exceed it, and `overflow-hidden` on the parent clips them with no scroll.
* Impact: Confirm or decline could be unreachable on smaller viewports, which defeats the human-decides gate and the keyboard reachability in NFR-002.
* Smallest useful change: In P02-T02, set `.ls-panel` `max-height` relative to the container (for example `calc(100% - 20px)`) with `overflow-y: auto`, and extend NFR-005's visual check to the smallest supported layout.
* Action owner: planning parent
* Exact resolving evidence: P02-T02 Details specify container-relative max-height plus internal scroll; NFR-005 condition names both lg and the below-lg layout.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-006 -->
### PC-006 [Low]: Validation search omits LOST and is self-contradictory on SAVED

* Related IDs: P03-T02, FR-007, NFR-003
* Evidence: P03-T02: search `src/` for `.copilot-tracking`, `SAVED`, `SACRIFICED`, `chooseCityToSave` "returns no matches", then "`SAVED` may appear only inside a test that asserts its absence". The research lists "N LOST" as one of the five framing sites; FR-007 names "lost".
* Concern: The grep gate cannot both return no matches and allow test matches, and it does not check `LOST`.
* Impact: Minor; a leftover LOST string in non-test code would rely solely on P03-T01 case 8.
* Smallest useful change: Scope the search to non-test files under `src/` and add `LOST` to the term list.
* Action owner: planning parent
* Exact resolving evidence: P03-T02 states the search excludes `*.test.*` files and includes `LOST`.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-007 -->
### PC-007 [Low]: Prefer lazy useState over useRef for the per-scene AuditLog

* Related IDs: P02-T01, NFR-001
* Evidence: ./eslint.config.js extends `reactHooks.configs.flat.recommended`; package.json pins eslint-plugin-react-hooks ^7.1.1, whose recommended set includes ref-access-during-render checks. P02-T01 suggests "a `useRef` or lazy `useState`".
* Concern: Lazily initializing a ref during render can trip the v7 rules and fail `npm run lint`.
* Impact: Avoidable lint churn at P03-T02.
* Smallest useful change: Specify `const [auditLog] = useState(() => createAuditLog())` in P02-T01 Details.
* Action owner: planning parent
* Exact resolving evidence: P02-T01 Details name lazy `useState` as the holder.
* Decision route: direct planner correction

## Strengths and Residual Risk

* Strong traceability: every FR and NFR maps to tasks; test ownership, exact removals (7), and an addition cap are explicit; baseline and CI gates match ci.yml and package.json.
* Confirmed decisions D1 to D3 are applied faithfully; the plan does not contradict them.
* Deferred RAI conditions (calibration, identity, immutable storage, retention, weighting sign-off, override reason, SOP, training, TEVV) are recorded with owners rather than claimed.
* Residual risk accepted by the plan: simulated score may be read as real calibration (mitigated by on-screen "simulated" marker and basis); audit log is session-only and not immutable.

## Questions or Blocking Evidence Gaps

* None. All findings are resolvable by planner clarification.

## Limitations

* Code was read, not executed; the jsdom crypto.subtle probe is accepted as caller-supplied.
* Map zoom control position in CommandMap was not inspected; NFR-005 relies on implementation-time visual check.

## Recommended Next Action

* Highest-impact finding: PC-001
* Action owner: planning parent
* Smallest next action: Direct revision of P01-T01, PD3, P01-T02, P02-T01, P02-T02, P03-T01, P03-T02 per PC-001 to PC-007, then record dispositions in Critique Disposition.
* User response required: no
