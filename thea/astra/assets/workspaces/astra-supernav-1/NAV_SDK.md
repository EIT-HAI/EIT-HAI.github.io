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

STOP closes the attempt whether successful or not. Do not use it between
targets; after visiting one target, continue to the next. If `episode_over` is
true, issue no further actions. Every step, including STOP, counts toward the
500-action limit. Policy wall time is limited to 120 minutes after readiness.
Collision sliding is enabled, with no route follower or automatic recovery.

Write code and notes only inside this workspace. The two initial interface files
are read-only. No demonstrations, prepared strategy, semantic Skills, external
files/services, SSH, web, other MCP tools, subagents, resets or cross-episode
memory are available. Evaluation is separate from your completion statement.

These are protocol-aligned local instructions, not a verbatim unpublished paper
prompt. The direct atomic-action interface is not the paper's full harness.
