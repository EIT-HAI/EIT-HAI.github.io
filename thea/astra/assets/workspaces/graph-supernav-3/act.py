import sys, math
from supernav_nav_sdk import nav
from memory import read,save
mapping={'f':'move_forward','l':'turn_left','r':'turn_right','s':'stop'}
g=read()
for token in sys.argv[1:]:
 a=mapping[token[0]]; n=int(token[1:] or '1')
 for _ in range(n):
  m=nav.metadata()
  if m['episode_over']: print(m);save(g);raise SystemExit
  result=nav.step(a)
  h=g['agent']['heading_degrees']
  if a=='turn_left': g['agent']['heading_degrees']=(h+30)%360
  elif a=='turn_right': g['agent']['heading_degrees']=(h-30)%360
  elif a=='move_forward':
   g['agent']['position'][0]+=0.25*math.cos(math.radians(h));g['agent']['position'][1]+=0.25*math.sin(math.radians(h));g['agent']['uncertainty_m']+=0.025
  g['updated_at_action']=m['actions']+1
  g['action_history'].append({'action':g['updated_at_action'],'command':a,'position_hypothesis':g['agent']['position'][:],'heading':g['agent']['heading_degrees'],'translation_verified':False if a=='move_forward' else None})
  save(g)
  if isinstance(result,dict) and result.get('episode_over'):print(result);raise SystemExit
print(nav.metadata());print(g['agent'])
