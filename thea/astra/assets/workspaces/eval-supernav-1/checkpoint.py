import json,sys
from supernav_nav_sdk import nav
idx=int(sys.argv[1]);r=nav.review_target(idx);print(r,flush=True)
p='scene_graph.json';g=json.load(open(p));g.setdefault('controller_reviews',[]).append({'target':idx,'action':nav.metadata()['actions'],'result':r});json.dump(g,open(p,'w'),indent=2)
