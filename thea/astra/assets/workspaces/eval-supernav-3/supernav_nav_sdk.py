"""Thin primitive navigation client. No planning, maps or scoring access."""
import json
from urllib.request import ProxyHandler, Request, build_opener

_HTTP = build_opener(ProxyHandler({}))
_URL = "http://127.0.0.1:18148/rpc"
_ACTIONS = frozenset(("move_forward", "turn_left", "turn_right", "stop"))


def _rpc(payload):
    request = Request(_URL, json.dumps(payload).encode(), {"Content-Type": "application/json"})
    with _HTTP.open(request, timeout=210) as response:
        reply = json.load(response)
    if not reply.get("ok"):
        raise RuntimeError("navigation_request_rejected_or_episode_unavailable")
    return reply["result"]


class Navigation:
    def review_target(self, target_index):
        """Request the authorized fresh review after claiming intermediate target 1-4.

        Only review success with all three checks supported grants checkpoint
        coverage. Fail requires continued search; no review moves, consumes an
        action, submits native arrival or returns native scoring feedback.
        """
        if type(target_index) is not int or not 1 <= target_index <= 4:
            raise ValueError("Use a one-based intermediate target index from 1 to 4")
        return _rpc({"op": "review_target", "target_index": target_index})

    def metadata(self):
        """Instruction, action count and terminal flag; no goal-arrival feedback."""
        return _rpc({"op": "metadata"})

    def step(self, action):
        """Execute one motion, or request/consume a success-only final review.

        A failed review cannot end the episode. An unchanged second STOP after
        successful review executes the native terminal action exactly once.
        """
        if type(action) is not str or action not in _ACTIONS:
            raise ValueError("Use move_forward, turn_left, turn_right or stop")
        return _rpc({"op": "step", "action": action})


nav = Navigation()
