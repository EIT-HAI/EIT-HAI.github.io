# Spatial memory

Maintain `scene_graph.json` as this episode's revisable beliefs, not ground truth. Keep **world observations** separate from **target assessments**. Read `NAV_SDK.md` for the unchanged task, arrival and STOP rules. Use only this episode's permitted RGB and action history.

## World

Each object or place has a stable `id`, `category`, distinguishing `description`, estimated `position: [x, y, z]` in metres, uncertainty, and observation/action references. Use one episode-global frame: start `[0, 0, 0]`, `+x` initially forward, `+y` initially left, `+z` up. Use `null` for unknown components. Object centres are not navigable arrival viewpoints.

Use `subject → relation → object`:

| Relation | Meaning |
| --- | --- |
| `in` | Object → container/room; room → floor. |
| `on` | Object → supporting surface. |
| `attached_to` | Mounted/hanging object → host. |
| `part_of` | Component → whole. |
| `connected_to` | Place → place, with a passage `via` when known. |

Derive geometry from coordinates; do not infer containment or traversability from proximity alone. Keep uncertain identities separate. Each object retains at most **five** complementary workspace-relative image references, with camera and action. Compare appearance and spatial context before merging IDs.

## Target assessments

For each ordered target, keep `candidate_ids`, nullable `selected_id`, and two separate assessments:

- `identity`: `unresolved` or `supported`, with evidence matching the instruction's appearance, room and relations, plus any contradiction.
- `arrival`: `unresolved` or `supported`, with evidence of a close navigable approach under `NAV_SDK.md`, not merely visibility or estimated object-centre distance.

Evidence cites an observation/action and image, and briefly states what it supports. These states are your self-assessments, **never evaluator feedback or proof of success**. Do not replace them with a single `visited`/`done` flag. Multiple views of one candidate do not by themselves confirm its identity.

If identity is unresolved, arrival cannot establish target completion. Before advancing your target plan or submitting STOP, review the relevant evidence and remaining alternatives. An unresolved identity or approach calls for further checking while feasible; do not mark it complete just to advance the sequence. If ending an incomplete attempt, preserve the unresolved states and report that it is incomplete. Respect the original budget and `episode_over`.

## Use and revise

Before choosing a new destination or returning to a place, retrieve the relevant target assessment, nearby nodes, saved visual evidence and known passages. Track which alternatives remain unchecked; use contradictions to reconsider a candidate rather than accumulating confirming notes.

A forward command does not prove displacement. If observations indicate blockage or inconsistent geometry, withdraw the unsupported motion estimate, increase position uncertainty, and re-establish local spatial consistency before relying on those coordinates. Do not silently treat nominal 0.25 m steps as measured motion.

When a candidate is rejected or localization invalidates an arrival estimate, reset the affected assessment to `unresolved` and retain the reason/evidence. Keep `updated_at_action` current. All memory maintenance and checking use the existing time/action budget; no reset, private state or cross-episode memory is available.
