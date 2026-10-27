import sys
from policy import read,save
from supernav_nav_sdk import nav
i=int(sys.argv[1]);r=nav.review_target(i) if i<5 else nav.step('stop')
print(r,flush=True)
g=read();g['review_history'].append({'target':i,'action':g['updated_at_action'],'result':r});save(g)
