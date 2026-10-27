import sys
from supernav_nav_sdk import nav
names={'f':'move_forward','l':'turn_left','r':'turn_right','s':'stop'}
for token in sys.argv[1:]:
    action=names[token[0]]
    count=int(token[1:] or 1)
    for _ in range(count):
        if nav.metadata()['episode_over']:
            print('episode_over');sys.exit(0)
        result=nav.step(action)
        print({k:result[k] for k in ('actions','episode_over')})
