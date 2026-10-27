"""Thin primitive navigation client. No planning, maps or scoring access."""
import json
from urllib.request import ProxyHandler, Request, build_opener

_HTTP = build_opener(ProxyHandler({}))
_URL = "http://127.0.0.1:18148/rpc"
_ACTIONS = frozenset(("move_forward", "turn_left", "turn_right", "stop"))


def _rpc(payload):
    request = Request(_URL, json.dumps(payload).encode(), {"Content-Type": "application/json"})
    with _HTTP.open(request, timeout=65) as response:
        reply = json.load(response)
    if not reply.get("ok"):
        raise RuntimeError("navigation_request_rejected_or_episode_unavailable")
    return reply["result"]


class Navigation:
    def metadata(self):
        """Instruction, action count and terminal flag; no goal-arrival feedback."""
        return _rpc({"op": "metadata"})

    def step(self, action):
        """Execute exactly one primitive action; STOP ends the whole episode."""
        if type(action) is not str or action not in _ACTIONS:
            raise ValueError("Use move_forward, turn_left, turn_right or stop")
        return _rpc({"op": "step", "action": action})


nav = Navigation()
