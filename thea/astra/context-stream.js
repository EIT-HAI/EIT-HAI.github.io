'use strict';
(() => {
  const payload = window.CONTEXT_TRACES;
  if (!payload) return;

  const runs = payload.runs || Object.fromEntries(Object.entries(payload).filter(([key]) => key !== '_meta'));
  const experiments = new Map((window.EXPERIMENTS?.navigation || []).map(run => [run.id, run]));
  const roots = [...document.querySelectorAll('[data-context-run]')]
    .filter(root => runs[root.dataset.contextRun] && experiments.has(root.dataset.contextRun));
  if (!roots.length) return;

  const copy = {
    en: {
      agent: 'AGENT', context: 'context stream', run: 'Run',
      completed: 'complete', incomplete: 'incomplete', frame: 'observation', action: 'action',
      idle: 'waiting for the next recorded event…',
      note: '1s per saved observation · left/front/right · no interpolation · sanitized public events, not hidden reasoning',
      noEvaluator: 'No evaluator review was captured for this evaluator-condition run.',
      afterFinal: count => `${count} event${count === 1 ? '' : 's'} after the last saved observation remain attached to it.`
    },
    zh: {
      agent: 'AGENT', context: '上下文流', run: '运行',
      completed: '完成', incomplete: '未完成', frame: '观测', action: '动作',
      idle: '等待下一条已记录事件…',
      note: '每个保存观测显示1s · 左/前/右三视图 · 不插帧 · 经清理的公开事件，不含隐藏推理',
      noEvaluator: '这次评估条件运行没有捕获到 evaluator review。',
      afterFinal: count => `有 ${count} 条事件发生在最后一个已保存 observation 之后，仍附在该观测上。`
    }
  };

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();
  const truncate = (value, limit = 118) => {
    const text = clean(value);
    return text.length > limit ? text.slice(0, limit - 1) + '…' : text;
  };
  const stripPrefix = value => clean(value)
    .replace(/^(Task|Public message|Tool call|Command|Workspace snapshot)\s*[·:] ?/i, '')
    .replace(/^(任务|公开消息|工具调用|命令|Workspace 快照)\s*[·:] ?/, '');
  const eventFrame = event => event.frame ?? event.anchorFrame ?? event.frameIndex ?? 0;
  const assetURL = source => typeof window.embeddedAssetURL === 'function'
    ? window.embeddedAssetURL(source)
    : source;
  const el = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value != null) node.textContent = value;
    return node;
  };

  function createPlayer(root) {
    const id = root.dataset.contextRun;
    const trace = runs[id];
    const experiment = experiments.get(id);
    const framesPerSecond = trace.displayFramesPerSecond || experiment.replayFps || payload.playbackFramesPerSecond || 1;
    const state = {
      lang: document.documentElement.lang.startsWith('zh') ? 'zh' : 'en',
      frame: 0,
      lastFrame: -1,
      newestKey: '',
      newestText: '',
      typeToken: 0,
      videoFrameCallback: 0,
      seeking: false
    };
    const c = key => copy[state.lang][key];
    const localized = value => typeof value === 'object' && value
      ? value[state.lang] || value.en || value.zh
      : value;
    const conditionLabel = () => experiment.condition === 'graph'
      ? (state.lang === 'zh' ? '场景图' : 'scene graph')
      : experiment.condition === 'eval'
        ? (state.lang === 'zh' ? '导航评估条件' : 'evaluator condition')
        : 'Astra';
    const runLabel = () => `${experiment.family === 'lhpr' ? 'LHPR-VLN' : 'HabitatGS'} · ${conditionLabel()} · ${c('run')} ${experiment.rank}`;

    root.innerHTML = `
      <section class="trace-stage" aria-label="Agent context replay">
        <div class="trace-toolbar">
          <div class="trace-current"><strong></strong><span></span></div>
        </div>
        <div class="trace-video-wrap">
          <video controls playsinline preload="metadata"></video>
          <div class="trace-engine" aria-label="Recent observable agent events">
            <div class="trace-hud-head"><span class="trace-hud-dot" aria-hidden="true"></span><strong class="trace-hud-title"></strong><span class="trace-hud-subtitle"></span></div>
            <ol class="trace-events" aria-live="off"></ol>
          </div>
          <div class="trace-progress" aria-hidden="true"><i></i></div>
        </div>
        <p class="trace-note"><span class="trace-evidence-note"></span> <span class="trace-gap"></span></p>
      </section>`;

    const q = selector => root.querySelector(selector);
    const video = q('video');
    const list = q('.trace-events');
    const progress = q('.trace-progress i');
    const currentTitle = q('.trace-current strong');
    const currentMeta = q('.trace-current span');

    function eventText(event) {
      const raw = state.lang === 'zh'
        ? event.zh || event.text || event.en
        : event.text || event.en || event.zh;
      if (event.lane === 'task') return truncate(event.snippet || stripPrefix(raw), 132);
      if (event.lane === 'observe') {
        return state.lang === 'zh'
          ? `RGB ${event.observationIndex ?? '—'} · 动作 ${event.actionIndex ?? '—'}`
          : `RGB ${event.observationIndex ?? '—'} · action ${event.actionIndex ?? '—'}`;
      }
      if (event.lane === 'workspace') {
        const files = (event.files || []).slice(0, 3).join(', ');
        const more = Math.max(0, (event.files || []).length - 3);
        if (files) return truncate(`${files}${more ? ` +${more}` : ''} · ${state.lang === 'zh' ? '已保存' : 'saved'}`);
      }
      if (event.lane === 'evaluate') {
        const bits = [
          event.review != null ? `${state.lang === 'zh' ? '核查' : 'review'} ${event.review}` : null,
          event.decision,
          event.identity,
          event.approach
        ].filter(Boolean);
        return truncate(bits.join(' · ') || stripPrefix(raw));
      }
      if (event.lane === 'result') {
        return truncate([
          event.success == null ? null : (event.success ? c('completed') : c('incomplete')),
          event.visitedTargets != null ? `${event.visitedTargets}/${event.targetCount ?? '—'} ${state.lang === 'zh' ? '目标' : 'targets'}` : null,
          event.actionIndex != null ? `${event.actionIndex} ${c('action')}${state.lang === 'en' && event.actionIndex !== 1 ? 's' : ''}` : null,
          event.stopReason
        ].filter(Boolean).join(' · '));
      }
      if (event.lane === 'action') return truncate(localized(event.summary) || stripPrefix(raw));
      if (event.lane === 'tool' && event.tool) {
        return truncate(`${event.tool}${event.status === 'failed' ? ` · ${state.lang === 'zh' ? '失败' : 'failed'}` : ''}`);
      }
      return truncate(event.snippet || localized(event.summary) || stripPrefix(raw) || localized(event.label) || event.sourceSnippet || c('idle'));
    }

    function tone(event) {
      if (event.lane === 'task' || event.lane === 'result') return 'signal';
      if (event.lane === 'tool') return 'command';
      if (event.lane === 'agent') return 'agent';
      if (event.lane === 'action') return 'action';
      if (event.lane === 'observe') return 'observation';
      return 'reason';
    }
    function glyph(event) {
      if (event.lane === 'agent') return '$';
      if (event.lane === 'workspace' || event.lane === 'memory') return '#';
      if (event.lane === 'observe') return '◉';
      if (event.lane === 'result') return '●';
      return '›';
    }
    function visibleEntries(frame) {
      const grouped = [];
      (trace.events || []).forEach((event, index) => {
        if (eventFrame(event) > frame) return;
        const text = eventText(event);
        const eventTone = tone(event);
        const previous = grouped.at(-1);
        if (previous && previous.lane === event.lane && previous.tone === eventTone && previous.text === text) {
          previous.count += 1;
          previous.end = index;
          return;
        }
        grouped.push({start: index, end: index, count: 1, lane: event.lane || 'agent', tone: eventTone, glyph: glyph(event), text});
      });
      return grouped.slice(-7);
    }

    const entryText = entry => entry.count > 1 ? `${entry.text} ×${entry.count}` : entry.text;
    function typeNewest(span, full) {
      const token = ++state.typeToken;
      if (reduced || video.paused || state.seeking || full.length < 2) {
        span.textContent = full;
        return;
      }
      const duration = clamp(full.length * 22, 260, 600);
      const start = performance.now();
      span.textContent = '';
      const tick = now => {
        if (token !== state.typeToken) return;
        const ratio = Math.min(1, (now - start) / duration);
        span.textContent = full.slice(0, Math.max(1, Math.floor(ratio * full.length)));
        if (ratio < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    function updateRows(entries, animate) {
      state.typeToken++;
      if (!entries.length) {
        const idle = el('li', 'trace-event trace-event-empty');
        idle.dataset.key = 'idle';
        idle.dataset.tone = 'reason';
        idle.append(el('span', 'trace-event-glyph', '·'), el('span', 'trace-event-text', c('idle')));
        list.replaceChildren(idle);
        state.newestKey = 'idle';
        state.newestText = c('idle');
        return;
      }
      const visibleKeys = new Set(entries.map(entry => String(entry.start)));
      [...list.children].forEach(row => {
        if (!visibleKeys.has(row.dataset.key)) row.remove();
      });
      const existing = new Map([...list.children].map(row => [row.dataset.key, row]));
      entries.forEach((entry, index) => {
        const key = String(entry.start);
        let row = existing.get(key);
        if (!row) {
          row = el('li', 'trace-event');
          row.dataset.key = key;
          row.append(el('span', 'trace-event-glyph'), el('span', 'trace-event-text'));
        }
        row.dataset.tone = entry.tone;
        row.querySelector('.trace-event-glyph').textContent = entry.glyph;
        const full = entryText(entry);
        const span = row.querySelector('.trace-event-text');
        const isNewest = index === entries.length - 1;
        if (!isNewest) span.textContent = full;
        list.append(row);
        if (isNewest) {
          const changed = state.newestKey !== key || state.newestText !== full;
          if (animate && changed) typeNewest(span, full);
          else span.textContent = full;
          state.newestKey = key;
          state.newestText = full;
        }
      });
    }

    function updateGapNote() {
      const notes = [];
      if (experiment.condition === 'eval' && !(trace.events || []).some(event => event.lane === 'evaluate')) notes.push(c('noEvaluator'));
      const lastTimestamp = trace.frames.at(-1)?.timestampUnixSeconds;
      const afterFinal = lastTimestamp == null ? 0 : (trace.events || []).filter(event => event.timeUnixSeconds != null && event.timeUnixSeconds > lastTimestamp).length;
      if (afterFinal) notes.push(c('afterFinal')(afterFinal));
      q('.trace-gap').textContent = notes.join(' ');
    }
    function updateToolbar(meta) {
      const rate = Number.isFinite(video.playbackRate) ? video.playbackRate.toFixed(2).replace(/0$/, '').replace(/\.0$/, '') : '1';
      currentTitle.textContent = runLabel();
      currentMeta.textContent = `${c('frame')} ${state.frame + 1}/${trace.frames.length} · ${meta.actionIndex ?? '—'} ${c('action')}${state.lang === 'en' && meta.actionIndex !== 1 ? 's' : ''} · ${rate}×`;
    }
    function updateProgress() {
      const ratio = Number.isFinite(video.duration) && video.duration > 0 ? video.currentTime / video.duration : 0;
      progress.style.width = `${clamp(ratio, 0, 1) * 100}%`;
    }
    function renderAt(mediaTime = video.currentTime, {force = false, animate = false} = {}) {
      const maximum = Math.max(0, trace.frames.length - 1);
      const frame = clamp(Math.floor((Number(mediaTime) || 0) * framesPerSecond + 0.001), 0, maximum);
      state.frame = frame;
      const meta = trace.frames[frame] || {};
      updateToolbar(meta);
      updateProgress();
      if (force || frame !== state.lastFrame) {
        updateRows(visibleEntries(frame), animate && !state.seeking);
        state.lastFrame = frame;
      }
    }
    function cancelVideoFrameLoop() {
      if (state.videoFrameCallback && typeof video.cancelVideoFrameCallback === 'function') video.cancelVideoFrameCallback(state.videoFrameCallback);
      state.videoFrameCallback = 0;
    }
    function scheduleVideoFrame() {
      if (video.paused || video.ended || typeof video.requestVideoFrameCallback !== 'function' || state.videoFrameCallback) return;
      state.videoFrameCallback = video.requestVideoFrameCallback((_, metadata) => {
        state.videoFrameCallback = 0;
        renderAt(metadata.mediaTime, {animate: true});
        scheduleVideoFrame();
      });
    }
    function applyCopy() {
      q('.trace-hud-title').textContent = c('agent');
      q('.trace-hud-subtitle').textContent = c('context');
      q('.trace-evidence-note').textContent = c('note');
      video.setAttribute('aria-label', runLabel());
      updateGapNote();
      state.lastFrame = -1;
      renderAt(video.currentTime, {force: true, animate: false});
    }

    video.poster = assetURL(experiment.videoPoster || experiment.image);
    if (typeof window.prepareEmbeddedVideo === 'function') window.prepareEmbeddedVideo(video, experiment.video);
    else video.src = experiment.video;
    video.addEventListener('loadedmetadata', () => {
      video.defaultPlaybackRate = 1;
      video.playbackRate = 1;
      renderAt(video.currentTime, {force: true, animate: false});
    });
    video.addEventListener('play', () => {
      document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
      scheduleVideoFrame();
    });
    video.addEventListener('pause', () => {
      cancelVideoFrameLoop();
      state.typeToken++;
      renderAt(video.currentTime, {force: true, animate: false});
    });
    video.addEventListener('timeupdate', () => {
      if (typeof video.requestVideoFrameCallback !== 'function' || video.paused) renderAt(video.currentTime, {animate: !video.paused});
      else updateProgress();
    });
    video.addEventListener('seeking', () => {
      cancelVideoFrameLoop();
      state.seeking = true;
      state.typeToken++;
      renderAt(video.currentTime, {force: true, animate: false});
    });
    video.addEventListener('seeked', () => {
      state.seeking = false;
      renderAt(video.currentTime, {force: true, animate: false});
      scheduleVideoFrame();
    });
    video.addEventListener('ratechange', () => renderAt(video.currentTime));
    video.addEventListener('ended', () => renderAt(video.duration, {force: true, animate: false}));
    document.addEventListener('languagechange', () => {
      state.lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
      applyCopy();
    });

    applyCopy();
  }

  roots.forEach(createPlayer);
})();
