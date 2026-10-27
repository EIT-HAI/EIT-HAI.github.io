import json,sys
from lhpr_nav_sdk import nav
p='scene_graph.json'
g=json.load(open(p))
for action in sys.argv[1:]:
    if nav.metadata()['episode_over']: break
    r=nav.step(action)
    g['action_history'].append({'action':r['actions'],'primitive':action})
    g['updated_at_action']=r['actions']
    g['episode_over']=r['episode_over']
    json.dump(g,open(p,'w'),indent=2)
    print(r)
    if r['episode_over']: break
