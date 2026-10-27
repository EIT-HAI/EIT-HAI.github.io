import json,sys,math
from lhpr_nav_sdk import nav
s=json.load(open('scene_graph.json'))
for a in sys.argv[1:]:
 r=nav.step(a);print(json.dumps(r))
 n=r['actions'];s['updated_at_action']=n
 s['action_history'].append({'action':n,'primitive':a,'executed':r.get('stop_executed',True)})
 p=s['agent_belief'];h=p['heading_degrees']
 if a=='turn_left':p['heading_degrees']=(h+30)%360
 elif a=='turn_right':p['heading_degrees']=(h-30)%360
 elif a=='move_forward':
  p['position'][0]+=0.25*math.cos(math.radians(h));p['position'][1]+=0.25*math.sin(math.radians(h));p['uncertainty_m']+=0.07
 p['position_basis']='Nominal action integration, subject to visual correction; forward motion unverified until observed'
 json.dump(s,open('scene_graph.json','w'),indent=2)
 if r.get('episode_over'):break
