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
      "robotIntro": "We gave GPT-6 Astra, running in Codex, the Astribot S1 Python SDK and its documentation. Using the left parallel gripper, the agent attempted four tasks: tabletop cleanup, cleanup after a base approach, drawer retrieval and closure, and loaded transfer.",
      "harnessTitle": "Revisiting the Harness",
      "harnessSetup": "Model · coding harness · physical-world layer",
      "harnessIntro": "Codex supplied the agent loop, tool execution, files and the write–run–read–fix cycle. We read the experiments through four physical-world mechanisms: keeping track of the world, checking action outcomes, understanding the body, and retaining useful procedures.",
      "worldStateTitle": "World state and memory",
      "worldStateIntro": "The 18 navigation runs are grouped into Astra, instructed scene-graph memory, and navigation-evaluation conditions, with three runs per condition in each dataset. Each replay pairs the saved observations with that run’s observable agent events; completed and incomplete runs are both retained.",
      "outcomeTitle": "Outcome checking",
      "outcomeIntro": "The Revo2 cup-lift trials ask whether reaching a motion target means that the object was actually lifted. A useful outcome check must inspect the cup and its support after the motion.",
      "bodyTitle": "Body limits and safety",
      "bodyIntro": "After the Revo2 hand was installed, the existing collision model still described the parallel gripper. The experiment compares observed hand-surface landmarks with calibrated model projections to expose this geometry mismatch.",
      "skillsTitle": "Skills and reusable files",
      "skillsIntro": "We examine reusable code as part of the agent’s working memory. Every navigation run above exposes its saved final Workspace, so readers can inspect the procedures and state files produced during that run.",
      "supplementaryLabel": "Supplementary",
      "revoTitle": "Additional Revo2 trials",
      "revoIntro": "These records follow the same empty plastic cup from unsuccessful lifts and a tilted grasp to an upright hold and one completed transfer. The final transfer required no in-trial manual reset; the cup stood upright after release and hand withdrawal. The complete recording contains 13 cuts across unrecorded intervals.",
      "revoSetup": "Astribot S1 · Revo2 right hand · Same empty plastic cup",
      "remainsTitle": "What Changes and What Remains",
      "remainsIntro": "Across these demonstrations, the model wrote control code while the coding harness supplied the execution loop and files. The runs still had to re-sense the world, check what their actions achieved and work within the body’s limits. The observations motivate the following responsibilities for a physical-world harness.",
      "changeToolTitle": "Tool granularity blurs downward",
      "changeToolText": "The model can write motion segments directly against the SDK, so the model–tool line is no longer fixed.",
      "changeProfileTitle": "The Embodiment Profile does more work",
      "changeProfileText": "Kinematic limits, workspace and calibration become explicit when they are no longer hidden inside a policy.",
      "changeSafetyTitle": "Safety moves into the harness",
      "changeSafetyText": "Lower-level commands require heavier workspace bounds, collision checks and force limits.",
      "changeEvalTitle": "Evaluation precedes physical-world self-improvement",
      "changeEvalText": "Robot experience cannot become a reliable signal until the physical world has an equivalent of exit codes and unit tests.",
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
      "robotObservation": "The first errors were geometric and were corrected during execution. All four tasks reached the final states shown below, illustrating the control code the model can construct for these particular tasks.",
      "worldStateMethod": "In graph-memory runs, the agent wrote room and route records to files and consulted them during navigation. These records are estimates maintained within the current run. Read the replay together with the context stream and Workspace to follow new observations, route choices and later revisits. Completion labels follow the recorded run outcome, including its stopping criterion.",
      "outcomeMethod": "In the cup-rim trials, the wrist rose about 7.58 mm while the cup stayed on its support. The agent inspected post-action images, rejected unsuccessful lifts and adjusted its grasp. These were task-specific visual checks whose accuracy was not independently measured.",
      "bodyMethod": "Human-prompted geometry checks gave local per-finger RMS errors of 1.35–2.20 mm at a fixed hand shape. After slight closure, overall RMS error was 5.26 mm and the maximum was 9.57 mm. Calibration at one hand shape did not guarantee the same geometric accuracy after the fingers moved.",
      "skillsMethod": "Open a run’s Workspace to inspect its navigation helpers, task scripts and, where present, scene_graph.json. A helper script preserves a procedure; a scene graph preserves discovered world state. The provided, modified and new labels distinguish the initial interface from files left by the run. These snapshots document navigation, rather than the separate code reuse across the four robot tasks."
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
      "robotIntro": "我们将 Astribot S1 的 Python SDK 与文档交给运行在 Codex 中的 GPT-6 Astra，使用左侧平行夹爪执行四项任务：固定站位桌面收纳、移动后操作、抽屉取物与关闭，以及载物搬运。",
      "harnessTitle": "重新审视 Harness",
      "harnessSetup": "模型 · coding harness · 物理世界层",
      "harnessIntro": "Codex 提供 agent 循环、工具执行、文件，以及编写、运行、读取结果和修正的迭代过程。下方围绕四项物理世界机制阅读实验：记录世界状态、核验动作结果、理解身体，以及保留有用的操作过程。",
      "worldStateTitle": "世界状态与记忆",
      "worldStateIntro": "18 次导航运行按 Astra、指示维护场景图记忆、导航评估三种条件分组，每个数据集的每种条件保留三次运行。每条视频均将已保存的观测与本次运行的可观测 agent 事件同步展示，已完成和未完成的运行都保留在此。",
      "outcomeTitle": "结果核验",
      "outcomeIntro": "Revo2 杯子试抬用来检查：运动到达目标，是否意味着杯子真的被抬起。结果核验需要在动作之后重新观察杯子与支撑面的状态。",
      "bodyTitle": "身体限制与安全",
      "bodyIntro": "换装 Revo2 后，已安装的碰撞模型仍描述原来的平行夹爪。实验通过比较观测到的手部表面参考点与标定模型投影，检查身体模型与实际几何之间的偏差。",
      "skillsTitle": "Skill 与可复用文件",
      "skillsIntro": "我们把可复用代码视为 Agent 工作记忆的一部分。上方每次导航运行都提供保存的最终 Workspace，可以查看本次运行生成的操作过程与状态文件。",
      "supplementaryLabel": "补充证据",
      "revoTitle": "其他 Revo2 实验",
      "revoIntro": "这些记录展示同一个空塑料杯从未成功试抬、包握后倾斜，到直立保持和一次完整搬运的过程。最终搬运没有轮内人工复位，释放并退手后杯子独立直立。完整录像在 13 处真实缺录区间直接跳切。",
      "revoSetup": "Astribot S1 · Revo2 右手 · 同一空塑料杯",
      "remainsTitle": "什么改变，什么保留",
      "remainsIntro": "在这些演示中，模型编写控制代码，coding harness 提供执行循环与文件。运行仍需重新感知世界、检查动作实际完成了什么，并在身体限制内操作。这些观察引出下方对物理世界 harness 职责的思考。",
      "changeToolTitle": "工具粒度向下模糊",
      "changeToolText": "模型可以直接针对 SDK 编写运动片段，模型与工具的分界不再固定。",
      "changeProfileTitle": "Embodiment Profile 承担更多",
      "changeProfileText": "当运动学限制、工作空间与标定不再藏在策略内部，它们必须显式暴露。",
      "changeSafetyTitle": "安全移入 Harness",
      "changeSafetyText": "更低层的指令需要更严格的工作空间约束、碰撞检查与力限。",
      "changeEvalTitle": "Evaluator 是物理世界自我改进的前提",
      "changeEvalText": "物理经验只有在拥有类似 exit code 和单元测试的判断机制后，才能成为可靠信号。",
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
      "robotObservation": "执行早期出现的几何错误经过观察后得到修正，四项任务均达到下方展示的最终状态。这些记录展示模型在这四项具体任务中编写控制代码的过程。",
      "worldStateMethod": "在场景图记忆条件中，Agent 将房间和路线记录写入文件，并在后续导航中查询。这些记录是当前运行内维护的估计。结合视频、context 数据流和 Workspace，可以跟随新的观测、路线选择及后续返回过程。完成状态沿用原始运行结果，包括其停止判定。",
      "outcomeMethod": "杯沿试抬中腕部上升约 7.58 mm，杯子仍留在支撑面上。Agent 根据动作后的图像识别未成功的试抬，并调整抓取。这些视觉检查针对当前任务，其准确率没有经过独立测量。",
      "bodyMethod": "在人工提示下进行的几何检查中，固定手型时各手指的局部 RMS 误差为 1.35–2.20 mm；轻微闭指后，整体 RMS 为 5.26 mm，最大误差为 9.57 mm。一个手型上的标定精度，不能直接保证手指移动后的几何精度。",
      "skillsMethod": "展开一次运行的 Workspace，可以查看导航辅助函数、任务脚本，以及部分运行中的 scene_graph.json。辅助脚本保存操作过程，场景图保存已发现的世界状态。初始、修改和新增标签区分提供的接口与运行留下的文件。这些快照记录导航过程，与四项真机任务之间的代码复用属于不同证据。"
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
