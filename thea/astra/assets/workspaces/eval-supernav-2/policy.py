import json, math, sys
from supernav_nav_sdk import nav
from pathlib import Path
P=Path('scene_graph.json')
if not P.exists():
 g={'frame':{'origin':'start','axes':'+x initially forward, +y initially left, +z up','units':'metres'},'pose_belief':{'position':[0,0,0],'yaw_degrees':0,'uncertainty_m':0.3},'updated_at_action':0,'nodes':[],'relations':[],'targets':[{'index':i,'candidate_ids':[],'selected_id':None,'identity':{'state':'unresolved','evidence':[],'contradictions':[]},'arrival':{'state':'unresolved','evidence':[]}} for i in range(1,6)],'action_history':[],'notes':[]}
 P.write_text(json.dumps(g,indent=2))
def actions(seq):
 g=json.loads(P.read_text())
 for a in seq:
  r=nav.step(a); print(json.dumps({k:v for k,v in r.items() if k in ("actions","episode_over","evaluation","evaluation_gate_passed","stop_executed")}),flush=True)
  if r.get('episode_over'): break
  p=g['pose_belief']; yaw=p['yaw_degrees']
  if a=='turn_left':p['yaw_degrees']=(yaw+30)%360
  elif a=='turn_right':p['yaw_degrees']=(yaw-30)%360
  elif a=='move_forward':
   p['position'][0]+=0.25*math.cos(math.radians(yaw)); p['position'][1]+=0.25*math.sin(math.radians(yaw));p['uncertainty_m']+=0.04
  g['updated_at_action']=r.get('actions',g['updated_at_action']+1)
  g['action_history'].append({'action':g['updated_at_action'],'command':a,'pose_nominal':p['position'][:]})
  P.write_text(json.dumps(g,indent=2))
if __name__=='__main__':
 seq=[]
 for arg in sys.argv[1:]:
  k,n=arg.split(':');seq += [{'f':'move_forward','l':'turn_left','r':'turn_right'}[k]]*int(n)
 actions(seq)
