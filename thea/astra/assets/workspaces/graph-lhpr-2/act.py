import sys, math
from lhpr_nav_sdk import nav
from episode_memory import read,save
G=read()
for a in sys.argv[1:]:
 if nav.metadata()['episode_over']:break
 r=nav.step(a)
 p=G['pose_estimate'];h=p['heading_degrees']
 if a=='turn_left':p['heading_degrees']=(h+30)%360
 if a=='turn_right':p['heading_degrees']=(h-30)%360
 if a=='move_forward':
  p['position'][0]+=0.25*math.cos(math.radians(h));p['position'][1]+=0.25*math.sin(math.radians(h));p['uncertainty_m']+=0.04
 G['updated_at_action']=r['actions'];G['action_history'].append({'action':r['actions'],'command':a,'position_is_nominal':True});save(G)
 print(r)
 if r['episode_over']:break
