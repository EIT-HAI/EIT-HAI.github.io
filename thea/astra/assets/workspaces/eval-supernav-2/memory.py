import json
P='scene_graph.json'
def load():return json.load(open(P))
def save(g):json.dump(g,open(P,'w'),indent=2)
def node(g,i,c,d,pos,obs,cam,action,u=1):
 n=next((n for n in g['nodes'] if n['id']==i),None)
 ref={'image':f'images/{obs}/{cam}.png','camera':cam,'action':action}
 if n:
  n.update(position=pos,description=d,uncertainty_m=u);n['observations']=(n['observations']+[ref])[-5:]
 else:g['nodes'].append({'id':i,'category':c,'description':d,'position':pos,'uncertainty_m':u,'observations':[ref]})
def rel(g,s,r,o,**kw):
 a={'subject':s,'relation':r,'object':o,**kw}
 if a not in g['relations']:g['relations'].append(a)
def assess(g,index,id,identity,arrival,obs,cam,action):
 t=g['targets'][index-1];t['candidate_ids']=list(set(t['candidate_ids']+[id]));t['selected_id']=id
 for k,txt in [('identity',identity),('arrival',arrival)]:
  if txt:t[k]={'state':'supported','evidence':[{'action':action,'image':f'images/{obs}/{cam}.png','statement':txt}],**({'contradictions':[]} if k=='identity' else {})}
