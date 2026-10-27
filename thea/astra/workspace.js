'use strict';
(() => {
  const label = (en, zh) => document.documentElement.lang.startsWith('zh') ? zh : en;
  const stateLabel = status => status === 'existing'
    ? label('provided', '初始')
    : status === 'modified' ? label('modified', '修改') : label('new', '新增');
  const make = (tag, className) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    return element;
  };

  const viewer = make('dialog', 'workspace-viewer');
  viewer.id = 'workspace-viewer';
  viewer.setAttribute('aria-labelledby', 'workspace-file-title');
  const close = make('button', 'workspace-close');
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close workspace file');
  close.addEventListener('click', () => viewer.close());
  const heading = make('h2', 'workspace-file-title');
  heading.id = 'workspace-file-title';
  const body = make('div', 'workspace-file-body');
  const original = make('a', 'workspace-original');
  original.target = '_blank';
  original.rel = 'noopener';
  viewer.append(close, heading, body, original);
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  document.body.append(viewer);
  let selection = 0;
  let loadController;
  viewer.addEventListener('close', () => { selection++; loadController?.abort(); });
  document.addEventListener('languagechange', () => {
    document.querySelectorAll('.workspace-state').forEach(state => { state.textContent = stateLabel(state.dataset.status); });
    document.querySelectorAll('.workspace>summary').forEach(summary => {
      summary.title = label('Workspace scripts and state. Observation images omitted.', 'Workspace 代码与状态，省略观测原图。');
    });
    original.textContent = label('Download file', '下载文件');
    close.setAttribute('aria-label', label('Close workspace file', '关闭工作目录文件'));
  });

  async function openFile(run, file) {
    loadController?.abort();
    loadController = new AbortController();
    const current = ++selection;
    heading.textContent = run.id + ' / ' + file.path;
    original.href = file.src;
    original.download = file.path.split('/').at(-1);
    original.textContent = label('Download file', '下载文件');
    body.replaceChildren();
    if (!viewer.open) viewer.showModal();
    if (file.kind === 'image') {
      const image = make('img');
      image.src = file.src;
      image.alt = file.path;
      body.append(image);
    } else {
      const pre = make('pre');
      const code = make('code');
      code.textContent = label('Loading…', '加载中…');
      pre.append(code);
      body.append(pre);
      try {
        const response = await fetch(file.src, { signal: loadController.signal });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const source = await response.text();
        if (current === selection) code.textContent = source;
      } catch {
        if (current === selection) code.textContent = label('Unable to load this file.', '文件加载失败。');
      }
    }
  }

  function fileRow(run, file) {
    const row = make('li');
    const button = make('button', 'workspace-file');
    button.type = 'button';
    button.dataset.workspaceFile = file.path;
    button.title = file.path;
    const name = make('span');
    name.textContent = file.path.split('/').at(-1);
    button.append(name);
    // Distinguish supplied files from additions without attributing SDK-saved images to the model.
    if (!file.path.startsWith('images/')) {
      const state = make('span', 'workspace-state');
      state.dataset.status = file.status;
      state.textContent = stateLabel(file.status);
      button.append(state);
    }
    button.addEventListener('click', () => openFile(run, file));
    row.append(button);
    return row;
  }

  function tree(run, entries) {
    const list = make('ul', 'workspace-tree');
    const folders = new Map();
    for (const file of entries) {
      const segments = file.remaining.split('/');
      if (segments.length === 1) continue;
      const folder = segments[0];
      if (!folders.has(folder)) folders.set(folder, []);
      folders.get(folder).push({ ...file, remaining: segments.slice(1).join('/') });
    }
    const files = entries.filter(file => !file.remaining.includes('/')).sort((a, b) => {
      const priority = file => file.status === 'existing' ? 1 : 0;
      return priority(a) - priority(b) || a.path.localeCompare(b.path);
    });
    files.forEach(file => list.append(fileRow(run, file)));
    [...folders].sort(([a], [b]) => a.localeCompare(b)).forEach(([name, children]) => {
      const row = make('li');
      const folder = make('details', 'workspace-folder');
      const summary = make('summary');
      summary.textContent = name + '/';
      folder.append(summary);
      let populated = false;
      folder.addEventListener('toggle', () => {
        if (folder.open && !populated) {
          folder.append(tree(run, children));
          populated = true;
        }
      });
      row.append(folder);
      list.append(row);
    });
    return list;
  }

  window.createWorkspace = run => {
    const workspace = window.WORKSPACES?.[run.id];
    if (!workspace) return null;
    const details = make('details', 'workspace');
    details.dataset.workspace = run.id;
    const summary = make('summary');
    summary.textContent = 'Workspace';
    summary.title = label('Workspace scripts and state. Observation images omitted.', 'Workspace 代码与状态，省略观测原图。');
    details.append(summary);
    let populated = false;
    details.addEventListener('toggle', () => {
      if (details.open && !populated) {
        const scroll = make('div', 'workspace-scroll');
        scroll.append(tree(run, workspace.files.map(file => ({ ...file, remaining: file.path }))));
        details.append(scroll);
        populated = true;
      }
    });
    return details;
  };
})();
