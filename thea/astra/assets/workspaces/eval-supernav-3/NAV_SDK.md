# Ordered navigation

This is one five-target navigation task. The task text is the official full
instruction: match each described object's appearance, location and relations,
and visit the targets in the stated order. No manipulation is required.

Use `from supernav_nav_sdk import nav`. MCP `navigation.observe` returns current
front/right/back/left RGB views (640×480, HFOV 90°, camera height 1.25 m).
Observing does not move the agent or count as an action. `nav.metadata()` returns
the instruction, target count, action count, limits, `begun` and `episode_over`.

| `nav.step(action)` | Effect |
| --- | --- |
| `move_forward` | Attempt to move forward 0.25 m through native collision handling. |
| `turn_left` / `turn_right` | Turn left / right 30°. |
| `stop` | End the WHOLE episode, not an intermediate-goal submission. |

Arrival uses the paper's rule: shortest walkable-path distance strictly below
1 m to an approved viewpoint of the intended target. The evaluator checks every
recorded position for ordered arrivals; earlier targets need not remain near
the final position. All five ordered arrivals followed by explicit STOP are
required for full success. Seeing a target from afar, marking it found, or
declaring success does not itself satisfy this rule. No arrival or score feedback
is returned. Judge identity and proximity from the RGB views; target/viewpoint
coordinates, maps, simulator poses and reference routes remain hidden.

An actual permitted STOP closes the attempt whether native scoring succeeds or not. Do not use it between
targets; after visiting one target, continue to the next. If `episode_over` is
true, issue no further actions. Every executed primitive, including actual STOP, counts toward the
500-action limit; review-only requests consume no action. Policy wall time is limited to 120 minutes after readiness.
Collision sliding is enabled, with no route follower or automatic recovery.

Write code and notes only inside this workspace. The three initial files are read-only; read README.md for the scene-graph
memory requirement. Saved RGB observations under images/ are also read-only. No demonstrations, prepared strategy, semantic Skills, external
files/services, SSH, web, other MCP tools, subagents, resets or cross-episode
memory are available. Evaluation is separate from your completion statement.

These are protocol-aligned local instructions, not a verbatim unpublished paper
prompt. The direct atomic-action interface is not the paper's full harness.


## STOP review in this experiment

After you judge that intermediate target 1, 2, 3 or 4 has been reached, call
`nav.review_target(target_index)` with its one-based index before continuing to
the next target. Only `decision=success` with `identity`, `room_and_relations`
and `approach` all `supported` grants `target_review_accepted=true`. Failed
reviews do not advance review coverage: keep finding the current target. The
interface rejects a later checkpoint or final STOP until all earlier checkpoints
have passed. It does not physically restrict free movement or confirm native
arrival. Successful historical coverage survives later motion. Target 5 uses
the final STOP review below; never issue actual STOP between targets.

A fresh Astra evaluator receives only the original task, public state/current
checkpoint and current front/right/back/left RGB. It receives **no scene graph,
actor history or earlier reviews**, and has no tools or action access. Its
visual judgment is fallible, not native success or distance feedback.

The first `nav.step('stop')` returns `stop_executed=false`, `evaluation_id`,
`evaluation`, `decision` and `evaluation_gate_passed`; it consumes no action and
does not end the episode. Only evaluator `success` with all three checks
`supported` permits a second STOP at the unchanged action/state to execute the
native STOP once. Any motion invalidates this final permission.

On `fail`, continue inspecting and approaching the current target. Repeating
STOP or the same target review at the same action/state reuses its result,
without a new model call or any submission. Move before requesting a fresh
review; another observation or SG edit alone does not unlock it. Continue while
the episode is active; budget expiry still ends the attempt without bypassing
the gate.

Only this controller-provided reviewer is authorized; do not create other
sessions or call other services. Each review is limited to 180 seconds and all
review time counts inside the same 120-minute budget. Primitive actions,
500-action limit and native scoring are unchanged.
