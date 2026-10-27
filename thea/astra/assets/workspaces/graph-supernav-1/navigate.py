import json, math, sys
from pathlib import Path
from supernav_nav_sdk import nav
P=Path('scene_graph.json')
def read(): return json.loads(P.read_text())
def save(g): P.write_text(json.dumps(g,indent=2))
def node(g,id,category,description,position,ref,uncertainty=0.8):
    n=g['world']['nodes'].get(id,{'id':id,'image_refs':[]})
    n.update(category=category,description=description,position=position,uncertainty_m=uncertainty,updated_at_action=g['updated_at_action'])
    if ref and ref not in n['image_refs']: n['image_refs']=(n['image_refs']+[ref])[-5:]
    g['world']['nodes'][id]=n

def ref(folder,camera,action): return {'image':f'images/{folder}/{camera}.png','camera':camera,'action':action}
if __name__=='__main__':
    g=read()
    for token in sys.argv[1:]:
        action={'f':'move_forward','l':'turn_left','r':'turn_right','s':'stop'}[token]
        m=nav.metadata()
        if m['episode_over']:
            print(json.dumps(m));break
        result=nav.step(action)
        p=g['localization']; before=p['position'].copy()
        if token in ('l','r'): p['yaw_degrees']=(p['yaw_degrees']+(30 if token=='l' else -30))%360
        if token=='f':
            yaw=math.radians(p['yaw_degrees']);p['position'][0]+=0.25*math.cos(yaw);p['position'][1]+=0.25*math.sin(yaw)
            p['uncertainty_m']+=0.04;p['status']='dead-reckoning hypothesis; requires RGB verification'
        g['updated_at_action']=result.get('actions',m['actions']+1)
        g['action_history'].append({'action':g['updated_at_action'],'command':action,'nominal_start':before,'nominal_end':p['position'].copy(),'yaw':p['yaw_degrees'],'displacement_confirmed':False if token=='f' else None})
        save(g);print(json.dumps({k:result[k] for k in ('actions','episode_over') if k in result}))
        if result.get('episode_over'):break
