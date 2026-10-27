'use strict';
(() => {
  const ui={
    "en": {
      "track": "CoRL 2026 Late-Breaking Results",
      "title": "Thea: Towards the Harness of Embodied Agents",
      "subtitle": "Revisited after GPT-6 Astra",
      "affiliation": "HAI Lab · Eastern Institute of Technology, Ningbo",
      "abstractLabel": "Abstract.",
      "abstract": "Thea carried the harness paradigm of coding agents into the physical world by adding a persistent readable world state and a verifiable judgment of each action. With GPT-6 Astra operating a robot SDK inside a coding environment, we revisit tool granularity and ask which harness components come from the model, the coding harness, or the physical-world layer.",
      "shortTools": "Tools",
      "shortHarness": "Harness",
      "shortRemains": "What remains",
      "toolsTitle": "Revisiting the Tools",
      "robotSetup": "Astribot S1 · Left parallel gripper",
      "directControlTitle": "Direct SDK control",
      "robotIntro": "Can a coding agent control a robot without a prewritten pick-and-place skill? We gave GPT-6 Astra in Codex the Astribot S1 Python SDK and its documentation, with no Thea component, and asked it to perform the four left-gripper tasks below.",
      "harnessTitle": "Revisiting the Harness",
      "harnessSetup": "Model · coding harness · physical-world layer",
      "harnessIntro": "If the model can write robot-control code, what does a physical-world harness still need to provide? The following experiments separate four needs: remembering places, checking whether an action worked, keeping the body model accurate, and retaining reusable procedures. Codex supplies the execution loop and files; these experiments examine what those digital mechanisms do not guarantee in the physical world.",
      "worldStateTitle": "World state and memory",
      "worldStateIntro": "Does writing down rooms and routes help the agent navigate and revisit places? We compare Astra, Astra instructed to maintain scene-graph memory, and a navigation-evaluation condition: three runs per condition in each of two datasets, for 18 runs in total.",
      "outcomeTitle": "Outcome checking",
      "outcomeIntro": "Does a completed motion mean a successful grasp? No: in these Revo2 trials, the wrist reached its target while the cup stayed on its support. The distinction is between what the robot was commanded to do and what actually happened to the object.",
      "bodyTitle": "Body limits and safety",
      "bodyIntro": "Does installing a new hand also give the agent an accurate model of its body? Here it did not: after Revo2 was installed, the collision model still described the old parallel gripper. Even after calibration, changing the hand shape increased the landmark error.",
      "skillsTitle": "Skills and reusable files",
      "skillsIntro": "What can the agent retain instead of rebuilding it for every task? Across the four S1 left-gripper tasks, capture, localization, inverse-kinematics and collision-screening modules were reused as files. This is reuse of procedures on the same robot, not evidence of transfer to a different embodiment.",
      "supplementaryLabel": "Supplementary",
      "revoTitle": "Additional Revo2 trials",
      "revoIntro": "Did later attempts achieve more than wrist motion? These records show the same empty plastic cup progressing from failed lifts and a tilted grasp to an upright hold and one completed transfer. In that final transfer, the cup stood upright after release and hand withdrawal, with no in-trial manual reset. This is one demonstrated transfer, not a measured success rate; the full recording retains 13 cuts across unrecorded intervals.",
      "revoSetup": "Astribot S1 · Revo2 right hand · Same empty plastic cup",
      "remainsTitle": "What Changes and What Remains",
      "remainsIntro": "What changed is who writes the control stack: the model can now generate SDK-level procedures inside a coding harness. What did not change is the need to observe the world again, distinguish command completion from task success, and keep geometry aligned with the actual body. These demonstrations motivate the responsibilities below; they do not establish general safety or autonomous self-improvement.",
      "changeToolTitle": "Tool granularity blurs downward",
      "changeToolText": "The four S1 tasks show the model writing below a pick-and-place interface. A harness therefore needs to expose more than one level of robot control.",
      "changeProfileTitle": "The Embodiment Profile does more work",
      "changeProfileText": "The Revo2 mismatch shows why the exposed body model must track the installed hardware, its configuration and its calibration—not just a nominal robot description.",
      "changeSafetyTitle": "Safety moves into the harness",
      "changeSafetyText": "SDK-level commands leave workspace bounds, collision checks and force limits to the surrounding system. Task completion alone does not verify that safety layer.",
      "changeEvalTitle": "Evaluation precedes physical-world self-improvement",
      "changeEvalText": "The failed cup lifts show why motion completion is not a task-success signal. Reliable physical-world learning needs outcome checks whose accuracy can itself be tested.",
      "completed": "Completed",
      "incomplete": "Not completed",
      "details": "Task & result",
      "run": "Run",
      "astra": "Astra",
      "graph": "Astra + scene graph",
      "eval": "Navigation evaluator condition",
      "trace": "Trace ↗",
      "savedImage": "Saved image",
      "finalImage": "View final state",
      "recordingDetails": "Recording details",
      "revoNote": "5B shows two views of one hold. Stage 06 uses label-free derivatives of the same transfer; the complete clean playback removes 13 editorial placeholder cards and jumps directly across those unrecorded intervals. No motion is synthesized.",
      "navigationNote": "The multi-view replay includes every saved observation in order. Each observation is held for one second; no intermediate motion is interpolated, and playback is not execution time.",
      "lhprNote": "LHPR saved front, left and right views; no rear view was recorded. This is ordered-navigation execution, and the original instruction is retained above.",
      "footer": "HAI Lab · Eastern Institute of Technology, Ningbo",
      "backTop": "Back to top ↑",
      "shareNote": "Offline sharing copy. Workspace observation images are not included.",
      "robotMethod": "The agent registered head-camera RGB-D observations in the base frame, solved inverse kinematics against the SDK’s forward kinematics, screened joint samples for self-collision, and issued one motion segment at a time. Base movement used velocity pulses gated by lidar clearance.",
      "robotObservation": "The agent corrected early geometric errors and all four tasks reached the displayed final states: objects in the plate, a retrieved cube and closed drawer, and a loaded bowl delivered to the destination table. For these tasks, the model constructed control code rather than invoking a learned manipulation policy. The drawer video combines two sessions.",
      "worldStateMethod": "In graph-memory runs, room and route records were written to files and consulted later. The video, synchronized context stream and Workspace let you follow how new observations led to route choices and revisits. The graph is an estimate built within that run, not a supplied ground-truth map.",
      "worldStateObservation": "In HabitatGS/SuperNav, Astra completed 2 of 3 runs, instructed graph memory completed 3 of 3, and the navigation-evaluation condition completed 0 of 3. In LHPR-VLN, none of the nine runs completed. These small sets show a benefit in the first setting, not a solution to navigation in general. Labels retain each run’s original stopping criterion: reaching all stages without a valid completion/STOP is still not completion.",
      "outcomeMethod": "In two cup-rim attempts, the wrist rose about 7.58 mm but the cup remained on the plate. The agent used post-action images to reject those attempts and revise its grasp. Observing the object exposed a failure that SDK completion alone missed; the accuracy of these task-specific visual checks was not independently measured.",
      "bodyMethod": "Human-prompted checks compared observed hand-surface landmarks with calibrated model projections. At a fixed hand shape, local per-finger RMS errors were 1.35–2.20 mm; after slight closure, overall RMS was 5.26 mm, with a 9.57 mm maximum. A fit at one hand shape did not guarantee accuracy after motion, so calibration alone was not a safety guarantee.",
      "skillsMethod": "The Workspaces attached to the navigation runs provide a separate, inspectable record: helpers and scripts preserve procedures, while scene_graph.json, where present, preserves discovered world state. The provided, modified and new labels distinguish the starting interface from files left by the run. These final snapshots document navigation files; they are not the robot-module reuse evidence described above."
    },
    "zh": {
      "track": "CoRL 2026 Late-Breaking Results",
      "title": "Thea：面向具身智能体的 Harness",
      "subtitle": "在 GPT-6 Astra 之后重新审视",
      "affiliation": "HAI Lab · 宁波东方理工大学",
      "abstractLabel": "摘要。",
      "abstract": "Thea 将 coding agent 的 harness 范式带入物理世界，补上持续可读的世界状态与每次动作的可验证判断。现在，GPT-6 Astra 可以在 coding environment 中直接操作机器人 SDK；我们据此重新审视工具粒度，以及各项 harness 机制究竟由模型、coding harness 还是物理世界层提供。",
      "shortTools": "工具",
      "shortHarness": "Harness",
      "shortRemains": "变化与保留",
      "toolsTitle": "重新审视工具",
      "robotSetup": "Astribot S1 · 左侧平行夹爪",
      "directControlTitle": "直接 SDK 控制",
      "robotIntro": "不提供预先写好的抓取、放置技能，coding agent 能否直接控制机器人？我们将 Astribot S1 的 Python SDK 与文档交给运行在 Codex 中的 GPT-6 Astra，不加入 Thea 组件，让它执行下方四项左夹爪任务。",
      "harnessTitle": "重新审视 Harness",
      "harnessSetup": "模型 · coding harness · 物理世界层",
      "harnessIntro": "如果模型已经能写机器人控制代码，物理世界的 harness 还需要提供什么？下方实验分别检查四件事：记住去过的地方、判断动作是否奏效、保持身体模型准确，以及保留可复用的操作过程。Codex 提供执行循环与文件；这些实验关注的是，这些数字环境机制不能自动保证哪些物理结果。",
      "worldStateTitle": "世界状态与记忆",
      "worldStateIntro": "把房间与路线写下来，能否帮助 Agent 导航并返回去过的地方？我们比较 Astra、指示 Astra 维护场景图记忆、导航评估三种条件；两个数据集的每种条件各保留三次运行，共 18 次。",
      "outcomeTitle": "结果核验",
      "outcomeIntro": "运动执行完成，就意味着抓取成功吗？这些 Revo2 试验给出的答案是否定的：腕部到达了运动目标，杯子却仍留在支撑面上。机器人完成了指令，不等于物体达到了任务要求的状态。",
      "bodyTitle": "身体限制与安全",
      "bodyIntro": "换装新手之后，Agent 是否也拥有准确的新身体模型？这次并没有：安装 Revo2 后，碰撞模型仍描述旧平行夹爪。即使重新标定，手型变化后，参考点的几何误差仍明显增大。",
      "skillsTitle": "Skill 与可复用文件",
      "skillsIntro": "哪些经验可以留下来，而不必每次从头重写？在四项 S1 左夹爪任务之间，采集、定位、逆运动学与碰撞筛查模块以文件形式得到复用。这是在同一机器人上的操作过程复用，不是向不同身体迁移的证据。",
      "supplementaryLabel": "补充证据",
      "revoTitle": "其他 Revo2 实验",
      "revoIntro": "后续尝试是否真的改变了杯子的状态，而不只是移动腕部？这些记录展示同一个空塑料杯从未成功试抬、包握后倾斜，到直立保持和一次完整搬运。最终搬运没有轮内人工复位，释放并退手后杯子独立直立。这里展示一次完成记录，不代表测得的成功率；完整录像在 13 处真实缺录区间跳切。",
      "revoSetup": "Astribot S1 · Revo2 右手 · 同一空塑料杯",
      "remainsTitle": "什么改变，什么保留",
      "remainsIntro": "改变的是谁来写控制栈：模型现在可以在 coding harness 中生成 SDK 层的操作过程。不变的是，执行后仍要重新观察世界，区分指令完成与任务成功，并让几何模型对应真实身体。这些演示引出下方的 harness 职责，但不构成通用安全或自主自我改进的证明。",
      "changeToolTitle": "工具粒度向下模糊",
      "changeToolText": "四项 S1 任务展示模型在抓取、放置接口之下编写控制代码。因此，harness 需要暴露不止一个层级的机器人控制接口。",
      "changeProfileTitle": "Embodiment Profile 承担更多",
      "changeProfileText": "Revo2 的模型错配说明，显式身体模型需要对应实际安装的硬件、当前构型与标定，而不能只保留一个名义上的机器人描述。",
      "changeSafetyTitle": "安全移入 Harness",
      "changeSafetyText": "SDK 层指令把工作空间约束、碰撞检查与力限留给外围系统。仅凭任务完成，不能验证这层安全机制。",
      "changeEvalTitle": "Evaluator 是物理世界自我改进的前提",
      "changeEvalText": "未成功的杯子试抬说明，运动完成不能直接作为任务成功信号。要从物理经验中可靠地学习，需要连核验本身的准确性也可以检验。",
      "completed": "已完成",
      "incomplete": "未完成",
      "details": "任务与结果",
      "run": "运行",
      "astra": "Astra",
      "graph": "Astra + 场景图",
      "eval": "导航评估条件",
      "trace": "数据流 ↗",
      "savedImage": "保存的原图",
      "finalImage": "查看最终状态",
      "recordingDetails": "录像说明",
      "revoNote": "5B 两个视角来自同一次保持。06 使用同一次搬运的无烧字派生版；完整 clean 版直接剪去 13 个缺录占位卡，在缺录处跳切，不补帧或合成动作。",
      "navigationNote": "多视角回放按顺序包含这次运行的全部已保存 observation。每个 observation 保持一秒，不插入中间运动，播放时长也不等于执行时长。",
      "lhprNote": "LHPR 只保存了前、左、右视角，没有后视角。这里执行的是顺序导航，并保留原始任务指令。",
      "footer": "HAI Lab · 宁波东方理工大学",
      "backTop": "返回顶部 ↑",
      "shareNote": "离线分享版不包含 Workspace 观测原图。",
      "robotMethod": "Agent 将头部相机的 RGB-D 观测配准至底盘坐标系，依据 SDK 的正向运动学求解逆运动学，对关节采样进行自碰撞筛查，并逐段发送运动指令。底盘使用受激光雷达净空约束的速度脉冲移动。",
      "robotObservation": "Agent 修正了执行早期的几何错误，四项任务均达到下方展示的最终状态：物体放入盘内、方块取出且抽屉关闭、装有方块的碗运到目标桌。对这些任务，模型编写了控制代码，而不是调用学习得到的操作策略。抽屉视频由两次会话拼接。",
      "worldStateMethod": "在场景图记忆条件中，房间与路线被写入文件，并在后续导航中查询。结合视频、同步 context 数据流与 Workspace，可以看到新观测如何影响选路和返回。场景图是本次运行中建立的估计，不是预先提供的真实地图。",
      "worldStateObservation": "HabitatGS/SuperNav 中，Astra 完成 2/3，场景图记忆条件完成 3/3，导航评估条件完成 0/3；LHPR-VLN 的九次运行均未完成。这组小规模记录显示前一种场景中的收益，并不意味着导航问题已普遍解决。完成标签保留原始停止规则：即使所有阶段均已到达，没有有效的完成判定或 STOP 仍记为未完成。",
      "outcomeMethod": "两次杯沿试抬中，腕部均上升约 7.58 mm，杯子却仍留在盘上。Agent 根据动作后的图像否定这些尝试，并调整抓取。重新观察物体暴露了 SDK 完成状态无法反映的失败；这些任务特定视觉检查的准确率没有经过独立测量。",
      "bodyMethod": "人工提示下的检查比较了观测到的手部表面参考点与标定模型投影。固定手型时，各手指局部 RMS 误差为 1.35–2.20 mm；轻微闭指后，整体 RMS 为 5.26 mm，最大误差为 9.57 mm。一个手型上的拟合不能保证运动后的精度，标定本身也就不是安全保证。",
      "skillsMethod": "上方导航运行的 Workspace 提供另一组可检查记录：辅助函数与脚本保存操作过程，部分运行中的 scene_graph.json 保存已发现的世界状态。初始、修改和新增标签区分提供的接口与运行留下的文件。这些最终快照展示导航文件，不是上文真机模块复用的证据。"
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
    document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===lang)));document.dispatchEvent(new Event('languagechange'));
  }
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang)));
  const dialog=document.getElementById('image-viewer');document.getElementById('close-image').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));
  applyLanguage(lang);
})();
