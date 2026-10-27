import json, math, sys
from supernav_nav_sdk import nav
P='scene_graph.json'
def read():
 with open(P) as f: return json.load(f)
def save(g):
 with open(P,'w') as f: json.dump(g,f,indent=2)
def act(actions):
 g=read()
 for a in actions:
  if nav.metadata()['episode_over']: break
  r=nav.step(a); print({k:r[k] for k in ('actions','episode_over','stop_executed','evaluation','evaluation_gate_passed') if k in r})
  n=nav.metadata()['actions']; p=g['agent_belief']; t=p['heading_degrees']
  if a=='turn_left':p['heading_degrees']=(t+30)%360
  if a=='turn_right':p['heading_degrees']=(t-30)%360
  if a=='move_forward':
   p['position'][0]+=0.25*math.cos(math.radians(t));p['position'][1]+=0.25*math.sin(math.radians(t));p['uncertainty_m']+=0.04
  g['action_history'].append({'action':n,'command':a,'nominal_position':p['position'][:],'heading':p['heading_degrees']})
  g['updated_at_action']=n;save(g)
  if r.get('episode_over'): break
if __name__=='__main__':act(sys.argv[1:])
