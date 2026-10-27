import sys
from supernav_nav_sdk import nav
for arg in sys.argv[1:]:
    key, _, count = arg.partition(':')
    action = {'f':'move_forward','l':'turn_left','r':'turn_right','s':'stop'}[key]
    for _ in range(int(count or 1)):
        if nav.metadata()['episode_over']:
            print('episode_over'); sys.exit(0)
        result = nav.step(action)
        print({k: result[k] for k in ("actions", "episode_over")})
        if nav.metadata()['episode_over']:
            sys.exit(0)
