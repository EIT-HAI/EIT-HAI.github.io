'use strict';
(() => {
  const ui={
    "en": {
      "track": "CoRL 2026 Late-Breaking Results",
      "title": "Thea: Towards the Harness of Embodied Agents",
      "subtitle": "Revisited after GPT-6 Astra",
      "abstractLabel": "Abstract.",
      "abstract": "Thea carried the harness paradigm of coding agents into the physical world, adding a persistent readable world state (Scene Graph as Context) and verifiable action-outcome judgments (Evaluation as Exit Codes). With GPT-6 Astra given a robot SDK inside Codex, we revisit tool granularity, which components come from the model or coding harness, and which still need to be built for the physical world.",
      "shortTools": "Tools",
      "shortHarness": "Harness",
      "shortRemains": "What remains",
      "toolsTitle": "Revisiting the Tools",
      "robotSetup": "Astribot S1 · Left parallel gripper",
      "directControlTitle": "Direct SDK control",
      "robotIntro": "Thea originally exposed skill-level tools such as pick, place and navigate_to. Here we gave GPT-6 Astra, running in Codex, the Astribot S1 Python SDK and its documentation, with no Thea component present, and asked for the four left parallel-gripper tasks below.",
      "harnessTitle": "Revisiting the Harness",
      "harnessSetup": "Model · coding harness · what remains",
      "harnessIntro": "Codex supplied the agentic loop, tool execution, files and the write-run-read-fix cycle. The runs revisit who supplies Thea’s physical-world components: world state and spatial memory, evaluation, body limits, and skills.",
      "worldStateTitle": "World state and spatial memory",
      "worldStateIntro": "The paper compares three paired five-target tasks from HabitatGS-Benchmark, released with SuperNav: Astra without prescribed scene-graph memory versus Astra instructed to maintain it. Each task has one run per condition, a 500-action cap and a 1m arrival threshold.",
      "outcomeTitle": "Evaluation",
      "outcomeIntro": "In the Revo2 cup-grasping trials, the wrist reached its motion target while the cup stayed on its support. Post-action images exposed the difference between command completion and the object’s actual state.",
      "bodyTitle": "Body limits",
      "bodyIntro": "After Revo2 was installed, the collision model still described a parallel gripper. The agent identified this mismatch, and human-prompted landmark checks compared the current hand with calibrated model projections.",
      "skillsTitle": "Skills and memory",
      "skillsIntro": "Modules written for the first S1 left-gripper task, including capture, localization, inverse kinematics and collision screening, were reused in the other three and accumulated as files in the workspace.",
      "supplementaryLabel": "Supplementary",
      "revoTitle": "Additional Revo2 trials",
      "revoIntro": "The later trials show the same empty plastic cup progressing from unsuccessful lifts and a tilted grasp to an upright hold and a completed transfer. In the transfer, the cup stood upright after release and hand withdrawal, with no in-trial manual reset. The full recording retains 13 cuts across unrecorded intervals.",
      "revoSetup": "Astribot S1 · Revo2 right hand · Same empty plastic cup",
      "remainsTitle": "What Changes and What Remains",
      "remainsIntro": "After Astra, we re-examine the harness for what has changed and what has not. The two gaps have not: the runs still had to re-sense the world and judge their own outcomes. What changes is the responsibility the harness carries around them.",
      "changeToolTitle": "Tool granularity blurs downward.",
      "changeToolText": "Thea's tools were policies. Here the model wrote motion segments against the SDK, so the harness must expose the body at several levels.",
      "changeProfileTitle": "The Embodiment Profile does more work.",
      "changeProfileText": "When the model emits poses directly, kinematic limits, workspace and calibration are no longer hidden inside a policy, and the profile becomes the layer on which zero-shot cross-embodiment rests.",
      "changeSafetyTitle": "Safety moves into the harness.",
      "changeSafetyText": "A verified grasp policy carries part of its own safety. A raw pose command carries none, so permissions and sandboxes become workspace bounds, collision checks and force limits, and the lower the abstraction, the heavier this layer.",
      "changeEvalTitle": "The evaluator is the precondition for self-improvement in the physical world.",
      "changeEvalText": "Digital self-improvement ran first because exit codes and unit tests existed [13]. The physical world has none, so Evaluation as Exit Codes must come first.",
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
      "backTop": "Back to top ↑",
      "backHome": "Back to Thea main site →",
      "shareNote": "Offline sharing copy. Workspace observation images are not included.",
      "robotMethod": "The agent registered head-camera RGB-D observations in the base frame, solved inverse kinematics numerically against the SDK’s forward kinematics, screened joint samples for self-collision, and sent one motion segment at a time. Base movement used velocity pulses gated by lidar clearance.",
      "robotObservation": "The agent corrected early geometric errors and all four tasks reached the displayed final states: objects in the plate, a retrieved cube and closed drawer, and a loaded bowl delivered to the destination table. For these tasks, the model constructed control code rather than invoking a learned manipulation policy. The drawer video combines two sessions.",
      "worldStateMethod": "Without prescribed graph memory, targets were re-localized from images and earlier sightings retained in conversation. With instructed graph memory, room and route records were stored and later reused. The videos, context streams and Workspaces show how these model-estimated records informed route choices and revisits.",
      "worldStateObservation": "Completed tasks counts runs that reached all five targets in order and issued STOP (2/3 → 3/3). Mean SPL weights task success by shortest-to-actual path efficiency, with failed runs scored zero (0.485 → 0.690). Turns totals 30° left/right actions across the three runs (358 → 308). Low-displacement forward rate is the fraction of forward actions moving less than 1cm (7.34% → 2.88%).",
      "worldStateCoverage": "All 18 navigation records are included. The evaluation condition completed 0/3 HabitatGS tasks: mismatched review targets and repeated viewpoint checks led to detours, and all three runs exhausted 500 actions without a final STOP. All nine LHPR runs were incomplete: six exhausted the action budget; three submitted their stage STOPs but did not reach all accepted goal positions. Uncertain target identity and arrival estimates were recurring problems.",
      "outcomeMethod": "In two cup-rim attempts, the wrist rose about 7.58 mm while the cup remained on the plate. The task agent used post-action image checks to reject the unsuccessful lifts and adjust its grasp.",
      "bodyMethod": "At a fixed hand shape, human-prompted geometry checks measured local per-finger landmark RMS errors of 1.35–2.20 mm. After slight finger closure, overall RMS was 5.26 mm, with a 9.57 mm maximum. The geometric error changed with the hand configuration.",
      "skillsMethod": "The navigation Workspaces provide a separate record of helpers, scripts and model-written world state. The provided, modified and new labels distinguish the starting interface from files produced or changed during the run.",
      "memoryDiagramTitle": "Scene-graph memory: paired results",
      "memoryBaselineTitle": "Astra",
      "memoryGraphTitle": "Astra + SG",
      "memoryConditions": "Astra: no prescribed graph memory. Astra + SG: instructed scene-graph memory.",
      "memoryCompleted": "Completed tasks",
      "memoryMeanSPL": "Mean SPL",
      "memorySPL": "SPL",
      "memoryTurnsTitle": "Turns",
      "memoryLowTitle": "Low-displacement forward rate",
      "memoryCompletedDesc": "Astra completed two of three tasks; Astra with instructed scene-graph memory completed all three, at the 1 m threshold.",
      "memorySplDesc": "Mean success-weighted SPL was 0.485 for Astra and 0.690 with instructed scene-graph memory, a 42.3% relative increase.",
      "memoryTurnsDesc": "Across all three tasks, Astra used 358 turns and Astra with instructed scene-graph memory used 308 turns.",
      "memoryLowDesc": "Forward movements under 1 cm accounted for 64 of 872 forward actions for Astra and 27 of 936 for Astra with instructed scene-graph memory: 7.34% and 2.88%.",
      "memoryCompletedNote": "Ordered arrivals followed by final STOP.",
      "memorySplNote": "+42.3% relative mean SPL.",
      "memoryTurnsNote": "−14.0% total turns across three tasks.",
      "memoryLowNote": "Displacement <1 cm: 64/872 → 27/936 forward actions (−60.7% relative rate).",
      "memoryTableSummary": "Full three-task results",
      "memoryTableCaption": "All six paired runs at 1 m. Forward <1 cm counts low-displacement forward actions.",
      "memoryTask": "Task",
      "memoryCondition": "Condition",
      "memoryTaskComplete": "Completed",
      "memoryActions": "Actions",
      "memoryPath": "Path (m)",
      "memoryNearZero": "Forward <1 cm",
      "memoryYes": "Yes",
      "memoryNo": "No"
    },
    "zh": {
      "track": "CoRL 2026 Late-Breaking Results",
      "title": "Thea：面向具身智能体的 Harness",
      "subtitle": "在 GPT-6 Astra 之后重新审视",
      "abstractLabel": "摘要。",
      "abstract": "Thea 将 coding agent 的 harness 范式带入物理世界，通过 Scene Graph as Context 提供持续可读的世界状态，通过 Evaluation as Exit Codes 核验动作结果。现在，我们将机器人 SDK 交给 Codex 中的 GPT-6 Astra，重新审视控制粒度，以及哪些机制来自模型、哪些来自 coding harness、哪些仍有待为物理世界构建。",
      "shortTools": "工具",
      "shortHarness": "Harness",
      "shortRemains": "变化与保留",
      "toolsTitle": "重新审视工具",
      "robotSetup": "Astribot S1 · 左侧平行夹爪",
      "directControlTitle": "直接 SDK 控制",
      "robotIntro": "原 Thea 提供 pick、place、navigate_to 等技能级工具。这里，我们将 Astribot S1 的 Python SDK 与文档交给运行在 Codex 中的 GPT-6 Astra，不加入 Thea 组件，让它完成下方四项左侧平行夹爪任务。",
      "harnessTitle": "重新审视 Harness",
      "harnessSetup": "模型 · coding harness · 待补机制",
      "harnessIntro": "Codex 提供 agentic loop、工具执行、文件，以及编写、运行、读取反馈、修正的循环。我们通过这些运行，重新检查 Thea 的物理世界组件由谁提供：世界状态与空间记忆、结果核验、身体限制，以及 Skill。",
      "worldStateTitle": "世界状态与空间记忆",
      "worldStateIntro": "论文比较 SuperNav 发布的 HabitatGS-Benchmark 中三项配对五目标任务：不要求维护场景图记忆的 Astra，与被指示维护场景图记忆的 Astra。每个任务、每种条件各运行一次，动作上限为 500，到达阈值为 1m。",
      "outcomeTitle": "结果核验",
      "outcomeIntro": "在 Revo2 抓杯试验中，腕部到达了运动目标，杯子却仍留在支撑面上。动作后的图像揭示了指令完成与物体实际状态之间的区别。",
      "bodyTitle": "身体限制",
      "bodyIntro": "安装 Revo2 后，碰撞模型仍描述平行夹爪。Agent 识别出这一错配，并在人工提示下，通过参考点检查比较当前手部与标定模型投影。",
      "skillsTitle": "Skill 与记忆",
      "skillsIntro": "为第一项 S1 左夹爪任务编写的采集、定位、逆运动学与碰撞筛查模块，在其余三项任务中得到复用，并以文件形式积累在 workspace 中。",
      "supplementaryLabel": "补充证据",
      "revoTitle": "其他 Revo2 实验",
      "revoIntro": "后续试验展示同一个空塑料杯从未成功试抬、包握后倾斜，到直立保持和一次完整搬运。最终搬运没有轮内人工复位，释放并退手后杯子独立直立。完整录像在 13 处缺录区间跳切。",
      "revoSetup": "Astribot S1 · Revo2 右手 · 同一空塑料杯",
      "remainsTitle": "什么改变，什么保留",
      "remainsIntro": "Astra 到来后，我们重新审视 harness 中哪些发生了改变，哪些没有。两个缺口没有改变：这些运行仍须重新感知世界，并自行判断动作结果。变化的是 harness 围绕它们承担的职责。",
      "changeToolTitle": "工具粒度的边界向下变得模糊。",
      "changeToolText": "Thea 的工具是策略，而这里的模型直接面向 SDK 编写运动片段，因此 harness 必须在多个层级暴露身体。",
      "changeProfileTitle": "本体档案承担更多职责。",
      "changeProfileText": "当模型直接输出位姿时，运动学限制、工作空间和标定不再隐藏在策略内部，本体档案因而成为零样本跨本体能力所依赖的一层。",
      "changeSafetyTitle": "安全职责转入 harness。",
      "changeSafetyText": "经过验证的抓取策略自带一部分安全保障。原始位姿命令本身不携带这些保障，因此权限和沙箱转化为工作空间边界、碰撞检查和力限制，抽象层级越低，这一层的职责越重。",
      "changeEvalTitle": "评估器是物理世界自我改进的前提。",
      "changeEvalText": "数字世界的自我改进率先开展，是因为退出码和单元测试已经存在[13]。物理世界并不具备这些设施，因此必须先构建 Evaluation as Exit Codes。",
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
      "backTop": "返回顶部 ↑",
      "backHome": "返回 Thea 主站 →",
      "shareNote": "离线分享版不包含 Workspace 观测原图。",
      "robotMethod": "Agent 将头部相机的 RGB-D 观测配准至底盘坐标系，依据 SDK 的正向运动学数值求解逆运动学，对关节采样进行自碰撞筛查，并逐段发送运动指令。底盘使用受激光雷达净空约束的速度脉冲移动。",
      "robotObservation": "Agent 修正了执行早期的几何错误，四项任务均达到下方展示的最终状态：物体放入盘内、方块取出且抽屉关闭、装有方块的碗运到目标桌。对这些任务，模型编写了控制代码，而不是调用学习得到的操作策略。抽屉视频由两次会话拼接。",
      "worldStateMethod": "不要求维护场景图记忆时，目标从图像重新定位，先前见闻保留在对话中。指示维护场景图后，房间与路线记录被保存并在后续复用。结合视频、context 数据流和 Workspace，可以检查这些模型估计的记录如何用于选路和返回。",
      "worldStateObservation": "完成任务数统计按顺序到达全部五个目标并执行 STOP 的运行次数（2/3 → 3/3）。平均 SPL 以最短路径与实际路径的效率比加权任务成功结果，失败记零分（0.485 → 0.690）。转向次数汇总三次运行中每次 30° 的左、右转动作（358 → 308）。低位移前进占比是实际位移不足 1cm 的前进动作占全部前进动作的比例（7.34% → 2.88%）。",
      "worldStateCoverage": "页面保留全部 18 条导航记录。导航评估条件在 HabitatGS 中完成 0/3：复核目标错位与反复补充视角导致绕行，三次均用完 500 动作而未执行最终 STOP。LHPR 的九次运行均未完成：六次耗尽动作预算，另三次虽提交了各阶段 STOP，却没有全部到达验收位置。目标身份不确定与到达估计偏差是反复出现的问题。",
      "outcomeMethod": "两次杯沿试抬中，腕部均上升约 7.58 mm，杯子仍留在盘上。任务 Agent 根据动作后的图像自检，否定了这些未成功的试抬，并调整抓取。",
      "bodyMethod": "人工提示下的几何检查显示，固定手型时，各手指局部参考点 RMS 误差为 1.35–2.20 mm；轻微闭指后，整体 RMS 为 5.26 mm，最大误差为 9.57 mm。几何误差随手型变化。",
      "skillsMethod": "导航 Workspace 提供另一组辅助函数、脚本与模型记录的世界状态。初始、修改和新增标签，区分提供的起始接口与运行中生成或修改的文件。",
      "memoryDiagramTitle": "场景图记忆：配对结果",
      "memoryBaselineTitle": "Astra",
      "memoryGraphTitle": "Astra + SG",
      "memoryConditions": "Astra：未要求维护场景图；Astra + SG：指示维护场景图记忆。",
      "memoryCompleted": "完成任务数",
      "memoryMeanSPL": "平均 SPL",
      "memorySPL": "SPL",
      "memoryTurnsTitle": "转向次数",
      "memoryLowTitle": "低位移前进占比",
      "memoryCompletedDesc": "在 1 m 阈值下，Astra 完成三项任务中的两项，指示维护场景图记忆后完成三项。",
      "memorySplDesc": "平均成功加权 SPL 从 Astra 的 0.485 提高到场景图记忆条件的 0.690，相对提升 42.3%。",
      "memoryTurnsDesc": "三项任务合计，Astra 转向 358 次，指示维护场景图记忆后转向 308 次。",
      "memoryLowDesc": "实际位移不足 1 cm 的前进动作，在 Astra 中为 64/872 次，在场景图记忆条件中为 27/936 次，占比分别为 7.34% 与 2.88%。",
      "memoryCompletedNote": "按顺序到达目标，并执行最终 STOP。",
      "memorySplNote": "平均 SPL 相对提升 42.3%。",
      "memoryTurnsNote": "三项任务合计转向减少 14.0%。",
      "memoryLowNote": "位移 <1 cm：64/872 → 27/936 次前进动作（占比相对减少 60.7%）。",
      "memoryTableSummary": "完整三任务结果",
      "memoryTableCaption": "1 m 阈值下的全部六次配对运行。“前进 <1 cm”统计低位移前进动作次数。",
      "memoryTask": "任务",
      "memoryCondition": "条件",
      "memoryTaskComplete": "完成",
      "memoryActions": "动作数",
      "memoryPath": "路径（m）",
      "memoryNearZero": "前进 <1 cm",
      "memoryYes": "是",
      "memoryNo": "否"
    }
  };

  for(const language of ['en','zh'])Object.assign(ui[language],window.PAPER_COPY?.[language]||{},window.METRIC_COPY?.[language]||{});
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
    const article=node('article','experiment');article.dataset.experiment=`${family}-${item.id}`;article.id=`${family}-${item.id}`;
    const head=node('div','experiment-head');head.append(text(node('h4'),item.title.en,item.title.zh));article.append(head);
    if(item.task)article.append(text(node('p','task'),item.task.en,item.task.zh));
    const set=node('div','media-set'+(item.media.length>1?' multiple':''));item.media.forEach(entry=>set.append(media(entry)));article.append(set);
    const result=node('p','result');result.append(text(node('span'),item.result.en,item.result.zh));article.append(result);
    if(item.id==='5B'||item.id==='06'){const notes=node('details','run-details');notes.append(phrase('summary','recordingDetails'),phrase('p','revoNote'));article.append(notes);}
    if(family==='robot'){const link=text(node('a','final-image'),ui.en.finalImage,ui.zh.finalImage);link.href=assetURL(item.media[0].poster);link.target='_blank';link.rel='noopener';article.append(link);}
    return article;
  }

  window.EXPERIMENTS.robot.forEach(item=>document.getElementById('robot-grid').append(experiment(item,'robot')));
  const skillEvidence=document.getElementById('skills-evidence');
  window.EXPERIMENTS.robot.forEach(item=>{
    const link=node('a','skill-task');link.href=`#robot-${item.id}`;
    const image=node('img');image.src=assetURL(item.media[0].poster);image.alt=item.title.en;image.loading='lazy';
    link.append(image,text(node('span'),item.title.en,item.title.zh));skillEvidence.append(link);
  });
  window.EXPERIMENTS.revo.forEach(item=>{
    const target=item.id==='02'?'revo-outcome-grid':item.id==='04'?'revo-body-grid':'revo-supp-grid';
    document.getElementById(target).append(experiment(item,'revo'));
  });

  const order={astra:0,graph:1,eval:2};
  [...window.EXPERIMENTS.navigation].sort((a,b)=>a.family.localeCompare(b.family)||a.rank-b.rank||order[a.condition]-order[b.condition]).forEach(run=>{
    const article=node('article','nav-card');article.dataset.run=run.id;
    const stream=node('div','context-stream context-stream-inline');stream.dataset.contextRun=run.id;stream.setAttribute('aria-live','off');article.append(stream);
    const native=node('div','native-result'),episode=node('span');episode.textContent=`Episode ${run.episode.split('_').at(-1)}`;native.append(episode,phrase('span',run.success?'completed':'incomplete','status'+(run.success?'':' incomplete')));article.append(native);
    const metrics=node('div','metrics'),stages=node('span'),actions=node('span');text(stages,`Stages ${run.stages}/${run.total}`,`阶段 ${run.stages}/${run.total}`);text(actions,`${run.actions} actions`,`${run.actions} 动作`);metrics.append(stages,actions);article.append(metrics);
    const details=node('details','run-details');details.append(phrase('summary','details'));const instruction=node('p');instruction.textContent=run.instruction;instruction.lang='en';details.append(instruction);const stop=node('p','stop-reason');stop.textContent=run.stop;const id=node('p','episode');id.textContent=run.episode;details.append(stop,id,phrase('p','navigationNote'));if(run.family==='lhpr')details.append(phrase('p','lhprNote'));const original=text(node('a','source-image'),ui.en.savedImage,ui.zh.savedImage);original.href=assetURL(run.image);original.target='_blank';original.rel='noopener';details.append(original);article.append(details);
    const workspace=window.createWorkspace(run);if(workspace)article.append(workspace);
    const target=run.condition==='eval'?(run.family==='lhpr'?'lhpr-eval-grid':'supernav-eval-grid'):(run.family==='lhpr'?'lhpr-grid':'supernav-grid');
    document.getElementById(target).append(article);
  });

  document.querySelectorAll('[data-i18n]').forEach(element=>{const key=element.dataset.i18n;if(ui.en[key]!=null&&ui.zh[key]!=null)bindings.push({element,en:ui.en[key],zh:ui.zh[key]});});
  function applyLanguage(next){
    lang=next;document.documentElement.lang=lang==='zh'?'zh-CN':'en';bindings.forEach(binding=>binding.element.textContent=binding[lang]);
    document.querySelectorAll('[data-i18n]').forEach(element=>{
      const value=element.textContent,matches=[...value.matchAll(/\[(\d+(?:,\s*\d+)*)\]/g)];if(!matches.length)return;
      const parts=[];let start=0;
      matches.forEach(match=>{
        parts.push(document.createTextNode(value.slice(start,match.index)));
        const reference=node('a');reference.href=match[1]==='13'?'https://wentao.live/blog/astra-and-beyond/':'assets/documents/thea-paper-current.pdf#page=3';reference.textContent=match[0];reference.target='_blank';reference.rel='noopener';reference.title=lang==='zh'?'论文参考文献':'Paper references';parts.push(reference);start=match.index+match[0].length;
      });
      parts.push(document.createTextNode(value.slice(start)));element.replaceChildren(...parts);
    });
    document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===lang)));document.dispatchEvent(new Event('languagechange'));
  }
  document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang)));
  const dialog=document.getElementById('image-viewer');document.getElementById('close-image').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  applyLanguage(lang);
})();
