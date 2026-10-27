# Navigation interface

This workspace is for one LHPR-VLN episode. Import `nav` from `lhpr_nav_sdk` in Python. Follow the original global task instruction in its stated order.

## Goals and STOP

This is a navigation-only evaluation. Words such as "take", "bring", "grab" or "release" in the original instruction express the ordered destinations; this interface does not execute or score physical grasping, carrying or placement.

Each stage has one navigation goal: the requested object in the room specified by the instruction. Reaching an arbitrary object of the same category in another room is not sufficient. The evaluator accepts a matching target object within the specified semantic room.

A stage succeeds only when `stop` is issued at a location whose shortest navigable (geodesic) distance to an accepted target's navigable goal point is strictly less than **1 metre**. Merely seeing the object, or passing within this range without `stop`, does not submit the stage.

`stop` submits the current stage and **irreversibly advances to the next stage even if the submission is wrong**. At the last stage it ends the episode. A stage-index change or `episode_over=true` is not confirmation of success. Submission success and goal distance are not returned.

## Observation and actions

Use only MCP `navigation.observe` for current left, front and right onboard RGB. Observing does not move or submit a goal. Its workspace image references are lossless copies of those same permitted observations.

`nav.metadata()` returns the original instruction, current zero-based stage index, stage count, action count and limits. Infer the current target from that instruction and stage index; no private target information is supplied.

`nav.step(action)` requests a primitive action. Motion executes once; STOP uses the review gate below.

| Action | Effect |
| --- | --- |
| `move_forward` | Attempt to move forward 0.25 metres. |
| `turn_left` | Turn left 30 degrees. |
| `turn_right` | Turn right 30 degrees. |
| `stop` | Submit the current stage under the rule above. |

Every executed primitive, including an actual `stop`, counts toward the **500-action** episode limit. Review-only requests consume no action. Policy wall time is at most **120 minutes**, beginning after readiness. Stop issuing actions immediately when `episode_over=true`. There is no reset, automatic retry, route-following macro, automatic obstacle recovery or extended-budget continuation.

## Workspace boundary

Read `README.md` and maintain the episode-local scene graph specified there. Write any code or notes you need only in this workspace. Do not modify `NAV_SDK.md`, `lhpr_nav_sdk.py`, `README.md` or cached images.

No demonstrations, prepared policy, truth maps, target coordinates, scores, simulator state, external files, SSH, web, other services/tools, subagents or cross-episode memory are provided or permitted. Coordinates in your own graph remain estimates from permitted observations and action history. Briefly report why execution ended.

## STOP review in this experiment

A fresh Astra evaluator receives only the original task, current public stage and current left/front/right RGB. It receives **no scene graph, actor history or earlier reviews**, and has no tools or action access. Its visual judgment is fallible, not native success or distance feedback.

The first `nav.step('stop')` returns `stop_executed=false`, `evaluation_id`, `evaluation`, `decision` and `evaluation_gate_passed`; it does not move, consume an action or submit. The gate passes only when the evaluator says `success` and `identity`, `room_and_relations` and `approach` are all `supported` by current images.

On `fail`, continue inspecting and approaching this target. Another STOP at the same action/stage reuses that failure: it cannot submit or request another model review. Move before requesting a fresh review; observing again or editing SG alone does not unlock it.

On `success`, a second STOP at the unchanged action/stage submits exactly once under the native rule above. Any motion invalidates that permission. For LHPR, repeat this process at every stage. A positive visual review still does not guarantee native success. Continue while the episode is active; budget expiry still ends the attempt without bypassing the gate.

Only this controller-provided reviewer is authorized; do not create other sessions or call other services. Each review is limited to 180 seconds and all review time counts inside the same 120-minute budget. Primitive actions, 500-action limit and native scoring are unchanged.
