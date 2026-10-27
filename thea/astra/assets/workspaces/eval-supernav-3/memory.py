from policy import read,save

def evidence(folder,cam,action,note):return {'image':f'images/{folder}/{cam}.png','camera':cam,'action':action,'note':note}
def observe_node(g,i,ref,position=None):
 n=next(n for n in g['nodes'] if n['id']==i)
 n['observations']=(n['observations']+[ref])[-5:]
 if position is not None:n['position']=position

def assess(g,index,i,ref,identity,arrival):
 t=g['target_assessments'][index-1];t['selected_id']=i
 if i not in t['candidate_ids']:t['candidate_ids'].append(i)
 t['identity']={'status':'supported','evidence':[dict(ref,note=identity)],'contradictions':[]}
 t['arrival']={'status':'supported','evidence':[dict(ref,note=arrival)]}
 t['self_assessment_only']=True
