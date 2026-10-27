'use strict';
(() => {
  const players = new WeakMap();
  const active = new Set();
  let serial = 0;
  let expanded = null;
  let previousOverflow = '';

  const copy = {
    en: { player: 'Video player', play: 'Play', pause: 'Pause', replay: 'Replay', mute: 'Mute', unmute: 'Unmute', seek: 'Seek', full: 'Fullscreen', exitFull: 'Exit fullscreen', of: 'of' },
    zh: { player: '视频播放器', play: '播放', pause: '暂停', replay: '重新播放', mute: '静音', unmute: '取消静音', seek: '播放进度', full: '全屏', exitFull: '退出全屏', of: '/' }
  };
  const paths = {
    play: '<path d="M8 5.5v13l11-6.5z"/>',
    pause: '<path d="M9.5 6v12m5-12v12"/>',
    muted: '<path d="M4 9.5h3.5L12 6v12L7.5 14.5H4zM16.5 10l4 4m0-4-4 4"/>',
    sound: '<path d="M4 9.5h3.5L12 6v12L7.5 14.5H4zM15.5 9.8a3.5 3.5 0 0 1 0 4.4M18 7.6a7 7 0 0 1 0 8.8"/>',
    full: '<path d="M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5"/>',
    exitFull: '<path d="M4 9h5V4m11 5h-5V4M4 15h5v5m11-5h-5v5"/>'
  };
  const icon = (name, filled = false) => `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
  const element = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const language = () => document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  const format = value => {
    const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
    const minutes = Math.floor(seconds / 60);
    const tail = String(seconds % 60).padStart(2, '0');
    return minutes < 60 ? `${minutes}:${tail}` : `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${tail}`;
  };
  const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;

  function exitExpanded() {
    if (!expanded) return;
    const state = expanded;
    expanded = null;
    state.shell.classList.remove('is-expanded');
    document.body.style.overflow = previousOverflow;
    state.paint();
    state.full.focus();
  }

  function enterExpanded(state) {
    if (expanded === state) return;
    if (expanded) exitExpanded();
    previousOverflow = document.body.style.overflow;
    expanded = state;
    state.shell.classList.add('is-expanded');
    document.body.style.overflow = 'hidden';
    state.paint();
    state.full.focus();
  }

  async function toggleFullscreen(state) {
    if (expanded === state) {
      exitExpanded();
      return;
    }
    const current = fullscreenElement();
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (current === state.shell && exit) {
      try { await exit.call(document); } catch (_) { state.paint(); }
      return;
    }
    if (expanded) exitExpanded();
    const request = state.shell.requestFullscreen || state.shell.webkitRequestFullscreen;
    if (request) {
      try {
        if (current && exit) await exit.call(document);
        await request.call(state.shell);
        state.paint();
        return;
      } catch (_) {
        // Keep the complete player, including its controls, in the fallback.
      }
    }
    enterExpanded(state);
  }

  function enhance(video) {
    if (players.has(video) || video.closest('.thea-video-player')) return players.get(video) || null;
    if (!video.parentElement) return null;

    const parent = video.parentElement;
    const existingViewport = parent.matches('.media-frame, .trace-video-wrap');
    const viewport = existingViewport ? parent : element('div', 'thea-video-viewport');
    const shell = element('div', 'thea-video-player');
    const bar = element('div', 'thea-video-bar');
    const big = element('button', 'thea-video-big');
    const disc = element('span', 'thea-video-disc');
    const range = element('input', 'thea-video-seek');
    const time = element('span', 'thea-video-time');
    const play = element('button', 'thea-video-control');
    const mute = element('button', 'thea-video-control');
    const full = element('button', 'thea-video-control');
    const originalNext = existingViewport ? viewport.nextSibling : video.nextSibling;
    const originalHost = existingViewport ? viewport.parentNode : parent;
    let dragging = false;

    try {
      shell.setAttribute('role', 'group');
      viewport.classList.add('thea-video-viewport');
      if (!existingViewport) {
        const width = Number(video.getAttribute('width'));
        const height = Number(video.getAttribute('height'));
        viewport.style.aspectRatio = width > 0 && height > 0 ? `${width} / ${height}` : '16 / 9';
      }
      if (!video.id) {
        do { serial += 1; } while (document.getElementById(`thea-video-${serial}`));
        video.id = `thea-video-${serial}`;
      }
      for (const button of [play, mute, full, big]) {
        button.type = 'button';
        button.setAttribute('aria-controls', video.id);
      }
      disc.innerHTML = icon('play', true);
      big.append(disc);
      range.type = 'range';
      range.min = '0';
      range.max = '1000';
      range.step = '1';
      range.value = '0';
      range.disabled = true;
      time.setAttribute('aria-hidden', 'true');
      bar.append(play, range, time, mute, full);
      if (existingViewport) {
        originalHost.insertBefore(shell, viewport);
        shell.append(viewport);
      } else {
        originalHost.insertBefore(shell, video);
        viewport.append(video);
        shell.append(viewport);
      }
      viewport.append(big);
      shell.append(bar);

      const state = { video, shell, full, paint, tick };
      const c = key => copy[language()][key];
      const label = (button, key, name) => {
        button.setAttribute('aria-label', c(key));
        button.title = c(key);
        if (name) button.innerHTML = icon(name);
      };

      function paint() {
        const paused = video.paused || video.ended;
        const silent = video.muted || video.volume === 0;
        const isFull = fullscreenElement() === shell || expanded === state;
        shell.classList.toggle('is-paused', paused);
        label(play, paused ? (video.ended ? 'replay' : 'play') : 'pause', paused ? 'play' : 'pause');
        label(big, video.ended ? 'replay' : 'play');
        label(mute, silent ? 'unmute' : 'mute', silent ? 'muted' : 'sound');
        label(full, isFull ? 'exitFull' : 'full', isFull ? 'exitFull' : 'full');
        mute.setAttribute('aria-pressed', String(silent));
        full.setAttribute('aria-pressed', String(isFull));
        range.setAttribute('aria-label', c('seek'));
        shell.setAttribute('aria-label', video.getAttribute('aria-label') || c('player'));
      }

      function tick() {
        const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
        const current = clamp(Number(video.currentTime) || 0, 0, duration || Infinity);
        const ratio = duration ? current / duration : 0;
        if (!dragging) range.value = String(Math.round(ratio * 1000));
        range.disabled = !duration;
        range.style.setProperty('--thea-progress', `${ratio * 100}%`);
        range.setAttribute('aria-valuetext', `${format(current)} ${c('of')} ${format(duration)}`);
        time.textContent = `${format(current)} / ${format(duration)}`;
      }

      function seekTo(value) {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;
        try { video.currentTime = clamp(value, 0, video.duration); } catch (_) { /* Metadata may still be loading. */ }
        tick();
      }

      function togglePlayback() {
        if (!video.paused && !video.ended) {
          video.pause();
          return;
        }
        if (video.ended) seekTo(0);
        try {
          const pending = video.play();
          if (pending && typeof pending.catch === 'function') pending.catch(() => { paint(); tick(); });
        } catch (_) { paint(); tick(); }
      }

      play.addEventListener('click', togglePlayback);
      big.addEventListener('click', togglePlayback);
      video.addEventListener('click', togglePlayback);
      mute.addEventListener('click', () => {
        if (video.muted || video.volume === 0) {
          if (video.volume === 0) video.volume = 1;
          video.muted = false;
        } else video.muted = true;
        paint();
      });
      full.addEventListener('click', () => { void toggleFullscreen(state); });
      range.addEventListener('input', () => seekTo(Number(range.value) / 1000 * video.duration));
      range.addEventListener('pointerdown', () => { dragging = true; });
      const finishDrag = () => { if (dragging) { dragging = false; tick(); } };
      document.addEventListener('pointerup', finishDrag);
      document.addEventListener('pointercancel', finishDrag);
      range.addEventListener('change', finishDrag);
      range.addEventListener('blur', finishDrag);
      range.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') target = video.currentTime + 5;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') target = video.currentTime - 5;
        else if (event.key === 'Home') target = 0;
        else if (event.key === 'End') target = video.duration;
        else if (event.key === 'PageUp') target = video.currentTime + video.duration / 10;
        else if (event.key === 'PageDown') target = video.currentTime - video.duration / 10;
        else return;
        event.preventDefault();
        seekTo(target);
      });
      video.tabIndex = 0;
      video.addEventListener('keydown', event => {
        if (event.key === ' ' || event.key.toLowerCase() === 'k') {
          event.preventDefault();
          togglePlayback();
        } else if (event.key.toLowerCase() === 'f') {
          event.preventDefault();
          void toggleFullscreen(state);
        } else if (event.key.toLowerCase() === 'm') {
          event.preventDefault();
          mute.click();
        }
      });
      video.addEventListener('play', () => {
        document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
        paint();
      });
      ['pause', 'ended', 'volumechange', 'emptied', 'error'].forEach(event => video.addEventListener(event, () => { paint(); tick(); }));
      ['loadedmetadata', 'durationchange', 'timeupdate', 'seeking', 'seeked', 'ratechange'].forEach(event => video.addEventListener(event, tick));
      if (!existingViewport) video.addEventListener('loadedmetadata', () => {
        if (video.videoWidth && video.videoHeight) viewport.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
      });
      paint();
      tick();
      players.set(video, state);
      active.add(state);
      video.controls = false;
      video.dataset.theaEnhanced = 'true';
      return state;
    } catch (error) {
      // An enhancement failure must not strand a video without usable controls.
      video.controls = true;
      big.remove();
      if (shell.parentNode) {
        const restored = existingViewport ? viewport : video;
        originalHost.insertBefore(restored, originalNext && originalNext.parentNode === originalHost ? originalNext : shell);
        shell.remove();
      }
      if (!existingViewport) viewport.remove();
      else viewport.classList.remove('thea-video-viewport');
      return null;
    }
  }

  function enhanceAll(root = document) {
    if (root.matches?.('video')) enhance(root);
    root.querySelectorAll?.('video').forEach(enhance);
  }

  ['fullscreenchange', 'webkitfullscreenchange'].forEach(event => document.addEventListener(event, () => active.forEach(state => state.paint())));
  document.addEventListener('languagechange', () => active.forEach(state => { state.paint(); state.tick(); }));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (expanded) {
      event.preventDefault();
      exitExpanded();
      return;
    }
    const current = fullscreenElement();
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (current?.classList.contains('thea-video-player') && exit) {
      event.preventDefault();
      try { Promise.resolve(exit.call(document)).catch(() => {}); } catch (_) { /* Native Escape may already be exiting. */ }
    }
  });

  function start() {
    enhanceAll();
    if (typeof MutationObserver === 'function') {
      new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) enhanceAll(node);
      }))).observe(document.body, { childList: true, subtree: true });
    }
  }
  window.TheaVideoPlayer = Object.freeze({ enhance, enhanceAll });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
