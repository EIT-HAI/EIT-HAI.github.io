'use strict';
(() => {
  const payload = window.CONTEXT_TRACES;
  if (!payload) return;
  const runs = payload.runs || {};
  const experiments = new Map((window.EXPERIMENTS?.navigation || []).map(run => [run.id, run]));
  const copy = {
    en: {
      run: 'Run', frame: 'observation', action: 'action',
      note: '1s per saved observation · left/front/right · no scene interpolation · sanitized public events rendered in-video, not hidden reasoning',
      noEvaluator: 'No evaluator review was captured for this evaluator-condition run.',
      afterFinal: count => `${count} event${count === 1 ? '' : 's'} after the last saved observation ${count === 1 ? 'remains' : 'remain'} attached to it.`
    },
    zh: {
      run: '运行', frame: '观测', action: '动作',
      note: '每个保存观测显示1s · 左/前/右三视图 · 不插值场景运动 · 经清理的公开事件已渲染进视频，不含隐藏推理',
      noEvaluator: '这次评估条件运行没有捕获到 evaluator review。',
      afterFinal: count => `有 ${count} 条事件发生在最后一个保存观测之后，仍附在该观测上。`
    }
  };
  const assetURL = source => typeof window.embeddedAssetURL === 'function' ? window.embeddedAssetURL(source) : source;
  const roots = [...document.querySelectorAll('[data-context-run]')];
  roots.forEach(root => {
    const id = root.dataset.contextRun;
    const trace = runs[id];
    const experiment = experiments.get(id);
    if (!trace || !experiment) return;
    // Observable context is already encoded into the MP4. No HTML HUD is
    // created here, so webpage typography cannot resize or obscure it.
    root.innerHTML = `
      <section class="trace-stage" aria-label="Agent context replay">
        <div class="trace-toolbar"><div class="trace-current"><strong></strong><span></span></div></div>
        <div class="trace-video-wrap"><video controls playsinline preload="metadata"></video></div>
        <p class="trace-note"><span class="trace-evidence-note"></span> <span class="trace-gap"></span></p>
      </section>`;
    const q = selector => root.querySelector(selector);
    const video = q('video');
    const currentTitle = q('.trace-current strong');
    const currentMeta = q('.trace-current span');
    let lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
    const c = key => copy[lang][key];
    const condition = () => experiment.condition === 'graph'
      ? (lang === 'zh' ? '场景图' : 'scene graph')
      : experiment.condition === 'eval'
        ? (lang === 'zh' ? '导航评估条件' : 'evaluator condition')
        : 'Astra';
    const runLabel = () => `${experiment.family === 'lhpr' ? 'LHPR-VLN' : 'HabitatGS'} · ${condition()} · ${c('run')} ${experiment.rank}`;
    function updateMeta() {
      // Encoded videos are 15fps for HUD animation, while scene observations
      // still change exactly once per second. Do not use videoFps here.
      const observationRate = trace.displayFramesPerSecond || experiment.replayFps || 1;
      const index = Math.max(0, Math.min(trace.frames.length - 1, Math.floor((video.currentTime || 0) * observationRate + .001)));
      const frame = trace.frames[index] || {};
      const rate = Number.isFinite(video.playbackRate) ? video.playbackRate.toFixed(2).replace(/0$/, '').replace(/\.0$/, '') : '1';
      currentTitle.textContent = runLabel();
      currentMeta.textContent = `${c('frame')} ${index + 1}/${trace.frames.length} · ${frame.actionIndex ?? '—'} ${c('action')}${lang === 'en' && frame.actionIndex !== 1 ? 's' : ''} · ${rate}×`;
    }
    function applyCopy() {
      lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
      q('.trace-evidence-note').textContent = c('note');
      const notes = [];
      if (experiment.condition === 'eval' && !(trace.events || []).some(event => event.lane === 'evaluate')) notes.push(c('noEvaluator'));
      const last = trace.frames.at(-1)?.timestampUnixSeconds;
      const after = last == null ? 0 : (trace.events || []).filter(event => event.timeUnixSeconds != null && event.timeUnixSeconds > last).length;
      if (after) notes.push(c('afterFinal')(after));
      q('.trace-gap').textContent = notes.join(' ');
      video.setAttribute('aria-label', runLabel());
      updateMeta();
    }
    video.poster = assetURL(experiment.videoPoster || experiment.image);
    if (typeof window.prepareEmbeddedVideo === 'function') window.prepareEmbeddedVideo(video, experiment.video);
    else video.src = experiment.video;
    for (const event of ['loadedmetadata', 'timeupdate', 'seeking', 'seeked', 'ratechange', 'ended']) video.addEventListener(event, updateMeta);
    video.addEventListener('play', () => {
      document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
    });
    document.addEventListener('languagechange', applyCopy);
    applyCopy();
  });
})();
