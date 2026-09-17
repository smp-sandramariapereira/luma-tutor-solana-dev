/** Visual assets for the student page. No agent, harness, or API logic. */

export const studentUiCss = String.raw`
:root,html[data-color-scheme="dark"]{
  color-scheme:dark;
  --bg:#070b0f;
  --bg-console:#080d12;
  --bg-panel:#152630;
  --bg-field:#070c10;
  --bg-bubble:#0d171c;
  --bg-user:#171224;
  --bg-code:#061015;
  --line:#20303a;
  --text:#e8f5f1;
  --muted:#81979a;
  --accent:#58899B;
  --cyan:#7de8ff;
  --btn-fg:#06100d;
  --label:#91a4a8;
  --chip:#d7ece8;
  --consent:#c5d6dc;
  --ok:#8ec9a4;
  --fail:#e08b8b;
  --user-line:#493966;
  --empty:#9ab2bd;
  --chip-bg:#102028;
  --chip-line:#3a5a66;
  --connected:#2f9e6a;
  --connected-fg:#06100d;
}
html[data-color-scheme="light"]{
  color-scheme:light;
  --bg:#f3f6f7;
  --bg-console:#ffffff;
  --bg-panel:#e7eef1;
  --bg-field:#ffffff;
  --bg-bubble:#f6fafb;
  --bg-user:#eef1f7;
  --bg-code:#e8eef0;
  --line:#c3d0d6;
  --text:#132026;
  --muted:#5c6f76;
  --accent:#3d6d7d;
  --cyan:#1a6b7d;
  --btn-fg:#f4fbfc;
  --label:#4a5c62;
  --chip:#16323b;
  --consent:#2a3e45;
  --ok:#2f7d55;
  --fail:#b4232c;
  --user-line:#c5c0d8;
  --empty:#5c6f76;
  --chip-bg:#f7fbfc;
  --chip-line:#b7c7cd;
  --connected:#1f8a58;
  --connected-fg:#f4fbfc;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%;overflow:hidden;background:var(--bg);color:var(--text);font:15px/1.55 Inter,"IBM Plex Sans",system-ui,sans-serif}
:focus-visible{outline:2px solid var(--cyan);outline-offset:2px}
.layout{display:grid;grid-template-columns:minmax(220px,260px) minmax(0,1fr);height:100vh;min-height:0;overflow:hidden}
.panel{border-right:1px solid var(--line);background:var(--bg-panel);padding:18px;min-height:0;overflow:auto}
.heading{font-size:12px;color:var(--cyan);text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:650}
.heading:before{content:"> ";color:var(--accent)}
label{display:block;font-size:12px;color:var(--label);margin:10px 0 5px;letter-spacing:.4px}
input,textarea{width:100%;border:1px solid var(--line);background:var(--bg-field);color:var(--text);border-radius:4px;padding:10px;font:inherit}
textarea{min-height:72px}
.btn,.send{width:100%;margin-top:12px;border:1px solid var(--accent);background:var(--accent);color:var(--btn-fg);padding:10px;cursor:pointer;text-transform:uppercase;font-size:12px;letter-spacing:.7px}
.btn:hover,.send:hover{filter:brightness(1.08)}
.btn.connected{background:var(--connected);border-color:var(--connected);color:var(--connected-fg)}
.btn.secondary{background:transparent;color:var(--text);border-color:var(--line)}
.btn.secondary:hover{border-color:var(--cyan);filter:none}
.status,.privacy,.lead{font-size:13px;color:var(--muted);line-height:1.55}
.consent{display:flex;gap:8px;align-items:flex-start;margin:14px 0;text-transform:none;font-size:13px;color:var(--consent)}
.consent input{width:16px;flex:none}
.console{display:flex;flex-direction:column;min-width:0;min-height:0;height:100%;overflow:hidden;background:var(--bg-console)}
.console-head{flex-shrink:0;min-height:56px;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 16px;gap:10px}
.console-head .title{font-weight:600}
.scheme-toggle{margin-left:auto;border:1px solid var(--line);background:transparent;color:var(--text);border-radius:20px;padding:6px 10px;font-size:12px;cursor:pointer;white-space:nowrap}
.badge{border:1px solid var(--line);color:var(--cyan);border-radius:20px;padding:6px 10px;font-size:11px;white-space:nowrap}
.messages{flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--line) transparent;padding:18px 20px}
.messages::-webkit-scrollbar{width:10px}
.messages::-webkit-scrollbar-track{background:transparent}
.messages::-webkit-scrollbar-thumb{background:var(--line);border-radius:8px}
.msg{margin:0 0 18px;max-width:min(78%,46rem)}
.msg.user{margin-left:auto}
.bubble{padding:14px 16px;border:1px solid var(--line);border-radius:4px 14px 14px;background:var(--bg-bubble);line-height:1.65;overflow-wrap:anywhere;word-break:break-word}
.bubble-who{margin:0 0 8px;font-size:11px;font-weight:650;letter-spacing:.7px;text-transform:uppercase;color:var(--cyan)}
.msg.user .bubble-who{color:var(--muted);text-align:right}
.bubble-body p{margin:0 0 .7em}
.bubble-body p:last-child,.bubble-body>*:last-child{margin-bottom:0}
.bubble-body h1,.bubble-body h2,.bubble-body h3,.bubble-body h4{margin:1em 0 .45em;line-height:1.3;font-weight:650}
.bubble-body h1{font-size:1.2em}.bubble-body h2{font-size:1.1em}.bubble-body h3,.bubble-body h4{font-size:1em}
.bubble-body ul,.bubble-body ol{margin:.35em 0 .8em;padding-left:1.25em}
.bubble-body li{margin:.2em 0}
.bubble-body blockquote{margin:.6em 0;padding:.2em 0 .2em .9em;border-left:3px solid var(--accent);color:var(--muted)}
.bubble-body a{color:var(--cyan)}
.bubble-body code{font:13px/1.45 "JetBrains Mono","Fira Code",ui-monospace,monospace;background:var(--bg-code);padding:.1em .35em;border-radius:4px}
.msg.user .bubble{border-color:var(--user-line);background:var(--bg-user);border-radius:14px 4px 14px 14px}
.md-table-wrap{overflow-x:auto;margin:.7em 0}
.bubble-body table{border-collapse:collapse;width:100%;font-size:.95em}
.bubble-body th,.bubble-body td{border:1px solid var(--line);padding:6px 8px;text-align:left}
.code-block{margin:.75em 0;border:1px solid var(--line);border-radius:8px;background:var(--bg-code);overflow:hidden}
.code-head{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;border-bottom:1px solid var(--line);color:var(--muted);font-size:12px}
.code-head button{border:1px solid var(--line);background:transparent;color:var(--text);border-radius:6px;padding:3px 8px;font-size:11px;cursor:pointer}
.code-block pre{margin:0;padding:12px 14px;overflow-x:auto}
.code-block code{background:transparent;padding:0;font:13px/1.5 "JetBrains Mono","Fira Code",ui-monospace,monospace;white-space:pre}
.composer-wrap{flex-shrink:0;border-top:1px solid var(--line);padding:12px 16px;background:var(--bg-console)}
.composer{display:flex;border:1px solid var(--line);background:var(--bg-field);border-radius:6px}
.composer textarea{border:0;height:72px;min-height:72px;resize:vertical;max-height:180px;background:transparent}
.composer .send{width:88px;margin:7px;flex:none}
.empty{margin:8px 0 24px;color:var(--empty);font-size:14px;line-height:1.6;white-space:pre-line}
.option-row{display:flex;flex-wrap:wrap;gap:8px;margin:8px 4px 0}
.option-btn{border:1px solid var(--chip-line);background:var(--chip-bg);color:var(--chip);border-radius:8px;padding:8px 12px;font:13px/1.3 Inter,system-ui,sans-serif;cursor:pointer;text-transform:none;letter-spacing:0}
.option-btn:hover{border-color:var(--cyan)}
.option-btn:disabled{opacity:.4;cursor:default}
#send:disabled{opacity:.45}
@media(max-width:1100px){
  html,body{height:auto;overflow:auto}
  .layout{grid-template-columns:1fr;height:auto;overflow:visible}
  .console{height:min(70vh,720px)}
  .msg{max-width:100%}
}
`;

