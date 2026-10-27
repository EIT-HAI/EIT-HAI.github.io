import json, math
from pathlib import Path
P=Path('scene_graph.json')
def read(): return json.loads(P.read_text())
def save(g): P.write_text(json.dumps(g,indent=2))
def ref(folder,camera,action): return {'path':f'images/{folder}/{camera}.png','camera':camera,'action':action}
def node(g,id,category,description,position,uncertainty,refs):
 g['world']['nodes'][id]={'id':id,'category':category,'description':description,'position':position,'uncertainty':uncertainty,'observations':refs[-5:],'updated_at_action':g['updated_at_action']}
def evidence(folder,camera,action,text): return dict(ref(folder,camera,action),supports=text)
def assessment(g,n,field,status,ev): g['targets'][n-1][field]={'status':status,'evidence':ev,'contradictions':[]}
if not P.exists():
 g={'frame':{'origin':'episode start','axes':{'+x':'initial forward','+y':'initial left','+z':'up'},'units':'metres'},'updated_at_action':0,'agent':{'position':[0,0,0],'heading_degrees':0,'uncertainty_m':0.1,'note':'Start defined as origin; translations are action-derived hypotheses checked against RGB.'},'world':{'nodes':{},'relations':[]},'targets':[],'action_history':[],'localization_history':[],'plan':{'current_target':1,'unchecked_alternatives':['Other red house structures may match target 5; inspect geometry and shelves when returning.','Balloon wall, animal stool and toy train not yet located.']}}
 for i,s in enumerate(['curved light wood reception desk with mint green light strip','wall with hot air balloon and cloud stickers','dark green plush animal stool on wooden floor beside curved green sofa','colorful wooden toy train centered in play area','red wooden triangular playhouse in corner near shelves'],1):
  g['targets'].append({'order':i,'description':s,'candidate_ids':[],'selected_id':None,'identity':{'status':'unresolved','evidence':[],'contradictions':[]},'arrival':{'status':'unresolved','evidence':[],'contradictions':[]}})
 node(g,'main_room','room','Open children play/library room with wood floor',[3,0,1.5],{'radius_m':4},[ref('observe-1a3mt72n','front',0)])
 node(g,'wood_floor','floor','Continuous pale wooden floor',[2,-2,0],{'radius_m':6},[ref('observe-1a3mt72n','right',0)])
 node(g,'reception','desk','Curved pale wood reception with mint horizontal illuminated strip',[2.5,-4,0.5],{'radius_m':1.5},[ref('observe-1a3mt72n','right',0)])
 node(g,'red_house_1','playhouse','Red wooden enclosure with pitched interior and dessert chalkboard, immediately beside initial pose',[0,1.1,1.2],{'radius_m':1.0},[ref('observe-1a3mt72n','left',0),ref('observe-1a3mt72n','front',0)])
 node(g,'corner_shelves','shelves','Cream cubbies with teal divider and pink lower shelves',[-1,-0.8,1.5],{'radius_m':1},[ref('observe-1a3mt72n','back',0),ref('observe-1a3mt72n','right',0)])
 node(g,'wood_partition','partition','Pale wood wall with mint arched interior window',[0.8,-3,1.5],{'radius_m':1.0},[ref('observe-1a3mt72n','right',0)])
 node(g,'lounge_sofa','sofa','Green seating visible through partition arch',[0.8,-5,0.4],{'radius_m':2},[ref('observe-1a3mt72n','right',0)])
 g['world']['relations']=[{'subject':'main_room','relation':'in','object':'wood_floor'},{'subject':'reception','relation':'on','object':'wood_floor'},{'subject':'red_house_1','relation':'in','object':'main_room'},{'subject':'corner_shelves','relation':'in','object':'main_room'}]
 g['targets'][0]['candidate_ids']=['reception'];g['targets'][0]['selected_id']='reception'
 assessment(g,1,'identity','supported',[evidence('observe-1a3mt72n','right',0,'Pale wood curved counter and continuous mint light strip match target 1.')])
 g['targets'][4]['candidate_ids']=['red_house_1']
 save(g)
