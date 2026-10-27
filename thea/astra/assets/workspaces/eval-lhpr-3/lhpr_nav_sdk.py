"""Thin LHPR-VLN primitive navigation interface. No planning or scene access."""
import json
from urllib.request import ProxyHandler, Request, build_opener

_URL = 'http://127.0.0.1:18138/rpc'
_HTTP = build_opener(ProxyHandler({}))
_ACTIONS = frozenset(('move_forward', 'turn_left', 'turn_right', 'stop'))


def _rpc(payload):
    req = Request(_URL, json.dumps(payload).encode(), {'Content-Type': 'application/json'})
    with _HTTP.open(req, timeout=210) as response:
        value = json.load(response)
    if not value.get('ok'):
        raise RuntimeError(value.get('error', 'navigation_interface_error'))
    return value['result']


class Navigation:
    def step(self, action):
        """Execute one motion, or request/consume a success-only STOP review.

        A failed review returns without action or submission. After a successful
        review, STOP again at the unchanged state submits exactly one action.
        """
        if not isinstance(action, str) or action not in _ACTIONS:
            raise ValueError('Use move_forward, turn_left, turn_right or stop')
        return _rpc({'op': 'step', 'action': action})

    def metadata(self):
        """Public instruction, action limits and current stage, not scoring."""
        return _rpc({'op': 'metadata'})


nav = Navigation()
