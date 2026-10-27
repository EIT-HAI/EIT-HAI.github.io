'use strict';
(() => {
  const ui={
    en:{
      track:'CoRL 2026 Late-Breaking Results',title:'Thea: Towards the Harness of Embodied Agents',subtitle:'Revisited after GPT-6 Astra',affiliation:'HAI Lab · Eastern Institute of Technology, Ningbo',abstractLabel:'Abstract.',
      abstract:'Thea carried the harness paradigm of coding agents into the physical world by adding a persistent readable world state and a verifiable judgment of each action. With GPT-6 Astra operating a robot SDK inside a coding environment, we revisit tool granularity and ask which harness components come from the model, the coding harness, or the physical-world layer.',
      shortThea:'Thea',shortTools:'Tools',shortHarness:'Harness',shortRemains:'What remains',theaTitle:'Thea: A Harness for the Physical World',figureOne:'Figure 1',
      theaIntro:'The physical world withholds two things that software grants for free. Thea adds both to the agent loop.',worldGapTitle:'Readable world state',worldGapText:'Scene Graph as Context turns local observations into persistent symbols that can be briefed before the next decision.',outcomeGapTitle:'Verifiable outcomes',outcomeGapText:'Evaluation as Exit Codes checks a tool’s post-condition and returns a reason when recovery is needed.',figureOneCaption:'Tools, a persistent scene graph, and an independent evaluator close the physical-world loop.',
      toolsTitle:'Revisiting the Tools',robotSetup:'Astribot S1 · Left parallel gripper',directControlTitle:'Direct SDK control',robotIntro:'We tested Astribot S1’s left parallel gripper on four tasks. They cover tabletop cleanup, manipulation after moving the base, drawer retrieval, and loaded transfer.',
      harnessTitle:'Revisiting the Harness',harnessSetup:'Model · coding harness · physical-world layer',harnessIntro:'Codex supplies the write–run–read–fix loop, tool execution and files. The record below is organized around the four physical-world mechanisms discussed in the paper.',worldStateTitle:'World state and memory',worldStateIntro:'Each of the 18 simulation runs pairs its complete saved-observation replay with that run’s own sanitized observable agent trace.',
      outcomeTitle:'Outcome checking',outcomeIntro:'A reached motion target is not a successful grasp. The wrist rose 7.58 mm while the cup remained supported.',bodyTitle:'Body limits and safety',bodyIntro:'Observed hand landmarks and the URDF projection expose the gap between the installed body model and the Revo2 hand.',skillsTitle:'Skills and reusable files',skillsIntro:'Each navigation run exposes its saved final workspace in the run index above. These files document the displayed runs; they are not a substitute for the separate robot-workspace evidence behind the paper’s cross-task reuse claim.',supplementaryLabel:'Supplementary',revoTitle:'Additional Revo2 trials',revoIntro:'The remaining Revo2 evidence is retained here, including unsuccessful lifts and the recording gaps in Stage 06.',revoSetup:'Astribot S1 · Revo2 right hand · Same empty plastic cup',
      remainsTitle:'What Changes and What Remains',remainsIntro:'The two gaps remain: the runs still had to re-sense the world and judge their own outcomes. What changes is the responsibility carried around the model.',changeToolTitle:'Tool granularity blurs downward',changeToolText:'The model can write motion segments directly against the SDK, so the model–tool line is no longer fixed.',changeProfileTitle:'The Embodiment Profile does more work',changeProfileText:'Kinematic limits, workspace and calibration become explicit when they are no longer hidden inside a policy.',changeSafetyTitle:'Safety moves into the harness',changeSafetyText:'Lower-level commands require heavier workspace bounds, collision checks and force limits.',changeEvalTitle:'Evaluation precedes physical-world self-improvement',changeEvalText:'Robot experience cannot become a reliable signal until the physical world has an equivalent of exit codes and unit tests.',
      completed:'Completed',incomplete:'Not completed',details:'Task & result',run:'Run',astra:'Astra',graph:'Astra + scene graph',eval:'Navigation evaluator condition',trace:'Trace ↗',savedImage:'Saved image',finalImage:'View final state',recordingDetails:'Recording details',
      revoNote:'5B shows two views of one hold. Stage 06 uses label-free derivatives of the same transfer; the complete clean playback removes 13 editorial placeholder cards and jumps directly across those unrecorded intervals. No motion is synthesized.',navigationNote:'The multi-view replay includes every saved observation in order. Each observation is held for one second; no intermediate motion is interpolated, and playback is not execution time.',lhprNote:'LHPR saved front, left and right views; no rear view was recorded. This is ordered-navigation execution, and the original instruction is retained above.',footer:'HAI Lab · Eastern Institute of Technology, Ningbo',backTop:'Back to top ↑',shareNote:'Offline sharing copy. Workspace observation images are not included.'
    },
    zh:{
      track:'CoRL 2026 Late-Breaking Results',title:'Thea：面向具身智能体的 Harness',subtitle:'在 GPT-6 Astra 之后重新审视',affiliation:'HAI Lab · 宁波东方理工大学',abstractLabel:'摘要。',
      abstract:'Thea 将 coding agent 的 harness 范式带入物理世界，补上持续可读的世界状态与每次动作的可验证判断。现在，GPT-6 Astra 可以在 coding environment 中直接操作机器人 SDK；我们据此重新审视工具粒度，以及各项 harness 机制究竟由模型、coding harness 还是物理世界层提供。',
      shortThea:'Thea',shortTools:'工具',shortHarness:'Harness',shortRemains:'变化与保留',theaTitle:'Thea：物理世界的 Harness',figureOne:'Figure 1',theaIntro:'软件世界默认提供、而物理世界缺少两样东西。Thea 将二者补入 agent 循环。',worldGapTitle:'可读的世界状态',worldGapText:'Scene Graph as Context 将局部观测转为持久符号，在下一次决策前重新注入。',outcomeGapTitle:'可验证的动作结果',outcomeGapText:'Evaluation as Exit Codes 根据工具后置条件核验结果，并在需要恢复时返回原因。',figureOneCaption:'工具、持久场景图与独立 evaluator 共同闭合物理世界中的 agent 循环。',
      toolsTitle:'重新审视工具',robotSetup:'Astribot S1 · 左侧平行夹爪',directControlTitle:'直接 SDK 控制',robotIntro:'使用 Astribot S1 左侧平行夹爪完成四项任务，覆盖固定站位收纳、移动后操作、抽屉取物与载物搬运。',harnessTitle:'重新审视 Harness',harnessSetup:'模型 · coding harness · 物理世界层',harnessIntro:'Codex 提供 write–run–read–fix 循环、工具执行与文件。下方记录按论文讨论的四项物理世界机制组织。',worldStateTitle:'世界状态与记忆',worldStateIntro:'18 次仿真运行逐条展示完整的已保存 observation 回放，并与各自经清理的可观测 agent 数据流同步。',
      outcomeTitle:'结果核验',outcomeIntro:'运动到达目标并不等于抓取成功。腕部上升 7.58 mm，但杯子仍由支撑面承托。',bodyTitle:'身体限制与安全',bodyIntro:'观测到的手部关键点与 URDF 投影揭示了已安装身体模型和 Revo2 手之间的偏差。',skillsTitle:'Skill 与可复用文件',skillsIntro:'上方每条导航索引都可展开其最终 Workspace。这些文件只记录所展示的导航运行，不能替代论文中跨实机任务复用的独立 Workspace 证据。',supplementaryLabel:'补充证据',revoTitle:'其他 Revo2 实验',revoIntro:'其余 Revo2 证据保留在此，包括未能抬起杯子的尝试，以及 Stage 06 的真实缺录区间。',revoSetup:'Astribot S1 · Revo2 右手 · 同一空塑料杯',
      remainsTitle:'什么改变，什么保留',remainsIntro:'两个缺口没有改变：运行仍需重新感知世界并自行判断结果。改变的是模型周围各层承担的责任。',changeToolTitle:'工具粒度向下模糊',changeToolText:'模型可以直接针对 SDK 编写运动片段，模型与工具的分界不再固定。',changeProfileTitle:'Embodiment Profile 承担更多',changeProfileText:'当运动学限制、工作空间与标定不再藏在策略内部，它们必须显式暴露。',changeSafetyTitle:'安全移入 Harness',changeSafetyText:'更低层的指令需要更严格的工作空间约束、碰撞检查与力限。',changeEvalTitle:'Evaluator 是物理世界自我改进的前提',changeEvalText:'物理经验只有在拥有类似 exit code 和单元测试的判断机制后，才能成为可靠信号。',
      completed:'已完成',incomplete:'未完成',details:'任务与结果',run:'运行',astra:'Astra',graph:'Astra + 场景图',eval:'导航评估条件',trace:'数据流 ↗',savedImage:'保存的原图',finalImage:'查看最终状态',recordingDetails:'录像说明',revoNote:'5B 两个视角来自同一次保持。06 使用同一次搬运的无烧字派生版；完整 clean 版直接剪去 13 个缺录占位卡，在缺录处跳切，不补帧或合成动作。',navigationNote:'多视角回放按顺序包含这次运行的全部已保存 observation。每个 observation 保持一秒，不插入中间运动，播放时长也不等于执行时长。',lhprNote:'LHPR 只保存了前、左、右视角，没有后视角。这里执行的是顺序导航，并保留原始任务指令。',footer:'HAI Lab · 宁波东方理工大学',backTop:'返回顶部 ↑',shareNote:'离线分享版不包含 Workspace 观测原图。'
    }
  };

  let lang='en';
  const bindings=[];
  const assetURL=source=>typeof window.embeddedAssetURL==='function'?window.embeddedAssetURL(source):source;
  const node=(tag,className)=>{const element=document.createElement(tag);if(className)element.className=className;return element;};
  const text=(element,en,zh)=>{bindings.push({element,en,zh});element.textContent=lang==='en'?en:zh;return element;};
  const phrase=(tag,key,className)=>text(node(tag,className),ui.en[key],ui.zh[key]);

  function attachVideo(video,source){
    if(typeof window.prepareEmbeddedVideo==='function')window.prepareEmbeddedVideo(video,source);
    else{video.preload='metadata';video.src=source;}
  }
  function media(item){
    const figure=node('figure','media-item'),frame=node('div','media-frame');
    if(item.type==='video'){
      const video=node('video');video.controls=true;video.playsInline=true;attachVideo(video,item.src);if(item.poster)video.poster=assetURL(item.poster);video.setAttribute('aria-label',item.en);frame.append(video);
    }else{
      const button=node('button'),image=node('img');button.type='button';image.src=assetURL(item.src);image.alt=item.en;image.loading='lazy';image.width=item.width||1280;image.height=item.height||720;button.append(image);
      button.addEventListener('click',()=>{const dialog=document.getElementById('image-viewer'),large=document.getElementById('large-image');large.src=assetURL(item.src);large.alt=lang==='en'?item.en:item.zh;document.getElementById('large-caption').textContent=lang==='en'?item.en:item.zh;dialog.showModal();});frame.append(button);
    }
    figure.append(frame);const caption=node('figcaption','media-caption');caption.append(text(node('span'),item.en,item.zh));figure.append(caption);return figure;
  }
  function experiment(item,family){
    const article=node('article','experiment');article.dataset.experiment=`${family}-${item.id}`;
    const head=node('div','experiment-head'),number=node('span','trial-id');number.textContent=item.id;head.append(number,text(node('h3'),item.title.en,item.title.zh));article.append(head);
    if(item.task)article.append(text(node('p','task'),item.task.en,item.task.zh));
    const set=node('div','media-set'+(item.media.length>1?' multiple':''));item.media.forEach(entry=>set.append(media(entry)));article.append(set);
    const result=node('p','result');result.append(text(node('span'),item.result.en,item.result.zh));article.append(result);
    if(item.id==='5B'||item.id==='06'){const notes=node('details','run-details');notes.append(phrase('summary','recordingDetails'),phrase('p','revoNote'));article.append(notes);}
    if(family==='robot'){const link=text(node('a','final-image'),ui.en.finalImage,ui.zh.finalImage);link.href=assetURL(item.media[0].poster);link.target='_blank';link.rel='noopener';article.append(link);}
    return article;
  }

  document.getElementById('harness-overview').src=assetURL('assets/images/thea-overview.png');
  window.EXPERIMENTS.robot.forEach(item=>document.getElementById('robot-grid').append(experiment(item,'robot')));
  window.EXPERIMENTS.revo.forEach(item=>{
    const target=item.id==='02'?'revo-outcome-grid':item.id==='04'?'revo-body-grid':'revo-supp-grid';
    document.getElementById(target).append(experiment(item,'revo'));
  });

  const order={astra:0,graph:1,eval:2};
  [...window.EXPERIMENTS.navigation].sort((a,b)=>order[a.condition]-order[b.condition]||a.rank-b.rank).forEach(run=>{
    const article=node('article','nav-card');article.dataset.run=run.id;
    const stream=node('div','context-stream context-stream-inline');stream.dataset.contextRun=run.id;stream.setAttribute('aria-live','off');article.append(stream);
    const native=node('div','native-result'),episode=node('span');episode.textContent=`Episode ${run.episode.split('_').at(-1)}`;native.append(episode,phrase('span',run.success?'completed':'incomplete','status'+(run.success?'':' incomplete')));article.append(native);
    const metrics=node('div','metrics'),stages=node('span'),actions=node('span');text(stages,`Stages ${run.stages}/${run.total}`,`阶段 ${run.stages}/${run.total}`);text(actions,`${run.actions} actions`,`${run.actions} 动作`);metrics.append(stages,actions);article.append(metrics);
    const details=node('details','run-details');details.append(phrase('summary','details'));const instruction=node('p');instruction.textContent=run.instruction;instruction.lang='en';details.append(instruction);const stop=node('p','stop-reason');stop.textContent=run.stop;const id=node('p','episode');id.textContent=run.episode;details.append(stop,id,phrase('p','navigationNote'));if(run.family==='lhpr')details.append(phrase('p','lhprNote'));const original=text(node('a','source-image'),ui.en.savedImage,ui.zh.savedImage);original.href=assetURL(run.image);original.target='_blank';original.rel='noopener';details.append(original);article.append(details);
    const workspace=window.createWorkspace(run);if(workspace)article.append(workspace);
    document.getElementById(run.family==='lhpr'?'lhpr-grid':'supernav-grid').append(article);
  });

  document.querySelectorAll('[data-i18n]').forEach(element=>{const key=element.dataset.i18n;if(ui.en[key]!=null&&ui.zh[key]!=null)bindings.push({element,en:ui.en[key],zh:ui.zh[key]});});
  function applyLanguage(next){
    lang=next;document.documentElement.lang=lang==='zh'?'zh-CN':'en';bindings.forEach(binding=>binding.element.textContent=binding[lang]);
    document.getElementById('harness-overview').alt=lang==='zh'?'Thea harness：工具、场景图与 evaluator':'The Thea harness with tools, scene graph and evaluator';
    document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===lang)));document.dispatchEvent(new Event('languagechange'));
  }
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang)));
  const dialog=document.getElementById('image-viewer');document.getElementById('close-image').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));
  applyLanguage(lang);
})();
