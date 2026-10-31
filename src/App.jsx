import React, { useEffect, useMemo, useState } from 'react';
import { applyOperation, createOperation } from './logic.js';

const initialFiles = {
  'index.js': 'function greet(name) {\n    const message = `Hello, ${name}`;\n\n    return message;\n}\n\n// SyncForge Collaborative Demo\nexport default greet;',
  'app.js': 'function startApp() {\n    console.log("SyncForge is running");\n}\n\nstartApp();',
  'utils.js': 'export function formatName(name) {\n    return name.trim();\n}',
  'README.md': '# SyncForge\n\nA client-side collaborative editor demo.'
};

export default function App() {
  const [files, setFiles] = useState(() => {
    try { return { ...initialFiles, ...JSON.parse(localStorage.getItem('syncforge-files') || '{}') }; }
    catch { return initialFiles; }
  });
  const [activeFile, setActiveFile] = useState('index.js');
  const [running, setRunning] = useState(false);
  const [activities, setActivities] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scenario, setScenario] = useState('Select Demo Scenario...');
  const [notice, setNotice] = useState('Welcome to SyncForge, Anmol! Workspace ready.');
  const [saved, setSaved] = useState(true);
  const collaborators = ['Anmol', 'Rahul', 'Priya'];

  useEffect(() => { localStorage.setItem('syncforge-files', JSON.stringify(files)); setSaved(true); }, [files]);
  const code = files[activeFile] ?? '';
  const lines = useMemo(() => code.split('\n'), [code]);

  function addActivity(person, message, operation = null) {
    const item = { id: Date.now() + Math.random(), person, message, time: new Date().toLocaleTimeString(), operation };
    setActivities(old => [item, ...old].slice(0, 8));
    setHistory(old => [...old, { file: activeFile, code: files[activeFile], item }]);
    setHistoryIndex(-1);
  }

  function editCode(value) {
    setSaved(false);
    setFiles(old => ({ ...old, [activeFile]: value }));
    addActivity('Anmol', `Updated ${activeFile}`);
  }

  function simulate() {
    if (running) { setRunning(false); setNotice('Simulation paused.'); return; }
    setRunning(true);
    const person = scenario.includes('Priya') ? 'Priya' : scenario.includes('Rahul') ? 'Rahul' : 'Rahul';
    const op = createOperation('insert', Math.min(code.length, 0), '// Collaborator connected\n');
    setFiles(old => ({ ...old, [activeFile]: applyOperation(old[activeFile] || '', op) }));
    addActivity(person, `Inserted a comment in ${activeFile}`, op);
    setNotice(`${person} made a simulated edit.`);
  }

  function replay(direction = 1) {
    if (!history.length) { setNotice('No history available yet. Make an edit first.'); return; }
    const next = Math.max(0, Math.min(history.length - 1, (historyIndex < 0 ? history.length - 1 : historyIndex) + direction));
    setHistoryIndex(next);
    const item = history[next];
    setActiveFile(item.file);
    setNotice(`History ${next + 1} of ${history.length}: ${item.item.message}`);
  }

  function reset() {
    setFiles(initialFiles); setActiveFile('index.js'); setActivities([]); setHistory([]); setHistoryIndex(-1); setRunning(false); setNotice('Demo reset to initial clean state.');
  }

  return <div className="app">
    <header>
      <div className="logo"><div className="logo-box">&lt;/&gt;</div><div><b>SyncForge</b><small>CLIENT-SIDE OT</small></div></div>
      <div className="sync">● {activeFile} <span>✓ Synced</span></div>
      <select className="scenario" value={scenario} onChange={e => setScenario(e.target.value)}><option>Select Demo Scenario...</option><option>Rahul collaboration</option><option>Priya collaboration</option></select>
      <button id="simulate" onClick={simulate}>{running ? '■ Stop Simulation' : '▶ Start Simulation'}</button>
      <div className="idle">⌁ {running ? 'SIMULATION RUNNING' : 'SIMULATION IDLE'}</div>
      <div className="avatars"><div className="avatar blue">A</div><div className="avatar orange">R</div><div className="avatar cyan">A</div><div className="avatar purple">P</div></div>
      <div className="refresh" onClick={reset} title="Reset demo">↻</div>
    </header>
    <div className="main">
      <aside className="files"><h4>PROJECT FILES <span>＋</span></h4>
        {Object.keys(initialFiles).map(file => <div key={file} className={`file ${activeFile === file ? 'active' : ''}`} onClick={() => setActiveFile(file)}>📄 {file}</div>)}
        <div className="engine"><p>Engine: <b>Custom OT</b></p><p>Mode: <b>Browser-only</b></p></div>
      </aside>
      <section className="editor"><div className="tab">📄 {activeFile} <span>×</span></div>
        <div className="code" style={{height:'calc(100% - 35px)', overflow:'auto'}}>
          <div style={{display:'flex', alignItems:'flex-start'}}><div style={{flex:1}}>
            {lines.map((line, i) => <div key={`${activeFile}-${i}`}><i>{i + 1}</i><span>{line || '\u00a0'}</span></div>)}
          </div></div>
          <textarea aria-label="Code editor" value={code} onChange={e => editCode(e.target.value)} spellCheck="false" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.015,color:'transparent',background:'transparent',border:0,resize:'none',fontFamily:'Consolas, monospace',fontSize:11,lineHeight:'29px',padding:'20px 0 0 42px',outline:'none',caretColor:'#ff9c45'}} />
          <div className="user rahul">Rahul</div><div className="user anmol">Anmol</div><div className="user priya">Priya</div>
        </div>
      </section>
      <aside className="right">
        <div className="notification success">✓ {notice}<span onClick={() => setNotice('')}>×</span></div>
        <div className="notification info">◉ {saved ? 'Changes saved in browser storage' : 'Saving changes...'}<span>×</span></div>
        <h4>◉ COLLABORATORS (4)</h4>
        {collaborators.map((name, i) => <div className="person" key={name}><div className={`mini ${['blue','orange','purple'][i]}`}>{name[0]}</div>{name}{i === 0 ? ' (You)' : ''}<small>● {i === 0 ? 'active' : running ? 'editing' : 'idle'}</small></div>)}
        <h4 className="activity">⌁ LIVE ACTIVITY FEED</h4>
        {activities.length ? activities.map(item => <div className="notification info" key={item.id}><b>{item.person}</b> {item.message}<small style={{display:'block',marginTop:4}}>{item.time}</small></div>) : <div className="empty"><div>▱</div><p>No operations recorded yet.</p><small>Start typing or run a simulation.</small></div>}
      </aside>
    </div>
    <footer><span onClick={() => replay(-1)}>▶</span><span onClick={() => replay(1)}>↻</span><span>◉</span><span>0.5×</span><b>1×</b><span>2×</span><span>4×</span><div className="timeline">{history.length ? `History: ${history.length} operation(s) recorded` : 'Timeline idle. Generate operations to scrub through history.'}</div><span onClick={() => replay(1)}>Replay History ({history.length})</span><span>⌁ {running ? 'RUNNING' : 'IDLE'}</span><strong>▣ localStorage: {saved ? 'SAVED' : 'UPDATED'}</strong></footer>
  </div>;
}
