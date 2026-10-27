import sys,json
from lhpr_nav_sdk import nav
p='scene_graph.json'
g=json.load(open(p))
for a in sys.argv[1:]:
    if nav.metadata()['episode_over']: break
    r=nav.step(a)
    print(r)
    m=nav.metadata()
    g['action_history'].append({'action':m['actions'],'command':a})
    g['updated_at_action']=m['actions']
    g['agent_belief']['uncertainty']='Motion is commanded, not measured; latest image must verify local geometry.'
    json.dump(g,open(p,'w'),indent=2)
    if m['episode_over']: break
