import sys
from supernav_nav_sdk import nav
for arg in sys.argv[1:]:
    action, _, count = arg.partition(':')
    for _ in range(int(count or 1)):
        if nav.metadata()['episode_over']:
            print('episode_over'); sys.exit()
        result = nav.step({'f':'move_forward','l':'turn_left','r':'turn_right','s':'stop'}[action])
        print({k: result[k] for k in ('actions', 'episode_over') if k in result})
print(nav.metadata())
