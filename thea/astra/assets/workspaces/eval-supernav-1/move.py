import json,sys,math
from supernav_nav_sdk import nav
p='scene_graph.json'
g=json.load(open(p))
for a in sys.argv[1:]:
    m=nav.metadata()
    if m['episode_over']:
        print(m);break
    r=nav.step(a);print({k:v for k,v in r.items() if k not in ['instruction','benchmark','run_id','episode_id']},flush=True)
    g['action_history'].append({'action':m['actions']+1,'command':a})
    pose=g['agent_belief']
    if a=='turn_left':pose['yaw_degrees']+=30
    elif a=='turn_right':pose['yaw_degrees']-=30
    elif a=='move_forward':
        t=math.radians(pose['yaw_degrees']);pose['position'][0]+=0.25*math.cos(t);pose['position'][1]+=0.25*math.sin(t)
        pose['uncertainty_m']+=0.03
        pose['motion_status']='nominal displacement pending RGB confirmation'
    g['updated_at_action']=nav.metadata()['actions']
    json.dump(g,open(p,'w'),indent=2)
    if r.get('episode_over'):break
