import json
p='scene_graph.json'
g=json.load(open(p))
def ev(folder,cam,a,note=None):
 d={'image':f'images/{folder}/{cam}.png','camera':cam,'action':a}
 if note:d['note']=note
 return d
def node(id,category,description,pos,obs,uncertainty='Approximate RGB/action-history estimate; about 1 m positional uncertainty'):
 n={'id':id,'category':category,'description':description,'position':pos,'uncertainty':uncertainty,'observations':obs}
 g['nodes']=[x for x in g['nodes'] if x['id']!=id]+[n]
node('living_room','room','Vaulted wood ceiling, stone fireplace with TV, white sofa',[-3,2,0],[ev('observe-vzqwhl57','left',16)])
node('kitchen','room','Wood cabinets, hood, tile backsplash and island beyond broad opening',[-2.5,7,0],[ev('observe-g9iizyxe','front',24)])
node('kitchen_opening','passage','Broad open connection beside white half wall',[-1,5,0],[ev('observe-g9iizyxe','left',24)])
node('kitchen_island','counter','Wood island with cross-braced end and dark countertop',[-3,6.5,1],[ev('observe-g9iizyxe','left',24)])
node('plant_kitchen','decorative_plant','Yellow/orange foliage or floral arrangement in a light pot on kitchen counter',[-3,7,1.3],[ev('observe-g9iizyxe','left',24)])
node('sofa_console','table','Narrow dark console behind the white sofa',[-3,2.7,.8],[ev('observe-vzqwhl57','left',16)])
g['edges']=[{'subject':'plant_kitchen','relation':'in','object':'kitchen'},{'subject':'plant_kitchen','relation':'on','object':'kitchen_island'},{'subject':'kitchen_island','relation':'in','object':'kitchen'},{'subject':'sofa_console','relation':'in','object':'living_room'},{'subject':'living_room','relation':'connected_to','object':'kitchen','via':'kitchen_opening'}]
g['agent_belief']={'position':[-.75,4.55,0],'heading_degrees':90,'uncertainty':'Nominal travel consistent with changing RGB; +/-0.5 m, not measured'}
g['targets'][0]['candidate_ids']=['plant_kitchen']
g['targets'][0]['identity']['evidence']=[ev('observe-g9iizyxe','left',24,'Plantlike yellow arrangement on counter in visually identified kitchen; closer inspection needed')]
g['targets'][1]['candidate_ids']=['sofa_console']
g['unchecked_alternatives']=['Inspect kitchen arrangement at close range','Other living room tables not yet viewed','Remote not located']
g['action_history']=[{'action':i,'primitive':'turn_left'} for i in (1,2,3)]+g['action_history']
json.dump(g,open(p,'w'),indent=2)
