import json, math, sys
from pathlib import Path
from supernav_nav_sdk import nav

P=Path('scene_graph.json')
if not P.exists():
    P.write_text(json.dumps({'frame':{'origin':'episode start','axes':'+x initially forward; +y initially left; +z up','units':'metres'},'updated_at_action':0,'agent':{'position':[0,0,0],'yaw_degrees':0,'uncertainty_m':0.2,'note':'Dead reckoning is provisional and checked against RGB; commanded translations are not measured.'},'nodes':[],'relations':[],'targets':[{'order':i+1,'description':s,'candidate_ids':[],'selected_id':None,'identity':{'state':'unresolved','evidence':[],'contradictions':[]},'arrival':{'state':'unresolved','evidence':[]},'unchecked_alternatives':[]} for i,s in enumerate(['black upright piano with purple flowers beside white chaise','sleek white lounge chair near side table and window','tan modern accent chair next to glass cabinet','white cushioned armchair next to coffee table and shelves','green slender-branched plant on coffee table near sofa'])],'action_history':[],'observations':[]},indent=2))

def read(): return json.loads(P.read_text())
def save(g): P.write_text(json.dumps(g,indent=2))
def act(seq):
    g=read()
    for a in seq:
        if nav.metadata()['episode_over']: break
        r=nav.step(a)
        p=g['agent']; before=p['position'][:]
        if a=='turn_left':p['yaw_degrees']=(p['yaw_degrees']+30)%360
        elif a=='turn_right':p['yaw_degrees']=(p['yaw_degrees']-30)%360
        elif a=='move_forward':
            t=math.radians(p['yaw_degrees']);p['position'][0]+=0.25*math.cos(t);p['position'][1]+=0.25*math.sin(t);p['uncertainty_m']+=0.025
        g['updated_at_action']=r.get('actions',g['updated_at_action']+1)
        g['action_history'].append({'action':g['updated_at_action'],'command':a,'provisional_position':p['position'][:],'yaw':p['yaw_degrees']})
        save(g)
        if r.get('episode_over'):break
    print(json.dumps({'metadata':nav.metadata(),'agent':g['agent']}))

def node(id,category,description,position,ref,uncertainty=0.7):
    g=read(); n=next((n for n in g['nodes'] if n['id']==id),None)
    if n is None:
        n={'id':id,'category':category,'description':description,'position':position,'uncertainty_m':uncertainty,'observation_action_refs':[],'image_refs':[]};g['nodes'].append(n)
    n.update(description=description,position=position,uncertainty_m=uncertainty)
    if ref not in n['image_refs']:n['image_refs']=(n['image_refs']+[ref])[-5:]
    n['observation_action_refs'].append(ref['action']);save(g)

if __name__=='__main__':
    mapping={'f':'move_forward','l':'turn_left','r':'turn_right','s':'stop'}
    act([mapping[c] for c in sys.argv[1] if c in mapping])
