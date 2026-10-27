import json
from pathlib import Path
P=Path('scene_graph.json')
def save(g): P.write_text(json.dumps(g,indent=2))
def read(): return json.loads(P.read_text())
def ref(path,camera,action): return {'image':path,'camera':camera,'action':action}
g={'frame':{'origin':'start','axes':{'+x':'initially forward','+y':'initially left','+z':'up'}},'updated_at_action':0,'pose_estimate':{'position':[0,0,0],'heading_degrees':0,'uncertainty_m':0.2},'nodes':[{'id':'hall1','category':'hallway','description':'Narrow wood-floor corridor at initial position','position':[0,0,0],'uncertainty_m':1,'observations':[ref('images/observe-a1_y1iaz/right.png','right',0)]}], 'relations':[], 'targets':[{'stage':i,'requested':s,'candidate_ids':[],'selected_id':None,'identity':{'state':'unresolved','evidence':[],'contradictions':[]},'arrival':{'state':'unresolved','evidence':[]},'unchecked_alternatives':[]} for i,s in enumerate(['bath towel in bedroom','laundry basket in bathroom','bag in kitchen'])], 'action_history':[]}
if not P.exists():save(g)