export const studentUiClientScript = String.raw`
const $=id=>document.getElementById(id);
const LUMA_WELCOME='Olá! Eu sou Luma, tutor Solana. 🌱\n\nEstou aqui para ajudar você a aprender, explorar conceitos e avançar passo a passo.\n\nPara começarmos, conecte uma API externa, como a OpenAI ou outro provedor compatível.\n\nAssim que estiver tudo pronto, podemos começar. 🚀';
const history=[];
let apiReady=false, sessionReady=false, sessionStarted=false, sending=false, currentTopic='';
function tick(){return String.fromCharCode(96)}
function fence(){return tick()+tick()+tick()}
function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function safeHref(href){
  return /^https?:\/\//i.test(href)||/^mailto:/i.test(href)?href:'';
}
function renderInline(s){
  const mark=tick();
  const chunks=String(s).split(mark);
  let out='';
  for(let i=0;i<chunks.length;i++){
    if(i%2===1 && i<chunks.length-1){
      out+='<code>'+esc(chunks[i])+'</code>';
      continue;
    }
    let t=esc(chunks[i]);
    t=t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,function(_,label,href){
      const url=safeHref(href);
      return url?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+label+'</a>':label;
    });
    t=t.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    t=t.replace(/__([^_]+)__/g,'<strong>$1</strong>');
    t=t.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g,'$1<em>$2</em>');
    out+=t;
  }
  return out;
}
function extractFences(src){
  const F=fence();
  const blocks=[];
  let rest='';
  let i=0;
  const s=String(src||'').replace(/\r\n/g,'\n');
  while(i<s.length){
    const start=s.indexOf(F,i);
    if(start<0){rest+=s.slice(i);break;}
    rest+=s.slice(i,start);
    const after=start+F.length;
    const nl=s.indexOf('\n',after);
    const lang=s.slice(after, nl<0?after:nl).trim();
    const contentStart=nl<0?after:nl+1;
    const end=s.indexOf(F, contentStart);
    if(end<0){rest+=s.slice(start);break;}
    blocks.push({lang:lang,code:s.slice(contentStart,end).replace(/\n$/,'')});
    rest+='\n%%CODE'+(blocks.length-1)+'%%\n';
    i=end+F.length;
  }
  return {text:rest,blocks:blocks};
}
function parseRow(r){
  return r.replace(/^\|/,'').replace(/\|$/,'').split('|').map(function(c){return c.trim()});
}
function renderMarkdown(src){
  const extracted=extractFences(src);
  const lines=extracted.text.split('\n');
  const html=[];
  let i=0;
  while(i<lines.length){
    const line=lines[i];
    const codeMark=line.trim().match(/^%%CODE(\d+)%%$/);
    if(codeMark){
      const b=extracted.blocks[Number(codeMark[1])];
      html.push('<div class="code-block"><div class="code-head"><span>'+esc(b.lang||'código')+'</span><button type="button" data-copy-code>Copiar</button></div><pre><code>'+esc(b.code)+'</code></pre></div>');
      i++; continue;
    }
    if(/^\s*$/.test(line)){i++; continue;}
    const heading=line.match(/^(#{1,4})\s+(.+)$/);
    if(heading){
      const n=heading[1].length;
      html.push('<h'+n+'>'+renderInline(heading[2])+'</h'+n+'>');
      i++; continue;
    }
    if(/^>\s?/.test(line)){
      const qs=[];
      while(i<lines.length && /^>\s?/.test(lines[i])){qs.push(lines[i].replace(/^>\s?/,''));i++;}
      html.push('<blockquote>'+qs.map(renderInline).join('<br>')+'</blockquote>');
      continue;
    }
    if(/^\|/.test(line) && i+1<lines.length && /\|\s*-/.test(lines[i+1])){
      const head=parseRow(line);
      i+=2;
      const rows=[];
      while(i<lines.length && /^\|/.test(lines[i])){rows.push(parseRow(lines[i]));i++;}
      html.push('<div class="md-table-wrap"><table><thead><tr>'+head.map(function(c){return '<th>'+renderInline(c)+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+renderInline(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>');
      continue;
    }
    if(/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)){
      const ordered=/^\s*\d+\.\s+/.test(line);
      const re=ordered?/^\s*\d+\.\s+/:/^\s*[-*]\s+/;
      const items=[];
      while(i<lines.length && re.test(lines[i])){items.push(lines[i].replace(re,''));i++;}
      const tag=ordered?'ol':'ul';
      html.push('<'+tag+'>'+items.map(function(it){return '<li>'+renderInline(it)+'</li>'}).join('')+'</'+tag+'>');
      continue;
    }
    const para=[line];
    i++;
    while(i<lines.length && lines[i].trim() && !/^(#{1,4}\s|[-*]\s|\d+\.\s|>\s?|\|)/.test(lines[i]) && !/^%%CODE\d+%%$/.test(lines[i].trim()) && lines[i].indexOf(fence())!==0){
      para.push(lines[i]); i++;
    }
    html.push('<p>'+para.map(renderInline).join(' ')+'</p>');
  }
  return html.join('') || '<p></p>';
}
function applyColorScheme(scheme){
  const next=scheme==='light'?'light':'dark';
  document.documentElement.setAttribute('data-color-scheme', next);
  try{localStorage.setItem('colorScheme', next)}catch(e){}
  const btn=$('colorSchemeToggle');
  if(btn){
    btn.setAttribute('aria-pressed', String(next==='light'));
    btn.textContent=next==='light'?'☀ Claro':'☾ Escuro';
  }
}
function initColorScheme(){
  let scheme='dark';
  try{
    const saved=localStorage.getItem('colorScheme');
    if(saved==='light'||saved==='dark') scheme=saved;
  }catch(e){}
  applyColorScheme(scheme);
}
function api(path,body){
  const options=body===undefined?{credentials:'same-origin'}:{method:'POST',credentials:'same-origin',headers:{'content-type':'application/json'},body:JSON.stringify(body)};
  return fetch(path,options).then(async r=>{const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||r.statusText);return data});
}
function sync(){
  $('send').disabled=sending;
  $('saveConfig').textContent=apiReady?'conectado':'conectar modelo';
  $('saveConfig').classList.toggle('connected', apiReady);
  $('startSession').textContent=sessionStarted?'Sessão iniciada':'começar sessão';
  $('startSession').classList.toggle('connected', sessionStarted);
  $('restartSession').hidden=!sessionStarted;
  $('goalLabel').textContent=sessionStarted?'Tópico':'Objetivo';
  $('goal').placeholder=sessionStarted?'Digite um novo tópico para contextualizar':'O que você quer aprender a construir na Solana?';
  $('keyField').hidden=apiReady;
  $('prompt').placeholder=!apiReady||sessionReady?'Pergunte, descreva o que quer construir ou cole seu código...':'Comece a sessão à esquerda…';
  $('emptyState').hidden=Boolean($('messages').querySelector('.msg'));
}
function wipeApiKey(){
  const field=$('apiKey');
  if(!field) return;
  const next=document.createElement('input');
  next.id='apiKey';
  next.type='password';
  next.autocomplete='new-password';
  next.placeholder='sk-…';
  field.replaceWith(next);
}
function add(role,text,options){
  const row=document.createElement('div');
  row.className='msg '+role;
  const bubble=document.createElement('div');
  bubble.className='bubble';
  const who=document.createElement('div');
  who.className='bubble-who';
  who.textContent=role==='user'?'Você':'Luma';
  const body=document.createElement('div');
  body.className='bubble-body';
  body.innerHTML=renderMarkdown(text);
  bubble.append(who,body);
  row.append(bubble);
  if(role==='assistant'){
    const optionRow=document.createElement('div');
    optionRow.className='option-row';
    row.append(optionRow);
    if(options&&options.length) renderOptions(optionRow,options);
  }
  $('messages').append(row);
  $('messages').scrollTop=$('messages').scrollHeight;
  sync();
  return row;
}
function startAssistant(){
  const row=add('assistant','…');
  row.classList.add('streaming');
  return row;
}
function renderOptions(container,labels){
  container.replaceChildren();
  (labels||[]).forEach(function(label){
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='option-btn';
    btn.textContent=label;
    btn.onclick=function(){
      if(sending) return;
      container.querySelectorAll('button').forEach(function(item){item.disabled=true});
      send(label);
    };
    container.append(btn);
  });
}
function disableOptions(){
  document.querySelectorAll('.option-btn').forEach(function(btn){btn.disabled=true});
}
function fillSession(session){
  if(!session) return;
  if(session.displayName) $('displayName').value=session.displayName;
  if(session.goal) $('goal').value=session.goal;
}
function resetToCleanSession(){
  history.length=0;
  sessionReady=false;
  sessionStarted=false;
  currentTopic='';
  $('displayName').value='';
  $('goal').value='';
  $('consent').checked=false;
  $('sessionStatus').textContent='';
  $('messages').querySelectorAll('.msg').forEach(function(node){node.remove()});
}
function resetChat(){
  history.length=0;
  $('messages').querySelectorAll('.msg').forEach(function(node){node.remove()});
}
async function persistSession(displayName,goal){
  const session=await api('/api/session',{displayName:displayName,goal:goal,consentToStoreProfile:true});
  sessionReady=true;
  sessionStarted=true;
  currentTopic=goal;
  fillSession(session);
  $('sessionStatus').textContent='';
  sync();
  return session;
}
initColorScheme();
$('colorSchemeToggle').onclick=()=>{
  const cur=document.documentElement.getAttribute('data-color-scheme')==='light'?'light':'dark';
  applyColorScheme(cur==='dark'?'light':'dark');
};
$('messages').addEventListener('click',e=>{
  const btn=e.target.closest('[data-copy-code]');
  if(!btn) return;
  const code=btn.closest('.code-block').querySelector('code');
  const value=code?code.textContent:'';
  navigator.clipboard.writeText(value).then(()=>{
    btn.textContent='Copiado';
    setTimeout(()=>{btn.textContent='Copiar'},1200);
  }).catch(()=>{});
});
$('saveConfig').onclick=async()=>{
  try{
    if(apiReady && !$('apiKey').value.trim()){
      $('configStatus').textContent='API já conectada. A chave não fica na tela.';
      return;
    }
    $('configStatus').textContent='Verificando a chave…';
    const data=await api('/api/config',{baseUrl:$('baseUrl').value,model:$('model').value,apiKey:$('apiKey').value});
    apiReady=true;
    wipeApiKey();
    $('configStatus').textContent='API externa conectada.';
    $('modelBadge').textContent=(data.llm&&data.llm.model?data.llm.model:data.provider||'API').toUpperCase();
    sync();
  }catch(e){$('configStatus').textContent=e.message;apiReady=false;sync()}
};
$('startSession').onclick=async()=>{
  try{
    if(!$('consent').checked) throw new Error('Marque o consentimento.');
    const displayName=$('displayName').value.trim();
    const goal=$('goal').value.trim();
    if(!displayName || !goal) throw new Error('Informe nome e objetivo para começar a sessão.');
    await persistSession(displayName,goal);
    resetChat();
    add('assistant',LUMA_WELCOME);
  }catch(e){$('sessionStatus').textContent=e.message}
};
$('restartSession').onclick=async()=>{
  try{
    if(!sessionStarted) throw new Error('Comece a sessão antes de reiniciar.');
    if(!$('consent').checked) throw new Error('Marque o consentimento.');
    const displayName=$('displayName').value.trim();
    const topic=$('goal').value.trim();
    if(!displayName) throw new Error('Informe o nome.');
    if(!topic) throw new Error('Digite um novo tópico para contextualizar.');
    if(topic===currentTopic){
      $('goal').value='';
      $('goal').focus();
      throw new Error('Digite um tópico diferente no campo Tópico e clique de novo.');
    }
    await persistSession(displayName,topic);
    resetChat();
    add('assistant','Sessão reiniciada. O tópico agora é: '+topic+'. Vamos avançar passo a passo a partir daí.');
  }catch(e){$('sessionStatus').textContent=e.message}
};
async function send(preset){
  const typed=typeof preset==='string';
  const content=(typed?preset:$('prompt').value).trim();
  if(!content) return;
  if(sending) return;
  if(!apiReady){
    if(!typed)$('prompt').value='';
    add('user',content);
    add('assistant','Eu sou Luma, tutor Solana. Para começarmos, conecte uma API externa, como a OpenAI ou outro provedor compatível.');
    return;
  }
  if(!sessionReady){
    if(!typed)$('prompt').value='';
    add('user',content);
    add('assistant','Comece a sessão à esquerda para conversar com Luma.');
    return;
  }
  disableOptions();
  sending=true;sync();
  if(!typed)$('prompt').value='';
  add('user',content);
  history.push({role:'user',content});
  const row=startAssistant();
  const bubble=row.querySelector('.bubble-body');
  const optionRow=row.querySelector('.option-row');
  let text='';
  try{
    const payload={messages:history.slice(-20)};
    const r=await fetch('/api/chat',{method:'POST',credentials:'same-origin',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
    if(!r.ok){
      const data=await r.json().catch(()=>({}));
      throw new Error(data.error||r.statusText);
    }
    const reader=r.body.getReader();
    const decoder=new TextDecoder();
    let buf='';
    let finished=false;
    while(true){
      const chunk=await reader.read();
      buf+=decoder.decode(chunk.value||new Uint8Array(),{stream:!chunk.done});
      const parts=buf.split('\n\n');
      buf=parts.pop();
      for(let i=0;i<parts.length;i++){
        const line=parts[i].split('\n').filter(function(item){return item.indexOf('data:')===0})[0];
        if(!line) continue;
        const data=JSON.parse(line.slice(5).trim());
        if(data.error) throw new Error(data.error);
        if(data.delta){
          text+=data.delta;
          bubble.innerHTML=renderMarkdown(text);
          $('messages').scrollTop=$('messages').scrollHeight;
        }
        if(data.done){
          text=data.message||text;
          bubble.innerHTML=renderMarkdown(text);
          history.push({role:'assistant',content:text});
          renderOptions(optionRow,data.options||[]);
          finished=true;
        }
      }
      if(chunk.done) break;
    }
    if(!finished){
      if(!text) throw new Error('A LLM não retornou uma resposta textual.');
      history.push({role:'assistant',content:text});
    }
  }catch(e){
    bubble.innerHTML=renderMarkdown('[erro] '+e.message);
  }
  finally{
    row.classList.remove('streaming');
    sending=false;sync();
  }
}
$('send').onclick=()=>send();
$('prompt').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}};
void (async()=>{
  resetToCleanSession();
  try{
    const status=await api('/api/status');
    apiReady=status.configured===true;
    if(apiReady){
      $('modelBadge').textContent=(status.model||'API').toUpperCase();
      wipeApiKey();
    }
    add('assistant',LUMA_WELCOME);
    sync();
  }catch{
    add('assistant',LUMA_WELCOME);
    sync();
  }
})();
`;
