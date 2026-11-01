/* ============================================================
   CONFIG — edit these values
   ============================================================ */
const SUPPORT_EMAIL = 'support@pathway.co.za';   // PLACEHOLDER — not shown in the UI; replace with the confirmed support mailbox
const SUPPORT_ENDPOINT = null;                    // BACKEND — set to the support API URL (POST, JSON) to deliver Support-page requests
const SUPPORT_TOPICS = ['Account','Subscription','Results','Technical issue','General question'];
/* Demo learners skip payment and their password is in this file, which anyone
   can read. So the server decides whether they exist at all: unlock a browser
   by visiting /api/demo-access?key=<DEMO_ACCESS_KEY> once. Off for everybody
   else — no pill, no #/demo page, no accounts seeded, no sign-in. */
const SHOW_DEMO_LOGIN = window.PATHWAY_DEMO === true;
const DEMO_PASSWORD = 'Demo1234';                 // DEV ONLY — shared password for the four demo learners
const PLAN_FEATURES = {                           // single source of truth for plan wording everywhere in the app
  annual:  ['12 months of access','Full platform access','All features','One payment for the year'],
  monthly: ['Monthly access','Full platform access','All features','Cancel anytime']
};

/* ============================================================
   GRADE IDENTITY — one Pathway, four evolving grade themes.
   Learner grade → grade content + grade features + grade theme.
   Edit a grade's colours here and every learner screen updates. The Pathway logo is never recoloured.
   ============================================================ */
const GRADE_THEMES = {
  9:  { name:'Purple', chapter:'Create your path', meaning:'the beginning of your journey',
        dark:  {bg:'#140B2C', bg2:'#1C1042', ink:'#F6F2FF', 'ink-2':'#DCD2F2', muted:'#A99BC9', 'glass-2':'rgba(38,22,78,.72)', purple:'#9B6BFF', 'purple-2':'#7C3AED', 'purple-soft':'rgba(155,107,255,.16)', acc:'#9B6BFF', 'acc-rgb':'155,107,255', 'acc2-rgb':'124,58,237', 'btn-a':'#8E5BFF', 'btn-b':'#6A2BE0', 'btn-ink':'#FFFFFF', 'acc-hi':'#C9B2FF'},
        light: {bg:'#FBF7F1', bg2:'#F6EEF9', ink:'#2A1650', 'ink-2':'#4A3A6E', muted:'#7A6C95', line:'rgba(98,60,170,.14)', 'line-2':'rgba(98,60,170,.24)', purple:'#7C3AED', 'purple-2':'#6427D6', 'purple-soft':'rgba(124,58,237,.12)', acc:'#8E5BFF', 'acc-rgb':'124,58,237', 'acc2-rgb':'124,58,237', 'btn-a':'#8E5BFF', 'btn-b':'#6A2BE0', 'btn-ink':'#FFFFFF', 'acc-hi':'#6427D6', shadow:'0 24px 48px -28px rgba(80,40,150,.35), 0 2px 6px -2px rgba(80,40,150,.08)'} },
  10: { name:'Green', chapter:'Connect your path', meaning:'connecting and expanding your path',
        dark:  {bg:'#06170F', bg2:'#0B2619', ink:'#EEFBF3', 'ink-2':'#CBE9D7', muted:'#8DB9A0', 'glass-2':'rgba(10,40,26,.8)', purple:'#3DD68C', 'purple-2':'#16A34A', 'purple-soft':'rgba(61,214,140,.14)', acc:'#3DD68C', 'acc-rgb':'61,214,140', 'acc2-rgb':'22,163,74', 'btn-a':'#2FBF73', 'btn-b':'#15803D', 'btn-ink':'#FFFFFF', 'acc-hi':'#9FF0C4'},
        light: {bg:'#F6FAF7', bg2:'#EAF5EE', ink:'#0F2A1D', 'ink-2':'#2E4A3C', muted:'#5F7A6B', line:'rgba(22,101,52,.14)', 'line-2':'rgba(22,101,52,.24)', purple:'#15803D', 'purple-2':'#166534', 'purple-soft':'rgba(22,163,74,.12)', acc:'#22A45D', 'acc-rgb':'22,163,74', 'acc2-rgb':'22,163,74', 'btn-a':'#22A45D', 'btn-b':'#15803D', 'btn-ink':'#FFFFFF', 'acc-hi':'#166534', shadow:'0 24px 48px -28px rgba(20,90,50,.32), 0 2px 6px -2px rgba(20,90,50,.08)'} },
  11: { name:'Burgundy', chapter:'Polish your path', meaning:'refining your direction',
        dark:  {bg:'#19070D', bg2:'#2A0C16', ink:'#FFF1F3', 'ink-2':'#F0CDD4', muted:'#C0939D', 'glass-2':'rgba(52,14,26,.8)', purple:'#EF5A7A', 'purple-2':'#BE123C', 'purple-soft':'rgba(239,90,122,.15)', acc:'#EF5A7A', 'acc-rgb':'239,90,122', 'acc2-rgb':'159,18,57', 'btn-a':'#C8354F', 'btn-b':'#8A1230', 'btn-ink':'#FFFFFF', 'acc-hi':'#F8B4C2'},
        light: {bg:'#FBF6F6', bg2:'#F6EAEC', ink:'#2B0D16', 'ink-2':'#4F2A34', muted:'#85606A', line:'rgba(130,20,45,.14)', 'line-2':'rgba(130,20,45,.24)', purple:'#9F1239', 'purple-2':'#881337', 'purple-soft':'rgba(159,18,57,.10)', acc:'#B3203F', 'acc-rgb':'159,18,57', 'acc2-rgb':'159,18,57', 'btn-a':'#B3203F', 'btn-b':'#7F1230', 'btn-ink':'#FFFFFF', 'acc-hi':'#881337', shadow:'0 24px 48px -28px rgba(110,20,40,.3), 0 2px 6px -2px rgba(110,20,40,.08)'} },
  12: { name:'Charcoal & Gold', chapter:'Complete your path', meaning:'completing the journey and moving to your next step',
        dark:  {bg:'#0C0C0E', bg2:'#17171B', ink:'#F7F5EF', 'ink-2':'#DAD5C8', muted:'#A39D8F', 'glass-2':'rgba(28,28,32,.86)', purple:'#E9B94F', 'purple-2':'#C9962F', 'purple-soft':'rgba(233,185,79,.13)', acc:'#E9B94F', 'acc-rgb':'233,185,79', 'acc2-rgb':'201,150,47', 'btn-a':'#F2CC72', 'btn-b':'#C9962F', 'btn-ink':'#1A1406', 'acc-hi':'#F6DFA4'},
        light: {bg:'#FAFAF8', bg2:'#F1F0EC', ink:'#141416', 'ink-2':'#3A3A40', muted:'#6E6C66', line:'rgba(20,20,24,.12)', 'line-2':'rgba(20,20,24,.22)', purple:'#8A661C', 'purple-2':'#6E5115', 'purple-soft':'rgba(201,150,47,.12)', acc:'#A67C21', 'acc-rgb':'166,124,33', 'acc2-rgb':'20,20,24', 'btn-a':'#2E2E33', 'btn-b':'#0E0E10', 'btn-ink':'#F2CC72', 'acc-hi':'#6E5115', shadow:'0 24px 48px -28px rgba(20,20,24,.28), 0 2px 6px -2px rgba(20,20,24,.08)'} }
};
/* build the token stylesheet from GRADE_THEMES (grade 9 matches the core Pathway palette) */
(function injectGradeTokens(){
  const css = Object.entries(GRADE_THEMES).map(([g,t])=>{
    const decl = o => Object.entries(o).map(([k,v])=>`--${k}:${v};`).join('');
    return `:root[data-grade="${g}"]:not([data-theme="dark"]){${decl(t.light)}}:root[data-grade="${g}"][data-theme="dark"]{${decl(t.dark)}}`;
  }).join('\n');
  const el=document.createElement('style'); el.id='grade-tokens'; el.textContent=css; document.head.appendChild(el);
})();
const gradeOf = u => String(u?.grade||'');
const gradeTheme = u => GRADE_THEMES[gradeOf(u)] || GRADE_THEMES[9];
function applyGradeTheme(u, on){
  const r=document.documentElement;
  if(on && u && GRADE_THEMES[gradeOf(u)]) r.setAttribute('data-grade', gradeOf(u)); else r.removeAttribute('data-grade');
}
/* grade changes keep every piece of earlier data — they only change the current experience */
function changeGrade(u, g){
  if(String(u.grade)===String(g)) return;
  u.gradeHistory = (u.gradeHistory||[]).concat([{from:String(u.grade), to:String(g), at:Date.now()}]);
  u.grade = String(g);
  if(['10','11','12'].includes(String(g)) && !u.fetStart){ ensureFetStart(u); }   /* first time in Grades 10–12 */
  save();
}

/* ============================================================
   ASSETS
   ============================================================ */
const MARK = window.PATHWAY_ASSETS.MARK;
const SCENE_LIGHT = window.PATHWAY_ASSETS.SCENE_LIGHT;
const SCENE = window.PATHWAY_ASSETS.SCENE;
const WORD = window.PATHWAY_ASSETS.WORD;

/* ============================================================
   ICONS
   ============================================================ */
const P = {
  arrow:'<path d="M5 12h14M13 5l7 7-7 7"/>',
  back:'<path d="M19 12H5M11 19l-7-7 7-7"/>',
  compass:'<circle cx="12" cy="12" r="9.5"/><path d="m15.9 8.1-2.2 5.6-5.6 2.2 2.2-5.6z"/>',
  clipboard:'<rect x="8" y="2.5" width="8" height="4" rx="1"/><path d="M16 4.5h2a2 2 0 0 1 2 2V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2h2M9 12h6M9 16h6"/>',
  upload:'<path d="M4.5 15.5A5 5 0 0 1 7 6.2a6.5 6.5 0 0 1 12.3 2.3 4.5 4.5 0 0 1 .2 8.6"/><path d="M12 12v9M8.5 15.5 12 12l3.5 3.5"/>',
  dna:'<path d="M7 3c0 6 10 6 10 12s-10 6-10 6"/><path d="M17 3c0 6-10 6-10 12 0 3 2.5 4.5 5 5.5"/><path d="M8.5 6.5h7M9 17.5h6M10 12h4"/>',
  chart:'<path d="M3 21h18"/><path d="M6 17v-4M11 17V8M16 17v-6M20 17V4"/>',
  briefcase:'<rect x="2.5" y="7" width="19" height="13.5" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2.5 13h19"/>',
  book:'<path d="M2 4.5h6a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z"/><path d="M22 4.5h-6a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h7z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  home:'<path d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-7H9v7H4.5A1.5 1.5 0 0 1 3 20z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
  moon:'<path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/>',
  lock:'<rect x="4" y="11" width="16" height="10.5" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11M12 15v2.5"/>',
  mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m21.5 7-9.5 6.5L2.5 7"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:'<path d="M9.9 4.2A10 10 0 0 1 12 4c6.5 0 10 8 10 8a17 17 0 0 1-2.2 3.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6M2 2l20 20M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5"/>',
  shield:'<path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10z"/><path d="M12 10v3"/><circle cx="12" cy="9" r="0.6"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  monitor:'<rect x="2" y="3.5" width="20" height="13.5" rx="2"/><path d="M8 21h8M12 17v4"/>',
  heart:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  layers:'<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="m2 13 10 5 10-5"/><path d="m2 18 10 5 10-5" opacity=".5"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/><circle cx="12" cy="12" r="2.2"/>',
  cap:'<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.7 9 2.7 12 0v-5M22 10v6"/>',
  calendar:'<rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 10h18M8 14h2M14 14h2M8 18h2M14 18h2"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.2-6"/>',
  star:'<path d="M12 2.5c.6 4.6 2.4 6.9 7 7.5-4.6.6-6.4 2.9-7 7.5-.6-4.6-2.4-6.9-7-7.5 4.6-.6 6.4-2.9 7-7.5z"/>',
  file:'<path d="M14 2.5H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5z"/><path d="M14 2.5v6h6M9 13h6M9 17h6"/>',
  clock:'<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
  bulb:'<path d="M9 18h6M10 21.5h4M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.6.5 1 1.3 1 2.2h5.6c0-.9.4-1.7 1-2.2A6.5 6.5 0 0 0 12 2.5z"/>',
  puzzle:'<path d="M19.4 14.5a2 2 0 1 0 0-4H18V7a1 1 0 0 0-1-1h-3.5V4.6a2 2 0 1 0-4 0V6H6a1 1 0 0 0-1 1v3.5h1.4a2 2 0 1 1 0 4H5V18a1 1 0 0 0 1 1h3.5v-1.4a2 2 0 1 1 4 0V19H17a1 1 0 0 0 1-1v-3.5z"/>',
  palette:'<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7h2A5.5 5.5 0 0 0 22 11c0-5-4.5-9-10-9z"/>',
  wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  chat:'<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  shapes:'<path d="M8.3 10a.7.7 0 0 1-.6-1.1l3.7-6a.7.7 0 0 1 1.2 0l3.7 6a.7.7 0 0 1-.6 1.1z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  info:'<circle cx="12" cy="12" r="9.5"/><path d="M12 16v-4.5M12 8h.01"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  trend:'<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  headset:'<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/><path d="M18 17v1a3 3 0 0 1-3 3h-3"/>',
  flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',
  card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>'
};
const I = (n, cls='') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||''}</svg>`;
const ARROW = I('arrow','arrow');

/* ============================================================
   STORE (prototype: this browser only)
   ============================================================ */
const KEY = 'pathway.proto.v1';
let DB;
try { DB = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch(e) { DB = null; }
if (!DB || typeof DB !== 'object') DB = {};
DB.users = DB.users || {}; DB.session = DB.session || null;
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(DB)); }catch(e){} }
function me(){ return DB.session ? DB.users[DB.session] || null : null; }
/* DEMO / TEST ACCOUNTS — testing only; they skip payment and are not the real subscription logic */
/* DEMO / TEST ACCOUNTS — development testing only; the product owner removes them manually when development is complete.
   RULE: a demo account = a real learner account + demo learner data. It is an ordinary record in DB.users, rendered by
   exactly the same grade components, grade configuration (GRADE_THEMES, grade content, journeys, features) and routes as
   every real learner. Never add demo-specific interface branches: any change to a grade's experience must reach its demo
   learner automatically. The only demo-specific things are data (below) and access (no payment required). */
const DEMO_ACCOUNTS = [
  {first:'Olwethu',   surname:'Ngcobo',    gender:'male',   email:'olwethu@demo.pathway',   grade:'9',  term:1, dob:'2011-03-14'},
  {first:'Sivenkosi', surname:'Tshotwana', gender:'female', email:'sivenkosi@demo.pathway', grade:'10', term:2, dob:'2010-06-02'},
  {first:'Tony',      surname:'Kobile',    gender:'male',   email:'tony@demo.pathway',      grade:'11', term:3, dob:'2009-09-21'},
  {first:'Zamakhele', surname:'Kunene',    gender:'female', email:'zama@demo.pathway',      grade:'12', term:4, dob:'2008-11-05'}
];
const isDemo = u => !!(u && u.demoAccount);
const hasAccess = u => !!(u && (u.sub || u.paymentRequired === false));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function hash(pw){
  try{ const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('pathway:'+pw)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  catch(e){ let h=0; for(const c of 'pathway:'+pw){h=(h*31+c.charCodeAt(0))|0} return 'f'+h; }
}

function migrateProgress(){
  Object.values(DB.users).forEach(u=>{ const p=u.progress; if(!p) { u.progress=freshProgress(); return; }
    /* earlier prototype formats are archived, never deleted */
    if(!p.a1 || Array.isArray(p.a1.answers) || !p.a1.sections){ const g8=p.g8||{marks:{},file:null,done:false}; const archive=(p.archive||[]).concat([{archivedAt:Date.now(), reason:'assessment format updated (prototype)', data:JSON.parse(JSON.stringify({...p, archive:undefined}))}]); u.progress=freshProgress(); u.progress.g8=g8; u.progress.archive=archive; return; }
    (p.fet?.courseTargets||[]).forEach(c=>{ if(c.courseId) return; const uni=UNI_DB.find(x=>x.name===c.uni); const co=uni?.courses.find(x=>x.name.toLowerCase()===String(c.course).toLowerCase()); if(uni) c.uniId=uni.id; if(co){ c.courseId=co.id; c.faculty=c.faculty||co.faculty; } });   /* link earlier targets to imported data where names match exactly */
    p.g9=p.g9||{}; p.dnaHistory=p.dnaHistory||[]; p.archive=p.archive||[]; p.dnaStages=p.dnaStages||{};
    if(p.dna){ p.dnaHistory.push({legacy:true, archivedAt:Date.now(), dna:p.dna}); delete p.dna; }
    /* create any stage whose milestone was already confirmed before stages existed */
    if(dnaInputsReady(u)) DNA_STAGE_DEFS.forEach(d=>{ if(p.dnaStages[d.key]) return; if(d.term && !isApproved(p.g9?.[d.term])) return;
      const st=requestStage(u,d.key); st.status='ready'; st.readyAt=st.requestedAt; st.migrated=true; }); });
}
async function seedDemoAccounts(){
  if (!SHOW_DEMO_LOGIN) return;   /* never create them in a browser the server has not unlocked */
  const pw = await hash(DEMO_PASSWORD);
  DEMO_ACCOUNTS.forEach(d=>{
    const ex = DB.users[d.email];
    /* Existing demo data is always kept. The configured grade is applied when the account is created or when the
       configuration above changes; after that the grade behaves exactly like a real learner's (e.g. Update my grade). */
    const cfgChanged = !ex || ex.demoConfigGrade !== d.grade;
    const grade = cfgChanged ? d.grade : String(ex.grade);
    if(ex && ex.grade && String(ex.grade)!==grade) ex.gradeHistory=(ex.gradeHistory||[]).concat([{from:String(ex.grade), to:grade, at:Date.now(), reason:'demo account configuration'}]);
    const {grade:_g, ...profile} = d;
    DB.users[d.email] = Object.assign({progress:freshProgress(), createdAt:Date.now(), sub:null}, ex||{}, profile, {grade, demoConfigGrade:d.grade, pw, demoAccount:true, paymentRequired:false});
    const du=DB.users[d.email];
    if(['10','11','12'].includes(grade) && (du.demoConfigTerm!==d.term || du.fetStart?.grade!==grade)){ du.sim={term:d.term}; du.fetStart={grade, term:d.term, date:new Date().toISOString(), firstKey:firstKeyFor(+grade,d.term), keep:true}; du.demoConfigTerm=d.term; }
  });
  save();
}

/* Support requests: posts to SUPPORT_ENDPOINT when configured; until then requests are kept in a local queue */
async function submitSupportRequest(payload){
  if (SUPPORT_ENDPOINT){
    try{ const r = await fetch(SUPPORT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}); return {ok:r.ok}; }
    catch(e){ return {ok:false}; }
  }
  DB.supportQueue = (DB.supportQueue||[]).concat([payload]); save();
  await new Promise(r=>setTimeout(r,600));
  return {ok:true, queued:true};
}

/* ============================================================
   DEMO / DEVELOPMENT TOOL — "Restart Learner Journey"
   Shown ONLY while signed in as one of the four demo accounts. It never changes the rules for real learners:
   it only resets the selected demo learner's own progress data. Previous data is archived, never deleted,
   and the demo account itself (profile, grade, theme, experience) is untouched.
   ============================================================ */
const DEMO_RESETS = [
  {id:'section',     title:'Reset the current section',       desc:'Clears the assessment section in progress so you can start it again.'},
  {id:'assessments', title:'Reset assessment progress',        desc:'Clears Pathway Assessments 1 and 2. Grade 8 results and Pathway DNA are cleared too, because they come after the assessments.'},
  {id:'results',     title:'Reset results',                    desc:'Keeps both assessments. Clears Grade 8 and Grade 9 results and every Pathway DNA stage.'},
  {id:'terms',       title:'Reset Grade 9 term results',       desc:'Keeps the assessments, Grade 8 results and Initial Pathway DNA. Clears Grade 9 Terms 1–4 and their DNA stages.'},
  {id:'fetTargets',  title:'Reset targets and plans (Grades 10–12)', desc:'Clears university and course targets, saved careers, applications, deadlines and checklists. Keeps results.'},
  {id:'termNext',    title:'Move to the next term (Grades 10–12)', desc:'Simulates the school calendar moving on, so the next report becomes due. Nothing is deleted.'},
  {id:'termReset',   title:'Back to the starting term (Grades 10–12)', desc:'Returns the simulated term to the demo learner’s sign-up term.'},
  {id:'dnaNow',      title:'Finish Pathway DNA processing now', desc:'Opens any stage that is still “taking shape” immediately. Nothing is reset.'},
  {id:'all',         title:'Reset everything',                 desc:'Returns this learner to the very start of their journey.'}
];
function resetDemoLearner(u, mode){
  if(!u || !isDemo(u)) return false;                                   /* real learners can never be reset */
  const P=u.progress;
  if(!['dnaNow','termNext','termReset'].includes(mode)) P.archive=(P.archive||[]).concat([{archivedAt:Date.now(), reason:`demo reset: ${mode} (testing only)`, data:JSON.parse(JSON.stringify({...P, archive:undefined}))}]);
  const clearResults = () => { P.g8={marks:{},file:null,done:false}; P.g9={}; P.dnaStages={}; };
  if(mode==='section'){ ['a1','a2'].forEach(k=>{ const a=P[k]; if(a.active){ delete a.sections[a.active]; a.active=null; } }); }
  if(mode==='assessments'){ P.a1=freshA(); P.a2=freshA(); clearResults(); }
  if(mode==='results'){ clearResults(); if(P.fet) P.fet.record={}; }
  if(mode==='fetTargets' && P.fet){ const rec=P.fet.record, subj=P.fet.subjects; P.fet=freshFet(); P.fet.record=rec; P.fet.subjects=subj; }
  if(mode==='terms'){ P.g9={}; ['t1','t2','t3','t4'].forEach(k=>{ if(P.dnaStages) delete P.dnaStages[k]; }); }
  if(mode==='termNext' && isFET(u)){ u.sim={term:Math.min(4,(u.sim?.term||learnerTerm(u))+1)}; }
  if(mode==='termReset' && isFET(u) && u.fetStart){ u.sim={term:u.fetStart.term}; }
  if(mode==='dnaNow'){ Object.values(P.dnaStages||{}).forEach(s=>{ if(s.status==='processing') s.readyAt=Date.now()-1; }); }
  if(mode==='all'){ const arch=P.archive; u.progress=freshProgress(); u.progress.archive=arch; }
  save(); return true;
}
function demoToolsHTML(u){
  return `<div class="devbar"><button class="devpill" id="devpill" aria-haspopup="dialog" aria-label="Demo tools: restart journey">${I('refresh')} DEMO<span class="dpl"> · Restart journey</span></button></div>`;
}
function openDemoTools(){
  const u=me(); if(!u || !isDemo(u)) return;
  const act = activeAssessment(u);
  const el=document.createElement('div'); el.className='overlay devoverlay'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Demo tools');
  el.innerHTML=`<div class="glass devpanel">
    <div class="devtag">Demo / development tool — not part of the learner experience</div>
    <h2>Restart ${esc(u.first)}’s journey</h2>
    <p class="hint">Only affects this demo learner. Previous data is archived, and the account, grade and theme stay the same.</p>
    <div class="devopts">${DEMO_RESETS.map(r=>{ const off = r.id==='section' && !act; return `<button class="devopt${r.id==='all'?' danger':''}" data-reset="${r.id}" ${off?'disabled':''}><b>${r.title}</b><small>${off?'No section is in progress right now.':r.desc}</small></button>`; }).join('')}</div>
    <div class="actions" style="justify-content:flex-end"><button class="btn btn-ghost btn-sm" id="devclose">Close</button></div></div>`;
  document.body.appendChild(el);
  const close=()=>el.remove();
  el.addEventListener('click',e=>{ if(e.target===el) close(); });
  el.querySelector('#devclose').addEventListener('click',close);
  el.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',()=>{
    const r=DEMO_RESETS.find(x=>x.id===b.dataset.reset);
    if(!['dnaNow','termNext','termReset'].includes(r.id) && !confirm(`${r.title} for ${u.first}? (Demo testing only — previous data is archived.)`)) return;
    resetDemoLearner(u, r.id); close(); VIEW={}; clearInterval(TICK);
    go(r.id==='dnaNow' ? (location.hash.includes('/dna')?location.hash:'#/dna') : '#/home'); render();
    toast(r.id==='dnaNow' ? 'Pathway DNA processing finished (demo).' : r.id.startsWith('term') ? `${u.first} is now in Term ${learnerTerm(u)} (demo).` : `${r.title} — done for ${u.first} (demo).`,'refresh');
  }));
}

/* ============================================================
   THEME
   ============================================================ */
function setTheme(t){ document.documentElement.setAttribute('data-theme', t); DB.theme = t; save(); }
function themeBtn(){ return `<button class="theme" data-act="theme" aria-label="Switch between light and dark mode"><span class="sun">${I('sun')}</span><span class="moon">${I('moon')}</span></button>`; }
if (!DB.theme) document.documentElement.setAttribute('data-theme','dark');

/* ============================================================
   DATES & SCHOOL CALENDAR (DBE 2026 public school calendar)
   ============================================================ */
/* ============================================================
   OFFICIAL SCHOOL CALENDAR — single source of truth for term names and dates across Pathway
   (home term badge, Upcoming Dates, My Results and Pathway DNA). Add each new year here when the DBE publishes it.
   Source: Department of Basic Education, 2026 national public-school calendar. The published calendar notes a few
   variations for some school arrangements in brackets; Pathway uses the national dates below.
   ============================================================ */
const SCHOOL_CALENDAR = {
  2026: { source:'Department of Basic Education — 2026 public school calendar', terms:[
    {n:1, s:'2026-01-14', e:'2026-03-27'},
    {n:2, s:'2026-04-08', e:'2026-06-26'},
    {n:3, s:'2026-07-21', e:'2026-09-23'},
    {n:4, s:'2026-10-06', e:'2026-12-09'} ] }
};
const CAL_YEAR = 2026;
const TERMS = SCHOOL_CALENDAR[CAL_YEAR].terms;
const termOf = n => TERMS.find(t=>t.n===n);
const fmtShort = s => { const d=d0(s); return `${d.getDate()} ${['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()]} ${d.getFullYear()}`; };
const d0 = s => { const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); };
const today = () => { const n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); };
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function termLabel(){
  const t = today();
  for (const x of TERMS){ if (t>=d0(x.s) && t<=d0(x.e)) return {main:`Term ${x.n}`}; }
  const nxt = TERMS.find(x => t < d0(x.s));
  if (nxt){ const s=d0(nxt.s); return {main:`Term ${nxt.n}`, note:`starts ${s.getDate()} ${MON[s.getMonth()]}`}; }
  return {main:'Holidays'};
}
function greeting(){ const h=new Date().getHours(); return h<12?'Good morning':h<17?'Good afternoon':'Good evening'; }
function longDate(){ return new Date().toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long',year:'numeric'}); }

/* ============================================================
   ASSESSMENT 1 — Mathematics route evidence (Question Bank v1.0)
   Source of truth: "PATHWAY Grade 9 Assessment 1 — Question Bank & Answer Key".
   Learners never see keys, tags, marks or scoring.
   ============================================================ */
/* ---------- MATHS RENDERING — one reusable renderer for every fraction in the assessments ----------
   frac(n,d) draws a stacked textbook fraction (numerator over a bar over denominator).
   mathify(html) runs on every piece of assessment text shown to learners (questions, options, sources, ordering items,
   See My Answers) and converts any Unicode fraction (¾, ⅔, ⅙ …), fraction-slash form (3⁄4) or {{3/4}} token into
   the same stacked form — so new fraction questions render correctly automatically. */
const frac = (n,d) => `<span class="mfrac" role="math" aria-label="${n} over ${d}"><span class="fr-num">${n}</span><span class="fr-den">${d}</span></span>`;
const fr = frac;
const UNICODE_FRACTIONS = {'½':[1,2],'⅓':[1,3],'⅔':[2,3],'¼':[1,4],'¾':[3,4],'⅕':[1,5],'⅖':[2,5],'⅗':[3,5],'⅘':[4,5],'⅙':[1,6],'⅚':[5,6],'⅐':[1,7],'⅛':[1,8],'⅜':[3,8],'⅝':[5,8],'⅞':[7,8],'⅑':[1,9],'⅒':[1,10]};
function mathify(html){
  return String(html??'')
    .replace(/\{\{\s*(\d+)\s*\/\s*(\d+)\s*\}\}/g,(m,a,b)=>frac(a,b))
    .replace(/(\d+)\s*\u2044\s*(\d+)/g,(m,a,b)=>frac(a,b))
    .replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅐⅛⅜⅝⅞⅑⅒]/g,c=>frac(...UNICODE_FRACTIONS[c]))
    .replace(/([A-Za-zℓ)])([²³])/g,(m,a,e)=>`${a}<sup class="msup">${e==='²'?2:3}</sup>`);   /* cm², m³ → proper superscripts */
}
/* a typed answer that is just a fraction (e.g. "5/6") is shown stacked when read back */
const mathifyTyped = t => /^\s*\d+\s*\/\s*\d+\s*$/.test(String(t)) ? frac(...String(t).split('/').map(x=>x.trim())) : esc(t);
const isFractionAnswer = q => (q.key||[]).some(k=>/^\d+\/\d+$/.test(k));
const tbl = (rows) => `<div class="src-table"><table>${rows.map((r,i)=>`<tr>${r.map(c=>i===0||r===rows[0]?`<th>${c}</th>`:`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
const tblH = (rows) => `<div class="src-table"><table>${rows.map(r=>`<tr><th>${r[0]}</th>${r.slice(1).map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

const A1_SECTIONS = [
 {id:'A', title:'Number sense and calculation', intro:'Working with numbers, fractions, percentages and ratios.', mins:10, calc:false, qs:[
  {id:'A1',type:'short',q:'Calculate: 48 ÷ 6 + 7',key:['15'],marks:1,skill:'numerical fluency',topic:'order of operations',diff:1,tags:['fluency']},
  {id:'A2',type:'short',q:'Calculate: −7 + 12 − (−3)',key:['8'],marks:1,skill:'numerical fluency',topic:'integers',diff:2,tags:['fluency']},
  {id:'A3',type:'mc',q:`What is ${fr(3,4)} of 60?`,opts:['45','80','15','48'],ans:0,marks:1,skill:'fraction sense',topic:'fractions',diff:1,tags:['fluency']},
  {id:'A4',type:'short',q:`Calculate and give your answer as a fraction in simplest form: ${fr(2,3)} + ${fr(1,6)}`,key:['5/6'],marks:1,skill:'fraction operations',topic:'fractions',diff:2,tags:['fluency']},
  {id:'A5',type:'mc',q:'Calculate: 0,25 × 84',opts:['21','33,6','16,8','24'],ans:0,marks:1,skill:'numerical fluency',topic:'decimals',diff:2,tags:['fluency']},
  {id:'A6',type:'short',q:'Calculate 15% of 240.',key:['36'],marks:1,skill:'percentage sense',topic:'percentages',diff:1,tags:['applied']},
  {id:'A7',type:'mc',q:'R240 is shared between two people in the ratio 3 : 5. How much does the person with the smaller share get?',opts:['R90','R144','R80','R120'],ans:0,marks:1,skill:'proportional reasoning',topic:'ratio',diff:2,tags:['proportional']},
  {id:'A8',type:'short',q:'Calculate: 2<sup>3</sup> × 2<sup>2</sup>',key:['32'],marks:1,skill:'exponent laws',topic:'exponents',diff:2,tags:['abstract']},
  {id:'A9',type:'mc',q:'Which of these is the largest?',opts:[fr(5,8),'0,606','62%','0,6'],ans:0,marks:1,skill:'number sense',topic:'number comparison',diff:3,tags:['numberSense']},
  {id:'A10',type:'short',q:'A price of R250 increases by 12%. What is the new price, in rand?',key:['280'],marks:1,skill:'percentage increase',topic:'percentages',diff:2,tags:['applied'],unit:'R'}
 ]},
 {id:'B', title:'Algebra, patterns and relationships', intro:'Expressions, equations, patterns and the rules behind them.', mins:10, calc:false, qs:[
  {id:'B1',type:'short',q:'Simplify: 3x + 5x − 2x',key:['6x'],marks:1,skill:'simplifying',topic:'expressions',diff:1,tags:['abstract'],text:true},
  {id:'B2',type:'short',q:'If x = 4, what is the value of 3x − 7?',key:['5'],marks:1,skill:'substitution',topic:'substitution',diff:1,tags:['abstract']},
  {id:'B3',type:'mc',q:'Look at the table. Which equation describes the relationship?',src:tblH([['x','2','4','6'],['y','7','11','15']]),opts:['y = 2x + 3','y = x + 5','y = 3x + 1','y = 2x + 5'],ans:0,marks:2,skill:'finding a rule',topic:'relationships',diff:3,tags:['relationships']},
  {id:'B4',type:'short',q:'Solve for x: 2x + 3 = 13',key:['5','x=5'],marks:1,skill:'solving equations',topic:'equations',diff:1,tags:['abstract']},
  {id:'B5',type:'mc',q:'A pattern starts 3; 7; 11; 15; … Which rule gives the <i>n</i><sup>th</sup> term?',opts:['T<sub><i>n</i></sub> = 4<i>n</i> − 1','T<sub><i>n</i></sub> = 4<i>n</i> + 1','T<sub><i>n</i></sub> = <i>n</i> + 4','T<sub><i>n</i></sub> = 3<i>n</i> + 4'],ans:0,marks:2,skill:'generalising',topic:'patterns',diff:3,tags:['patterns']},
  {id:'B6',type:'short',q:'A rule says y = 3x − 2. What is y when x = 7?',key:['19','y=19'],marks:1,skill:'applying a rule',topic:'relationships',diff:1,tags:['relationships']},
  {id:'B7',type:'mc',q:'For which value of x is 5x − 4 = 26 true?',opts:['6','5,2','4,4','30'],ans:0,marks:1,skill:'reverse reasoning',topic:'equations',diff:2,tags:['abstract']},
  {id:'B8',type:'explain',q:'Thabo writes: 2(x + 3) = 2x + 3.',ask:'Write the correct expansion in the answer box, then explain in the box below what Thabo did wrong.',key:['2x+6'],marks:3,skill:'identifying an error',topic:'expressions',diff:3,tags:['understanding','communication'],text:true,workLabel:'What did Thabo do wrong?'},
  {id:'B9',type:'order',q:'Put these steps in the right order to solve 4x − 5 = 11.',items:['Start with 4x − 5 = 11','Add 5 to both sides: 4x = 16','Divide both sides by 4: x = 4','Check: 4(4) − 5 = 11'],marks:2,skill:'method and sequence',topic:'equations',diff:2,tags:['method']},
  {id:'B10',type:'mc',q:'Which expression means “5 less than triple a number n”?',opts:['3n − 5','5 − 3n','3(n − 5)','n − 15'],ans:0,marks:1,skill:'translating words',topic:'expressions',diff:2,tags:['abstract','communication']}
 ]},
 {id:'C', title:'Geometry, measurement and space', intro:'Angles, shapes, area, volume and picturing objects.', mins:8, calc:false, qs:[
  {id:'C1',type:'short',q:'Two angles lie on a straight line. One is 115°. What is the size of the other, in degrees?',key:['65'],marks:1,skill:'angle relationships',topic:'angles',diff:1,tags:['spatial'],unit:'°'},
  {id:'C2',type:'short',q:'A rectangle is 12 cm long and 7 cm wide. What is its area, in cm²?',key:['84'],marks:1,skill:'measurement',topic:'area',diff:1,tags:['spatial'],unit:'cm²'},
  {id:'C3',type:'mc',q:'A square has an area of 36 cm². What is its perimeter?',opts:['24 cm','36 cm','18 cm','12 cm'],ans:0,marks:2,skill:'reverse reasoning',topic:'area and perimeter',diff:3,tags:['spatial','relationships']},
  {id:'C4',type:'short',q:'Two angles of a triangle are 45° and 65°. What is the third angle, in degrees?',key:['70'],marks:1,skill:'angle relationships',topic:'triangles',diff:1,tags:['spatial'],unit:'°'},
  {id:'C5',type:'mc',q:'What is the volume of a cube with sides of 4 cm?',opts:['64 cm³','16 cm³','48 cm³','12 cm³'],ans:0,marks:1,skill:'measurement',topic:'volume',diff:2,tags:['spatial']},
  {id:'C6',type:'short',q:'A rectangle has a perimeter of 30 cm. Its length is 9 cm. What is its width, in cm?',key:['6'],marks:1,skill:'reverse reasoning',topic:'perimeter',diff:2,tags:['spatial','relationships'],unit:'cm'},
  {id:'C7',type:'mc',q:'This flat net is folded into a cube. Face A is above face C. Faces B, C, D and E lie in a row. Face F is below face C. Which face ends up opposite face B?',src:'net',opts:['Face D','Face A','Face F','Face E'],ans:0,marks:2,skill:'spatial visualisation',topic:'3D objects',diff:3,tags:['spatial']},
  {id:'C8',type:'short',q:'A plan is drawn to a scale of 1 : 50. A wall measures 6 cm on the plan. How long is the real wall, in metres?',key:['3','3m','300cm'],marks:2,skill:'proportional reasoning',topic:'scale',diff:3,tags:['proportional','spatial'],unit:'m'}
 ]},
 {id:'D', title:'Data and chance', intro:'Reading data, averages and probability.', mins:7, calc:false, qs:[
  {id:'D1',type:'short',q:'Calculate the mean of: 4; 8; 10; 6; 12',key:['8'],marks:1,skill:'summarising data',topic:'mean',diff:1,tags:['data']},
  {id:'D2',type:'short',q:'What is the median of: 3; 7; 9; 4; 12',key:['7'],marks:1,skill:'summarising data',topic:'median',diff:2,tags:['data']},
  {id:'D3',type:'mc',q:'What is the mode of: 2; 5; 5; 7; 9; 5',opts:['5','7','2','5,5'],ans:0,marks:1,skill:'summarising data',topic:'mode',diff:1,tags:['data']},
  {id:'D4',type:'short',q:'What is the range of: 14; 22; 9; 30',key:['21'],marks:1,skill:'summarising data',topic:'range',diff:1,tags:['data']},
  {id:'D5',type:'mc',q:'A fair six-sided die is rolled once. What is the probability of getting an even number?',opts:[fr(1,2),fr(1,3),fr(2,3),fr(1,6)],ans:0,marks:1,skill:'probability',topic:'probability',diff:2,tags:['data']},
  {id:'D6',type:'mc',q:'The table shows how many learners chose each sport. Which statement does the data support?',src:tbl([['Sport','Soccer','Netball','Athletics','Swimming'],['Learners','18','12','8','6']]),opts:['Half of the learners chose soccer','Netball was the most popular sport','More learners chose swimming than athletics','Athletics and swimming together were more popular than netball'],ans:3,marks:2,skill:'drawing conclusions',topic:'data interpretation',diff:3,tags:['data','understanding']},
  {id:'D7',type:'open',q:'A class has a mean mark of 60%, but most learners scored below 50%.',ask:'Explain how this is possible.',marks:3,skill:'interpreting averages',topic:'averages',diff:3,tags:['understanding','communication'],review:true}
 ]},
 {id:'E', title:'Everyday mathematics', intro:'Money, measurement, time and distance in real situations.', mins:10, calc:true, qs:[
  {id:'E1',type:'short',q:'A jacket costs R680. It is discounted by 15%. What do you pay, in rand?',key:['578'],marks:1,skill:'applied percentage',topic:'percentages',diff:2,tags:['applied'],unit:'R'},
  {id:'E2',type:'short',q:'Rice costs R42,50 per kilogram. What do 3 kg cost, in rand?',key:['127,50','127.50','127,5'],marks:1,skill:'applied calculation',topic:'rates',diff:1,tags:['applied'],unit:'R'},
  {id:'E3',type:'mc',q:'A taxi costs R18,50 each way. What does it cost to travel to school and back on 22 school days?',opts:['R814,00','R407,00','R1 628,00','R740,00'],ans:0,marks:2,skill:'multi-step calculation',topic:'money',diff:2,tags:['applied']},
  {id:'E4',type:'short',q:'A bus travels 240 km in 3 hours. What is its average speed, in km/h?',key:['80'],marks:1,skill:'rate reasoning',topic:'rate',diff:1,tags:['applied','proportional'],unit:'km/h'},
  {id:'E5',type:'short',q:'Nomsa earns R3 200 a month and spends 35% on rent. How much rent does she pay, in rand?',key:['1120'],marks:1,skill:'applied percentage',topic:'budget',diff:2,tags:['applied'],unit:'R'},
  {id:'E6',type:'mc',q:'Which is better value for money?',opts:['2 ℓ of juice for R56,00','750 mℓ of juice for R21,75','They cost exactly the same per millilitre','There is not enough information'],ans:0,marks:2,skill:'comparing options',topic:'unit price',diff:3,tags:['applied','proportional']},
  {id:'E7',type:'short',q:'A water tank holds 1,25 m³. How many litres is that? (1 m³ = 1 000 ℓ)',key:['1250'],marks:1,skill:'measurement conversion',topic:'conversion',diff:2,tags:['applied'],unit:'ℓ'},
  {id:'E8',type:'working',q:'A cellphone plan costs R199 a month and includes 100 minutes. Every extra minute costs R1,20.',ask:'Sipho uses 145 minutes in a month. What is his total bill, in rand?',key:['253'],marks:3,skill:'multi-step calculation',topic:'money',diff:3,tags:['applied','method'],unit:'R'},
  {id:'E9',type:'short',q:'A recipe for 6 people uses 450 g of flour. How much flour is needed for 10 people, in grams?',key:['750'],marks:2,skill:'proportional reasoning',topic:'proportion',diff:2,tags:['proportional'],unit:'g'},
  {id:'E10',type:'mc',q:'R5 000 is invested at 8% simple interest a year. How much interest is earned in 2 years?',opts:['R800','R400','R5 800','R8 000'],ans:0,marks:2,skill:'financial reasoning',topic:'simple interest',diff:3,tags:['applied','financial']}
 ]},
 {id:'F', title:'Problem solving and reasoning', intro:'Multi-step problems where your method matters as much as your answer.', mins:10, calc:true, qs:[
  {id:'F1',type:'working',q:'A shop buys a kettle for R200. It adds 40% to get the selling price. Later it takes 25% off that selling price in a sale.',ask:'What is the sale price, in rand? Show how you worked it out.',key:['210'],marks:3,skill:'multi-step reasoning',topic:'percentages',diff:4,tags:['applied','method'],unit:'R'},
  {id:'F2',type:'mc',q:'A learner worked out 20% of 350 like this:',src:'<div class="src-steps"><div>Step 1: 20% = 0,2</div><div>Step 2: 0,2 × 350 = 700</div><div>Step 3: So the answer is 700.</div></div>',ask:'Where did the learner go wrong?',opts:['Step 2: 0,2 × 350 = 70, not 700','Step 1: 20% is not 0,2','Step 3: they should have divided','Nothing is wrong'],ans:0,marks:2,skill:'identifying errors',topic:'percentages',diff:3,tags:['understanding']},
  {id:'F3',type:'explain',q:'Which is bigger: 25% of 80, or 80% of 25?',ask:'Give your answer, then explain why.',key:['equal','the same','same','20'],contains:true,marks:3,skill:'understanding structure',topic:'percentages',diff:3,tags:['understanding','communication'],text:true,workLabel:'Explain why'},
  {id:'F4',type:'working',q:'A bus leaves at 07:20. It travels for 3 hours 45 minutes, stops for 25 minutes, then travels for another 1 hour 10 minutes.',ask:'What time does it arrive? Show your working.',key:['12:40','12h40','12.40','1240'],marks:3,skill:'multi-step reasoning',topic:'time',diff:3,tags:['applied','method'],text:true,ph:'e.g. 09:15'},
  {id:'F5',type:'mc',q:'Two learners work out 12,5% of 320.',src:'<div class="src-steps"><div>Ayanda: 320 ÷ 8 = 40</div><div>Lerato: 0,125 × 320 = 40</div></div>',ask:'Which statement is true?',opts:['Both methods are correct','Only Ayanda’s method is correct','Only Lerato’s method is correct','Neither method is correct'],ans:0,marks:2,skill:'comparing methods',topic:'percentages',diff:3,tags:['understanding','method']},
  {id:'F6',type:'working',q:'A rectangle’s length is 3 cm more than its width. The perimeter is 26 cm.',ask:'What is the width, in cm? Show your working.',key:['5'],marks:3,skill:'modelling a problem',topic:'equations',diff:4,tags:['abstract','method'],unit:'cm'},
  {id:'F7',type:'open',q:'Explain why multiplying a number by 0,5 gives the same result as dividing it by 2.',marks:3,skill:'explaining why',topic:'number sense',diff:3,tags:['understanding','communication'],review:true},
  {id:'F8',type:'mc',q:'A farmer keeps chickens and sheep. Altogether there are 20 heads and 56 legs.',ask:'How many sheep are there?',opts:['8','12','14','6'],ans:0,marks:2,skill:'reasoning with constraints',topic:'problem solving',diff:4,tags:['abstract','method']}
 ]},
 {id:'G', title:'Mathematical challenge', intro:'Puzzles that need careful thinking rather than new knowledge.', mins:8, calc:true, qs:[
  {id:'G1',type:'mc',q:'What comes next? 2; 6; 12; 20; 30; …',opts:['42','40','36','44'],ans:0,marks:2,skill:'pattern recognition',topic:'patterns',diff:4,tags:['patterns']},
  {id:'G2',type:'short',q:'3 pencils and 2 pens cost R37. 3 pencils and 4 pens cost R59.',ask:'What does one pen cost, in rand?',key:['11'],marks:2,skill:'reasoning with constraints',topic:'problem solving',diff:4,tags:['abstract','method'],unit:'R'},
  {id:'G3',type:'mc',q:'Every square is a rectangle. Some rectangles are not squares.',ask:'Which statement must be true?',opts:['A shape that is not a rectangle cannot be a square','Every rectangle is a square','A square cannot be a rectangle','Some squares are not rectangles'],ans:0,marks:2,skill:'logical deduction',topic:'logic',diff:4,tags:['logical']},
  {id:'G4',type:'short',q:'What is the last digit of 7<sup>4</sup>?',key:['1'],marks:1,skill:'number structure',topic:'exponents',diff:3,tags:['numberSense','patterns']},
  {id:'G5',type:'order',q:'Put these values in order, from smallest to largest.',items:['0,58',fr(3,5),'61%',fr(5,8)],marks:2,skill:'number sense',topic:'number comparison',diff:4,tags:['numberSense']},
  {id:'G6',type:'working',q:`A tank loses ${fr(1,4)} of its water. Then it loses ${fr(1,3)} of what is left.`,ask:'What fraction of the original water remains? Show your working.',key:['1/2','0.5'],marks:3,skill:'multi-step reasoning',topic:'fractions',diff:4,tags:['fluency','method']},
  {id:'G7',type:'short',q:'How many whole numbers from 1 to 100 are divisible by both 3 and 4?',key:['8'],marks:2,skill:'structured counting',topic:'number theory',diff:4,tags:['numberSense','logical']}
 ]}
];
/* DNA tag groups (from the question bank) */
const A1_GROUPS = {
  abstractMathematics:['abstract','patterns','relationships','numberSense','fluency'],
  appliedMathematics:['applied','proportional','financial'],
  logical:['logical','method','understanding'],
  patterns:['patterns'], spatial:['spatial'], data:['data']
};
/* learner-facing names for evidence areas (never shown with numbers) */
const A1_TAG_WORDS = {
  abstract:'algebra and working with symbols', patterns:'spotting and extending patterns', relationships:'finding rules and relationships',
  numberSense:'number sense and comparing values', fluency:'calculating accurately', applied:'everyday calculations with money and percentages',
  proportional:'ratio, rate and proportion', financial:'financial calculations', spatial:'shapes, space and measurement',
  data:'reading data and working with chance', logical:'logical reasoning', method:'working through problems step by step',
  understanding:'understanding why a method works', communication:'explaining your thinking'
};

/* ============================================================
   ASSESSMENT 2 — Elective subject & reasoning evidence (Question Bank v1.0)
   Source of truth: "PATHWAY Grade 9 Assessment 2 — Question Bank & Answer Key".
   Part A is scored by subject area and reasoning skill; Part B (About You) is never scored.
   ============================================================ */
const A2_SECTIONS = [
 {id:'NS', area:'Natural Sciences', title:'How things work', mins:6, qs:[
  {id:'NS1',type:'mc',recall:true,q:'A learner puts the same amount of water in two open dishes. One stands in the sun, one in the shade. After a day the dish in the sun holds less water.',ask:'What best explains this?',opts:['Warmer water evaporates faster','The sun destroyed some of the water','Water in the shade expands','Sunlight makes water heavier'],ans:0,marks:1,skill:'applying a principle'},
  {id:'NS2',type:'mc',recall:true,q:'A circuit has a battery, a switch and two bulbs in a single loop. One bulb is removed from its holder and the other goes out.',ask:'What does this tell you about the circuit?',opts:['The bulbs are connected in series','The battery is flat','The bulbs are connected in parallel','The switch is faulty'],ans:0,marks:1,skill:'applying a principle'},
  {id:'NS3',type:'mc',q:'A learner wants to test whether plants grow taller with more sunlight. She puts one plant on a sunny windowsill and one in a dark cupboard. She waters the sunny plant daily and the cupboard plant twice a week.',ask:'Why can she not trust her result?',opts:['Two things were changed, so she cannot tell which one caused the difference','Plants cannot grow in a cupboard at all','She should have used seeds instead of plants','Sunlight has no effect on plant growth'],ans:0,marks:2,skill:'evaluating evidence'},
  {id:'NS4',type:'mc',q:'A cup of hot water was left to cool. The table shows its temperature.',src:tblH([['Time (minutes)','0','5','10','15','20'],['Temperature (°C)','90','72','60','53','50']]),ask:'What does the pattern show?',opts:['It cools quickly at first and then more slowly','It cools at the same rate throughout','It cools slowly at first and then faster','The temperature rises after 15 minutes'],ans:0,marks:2,skill:'interpreting data'},
  {id:'NS5',type:'mc',q:'Identical ice cubes were wrapped in different materials.',src:tbl([['Material','Time for ice to melt'],['Wrapped in wool','48 min'],['Wrapped in foil','26 min'],['Wrapped in paper','35 min'],['Not wrapped','22 min']]),ask:'Which conclusion does the data support?',opts:['Wool is the best insulator of the materials tested','Foil keeps heat out better than wool','Paper conducts heat better than foil','Wrapping ice always makes it melt faster'],ans:0,marks:2,skill:'drawing conclusions'},
  {id:'NS6',type:'mc',q:'A school’s water tank fills from the roof when it rains, but the water comes out cloudy with bits of leaf in it.',ask:'Which change would deal with the problem at its source?',opts:['Fit a mesh filter where the gutter enters the tank','Paint the tank a lighter colour','Raise the tank higher off the ground','Use a wider outlet tap'],ans:0,marks:2,skill:'problem solving'},
  {id:'NS7',type:'short',q:'A steel bridge has small gaps left between its sections.',ask:'In one or two words, what happens to the steel on a hot day that makes those gaps necessary?',accept:['expands','expand','expansion','gets bigger','grows','bigger','longer'],marks:2,skill:'cause and effect',limit:30,limitLabel:'Answer in 1–2 words (maximum 30 characters)'},
  {id:'NS8',type:'rubric',q:'Two learners measure the same rock. One says it weighs 240 g, the other says 255 g.',ask:'Explain what they should do next, and why.',rubric:['measure again','repeat','check','average','same scale','third measurement','more measurements'],marks:3,skill:'evaluating evidence'}
 ]},
 {id:'AC', area:'Accounting and financial reasoning', title:'Keeping track of money', mins:5, qs:[
  {id:'AC1',type:'mc',recall:true,q:'A shop buys a new fridge with cash to use in the shop.',ask:'What happens to what the business owns?',opts:['It stays the same in total: cash goes down and equipment goes up','It increases, because the business now has a fridge','It decreases, because cash was spent','It only changes once the fridge is used'],ans:0,marks:2,skill:'applying a principle'},
  {id:'AC2',type:'mc',q:'A tuck shop sells rolls for R12 each. Each roll costs R7 to make. Rent is R600 a month, whatever they sell.',ask:'Which statement is correct?',opts:['The shop must sell 120 rolls a month before it starts making a profit','Each roll sold makes R12 profit','Rent changes with the number of rolls sold','The shop makes a profit on any month it sells rolls'],ans:0,marks:2,skill:'decision making'},
  {id:'AC3',type:'mc',q:'A small business recorded its sales and costs.',src:tbl([['Month','Sales','Costs'],['April','R8 400','R6 200'],['May','R9 100','R7 600'],['June','R9 800','R9 000']]),ask:'What is the most important thing this table shows?',opts:['Sales are rising but profit is shrinking','The business is losing money every month','Costs are under control','Sales are falling each month'],ans:0,marks:2,skill:'interpreting data'},
  {id:'AC4',type:'mc',q:'A learner runs a small printing service. A customer wants 200 pages printed now and offers to pay at the end of the month.',ask:'What is the main risk to the business?',opts:['Money is spent on paper and ink now, but comes in later','The customer may want a different colour','Printing 200 pages takes too long','The price of paper will fall'],ans:0,marks:2,skill:'decision making'},
  {id:'AC5',type:'match',q:'Match each item to where it belongs in a small business’s records.',pairs:[['Delivery bicycle','Something the business owns'],['Money owed to a supplier','Something the business owes'],['Cash in the till','Something the business owns'],['Monthly rent paid','An expense']],marks:4,skill:'applying a principle'}
 ]},
 {id:'EC', area:'Economics and business reasoning', title:'Business and the economy', mins:5, qs:[
  {id:'EC1',type:'mc',recall:true,q:'Heavy rain destroys much of the country’s tomato crop.',ask:'What is most likely to happen to tomato prices in the shops?',opts:['They rise, because there are fewer tomatoes to sell','They fall, because farmers need to sell quickly','They stay the same, because prices are fixed','They fall, because people stop buying tomatoes'],ans:0,marks:1,skill:'applying a principle'},
  {id:'EC2',type:'mc',q:'A spaza shop owner has R2 000 to spend. She can restock airtime, which sells out fast at a small profit each, or restock cooldrink, which sells slowly at a larger profit each. It is the middle of winter.',ask:'What should she weigh up most carefully?',opts:['How quickly each product turns back into cash at this time of year','Which product she personally prefers','Which product has the prettier packaging','Which supplier is closest to the shop'],ans:0,marks:2,skill:'decision making'},
  /* EC3: the question bank marks "R18" as correct, but its own explanation (and the arithmetic) show R14 brings in the most (R2 520). Scored here as R14 — confirm with the question bank owner. */
  {id:'EC3',type:'mc',q:'A bakery tested different prices.',src:tblH([['Price of a loaf','R14','R16','R18','R20'],['Loaves sold per day','180','150','115','70']]),ask:'Which price brought in the most money in a day?',opts:['R18','R14','R16','R20'],ans:1,marks:2,skill:'interpreting data',keyNote:'bank lists R18; corrected to R14'},
  {id:'EC4',type:'mc',q:'A new shopping centre opens near a township high street. Several small shops on the high street close within a year.',ask:'Which explanation fits the situation best?',opts:['Customers moved their spending to the new centre','The small shops all ran out of stock at once','The population of the area suddenly fell','Rent on the high street was abolished'],ans:0,marks:2,skill:'cause and effect'},
  {id:'EC5',type:'short',q:'A business wants more customers without lowering its prices.',ask:'Name one thing it could change. Answer in a few words.',accept:['advertis','market','quality','service','location','hours','range','delivery','stock','promot'],marks:2,skill:'decision making',limit:40,limitLabel:'Answer in a few words (maximum 40 characters)'}
 ]},
 {id:'HI', area:'History', title:'Reading the past', mins:5, qs:[
  {id:'HI1',type:'mc',recall:true,q:'A historian finds a letter written by a soldier during a war, and a newspaper report about the same battle published fifty years later.',ask:'What is true about these two sources?',opts:['The letter is a primary source and the newspaper report is a secondary source','Both are primary sources because both describe the battle','The newspaper is more reliable because it was written later','The letter cannot be used because one person’s view is not history'],ans:0,marks:1,skill:'interpreting a source'},
  {id:'HI2',type:'mc',q:'Read the source.',src:'<blockquote class="src-quote">“The new factory has brought work to our town. My sons earn wages for the first time. The air is thick, and my youngest coughs at night, but we eat.”<cite>— Written by a townswoman, 1889</cite></blockquote>',ask:'What does this source suggest about the factory?',opts:['It brought both benefits and harm to the same family','It was welcomed by everyone in the town','It made no difference to how people lived','It was opposed by the writer'],ans:0,marks:2,skill:'interpreting a source'},
  {id:'HI3',type:'mc',q:'A historian must use both of these sources.',src:'<div class="src-steps"><div><b>Source A:</b> a mine owner’s report saying workers were housed comfortably.</div><div><b>Source B:</b> a doctor’s notes recording overcrowding and illness in the same compound.</div></div>',ask:'What is the best approach?',opts:['Use both, and consider why each writer might describe it differently','Use only the doctor’s notes, because doctors are always right','Use only the owner’s report, because he ran the compound','Use neither, because they disagree'],ans:0,marks:2,skill:'evaluating evidence'},
  {id:'HI4',type:'mc',q:'A town grows quickly after a railway line reaches it. Shops open, and people move there for work.',ask:'Which statement describes cause and consequence correctly?',opts:['The railway was a cause; the town’s growth was a consequence','The town’s growth caused the railway to be built','The two events are unconnected','The shops caused the railway to arrive'],ans:0,marks:2,skill:'cause and effect'},
  {id:'HI5',type:'rubric',q:'Two accounts of the same event disagree about who started it.',ask:'Explain why two people who were both there might remember it differently.',rubric:['different','position','saw','perspective','memory','side','part of','where they were','point of view','time'],marks:3,skill:'interpreting a source'}
 ]},
 {id:'GE', area:'Geography', title:'People and places', mins:6, qs:[
  {id:'GE1',type:'mc',recall:true,q:'On a map with a scale of 1 : 50 000, two schools are 4 cm apart.',ask:'How far apart are they on the ground?',opts:['2 km','200 m','20 km','500 m'],ans:0,marks:1,skill:'spatial reasoning'},
  {id:'GE2',type:'mc',q:'A river runs from the north-east corner to the south-west corner. The contour lines are close together along the eastern side and far apart in the west. A village sits in the west, beside the river.',ask:'What does this description tell you about the land around the village?',opts:['The village is on flatter ground than the eastern side','The village is on the steepest part of the area','The river flows uphill towards the village','The eastern side is flat and open'],ans:0,marks:2,skill:'interpreting a map'},
  {id:'GE3',type:'mc',q:'Look at this rainfall record.',src:tblH([['Month','Jan','Apr','Jul','Oct'],['Rainfall (mm)','12','48','105','40']]),ask:'Which statement does this rainfall pattern support?',opts:['Most rain falls in winter, which suits a Western Cape pattern','Most rain falls in summer, as in most of South Africa','Rainfall is spread evenly through the year','The area receives almost no rain'],ans:0,marks:2,skill:'interpreting data'},
  {id:'GE4',type:'mc',q:'A hillside above a settlement is cleared of trees for firewood. After heavy rain, mud slides into the settlement.',ask:'What is the clearest link?',opts:['Roots that held the soil were removed, so the soil moved with the water','The rain became heavier because the trees were cut','The settlement was built too close to the river','Mud slides happen regardless of vegetation'],ans:0,marks:2,skill:'cause and effect'},
  {id:'GE5',type:'mc',q:'A town must choose a site for a new clinic. Site 1 is central but on a floodplain. Site 2 is on higher ground 6 km from most homes, with no taxi route.',ask:'What is the strongest argument for choosing Site 1 with flood protection over Site 2?',opts:['People can reach it, and flood risk can be reduced by building measures','Building on a floodplain is cheaper','Site 2 has better views of the town','Flooding only affects homes, not clinics'],ans:0,marks:2,skill:'decision making'},
  {id:'GE6',type:'match',q:'Match each feature to what it usually tells you on a map.',pairs:[['Contour lines very close together','Steep slope'],['A blue line widening downstream','A river gathering water'],['Many buildings clustered together','A settlement'],['A dashed line across open ground','A track or footpath']],marks:4,skill:'identifying patterns'}
 ]},
 {id:'TE', area:'Technology', title:'Design and systems', mins:6, qs:[
  {id:'TE1',type:'mc',recall:true,q:'A shelf bends in the middle when books are placed on it.',ask:'Which change would strengthen it without making it thicker?',opts:['Add a support bracket underneath the centre','Paint it with a harder varnish','Make the shelf longer','Move the books to the ends'],ans:0,marks:1,skill:'applying a principle'},
  {id:'TE2',type:'mc',q:'An automatic gate has a sensor, a controller and a motor. The gate does not open when a car arrives, but it does open from the remote.',ask:'Which part is most likely at fault?',opts:['The sensor','The motor','The gate hinges','The power supply'],ans:0,marks:2,skill:'systems thinking'},
  {id:'TE3',type:'mc',q:'A designer must choose a material for an outdoor bench in a coastal town.',ask:'Which reason matters most?',opts:['It must resist rust and salt air','It must be the cheapest available','It must be the same colour as the buildings','It must be light enough to carry'],ans:0,marks:2,skill:'creative/design reasoning'},
  {id:'TE4',type:'mc',q:'Learners design a phone stand from cardboard. It holds the phone, but tips over when the phone is tapped.',ask:'What is the best first change?',opts:['Widen the base so the weight is better supported','Use a brighter colour of cardboard','Make the stand taller','Cut a hole for the charging cable'],ans:0,marks:2,skill:'problem solving'},
  {id:'TE5',type:'short',q:'In a system, input leads to a process, which leads to an output.',ask:'In a kettle, the input is electricity and the output is hot water. In one or two words, what is the process?',accept:['heating','heats','heat','boiling','boils','heat the water','heating the water'],marks:2,skill:'systems thinking',limit:30,limitLabel:'Answer in 1–2 words (maximum 30 characters)'},
  {id:'TE6',type:'match',q:'Match each design need to the property that matters most.',pairs:[['A bridge deck','Strength under load'],['A raincoat','Waterproofing'],['An oven glove','Heat resistance'],['An electrical cable’s covering','Electrical insulation']],marks:4,skill:'applying a principle'}
 ]},
 {id:'CA', area:'Creative Arts', title:'Making and interpreting', mins:4, qs:[
  {id:'CA1',type:'mc',q:'A poster must be read from across a hall.',ask:'Which choice would help most?',opts:['Strong contrast between the text and the background','More colours in the background','A longer, more detailed heading','A decorative script typeface'],ans:0,marks:1,skill:'creative/design reasoning'},
  {id:'CA2',type:'mc',q:'Read the description of a photograph.',src:'<blockquote class="src-quote">In a photograph, a single figure stands at the far left of the frame. The rest of the picture is empty road stretching to the right, into the distance.</blockquote>',ask:'What does this composition most likely communicate?',opts:['Distance and being alone','Crowding and noise','Celebration','Speed and danger'],ans:0,marks:2,skill:'interpreting information'},
  {id:'CA3',type:'match',q:'Match each choice to the effect it usually creates.',pairs:[['Dark, heavy lighting on stage','Tension or fear'],['A fast, loud drum rhythm','Energy and urgency'],['Warm colours in a painting','Warmth or comfort'],['A long pause in a scene','Attention on what comes next']],marks:4,skill:'interpreting information'},
  {id:'CA4',type:'rubric',q:'You must design a logo for a school recycling club.',ask:'Describe one idea, and explain why it would work.',rubric:['recycl','green','arrow','leaf','earth','bin','colour','simple','clear','symbol'],marks:3,skill:'creative/design reasoning'}
 ]},
 {id:'AG', area:'Agricultural Sciences', title:'Growing things', mins:4, qs:[
  {id:'AG1',type:'mc',recall:true,q:'A farmer plants maize in the same field every year and the harvest gets smaller each season.',ask:'What is the most likely reason?',opts:['The same nutrients are being used up each year','Maize seeds get weaker over time','The field gets smaller each year','Maize cannot grow twice in one place'],ans:0,marks:1,skill:'applying a principle'},
  {id:'AG2',type:'mc',q:'Three fields were given different amounts of compost.',src:tbl([['Field','Compost added','Harvest (kg)'],['A','None','410'],['B','Light','520'],['C','Heavy','545']]),ask:'What does the data suggest about adding compost?',opts:['It improves the harvest, but adding much more gives little extra','The more compost added, the bigger the harvest, without limit','Compost makes no difference to the harvest','Compost reduces the harvest'],ans:0,marks:2,skill:'interpreting data'},
  {id:'AG3',type:'mc',q:'A vegetable garden on a slope loses soil every time it rains hard.',ask:'Which approach deals with the cause?',opts:['Plant rows across the slope so water is slowed','Water the garden more often','Plant the rows straight down the slope','Remove the remaining plants'],ans:0,marks:2,skill:'problem solving'}
 ]},
 {id:'AY', area:null, title:'About You', about:true, mins:0, qs:[
  {id:'AY1',type:'pref',q:'When you are given a difficult task, which sounds most like you?',opts:[['I like figuring out how something works',['enjoys_investigation','enjoys_problem_solving']],['I like finding information and comparing what I discover',['enjoys_working_with_data','enjoys_investigation']],['I like creating something different',['enjoys_creating','enjoys_design']],['I like discussing the problem with other people',['prefers_collaborative_work','enjoys_working_with_people']],['I like breaking the problem into smaller steps',['enjoys_problem_solving','prefers_structured_tasks']]]},
  {id:'AY2',type:'multi',q:'Which of these do you actually enjoy?',hint:'Choose as many as you like.',opts:[['Building or fixing things',['enjoys_practical_work','interested_in_technology']],['Drawing, designing or making',['enjoys_creating','interested_in_creative_fields']],['Working out why something happened',['enjoys_investigation','interested_in_science']],['Helping someone understand something',['enjoys_explaining','enjoys_helping_people']],['Organising money, stock or plans',['interested_in_business','prefers_structured_tasks']],['Being outdoors, with plants or animals',['interested_in_environment','interested_in_agriculture']],['Reading about people and how they lived',['interested_in_people_and_society']],['Working with computers or technology',['enjoys_technology','interested_in_technology']]]},
  {id:'AY3',type:'pref',q:'Which kind of school project do you enjoy most?',opts:[['An experiment or investigation',['enjoys_investigation','interested_in_science']],['A design or a build',['enjoys_design','enjoys_practical_work']],['A research project you write up',['enjoys_working_with_data','interested_in_people_and_society']],['A group presentation',['prefers_collaborative_work','enjoys_explaining']],['Something creative or performed',['enjoys_creating','interested_in_creative_fields']]]},
  {id:'AY4',type:'pref',q:'Would you rather…',opts:[['Work on your own at your own pace',['prefers_independent_work']],['Work in a small group',['prefers_collaborative_work']],['It depends on the task',['prefers_open_ended_tasks']]]},
  {id:'AY5',type:'pref',q:'Which task sounds better to you?',opts:[['One with clear steps to follow',['prefers_structured_tasks']],['One where you decide how to do it',['prefers_open_ended_tasks']]]},
  {id:'AY6',type:'pref',q:'Which would you rather spend an afternoon doing?',opts:[['Taking something apart to see inside',['enjoys_investigation','enjoys_practical_work']],['Making something look good',['enjoys_design','enjoys_creating']],['Sorting out a plan or a budget',['interested_in_business','prefers_structured_tasks']],['Helping someone who is stuck',['enjoys_helping_people','enjoys_explaining']],['Looking up facts about something that interests you',['enjoys_working_with_data','enjoys_investigation']]]},
  {id:'AY7',type:'pref',q:'Do you prefer learning by…',opts:[['Doing it with your hands',['enjoys_practical_work']],['Reading and thinking about it',['enjoys_working_with_data']],['Watching someone and then trying',['enjoys_practical_work','prefers_collaborative_work']],['Talking it through with others',['prefers_collaborative_work','enjoys_explaining']]]},
  {id:'AY8',type:'multi',q:'Which subjects or school activities do you genuinely enjoy?',hint:'Choose any.',none:7,opts:[['Natural Sciences',['interested_in_science']],['EMS',['interested_in_business']],['History',['interested_in_people_and_society']],['Geography',['interested_in_environment']],['Technology',['interested_in_technology']],['Creative Arts',['interested_in_creative_fields']],['Sport or physical activity',['enjoys_practical_work']],['None of these especially',[]]]},
  {id:'AY9',type:'multi',q:'Which do you enjoy least?',hint:'Choose any. This won’t count against you.',none:6,opts:[['Natural Sciences',['dislikes_science']],['EMS',['dislikes_business']],['History',['dislikes_history']],['Geography',['dislikes_geography']],['Technology',['dislikes_technology']],['Creative Arts',['dislikes_creative']],['There isn’t one I dislike',[]]]},
  {id:'AY10',type:'text',q:'What is something you can spend a lot of time doing without getting bored?',ph:'Anything at all — it doesn’t have to be about school.'},
  {id:'AY11',type:'text',q:'What do you think you are naturally good at?',ph:'In your own words.'},
  {id:'AY12',type:'text',q:'What do you find difficult or frustrating, and would like to get better at?',ph:'Everyone has something.'},
  {id:'AY13',type:'text',q:'Is there a job or kind of work you have wondered about? Is there one you know is not for you?',ph:'Either, both, or “I’m not sure yet” — all fine.'},
  {id:'AY14',type:'pref',q:'Where do you imagine yourself working one day?',opts:[['Outdoors or moving around',['interested_in_environment','enjoys_practical_work']],['A workshop, lab or site',['enjoys_practical_work','interested_in_science']],['An office or working with people',['enjoys_working_with_people','interested_in_business']],['A studio or creative space',['interested_in_creative_fields','enjoys_creating']],['With computers, from anywhere',['enjoys_technology','interested_in_technology']],['I really don’t know yet',[]]]},
  /* AY15 — added in v1.1: stated career interest (feeds PATHWAY DNA and, later, Career Explorer) */
  {id:'AY15',type:'career',q:'Do you have an idea of what you would like to be one day?'}
 ]}
];
/* How each Assessment 2 subject area connects to school subjects and FET electives (from the question bank) */
const A2_AREA_LINKS = {
  NS:{g8:['ns'], informs:'Physical Sciences or Life Sciences'},
  AC:{g8:['ems'], informs:'Accounting'},
  EC:{g8:['ems'], informs:'Economics or Business Studies'},
  HI:{g8:['ss'], informs:'History'},
  GE:{g8:['ss'], informs:'Geography or Tourism'},
  TE:{g8:['tech'], informs:'Engineering Graphics and Design, IT or CAT'},
  CA:{g8:['ca'], informs:'Visual Arts, Design, Dramatic Arts or Music'},
  AG:{g8:['ns'], informs:'Agricultural Sciences'}
};
const A2_SKILL_WORDS = {
  'applying a principle':'applying a rule or principle to a new situation','interpreting data':'reading tables and data',
  'decision making':'weighing up options and making decisions','cause and effect':'working out causes and effects',
  'evaluating evidence':'judging whether evidence can be trusted','problem solving':'solving practical problems',
  'interpreting a source':'reading and questioning sources','creative/design reasoning':'thinking through design choices',
  'interpreting information':'interpreting what an image, sound or scene communicates','identifying patterns':'recognising patterns and features',
  'systems thinking':'understanding how the parts of a system work together','drawing conclusions':'drawing conclusions from results',
  'interpreting a map':'reading maps','spatial reasoning':'working with scale and space'
};
const SIGNAL_WORDS = {
  enjoys_investigation:'finding out how and why things happen', enjoys_problem_solving:'solving problems', enjoys_working_with_data:'finding and comparing information',
  enjoys_creating:'creating things', enjoys_design:'designing', prefers_collaborative_work:'working with others', enjoys_working_with_people:'working with people',
  prefers_structured_tasks:'clear, structured tasks', enjoys_practical_work:'practical, hands-on work', interested_in_technology:'technology',
  interested_in_creative_fields:'creative fields', interested_in_science:'science', enjoys_explaining:'explaining things to others', enjoys_helping_people:'helping people',
  interested_in_business:'business and money', interested_in_environment:'the environment and the outdoors', interested_in_agriculture:'plants, animals and farming',
  interested_in_people_and_society:'people and society', enjoys_technology:'working with computers', prefers_independent_work:'working independently', prefers_open_ended_tasks:'deciding your own approach'
};

/* ============================================================
   CAREER DATABASE — shared by Assessment 2, PATHWAY DNA and (later) Career Explorer
   Families describe GENERAL school-subject expectations only. Requirements differ between
   universities, universities of technology, TVET colleges and programmes — always check the institution.
   maths: 'required' = Mathematics is usually required · 'preferred' = Mathematics keeps most options open
          'either' = Mathematics or Mathematical Literacy is often accepted · 'technical' = Mathematics or Technical Mathematics
   ============================================================ */
const CAREER_FAMILIES = [
 {id:'health', name:'Health and medical sciences', maths:'required', subjects:['Physical Sciences','Life Sciences'], combos:['health'],
  needs:'Most health science degrees usually ask for Mathematics, Physical Sciences and Life Sciences, with strong marks. Some programmes, such as certain nursing qualifications, have different requirements.',
  careers:'Doctor|Surgeon|Paediatrician|Psychiatrist|Anaesthetist|Dentist|Dental Therapist|Oral Hygienist|Pharmacist|Physiotherapist|Occupational Therapist|Speech-Language Therapist|Audiologist|Nurse|Midwife|Radiographer|Dietitian|Optometrist|Paramedic (Emergency Medical Care)|Medical Technologist|Clinical Technologist|Biomedical Scientist|Chiropractor|Podiatrist|Orthotist and Prosthetist|Environmental Health Practitioner|Biokineticist|Medical Researcher'},
 {id:'engineering', name:'Engineering', maths:'required', subjects:['Physical Sciences','Engineering Graphics and Design'], combos:['engineering','technical','computing'],
  needs:'Engineering degrees usually require Mathematics and Physical Sciences, often with strong marks. Engineering Graphics and Design can be a helpful extra subject. Engineering diplomas and technician routes may have different entry options.',
  careers:'Civil Engineer|Mechanical Engineer|Electrical Engineer|Electronic Engineer|Chemical Engineer|Industrial Engineer|Mechatronics Engineer|Mining Engineer|Metallurgical Engineer|Aeronautical Engineer|Agricultural Engineer|Biomedical Engineer|Computer Engineer|Environmental Engineer|Marine Engineer|Robotics Engineer|Renewable Energy Engineer|Engineering Technologist|Engineering Technician'},
 {id:'built', name:'Architecture and the built environment', maths:'required', subjects:['Physical Sciences','Engineering Graphics and Design','Visual Arts'], combos:['engineering','creative'],
  needs:'Most built-environment degrees usually ask for Mathematics. Physical Sciences is needed for some programmes, and Engineering Graphics and Design or Visual Arts can help, especially for architecture, where a portfolio may also be requested.',
  careers:'Architect|Architectural Technologist|Landscape Architect|Quantity Surveyor|Construction Manager|Town Planner|Land Surveyor|Property Developer|Building Inspector|Draughtsperson|Interior Architect|Urban Designer'},
 {id:'computing', name:'Computing and information technology', maths:'required', subjects:['Information Technology','Physical Sciences'], combos:['computing'],
  needs:'Computer science and many IT degrees usually ask for Mathematics. Information Technology at school is helpful but not always required. Some IT diplomas and short courses have wider entry options.',
  careers:'Software Developer|Software Engineer|Web Developer|Mobile App Developer|Game Developer|Data Scientist|Data Engineer|Cybersecurity Specialist|Network Engineer|Systems Administrator|Cloud Engineer|DevOps Engineer|Machine Learning Engineer|Information Systems Specialist|Database Administrator|IT Support Technician|IT Project Manager|Computer Scientist|UX Designer|UI Designer'},
 {id:'data', name:'Economics, statistics and data', maths:'required', subjects:['Economics','Information Technology'], combos:['commerce','computing'],
  needs:'Economics, statistics and data degrees usually ask for Mathematics, often with strong marks. Economics and Information Technology can be helpful school subjects.',
  careers:'Economist|Data Analyst|Statistician|Econometrician|Business Intelligence Analyst|Market Research Analyst|Mathematician|Quantitative Analyst'},
 {id:'finance', name:'Accounting, finance and actuarial science', maths:'required', subjects:['Accounting','Economics'], combos:['commerce'],
  needs:'Chartered accountancy, actuarial science and most finance degrees usually ask for Mathematics — actuarial science typically needs very strong Mathematics. Accounting at school is helpful for many of these routes but is not always required.',
  careers:'Actuary|Chartered Accountant|Accountant|Auditor|Internal Auditor|Forensic Accountant|Management Accountant|Financial Analyst|Credit Analyst|Investment Analyst|Risk Analyst|Financial Planner|Tax Consultant|Banker|Stockbroker|Insurance Underwriter|Bookkeeper'},
 {id:'business', name:'Business, management and marketing', maths:'preferred', subjects:['Business Studies','Economics','Accounting'], combos:['business','commerce'],
  needs:'Requirements vary. Many business and management degrees ask for Mathematics, while some diplomas and programmes accept Mathematical Literacy. Business Studies, Economics and Accounting are helpful school subjects.',
  careers:'Entrepreneur|Business Manager|Marketing Specialist|Brand Manager|Digital Marketer|Social Media Manager|Human Resources Specialist|Recruiter|Sales Manager|Supply Chain Manager|Logistics Manager|Procurement Specialist|Project Manager|Business Analyst|Management Consultant|Operations Manager|Retail Manager|Real Estate Agent|Office Administrator|Industrial Psychologist'},
 {id:'law', name:'Law and justice', maths:'either', subjects:['History','Business Studies'], combos:['society'],
  needs:'Law degrees usually focus on your overall marks and strong language results rather than particular elective subjects. Mathematical Literacy is often accepted. History can help you practise reading and arguing from evidence.',
  careers:'Lawyer|Attorney|Advocate|Prosecutor|Magistrate|Judge|Legal Adviser|Paralegal|Conveyancer|Compliance Officer|Criminologist'},
 {id:'education', name:'Education and training', maths:'either', subjects:['History','Life Sciences','Geography'], combos:['society','health','environment'],
  needs:'Teaching requirements depend on the phase and subjects you would like to teach. To teach a subject such as Mathematics or Physical Sciences in the higher grades, you usually need to have taken it at school. Strong language results matter for all teachers.',
  careers:'Teacher|Foundation Phase Teacher|Intermediate Phase Teacher|Senior Phase Teacher|High School (FET) Teacher|Early Childhood Development Practitioner|Special Needs Educator|Lecturer|School Counsellor|Librarian|Educational Psychologist'},
 {id:'social', name:'Psychology and social sciences', maths:'either', subjects:['History','Life Sciences','Geography'], combos:['society','health'],
  needs:'Many social science degrees accept Mathematics or Mathematical Literacy, with strong language results. Psychology programmes may prefer Mathematics or Life Sciences at some institutions.',
  careers:'Psychologist|Clinical Psychologist|Counselling Psychologist|Social Worker|Sociologist|Political Scientist|Anthropologist|Historian|Archaeologist|Development Worker|Community Development Practitioner|Youth Worker|Researcher'},
 {id:'media', name:'Media, communication and languages', maths:'either', subjects:['History','Business Studies'], combos:['society','business','creative'],
  needs:'Media and communication programmes usually look closely at your language results and may ask for a portfolio or writing sample. Mathematical Literacy is often accepted.',
  careers:'Journalist|Editor|Author|Copywriter|Content Creator|Radio Presenter|TV Presenter|Broadcaster|Translator|Interpreter|Public Relations Specialist|Communications Specialist|Publisher|Linguist|Photojournalist'},
 {id:'creative', name:'Creative arts and design', maths:'either', subjects:['Visual Arts','Design','Dramatic Arts','Music'], combos:['creative'],
  needs:'Creative programmes often ask for a portfolio, audition or practical assessment, and Mathematical Literacy is often accepted. Visual Arts, Design, Dramatic Arts or Music help you build that work.',
  careers:'Graphic Designer|Interior Designer|Fashion Designer|Product Designer|Illustrator|Animator|Photographer|Filmmaker|Video Editor|Actor|Musician|Music Producer|Sound Engineer|Dancer|Choreographer|Fine Artist|Jewellery Designer|Game Designer|Art Director|Set Designer|Make-up Artist|Museum Curator'},
 {id:'natural', name:'Natural and physical sciences', maths:'required', subjects:['Physical Sciences','Life Sciences','Geography'], combos:['health','environment'],
  needs:'Science degrees usually ask for Mathematics, with Physical Sciences and/or Life Sciences depending on the field. Geography is useful for earth sciences.',
  careers:'Biologist|Microbiologist|Biochemist|Chemist|Physicist|Astronomer|Geneticist|Biotechnologist|Zoologist|Botanist|Marine Biologist|Oceanographer|Geologist|Geophysicist|Meteorologist|Forensic Scientist|Materials Scientist|Hydrologist|Laboratory Technician|Research Scientist'},
 {id:'environment', name:'Environment and conservation', maths:'preferred', subjects:['Geography','Life Sciences'], combos:['environment','agriculture'],
  needs:'Environmental science degrees usually ask for Mathematics and often Physical Sciences or Life Sciences. Some conservation and nature-based diplomas accept Mathematical Literacy. Geography and Life Sciences are very helpful.',
  careers:'Environmental Scientist|Environmental Manager|Environmental Consultant|Conservation Scientist|Nature Conservationist|Game Ranger|Ecologist|Climate Scientist|Waste Management Specialist|Geographer|GIS Specialist|Park Manager'},
 {id:'agri', name:'Agriculture, food and veterinary science', maths:'preferred', subjects:['Agricultural Sciences','Life Sciences','Physical Sciences'], combos:['agriculture','health'],
  needs:'Veterinary science and agricultural science degrees usually ask for Mathematics, Physical Sciences and Life Sciences. Some agricultural diplomas have wider entry options. Agricultural Sciences is a helpful school subject.',
  careers:'Veterinarian|Veterinary Nurse|Animal Scientist|Agricultural Scientist|Agronomist|Farm Manager|Farmer|Horticulturist|Soil Scientist|Agricultural Economist|Viticulturist|Winemaker|Food Scientist|Food Technologist|Forester|Aquaculturist'},
 {id:'tourism', name:'Tourism, hospitality and culinary', maths:'either', subjects:['Tourism','Geography','Business Studies'], combos:['tourism','business'],
  needs:'Tourism and hospitality programmes often accept Mathematical Literacy. Tourism, Geography and Business Studies are helpful, and good language skills matter.',
  careers:'Tourism Professional|Tour Operator|Travel Agent|Tour Guide|Hotel Manager|Hospitality Manager|Chef|Pastry Chef|Event Manager|Restaurant Manager'},
 {id:'aviation', name:'Aviation and transport', maths:'required', subjects:['Physical Sciences','Geography'], combos:['engineering'],
  needs:'Pilot training and air traffic control usually ask for Mathematics and Physical Sciences, and they have medical and other entry checks. Aircraft maintenance routes may accept Technical Mathematics.',
  careers:'Pilot|Air Traffic Controller|Aircraft Maintenance Engineer|Flight Attendant|Maritime Officer'},
 {id:'public', name:'Public service, safety and defence', maths:'either', subjects:['History','Geography'], combos:['society'],
  needs:'Entry requirements vary widely and many routes accept Mathematical Literacy. Some roles also have fitness or security checks.',
  careers:'Police Officer|Detective|Firefighter|Soldier|Military Officer|Diplomat|Public Servant|Intelligence Analyst|Correctional Officer'},
 {id:'trades', name:'Trades and technical careers', maths:'technical', subjects:['Technical Sciences','Engineering Graphics and Design','Civil, Electrical or Mechanical Technology'], combos:['technical','engineering'],
  needs:'Trade and technical qualifications (often through TVET colleges and apprenticeships) usually accept Mathematics or Technical Mathematics, and technical school subjects are a strong foundation.',
  careers:'Electrician|Plumber|Fitter and Turner|Boilermaker|Welder|Motor Mechanic|Diesel Mechanic|Millwright|Carpenter|Bricklayer|Refrigeration and Air-conditioning Technician|Solar PV Installer|Instrumentation Technician|Auto Electrician|Mechatronics Technician|Panel Beater'},
 {id:'sport', name:'Sport, fitness and recreation', maths:'either', subjects:['Life Sciences','Business Studies'], combos:['health','business'],
  needs:'Sport science degrees often ask for Life Sciences, and some ask for Mathematics. Many coaching and fitness qualifications accept Mathematical Literacy.',
  careers:'Sport Scientist|Professional Athlete|Sports Coach|Personal Trainer|Sports Manager|Sports Journalist'}
];
const CAREERS = (()=>{ const out=[], seen=new Set();
  CAREER_FAMILIES.forEach(f=>f.careers.split('|').forEach(n=>{ const k=n.toLowerCase(); if(!seen.has(k)){ seen.add(k); out.push({name:n, family:f.id}); } }));
  return out.sort((a,b)=>a.name.localeCompare(b.name)); })();
const familyOf = id => CAREER_FAMILIES.find(f=>f.id===id);

/* ============================================================
   COHERENT ELECTIVE COMBINATIONS — three FET electives that make sense together.
   PATHWAY only ever recommends one of these combinations (never three unrelated top scores).
   ============================================================ */
const COMBOS = [
 {id:'health', name:'Health and life sciences', core:['Physical Sciences','Life Sciences'], third:['Geography','Information Technology','Accounting'], maths:'Mathematics',
  why:'Physical Sciences and Life Sciences together are the usual foundation for health, medical and life-science study, and they are normally taken with Mathematics.'},
 {id:'engineering', name:'Engineering and the built environment', core:['Physical Sciences','Engineering Graphics and Design'], third:['Information Technology','Geography','Life Sciences'], maths:'Mathematics',
  why:'Physical Sciences builds the science behind how things work, and Engineering Graphics and Design builds technical drawing and design. With Mathematics, they support engineering, architecture and many technical pathways.'},
 {id:'technical', name:'Technical and trades', core:['Technical Sciences','Engineering Graphics and Design'], third:['Civil, Electrical or Mechanical Technology'], maths:'Technical Mathematics',
  why:'At schools that offer technical subjects, Technical Mathematics, Technical Sciences, Engineering Graphics and Design and a Technology specialisation are designed to be taken together for technical and trade pathways.'},
 {id:'computing', name:'Computing and technology', core:['Information Technology','Physical Sciences'], third:['Accounting','Engineering Graphics and Design','Geography'], maths:'Mathematics',
  why:'Information Technology builds programming and problem solving, and Physical Sciences strengthens logical, scientific thinking. With Mathematics, they support computing, data and engineering-related study.'},
 {id:'commerce', name:'Commerce, finance and economics', core:['Accounting','Economics'], third:['Business Studies','Information Technology','Geography'], maths:'Mathematics',
  why:'Accounting and Economics work closely together for finance, accounting and economics pathways, and many of those degrees also ask for Mathematics.'},
 {id:'business', name:'Business and entrepreneurship', core:['Business Studies','Economics'], third:['Accounting','Tourism','Computer Applications Technology'], maths:'either',
  why:'Business Studies and Economics together explain how businesses and markets work, and they suit management, marketing and entrepreneurial pathways.'},
 {id:'environment', name:'Environment and earth sciences', core:['Geography','Life Sciences'], third:['Physical Sciences','Agricultural Sciences','Tourism'], maths:'preferred',
  why:'Geography and Life Sciences together cover landscapes, climate, ecosystems and living things — the base for environmental and conservation pathways.'},
 {id:'agriculture', name:'Agriculture and food', core:['Agricultural Sciences','Life Sciences'], third:['Geography','Physical Sciences','Business Studies'], maths:'either',
  why:'Agricultural Sciences and Life Sciences together cover plants, animals, soil and food production, and suit farming, food and agricultural pathways.'},
 {id:'society', name:'Law, society and humanities', core:['History','Geography'], third:['Business Studies','Life Sciences','Economics','Tourism','Visual Arts'], maths:'either',
  why:'History and Geography together build reading, source analysis, argument and understanding of people and places — useful for law, social sciences, education and public service.'},
 {id:'creative', name:'Creative arts and design', core:['Visual Arts','Design'], third:['Engineering Graphics and Design','History','Business Studies'], maths:'either',
  why:'Visual Arts and Design together build a creative portfolio and design thinking. Some schools offer Dramatic Arts or Music instead, which suit performing arts pathways.'},
 {id:'tourism', name:'Tourism and hospitality', core:['Tourism','Geography'], third:['Business Studies','Economics','History'], maths:'either',
  why:'Tourism and Geography together cover places, travel and the tourism industry, and suit hospitality, travel and events pathways.'}
];

/* ============================================================
   SCORING & EVIDENCE — internal only (never shown to learners)
   ============================================================ */
const G8 = [
  ['hl','Home Language'],['fal','First Additional Language'],['math','Mathematics'],['ns','Natural Sciences'],
  ['ss','Social Sciences'],['tech','Technology'],['ems','Economic & Management Sciences'],['ca','Creative Arts'],['lo','Life Orientation']
];
const G8_NAME = Object.fromEntries(G8);
const level = m => m>=80?7:m>=70?6:m>=60?5:m>=50?4:m>=40?3:m>=30?2:1;
const freshA = () => ({version:'1.1', sections:{}, active:null, done:false, completedAt:null});
function freshProgress(){ return { a1:freshA(), a2:freshA(), g8:{marks:{},file:null,done:false}, g9:{}, dnaStages:{}, dnaHistory:[], archive:[], fet:freshFet() }; }
const sectionsOf = n => n===1 ? A1_SECTIONS : A2_SECTIONS;
const allQs = n => sectionsOf(n).flatMap(s=>s.qs.map(q=>({...q, section:s.id})));

/* deterministic shuffle (so a learner always sees the same order, and the key is never always first) */
function seeded(str){ let h=2166136261; for(const c of 'pathway:'+str){ h^=c.charCodeAt(0); h=Math.imul(h,16777619); } let t=h>>>0; return ()=>{ t=(t+0x6D2B79F5)>>>0; let r=Math.imul(t^(t>>>15),1|t); r=(r+Math.imul(r^(r>>>7),61|r))^r; return ((r^(r>>>14))>>>0)/4294967296; }; }
function shuffleIdx(n, seed){ const r=seeded(seed), a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function orderStart(q){ let a=shuffleIdx(q.items.length, q.id+'o'); if(a.every((v,i)=>v===i)) a=[...a.slice(1),a[0]]; return a; }

/* answer matching */
const normAns = s => String(s??'').toLowerCase().replace(/\s+/g,'').replace(/^r(?=[\d-])/,'').replace(/rand$/,'').replace(/,/g,'.').replace(/°|degrees?$/g,'').replace(/^x=|^y=/,'');
const UNIT_RX = /(cm²|cm2|cm³|cm3|km\/h|kmh|mℓ|ml|ℓ|l|cm|mm|km|kg|g|m|rand)$/;
const isNum = s => /^-?\d+(\.\d+)?$/.test(s);
function matchKey(q, resp){
  const r = normAns(resp); if(!r) return false;
  if(q.contains) return q.key.some(k=>r.includes(normAns(k)));
  if(q.key.some(k=>normAns(k)===r)) return true;
  const rn = r.replace(UNIT_RX,'');
  return q.key.some(k=>{ const kn=normAns(k); return isNum(kn) && isNum(rn) && Math.abs(parseFloat(kn)-parseFloat(rn))<1e-9; });
}

/* score one question → evidence record.
   Long written responses (open, rubric, and the working/explanation boxes) are NEVER marked right or wrong:
   they are kept as qualitative evidence only and never decide a recommendation on their own. */
function qualitative(text, ideas){
  const t=String(text||'').trim(); if(!t) return null;
  const low=t.toLowerCase();
  return {length:t.length, lines:t.split(/\n+/).filter(Boolean).length, ideas:(ideas||[]).filter(k=>low.includes(k))};
}
function scoreQ(q, sec, st){
  const a = st.ans[q.id], rec = {qid:q.id, section:sec.id, type:q.type, response:a??null, working:st.work?.[q.id]||null,
    timeMs:st.time?.[q.id]||0, answeredAfterTimer:!!st.after?.[q.id], marksMax:q.marks||0, marks:0, correct:null};
  const answered = a!=null && !(typeof a==='string' && !a.trim()) && !(Array.isArray(a)&&!a.length);
  rec.answered = answered;
  if(q.type==='mc'){ rec.correct = answered && a===q.ans; rec.marks = rec.correct?q.marks:0; }
  else if(['short','working','explain'].includes(q.type)){
    if(q.accept){ const r=String(a||'').toLowerCase().replace(/\s+/g,' ').trim(); rec.correct = answered && q.accept.some(k=>r.includes(k)); }
    else rec.correct = answered && matchKey(q,a);
    rec.marks = rec.correct?q.marks:0;
    if(q.type!=='short') rec.qualitative = qualitative(st.work?.[q.id]);   /* the written working/explanation itself is not marked */
  }
  else if(q.type==='order'){ const ok = Array.isArray(a) ? a.filter((v,i)=>v===i).length : 0; rec.correct = ok===q.items.length; rec.marks = rec.correct?q.marks:(ok>=q.items.length/2?1:0); }
  else if(q.type==='match'){ let ok=0; q.pairs.forEach((p,i)=>{ if(a && a[i]===p[1]) ok++; }); rec.correct = ok===q.pairs.length; rec.marks = Math.round(q.marks*ok/q.pairs.length); }
  else if(q.type==='rubric' || q.type==='open'){ rec.marksMax=0; rec.correct=null; rec.writtenResponse=true; rec.qualitative = qualitative(a, q.rubric); }
  return rec;
}
function scoreSection(n, secId, st){
  const sec = sectionsOf(n).find(s=>s.id===secId);
  return sec.qs.filter(q=>!['pref','multi','text','career'].includes(q.type)).map(q=>{
    const r = scoreQ(q, sec, st);
    r.expectedMs = sec.mins ? Math.round(sec.mins*60000/sec.qs.length) : null;
    if(n===1) Object.assign(r,{skill:q.skill, topic:q.topic, difficulty:q.diff, dnaTags:q.tags});
    else Object.assign(r,{subjectArea:sec.area, reasoning:q.skill, recall:!!q.recall});
    return r; });
}
const pct = (e,m) => m ? Math.round(1000*e/m)/10 : null;
const mean = a => a.length ? a.reduce((s,x)=>s+x,0)/a.length : 0;

/* ---------- academic results: Grade 8 Term 4 + Grade 9 Terms 1–4 (more recent results count more) ---------- */
const G9_TERMS = [1,2,3,4];
const isApproved = r => !!(r && (r.approved || r.done));
function academic(u, upto=4){
  const P=u.progress, sets=[];
  if(isApproved(P.g8)) sets.push({label:'Grade 8', short:'Gr 8', w:1, marks:P.g8.marks});
  G9_TERMS.filter(t=>t<=upto).forEach(t=>{ const r=P.g9?.[t]; if(isApproved(r)) sets.push({label:`Grade 9 Term ${t}`, short:`T${t}`, w:1+t*.25, marks:r.marks}); });
  const out={};
  G8.forEach(([k])=>{
    const pts = sets.filter(s=>!isNaN(Number(s.marks[k]))).map(s=>({label:s.label, short:s.short, pct:Number(s.marks[k]), w:s.w}));
    if(!pts.length) return;
    const value = pts.reduce((a,p)=>a+p.pct*p.w,0)/pts.reduce((a,p)=>a+p.w,0);
    const first=pts[0], last=pts[pts.length-1];
    out[k] = {value, points:pts, latest:last, trend: pts.length>1 ? level(last.pct)-level(first.pct) : 0};
  });
  return {subjects:out, sources:sets.map(s=>s.label)};
}

/* ---------- Assessment 1 evidence profile ---------- */
function a1Evidence(u){
  const recs = A1_SECTIONS.flatMap(s=>u.progress.a1.sections[s.id]?.results||[]);
  const tag={}, skill={}, section={};
  A1_SECTIONS.forEach(s=>section[s.id]={e:0,m:0});
  recs.forEach(r=>{ if(r.marksMax){ (r.dnaTags||[]).forEach(t=>{ tag[t]=tag[t]||{e:0,m:0}; tag[t].e+=r.marks; tag[t].m+=r.marksMax; });
      skill[r.skill]=skill[r.skill]||{e:0,m:0}; skill[r.skill].e+=r.marks; skill[r.skill].m+=r.marksMax; section[r.section].e+=r.marks; section[r.section].m+=r.marksMax; } });
  const tagPct = Object.fromEntries(Object.entries(tag).map(([k,v])=>[k,pct(v.e,v.m)]));
  const groups = Object.fromEntries(Object.entries(A1_GROUPS).map(([g,ts])=>{ let e=0,m=0; ts.forEach(t=>{ if(tag[t]){e+=tag[t].e;m+=tag[t].m;} }); return [g,pct(e,m)]; }));
  /* harder, non-everyday questions (difficulty 3–4) — how the learner handles complexity and abstraction */
  const hardRecs = recs.filter(r=>r.marksMax && r.difficulty>=3 && !(r.dnaTags||[]).some(t=>['applied','proportional','financial'].includes(t)));
  const hard = pct(hardRecs.reduce((s,r)=>s+r.marks,0), hardRecs.reduce((s,r)=>s+r.marksMax,0));
  /* pace: time taken against each section's guide time, only for questions answered accurately */
  const paced = recs.filter(r=>r.marksMax && r.correct && r.timeMs>0 && r.expectedMs).map(r=>Math.min(1.5, r.expectedMs/r.timeMs));
  const pace = paced.length ? mean(paced) : null;
  const afterTimer = recs.filter(r=>r.answeredAfterTimer).length;
  const timing = Object.fromEntries(A1_SECTIONS.map(s=>{ const st=u.progress.a1.sections[s.id]||{}; return [s.id,{ms:(st.finishedAt||0)-(st.startedAt||0), overTime:!!st.overTime}]; }));
  return {records:recs, tagPct, tagMax:Object.fromEntries(Object.entries(tag).map(([k,v])=>[k,v.m])), skillPct:Object.fromEntries(Object.entries(skill).map(([k,v])=>[k,pct(v.e,v.m)])),
    sectionPct:Object.fromEntries(Object.entries(section).map(([k,v])=>[k,pct(v.e,v.m)])), groups, hard, pace, afterTimer, timing,
    written:recs.filter(r=>r.writtenResponse||r.qualitative).map(r=>({qid:r.qid, qualitative:r.qualitative}))};
}
/* ---------- Assessment 2 evidence profile ---------- */
function a2Evidence(u){
  const P2 = u.progress.a2.sections;
  const recs = A2_SECTIONS.filter(s=>!s.about).flatMap(s=>P2[s.id]?.results||[]);
  const area={}, skill={}, skillSubjects={};
  recs.forEach(r=>{ if(!r.marksMax) return; const s=A2_SECTIONS.find(x=>x.area===r.subjectArea).id;
    area[s]=area[s]||{e:0,m:0}; area[s].e+=r.marks; area[s].m+=r.marksMax;
    skill[r.reasoning]=skill[r.reasoning]||{e:0,m:0}; skill[r.reasoning].e+=r.marks; skill[r.reasoning].m+=r.marksMax;
    if(r.marks/r.marksMax>=.99){ (skillSubjects[r.reasoning]=skillSubjects[r.reasoning]||new Set()).add(r.subjectArea); } });
  const ay = P2.AY?.ans || {}, AYQ = A2_SECTIONS.find(s=>s.about).qs;
  const signals={}; let dislikes=[];
  AYQ.forEach(q=>{ const a=ay[q.id]; if(a==null) return;
    if(q.type==='pref' && q.opts[a]) q.opts[a][1].forEach(t=>signals[t]=(signals[t]||0)+1);
    if(q.type==='multi' && Array.isArray(a)) a.forEach(i=>q.opts[i]?.[1].forEach(t=>{ if(t.startsWith('dislikes_')) dislikes.push(t); else signals[t]=(signals[t]||0)+1; })); });
  const pick = id => (ay[id]||[]).map(i=>AYQ.find(q=>q.id===id).opts[i]?.[0]).filter(Boolean);
  return {records:recs, areaPct:Object.fromEntries(Object.entries(area).map(([k,v])=>[k,pct(v.e,v.m)])),
    skillPct:Object.fromEntries(Object.entries(skill).map(([k,v])=>[k,pct(v.e,v.m)])), skillMax:Object.fromEntries(Object.entries(skill).map(([k,v])=>[k,v.m])),
    skillSubjects:Object.fromEntries(Object.entries(skillSubjects).map(([k,v])=>[k,[...v]])),
    signals, dislikes, enjoysSubjects:pick('AY8').filter(x=>x!=='None of these especially'), dislikesSubjects:pick('AY9').filter(x=>!x.startsWith('There')),
    words:{AY10:ay.AY10||'',AY11:ay.AY11||'',AY12:ay.AY12||'',AY13:ay.AY13||''}, career: ay.AY15 || {status:'unsure'},
    written:recs.filter(r=>r.writtenResponse).map(r=>({qid:r.qid, qualitative:r.qualitative}))};
}

/* ============================================================
   PATHWAY DNA — Assessment 1 + Assessment 2 + About You + career + Grade 8 and Grade 9 results
   ============================================================ */
const ROUTE_TEXT = {
  'Mathematics':'Mathematics goes deeper into algebra, functions, geometry and reasoning. Many university programmes in science, engineering, health, commerce and technology ask for it.',
  'Mathematical Literacy':'Mathematical Literacy focuses on using mathematics in real life — money, measurement, data and everyday decisions. It suits many careers, although some university programmes ask for Mathematics instead.',
  'Technical Mathematics':'Technical Mathematics is offered at schools with technical subjects. It is designed to support technical and trade pathways alongside Technical Sciences and a Technology specialisation.'
};
const INTEREST_BY_AREA = { NS:['interested_in_science','enjoys_investigation'], AC:['interested_in_business'], EC:['interested_in_business'], HI:['interested_in_people_and_society'], GE:['interested_in_environment'], TE:['interested_in_technology','enjoys_practical_work'], CA:['interested_in_creative_fields','enjoys_creating'], AG:['interested_in_agriculture','interested_in_environment'] };
const AREA_SUBJECT_NAME = { NS:'Natural Sciences', AC:'EMS (Accounting)', EC:'EMS (Economics)', HI:'History', GE:'Geography', TE:'Technology', CA:'Creative Arts', AG:'Agricultural Sciences' };

/* Route evidence profiles. Rather than cutting on one percentage, PATHWAY compares the learner's whole mathematical
   profile — several kinds of thinking, how they handled harder questions, pace, their school Mathematics results and
   technical interest — with the evidence pattern each route typically suits, and finds the closest match. */
const ROUTE_PROFILES = {
  'Mathematics':           {abs:.80, hard:.70, log:.75, app:.75, spa:.65, data:.70, school:.72, tech:.45, pace:.70},
  'Mathematical Literacy': {abs:.35, hard:.25, log:.40, app:.60, spa:.45, data:.55, school:.45, tech:.35, pace:.50},
  'Technical Mathematics': {abs:.55, hard:.45, log:.55, app:.65, spa:.75, data:.50, school:.55, tech:.85, pace:.60}
};
const FEATURE_WEIGHT = {abs:1.6, hard:1.3, log:1.0, app:.8, spa:1.0, data:.5, school:1.6, tech:1.0, pace:.3};
function routeDistances(x, keys){
  return Object.fromEntries(Object.entries(ROUTE_PROFILES).map(([r,p])=>[r, Math.sqrt(keys.reduce((s,k)=> x[k]==null ? s : s + FEATURE_WEIGHT[k]*(x[k]-p[k])**2, 0))]));
}
const nearest = d => Object.entries(d).sort((a,b)=>a[1]-b[1]);

function buildDNA(u, upto=4){
  const e1=a1Evidence(u), e2=a2Evidence(u), ac=academic(u, upto), G=e1.groups;
  const acad = k => ac.subjects[k]?.value, latest = k => ac.subjects[k]?.latest;
  const mathsAc = ac.subjects.math;

  /* ---- mathematics evidence profile (0–1 scale) ---- */
  const techSignals = (e2.signals.interested_in_technology||0)+(e2.signals.enjoys_practical_work||0)+(e2.signals.enjoys_technology||0);
  const x = { abs:(G.abstractMathematics??0)/100, hard:(e1.hard??0)/100, log:(G.logical??0)/100, app:(G.appliedMathematics??0)/100,
    spa:(G.spatial??0)/100, data:(G.data??0)/100, school: mathsAc ? mathsAc.value/100 : null,
    tech: Math.min(1, .5*((e2.areaPct.TE??0)/100) + .5*Math.min(1, techSignals/4)), pace: e1.pace==null ? null : Math.min(1, e1.pace/1.2) };
  const all = Object.keys(FEATURE_WEIGHT);
  const ranked = nearest(routeDistances(x, all));
  const route = ranked[0][0];
  const closeSecond = ranked[1][1] - ranked[0][1] < .12 ? ranked[1][0] : null;
  const a1Only = nearest(routeDistances(x, all.filter(k=>k!=='school')))[0][0];
  /* do Assessment 1 and school Mathematics results lean the same way? (midpoint between the Mathematics and Mathematical Literacy profiles) */
  const mid = (ROUTE_PROFILES['Mathematics'].school + ROUTE_PROFILES['Mathematical Literacy'].school)/2, midA = (ROUTE_PROFILES['Mathematics'].abs + ROUTE_PROFILES['Mathematical Literacy'].abs)/2;
  const schoolOnly = x.school==null ? null : (x.school>=mid ? 'Mathematics' : 'Mathematical Literacy');
  const a1Lean = a1Only==='Technical Mathematics' ? (x.abs>=midA ? 'Mathematics' : 'Mathematical Literacy') : a1Only;
  const agreement = schoolOnly==null ? 'noSchool' : (a1Lean===schoolOnly ? 'agree' : 'differ');
  /* strengths are described relative to the learner's own profile */
  const tagRank = Object.entries(e1.tagPct).filter(([t])=>t!=='communication' && (e1.tagMax[t]||0)>=4).sort((a,b)=>b[1]-a[1] || (e1.tagMax[b[0]]||0)-(e1.tagMax[a[0]]||0));
  const avg = mean(tagRank.map(([,v])=>v));
  const strongTags = tagRank.filter(([,v])=>v>=avg && v>0).slice(0,3).map(([t])=>t);
  const growTags = tagRank.filter(([,v])=>v<avg-5).slice(-2).map(([t])=>t);
  const handledHard = x.hard >= x.abs && x.hard > 0;

  /* ---- subject-area evidence: Assessment 2 + school results + interest context ---- */
  const areas = {};
  Object.keys(A2_AREA_LINKS).forEach(k=>{
    const sk=A2_AREA_LINKS[k].g8[0], a2=e2.areaPct[k]??0, sc=acad(sk);
    const interest = Math.min(1,(INTEREST_BY_AREA[k]||[]).reduce((s,t)=>s+(e2.signals[t]||0),0)/3);
    areas[k] = {a2, school:sc, schoolKey:sk, latest:latest(sk), interest, value: 0.55*a2 + 0.35*(sc??50) + 10*interest};
  });
  /* describe each area relative to the learner's own other areas (no fixed pass mark) */
  const mA2 = mean(Object.values(areas).map(a=>a.a2)), mSc = mean(Object.values(areas).map(a=>a.school??50));
  Object.values(areas).forEach(a=>{ const r2=a.a2-mA2, rs=(a.school??mSc)-mSc;
    a.cls = r2>=0 && rs>=0 ? 'strong' : (r2>8 && rs<-5) || (rs>5 && r2<-8) ? 'mixed' : (r2>-10 || rs>-5) ? 'developing' : 'notYet'; });
  const A = k => areas[k].value, pc = v => v*100;
  const SUBJ = {
    'Physical Sciences': .7*A('NS') + .3*pc(x.abs), 'Life Sciences': .6*A('NS') + .4*A('AG'), 'Technical Sciences': .5*A('NS') + .5*A('TE'),
    'Accounting': .75*A('AC') + .25*pc(x.app), 'Economics': .8*A('EC') + .2*pc(x.abs), 'Business Studies': .6*A('EC') + .4*A('AC'),
    'History': A('HI'), 'Geography': A('GE'), 'Tourism': .5*A('GE') + .5*A('EC'),
    'Engineering Graphics and Design': .5*A('TE') + .5*pc(x.spa), 'Information Technology': .4*A('TE') + .3*pc(x.log) + .3*pc(x.abs), 'Computer Applications Technology': .7*A('TE') + .3*pc(x.log),
    'Civil, Electrical or Mechanical Technology': .6*A('TE') + .4*pc(x.spa), 'Agricultural Sciences': .7*A('AG') + .3*A('NS'),
    'Visual Arts': A('CA'), 'Design': .8*A('CA') + .2*A('TE')
  };
  const SUBJ_AREAS = { 'Physical Sciences':['NS'], 'Life Sciences':['NS','AG'], 'Technical Sciences':['NS','TE'], 'Accounting':['AC'], 'Economics':['EC'], 'Business Studies':['EC','AC'], 'History':['HI'], 'Geography':['GE'], 'Tourism':['GE','EC'], 'Engineering Graphics and Design':['TE'], 'Information Technology':['TE'], 'Computer Applications Technology':['TE'], 'Civil, Electrical or Mechanical Technology':['TE'], 'Agricultural Sciences':['AG','NS'], 'Visual Arts':['CA'], 'Design':['CA','TE'] };

  /* ---- career (stated goal is recorded; it adds context but never overrides evidence) ---- */
  const car = e2.career||{status:'unsure'};
  const fam = car.status==='yes' && car.family ? familyOf(car.family) : null;

  /* ---- coherent three-subject combination ---- */
  const scored = COMBOS.map(c=>{
    const third = [...c.third].sort((a,b)=>SUBJ[b]-SUBJ[a])[0];
    let s = .7*mean(c.core.map(x=>SUBJ[x])) + .3*SUBJ[third];
    if(c.maths==='Mathematics' && route==='Mathematical Literacy') s -= closeSecond==='Mathematics' ? 4 : 10;
    if(c.maths==='Technical Mathematics') s += route==='Technical Mathematics' ? 8 : closeSecond==='Technical Mathematics' ? 0 : -15;
    if(fam && fam.combos.includes(c.id)) s += fam.combos[0]===c.id ? 7 : 4;
    return {...c, pick:[...c.core, third], score:s};
  }).sort((a,b)=>b.score-a.score);
  const combo = scored[0], alt = scored.find(c=>c.id!==combo.id && c.pick.filter(x=>combo.pick.includes(x)).length<2);

  /* ---- reasoning patterns across subjects (relative to the learner's own reasoning profile) ---- */
  const rs = Object.entries(e2.skillPct).filter(([k])=>(e2.skillMax[k]||0)>=4), rAvg = mean(rs.map(([,v])=>v));
  const reasoning = rs.filter(([,v])=>v>=rAvg && v>0).sort((a,b)=>b[1]-a[1]).slice(0,3)
    .map(([k])=>({skill:k, words:A2_SKILL_WORDS[k]||k, subjects:(e2.skillSubjects[k]||[]).map(a=>AREA_SUBJECT_NAME[A2_SECTIONS.find(x=>x.area===a).id])}));

  /* ---- stated career vs evidence ---- */
  let career = {status: car.status==='yes'?'yes':'unsure'};
  if(car.status==='yes'){
    const f = fam;
    const rel = ['math','hl', ...(f?f.subjects:[]).flatMap(s=>(SUBJ_AREAS[s]||[]).map(a=>A2_AREA_LINKS[a].g8[0]))];
    const results = [...new Set(rel)].filter(k=>ac.subjects[k]).map(k=>({name:G8_NAME[k], lvl:level(ac.subjects[k].latest.pct), from:ac.subjects[k].latest.label}));
    const aligned=[], grow=[], mathsFit = {'required':['Mathematics'], 'technical':['Mathematics','Technical Mathematics']}[f?.maths];
    if(f){
      if(mathsFit){ const ok = mathsFit.includes(route) || mathsFit.includes(closeSecond);
        (ok?aligned:grow).push(ok ? `Your mathematics evidence is in line with the ${mathsFit.join(' or ')} this pathway commonly asks for.` : `This pathway commonly asks for ${mathsFit.join(' or ')}. Building your ${joinList(growTags.map(t=>A1_TAG_WORDS[t]))||'algebra and problem solving'} can help keep this option open.`); }
      const others = Object.values(SUBJ).map(Number); const sAvg = mean(others);
      f.subjects.forEach(s=>{ if(SUBJ[s]==null) return;
        if(SUBJ[s]>=sAvg) aligned.push(`${s} is one of your stronger areas of evidence.`);
        else grow.push(`${s} is commonly associated with this pathway — ${joinList((SUBJ_AREAS[s]||[]).map(a=>'“'+A2_SECTIONS.find(x=>x.id===a).title+'”'))} is an area you could keep building.`); });
    }
    career = {status:'yes', name:car.career, custom:!!car.custom, family:f?f.id:null, familyName:f?f.name:null, needs:f?f.needs:null, subjects:f?f.subjects:[], maths:f?f.maths:null,
      results, aligned, grow, sameDirection: !!(f && f.combos.includes(combo.id))};
  }

  const topSignals = Object.entries(e2.signals).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k])=>SIGNAL_WORDS[k]).filter(Boolean);
  const g9Terms = G9_TERMS.filter(t=>t<=upto && isApproved(u.progress.g9?.[t]));

  /* ---- thinking patterns Pathway noticed (only traits with real evidence; described relative to the learner's own profile) ---- */
  const evid = (tags=[], skills=[]) => { let e=0,m=0;
    tags.forEach(t=>{ if(e1.tagMax[t]){ e+=(e1.tagPct[t]||0)*e1.tagMax[t]/100; m+=e1.tagMax[t]; } });
    skills.forEach(k=>{ if(e2.skillMax[k]){ e+=(e2.skillPct[k]||0)*e2.skillMax[k]/100; m+=e2.skillMax[k]; } });
    return m ? {score:100*e/m, weight:m} : null; };
  const sig = keys => Math.min(1, keys.reduce((a,k)=>a+(e2.signals[k]||0),0)/3);
  const traits = TRAIT_DEFS.map(d=>{
    let ev = d.area ? (()=>{ const v=d.area.map(a=>e2.areaPct[a]).filter(x=>x!=null); return v.length?{score:mean(v),weight:6}:null; })() : evid(d.a1, d.a2);
    if(d.toldOnly){ const i=sig(d.signals); return i>=.66 ? {id:d.id, name:d.name, icon:d.icon, score:i*100, told:true} : null; }
    if(!ev || ev.weight<3) return null;
    const score = d.signals ? .85*ev.score + .15*sig(d.signals)*100 : ev.score;
    return {id:d.id, name:d.name, icon:d.icon, score};
  }).filter(Boolean).sort((a,b)=>b.score-a.score);
  const tn = traits.filter(t=>!t.told).length;
  traits.filter(t=>!t.told).forEach((t,i)=>{ t.level = (i < Math.ceil(tn/3) && t.score>=50) ? 'strong' : (i < Math.ceil(2*tn/3) ? 'good' : 'developing'); });
  traits.filter(t=>t.told).forEach(t=>t.level='told');

  /* ---- what the learner showed in the questions linked to each subject area ---- */
  const areaSkills = {};
  Object.keys(A2_AREA_LINKS).forEach(k=>{ const recs=e2.records.filter(r=>r.marksMax && A2_SECTIONS.find(x=>x.area===r.subjectArea).id===k);
    const shown=[...new Set(recs.filter(r=>r.marks/r.marksMax>=.99).map(r=>A2_SKILL_WORDS[r.reasoning]||r.reasoning))];
    const grow=[...new Set(recs.filter(r=>r.marks/r.marksMax<.5).map(r=>A2_SKILL_WORDS[r.reasoning]||r.reasoning))].filter(x=>!shown.includes(x));
    areaSkills[k]={shown, grow}; });

  /* ---- overall academic picture from the approved results in this snapshot ---- */
  const latestSet = ac.sources[ac.sources.length-1]||null;
  const latestVals = Object.values(ac.subjects).map(r=>r.latest.pct);
  const aggregate = latestVals.length ? Math.round(mean(latestVals)) : null;
  const relevantKeys = [...new Set(['math', ...combo.pick.flatMap(s=>(SUBJ_AREAS[s]||[]).map(a=>A2_AREA_LINKS[a].g8[0]))])];
  const focus = relevantKeys.filter(k=>ac.subjects[k] && aggregate!=null && ac.subjects[k].latest.pct < aggregate)
    .sort((a,b)=>ac.subjects[a].latest.pct-ac.subjects[b].latest.pct).slice(0,2)
    .map(k=>({key:k, name:G8_NAME[k], lvl:level(ac.subjects[k].latest.pct), reason: k==='math' ? 'Mathematics connects to many of the subjects and study routes you may want later, so improving it keeps more options open.' : `${G8_NAME[k]} connects to your current subject direction, so improving it could strengthen that direction.`}));
  return {
    version:'1.2', generatedAt:Date.now(),
    basedOn:{a1:u.progress.a1.completedAt, a2:u.progress.a2.completedAt, g8:u.progress.g8.savedAt||null, grade9Terms:g9Terms, sources:['Pathway Assessment 1','Pathway Assessment 2',...ac.sources]},
    math:{ route, closeSecond, agreement, strongTags, growTags, handledHard,
      school: mathsAc ? {lvl:level(mathsAc.latest.pct), pct:mathsAc.latest.pct, from:mathsAc.latest.label, trend:mathsAc.trend, g8:mathsAc.points[0]} : null,
      internal:{features:x, distances:Object.fromEntries(ranked.map(([r,d])=>[r,Math.round(d*1000)/1000])), a1Only, schoolOnly, groups:G, tagPct:e1.tagPct} },
    electives:{ comboId:combo.id, name:combo.name, subjects:combo.pick, why:combo.why, maths:combo.maths,
      detail: combo.pick.map(s=>({subject:s, areas:(SUBJ_AREAS[s]||[]).map(a=>({id:a, title:A2_SECTIONS.find(x=>x.id===a).title, cls:areas[a].cls, latest:areas[a].latest, schoolName:G8_NAME[areas[a].schoolKey], schoolKey:areas[a].schoolKey}))})),
      alt: alt?{name:alt.name, subjects:alt.pick}:null, internal:{subjectScores:SUBJ, comboScores:scored.map(c=>[c.id,Math.round(c.score)])} },
    areas, reasoning, career, results:ac.subjects, traits, areaSkills,
    academicPicture:{aggregate, latestSet, relevantKeys, focus, sources:ac.sources},
    interests:{topSignals, enjoys:e2.enjoysSubjects, dislikes:e2.dislikesSubjects, words:e2.words},
    evidence:{a1:e1, a2:e2}
  };
}
const TRAIT_DEFS = [
  {id:'problem',   name:'Problem solving',            icon:'puzzle',  a1:['method'], a2:['problem solving']},
  {id:'analytic',  name:'Analytical thinking',        icon:'search',  a1:['logical','understanding'], a2:['evaluating evidence','drawing conclusions']},
  {id:'numbers',   name:'Working with numbers',       icon:'grid',    a1:['fluency','numberSense','applied','proportional']},
  {id:'patterns',  name:'Patterns and relationships', icon:'chart',   a1:['patterns','relationships','abstract']},
  {id:'spatial',   name:'Spatial thinking',           icon:'shapes',  a1:['spatial'], a2:['spatial reasoning','interpreting a map']},
  {id:'info',      name:'Interpreting information',   icon:'file',    a1:['data'], a2:['interpreting data','interpreting a source','interpreting information','identifying patterns']},
  {id:'science',   name:'Scientific thinking',        icon:'bulb',    area:['NS','AG']},
  {id:'practical', name:'Practical thinking',         icon:'wrench',  a2:['systems thinking','applying a principle'], signals:['enjoys_practical_work','interested_in_technology']},
  {id:'creative',  name:'Creativity',                 icon:'palette', a2:['creative/design reasoning'], signals:['enjoys_creating','enjoys_design','interested_in_creative_fields']},
  {id:'decisions', name:'Decision making',            icon:'compass', a2:['decision making','cause and effect']},
  {id:'people',    name:'Working with people',        icon:'users',   toldOnly:true, signals:['enjoys_working_with_people','prefers_collaborative_work','enjoys_helping_people','enjoys_explaining']}
];
const joinList = a => a.length<=1 ? (a[0]||'') : a.slice(0,-1).join(', ')+' and '+a[a.length-1];
/* what changed since the previous Pathway DNA (shown after new results are added) */
function dnaChanges(prev, next){
  if(!prev) return null;
  const out=[];
  out.push(prev.math.route===next.math.route ? `Your mathematics route guide is still ${next.math.route}.` : `Your mathematics route guide has moved from ${prev.math.route} to ${next.math.route}.`);
  out.push(prev.electives.comboId===next.electives.comboId ? `Your subject direction is still ${next.electives.name.toLowerCase()}.` : `Your subject direction has changed from ${prev.electives.name.toLowerCase()} to ${next.electives.name.toLowerCase()}.`);
  Object.entries(next.results||{}).forEach(([k,r])=>{ const p=prev.results?.[k]; if(!p) return; const a=level(p.latest.pct), b=level(r.latest.pct); if(b!==a) out.push(`${G8_NAME[k]} ${b>a?'went up':'went down'} from Level ${a} to Level ${b}.`); });
  return out;
}

/* ============================================================
   JOURNEY (Grade 9)
   ============================================================ */
const STEPS = [
  {k:'a1', t:'Pathway Assessment 1', d:'Discover your strengths', ic:'compass', go:'#/assessment/1'},
  {k:'a2', t:'Pathway Assessment 2', d:'Tell us more about you', ic:'clipboard', go:'#/assessment/2'},
  {k:'g8', t:'Upload Grade 8 Term 4 Results', d:'Add your latest results', ic:'upload', go:'#/results/add?set=g8'},
  {k:'dna', t:'Pathway DNA', d:'Get your personalised insights', ic:'dna', go:'#/dna'},
  {k:'g9', t:'Upload Grade 9 Results', d:'Keep your profile up to date', ic:'chart', go:'#/results'},
];
function doneMap(u){ const p=u.progress, S=stagesOf(u); return {a1:p.a1.done, a2:p.a2.done, g8:isApproved(p.g8), dna:stageState(u,'initial')==='ready' && !!S.initial?.viewed, g9:isApproved(p.g9?.[4]), careers:false, p101:false}; }
function currentIndex(u){ const d=doneMap(u); const i=STEPS.findIndex(s=>!d[s.k]); return i<0?STEPS.length:i; }

/* ============================================================
   ROUTER
   ============================================================ */
const app = document.getElementById('app');
const go = h => { if (location.hash===h) render(); else location.hash=h; };
const LEARNER_ROUTES = ['/plans','/pay','/home','/grade','/subscription','/careers','/careers/view','/pathway-101','/help/faq','/help/support','/what-if','/decision-lab','/after-matric','/my-pathway','/targets/matches','/apply','/apply/uni','/journey','/explore-path','/aps','/aps/add','/aps/improve','/targets','/targets/universities','/targets/courses','/progress','/next','/applications','/deadlines','/profile','/careers/compare','/my-assessment','/assessment/1','/assessment/2','/answers/1','/answers/2','/results','/results/add','/results/grade-8','/results/grade-9','/dna','/dna/stage','/dna/building'];
function guard(path){
  const u=me();
  if (path==='/demo' && !SHOW_DEMO_LOGIN) return '#/';   /* the credentials page is not public */
  const authed=LEARNER_ROUTES;
  if (!authed.includes(path)) return null;
  if (!u) return '#/signin';
  if (!hasAccess(u) && !['/plans','/pay'].includes(path)) return '#/plans';
  if (hasAccess(u) && ['/plans','/pay'].includes(path)) return '#/home';
  const FET_ONLY=['/journey','/explore-path','/aps','/aps/add','/aps/improve','/targets','/targets/universities','/targets/courses','/progress','/next','/applications','/deadlines','/careers/compare'];
  if ((FET_ONLY.includes(path) || ['/what-if','/after-matric','/targets/matches'].includes(path)) && !isFET(u)) return '#/home';
  if (['/applications','/deadlines'].includes(path) && gradeOf(u)!=='12') return '#/home';
  if (['/apply','/apply/uni'].includes(path) && !appsAllowed(u)) return '#/home';   /* Applications hub: Grades 11–12 (account grade) */
  /* Grades 10–12: providing the latest results comes first */
  if (isFET(u) && needsResults(u) && ['/journey','/explore-path','/aps/improve','/targets','/targets/universities','/targets/courses','/progress','/next','/applications','/deadlines'].includes(path)) return '#/home';
  if (String(u.grade)!=='9'){   /* Grade 9 onboarding is Grade 9 only; earlier Grade 9 data stays viewable */
    if ((path.startsWith('/assessment')||path.startsWith('/results')||path==='/my-assessment')) return '#/home';
    if (path.startsWith('/answers/') && !u.progress['a'+path.slice(-1)]?.done) return '#/home';
    if (path.startsWith('/dna') && !Object.keys(stagesOf(u)).length) return '#/home';
  }
  const act = activeAssessment(u);   /* a started section must be finished before moving elsewhere */
  if (act && path!=='/assessment/'+act && !['/plans','/pay'].includes(path)) return '#/assessment/'+act;
  if (['/journey','/explore-path'].includes(path)) return '#/home';
  if (path==='/deadlines') return '#/applications';
  if (path==='/dna/building' || path==='/results/grade-9') return path==='/dna/building' ? '#/dna' : '#/results';
  if (path==='/results/grade-8') return '#/results/add?set=g8';
  if (path==='/targets/universities' || path==='/targets/courses') return '#/targets'+(location.hash.includes('?')?'?'+location.hash.split('?')[1]:'');
  return null;
}
function render(){
  const path = (location.hash.replace(/^#/,'') || '/').split('?')[0];
  const redirect = guard(path);
  if (redirect){ location.replace(redirect); return; }
  const views = {'/':landing,'/demo':demoPage,'/about':aboutPage,'/pricing':pricingPage,'/faq':faqPage,'/support':supportPage,'/signin':signin,'/signup':signup,'/plans':plans,'/pay':pay,'/home':home,'/my-assessment':myAssessment,'/assessment/1':()=>assessmentPage(1),'/assessment/2':()=>assessmentPage(2),'/grade':gradePage,'/subscription':subscriptionPage,'/what-if':whatIfPage,'/decision-lab':decisionLabPage,'/after-matric':afterMatricPage,'/my-pathway':myPathwayPage,'/targets/matches':matchesPage,'/journey':journeyPage,'/explore-path':explorePathPage,'/aps':apsPage,'/aps/add':apsAdd,'/aps/improve':improvePage,'/targets':studyTargetsPage,'/apply':appsHubPage,'/apply/uni':appsUniPage,'/progress':progressPage,'/next':nextPage,'/applications':applicationsPage,'/profile':profilePage,'/careers/compare':careerCompare,'/help/faq':learnerFaq,'/help/support':learnerSupport,'/careers':careersPage,'/careers/view':careerView,'/pathway-101':pathway101Page,'/results':resultsHub,'/results/add':resultsAdd,'/answers/1':()=>answersPage(1),'/answers/2':()=>answersPage(2),'/dna':dnaOverview,'/dna/stage':dnaStagePage};
  const v = views[path] || landing;
  applyGradeTheme(me(), LEARNER_ROUTES.includes(path));
  if(me() && LEARNER_ROUTES.includes(path)){ try{ notifyCheck(me()); save(); }catch(e){ console.error(e); } }
  document.body.className = v===landing ? 'is-landing' : 'is-app';
  app.innerHTML = v();
  if (v.after) v.after();
  { const du=me(), dev = !!(du && isDemo(du) && LEARNER_ROUTES.includes(path)); document.body.classList.toggle('has-dev', dev);
    if(dev){ app.insertAdjacentHTML('beforeend', demoToolsHTML(du)); document.getElementById('devpill').addEventListener('click', openDemoTools); } }
  if (SHOW_DEMO_LOGIN && !me() && [landing,signin,signup,aboutPage,pricingPage,faqPage,supportPage].includes(v)) app.insertAdjacentHTML('beforeend',`<a class="demo-pill" href="#/demo">${I('user')} Demo login</a>`);
  (afterRender.pop()||(()=>{}))();
  if (!location.hash.includes('#sec-')) window.scrollTo(0,0);
}
const afterRender=[];
window.addEventListener('hashchange', render);

let toastT;
function toast(msg, icon='info'){ const t=document.getElementById('toast'); t.innerHTML=I(icon)+`<span>${esc(msg)}</span>`; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),3600); }

/* global clicks */
document.addEventListener('click', e=>{
  const el = e.target.closest('[data-act]'); if(!el) return;
  const a = el.dataset.act;
  if (a==='theme'){ setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); }
  if (a==='bell'){ document.querySelector('.npanel') ? document.querySelector('.npanel').remove() : openNotifications(); }
  if (a==='navtoggle'){ DB.navCollapsed=!DB.navCollapsed; save(); const sh=document.querySelector('.shell'); sh?.classList.toggle('collapsed',DB.navCollapsed); el.setAttribute('aria-expanded',!DB.navCollapsed); el.setAttribute('aria-label',(DB.navCollapsed?'Expand':'Collapse')+' menu'); }
  if (a==='logout'){ PathwayAPI.logout(); DB.session=null; save(); go('#/'); toast('You have been signed out.','check'); }   /* revokes the server session too */
  if (a==='reset'){ const u=me(); if(u && isDemo(u) && confirm('Reset this demo learner\'s progress? (Testing only — real learners cannot reset their assessments.)')){ const old=u.progress; const arch=(old.archive||[]).concat([{archivedAt:Date.now(), reason:'demo reset (testing only)', data:JSON.parse(JSON.stringify({...old, archive:undefined}))}]); u.progress=freshProgress(); u.progress.archive=arch; save(); VIEW={}; go('#/home'); toast('Demo progress reset. The previous attempt is archived.','refresh'); } }
  if (a==='saveexit'){ VIEW={}; go('#/home'); toast('Your progress has been saved. You can come back anytime and continue from where you left off.','check'); }
  if (a==='menu'){ const m=document.getElementById('meMenu'); const open=!m.classList.contains('open'); m.classList.toggle('open',open); el.setAttribute('aria-expanded',open); }
  if (a==='drawer'){ document.getElementById('drawer').classList.add('open'); }
  if (a==='drawer-close'){ document.getElementById('drawer').classList.remove('open'); }
  if (a==='lmenu'){ const m=document.getElementById('lmobile'); m.classList.toggle('open'); el.setAttribute('aria-expanded', m.classList.contains('open')); }
  if (a==='soon'){ toast(el.dataset.msg,'clock'); }
  if (a==='support'){ toast('Support contact details will be added before launch.','chat'); }
});
document.addEventListener('click', e=>{
  const m=document.getElementById('meMenu');
  if (m && m.classList.contains('open') && !e.target.closest('.me')) m.classList.remove('open');
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ document.getElementById('meMenu')?.classList.remove('open'); document.getElementById('drawer')?.classList.remove('open'); } });

const lockup = (href='#/') => `<a class="lockup" href="${href}" aria-label="PATHWAY home"><img class="mark" src="${MARK}" alt=""><img class="word" src="${WORD}" alt="PATHWAY — Explore • Plan • Build Your Future"></a>`;
const lockupStack = () => `<div class="lockup-stack"><img class="mark" src="${MARK}" alt=""><img class="word" src="${WORD}" alt="PATHWAY — Explore • Plan • Build Your Future"></div>`;

/* ============================================================
   LANDING
   ============================================================ */
const NAV=[['about','About'],['pricing','Pricing'],['faq','FAQ'],['support','Support']];
function siteHeader(active='', solid=false){
  const u=me();
  const acts = u ? `<a class="btn btn-purple btn-sm" href="#/home">Open my Pathway ${ARROW}</a>`
    : `<a class="btn btn-purple btn-sm" href="#/signup">Create an account ${ARROW}</a><a class="btn btn-ghost btn-sm" href="#/signin">Sign in</a>`;
  const links = cls => NAV.map(([k,l])=>`<a class="${cls}${active===k?' on':''}" href="#/${k}"${active===k?' aria-current="page"':''}>${l}</a>`).join('');
  return `<header class="l-header${solid?' solid':''}">
    ${lockup('#/')}
    <nav class="l-nav" aria-label="Main">${links('')}</nav>
    <div class="l-actions">${themeBtn()}${acts}</div>
    <button class="l-burger" data-act="lmenu" aria-label="Open menu" aria-expanded="false">${I('menu')}</button>
    <div class="l-mobile glass" id="lmobile">${links('nl')}
      ${u?`<a class="btn btn-purple" href="#/home">Open my Pathway ${ARROW}</a>`:`<a class="btn btn-purple" href="#/signup">Create an account ${ARROW}</a><a class="btn btn-ghost" href="#/signin">Sign in</a>`}
    </div>
  </header>`;
}
function landing(){
  const u=me();
  const steps = [['compass','Explore','Discover your interests and strengths.'],['book','Plan','Make informed subject choices.'],['chart','Track','Follow your progress and understand your options.'],['cap','Build your future','Explore universities, courses and opportunities.']];
  return `
<div class="landing">
  ${siteHeader()}
  <section class="lp-hero" style="--sd:url('${SCENE}');--sl:url('${SCENE_LIGHT}')">
    <div class="lp-photo" role="img" aria-label="Four books labelled Grade 9, Grade 10, Grade 11 and Grade 12 on a desk overlooking a city at sunset"></div>
    <div class="lp-veil" aria-hidden="true"></div>
    <div class="lp-inner">
      <div class="lp-copy">
        <div class="eyebrow">Every big future starts with a big plan</div>
        <h1>Your path <span class="l2">starts here.</span></h1>
        <p class="lede">PATHWAY helps you discover your strengths, make informed subject choices, explore your interests and understand your options after high school. Your all-in-one guide from Grade 9 and beyond.</p>
        <a class="btn btn-gold cta" href="${u?'#/home':'#/signup'}">Start Your Pathway ${ARROW}</a>
      </div>
    </div>
  </section>
  <section class="lp-journey" aria-label="The PATHWAY journey">
    <div class="glass">
      <ol class="lp-steps">
        <li class="lp-path" aria-hidden="true"></li>
        ${steps.map(p=>`<li class="lp-step"><span class="lp-orb">${I(p[0])}</span><div class="lp-txt"><h3>${p[1].toUpperCase()}</h3><p>${p[2]}</p></div></li>`).join('')}
      </ol>
    </div>
  </section>
  <section class="lp-pricing" id="landing-pricing" aria-labelledby="lph">
    <div class="glass pricing" style="max-width:1120px;margin:0 auto">
      <div class="intro"><div class="rule"></div><h2 id="lph">Your Pathway, <span>Your Choice.</span></h2><p>Get full access to PATHWAY for less than the price of a takeaway per month.</p></div>
      <div class="plan best">
        <span class="badge-gold">Best Value</span>
        <div class="price"><b>R199</b><span>/ year</span></div>
        <div><span class="permonth">That's only R16.58 per month!</span></div>
        <ul class="ticks gold">${PLAN_FEATURES.annual.map(t=>`<li><span class="tk">${I('check')}</span>${t}</li>`).join('')}</ul>
        <a class="btn btn-gold btn-block" href="${u?(hasAccess(u)?'#/home':'#/plans'):'#/signup?plan=annual'}">Get Annual Access ${ARROW}</a>
      </div>
      <div class="plan">
        <div class="price"><b>R20</b><span>/ month</span></div>
        <ul class="ticks purple">${PLAN_FEATURES.monthly.map(t=>`<li><span class="tk">${I('check')}</span>${t}</li>`).join('')}</ul>
        <a class="btn btn-outline-purple btn-block" href="${u?(hasAccess(u)?'#/home':'#/plans'):'#/signup?plan=monthly'}">Get Monthly Access ${ARROW}</a>
      </div>
    </div>
  </section>
</div>`;
}

/* ---------- About / Pricing / FAQ / Support ---------- */
function demoPage(){
  return siteHeader('',true) + `<main class="info">
    <div class="info-head"><h1>Demo learner accounts</h1><p>For testing only. These accounts skip payment and go straight into the learner's PATHWAY. You can also sign in normally with the email and the password <b>${esc(DEMO_PASSWORD)}</b>.</p></div>
    <div class="demo-grid">${DEMO_ACCOUNTS.map(d=>`<div class="glass demo-card">
      <h3>${esc(d.first)} ${esc(d.surname)}</h3>
      <div class="meta"><span class="chip green">Grade ${d.grade}</span><span class="chip">Term ${d.term}</span></div>
      <div class="cred">Email <code>${esc(d.email)}</code><br>Password <code>${esc(DEMO_PASSWORD)}</code></div>
      <button class="btn btn-purple" data-demo="${esc(d.email)}">Log in as ${esc(d.first)} ${ARROW}</button>
      <button class="link" style="font-size:.85rem;align-self:flex-start" data-demoreset="${esc(d.email)}">Restart this learner’s journey…</button></div>`).join('')}</div>
    <p class="hint" style="margin-top:18px">Demo accounts use exactly the same grade experience as real learners — any change to a grade appears here automatically.</p></main>`;
}
demoPage.after = () => {
  document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{ DB.session=b.dataset.demo; save(); go('#/home'); }));
  document.querySelectorAll('[data-demoreset]').forEach(b=>b.addEventListener('click',()=>{ const u=DB.users[b.dataset.demoreset]; if(!u || !isDemo(u)) return;
    DB.session=u.email; save(); go('#/home'); setTimeout(openDemoTools, 200); }));
};
/* ============================================================
   PUBLIC INFORMATION PAGES — About · Pricing · FAQ · Support
   ============================================================ */
function pubFooter(active=''){
  return `<footer class="pub-foot"><div class="in">
    <div>${lockup('#/')}</div>
    <nav aria-label="Footer">${NAV.map(([k,l])=>`<a href="#/${k}" class="${active===k?'on':''}">${l}</a>`).join('')}</nav>
    <small>© ${new Date().getFullYear()} PATHWAY · Explore • Plan • Build Your Future</small>
  </div></footer>`;
}
let PUB_INLINE = false;   /* true while a public page is rendered inside the learner shell */
const pubPage = (active, body) => PUB_INLINE ? `<div class="pub inshell">${body}</div>` : siteHeader(active,true) + `<main class="pub">${body}</main>` + pubFooter(active);
const helpHref = k => PUB_INLINE ? `#/help/${k}` : `#/${k}`;
function inShell(pageFn){ return shell(()=>{ PUB_INLINE=true; try { return pageFn(); } finally { PUB_INLINE=false; } }); }
const learnerFaq = () => inShell(faqPage); learnerFaq.after = () => faqPage.after();
const learnerSupport = () => inShell(supportPage); learnerSupport.after = () => supportPage.after();

/* ---------- About ---------- */
const GRADE_INFO = [
  {n:9, tag:'Create your path', icon:'bulb',
   sum:'Get to know yourself, explore your interests and start thinking about the subjects ahead.',
   about:'Grade 9 is where you begin to understand yourself and the direction you may want to take — before you choose your subjects for Grade 10.',
   helps:['Discover your strengths and interests','Complete your PATHWAY assessments','Understand your learning profile','Review your Grade 8 results','Explore subject possibilities','Begin to see how today\'s choices can affect future options'],
   why:'The choices you make now can influence the subjects you take later, so understanding yourself first helps you keep more options open.',
   results:'Your results give PATHWAY a clearer picture of your academic progress. As your marks change, PATHWAY can help you understand where you are improving and where you may need to focus.'},
  {n:10, tag:'Connect your path', icon:'leaf',
   sum:'Build on your choices and start connecting your subjects to possible careers, courses and universities.',
   about:'Grade 10 is about connecting your interests, your subjects and an emerging sense of the careers that could suit you.',
   helps:['Understand your chosen subjects','Explore careers','Explore universities and courses','Begin identifying university and course targets','Track your Grade 10 results','See how your results relate to your future goals'],
   why:'Your subjects shape which courses you can apply for later, so connecting them to careers and courses early gives you time to adjust.',
   results:'Uploading your results each term keeps your PATHWAY information current, so it reflects where you are now as you connect your subjects to future goals.'},
  {n:11, tag:'Polish your path', icon:'chart',
   sum:'Refine your goals, understand your options more deeply and strengthen your academic position.',
   about:'Grade 11 is about becoming more focused and getting ready for the application stage.',
   helps:['Refine your career interests','Review your university targets','Refine your course targets','Track your Grade 11 results','Monitor your Projected APS','Identify where academic improvement may matter','Become application-ready'],
   why:'Many universities look closely at Grade 11 results when you apply, so knowing where you stand now gives you time to improve before applications open.',
   results:'Termly results let your PATHWAY profile evolve with you, including how your Projected APS develops as you prepare to apply.'},
  {n:12, tag:'Complete your path', icon:'cap',
   sum:'Turn your preparation into action with applications, deadlines and your next step after school.',
   about:'Grade 12 is about putting your plans into action.',
   helps:['Finalise your university targets','Finalise your course targets','Track your Grade 12 results','Monitor your projected APS','Keep track of your applications','Track application deadlines','Understand funding and fees','Understand your next steps after school'],
   why:'This is the year your plans become applications, so staying organised with results, deadlines and funding helps you take your next step with confidence.',
   results:'Keeping your results updated means you make decisions about applications and next steps using your most current academic information.'}
];
function pathArt(){
  const tags=[[34,250,'Grade 9','Create your path','flag'],[148,190,'Grade 10','Connect your path','leaf'],[262,130,'Grade 11','Polish your path','chart'],[376,70,'Grade 12','Complete your path','cap']];
  return `<svg class="pathart" viewBox="0 0 540 380" aria-hidden="true">
    <defs><linearGradient id="roadg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#B98BFF"/><stop offset=".55" stop-color="#F2C46D"/><stop offset="1" stop-color="#FFE7B0"/></linearGradient>
      <radialGradient id="hillfade" cx=".56" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
      <mask id="hillmask"><rect width="540" height="380" fill="url(#hillfade)"/></mask></defs>
    <g mask="url(#hillmask)">
    <path class="hill2" d="M0 250 C 120 190, 240 230, 360 170 S 520 120, 540 110 L540 380 L0 380Z"/>
    <path class="hill1" d="M0 320 C 140 270, 260 300, 380 250 S 520 220, 540 214 L540 380 L0 380Z"/></g>
    <path class="road" d="M40 372 C 120 350, 110 312, 180 300 C 250 288, 230 246, 300 236 C 370 226, 350 180, 420 170 C 470 162, 470 128, 500 118"/>
    ${[[92,340],[206,296],[318,232],[440,166]].map(([x,y])=>`<circle class="dot" cx="${x}" cy="${y}" r="4"/>`).join('')}
    ${tags.map(([x,y,t1,t2,ic],i)=>{const sx=[92,206,318,440][i], sy=[340,296,232,166][i];return `<line class="stem" x1="${sx}" y1="${y+54}" x2="${sx}" y2="${sy}"/>
      <g class="tag" transform="translate(${x},${y})"><rect width="146" height="54" rx="10"/>
      <g class="ic" transform="translate(12,15) scale(1)">${P[ic]}</g>
      <text class="t1" x="46" y="24">${t1}</text><text class="t2" x="46" y="41">${t2}</text></g>`;}).join('')}
  </svg>`;
}
function aboutPage(){
  const card = (g,i) => `<div class="glass gcard${i===0?' open':''}" data-g="${i}">
    <button class="ghead" aria-expanded="${i===0}" aria-controls="gb${i}">
      <span class="gnum">0${i+1}</span><span class="pub-ic gicon">${I(g.icon)}</span>
      <span class="gtitle"><h3>Grade ${g.n}</h3><span>${g.tag}</span></span>
      <span class="gsum">${g.sum}</span>
      <span class="gtog">${I(i===0?'minus':'plus')}</span>
    </button>
    <div class="gbody" id="gb${i}">
      <div>
        <h4>What this stage is about</h4><p>${g.about}</p>
        <ul class="helps">${g.helps.map(h=>`<li>${I('check')}<span>${h}</span></li>`).join('')}</ul>
        <div class="why inner"><span class="pub-ic">${I('bulb')}</span><div><b>Why it matters</b><p>${g.why}</p></div></div>
      </div>
      <div class="gright">
        <h4>How uploading your results each term helps</h4><p>${g.results}</p>
        <ul class="uplist">
          <li><span class="pub-ic v">${I('chart')}</span>Keep your academic progress up to date</li>
          <li><span class="pub-ic v">${I('trend')}</span>Show where you're improving and where you may need more support</li>
          <li><span class="pub-ic v">${I('target')}</span>Help you understand how your results relate to future options</li>
          <li><span class="pub-ic v">${I('file')}</span>Build a clear picture of your progress over time</li>
        </ul>
      </div>
    </div></div>`;
  return pubPage('about', `
    <section class="pub-hero">
      <div><div class="kicker">About PATHWAY</div>
        <h1>More than a plan. <span class="g">A guide for every step of high school.</span></h1>
        <p class="lead">PATHWAY is designed for South African learners from Grade 9 to Grade 12. It helps you understand yourself, make informed choices and prepare for what comes next — at the right time, for your stage.</p></div>
      ${pathArt()}
    </section>
    <div class="sec-head"><div class="kicker center">Explore each grade</div><h2>Every grade has a purpose.</h2><p>Select a grade to see what this stage is about and how PATHWAY helps you.</p></div>
    ${GRADE_INFO.map(card).join('')}
    <section class="glass bigpic">
      <div><div class="kicker">The bigger picture</div><h2>Same learner. <br>A brighter tomorrow.</h2>
        <p>From discovering who you are to applying for what comes next, PATHWAY supports you at every stage, so you can move forward with clarity and confidence.</p></div>
      <ol class="stages">${GRADE_INFO.map((g,i)=>`<li><span class="pub-ic${i%2?'':' v'}">${I(g.icon)}</span><b>${g.tag.split(' ')[0]}</b><small>Grade ${g.n}</small></li>${i<3?'<li class="arr" aria-hidden="true">'+I('arrow')+'</li>':''}`).join('')}</ol>
    </section>`);
}
aboutPage.after = () => document.querySelectorAll('.gcard .ghead').forEach(b=>b.addEventListener('click',()=>{
  const card=b.parentElement, open=!card.classList.contains('open');
  document.querySelectorAll('.gcard').forEach(c=>{ c.classList.remove('open'); c.querySelector('.ghead').setAttribute('aria-expanded','false'); c.querySelector('.gtog').innerHTML=I('plus'); });
  if(open){ card.classList.add('open'); b.setAttribute('aria-expanded','true'); b.querySelector('.gtog').innerHTML=I('minus'); }
}));

/* ---------- Pricing ---------- */
function pricingPage(){
  const u=me(); const tick = t => `<li><span class="tk">${I('check')}</span>${t}</li>`;
  const dest = k => u ? (hasAccess(u)?'#/home':'#/plans') : `#/signup?plan=${k}`;
  const worth = [
    ['user','Personalised guidance','PATHWAY uses your information, interests, subjects and results to give you guidance that is relevant to you.'],
    ['bell','Personalised notifications','Receive relevant reminders and updates based on your grade, results, journey and goals.'],
    ['calendar','Stay on top of important dates','Get reminders about result uploads, application deadlines, important milestones and opportunities.'],
    ['trend','Track your progress','See how your academic journey develops over time, instead of looking at each term or year in isolation.'],
    ['refresh','Seamless year-to-year journey','Your profile grows with you. Your information and progress continue from Grade 9 through Grade 12, so you don\'t start from scratch.'],
    ['monitor','Access when you need it','Use PATHWAY on your phone, tablet or computer.']
  ];
  return pubPage('pricing', `
    <section class="pub-hero solo">
      <div class="kicker">Pricing</div>
      <h1>Invest in a clearer <span class="g">tomorrow.</span></h1>
      <p class="lead">More than an app. PATHWAY is a personalised journey that grows with you from one school year to the next.</p>
    </section>
    <div class="plan-cards">
      <div class="plan best"><span class="badge-gold">Best Value</span><div class="plan-art">${I('cap')}</div>
        <div class="price"><b>R199</b><span>/ year</span></div><div><span class="permonth">That's only R16.58 per month!</span></div>
        <ul class="ticks gold">${[...PLAN_FEATURES.annual,'No additional platform fees'].map(tick).join('')}</ul>
        <a class="btn btn-gold btn-block" href="${dest('annual')}">Get Annual Access ${ARROW}</a></div>
      <div class="plan"><div class="plan-art">${I('calendar')}</div>
        <div class="price"><b>R20</b><span>/ month</span></div>
        <ul class="ticks purple">${PLAN_FEATURES.monthly.map(tick).join('')}</ul>
        <a class="btn btn-purple btn-block" href="${dest('monthly')}">Get Monthly Access ${ARROW}</a></div>
    </div>
    <div class="sec-head"><div class="kicker center">Why it's worth it</div><h2>Built to stay with you.</h2><p>PATHWAY isn't something you open once and forget. It's designed to stay with you throughout high school.</p></div>
    <div class="worth">${worth.map(([ic,t,d],i)=>`<div class="glass wcard"><span class="pub-ic${i%2?' v':''}">${I(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    <div class="duo">
      <div class="glass anywhere">
        <div><div class="kicker">Start anywhere</div><h2>Start your journey in any grade.</h2>
          <p>You don't have to begin in Grade 9. Join in Grade 9, 10, 11 or 12 and PATHWAY adapts to your current grade.</p></div>
        <ol class="gpins">${GRADE_INFO.map(g=>`<li><span class="pin">${I('pin')}</span><span><b>Grade ${g.n}</b><small>${g.tag}</small></span></li>`).join('')}</ol>
      </div>
      <div class="glass journey1">
        <div><div class="kicker">A continuous journey</div><h2>One account.<br>Four years.<br>One continuous journey.</h2>
          <p>From Grade 9 to Grade 12, your information, progress and insights build on each other, giving you a consistent experience year after year.</p></div>
        <span class="ring">${I('cap')}</span>
      </div>
    </div>`);
}

/* ---------- FAQ ---------- */
const FAQ = [
  {id:'general', name:'General', icon:'book', qs:[
    ['What is PATHWAY?','PATHWAY is a guidance platform for South African learners from Grade 9 to Grade 12. It helps you understand yourself, explore your options, make informed subject and career choices, track your academic progress and prepare for the next step after school.'],
    ['Who is PATHWAY for?','PATHWAY is for high school learners in Grades 9 to 12 in South Africa. Parents and guardians can use it alongside their child to support these conversations.'],
    ['Can I start using PATHWAY in Grade 10, 11 or 12?','Yes. You choose your grade when you create your account, and PATHWAY adapts to the grade you\'re in.'],
    ['Do I need to know what I want to study already?','No. PATHWAY is designed to help you discover your strengths and interests and to explore your options step by step. Many learners start without a clear plan.'],
    ['Does PATHWAY guarantee university admission?','No. Universities and colleges make their own admission decisions based on their requirements, your results and available places. PATHWAY provides guidance and information to help you prepare and make informed choices.'],
    ['How does PATHWAY use my results?','Your results help PATHWAY keep your profile up to date, show how your progress develops over time and relate your marks to the options you\'re exploring.']]},
  {id:'account', name:'Account & Subscription', icon:'user', qs:[
    ['How much does PATHWAY cost?','There are two options: R199 paid once for 12 months of access (that\'s only R16.58 per month), or R20 per month.'],
    ['What\'s included in the annual subscription?','12 months of access, full platform access and all features, with one payment for the year and no additional platform fees.'],
    ['What\'s included in the monthly subscription?','Monthly access, full platform access and all features. You can cancel the monthly subscription anytime.'],
    ['Can I cancel my monthly subscription?','Yes, you can cancel the monthly subscription anytime. The annual plan is a single payment that covers 12 months of access.'],
    ['Can I join PATHWAY if I\'m already in Grade 10, 11 or 12?','Yes. Choose your current grade when you create your account and PATHWAY starts from there.'],
    ['What happens to my information when I move to the next grade?','PATHWAY is designed so your profile and progress carry forward with you, so you don\'t have to start from scratch each year.']]},
  {id:'results', name:'Results & Academic Data', icon:'chart', qs:[
    ['Why do I need to upload my results?','Your results give PATHWAY a clearer picture of your academic progress, so the guidance you see is based on where you are now.'],
    ['How often should I upload my results?','Each term, as soon as you receive your report. This keeps your profile current.'],
    ['Can I upload a photo of my report?','Yes. You can attach a photo or PDF of your report card when you add your results.'],
    ['Can I enter my results manually?','Yes. You type in your percentage for each subject, and PATHWAY shows the matching achievement level.'],
    ['How does PATHWAY use my marks?','PATHWAY uses your marks to show your progress over time, highlight where you\'re doing well and where you may need to focus, and relate your results to the options you\'re exploring.'],
    ['Can I update my results if something changes?','You can review and edit your results before you confirm them. Once confirmed, they are locked so each Pathway DNA stage is based on a fixed snapshot. If something on a confirmed result is genuinely wrong, contact Support.']]},
  {id:'features', name:'Features & Usage', icon:'gear', qs:[
    ['What is PATHWAY DNA?','PATHWAY DNA is your personalised summary. It brings together your assessments and results to show your strengths, interests, learning preferences, areas you may want to explore, career areas worth exploring and subjects to investigate. It is guidance, not a final answer.'],
    ['What is APS?','APS stands for Admission Point Score. South African universities convert your school results into points to help decide whether you meet the minimum requirements for a course. Each university calculates APS in its own way and sets its own minimums.'],
    ['How does Career Explorer work?','Career Explorer helps you explore careers connected to your interests, strengths and subjects. It opens as you move through your PATHWAY journey.'],
    ['Can PATHWAY help me explore universities and courses?','Yes. From Grade 10 onwards, PATHWAY helps you explore universities and courses and begin setting your own targets.'],
    ['Will PATHWAY tell me what career I must choose?','No. PATHWAY suggests areas you may enjoy exploring. The choice is always yours, and it\'s worth discussing with your family, teachers and school counsellor.'],
    ['Will PATHWAY recommend subjects for me?','PATHWAY suggests subjects worth investigating based on your strengths and interests. Your final choice should also consider what your school offers and advice from your teachers.']]},
  {id:'privacy', name:'Privacy & Security', icon:'shield', qs:[
    ['How is my information protected?','PATHWAY is designed to keep your personal information private and to handle it responsibly, in line with South Africa\'s Protection of Personal Information Act (POPIA). Full details will be set out in our Privacy Policy.'],
    ['Who can see my information?','Your PATHWAY profile is designed to be private to your account. You see it when you sign in.'],
    ['Is my academic information private?','Yes. Your results and academic information are designed to be visible only to you through your account.'],
    ['Can I delete my account?','Yes. You can ask for your account and information to be deleted by contacting Support.']]},
  {id:'technical', name:'Technical Support', icon:'headset', qs:[
    ['What devices can I use PATHWAY on?','PATHWAY works in a web browser on your phone, tablet or computer.'],
    ['What should I do if I can\'t log in?','Check that your email address and password are correct. If you still can\'t sign in, contact Support.'],
    ['What if I forget my password?','Select "Forgot password?" on the sign-in page. If you still need help, contact Support.'],
    ['What if I experience a technical problem?','Try refreshing the page or updating your browser. If the problem continues, contact Support and describe what happened.']]}
];
let FAQ_STATE = {cat:'general', q:'', open:null};
function faqListHTML(){
  const term = FAQ_STATE.q.trim().toLowerCase();
  const qa = (c,i,[q,a]) => { const id=`${c.id}-${i}`, o=FAQ_STATE.open===id; return `<div class="fq${o?' open':''}"><button aria-expanded="${o}" data-fq="${id}"><span>${esc(q)}</span><span class="pm">${I(o?'minus':'plus')}</span></button><div class="ans">${esc(a)}</div></div>`; };
  if(term){
    const hits = FAQ.map(c=>({c, qs:c.qs.map((x,i)=>[i,x]).filter(([,x])=>(x[0]+' '+x[1]).toLowerCase().includes(term))})).filter(h=>h.qs.length);
    if(!hits.length) return `<div class="glass fempty">No questions match "${esc(FAQ_STATE.q)}". Try another word, or <a class="link" href="${helpHref('support')}">contact Support</a>.</div>`;
    return hits.map(({c,qs})=>`<section class="glass fsec open"><div class="fsec-h" style="cursor:default"><span class="ci">${I(c.icon)}</span><h2>${c.name}</h2><span class="cnt">${qs.length} ${qs.length===1?'result':'results'}</span></div><div class="fsec-b">${qs.map(([i,x])=>qa(c,i,x)).join('')}</div></section>`).join('');
  }
  return FAQ.map(c=>{ const o=FAQ_STATE.cat===c.id; return `<section class="glass fsec${o?' open':''}">
    <button class="fsec-h" data-fsec="${c.id}" aria-expanded="${o}"><span class="ci">${I(c.icon)}</span><h2>${c.name}</h2><span class="cnt">${c.qs.length} questions</span><span class="chev">${I('down')}</span></button>
    <div class="fsec-b">${o?c.qs.map((x,i)=>qa(c,i,x)).join(''):''}</div></section>`; }).join('');
}
function faqPage(){
  FAQ_STATE = {cat:'general', q:'', open:'general-0'};
  return pubPage('faq', `
    <section class="pub-hero solo">
      <div class="kicker">FAQ</div>
      <h1>Got questions? <span class="g">We've got answers.</span></h1>
      <p class="lead">Find quick answers to the most common questions about PATHWAY. If you can't find what you're looking for, we're here to help.</p>
      <div class="fsearch">${I('search')}<label class="sr" for="fq-search">Search for a question</label><input id="fq-search" type="search" placeholder="Search for a question…" autocomplete="off"></div>
    </section>
    <div class="fcats" role="tablist" aria-label="Question categories">${FAQ.map(c=>`<button class="fcat${c.id==='general'?' on':''}" role="tab" aria-selected="${c.id==='general'}" data-fcat="${c.id}">${I(c.icon)}<span>${c.name.replace(' & ',' &amp; ')}</span></button>`).join('')}</div>
    <div id="faq-list">${faqListHTML()}</div>
    <section class="glass needhelp">
      <span class="pub-ic big">${I('mail')}</span>
      <div><div class="kicker">Still need help?</div><h2>We're here for you.</h2><p>Can't find the answer you're looking for? Our support team is ready to help.</p></div>
      <a class="btn btn-gold" href="${helpHref('support')}">Contact Support ${ARROW}</a>
    </section>`);
}
faqPage.after = () => {
  const list=document.getElementById('faq-list');
  const redraw=()=>{ list.innerHTML=faqListHTML();
    document.querySelectorAll('.fcat').forEach(b=>{ const on=!FAQ_STATE.q.trim() && b.dataset.fcat===FAQ_STATE.cat; b.classList.toggle('on',on); b.setAttribute('aria-selected',on); }); };
  const pick=id=>{ FAQ_STATE.cat=id; FAQ_STATE.q=''; FAQ_STATE.open=null; document.getElementById('fq-search').value=''; redraw(); };
  document.querySelectorAll('.fcat').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.fcat)));
  list.addEventListener('click',e=>{
    const s=e.target.closest('[data-fsec]'); if(s){ pick(s.dataset.fsec===FAQ_STATE.cat?'':s.dataset.fsec); return; }
    const q=e.target.closest('[data-fq]'); if(q){ FAQ_STATE.open = FAQ_STATE.open===q.dataset.fq?null:q.dataset.fq; redraw(); list.querySelector(`[data-fq="${q.dataset.fq}"]`)?.focus(); }
  });
  document.getElementById('fq-search').addEventListener('input',e=>{ FAQ_STATE.q=e.target.value; FAQ_STATE.open=null; redraw(); });
};

/* ---------- Support ---------- */
function supportPage(){
  const u=me();
  const opts=[
    ['user','Account Help','Account',['Signing in','Creating an account','Passwords','Account details'],'Get Account Help'],
    ['card','Subscription & Payment','Subscription',['Annual subscription','Monthly subscription','Payment issues','Subscription access'],'Get Payment Help'],
    ['chart','Academic Information','Results',['Uploading results','Correcting results','Understanding academic information','Updating your profile'],'Get Academic Help'],
    ['headset','Technical Support','Technical issue',['App problems','Pages not loading','Upload problems','Other technical issues'],'Get Technical Help']];
  return pubPage('support', `
    <section class="pub-hero solo">
      <div class="kicker">Support</div>
      <h1>We're here <span class="g">to help.</span></h1>
      <p class="lead">Having trouble with PATHWAY? Tell us what you need help with and we'll help you find your way forward.</p>
    </section>
    <div class="sopts">${opts.map(([ic,t,topic,items,cta],i)=>`<div class="glass sopt"><span class="pub-ic${i%2?' v':''}">${I(ic)}</span><h3>${t}</h3><span class="hw">Help with:</span>
      <ul>${items.map(x=>`<li>${I('check')}<span>${x}</span></li>`).join('')}</ul>
      <button class="btn btn-outline-purple btn-sm" data-topic="${topic}">${cta} ${ARROW}</button></div>`).join('')}</div>
    <section class="glass sform" id="contact">
      <div class="sside"><div class="kicker">Contact support</div><h2>Send us a message.</h2>
        <p>Tell us a little about what's happening and we'll get back to you by email.</p>
        <p class="hint">Looking for a quick answer? Try the <a class="link" href="${helpHref('faq')}">FAQ</a>.</p></div>
      <div id="sf-wrap"><form id="sf" novalidate>
        <div class="formerr" id="sferr" role="alert"></div>
        <div class="row2">
          <div class="field"><label for="sf-name">Name</label><input class="input" id="sf-name" autocomplete="name" value="${u?esc(u.first+' '+u.surname):''}"><div class="err" id="sf-name-e"></div></div>
          <div class="field"><label for="sf-email">Email address</label><input class="input" id="sf-email" type="email" autocomplete="email" value="${u?esc(u.email):''}"><div class="err" id="sf-email-e"></div></div>
        </div>
        <div class="field"><label for="sf-topic">What can we help you with?</label><select class="input" id="sf-topic"><option value="">Choose a topic</option>${SUPPORT_TOPICS.map(t=>`<option>${t}</option>`).join('')}</select><div class="err" id="sf-topic-e"></div></div>
        <div class="field"><label for="sf-msg">Tell us more</label><textarea class="input" id="sf-msg" maxlength="2000" placeholder="Describe what you need help with…"></textarea><div class="err" id="sf-msg-e"></div></div>
        <button class="btn btn-gold btn-block" type="submit" id="sf-send">Send Support Request ${ARROW}</button>
      </form></div>
    </section>`);
}
supportPage.after = () => {
  document.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{
    document.getElementById('sf-topic').value=b.dataset.topic; setErr('sf-topic','');
    document.getElementById('contact').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>document.getElementById('sf-msg').focus({preventScroll:true}),450);
  }));
  document.getElementById('sf').addEventListener('submit', async e=>{
    e.preventDefault();
    const v=id=>document.getElementById(id).value.trim();
    let ok=setErr('sf-name', v('sf-name')?'':'Enter your name.');
    ok=setErr('sf-email', !v('sf-email')?'Enter your email address.':!/^\S+@\S+\.\S+$/.test(v('sf-email'))?'Enter a valid email address, like name@example.com.':'') && ok;
    ok=setErr('sf-topic', v('sf-topic')?'':'Choose what you need help with.') && ok;
    ok=setErr('sf-msg', v('sf-msg').length<10?'Tell us a little more (at least 10 characters).':'') && ok;
    if(!ok){ document.querySelector('#sf [aria-invalid="true"]')?.focus(); return; }
    const btn=document.getElementById('sf-send'); btn.disabled=true; btn.innerHTML='<span class="spinner"></span> Sending…';
    const res = await submitSupportRequest({name:v('sf-name'), email:v('sf-email'), topic:v('sf-topic'), message:v('sf-msg'), account:me()?.email||null, sentAt:new Date().toISOString()});
    if(res.ok){
      document.getElementById('sf-wrap').innerHTML=`<div class="sent"><div class="tickbig">${I('check')}</div><h3>Request received.</h3><p>${res.queued?'Your request has been saved and will be sent once the support inbox is connected.':'Thanks — we\'ll reply to '+esc(v('sf-email'))+' by email.'}</p></div>`;
    } else {
      btn.disabled=false; btn.innerHTML='Send Support Request '+ARROW;
      const fe=document.getElementById('sferr'); fe.textContent='Your request could not be sent. Check your connection and try again.'; fe.classList.add('show');
    }
  });
};

/* ============================================================
   AUTH
   ============================================================ */
const pageTop = (back=true, extra='') => `<div class="page-top">${back?`<a class="back" href="#/">${I('back')} Back to home</a>`:'<span></span>'}<div style="display:flex;gap:12px;align-items:center">${extra}${themeBtn()}</div></div>`;
function pwField(id,label,ph,ac){ return `<div class="field"><label for="${id}">${label}</label><div class="control">${I('lock')}<input class="input" id="${id}" type="password" placeholder="${ph}" autocomplete="${ac}"><button type="button" class="eye" data-eye="${id}" aria-label="Show password">${I('eye')}</button></div><div class="err" id="${id}-e"></div></div>`; }
function bindEyes(){ document.querySelectorAll('[data-eye]').forEach(b=>b.addEventListener('click',()=>{ const i=document.getElementById(b.dataset.eye); const s=i.type==='password'; i.type=s?'text':'password'; b.innerHTML=I(s?'eyeoff':'eye'); b.setAttribute('aria-label',s?'Hide password':'Show password'); })); }
function setErr(id,msg){ const e=document.getElementById(id+'-e'), i=document.getElementById(id); if(e) e.textContent=msg||''; if(i) i.setAttribute('aria-invalid',msg?'true':'false'); return !msg; }

function signin(){
  return `${pageTop()}
<div class="auth-wrap">
  ${lockupStack()}
  <div class="glass auth-card">
    <h1>Welcome Back</h1><p class="sub">Sign in to continue your pathway.</p>
    <form class="form" id="f" novalidate>
      <div class="formerr" id="ferr" role="alert"></div>
      <div class="field"><label for="em">Email address</label><div class="control">${I('mail')}<input class="input" id="em" type="email" placeholder="Enter your email" autocomplete="email"></div><div class="err" id="em-e"></div></div>
      ${pwField('pw','Password','Enter your password','current-password')}
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <label class="check"><input type="checkbox" id="rem" checked> Remember me</label>
        <button type="button" class="link" id="forgot" style="font-size:.9rem">Forgot password?</button>
      </div>
      <button class="btn btn-gold btn-block" type="submit">Sign In ${ARROW}</button>
      <p class="switchline">Don't have an account? <a class="link" href="#/signup">Create an account</a></p>
    </form>
  </div>
  <div class="trust">
    <div>${I('lock')}Secure and private</div><div>${I('monitor')}Access on any device</div><div>${I('heart')}Support when you need it</div><div>${I('pin')}Your future in one place</div>
  </div>
</div>`;
}
signin.after = () => {
  bindEyes();
  document.getElementById('forgot').addEventListener('click',()=>toast('Password reset by email will be available when PATHWAY launches.','mail'));
  document.getElementById('f').addEventListener('submit', async e=>{
    e.preventDefault();
    const em=document.getElementById('em').value.trim().toLowerCase(), pw=document.getElementById('pw').value;
    let ok = setErr('em', !em?'Enter your email address.':!/^\S+@\S+\.\S+$/.test(em)?'Enter a valid email address, like name@example.com.':'');
    ok = setErr('pw', !pw?'Enter your password.':'') && ok;
    const fe=document.getElementById('ferr'); fe.classList.remove('show');
    if(!ok) return;
    const fail = msg => { fe.textContent=msg; fe.classList.add('show'); };

    const btn=document.querySelector('#f button[type="submit"]'); const label=btn.innerHTML;
    btn.disabled=true; btn.innerHTML='Signing in…';
    const res = await PathwayAPI.login(em, pw);
    btn.disabled=false; btn.innerHTML=label;

    if(res.ok){ await adoptServerAccount(em, res.data.learner); return; }

    /* Demo learners exist only in this browser and never on the server — and
       only at all once the server has unlocked demo mode for it. */
    const local = DB.users[em];
    if(SHOW_DEMO_LOGIN && res.status===401 && isDemo(local) && local.pw === await hash(pw)){
      DB.session=em; save(); go(hasAccess(local)?'#/home':'#/plans'); return;
    }
    if(res.offline) return fail(PathwayAPI.offlineMessage);
    if(res.status===429) return fail('Too many attempts. Please wait a minute and try again.');
    fail(res.data && res.data.error ? res.data.error : 'That email and password don\'t match an account.');
  });
};

/* Brings a learner signed in on the server into this browser.
   Their saved progress may come from another device, so the server copy is
   pulled in before the app renders anything. */
async function adoptServerAccount(email, learner){
  const saved = await PathwayAPI.progress();
  if(saved.ok && saved.data && saved.data.data && Object.keys(saved.data.data).length){
    const blob = saved.data.data;
    if(blob.users) DB.users = Object.assign({}, DB.users, blob.users);
    DB.syncedAt = Date.parse(saved.data.updatedAt) || Date.now();
  }
  /* No record here yet — a first sign-in on a new device. Build one from the
     account the server returned so the journey has somewhere to start. */
  if(!DB.users[email]){
    DB.users[email] = {first:learner.firstName||'', surname:learner.lastName||'', email:email,
      dob:learner.dateOfBirth||null, grade:learner.grade||'', createdAt:Date.now(),
      sub:null, progress:freshProgress()};
  }
  const u=DB.users[email];
  if(learner.grade) u.grade=learner.grade;
  u.sub = learner.hasAccess ? (u.sub || {plan:learner.plan, paidAt:Date.now()}) : null;
  DB.session=email; save();
  go(hasAccess(u)?'#/home':'#/plans');
}

/* ============================================================
   CREATE ACCOUNT — five short steps: About you · Your school · Grade & term · Your account · Review
   The draft lives in memory only (never in storage) until the account is created.
   ============================================================ */
let SU = {step:1, d:{}};
const SU_STEPS = ['About you','Your school','Grade & term','Your account','Review'];
const ageFrom = dob => { const d=new Date(dob), t=new Date(); let a=t.getFullYear()-d.getFullYear(); if(t<new Date(t.getFullYear(),d.getMonth(),d.getDate())) a--; return a; };
/* age vs grade: typical ages are about grade + 4 to grade + 7. Clearly implausible combinations are stopped; unusual ones can be confirmed. */
function dobCheck(dob, grade){
  /* the typical age during the year for grade G is about G+5 (turning G+6). PATHWAY allows ±3 years around that and asks the learner to check anything outside it. */
  if(!dob||!grade) return {level:'ok'};
  const age=ageFrom(dob), g=+grade, lo=g+5-3, hi=g+6+3;
  if(new Date(dob)>new Date() || age<g || age>80) return {level:'block', age, dir: age<lo?'younger':'older'};
  if(age<lo || age>hi) return {level:'confirm', age, dir: age<lo?'younger':'older'};
  return {level:'ok', age};
}
function signup(){
  const s=SU.step, d=SU.d, iso=x=>x.toISOString().slice(0,10);
  const bar=`<ol class="sustep" aria-label="Sign-up progress">${SU_STEPS.map((t,i)=>`<li class="${i+1<s?'done':i+1===s?'cur':''}"><span>${i+1<s?I('check'):i+1}</span><small>${t}</small></li>`).join('')}</ol>`;
  const f=(id,label,input,help)=>`<div class="field"><label for="${id}">${label}</label>${input}${help?`<p class="help">${help}</p>`:''}<div class="err" id="${id}-e"></div></div>`;
  const val=k=>esc(d[k]||'');
  let body='';
  if(s===1) body=`<h1>Let’s start with you</h1><p class="sub">This helps us set up your Pathway.</p>
    <div class="row2">${f('fn','First name',`<input class="input" id="fn" autocomplete="given-name" value="${val('fn')}">`)}${f('sn','Surname',`<input class="input" id="sn" autocomplete="family-name" value="${val('sn')}">`)}</div>
    ${f('dob','Date of birth',`<input class="input" id="dob" type="date" max="${iso(new Date())}" value="${val('dob')}">`)}
    ${f('gen','Gender <span class="opt">(optional)</span>',`<select class="input" id="gen"><option value="">Choose if you’d like to</option>${['Female','Male','Another identity','Prefer not to say'].map(o=>`<option ${d.gen===o?'selected':''}>${o}</option>`).join('')}</select>`)}`;
  if(s===2) body=`<h1>Your school</h1><p class="sub">Which school do you go to?</p>
    ${f('sch','School name',`<input class="input" id="sch" autocomplete="organization" maxlength="80" placeholder="e.g. Durban High School" value="${val('sch')}">`)}`;
  if(s===3){ const calT=currentTermNo(), chk=dobCheck(d.dob,d.gr);
    body=`<h1>Your grade and term</h1><p class="sub">This tells Pathway where you’re starting your journey, so it asks for the right results and shows the right information.</p>
    <fieldset class="pillset"><legend>Current grade</legend>${[9,10,11,12].map(g=>`<label class="pillopt"><input type="radio" name="gr" value="${g}" ${String(d.gr)===String(g)?'checked':''}><span>Grade ${g}</span></label>`).join('')}</fieldset><div class="err" id="gr-e"></div>
    <fieldset class="pillset"><legend>Current term</legend>${[1,2,3,4].map(t=>`<label class="pillopt"><input type="radio" name="tm" value="${t}" ${String(d.tm||'')===String(t)?'checked':''}><span>Term ${t}</span></label>`).join('')}</fieldset>
    <p class="help">According to the ${CAL_YEAR} school calendar, schools are ${TERMS.some(t=>today()>=d0(t.s)&&today()<=d0(t.e))?'in':'about to start'} Term ${calT}.</p><div class="err" id="tm-e"></div>
    <div id="dobwarn">${dobWarnHTML(chk)}</div>`; }
  if(s===4) body=`<h1>Your account</h1><p class="sub">Almost done.</p>
    ${f('em','Email address',`<div class="control">${I('mail')}<input class="input" id="em" type="email" autocomplete="email" placeholder="you@example.com" value="${val('em')}"></div>`,'We’ll use this to help you access your PATHWAY account and keep it secure.')}
    ${f('mob','Mobile number <span class="opt">(optional)</span>',`<input class="input" id="mob" type="tel" inputmode="tel" autocomplete="tel" placeholder="e.g. 082 123 4567" value="${val('mob')}">`,'Add your number if you’d like PATHWAY reminders by SMS or WhatsApp once they’re available.')}
    <div class="row2">${pwField('pw','Password','At least 8 characters','new-password')}${pwField('pw2','Confirm password','Type it again','new-password')}</div>
    <p class="help">Use at least 8 characters, including a letter and a number.</p>`;
  if(s===5){ const row=(t,v,st)=>`<div class="rvrow"><span>${t}</span><b>${esc(v)}</b><button type="button" class="link" data-goto="${st}">Edit</button></div>`;
    body=`<h1>Check your details</h1><p class="sub">Make sure everything is right before you create your account.</p>
    <div class="review inner">${row('Name',`${d.fn} ${d.sn}`,1)}${row('Date of birth',fmtLong(new Date(d.dob)),1)}${d.gen?row('Gender',d.gen,1):''}${row('School',d.sch,2)}${row('Grade and term',`Grade ${d.gr} · Term ${d.tm}`,3)}${row('Email',d.em,4)}${d.mob?row('Mobile',d.mob,4):''}</div>
    ${['10','11','12'].includes(String(d.gr))?`<p class="help">${I('info')} Your first step will be to add your <b>${rkLabel(firstKeyFor(+d.gr,+d.tm))}</b> results.</p>`:`<p class="help">${I('info')} Your first step will be Pathway Assessment 1.</p>`}`; }
  return `${pageTop()}
<div class="auth-wrap wide">
  ${lockupStack()}
  <div class="glass auth-card su">
    ${bar}
    <form class="form" id="f" novalidate>${body}
      <div class="sunav">${s>1?`<button type="button" class="btn btn-ghost" id="suback">${I('back')} Back</button>`:'<span></span>'}<button class="btn btn-gold" type="submit">${s<5?'Continue':'Create account'} ${ARROW}</button></div>
      ${s===1?`<p class="switchline">Already have an account? <a class="link" href="#/signin">Sign in</a></p>`:''}
    </form>
  </div>
</div>`;
}
function dobWarnHTML(chk, grade){
  if(chk.level==='ok') return '';
  const g=grade||SU.d.gr, msg=`You entered Grade ${g} and a date of birth that would make you significantly ${chk.dir} than the typical Grade ${g} age.`;
  return `<div class="dobwarn ${chk.level==='block'?'bad':''}" role="alert"><b>⚠️ Please check your details</b><p>Your date of birth does not seem to match the grade you selected. ${msg}</p>
    ${chk.level==='confirm'?`<label class="confirmline"><input type="checkbox" id="dobok"> My date of birth and grade are correct</label>`:`<p>This date of birth isn’t possible for a high-school learner — please correct it to continue.</p>`}
    <div class="actions"><button type="button" class="btn btn-ghost btn-sm" data-goto="1">Edit date of birth</button><button type="button" class="btn btn-ghost btn-sm" data-focus-grade>Change grade</button></div></div>`;
}
signup.after = () => {
  bindEyes();
  const q=new URLSearchParams(location.hash.split('?')[1]||''), plan=q.get('plan'), d=SU.d, v=id=>(document.getElementById(id)?.value||'').trim();
  const goto=n=>{ SU.step=n; render(); window.scrollTo(0,0); document.querySelector('.auth-card h1')?.focus?.(); };
  document.querySelectorAll('#f input,#f select').forEach(el=>el.addEventListener('input',()=>{ const id=el.id||el.name; if(id && document.getElementById(id+'-e')?.textContent) setErr(id,''); }));   /* clear a message as soon as the learner fixes it */
  document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>goto(+b.dataset.goto)));
  document.getElementById('suback')?.addEventListener('click',()=>goto(SU.step-1));
  const bindWarn=()=>{ document.querySelectorAll('#dobwarn [data-goto]').forEach(b=>b.addEventListener('click',()=>goto(1))); document.querySelectorAll('#dobwarn [data-focus-grade]').forEach(b=>b.addEventListener('click',()=>document.querySelector('[name="gr"]:checked, [name="gr"]')?.focus())); };
  if(SU.step===3){ bindWarn(); document.querySelectorAll('[name="gr"]').forEach(r=>r.addEventListener('change',()=>{ d.gr=r.value; document.getElementById('dobwarn').innerHTML=dobWarnHTML(dobCheck(d.dob,d.gr)); bindWarn(); })); }
  document.getElementById('f').addEventListener('submit', async e=>{ e.preventDefault(); let ok=true;
    if(SU.step===1){ d.fn=v('fn'); d.sn=v('sn'); d.dob=v('dob'); d.gen=v('gen');
      ok = setErr('fn', !d.fn?'Please enter your first name.':d.fn.length>40?'Please keep your first name under 40 characters.':'') && ok;
      ok = setErr('sn', !d.sn?'Please enter your surname.':d.sn.length>40?'Please keep your surname under 40 characters.':'') && ok;
      ok = setErr('dob', !d.dob?'Please enter your date of birth.':new Date(d.dob)>new Date()?'Your date of birth can’t be in the future.':'') && ok; }
    if(SU.step===2){ d.sch=v('sch'); ok = setErr('sch', !d.sch?'Please enter the name of your school.':d.sch.length<3?'Please enter your school’s full name.':'') && ok; }
    if(SU.step===3){ d.gr=document.querySelector('[name="gr"]:checked')?.value||''; d.tm=document.querySelector('[name="tm"]:checked')?.value||'';
      ok = setErr('gr', !d.gr?'Please choose your current grade.':'') && ok; ok = setErr('tm', !d.tm?'Please choose your current term.':'') && ok;
      const chk=dobCheck(d.dob,d.gr);
      if(ok && chk.level==='block'){ ok=false; document.querySelector('.dobwarn')?.scrollIntoView({behavior:'smooth',block:'center'}); }
      if(ok && chk.level==='confirm' && !document.getElementById('dobok')?.checked){ ok=false; setErr('tm','Please confirm your date of birth and grade above, or go back and correct it.'); } }
    if(SU.step===4){ d.em=v('em').toLowerCase(); d.mob=v('mob'); const pw=document.getElementById('pw').value, pw2=document.getElementById('pw2').value;
      ok = setErr('em', !d.em?'Please enter your email address.':!/^\S+@\S+\.\S+$/.test(d.em)?'Please enter a valid email address, like name@example.com.':DB.users[d.em]?'There’s already an account with this email. Sign in instead.':'') && ok;
      ok = setErr('mob', d.mob && !/^(\+27|0)\d{9}$/.test(d.mob.replace(/[\s-]/g,''))?'Please enter a South African mobile number, like 082 123 4567 — or leave it blank.':'') && ok;
      ok = setErr('pw', pw.length<8?'Please use at least 8 characters.':!(/[A-Za-z]/.test(pw)&&/\d/.test(pw))?'Please include at least one letter and one number.':'') && ok;
      ok = setErr('pw2', !pw2?'Please confirm your password.':pw2!==pw?'The passwords don’t match.':'') && ok;
      if(ok) d.pw=pw; }
    if(!ok){ document.querySelector('[aria-invalid="true"]')?.focus(); return; }
    if(SU.step<5){ goto(SU.step+1); return; }

    /* Create the account on the server first: it owns the email, hashes the
       password and starts the session. Only once that succeeds do we build
       the local record the rest of the prototype reads. */
    const btn=document.querySelector('#f button[type="submit"]'); const label=btn.innerHTML;
    btn.disabled=true; btn.innerHTML='Creating your account…';
    const res = await PathwayAPI.register({ email:d.em, password:d.pw, firstName:d.fn, lastName:d.sn,
      grade:String(d.gr), dateOfBirth:d.dob });
    btn.disabled=false; btn.innerHTML=label;

    if(!res.ok){
      const msg = res.offline ? PathwayAPI.offlineMessage
        : res.status===409 ? 'There’s already an account with this email. Sign in instead.'
        : (res.data && res.data.error) || 'We could not create your account just now. Please try again.';
      goto(4); setTimeout(()=>setErr('em', msg), 0); toast(msg,'alert'); return;
    }

    const u = DB.users[d.em] = {first:d.fn, surname:d.sn, email:d.em, dob:d.dob, gender:d.gen||null, school:d.sch, mobile:d.mob||null,
      notifyChannels:{inApp:true, sms:false, whatsapp:false},   /* SMS/WhatsApp need a backend integration and consent — stored off until then */
      grade:d.gr, signupTerm:+d.tm, createdAt:Date.now(), sub:null, pickedPlan: plan==='monthly'?'monthly':plan==='annual'?'annual':null, progress:freshProgress()};
    if(['10','11','12'].includes(String(d.gr))) u.fetStart={grade:String(d.gr), term:+d.tm, date:new Date().toISOString(), firstKey:firstKeyFor(+d.gr,+d.tm)};   /* entry point decides the first required results */
    SU={step:1,d:{}}; DB.session=d.em; save(); go('#/plans');   /* the password is never kept in this browser */
  });
};

/* ============================================================
   PLANS & PAYMENT
   ============================================================ */
const PLANS = { annual:{label:'Annual', price:199, per:'year', cents:'R199.00'}, monthly:{label:'Monthly', price:20, per:'month', cents:'R20.00'} };
/* Whether checkout is real. The server decides this, not the browser — see app/page.tsx. */
const PF = () => window.PATHWAY_PAYFAST || {enabled:false, sandbox:false};
function plans(){
  return `<div class="page-top">${lockup('#/')}<div style="display:flex;gap:12px;align-items:center">${themeBtn()}<span class="chip">${I('lock')} Secure checkout</span></div></div>
<div class="plans-wrap">
  <div class="plans-head">
    <h1>Your Pathway <span>starts here.</span></h1>
    <p class="s1">Choose how you'd like to access PATHWAY.</p>
    <p class="s2">Your account has been created. Choose a plan below to unlock your PATHWAY journey.</p>
  </div>
  <div class="plan-cards">
    <div class="plan best">
      <span class="badge-gold">Best Value</span>
      <div class="plan-art">${I('cap')}</div>
      <div class="price"><b>R199</b><span>/ year</span></div>
      <div><span class="permonth">That's only R16.58 per month!</span></div>
      <ul class="ticks gold">${PLAN_FEATURES.annual.map(t=>`<li><span class="tk">${I('check')}</span>${t}</li>`).join('')}</ul>
      <a class="btn btn-gold btn-block" href="#/pay?plan=annual">Continue with R199 / year ${ARROW}</a>
    </div>
    <div class="plan">
      <div class="plan-art">${I('calendar')}</div>
      <div class="price"><b>R20</b><span>/ month</span></div>
      <ul class="ticks purple">${PLAN_FEATURES.monthly.map(t=>`<li><span class="tk">${I('check')}</span>${t}</li>`).join('')}</ul>
      <a class="btn btn-purple btn-block" href="#/pay?plan=monthly">Continue with R20 / month ${ARROW}</a>
    </div>
  </div>
  <div class="glass reassure">
    <div><div class="ico">${I('shield')}</div><div><h3>Secure payment</h3><p>Your payment is processed securely using trusted providers.</p></div></div>
    <div><div class="ico g">${I('refresh')}</div><div><h3>Flexible access</h3><p>Pay once for the year, or monthly with the option to cancel anytime.</p></div></div>
    <div><div class="ico">${I('users')}</div><div><h3>Built for Grades 9 – 12</h3><p>Your subscription gives you access to the full PATHWAY platform.</p></div></div>
  </div>
  <p class="already">Signed in as ${esc(me().email)}. <button class="link" data-act="logout">Use a different account</button></p>
</div>`;
}
function pay(){
  const q=new URLSearchParams(location.hash.split('?')[1]||''); const k=q.get('plan')==='monthly'?'monthly':'annual'; const p=PLANS[k];
  const t=today(); const nxt = k==='annual'? new Date(t.getFullYear()+1,t.getMonth(),t.getDate()) : new Date(t.getFullYear(),t.getMonth()+1,t.getDate());
  const fmt=d=>`${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
  return `<div class="page-top"><a class="back" href="#/plans">${I('back')} Change plan</a><div style="display:flex;gap:12px;align-items:center">${themeBtn()}<span class="chip">${I('lock')} Secure checkout</span></div></div>
<div class="pay-grid">
  <div class="glass summary">
    ${lockup('#/plans')}
    <h2 style="margin-top:26px">Order summary</h2>
    <div style="margin-top:14px">
      <div class="sumrow"><span>Plan</span><span>PATHWAY ${p.label}</span></div>
      <div class="sumrow"><span>Learner</span><span>${esc(me().first)} ${esc(me().surname)}</span></div>
      <div class="sumrow"><span>Access</span><span>${k==='annual'?'12 months':'Monthly, cancel anytime'}</span></div>
      <div class="sumrow"><span>${k==='annual'?'Access until':'Next payment'}</span><span>${fmt(nxt)}</span></div>
      ${k==='annual'?`<div class="sumrow"><span>Payment</span><span>One payment for the year</span></div>`:''}
      ${k==='annual'?`<div class="sumrow"><span>Works out to</span><span>R16.58 per month</span></div>`:''}
      <div class="sumrow total"><span>Total today</span><span>${p.cents}</span></div>
    </div>
    ${payNotice()}
  </div>
  ${payPanel(k,p)}
</div>`;
}
/* What the learner is told about the checkout depends on what is taking the money. */
function payNotice(){
  const pf=PF();
  if(!pf.enabled) return `<div class="notice"><b>Prototype checkout.</b> No real payment is taken. Use a test card such as 4242 4242 4242 4242 with any future expiry date and any 3-digit CVC.</div>`;
  if(pf.sandbox) return `<div class="notice"><b>Test mode.</b> This checkout is pointed at Payfast's sandbox, so no real money is taken.</div>`;
  return '';
}
/* The paying half of the checkout: a wait screen if we are back from Payfast
   and it has not told the server yet, Payfast when it is set up, and the
   simulated card form when it is not. */
function payPanel(k,p){
  const q=new URLSearchParams(location.hash.split('?')[1]||'');
  if(q.get('pending')) return `<div class="glass paycard">
    <h2>${I('lock')} Confirming your payment</h2>
    <p style="margin-top:14px">Payfast is confirming your payment with us. This usually takes a few seconds — you can stay on this page.</p>
    <p style="margin-top:22px;text-align:center"><span class="spinner"></span></p>
    <div class="err" id="pf-e"></div>
  </div>`;
  if(PF().enabled) return `<div class="glass paycard">
    <h2>${I('lock')} Secure checkout</h2>
    <p style="margin-top:14px">You will be taken to Payfast to pay by card, EFT or instant EFT. PATHWAY never sees your card details.</p>
    ${k==='monthly'?`<p style="margin-top:10px">This sets up a monthly subscription of ${p.cents}. You can cancel it anytime.</p>`:`<p style="margin-top:10px">This is one payment of ${p.cents} for 12 months. Nothing renews automatically.</p>`}
    <button class="btn btn-gold btn-block" id="paybtn" style="margin-top:24px">Pay ${p.cents} with Payfast ${ARROW}</button>
    <div class="err" id="pf-e"></div>
    <p class="hint" style="text-align:center">${I('lock')} Payments are handled by Payfast, a South African payment provider.</p>
  </div>`;
  return `<div class="glass paycard">
    <h2>${I('card')} Pay by card</h2>
    <form class="form" id="f" novalidate>
      <div class="field"><label for="cn">Name on card</label><input class="input" id="cn" autocomplete="cc-name" placeholder="As it appears on the card"><div class="err" id="cn-e"></div></div>
      <div class="field"><label for="cc">Card number</label><div class="control">${I('card')}<input class="input" id="cc" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" maxlength="23"></div><div class="err" id="cc-e"></div></div>
      <div class="row3">
        <div class="field"><label for="ex">Expiry date</label><input class="input" id="ex" inputmode="numeric" autocomplete="cc-exp" placeholder="MM / YY" maxlength="7"><div class="err" id="ex-e"></div></div>
        <div class="field"><label for="cv">CVC</label><input class="input" id="cv" inputmode="numeric" autocomplete="cc-csc" placeholder="3 or 4 digits" maxlength="4"><div class="err" id="cv-e"></div></div>
      </div>
      <button class="btn btn-gold btn-block" type="submit" id="paybtn">Pay ${p.cents}</button>
      <p class="hint" style="text-align:center">${I('lock')} Payments will be handled by a trusted South African payment provider.</p>
    </form>
  </div>`;
}
/* Hands the browser a signed form and lets it post itself to Payfast. The
   learner leaves the site here; access is granted by the ITN, not by coming back. */
function payfastStart(k){
  const btn=document.getElementById('paybtn'); if(!btn) return;
  const label=`Pay ${PLANS[k].cents} with Payfast ${ARROW}`;
  btn.addEventListener('click', async ()=>{
    btn.disabled=true; btn.innerHTML='<span class="spinner"></span> Taking you to Payfast…'; setErr('pf','');
    const res=await PathwayAPI.payfastCheckout(k);
    if(!res.ok || !res.data || !res.data.fields){
      btn.disabled=false; btn.innerHTML=label;
      setErr('pf', res.offline ? PathwayAPI.offlineMessage : (res.data && res.data.error) || 'We could not start the checkout. Please try again.');
      return;
    }
    const f=document.createElement('form');
    f.method='POST'; f.action=res.data.action; f.style.display='none';
    Object.keys(res.data.fields).forEach(name=>{
      const i=document.createElement('input'); i.type='hidden'; i.name=name; i.value=res.data.fields[name]; f.appendChild(i);
    });
    document.body.appendChild(f); f.submit();
  });
}
/* The browser usually beats Payfast's notification home, so wait for the
   server rather than taking the return trip as proof of payment. */
function watchPayment(id){
  let tries=0;
  const tick=async ()=>{
    const res=await PathwayAPI.paymentStatus(id);
    const state=res.ok && res.data ? res.data.state : null;
    if(state==='complete'){
      const u=me(); if(u){ u.sub={plan:res.data.plan, paidAt:Date.now()}; save(); }
      go('#/home'); return;
    }
    if(state==='cancelled'||state==='failed'){ go('#/plans?failed=1'); return; }
    if(++tries>20){ setErr('pf','This is taking longer than usual. If the payment went through it will appear under My Subscription shortly — there is no need to pay again.'); return; }
    setTimeout(tick, 2000);
  };
  tick();
}
pay.after = () => {
  const q=new URLSearchParams(location.hash.split('?')[1]||''); const k=q.get('plan')==='monthly'?'monthly':'annual';
  const pending=q.get('pending');
  if(pending) return watchPayment(pending);
  if(PF().enabled) return payfastStart(k);
  const cc=document.getElementById('cc'), ex=document.getElementById('ex'), cv=document.getElementById('cv');
  cc.addEventListener('input',()=>{ const d=cc.value.replace(/\D/g,'').slice(0,19); cc.value=d.replace(/(.{4})/g,'$1 ').trim(); });
  ex.addEventListener('input',e=>{ let d=ex.value.replace(/\D/g,'').slice(0,4); if(d.length>=3) d=d.slice(0,2)+' / '+d.slice(2); ex.value=d; });
  cv.addEventListener('input',()=>{ cv.value=cv.value.replace(/\D/g,'').slice(0,4); });
  const luhn = n => { let s=0, alt=false; for(let i=n.length-1;i>=0;i--){ let x=+n[i]; if(alt){x*=2; if(x>9)x-=9;} s+=x; alt=!alt; } return s%10===0; };
  document.getElementById('f').addEventListener('submit', e=>{
    e.preventDefault();
    const name=document.getElementById('cn').value.trim(), num=cc.value.replace(/\s/g,''), exp=ex.value.replace(/\D/g,''), cvc=cv.value;
    let ok=setErr('cn', !name?'Enter the name on the card.':'');
    ok = setErr('cc', num.length<13?'Enter the full card number.':!luhn(num)?'Check the card number — it doesn\'t look right.':'') && ok;
    let eErr=''; if(exp.length<4) eErr='Enter the expiry date as MM / YY.'; else { const m=+exp.slice(0,2), y=2000+ +exp.slice(2); const now=new Date(); if(m<1||m>12) eErr='The month must be between 01 and 12.'; else if(y<now.getFullYear()||(y===now.getFullYear()&&m<now.getMonth()+1)) eErr='This card has expired.'; }
    ok = setErr('ex', eErr) && ok;
    ok = setErr('cv', cvc.length<3?'Enter the 3- or 4-digit code on the back of the card.':'') && ok;
    if(!ok) return;
    const b=document.getElementById('paybtn'); b.disabled=true; b.innerHTML='<span class="spinner"></span> Processing payment…';
    setTimeout(async ()=>{
      const u=me(); u.sub={plan:k, paidAt:Date.now(), last4:num.slice(-4)}; save();
      /* Record the plan on the account so access follows the learner to another
         device. Payment itself is still simulated — see the README. */
      await PathwayAPI.subscribe(k);
      const o=document.createElement('div'); o.className='overlay'; o.innerHTML=`<div class="glass" role="alertdialog" aria-label="Payment successful"><div class="tickbig">${I('check')}</div><h2>Payment successful</h2><p>Welcome to PATHWAY, ${esc(u.first)}. Taking you to your Home…</p></div>`; document.body.appendChild(o);
      setTimeout(()=>{ o.remove(); go('#/home'); }, 1500);
    }, 1400);
  });
};

/* ============================================================
   AUTHENTICATED SHELL
   ============================================================ */
function navLinks(u){
  const path=(location.hash.replace(/^#/,'')||'/').split('?')[0];
  const match = (href,alts=[]) => [href.slice(1),...alts].some(p=>path===p);
  const item=(href,ic,label,alts)=>{ const on=match(href,alts); return `<a class="${on?'on':''}" href="${href}"${on?' aria-current="page"':''} data-tip="${label}" aria-label="${label}">${I(ic)}<span class="lab">${label}</span></a>`; };
  const g9 = String(u.grade)==='9';
  const hasStages = !!Object.keys(u.progress?.dnaStages||{}).length;
  const journey = item('#/home','home','Home') + (g9 ? item('#/my-assessment','clipboard','My Pathway Assessment',['/assessment/1','/assessment/2','/answers/1','/answers/2']) + item('#/results','chart','My Results',['/results/add']) + item('#/dna','dna','My Pathway DNA',['/dna/stage']) : (hasStages ? item('#/dna','dna','My Grade 9 Pathway',['/dna/stage']) : ''));
  const explore = item('#/careers','briefcase','Career Explorer',['/careers/view','/careers/compare']) + item('#/pathway-101','book','Pathway 101');
  const help = item('#/subscription','card','My Subscription') + item('#/help/faq','chat','FAQ') + item('#/help/support','headset','Support');
  const grp = t => `<span class="navgroup">${t}</span>`;
  const map = item('#/my-pathway','compass','My Pathway Map');
  if(!g9 && isFET(u)){   /* HOME · MY PATHWAY · EXPLORE · PLAN · SUPPORT */
    const gr=gradeOf(u);
    const mine = item('#/aps','chart','My Results &amp; Projected APS',['/aps/add','/aps/improve']) + item('#/progress','trend','My Progress') + map;
    const ex = item('#/careers','briefcase','Career Explorer',['/careers/view','/careers/compare']) + (gr!=='12' ? item('#/decision-lab','layers','Decision Lab') : '');
    const plan = item('#/targets','target','My Three Study Targets',['/targets/matches']) + (appsAllowed(u) ? item('#/apply','file','Applications',['/apply/uni']) : '') + item('#/what-if','spark','What If?') + item('#/after-matric','cap','After Matric',['/applications','/deadlines','/next']);
    const sup = item('#/pathway-101','book','Pathway 101') + item('#/profile','user','Profile',['/grade','/subscription','/help/faq','/help/support']) + (hasStages ? item('#/dna','dna','My Grade 9 Pathway',['/dna/stage']) : '');   /* subscription, FAQ and Support live in Profile for Grades 10–12 */
    return `<nav class="nav" aria-label="Learner navigation">${item('#/home','home','Home',['/next','/applications','/deadlines'])}${grp('My pathway')}${mine}${grp('Explore')}${ex}${grp('Plan')}${plan}${grp('Support')}${sup}</nav>`;
  }
  const homeItem=item('#/home','home','Home');
  return `<nav class="nav" aria-label="Learner navigation">${homeItem}${grp('My pathway')}${journey.slice(homeItem.length)}${map}${grp('Explore')}${item('#/careers','briefcase','Career Explorer',['/careers/view','/careers/compare'])}${item('#/decision-lab','layers','Decision Lab')}${grp('Support')}${item('#/pathway-101','book','Pathway 101')}${help}</nav>`;
}
function shell(content){
  const u=me(); const initials=(u.first[0]+(u.surname[0]||'')).toUpperCase();
  const planTxt = isDemo(u) ? 'Demo account · no payment required' : u.sub ? (u.sub.plan==='annual'?'Annual plan · R199 once for 12 months':'Monthly plan · R20/month, cancel anytime') : '';
  return `
<div class="shell${DB.navCollapsed?' collapsed':''}">
  <aside class="side glass" aria-label="PATHWAY navigation">
    <div class="sidetop"><button class="navtoggle" data-act="navtoggle" aria-label="${DB.navCollapsed?'Expand':'Collapse'} menu" aria-expanded="${!DB.navCollapsed}">${I('menu')}</button>${lockup('#/home')}</div>
    ${navLinks(u)}
  </aside>
  <div class="main">
    <div class="mbar">
      <button class="burger" data-act="drawer" aria-label="Open navigation">${I('menu')}</button>
      <img class="mark" src="${MARK}" alt="PATHWAY">
      <div style="display:flex;gap:8px;align-items:center">${themeBtn()}${meButton(u,initials,planTxt,'m')}</div>
    </div>
    ${content(u,initials,planTxt)}
  </div>
</div>
<div class="drawer" id="drawer" role="dialog" aria-label="Navigation">
  <div class="scrim" data-act="drawer-close"></div>
  <div class="glass">
    <button class="close" data-act="drawer-close" aria-label="Close navigation">${I('x')}</button>
    <div style="padding:6px 8px 26px">${lockup('#/home')}</div>
    ${navLinks(u)}
    <div style="margin-top:auto;display:grid;gap:6px">
      <a class="btn btn-ghost btn-block" href="#/grade">${I('cap')} Update my grade</a>
      <button class="btn btn-ghost btn-block" data-act="logout">${I('logout')} Log out</button>
    </div>
  </div>
</div>`;
}
function meButton(u,initials,planTxt,suffix=''){
  const id = suffix ? '' : 'id="meMenu"';
  return `${suffix?'':bellHTML(u)}<div class="me"><button data-act="${suffix?'drawer':'menu'}" aria-haspopup="true" aria-expanded="false"><span class="avatar">${esc(initials)}</span><span class="who"><b>${esc(u.first)} ${esc(u.surname)}</b><small>Grade ${esc(u.grade)}</small></span>${suffix?'':I('down')}</button>
  ${suffix?'':`<div class="menu glass" ${id} role="menu"><div class="mi-head"><b>${esc(u.first)} ${esc(u.surname)}</b>${esc(u.email)}<br>${esc(planTxt)}</div>
    <button role="menuitem" onclick="location.hash='#/grade'">${I('cap')} Update my grade</button>
    <button role="menuitem" data-act="logout">${I('logout')} Log out</button></div>`}</div>`;
}

/* ---------- grade identity components ---------- */
const GRADE_ORDER = ['9','10','11','12'];
function stageRibbon(u){
  const cur=gradeOf(u), past=new Set((u.gradeHistory||[]).map(h=>h.from));
  return `<ol class="gribbon" aria-label="Your high school journey">${GRADE_ORDER.map(g=>{ const t=GRADE_THEMES[g];
    const st = g===cur ? 'now' : past.has(g) ? 'done' : (+g<+cur ? 'before' : 'ahead');
    return `<li class="gstage ${st}" style="--sw:${t.dark.acc}"><span class="gdot">${st==='done'?I('check'):st==='now'?I('star'):''}</span><b>Grade ${g}</b><small>${t.chapter}</small>${st==='now'?'<em>You are here</em>':''}</li>`; }).join('')}</ol>`;
}
function gradeHome(u){
  const g=gradeOf(u), t=gradeTheme(u), info=GRADE_INFO.find(x=>String(x.n)===g);
  const hasG9 = !!Object.keys(u.progress?.dnaStages||{}).length;
  const joinedHere = !(u.gradeHistory||[]).length;
  return `
    <section class="glass chapter">
      <div class="kicker">Grade ${g} · ${t.chapter}</div>
      <h2>Welcome to your Grade ${g} Pathway.</h2>
      <p class="lead">${esc(info.about)}</p>
      ${stageRibbon(u)}
      <p class="hint" style="margin-top:14px">Same learner. Same Pathway. A new stage of the journey.</p>
    </section>
    <div class="lower">
      <section class="glass next"><h2 style="font-size:clamp(1.6rem,2.3vw,2.1rem)">Your Grade ${g} journey</h2>
        <div class="empty inner"><span class="pub-ic">${I('compass')}</span><div><h3>Your Grade ${g} steps are on their way.</h3><p>This part of PATHWAY is still being built. When it opens, your Grade ${g} journey will appear right here — you won’t need to go looking for it.</p></div></div>
      </section>
      <section class="glass dates"><h2 style="font-size:clamp(1.6rem,2.3vw,2.1rem)">Your Pathway so far</h2>
        ${hasG9 ? `<p class="sub">Everything from your earlier grades stays with you.</p>
          <div class="histlist"><a class="inner hitem" href="#/dna"><span class="pub-ic">${I('dna')}</span><span><b>Your Grade 9 Pathway DNA</b><small>Built from your Grade 9 assessments and results</small></span>${I('arrow')}</a>
          ${u.progress.a1?.done?`<a class="inner hitem" href="#/answers/1"><span class="pub-ic">${I('file')}</span><span><b>Pathway Assessment 1 — My Answers</b><small>Your saved answers</small></span>${I('arrow')}</a>`:''}
          ${u.progress.a2?.done?`<a class="inner hitem" href="#/answers/2"><span class="pub-ic">${I('file')}</span><span><b>Pathway Assessment 2 — My Answers</b><small>Your saved answers</small></span>${I('arrow')}</a>`:''}</div>`
        : `<p class="sub">${joinedHere?`You joined PATHWAY in Grade ${g}. Your journey starts here.`:'Your earlier Pathway information stays with you.'}</p>`}
      </section>
    </div>`;
}
function gradePage(){
  return shell((u,initials,planTxt)=>{ const cur=gradeOf(u), open=VIEW.gfix;
    const chk = u.dob && VIEW.gsel ? dobCheck(u.dob, VIEW.gsel) : {level:'ok'};
    return `<div class="topbar"><div><div class="today">Account</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">My grade</h1></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>
      <section class="glass fsec2" style="max-width:760px;margin-top:22px">
        <p class="kicker2">Current grade</p><h2>Grade ${esc(cur)} · ${esc(GRADE_THEMES[cur].chapter)}</h2>
        ${!open?`<div class="gfixq"><b>Is your grade incorrect?</b><p>If you selected the wrong grade when creating your account, you can correct it here.</p><button class="btn btn-ghost" id="gfix">Correct my grade</button></div>`:`
        <div class="gfixq"><p>${I('info')} Changing your grade changes the information PATHWAY displays. Your existing results, assessments and Pathway DNA will not be deleted.</p>
          <fieldset class="pillset"><legend>My correct grade is</legend>${GRADE_ORDER.filter(g=>g!=='9'||cur==='9').map(g=>`<label class="pillopt"><input type="radio" name="gsel" value="${g}" ${(VIEW.gsel||cur)===g?'checked':''}><span>Grade ${g}</span></label>`).join('')}</fieldset>
          <div id="gwarn">${chk.level!=='ok'?dobWarnHTML(chk,VIEW.gsel):''}</div>
          <div class="actions"><button class="btn btn-ghost" id="gcancel">Cancel</button><button class="btn btn-purple" id="gsave" ${!VIEW.gsel||VIEW.gsel===cur?'disabled':''}>Save correction</button></div></div>`}
        ${cur!=='9'?`<details class="tsec" style="margin-top:16px"><summary>Need to start your Pathway from Grade 9? <span class="pm">${I('plus')}</span></summary><div class="tsb"><p>Only use this if you’re actually in Grade 9 — for example, if your account was set up in the wrong grade. Your existing results and targets are kept, but Pathway will show the Grade 9 journey.</p><label class="confirmline"><input type="checkbox" id="g9ok"> I’m in Grade 9 and want to start my Pathway there</label><button class="btn btn-ghost btn-sm" id="g9go" disabled>Start my Pathway from Grade 9</button></div></details>`:''}
      </section>`; });
}
gradePage.after = () => { const u=me(); if(!u) return;
  document.getElementById('gfix')?.addEventListener('click',()=>{ VIEW.gfix=true; render(); });
  document.getElementById('gcancel')?.addEventListener('click',()=>{ VIEW={}; render(); });
  document.querySelectorAll('[name="gsel"]').forEach(r=>r.addEventListener('change',()=>{ VIEW.gsel=r.value; render(); }));
  document.querySelectorAll('#gwarn [data-goto],#gwarn [data-focus-grade]').forEach(b=>b.addEventListener('click',()=>{ toast('Your date of birth is in your Profile — contact Support if it needs correcting.','info'); }));
  document.getElementById('gsave')?.addEventListener('click',()=>{ const g=VIEW.gsel, chk=u.dob?dobCheck(u.dob,g):{level:'ok'};
    if(chk.level==='block'){ toast('Please check your date of birth with Support before changing your grade.','info'); return; }
    if(chk.level==='confirm' && !document.getElementById('dobok')?.checked){ toast('Please confirm your date of birth and grade first.','info'); return; }
    changeGrade(u,g); VIEW={}; go('#/home'); toast(`Your grade has been corrected to Grade ${g}.`,'check'); });
  const ok=document.getElementById('g9ok'), go9=document.getElementById('g9go');
  ok?.addEventListener('change',()=>{ go9.disabled=!ok.checked; });
  go9?.addEventListener('click',()=>{ changeGrade(u,'9'); VIEW={}; go('#/home'); toast('Your Pathway now shows the Grade 9 journey. Nothing was deleted.','check'); });
};

/* ============================================================
   GRADES 10–12 — FET JOURNEYS (Connect · Polish · Complete)
   Everything below is shared by all Grade 10–12 learners (real and demo). Grade 9 is untouched.
   ============================================================ */
/* South Africa's 26 public universities (names and official websites). No admission data is invented:
   published requirements are added from each university's official prospectus (see ADMISSION_DATA). */
const UNIVERSITIES = [
  ['Cape Peninsula University of Technology','cput.ac.za'],['Central University of Technology','cut.ac.za'],['Durban University of Technology','dut.ac.za'],
  ['Mangosuthu University of Technology','mut.ac.za'],['Nelson Mandela University','mandela.ac.za'],['North-West University','nwu.ac.za'],['Rhodes University','ru.ac.za'],
  ['Sefako Makgatho Health Sciences University','smu.ac.za'],['Sol Plaatje University','spu.ac.za'],['Stellenbosch University','sun.ac.za'],['Tshwane University of Technology','tut.ac.za'],
  ['University of Cape Town','uct.ac.za'],['University of Fort Hare','ufh.ac.za'],['University of Johannesburg','uj.ac.za'],['University of KwaZulu-Natal','ukzn.ac.za'],
  ['University of Limpopo','ul.ac.za'],['University of Mpumalanga','ump.ac.za'],['University of Pretoria','up.ac.za'],['University of South Africa (UNISA)','unisa.ac.za'],
  ['University of the Free State','ufs.ac.za'],['University of the Western Cape','uwc.ac.za'],['University of the Witwatersrand','wits.ac.za'],['University of Venda','univen.ac.za'],
  ['University of Zululand','unizulu.ac.za'],['Vaal University of Technology','vut.ac.za'],['Walter Sisulu University','wsu.ac.za']
].map(([name,site])=>({name,site}));
/* Verified published requirements go here, e.g. {uni:'…', course:'…', year:2027, minAps:…, source:'official prospectus URL'}.
   Until an entry exists, learners can record the minimum APS they found in the official prospectus (clearly marked as entered by them). */
const ADMISSION_DATA = [];
const FET_MATHS = ['Mathematics','Mathematical Literacy','Technical Mathematics'];
const FET_ELECTIVES = ['Accounting','Agricultural Sciences','Business Studies','Civil Technology','Computer Applications Technology','Consumer Studies','Dance Studies','Design','Dramatic Arts','Economics','Electrical Technology','Engineering Graphics and Design','Geography','History','Hospitality Studies','Information Technology','Life Sciences','Mechanical Technology','Music','Physical Sciences','Religion Studies','Technical Sciences','Tourism','Visual Arts','Other elective'];
const FET_KEYS = ['hl','fal','maths','lo','e1','e2','e3'];
const APS_KEYS = ['hl','fal','maths','e1','e2','e3'];   /* Pathway's standard APS: achievement levels of six subjects, Life Orientation excluded */
const freshFet = () => ({subjects:{hl:'Home Language', fal:'First Additional Language', maths:'Mathematics', e1:'', e2:'', e3:''}, record:{}, uniTargets:[], courseTargets:[], favCareers:[], visited:{}, readiness:{}, applications:{}, deadlines:[], nextStep:{choice:'', checks:{}}});
const fetOf = u => { u.progress.fet = u.progress.fet || freshFet(); return u.progress.fet; };
const isFET = u => ['10','11','12'].includes(gradeOf(u));
const rk = (g,t) => `g${g}t${t}`;
const rkLabel = k => { const m=/g(\d+)t(\d)/.exec(k); return `Grade ${m[1]} Term ${m[2]}`; };
const rkParse = k => { const m=/g(\d+)t(\d)/.exec(k); return {g:+m[1], t:+m[2]}; };
const SA_LANGUAGES = ['Afrikaans','English','isiNdebele','isiXhosa','isiZulu','Sepedi','Sesotho','Setswana','siSwati','Tshivenda','Xitsonga','South African Sign Language'];
const langOf = (name, suffix) => { const n=String(name||'').replace(suffix,'').trim(); return SA_LANGUAGES.includes(n) ? n : ''; };
/* results form labels: "Home Language — isiZulu" */
const formLabel = (S,k) => k==='hl' ? `Home Language${langOf(S.hl,'Home Language')?' — '+langOf(S.hl,'Home Language'):''}` : k==='fal' ? `First Additional Language${langOf(S.fal,'First Additional Language')?' — '+langOf(S.fal,'First Additional Language'):''}` : subjName(S,k);
const subjName = (S,k) => ({hl:S.hl||'Home Language', fal:S.fal||'First Additional Language', maths:S.maths, lo:'Life Orientation', e1:S.e1||'Elective 1', e2:S.e2||'Elective 2', e3:S.e3||'Elective 3'})[k];

/* ---------- school-term logic (uses the official calendar) ---------- */
function lastCompletedTerm(d=today()){ const done=TERMS.filter(t=>d0(t.e)<d); return done.length ? {sameYear:true, n:done[done.length-1].n} : {sameYear:false, n:4}; }
function currentTermNo(d=today()){ const inT=TERMS.find(t=>d>=d0(t.s)&&d<=d0(t.e)); if(inT) return inT.n; const nx=TERMS.find(t=>d<d0(t.s)); return nx?nx.n:4; }
/* The first results request is fixed by the grade and term the learner SIGNED UP with:
   Term 1 → previous grade Term 4 · Term 2 → Term 1 · Term 3 → Term 2 · Term 4 → Term 3. It never changes afterwards. */
const firstKeyFor = (g,t) => t===1 ? rk(g-1,4) : rk(g,t-1);
/* the learner's current school term: the official calendar (holidays count as the term about to start); demo learners carry a simulated term */
const learnerTerm = u => u.sim?.term || currentTermNo();
function ensureFetStart(u){
  if(!isFET(u)) return null;
  if(!u.fetStart){ const t=learnerTerm(u); u.fetStart={grade:gradeOf(u), term:t, date:new Date().toISOString(), firstKey:firstKeyFor(+gradeOf(u),t)}; }
  return u.fetStart;
}
/* has this results period finished, relative to where the learner is now? */
function keyAvailable(u,k){ const {g,t}=rkParse(k), G=+gradeOf(u), C=learnerTerm(u); return g<G || (g===G && t<C); }
/* the learner's results timeline: from the first required report up to Term 4 of the current grade (plus anything already submitted) */
function timelineKeys(u){
  const first=rkParse(ensureFetStart(u).firstKey), G=+gradeOf(u), keys=[];
  for(let g=first.g; g<=G; g++) for(let t=(g===first.g?first.t:1); t<=4; t++) keys.push(rk(g,t));
  Object.keys(recOf(u)).forEach(k=>{ if(recOf(u)[k].approved && !keys.includes(k)) keys.push(k); });
  return keys.sort((a,b)=>{ const A=rkParse(a),B=rkParse(b); return A.g-B.g || A.t-B.t; });
}
/* the next report to ask for: the oldest finished period without submitted results (never a future one) */
function requiredResultKey(u){ const k=timelineKeys(u).find(k=>keyAvailable(u,k) && !recOf(u)[k]?.approved); return k || null; }
const firstKeyOf = u => ensureFetStart(u)?.firstKey;
function resultSlots(u){ return timelineKeys(u).map(k=>{ const {g,t}=rkParse(k); return {k, future:!keyAvailable(u,k), termInfo: termOf(t), g, t}; }); }
const recOf = u => fetOf(u).record;
const approvedKeys = u => Object.keys(recOf(u)).filter(k=>recOf(u)[k].approved).sort((a,b)=>{ const A=rkParse(a),B=rkParse(b); return A.g-B.g || A.t-B.t; });
const latestKey = u => { const a=approvedKeys(u); return a[a.length-1]||null; };
const needsResults = u => isFET(u) && !recOf(u)[firstKeyOf(u)]?.approved;   /* the first required report is still outstanding */
function apsOf(entry){ if(!entry) return null; return APS_KEYS.reduce((s,k)=>s+level(Number(entry.marks[k])||0),0); }
const apsSeries = u => approvedKeys(u).map(k=>({k, label:rkLabel(k), aps:apsOf(recOf(u)[k])}));
const currentAps = u => { const k=latestKey(u); return k ? apsOf(recOf(u)[k]) : null; };

/* ---------- journeys ---------- */
const FET_JOURNEYS = {
  10:{title:'CONNECT YOUR PATH', focus:'Explore → Understand → Choose → Build', steps:[
    ['results','My Previous Term Results','Start with where you are.'],
    ['careers','Explore Careers','Discover careers that connect with your interests and future.'],
    ['understand','Understand My Pathway','Understand the choices, requirements and opportunities ahead.'],
    ['targets','My Three Study Targets','Choose three study options you want to work towards.'],
    ['aps','My Projected APS','See where your current results put you on your pathway.'],
    ['progress','Track My Progress','Watch how your results and projected APS change over time.'],
    ['next10','My Next Steps','See what you should focus on next.']]},
  11:{title:'POLISH YOUR PATH', focus:'Refine → Prepare → Track → Get Application Ready', steps:[
    ['results','My Previous Term Results','Start with your latest results.'],
    ['careers','Explore Careers','Explore careers and refine where you want your pathway to lead.'],
    ['understand','Understand My Pathway','Build your knowledge of APS, requirements and applications.'],
    ['targets','My Three Study Targets','Choose or refine the three study options you’re working towards.'],
    ['aps','My Projected APS','See how your current results compare with your study targets.'],
    ['improve','Improve My Projected APS','Understand where improvement could strengthen your position.'],
    ['ready11','Application Ready','Start preparing for the university application process.']]},
  12:{title:'COMPLETE YOUR PATH', focus:'Finalise → Apply → Track → Transition', steps:[
    ['results','My Previous Term Results','Start with your latest results.'],
    ['careers','Explore Careers','Explore careers and confirm the direction you’re heading.'],
    ['understand','Understand My Pathway','Understand applications, admissions, funding and your next steps.'],
    ['targets','My Three Study Targets','Finalise the three study options you’re applying towards.'],
    ['aps12','My Projected APS','See how your current results position you for your study targets.'],
    ['appsdl','My Applications & Deadlines','Keep track of applications, requirements and important dates.'],
    ['next12','My Next Step','Know what comes next after your applications.']]}
};
const FET_STEP = {
  results:{ic:'upload', go:'#/aps'}, careers:{ic:'briefcase', go:'#/careers'}, understand:{ic:'book', go:'#/pathway-101'},
  targets:{ic:'target', go:'#/targets'}, aps:{ic:'chart', go:'#/aps'}, aps12:{ic:'chart', go:'#/aps'},
  progress:{ic:'trend', go:'#/progress'}, improve:{ic:'target', go:'#/aps/improve'}, next10:{ic:'star', go:'#/next'}, ready11:{ic:'file', go:'#/next'},
  appsdl:{ic:'calendar', go:'#/applications'}, next12:{ic:'star', go:'#/next'}
};
function fetStepStatus(u,id){
  const F=fetOf(u), first=firstKeyOf(u), req=requiredResultKey(u), hasFirst=!!F.record[first]?.approved, lock = !hasFirst && id!=='results' ? `Add your ${rkLabel(first)} results first.` : null;
  const aps=currentAps(u), ct=F.courseTargets, withMin=ct.filter(c=>targetAnalysis(u,c).min!=null);
  switch(id){
    case 'results': return {done:!req, text: !req ? `✓ ${rkLabel(latestKey(u)||first)} results` : `Upload your ${rkLabel(req)} results`};
    case 'careers': return {done:!!F.visited.careers, lock, text: F.visited.careers ? (F.favCareers.length?`${F.favCareers.length} career${F.favCareers.length===1?'':'s'} saved`:'Career Explorer visited') : 'Open Career Explorer'};
    case 'understand': return {done:!!F.visited.p101, lock, text: F.visited.p101 ? `${P101_TITLE[gradeOf(u)]} opened` : `Open ${P101_TITLE[gradeOf(u)]}`};
    case 'targets': return {done:ct.length>0, lock, text: ct.length?`${ct.length} of 3 Study Targets created`:'Create your first Study Target'};
    case 'unis': return {done:F.uniTargets.length===3, lock, text: F.uniTargets.length===3?'University targets complete':F.uniTargets.length?`${F.uniTargets.length} of 3 university targets selected`:'Choose your university targets'};
    case 'courses': return {done:ct.length===3, lock, text: ct.length===3?'Course targets complete':ct.length?`${ct.length} of 3 course targets selected`:'Choose your course targets'};
    case 'aps': case 'aps12': return {done:aps!=null && !!F.visited.aps, lock, text: aps!=null?`Projected APS: ${aps}`:'See your projected APS'};
    case 'progress': { const n=approvedKeys(u).length; return {done:n>=2, lock, text: n>=2?`${n} sets of results tracked`:'Add another term’s results to see your progress'}; }
    case 'improve': return {done:!!F.visited.improve && withMin.length>0, lock, text: withMin.length?'See where you can improve':'Add a course target with its minimum APS'};
    case 'next10': { const n=nextStepsItems(u).filter(x=>x.done).length, t=nextStepsItems(u).length; return {done:n===t, lock, text:`${n} of ${t} next steps done`}; }
    case 'ready11': { const r=readinessItems(u), n=r.filter(x=>x.done).length; return {done:n===r.length, lock, text:`${n} of ${r.length} readiness steps done`}; }
    case 'appsdl': { const n=ct.filter(c=>['Submitted','Provisional offer','Accepted','Waitlisted','Unsuccessful'].includes(F.applications[c.id]?.status)).length; return {done:ct.length>0 && n===ct.length && F.deadlines.length>0, lock, text: ct.length?`${n} of ${ct.length} applications submitted · ${F.deadlines.length} deadline${F.deadlines.length===1?'':'s'}`:'Add course targets to track applications'}; }
    case 'apps': { const n=ct.filter(c=>['Submitted','Provisional offer','Accepted','Waitlisted','Unsuccessful'].includes(F.applications[c.id]?.status)).length; return {done:ct.length>0 && n===ct.length, lock, text: ct.length?`${n} of ${ct.length} applications submitted`:'Add course targets to track applications'}; }
    case 'deadlines': return {done:F.deadlines.length>0, lock, text: F.deadlines.length?`${F.deadlines.length} deadline${F.deadlines.length===1?'':'s'} tracked`:'Add your application deadlines'};
    case 'next12': return {done:!!F.nextStep.choice, lock, text: F.nextStep.choice?`Plan: ${F.nextStep.choice}`:'Decide what comes next'};
  }
  return {};
}
const fetSteps = u => FET_JOURNEYS[gradeOf(u)].steps.map(([id,t,desc],i)=>({id, n:i+1, t, desc, ...FET_STEP[id], ...fetStepStatus(u,id)}));
function fetNextAction(u){
  const req=requiredResultKey(u);
  if(req) return {ic:'upload', t:`Upload your ${rkLabel(req)} results`, d: req===firstKeyOf(u) ? 'Let’s start by seeing where you are academically. Upload your report or type your marks in.' : `Term ${learnerTerm(u)} has started. Don’t forget to upload your Term ${rkParse(req).t} results.`, btn:'Add my results', go:`#/aps/add?k=${req}`};
  const steps=fetSteps(u), T=fetOf(u).courseTargets;
  for(const id of ['careers','understand']){ const s=steps.find(x=>x.id===id); if(s && !s.done) return {ic:s.ic, t:id==='careers'?'Explore Careers':'Understand your pathway with Pathway 101', d:s.desc, btn:'Continue', go:s.go}; }
  if(T.length<3){ const n=T.length; return {ic:'target', t:['Create your first Study Target','Add your second Study Target','Add your third Study Target'][n], d:'A Study Target is a university and a course you’re working towards. You can have up to three.', btn:'My Three Study Targets', go:'#/targets'}; }
  if(gradeOf(u)!=='10'){ const soon=fetOtherDates(u).find(x=>x.prio===0 && (x.date-today())/864e5<=30); if(soon) return {ic:'calendar', t:'Review your upcoming application deadlines', d:`${soon.title} — ${fmtShort(soon.date.toISOString().slice(0,10))}.`, btn:gradeOf(u)==='12'?'My applications & deadlines':'My Study Targets', go:gradeOf(u)==='12'?'#/applications':'#/targets'}; }
  if(T.some(c=>{ const A=targetAnalysis(u,c); return (A.min!=null&&A.score!=null&&A.score<A.min) || A.reqs.some(r=>r.status==='below'); })) return {ic:'trend', t:'Review where you could improve your results', d:'At least one Study Target is currently above your projected score or subject results.', btn:'See where to improve', go: gradeOf(u)==='11' ? '#/aps/improve' : '#/targets'};
  const s=steps.find(x=>!x.done && !['targets'].includes(x.id));
  if(!s && T.length===3) return {ic:'target', t:'Review your Study Target requirements', d:'Check each target’s subject requirements and dates.', btn:'My Three Study Targets', go:'#/targets'};
  if(!s){ const nt=resultSlots(u).find(x=>x.future); return {ic:'calendar', t:'You’re up to date', d: nt ? `Your ${rkLabel(nt.k)} results are next — Pathway will ask for them after Term ${nt.t} ends.` : 'Keep checking your targets and deadlines.', btn:'Review my APS', go:'#/aps'}; }
  const WN = {careers:'Explore Careers', understand:'Understand your pathway with Pathway 101', appsdl:'Prepare for applications', targets:'Create your first Study Target', unis:'Choose your university targets', courses:'Choose your course targets', aps:'Review your Projected APS', aps12:'Review your Projected APS', progress:'Review your progress', improve:'Improve your Projected APS', next10:'Plan your next steps', ready11:'Prepare for applications', apps:'Track your applications', deadlines:'Check your application deadlines', next12:'Decide your next step'};
  return {ic:s.ic, t:WN[s.id]||s.t, d:s.desc, btn:'Continue', go:s.go};
}

/* ---------- targets ---------- */
const targetMin = c => { const v=ADMISSION_DATA.find(a=>a.uni===c.uni && a.course.toLowerCase()===String(c.course).toLowerCase()); return v ? v.minAps : (c.minAps!=null && c.minAps!=='' ? Number(c.minAps) : null); };
const targetMinSource = c => ADMISSION_DATA.find(a=>a.uni===c.uni && a.course.toLowerCase()===String(c.course).toLowerCase()) ? 'published' : (c.minAps!=null && c.minAps!=='' ? 'learner' : null);
function standingText(aps, min){
  if(aps==null) return {cls:'mute', t:'Add your results to compare.'};
  if(min==null) return {cls:'mute', t:'Add the published minimum APS from the university’s prospectus to compare.'};
  return aps>=min ? {cls:'ok', t:'Your Projected APS meets the published minimum requirement.'} : {cls:'warn', t:`Your Projected APS is ${min-aps} point${min-aps===1?'':'s'} below the published minimum requirement.`};
}
const OTHER_REQS = 'Meeting a minimum APS doesn’t guarantee admission. Other requirements — such as specific subjects and marks, the NBT, a portfolio or limited places — may also apply.';

/* ---------- shared bits ---------- */
const fetTop = (u,initials,planTxt,kicker,title,sub) => `<div class="topbar"><div><div class="today">${kicker}</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">${title}</h1>${sub?`<p class="greet-sub">${sub}</p>`:''}</div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>`;
const lvChip = p => `<span class="lvc l${level(p)}">L${level(p)}</span>`;
function nextStepsItems(u){ const F=fetOf(u), m=F.readiness;
  return [
    {id:'res', t:'Your latest results are in Pathway', done:!needsResults(u), auto:true},
    {id:'exp', t:'Explore careers that interest you', done:!!F.visited.careers, auto:true},
    {id:'fav', t:'Save at least one career you’d like to learn more about', done:F.favCareers.length>0, auto:true},
    {id:'crs', t:'Create at least one Study Target', done:F.courseTargets.length>0, auto:true},
    {id:'req', t:'Check the subject requirements for your course targets', done:!!m.req},
    {id:'talk', t:'Talk to a teacher, counsellor or parent about your plans', done:!!m.talk}];
}
function readinessItems(u){ const F=fetOf(u), m=F.readiness, aps=currentAps(u);
  return [
    {id:'res', t:'Your latest results are in Pathway', done:!needsResults(u), auto:true},
    {id:'crs', t:'Study Targets chosen', done:F.courseTargets.length>0, auto:true},
    {id:'min', t:'Published minimum APS recorded for your Study Targets', done:F.courseTargets.length>0 && F.courseTargets.every(c=>targetAnalysis(u,c).min!=null), auto:true},
    {id:'req', t:'Subject requirements checked for each Study Target', done:!!m.req},
    {id:'nbt', t:'Checked whether your courses need the NBT', done:!!m.nbt},
    {id:'dates', t:'Know when applications open at your target universities', done:!!m.dates},
    {id:'docs', t:'Documents ready (ID copy and latest results)', done:!!m.docs},
    {id:'fund', t:'Researched funding options (bursaries, NSFAS, scholarships)', done:!!m.fund}];
}
const checklistHTML = items => `<ul class="checklist">${items.map(x=>`<li class="inner ${x.done?'done':''}">${x.auto?`<span class="ckbox auto">${x.done?I('check'):''}</span>`:`<button class="ckbox" data-ck="${x.id}" aria-pressed="${x.done}" aria-label="${esc(x.t)}">${x.done?I('check'):''}</button>`}<span>${esc(x.t)}${x.auto?'<small>Updates automatically</small>':''}</span></li>`).join('')}</ul>`;
const bindChecklist = () => document.querySelectorAll('[data-ck]').forEach(b=>b.addEventListener('click',()=>{ const F=fetOf(me()); F.readiness[b.dataset.ck]=!F.readiness[b.dataset.ck]; save(); render(); }));

/* ---------- dashboard ---------- */
function fetTermBlocks(u){
  const C=learnerTerm(u), cur=termOf(C), nxt=termOf(C+1);
  const blk=(lab,t)=>`<div class="inner termblk"><small>${lab}</small><b>Term ${t.n}</b><div><span>Starts</span><em>${fmtShort(t.s)}</em></div><div><span>Ends</span><em>${fmtShort(t.e)}</em></div></div>`;
  return `<div class="termblks">${blk('Current term',cur)}${nxt?blk('Next term',nxt):`<div class="inner termblk"><small>Next term</small><b>Next school year</b><p class="hint">Dates appear once the next official calendar is added.</p></div>`}</div>`;
}
function fetOtherDates(u){ const t=today(), out=[], g=gradeOf(u), tUnis=fetOf(u).courseTargets.map(c=>c.uni);
  /* Grade 10: no application dates. Grades 11–12: the application cycle, prioritising the learner's target universities */
  if(g!=='10'){
    const T=fetOf(u).courseTargets;
    APPLICATION_DATES.forEach(x=>{ const d=d0(x.date); if(d<t) return; if(!tUnis.includes(x.uni)) return; if(g==='11' && x.kind==='funding') return;
      if(x.courses && !T.some(c=>c.uni===x.uni && x.courses.some(p=>(c.course+' '+(c.faculty||'')).includes(p)))) return;
      if(x.faculties && !T.some(c=>c.uni===x.uni && x.faculties.includes(c.faculty))) return;   /* programme-specific dates only for matching targets */
      out.push({date:d, title:`${x.abbr}: ${x.title}`, sub: g==='11' ? `Current ${uniById(x.uniId).dataYear}-intake cycle — for awareness` : 'One of your Study Targets', prio:0}); });
  }
  if(g==='12') (fetOf(u).deadlines||[]).forEach(x=>{ const d=d0(x.date); if(d>=t) out.push({date:d, title:x.title||x.type, sub:`${x.type}${x.uni?' · '+x.uni:''}`, prio: x.uni&&tUnis.includes(x.uni)?0:1}); });
  Object.values(DATE_SOURCES).flat().forEach(x=>{ const d=d0(x.date); if(d>=t && (!x.grades || x.grades.includes(g))) out.push({date:d, title:x.title, sub:x.sub||'', prio:2}); });
  return out.sort((a,b)=>a.prio-b.prio || a.date-b.date).slice(0,4);
}
function fetDateItems(u){
  const C=learnerTerm(u), cur=termOf(C), nxt=termOf(C+1), out=[];
  out.push({date:d0(cur.s), title:`Term ${cur.n} starts`, sub:'Current term · school opens', icon:'calendar'});
  out.push({date:d0(cur.e), title:`Term ${cur.n} ends`, sub:'Current term · last school day', icon:'calendar'});
  if(nxt){ const hs=d0(cur.e); hs.setDate(hs.getDate()+1); const he=d0(nxt.s); he.setDate(he.getDate()-1);
    out.push({date:hs, title:'School holidays', sub:`Until ${he.getDate()} ${MON[he.getMonth()]}`, icon:'sun'});
    out.push({date:d0(nxt.s), title:`Term ${nxt.n} starts`, sub:'Next term · school opens', icon:'calendar'}); out.push({date:d0(nxt.e), title:`Term ${nxt.n} ends`, sub:'Next term · last school day', icon:'calendar'}); }
  /* Pathway milestone: when the next report becomes due */
  const nk=resultSlots(u).find(x=>x.future); if(nk && !needsResults(u)) out.push({date:d0(nk.termInfo.e), title:`${rkLabel(nk.k)} results due`, sub:'Pathway will ask for your report', icon:'upload', gold:true});
  fetOtherDates(u).forEach(x=>out.push({...x, icon:'star', gold:true}));
  return out.sort((a,b)=>a.date-b.date);
}
function fetDatesHTML(u){
  const list=fetDateItems(u);
  return `<ul class="dlist">${list.map(x=>`<li><div class="dbox inner"><b>${String(x.date.getDate()).padStart(2,'0')}</b><span>${MON[x.date.getMonth()]}</span></div><div class="ditem inner"><span class="dt ${x.gold?'gold':'purple'}"></span><div><b>${I(x.icon)} ${esc(x.title)}</b><small>${esc(x.sub)}</small></div></div></li>`).join('')}</ul>`
   + (gradeOf(u)!=='10' && !APPLICATION_DATES.length ? `<p class="hint" style="margin-top:10px">${I('info')} University application dates will appear here once published dates are added${gradeOf(u)==='12'?' — you can add your own in My Applications &amp; Deadlines':''}.</p>`:'')
   + (gradeOf(u)==='12'?`<a class="link" href="#/applications" style="display:inline-block;margin-top:10px">My applications &amp; deadlines →</a>`:'')
   + (gradeOf(u)!=='12' || !fetOtherDates(u).length ? '' : '');
}
function fetHome(u){
  const steps=fetSteps(u), N=steps.length, curI=Math.max(0,steps.findIndex(s=>!s.done && !s.lock)), doneN=steps.filter(s=>s.done).length;
  const allDone = doneN===N;
  const html = steps.map((s,i)=>{ const st = s.done ? 'done' : (!allDone && i===curI) ? 'current' : s.lock ? 'locked' : 'upcoming';
    const attrs = st==='locked' ? `data-act="soon" data-msg="${esc(s.lock)}" aria-disabled="true"` : `data-go="${s.go}"`;
    const aria = `${s.t}. ${st==='done'?'Completed':st==='current'?'Current step':st==='locked'?'Locked. '+s.lock:'Available'}`;
    return `<li class="step ${st}"><button ${attrs} aria-label="${esc(aria)}"><span class="node">${I(st==='done'?'check':st==='locked'?'lock':s.ic)}</span><span class="num">${i+1}</span><span class="txt"><span class="tt">${esc(s.t)}</span><span class="dd">${esc(s.desc)}</span>${st==='done'||st==='current'?`<span class="stepnote">${esc(s.text)}</span>`:''}</span></button></li>`; }).join('');
  const lockedN = steps.filter(s=>s.lock).length;
  const na=fetNextAction(u), first=needsResults(u)?firstKeyOf(u):null;
  const nextBody = first
    ? `<div><h3>Upload your ${rkLabel(first)} results</h3><p>Let’s start by seeing where you are academically. Pathway uses your report to work out your Projected APS and build your ${esc(FET_JOURNEYS[gradeOf(u)].title.toLowerCase())} journey.</p>
        <div class="actions"><a class="btn btn-purple" href="#/aps/add?k=${first}&m=upload">${I('upload')} Upload Report</a><a class="btn btn-ghost" href="#/aps/add?k=${first}&m=manual">Enter Results Manually</a></div></div>`
    : `<div><h3>${esc(na.t)}</h3><p>${esc(na.d)}</p><a class="btn btn-purple" href="${na.go}">${esc(na.btn)} ${ARROW}</a></div>`;
  return `
    <section class="glass panel" aria-labelledby="jh">
      <div class="panel-h"><h2 id="jh">My Journey <span class="jtitle">${esc(FET_JOURNEYS[gradeOf(u)].title)}</span></h2><span class="meta">${allDone?'All steps complete':`Step ${curI+1} of ${N}`} · ${doneN} completed</span></div>
      <div class="journey-scroll"><ol class="steps" style="--n:${N}"><span class="track"></span><span class="fill" style="width:calc((100% - 100% / ${N}) * ${Math.min(allDone?N-1:curI,N-1)/(N-1)})"></span>${html}</ol></div>${lockedN?`<p class="jlocknote">${I('lock')} Steps 2–${N} open once your ${esc(rkLabel(firstKeyOf(u)))} results are in.</p>`:''}
    </section>
    <div class="lower">
      <section class="glass next" aria-labelledby="nh"><h2 id="nh" style="font-size:clamp(1.7rem,2.4vw,2.2rem)">What's Next?</h2><div class="next-body inner"><div class="next-ic">${I(first?'upload':na.ic)}</div>${nextBody}</div></section>
      <div class="rightcol"><section class="glass dates" aria-labelledby="dh"><div class="panel-h"><h2 id="dh">Upcoming Dates</h2></div><p class="sub">Your school terms${gradeOf(u)==='12'?' and application deadlines':''}</p>${fetDatesHTML(u)}</section>${subscriptionCard(u)}</div>
    </div>`;
}
/* ---------- My Journey roadmap ---------- */
function journeyPage(){
  return shell((u,initials,planTxt)=>{ const steps=fetSteps(u), cur=steps.find(s=>!s.done);
    return fetTop(u,initials,planTxt,`Grade ${esc(u.grade)} · My Journey`, FET_JOURNEYS[gradeOf(u)].title, 'Your roadmap for this year. Tap any stage to open it.') + `
      <div class="roadmap glass"><svg class="road" viewBox="0 0 100 800" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 C 90 100, 10 200, 50 300 S 90 500, 50 600 S 10 750, 50 800" /></svg>
        <ol class="rstops">${steps.map((s,i)=>`<li class="${i%2?'r':'l'} ${s.done?'done':''} ${s===cur?'current':''} ${s.lock?'locked':''}"><a class="glass rstop" href="${s.lock?'#/journey':s.go}"><span class="rnum">${s.done?I('check'):s.n}</span><div><b>${esc(s.t)}</b><small>${esc(s.lock||s.text)}</small></div></a></li>`).join('')}</ol></div>`; });
}

/* ---------- Explore My Path (gateway) ---------- */
function explorePathPage(){
  return shell((u,initials,planTxt)=>fetTop(u,initials,planTxt,'My Journey · Step 2','Explore My Path','Discover careers and understand what it takes to reach them. Both are always in your sidebar too.') + `
    <div class="exgrid2"><a class="glass excard2" href="#/careers"><span class="pub-ic">${I('briefcase')}</span><h2>Career Explorer</h2><p>Search careers, save the ones you like, compare them and connect a career to your course targets.</p><span class="link">Open Career Explorer →</span></a>
    <a class="glass excard2" href="#/pathway-101"><span class="pub-ic">${I('book')}</span><h2>${esc(P101_TITLE[gradeOf(u)]||'Pathway 101')}</h2><p>${esc(P101_PURPOSE[gradeOf(u)]||'')}</p><span class="link">Open Pathway 101 →</span></a></div>`);
}

/* ---------- My Results & APS ---------- */
function apsPage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), req=requiredResultKey(u), aps=currentAps(u), slots=resultSlots(u), lk=latestKey(u); if(aps!=null && !F.visited.aps){ F.visited.aps=true; save(); }
    const byGrade = {}; slots.forEach(x=>{ (byGrade[x.g]=byGrade[x.g]||[]).push(x); });
    const G=+gradeOf(u);
    const rows = Object.keys(byGrade).sort((a,b)=>b-a).map(g=>`<li class="tlgroup"><details ${+g===G?'open':''}><summary class="tlgrade">Grade ${g}${+g===G?' · current grade':' · earlier results'}</summary><ol class="rslist tline">` + byGrade[g].map(s=>{ const r=F.record[s.k], isReq=s.k===req;
      const chip = r?.approved?`<span class="schip ok">${I('lock')} Submitted &amp; locked</span>` : s.future?'<span class="schip mute">Upcoming</span>' : '<span class="schip warn">Ready to add</span>';
      const sub = r?.approved ? `Submitted · Projected APS: ${apsOf(r)}` : s.future ? `Expected after Term ${s.t} ends (${fmtShort(s.termInfo.e)}) — you can add it now if you already have it` : (s.k===firstKeyOf(u)?'Your first required report':'Results are ready to add');
      const act = r?.approved?`<a class="btn btn-ghost btn-sm" href="#/aps/add?k=${s.k}">View</a>` : `<a class="btn ${isReq?'btn-purple':'btn-ghost'} btn-sm" href="#/aps/add?k=${s.k}">${I('plus')} Add results</a>`;
      return `<li class="rsrow glass tl ${r?.approved?'confirmed':s.future?'locked':'due'}"><span class="tldot">${r?.approved?I('check'):s.future?'':I('upload')}</span><div class="rstxt"><h3>Term ${s.t}</h3><span class="termline">${esc(sub)}</span></div>${chip}<div class="mact">${act}</div></li>`; }).join('')+'</ol></details></li>').join('');
    const latest = lk ? F.record[lk] : null;
    const justP = F.justResults ? nextPanel(`Your ${rkLabel(F.justResults)} results have been updated.`, [['Review your Projected APS','#/aps'],['Review your Study Targets','#/targets'],['Check requirements you still need to meet','#/aps/improve']]) : '';
    if(F.justResults){ F.justResults=null; save(); }
    return justP + fetTop(u,initials,planTxt,`Grade ${esc(u.grade)}`,'My Results &amp; Projected APS','Your academic record, term by term. Add each report when you get it — nothing is ever replaced.') + `
      ${aps!=null?`<section class="glass apshero"><div class="apsbig">${aps}</div><div><h2>Your projected APS</h2><p>Worked out from your latest results (${esc(rkLabel(lk))}) using Pathway’s standard method: the achievement levels (1–7) of your six subjects, not counting Life Orientation.</p><p class="hint">${I('info')} ${PROJ_NOTE}</p><p><b>Projected vs final APS:</b> while you’re still at school, this is a projection based on your latest results. Your final (official) APS is calculated by each university from your final results — your final Grade 12 (NSC) results, and for early decisions often your final Grade 11 results.</p><p class="hint">${I('info')} Each university calculates APS in its own way (some count Life Orientation differently or use other scales). Always check each university’s own method.</p></div></section>
      <section class="glass fsec2"><div class="jhead"><h2>${esc(rkLabel(lk))} results</h2><a class="link" href="#/progress">Track My Progress →</a></div><div class="srows">${FET_KEYS.map(k=>`<div class="srow2"><b>${esc(subjName(latest.subjects,k))}${k==='lo'?' <small class="hint">(not in APS)</small>':''}</b><span class="tbar ${level(latest.marks[k])>=5?'ok':level(latest.marks[k])>=4?'blue':'warn'}"><i style="width:${latest.marks[k]}%"></i></span><span class="lv">${latest.marks[k]}% · Level ${level(latest.marks[k])}</span><span></span></div>`).join('')}</div></section>`:''}
      <h2 class="exh">Academic results</h2><p class="hint">You can add any term’s results whenever you have them — Pathway reminds you when a new term starts. Submitted results are locked and stay in your history.</p><ol class="rslist tline">${rows}</ol>
      ${aps!=null?`<div class="actions"><a class="btn btn-purple" href="#/aps/improve">Improve My Projected APS ${ARROW}</a><a class="btn btn-ghost" href="#/what-if?ctx=results">What If? ${ARROW}</a></div>`:''}
      ${overallPerformance(u)}${matricHTML(u)}`; });
}
function apsAdd(){
  const u=me(), F=fetOf(u), qs=new URLSearchParams(location.hash.split('?')[1]||''), k=qs.get('k')||requiredResultKey(u)||firstKeyOf(u), r=F.record[k];
  const top=focusTop(`${rkLabel(k)} results`,'Back','#/aps');
  if(r?.approved) return top + `<div class="focus-wrap"><div class="glass qcard"><div class="kicker2">${I('lock')} Confirmed and locked</div><h1>${rkLabel(k)} results</h1><p class="qhint">Confirmed ${fmtLong(new Date(r.approvedAt))}${r.source==='upload'?' from your uploaded report':''}. Confirmed results are part of your permanent record and can’t be changed.</p><p class="hint">${I('info')} Something wrong on a submitted result? <a class="link" href="#/help/support">Contact Support</a> and we’ll help you correct it.</p>
    <div class="src-table"><table><tr><th>Subject</th><th>Mark</th><th>Level</th></tr>${FET_KEYS.map(x=>`<tr><th>${esc(subjName(r.subjects,x))}</th><td>${r.marks[x]}%</td><td>Level ${level(r.marks[x])}</td></tr>`).join('')}</table></div><p style="margin-top:14px"><b>Projected APS for this term: ${apsOf(r)}</b></p></div></div>`;
  const method = VIEW.method || qs.get('m') || (r?.draft?.source) || '';
  if(!method) return top + `<div class="focus-wrap"><div class="glass qcard"><div class="kicker2">Add your results</div><h1>${rkLabel(k)} results</h1><p class="qhint">How would you like to add them?</p>
    <div class="obopts"><button class="inner obopt" data-method="upload"><span class="pub-ic">${I('upload')}</span><b>Upload or photograph your report</b><small>Then check the marks</small></button><button class="inner obopt" data-method="manual"><span class="pub-ic">${I('file')}</span><b>Enter your results manually</b><small>Type in each subject’s mark</small></button></div></div></div>`;
  const d = r?.draft || {subjects:{...F.subjects}, marks:{}, source:method};
  if(VIEW.review) return top + `<div class="focus-wrap"><div class="glass qcard"><div class="kicker2">Step 2 of 2 · Review</div><h1>Check your ${rkLabel(k)} results</h1>
    <div class="src-table"><table><tr><th>Subject</th><th>Mark</th><th>Level</th></tr>${FET_KEYS.map(x=>`<tr><th>${esc(subjName(d.subjects,x))}</th><td>${d.marks[x]}%</td><td>Level ${level(d.marks[x])}</td></tr>`).join('')}</table></div>
    <p style="margin-top:12px"><b>Projected APS for these results: ${apsOf(d)}</b> <span class="hint">(six subjects, Life Orientation not counted)</span></p>
    <div class="warnnote">${I('lock')}<span><b>Once you confirm, these results become part of your permanent academic record</b> and can’t be changed. Pathway will update your Projected APS and progress.</span></div>
    <div class="qnav"><button class="btn btn-ghost" id="edit">${I('back')} Edit</button><button class="btn btn-gold" id="confirm">Confirm results ${ARROW}</button></div></div></div>`;
  const opt = (sel, list) => list.map(x=>`<option ${x===sel?'selected':''}>${esc(x)}</option>`).join('');
  return top + `<div class="focus-wrap"><div class="glass qcard"><div class="kicker2">Step 1 of 2 · ${method==='upload'?'Upload your report':'Enter your results'}</div><h1>${rkLabel(k)} results</h1>
    ${method==='upload'?`<label class="drop" id="drop">${I('upload')}<span><b id="fname">${d.file?esc(d.file):'Upload or photograph your report'}</b><small>PDF, JPG or PNG, up to 10 MB</small></span><input type="file" id="file" accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf" capture="environment" class="sr"></label>
      <div id="preview" class="rpreview"></div>
      <div class="infonote inner">${I('info')}<span>Automatic reading of reports isn’t switched on in this prototype yet. Check your report and type the marks below — you’ll review everything before saving.</span></div>`:''}
    <form id="f" novalidate>
      <h4 class="fh">Your subjects</h4>
      <div class="subjset">
        <label>Home Language<select class="input" id="s-hl"><option value="">Select language…</option>${SA_LANGUAGES.map(l=>`<option ${langOf(d.subjects.hl,'Home Language')===l?'selected':''}>${l}</option>`).join('')}</select></label>
        <label>First Additional Language<select class="input" id="s-fal"><option value="">Select language…</option>${SA_LANGUAGES.map(l=>`<option ${langOf(d.subjects.fal,'First Additional Language')===l?'selected':''}>${l}</option>`).join('')}</select></label>
        <fieldset class="mathpick wide"><legend>Mathematics subject</legend>${FET_MATHS.map(m=>`<label class="mradio"><input type="radio" name="s-maths" value="${m}" ${d.subjects.maths===m?'checked':''}> ${m}</label>`).join('')}</fieldset>
        ${['e1','e2','e3'].map((e,i)=>`<label>Elective ${i+1}<select class="input" id="s-${e}"><option value="">Choose…</option>${opt(d.subjects[e],FET_ELECTIVES)}</select></label>`).join('')}
      </div>
      <h4 class="fh">Your marks (%)</h4>
      <div class="marks">${FET_KEYS.map(x=>{ const v=d.marks[x]??''; return `<div class="mrow inner"><label for="m-${x}" id="lab-${x}">${esc(formLabel(d.subjects,x))}</label><div class="pct"><input class="input" id="m-${x}" data-m="${x}" inputmode="numeric" maxlength="3" placeholder="—" value="${esc(v)}"></div><span class="lvl ${v!==''?'on':''}" id="l-${x}">${v!==''?'Level '+level(+v):'Level –'}</span></div>`; }).join('')}</div>
      <div class="err" id="marks-e" style="margin-top:10px"></div>
      <div class="qnav"><button type="button" class="btn btn-ghost" id="chg">${I('back')} Change method</button><button class="btn btn-purple" type="submit">Review results ${ARROW}</button></div>
    </form></div></div>`;
}
apsAdd.after = () => {
  const u=me(), F=fetOf(u), qs=new URLSearchParams(location.hash.split('?')[1]||''), k=qs.get('k')||requiredResultKey(u)||firstKeyOf(u);
  document.querySelectorAll('[data-method]').forEach(b=>b.addEventListener('click',()=>{ VIEW.method=b.dataset.method; render(); }));
  document.getElementById('chg')?.addEventListener('click',()=>{ VIEW={method:''}; if(F.record[k]?.draft) delete F.record[k].draft.source; history.replaceState(null,'',`#/aps/add?k=${k}`); render(); });
  let file=F.record[k]?.draft?.file||null;
  const fi=document.getElementById('file');
  if(fi) fi.addEventListener('change',()=>{ const f=fi.files[0]; if(!f) return; if(f.size>10*1024*1024){ toast('That file is larger than 10 MB.','file'); return; } file=f.name; document.getElementById('fname').textContent=f.name;
    if(f.type.startsWith('image/')){ const url=URL.createObjectURL(f); document.getElementById('preview').innerHTML=`<img src="${url}" alt="Your uploaded report">`; } else document.getElementById('preview').innerHTML=`<p class="hint">${I('file')} ${esc(f.name)} attached — open it alongside to copy your marks.</p>`; });
  const curS = () => ({hl:document.getElementById('s-hl')?.value?`${document.getElementById('s-hl').value} Home Language`:'', fal:document.getElementById('s-fal')?.value?`${document.getElementById('s-fal').value} First Additional Language`:'', maths:document.querySelector('[name="s-maths"]:checked')?.value||'Mathematics', e1:document.getElementById('s-e1')?.value, e2:document.getElementById('s-e2')?.value, e3:document.getElementById('s-e3')?.value});
  ['e1','e2','e3','hl','fal'].forEach(x=>document.getElementById('s-'+x)?.addEventListener('input',()=>{ const S=curS(); FET_KEYS.forEach(k=>{ const l=document.getElementById('lab-'+k); if(l) l.textContent=formLabel(S,k); }); }));
  document.querySelectorAll('[name="s-maths"]').forEach(r=>r.addEventListener('change',()=>{ const l=document.getElementById('lab-maths'); if(l) l.textContent=formLabel(curS(),'maths'); }));
  document.querySelectorAll('[data-m]').forEach(inp=>inp.addEventListener('input',()=>{ inp.value=inp.value.replace(/\D/g,'').slice(0,3); const l=document.getElementById('l-'+inp.dataset.m), v=inp.value, ok=v!==''&&+v<=100; l.textContent=ok?'Level '+level(+v):'Level –'; l.classList.toggle('on',ok); }));
  document.getElementById('f')?.addEventListener('submit',e=>{ e.preventDefault();
    const S=curS();
    const er=document.getElementById('marks-e');
    if(!S.hl||!S.fal){ er.textContent='Select your Home Language and First Additional Language.'; return; }
    if(!document.querySelector('[name="s-maths"]:checked')){ er.textContent='Choose which Mathematics subject you take.'; return; }
    if(!S.e1||!S.e2||!S.e3){ er.textContent='Choose your three elective subjects.'; return; }
    if(new Set([S.e1,S.e2,S.e3]).size<3 && ![S.e1,S.e2,S.e3].includes('Other elective')){ er.textContent='Each elective should be a different subject.'; return; }
    const marks={}, missing=[];
    document.querySelectorAll('[data-m]').forEach(inp=>{ const v=inp.value; if(v===''||+v>100) missing.push(subjName(S,inp.dataset.m)); else marks[inp.dataset.m]=+v; });
    if(missing.length){ er.textContent=`Add a percentage (0–100) for: ${missing.join(', ')}.`; return; }
    F.record[k]={...(F.record[k]||{}), draft:{subjects:S, marks, file, source:VIEW.method||qs.get('m')||'manual', savedAt:Date.now()}}; save(); VIEW={review:true, method:VIEW.method}; render(); window.scrollTo(0,0); });
  document.getElementById('edit')?.addEventListener('click',()=>{ VIEW={method:F.record[k].draft.source}; render(); });
  document.getElementById('confirm')?.addEventListener('click',()=>{ const d=F.record[k].draft, before=targetSnapshot(u);
    F.record[k]={grade:rkParse(k).g, term:rkParse(k).t, subjects:d.subjects, marks:d.marks, file:d.file||null, source:d.source, approved:true, locked:true, savedAt:d.savedAt, approvedAt:Date.now()};
    F.subjects={...d.subjects}; const wasFirst = k===firstKeyOf(u); notifyResults(u,k,before); if(!wasFirst) F.justResults=k; save(); VIEW={}; go(wasFirst?'#/home':'#/aps'); toast(`${rkLabel(k)} results submitted. Your Projected APS is ${apsOf(F.record[k])}.`,'check'); });
};

/* ---------- targets ---------- */
function uniTargetsPage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), q=(VIEW.uq||'').toLowerCase(), full=F.uniTargets.length>=3;
    const list=UNIVERSITIES.filter(x=>!q || x.name.toLowerCase().includes(q));
    return fetTop(u,initials,planTxt,'My targets','My University Targets','Choose up to three universities you’re aiming for. These are targets, not applications — you can change them anytime.') + `
      <section class="glass fsec2"><div class="jhead"><h2>Your targets <small class="qcnt">${F.uniTargets.length} of 3</small></h2></div>
        ${F.uniTargets.length?`<ol class="tlist">${F.uniTargets.map((n,i)=>`<li class="inner"><span class="tnum">${i+1}</span><b>${esc(n)}</b><span class="tact">${i?`<button class="ob" data-up="${i}" aria-label="Move up">${I('down','up')}</button>`:''}<button class="btn btn-ghost btn-sm" data-rm="${i}">Remove</button></span></li>`).join('')}</ol>`:'<p class="hint">No university targets yet.</p>'}</section>
      <section class="glass fsec2" style="margin-top:14px"><h2>South Africa’s public universities</h2>
        <div class="fsearch" style="max-width:520px;margin:10px 0 14px">${I('search')}<label class="sr" for="uq">Search universities</label><input id="uq" type="search" placeholder="Search universities…" value="${esc(VIEW.uq||'')}"></div>
        ${full?`<p class="hint">${I('info')} You have three targets. Remove one to choose another.</p>`:''}
        <div class="unigrid">${list.map(x=>{ const on=F.uniTargets.includes(x.name); return `<div class="inner unic ${on?'on':''}"><b>${esc(x.name)}</b><small>${esc(x.site)}</small><button class="btn ${on?'btn-ghost':'btn-purple'} btn-sm" data-uni="${esc(x.name)}" ${!on&&full?'disabled':''}>${on?'✓ Target':'Add target'}</button></div>`; }).join('')}</div></section>`; });
}
uniTargetsPage.after = () => { const F=fetOf(me());
  const q=document.getElementById('uq'); if(q) q.addEventListener('input',()=>{ VIEW.uq=q.value; const p=q.selectionStart; render(); const n=document.getElementById('uq'); n.focus(); n.setSelectionRange(p,p); });
  document.querySelectorAll('[data-uni]').forEach(b=>b.addEventListener('click',()=>{ const n=b.dataset.uni, i=F.uniTargets.indexOf(n); if(i>=0) F.uniTargets.splice(i,1); else if(F.uniTargets.length<3) F.uniTargets.push(n); save(); render(); }));
  document.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',()=>{ F.uniTargets.splice(+b.dataset.rm,1); save(); render(); }));
  document.querySelectorAll('[data-up]').forEach(b=>b.addEventListener('click',()=>{ const i=+b.dataset.up; [F.uniTargets[i-1],F.uniTargets[i]]=[F.uniTargets[i],F.uniTargets[i-1]]; save(); render(); }));
};
function chainHTML(u,c){ const aps=currentAps(u), min=targetMin(c), st=standingText(aps,min), src=targetMinSource(c);
  return `<div class="chain">
    <div class="ch"><small>Career</small><b>${c.career?esc(c.career):'—'}</b></div>${I('arrow')}
    <div class="ch"><small>Course</small><b>${esc(c.course)}</b></div>${I('arrow')}
    <div class="ch"><small>University</small><b>${esc(c.uni)}</b></div>${I('arrow')}
    <div class="ch"><small>Published minimum APS</small><b>${min!=null?min:'Not added'}</b>${src==='learner'?'<em>entered by you from the prospectus</em>':src==='published'?'<em>verified published requirement</em>':''}</div>${I('arrow')}
    <div class="ch"><small>Projected APS</small><b>${aps!=null?aps:'—'}</b></div></div>
    <p class="standing ${st.cls}">${st.cls==='ok'?I('check'):st.cls==='warn'?I('trend'):I('info')} ${esc(st.t)}</p>${c.reqs?`<p class="hint">Other requirements you noted: ${esc(c.reqs)}</p>`:''}`;
}
function courseTargetsPage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), qs=new URLSearchParams(location.hash.split('?')[1]||''), preCareer=qs.get('career')||'', full=F.courseTargets.length>=3, ed=VIEW.edit?F.courseTargets.find(c=>c.id===VIEW.edit):null;
    const uniOpts = [...F.uniTargets, ...UNIVERSITIES.map(x=>x.name).filter(n=>!F.uniTargets.includes(n))];
    const form = (full && !ed) ? `<p class="hint">${I('info')} You have three course targets — the maximum. Edit or remove one to add another.</p>` : `<form id="cf" class="glass cform" novalidate><h2>${ed?'Edit course target':'Add a course target'}</h2>
      <div class="subjset">
        <label>University<select class="input" id="c-uni"><option value="">Choose a university…</option>${F.uniTargets.length?`<optgroup label="Your university targets">${F.uniTargets.map(n=>`<option ${ed?.uni===n?'selected':''}>${esc(n)}</option>`).join('')}</optgroup>`:''}<optgroup label="All public universities">${UNIVERSITIES.map(x=>x.name).filter(n=>!F.uniTargets.includes(n)).map(n=>`<option ${ed?.uni===n?'selected':''}>${esc(n)}</option>`).join('')}</optgroup></select></label>
        <label>Course or qualification<input class="input" id="c-course" maxlength="80" placeholder="e.g. BCom Accounting" value="${esc(ed?.course||'')}"></label>
        <label>Career it connects to (optional)<select class="input" id="c-career"><option value="">None yet</option>${CAREERS.map(x=>`<option ${(ed?.career||preCareer)===x.name?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>
        <label>Published minimum APS (optional)<input class="input" id="c-min" inputmode="numeric" maxlength="2" placeholder="From the official prospectus" value="${esc(ed?.minAps??'')}"></label>
        <label class="wide">Other requirements (optional)<input class="input" id="c-reqs" maxlength="160" placeholder="e.g. Mathematics Level 5, Physical Sciences Level 4, NBT" value="${esc(ed?.reqs||'')}"></label>
      </div><p class="hint">${I('info')} Use the minimum APS published in the university’s official prospectus for the year you’ll apply. Requirements change, so check each year.</p>
      <div class="err" id="cf-e"></div><div class="actions">${ed?'<button type="button" class="btn btn-ghost" id="cancel">Cancel</button>':''}<button class="btn btn-purple" type="submit">${ed?'Save changes':'Add course target'} ${ARROW}</button></div></form>`;
    return fetTop(u,initials,planTxt,'My targets','My Course Targets','Choose up to three courses. They can be at different universities or at the same one.') + `
      <section class="glass fsec2"><div class="jhead"><h2>Your course targets <small class="qcnt">${F.courseTargets.length} of 3</small></h2></div>
        ${F.courseTargets.length?F.courseTargets.map((c,i)=>`<div class="inner ctarget"><div class="ctop"><span class="tnum">${i+1}</span><b>${esc(c.course)}</b><span class="tact"><button class="btn btn-ghost btn-sm" data-edit="${c.id}">Edit</button><button class="btn btn-ghost btn-sm" data-crm="${c.id}">Remove</button></span></div>${chainHTML(u,c)}</div>`).join('')+`<p class="hint" style="margin-top:10px">${esc(OTHER_REQS)}</p>`:'<p class="hint">No course targets yet.</p>'}</section>
      ${form}`; });
}
courseTargetsPage.after = () => { const F=fetOf(me());
  document.querySelectorAll('[data-crm]').forEach(b=>b.addEventListener('click',()=>{ F.courseTargets=F.courseTargets.filter(c=>c.id!==b.dataset.crm); save(); render(); }));
  document.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click',()=>{ VIEW.edit=b.dataset.edit; render(); document.getElementById('cf')?.scrollIntoView({behavior:'smooth'}); }));
  document.getElementById('cancel')?.addEventListener('click',()=>{ VIEW={}; render(); });
  document.getElementById('cf')?.addEventListener('submit',e=>{ e.preventDefault();
    const uni=document.getElementById('c-uni').value, course=document.getElementById('c-course').value.trim(), min=document.getElementById('c-min').value.trim(), er=document.getElementById('cf-e');
    if(!uni||!course){ er.textContent='Choose a university and type the course name.'; return; }
    if(min && (!/^\d+$/.test(min) || +min>60)){ er.textContent='Minimum APS should be a whole number.'; return; }
    const data={uni, course, career:document.getElementById('c-career').value, minAps: min===''?null:+min, reqs:document.getElementById('c-reqs').value.trim()};
    if(VIEW.edit){ Object.assign(F.courseTargets.find(c=>c.id===VIEW.edit), data); }
    else { if(F.courseTargets.length>=3) return; F.courseTargets.push({id:'c'+Date.now().toString(36), ...data}); }
    save(); VIEW={}; history.replaceState(null,'','#/targets/courses'); render(); toast('Course target saved.','check'); });
};

/* ---------- Track My Progress ---------- */
function apsChart(ser){
  if(ser.length<2) return `<p class="hint">${I('info')} Add another term’s results to see your Projected APS change over time.</p>`;
  if(ser.length===2){ const mx=Math.max(...ser.map(s=>s.aps)), d=ser[1].aps-ser[0].aps;
    return `<div class="apsbars" role="img" aria-label="Projected APS ${ser[0].label} ${ser[0].aps}, ${ser[1].label} ${ser[1].aps}">${ser.map((s,i)=>`<div class="abrow"><span>${esc(s.label)}</span><div class="abtrack"><i style="width:${Math.max(6,s.aps/mx*100)}%" class="${i?'now':''}"></i></div><b>${s.aps}</b></div>`).join('')}<p class="abdiff ${d>=0?'up':'down'}">${d>0?'+':''}${d} Projected APS</p></div>`; }
  const W=600,H=180,p=28, min=Math.max(0,Math.min(...ser.map(s=>s.aps))-4), max=Math.min(42,Math.max(...ser.map(s=>s.aps))+4);
  const x=i=>p+i*(W-2*p)/(ser.length-1), y=v=>H-p-(v-min)/(max-min||1)*(H-2*p);
  return `<svg class="apschart" viewBox="0 0 ${W} ${H}" role="img" aria-label="APS over time"><polyline points="${ser.map((s,i)=>`${x(i)},${y(s.aps)}`).join(' ')}"/>${ser.map((s,i)=>`<circle cx="${x(i)}" cy="${y(s.aps)}" r="5"/><text x="${x(i)}" y="${y(s.aps)-12}" class="v">${s.aps}</text><text x="${x(i)}" y="${H-6}" class="l">${s.label.replace('Grade ','Gr ').replace(' Term ',' T')}</text>`).join('')}</svg>`;
}
function progressPage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), keys=approvedKeys(u), ser=apsSeries(u), cur=ser[ser.length-1], prev=ser[ser.length-2];
    if(!keys.length) return fetTop(u,initials,planTxt,'Academic','Track My Progress','') + `<div class="caughtup inner"><span class="cu-ic">📈</span><div><b>No results yet</b><p>Add your latest results to start tracking your progress. <a class="link" href="#/aps">My Results &amp; APS →</a></p></div></div>`;
    const lastRec=F.record[keys[keys.length-1]], prevRec=keys.length>1?F.record[keys[keys.length-2]]:null;
    const attention = FET_KEYS.filter(k=>k!=='lo').filter(k=>lastRec.marks[k]<50 || (prevRec && level(lastRec.marks[k])<level(prevRec.marks[k]))).map(k=>({n:subjName(lastRec.subjects,k), p:lastRec.marks[k], drop: prevRec && level(lastRec.marks[k])<level(prevRec.marks[k])}));
    return fetTop(u,initials,planTxt,'Academic','Track My Progress','How your results and APS are changing over time.') + `
      <div class="pstats"><div class="glass pstat"><small>${prev?esc(prev.label):'Previous'} Projected APS</small><b>${prev?prev.aps:'—'}</b></div><div class="glass pstat"><small>Projected APS (${esc(cur.label)})</small><b>${cur.aps}</b></div><div class="glass pstat"><small>Change</small><b class="${prev?(cur.aps>=prev.aps?'up':'down'):''}">${prev?(cur.aps-prev.aps>0?'+':'')+(cur.aps-prev.aps):'—'}</b></div></div>
      <section class="glass fsec2"><h2>Projected APS over time</h2>${apsChart(ser)}</section>
      <section class="glass fsec2" style="margin-top:14px"><h2>Subject performance</h2><div class="src-table"><table><tr><th>Subject</th>${keys.map(k=>`<th>${rkLabel(k).replace('Grade ','Gr ')}</th>`).join('')}</tr>${FET_KEYS.map(sk=>`<tr><th>${esc(subjName(lastRec.subjects,sk))}</th>${keys.map(k=>`<td>${F.record[k].marks[sk]}% ${lvChip(F.record[k].marks[sk])}</td>`).join('')}</tr>`).join('')}</table></div></section>
      ${F.courseTargets.length?`<section class="glass fsec2" style="margin-top:14px"><h2>Progress toward your targets</h2>${F.courseTargets.map(c=>{ const A=targetAnalysis(u,c), m=A.min, sc=A.score, FS=fitStatus(u,c,A); return `<div class="inner tprog"><b>${esc(c.course)}</b><small>${esc(c.uni)}</small><span class="schip fitchip ${FS.cls}">${FS.e} ${FS.t}</span><small>${esc(FS.summary)}</small>${m!=null&&sc!=null?`<div class="tbar ${sc>=m?'ok':'warn'}"><i style="width:${Math.min(100,Math.round(sc/m*100))}%"></i></div><small>Projected ${esc(A.label)} ${sc} of the published minimum ${m}</small>`:`<small>${esc(A.st.t)}</small>`}${A.reqs.length?`<small>${A.reqs.filter(r=>r.status==='meets').length} of ${A.reqs.length} subject requirements met</small>`:''}</div>`; }).join('')}</section>`:''}
      <section class="glass fsec2" style="margin-top:14px"><h2>Areas needing attention</h2>${attention.length?`<ul class="plist grow">${attention.map(a=>`<li>${I('trend')}<span><b>${esc(a.n)}</b> — ${a.p}%${a.drop?' (down a level since last term)':''}</span></li>`).join('')}</ul>`:'<p>Nothing stands out right now — your subjects are at Level 4 or above and holding steady.</p>'}<a class="btn btn-ghost btn-sm" style="margin-top:12px" href="#/aps/improve">Improve My APS ${ARROW}</a></section>`; });
}

/* ---------- Improve My APS ---------- */
function improvePage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), lk=latestKey(u); F.visited.improve=true; save();
    if(!lk) return fetTop(u,initials,planTxt,'Academic','Improve My Projected APS','') + `<div class="caughtup inner"><span class="cu-ic">📈</span><div><b>Add your results first</b><p><a class="link" href="#/aps">My Results &amp; APS →</a></p></div></div>`;
    const rec=F.record[lk], aps=apsOf(rec);
    const steps = APS_KEYS.filter(k=>level(rec.marks[k])<7).map(k=>{ const p=rec.marks[k], l=level(p), nextAt=[0,30,40,50,60,70,80][l]; return {k, n:subjName(rec.subjects,k), p, l, need:nextAt-p, nextAt}; }).sort((a,b)=>a.need-b.need);
    const targets = F.courseTargets.map(c=>{ const A=targetAnalysis(u,c); return {c, A, min:A.min, sc:A.score}; });
    return fetTop(u,initials,planTxt,'Academic','Improve My Projected APS',`Based on your ${rkLabel(lk)} results (projected APS ${aps}).`) + `
      ${targets.length?targets.map(({c,A,min,sc})=>{ const gap=(min!=null&&sc!=null)?Math.round((min-sc)*10)/10:null; const below=A.reqs.filter(r=>r.status==='below'||r.status==='notTaken'); return `<section class="glass imp"><h2>${esc(c.course)} <small class="qcnt">${esc(c.uni)}</small></h2>
        ${below.length?`<p><b>Subject requirements to work on:</b></p><ul class="plist">${below.map(r=>`<li>${I('target')}<span>${esc(reqLabel(r.q))} — ${r.status==='notTaken'?'you don’t take this subject':`you have ${r.mark}%`}</span></li>`).join('')}</ul>`:''}
        ${gap==null?`<p class="hint">${esc(A.st.t)}</p>`: gap<=0?`<p class="standing ok">${I('check')} Your projected ${esc(A.label)} meets the published minimum requirement (${min}). Keeping or improving your results can still strengthen your position.</p>`:`<p class="standing warn">${I('trend')} You are currently ${gap} ${esc(A.label)} point${gap===1?'':'s'} below the published minimum requirement (${min}) for this target.</p>
          <p>Results closest to the next level:</p><ul class="plist">${steps.slice(0,Math.max(3,gap)).map(s=>`<li>${I('target')}<span><b>${esc(s.n)}</b>: ${s.p}% (Level ${s.l}). Reaching ${s.nextAt}% would move it to Level ${s.l+1} and add 1 point to your Projected APS.</span></li>`).join('')}</ul>`}
        ${c.reqs?`<p class="hint">Also check: ${esc(c.reqs)}</p>`:''}</section>`; }).join('') : `<section class="glass imp"><p>Add Study Targets to see how far you are from each one. <a class="link" href="#/targets">My Three Study Targets →</a></p></section>`}
      <section class="glass imp"><h2>Where a small improvement goes furthest</h2><p class="hint">These results are closest to the next achievement level.</p><ul class="plist">${steps.slice(0,4).map(s=>`<li>${I('trend')}<span><b>${esc(s.n)}</b> — ${s.need} percentage point${s.need===1?'':'s'} from Level ${s.l+1}</span></li>`).join('')}</ul></section>
      <p class="hint">${I('info')} Improving a result could strengthen your position toward your selected targets, but it doesn’t guarantee admission. ${esc(OTHER_REQS)}</p>`; });
}

/* ---------- Next Steps / Application Ready / My Next Step ---------- */
const NEXT_CHOICES = ['University','University of technology','TVET college','Private college','Learnership','Work','Gap year','Still deciding'];
function nextPage(){
  return shell((u,initials,planTxt)=>{ const g=gradeOf(u), F=fetOf(u);
    if(g==='10') return fetTop(u,initials,planTxt,'Step 8','My Next Steps','Small steps that keep your options open this year.') + `<section class="glass fsec2">${checklistHTML(nextStepsItems(u))}</section>`;
    if(g==='11') { const r=readinessItems(u), n=r.filter(x=>x.done).length; return fetTop(u,initials,planTxt,'Step 8','Application Ready','Get ready now so applying in Grade 12 is straightforward.') + `<section class="glass fsec2"><div class="jhead"><h2>${n} of ${r.length} done</h2></div><div class="tbar ok" style="margin-bottom:14px"><i style="width:${Math.round(n/r.length*100)}%"></i></div>${checklistHTML(r)}<p class="hint" style="margin-top:12px">${I('info')} Pathway 101 — Level Up explains APS, the NBT, application documents and funding.</p></section>`; }
    const trans=[{id:'offer',t:'Accept an offer or confirm your plan'},{id:'reg',t:'Know how and when to register'},{id:'fund',t:'Funding sorted (NSFAS, bursary or other)'},{id:'res',t:'Accommodation arranged, if needed'},{id:'docs',t:'Certified documents ready'}].map(x=>({...x, done:!!F.nextStep.checks[x.id]}));
    return fetTop(u,initials,planTxt,'Step 8','My Next Step','What comes after matric? Choose the plan you’re working towards — you can change it anytime.') + `
      <section class="glass fsec2"><h2>My plan after matric</h2><div class="opts two" role="radiogroup">${NEXT_CHOICES.map(c=>`<button class="opt" role="radio" aria-checked="${F.nextStep.choice===c}" data-choice="${esc(c)}"><span class="mk">${I('check')}</span><span>${esc(c)}</span></button>`).join('')}</div></section>
      <section class="glass fsec2" style="margin-top:14px"><h2>Getting ready for the move</h2><ul class="checklist">${trans.map(x=>`<li class="inner ${x.done?'done':''}"><button class="ckbox" data-nck="${x.id}" aria-pressed="${x.done}" aria-label="${esc(x.t)}">${x.done?I('check'):''}</button><span>${esc(x.t)}</span></li>`).join('')}</ul></section>`; });
}
nextPage.after = () => { const F=fetOf(me()); bindChecklist();
  document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{ F.nextStep.choice=b.dataset.choice; save(); render(); }));
  document.querySelectorAll('[data-nck]').forEach(b=>b.addEventListener('click',()=>{ F.nextStep.checks[b.dataset.nck]=!F.nextStep.checks[b.dataset.nck]; save(); render(); })); };

/* ---------- Grade 12: applications & deadlines ---------- */
const APP_STATUSES = ['Not started','In progress','Submitted','Waitlisted','Provisional offer','Accepted','Unsuccessful'];
/* Grade 12 step 7: one page for applications and deadlines */
function applicationsPage(){ PAGE_PART=true; const a=applicationsPart(), d=deadlinesPart(); PAGE_PART=false;
  return shell((u,initials,planTxt)=>fetTop(u,initials,planTxt,'Step 7','My Applications &amp; Deadlines','Keep track of your applications, requirements and important dates.') + `<h2 class="exh">${I('file')} Applications</h2>` + a(u) + `<h2 class="exh">${I('calendar')} Deadlines</h2>` + d(u)); }
applicationsPage.after = () => { applicationsPartAfter(); deadlinesPartAfter(); };
let PAGE_PART=false;
function applicationsPart(){
  return (u)=>{ const F=fetOf(u);
    return (F.courseTargets.length ? F.courseTargets.map(c=>{ const a=F.applications[c.id]||{status:'Not started'}; return `<section class="glass appc"><div class="ctop"><b>${esc(c.course)}</b><small>${esc(c.uni)}</small></div>
      <div class="subjset"><label>Status<select class="input" data-app="${c.id}" data-f="status">${APP_STATUSES.map(s=>`<option ${a.status===s?'selected':''}>${s}</option>`).join('')}</select></label>
      <label>Date submitted<input class="input" type="date" data-app="${c.id}" data-f="date" value="${esc(a.date||'')}"></label>
      <label>Reference / student number<input class="input" data-app="${c.id}" data-f="ref" maxlength="40" value="${esc(a.ref||'')}"></label>
      <label class="wide">Notes<input class="input" data-app="${c.id}" data-f="notes" maxlength="200" value="${esc(a.notes||'')}" placeholder="e.g. waiting for NBT results"></label></div></section>`; }).join('') : `<div class="caughtup inner"><span class="cu-ic">📝</span><div><b>No course targets yet</b><p>Add course targets and you can track an application for each one. <a class="link" href="#/targets">My Course Targets →</a></p></div></div>`) + `<p class="hint" style="margin-top:12px">${I('info')} Pathway doesn’t submit applications for you — apply through each university’s official application system.</p>`; };
}
const applicationsPartAfter = () => { const F=fetOf(me()); document.querySelectorAll('[data-app]').forEach(el=>el.addEventListener('change',()=>{ const id=el.dataset.app; F.applications[id]={...(F.applications[id]||{status:'Not started'}), [el.dataset.f]:el.value}; save(); toast('Saved.','check'); })); };
const DL_TYPES = ['Application closing date','NBT','Funding / bursary','Residence','Other'];
function deadlinesPart(){
  return (u)=>{ const F=fetOf(u), t=today(), list=[...F.deadlines].sort((a,b)=>a.date.localeCompare(b.date));
    return `
      <form id="dlf" class="glass cform"><div class="subjset"><label>Date<input class="input" type="date" id="dl-date" required></label><label>Type<select class="input" id="dl-type">${DL_TYPES.map(x=>`<option>${x}</option>`).join('')}</select></label><label>University (optional)<select class="input" id="dl-uni"><option value="">—</option>${[...new Set(F.courseTargets.map(c=>c.uni)), ...UNIVERSITIES.map(x=>x.name).filter(n=>!F.courseTargets.some(c=>c.uni===n))].map(n=>`<option>${esc(n)}</option>`).join('')}</select></label><label>Description<input class="input" id="dl-title" maxlength="80" placeholder="e.g. Applications close"></label></div>
      <p class="hint">${I('info')} Use dates from each university’s official website — they change every year. Your deadlines appear in Upcoming Dates on Home.</p><div class="err" id="dl-e"></div><div class="actions"><button class="btn btn-purple" type="submit">Add deadline ${ARROW}</button></div></form>
      <section class="glass fsec2" style="margin-top:14px"><h2>Your deadlines</h2>${list.length?`<ul class="dlist">${list.map(x=>{ const d=d0(x.date), past=d<t; return `<li class="${past?'past':''}"><div class="dbox inner"><b>${String(d.getDate()).padStart(2,'0')}</b><span>${MON[d.getMonth()]}</span></div><div class="ditem inner"><span class="dt gold"></span><div><b>${esc(x.title||x.type)}</b><small>${esc(x.type)}${x.uni?' · '+esc(x.uni):''}${past?' · passed':''}</small></div><button class="btn btn-ghost btn-sm" data-dldel="${x.id}">Remove</button></div></li>`; }).join('')}</ul>`:'<p class="hint">No deadlines yet.</p>'}</section>`; };
}
const deadlinesPart_unused = 0;
const deadlinesPartAfter = () => { const F=fetOf(me());
  document.getElementById('dlf')?.addEventListener('submit',e=>{ e.preventDefault(); const date=document.getElementById('dl-date').value; if(!date){ document.getElementById('dl-e').textContent='Choose a date.'; return; }
    F.deadlines.push({id:'d'+Date.now().toString(36), date, type:document.getElementById('dl-type').value, uni:document.getElementById('dl-uni').value, title:document.getElementById('dl-title').value.trim()}); save(); render(); toast('Deadline added.','check'); });
  document.querySelectorAll('[data-dldel]').forEach(b=>b.addEventListener('click',()=>{ F.deadlines=F.deadlines.filter(x=>x.id!==b.dataset.dldel); save(); render(); })); };

/* ---------- Profile ---------- */
function profilePage(){
  return shell((u,initials,planTxt)=>{ const F=isFET(u)?fetOf(u):null, tl=isFET(u)?{main:`Term ${learnerTerm(u)}`}:termLabel();
    return fetTop(u,initials,planTxt,'Account','Profile','') + `<section class="glass profc">
      <div class="prow"><small>Name</small><b>${esc(u.first)} ${esc(u.surname)}</b></div><div class="prow"><small>Email</small><b>${esc(u.email)}</b></div>
      <div class="prow"><small>Grade</small><b>Grade ${esc(u.grade)} · ${esc(gradeTheme(u).chapter)}</b></div><div class="prow"><small>School term</small><b>${esc(tl.main)}${tl.note?' · '+esc(tl.note):''}</b></div>
      ${F&&u.fetStart?`<div class="prow"><small>Joined Pathway in</small><b>Grade ${esc(u.fetStart.grade)} · Term ${u.fetStart.term} — first report: ${rkLabel(u.fetStart.firstKey)}</b></div>`:''}
      ${F?`<div class="prow"><small>Subjects</small><b>${FET_KEYS.map(k=>esc(subjName(F.subjects,k))).join(' · ')}</b></div>`:''}
      <div class="actions"><a class="btn btn-ghost btn-sm" href="#/grade">${I('cap')} Update my grade</a><a class="btn btn-ghost btn-sm" href="#/subscription">${I('card')} My Subscription</a><a class="btn btn-ghost btn-sm" href="#/help/faq">${I('chat')} FAQ</a><a class="btn btn-ghost btn-sm" href="#/help/support">${I('headset')} Support</a><button class="btn btn-ghost btn-sm" data-act="logout">${I('logout')} Log out</button></div></section>`; });
}

/* ============================================================
   PATHWAY 101 — GRADES 10, 11 AND 12 (each builds on the one before; Grade 9 has its own version)
   General information only; learners are always told to confirm details with their school and each institution.
   ============================================================ */
const P101_TITLE = {9:'Pathway 101', 10:'Pathway 101', 11:'Pathway 101 — Level Up', 12:'Pathway 101 — Application Ready'};
const P101_PURPOSE = {9:'Understand your subjects and your Grade 9 decisions.', 10:'Understand your options — how your subjects connect to your future.', 11:'Understand what you need — what it takes to reach your targets.', 12:'Turn your plan into action.'};
const P101_FET = {
 10:[
  ['📚','Your subjects and your future',[
   ['Your seven subjects','In Grades 10–12 you take a Home Language, a First Additional Language, a Mathematics subject, Life Orientation and three electives.'],
   ['How subjects connect to careers','Many study programmes ask for particular subjects. For example, most engineering degrees ask for Mathematics and Physical Sciences, while many commerce degrees ask for Mathematics.'],
   ['Subject combinations','The electives you take together shape which programmes you can apply for later, so it helps to check requirements early.'],
   ['Why subject requirements matter','A course can require a subject (for example Mathematics rather than Mathematical Literacy) and a minimum level in it — not only an overall score.'],
   ['Marks and achievement levels','Marks are grouped into levels 1–7: Level 7 is 80–100%, Level 6 is 70–79%, Level 5 is 60–69%, Level 4 is 50–59%, Level 3 is 40–49%, Level 2 is 30–39% and Level 1 is 0–29%.']]],
  ['🏛️','Where you can study',[
   ['University','Offers degrees and some diplomas and higher certificates. Some universities are “universities of technology”, which focus on career-focused diplomas and degrees.'],
   ['TVET college','Public Technical and Vocational Education and Training colleges offer practical, work-focused qualifications, including trades.'],
   ['Higher Certificate','A one-year qualification that can lead to work or further study.'],
   ['Diploma','Usually a three-year, career-focused qualification.'],
   ['Bachelor’s degree','Usually three or four years of study at a university (longer for some fields, such as medicine).']]],
  ['🎯','Getting in: the basics',[
   ['APS (Admission Point Score)','A score universities work out from your school results to check whether you meet a course’s minimum. In Pathway, your Projected APS adds up the levels (1–7) of your six subjects, leaving out Life Orientation — universities each use their own method.'],
   ['Projected APS vs final APS','Your projected APS is worked out from your latest school results, so it changes as your marks change. Your final (official) APS is calculated by each university from your final results.'],
   ['Minimum admission requirements','The lowest APS and subject results a course will consider. Meeting them doesn’t guarantee a place.'],
   ['Subject requirements','Specific subjects and levels a course needs, such as “Mathematics Level 5”.']]],
  ['🧭','Careers and courses',[
   ['Career vs course','A career is the work you do; a course (or programme) is what you study to prepare for it.'],
   ['How courses connect to careers','Some careers follow one main course (like medicine); others can be reached through several different courses.'],
   ['Different routes into careers','Degree, diploma, TVET, learnership or starting work — many careers have more than one route in.']]],
  ['🗂️','University terms you’ll hear',[
   ['Faculty','A group of related departments at a university, such as the Faculty of Commerce.'],
   ['Prospectus','The official guide each university publishes, listing its courses and admission requirements.'],
   ['Undergraduate','Your first qualification after school, such as a diploma or bachelor’s degree.']]]
 ],
 11:[
  ['🎓','Your matric pass (NSC) explained',[
   ['What is the National Senior Certificate?','The National Senior Certificate (NSC) is the qualification you receive when you pass matric. The Department of Basic Education (DBE) sets four achievement levels: NSC, Higher Certificate, Diploma and Bachelor’s.'],
   ['NSC — the minimum to pass matric','At least 40% in your Home Language, at least 40% in two other subjects, and at least 30% in three other subjects. So six of your seven subjects must be passed. School-based assessment (SBA) requirements must also be met.'],
   ['Higher Certificate level','All the NSC requirements, plus at least 30% in the language of learning and teaching (LoLT) of the institution you apply to — usually English or Afrikaans. This level gives access to Higher Certificate study.'],
   ['Diploma level','All the NSC requirements, plus at least 40% in four recognised 20-credit subjects and at least 30% in the institution’s LoLT. Life Orientation is a 10-credit subject, so it doesn’t count towards the four.'],
   ['Bachelor’s degree level','All the NSC requirements, plus at least 50% in four subjects from the DBE’s designated subject list (not Life Orientation) and at least 30% in the institution’s LoLT. Designated subjects include the languages, Accounting, Agricultural Sciences, Business Studies, Consumer Studies, Dramatic Arts, Economics, Engineering Graphics and Design, Geography, History, Information Technology, Life Sciences, Mathematics, Mathematical Literacy, Music, Physical Sciences, Religion Studies and Visual Arts — ask your school if you’re unsure whether one of your subjects counts.'],
   ['Why these are minimums','These are national floors that decide which kind of study you may apply for. They are the least you need, not a target to aim for.'],
   ['Programmes add their own requirements','Universities set requirements on top of these levels: a minimum APS or admission score, specific subjects at specific levels, and sometimes the NBT, a portfolio or an interview.'],
   ['A pass level doesn’t guarantee admission','Popular programmes often have more applicants than places, so selection can happen well above the minimum. You can reach a Bachelor’s level and still not meet a particular programme’s requirements.'],
   ['How your term results affect your position','Pathway’s “matric outcome position” checks your latest term results against these minimums. It’s a current indicator — your final level depends on your final Grade 12 results.'],
   ['Why improving keeps more options open','Moving a subject from 30% to 40%, or from 40% to 50%, can change your level. Higher marks also open more programmes and can matter for bursaries and other opportunities.']]],
  ['📊','APS in more detail',[
   ['Projected APS vs final APS','While you’re at school, Pathway shows a projected APS from your latest results. Universities work out your final (official) APS from your final results — many use your final Grade 11 results for early offers and your final Grade 12 (NSC) results to confirm.'],
   ['How Pathway calculates your APS','Pathway adds the achievement levels (1–7) of your six subjects, leaving out Life Orientation, so the maximum is 42. It updates every time you add new results.'],
   ['Universities calculate APS differently','Some count Life Orientation for fewer points, some use other scales, and some add extra points for particular subjects. Always check each university’s method in its prospectus.'],
   ['APS and your targets','Compare your Projected APS with the published minimum for each of your Study Targets. Pathway shows whether you currently meet it — but meeting it doesn’t guarantee admission.'],
   ['Required percentages','Many courses also set a minimum mark or level for specific subjects, such as Mathematics or your Home Language.']]],
  ['📝','Other admission and selection requirements',[
   ['Selection','Popular courses often have more applicants than places, so they may select learners with results above the minimum.'],
   ['National Benchmark Tests (NBT)','Tests some universities and programmes require, covering academic and quantitative literacy and, for some programmes, mathematics. Check whether your courses need them and register through the official NBT website.'],
   ['Portfolios, auditions and interviews','Some creative, performance and health programmes ask for extra evidence.']]],
  ['🏛️','Professional pathways explained',[
   ['Professional body','An organisation for a profession, such as SAICA for chartered accountants. It sets exams and training requirements for its designations and supports members.'],
   ['Regulator (statutory council)','A body created by law to register and regulate a profession, such as the HPCSA for health professionals or ECSA for engineers. In regulated professions, you must be registered to practise.'],
   ['Registration','Being officially listed with a regulator or professional body. Many professions register you first as a student or candidate, and later as a full professional.'],
   ['Articles / training contract','A period of supervised work after or alongside your studies, for example a SAICA training contract or practical vocational training for candidate attorneys.'],
   ['Internship and community service','Supervised work after your degree in some health professions. For example, doctors in South Africa do a two-year internship and a year of community service before registering for independent practice.'],
   ['Professional exams and designations','Board or admission exams you pass to earn a professional title, such as CA(SA), Pr Eng or admission as an attorney. Career Explorer shows the route for each career where it applies.']]],
  ['📅','How applications work',[
   ['When you apply','You usually apply during Grade 12 for study the following year. Many universities use your final Grade 11 results for early decisions.'],
   ['Application opening and closing dates','Each university sets its own dates, and some programmes close earlier than others. Check each university’s website and add the dates to Pathway when you’re in Grade 12.'],
   ['Application documents','Usually a copy of your ID and your latest school results, and sometimes more (such as a portfolio).'],
   ['Application fees','Some universities charge an application fee and others don’t. Check each university’s website.']]],
  ['🎯','Staying on track',[
   ['Setting realistic targets','Choose a mix of targets: one you already meet, and one or two that are a stretch.'],
   ['Monitoring your progress','Add your results every term — Pathway updates your Projected APS and shows how you’re moving toward your targets.'],
   ['If your marks are below target','Focus on the subjects closest to the next level, talk to your teachers, and consider other routes into the same career.'],
   ['Preparing for applications','Keep your documents ready, know your target dates, and check the requirements for each course.']]]
 ],
 12:[
  ['🎓','Your matric pass (NSC) explained',[
   ['What is the National Senior Certificate?','The National Senior Certificate (NSC) is the qualification you receive when you pass matric. The Department of Basic Education (DBE) sets four achievement levels: NSC, Higher Certificate, Diploma and Bachelor’s.'],
   ['NSC — the minimum to pass matric','At least 40% in your Home Language, at least 40% in two other subjects, and at least 30% in three other subjects. So six of your seven subjects must be passed. School-based assessment (SBA) requirements must also be met.'],
   ['Higher Certificate level','All the NSC requirements, plus at least 30% in the language of learning and teaching (LoLT) of the institution you apply to — usually English or Afrikaans. This level gives access to Higher Certificate study.'],
   ['Diploma level','All the NSC requirements, plus at least 40% in four recognised 20-credit subjects and at least 30% in the institution’s LoLT. Life Orientation is a 10-credit subject, so it doesn’t count towards the four.'],
   ['Bachelor’s degree level','All the NSC requirements, plus at least 50% in four subjects from the DBE’s designated subject list (not Life Orientation) and at least 30% in the institution’s LoLT. Designated subjects include the languages, Accounting, Agricultural Sciences, Business Studies, Consumer Studies, Dramatic Arts, Economics, Engineering Graphics and Design, Geography, History, Information Technology, Life Sciences, Mathematics, Mathematical Literacy, Music, Physical Sciences, Religion Studies and Visual Arts — ask your school if you’re unsure whether one of your subjects counts.'],
   ['Why these are minimums','These are national floors that decide which kind of study you may apply for. They are the least you need, not a target to aim for.'],
   ['Programmes add their own requirements','Universities set requirements on top of these levels: a minimum APS or admission score, specific subjects at specific levels, and sometimes the NBT, a portfolio or an interview.'],
   ['A pass level doesn’t guarantee admission','Popular programmes often have more applicants than places, so selection can happen well above the minimum. You can reach a Bachelor’s level and still not meet a particular programme’s requirements.'],
   ['How your term results affect your position','Pathway’s “matric outcome position” checks your latest term results against these minimums. It’s a current indicator — your final level depends on your final Grade 12 results.'],
   ['Why improving keeps more options open','Moving a subject from 30% to 40%, or from 40% to 50%, can change your level. Higher marks also open more programmes and can matter for bursaries and other opportunities.']]],
  ['📝','Applications',[
   ['Application timelines','Universities open and close applications on their own dates during Grade 12. Some programmes close earlier than others.'],
   ['Application status','Track each application in Pathway: submitted, waitlisted, provisional offer, accepted or unsuccessful.'],
   ['Required documents','Usually a copy of your ID and your latest results, sometimes certified, plus anything a programme asks for.'],
   ['Application fees','Some universities charge an application fee; others don’t. Check each university’s website.'],
   ['Central Applications Office (CAO)','In KwaZulu-Natal, some institutions use a shared application system through the CAO.']]],
  ['📊','Results and admission',[
   ['Projected APS vs final APS','Your projected APS in Pathway comes from your latest school results. Your final (official) APS comes from your final NSC results, and that is what confirms admission.'],
   ['Projected vs final results','Offers during Grade 12 are often based on earlier results. Your final place usually depends on your final NSC results.'],
   ['APS and requirements','Keep comparing your Projected APS and subject results with each target’s published requirements. Other requirements may also apply.'],
   ['NSC pass types','Your NSC can be a Higher Certificate, Diploma or Bachelor’s pass. Each opens different study options and has minimum marks set nationally — your school can confirm exactly what each needs.'],
   ['NBT','If your programmes need the National Benchmark Tests, make sure you’ve registered and written them in time.']]],
  ['🧭','From qualification to profession',[
   ['Your qualification is the first step','In regulated careers, finishing your degree or diploma is usually followed by supervised training, registration and sometimes exams before you can practise fully.'],
   ['Check the route for your career','Open the career in Career Explorer to see its professional pathway, the bodies involved and links to their official websites.'],
   ['After matric','Your personal next steps after Grade 12 — routes, funding, applications, NBT, accommodation and dates — are in After Matric in the menu.'],
   ['Rules change','Professional bodies update their requirements from time to time — always check their current rules when you get there.']]],
  ['💰','Funding your studies',[
   ['NSFAS','The National Student Financial Aid Scheme funds eligible students at public universities and TVET colleges. Check the official NSFAS website for current criteria and dates.'],
   ['Bursaries','Funding from companies, government departments or organisations, sometimes with a work-back agreement.'],
   ['Scholarships','Awards usually based on academic, sporting or other achievement.'],
   ['University funding','Many universities offer their own bursaries, merit awards and financial aid — check each one’s financial aid office.']]],
 ]
};
function p101FetHTML(g){
  return P101_FET[g].map(([ic,title,items],i)=>`<section class="glass dsec p101sec" id="p${i+1}"><button aria-expanded="false"><span class="pub-ic">${ic}</span><span class="dsh">${esc(title)}</span><span class="pm">${I('plus')}</span></button><div class="dsb"><div class="termgrid">${items.map(([t,d])=>`<div class="inner term"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div></div></section>`).join('')
   + `<p class="hint" style="margin-top:18px">${I('info')} General information only. Requirements, dates and fees differ between institutions and change each year — always confirm with the institution and your school.</p>`;
}

/* ---------- Career Explorer additions for Grades 10–12 (the core explorer is the same for every grade) ---------- */
const STUDY_ROUTES = {
  health:'Degrees such as medicine (MBChB), pharmacy, physiotherapy or nursing, and some diplomas.', engineering:'Engineering degrees, engineering diplomas and technician routes.',
  built:'Degrees and diplomas in architecture, construction, quantity surveying, planning or surveying.', computing:'Degrees in computer science or information systems, IT diplomas and short courses.',
  data:'Degrees in economics, statistics, mathematics or data science.', finance:'BCom degrees (for example accounting, finance or actuarial science) and accounting diplomas; chartered accountancy adds professional training.',
  business:'BCom or business degrees, and diplomas in management, marketing or human resources.', law:'An LLB degree (sometimes after a BA or BCom), followed by professional training for some roles.',
  education:'A BEd degree, or a degree followed by a Postgraduate Certificate in Education (PGCE).', social:'BA or social science degrees; psychology and social work need further study and professional registration.',
  media:'Degrees and diplomas in journalism, media, communication or languages.', creative:'Degrees and diplomas in fine art, design, film, drama or music — many ask for a portfolio or audition.',
  natural:'BSc degrees in the relevant science, often followed by Honours or further study.', environment:'BSc degrees in environmental or earth sciences, and conservation diplomas.',
  agri:'Degrees and diplomas in agriculture, animal or food science; veterinary science is a specialised degree.', tourism:'Diplomas and degrees in tourism, hospitality or culinary arts.',
  aviation:'Accredited flight training, air traffic services training or aircraft maintenance programmes.', public:'Service-specific training (police, defence or fire services) and degrees in public administration or international relations.',
  trades:'TVET college programmes, apprenticeships and trade tests.', sport:'Degrees in sport science or human movement, and coaching or fitness qualifications.'
};
const favBtn = (u,name) => { if(!isFET(u)) return ''; const on=fetOf(u).favCareers.includes(name); return `<button class="favbtn ${on?'on':''}" data-fav="${esc(name)}" aria-pressed="${on}" aria-label="${on?'Remove from':'Save to'} my careers">${on?'♥':'♡'}</button>`; };
function bindCareerExtras(){ const u=me(); if(!u||!isFET(u)) return; const F=fetOf(u);
  document.querySelectorAll('[data-fav]').forEach(b=>b.addEventListener('click',e=>{ e.preventDefault(); const n=b.dataset.fav, i=F.favCareers.indexOf(n); if(i>=0) F.favCareers.splice(i,1); else F.favCareers.push(n); save(); render(); }));
  document.querySelectorAll('[data-cmp]').forEach(b=>b.addEventListener('change',()=>{ const n=b.dataset.cmp; F.compare=F.compare||[]; const i=F.compare.indexOf(n); if(i>=0) F.compare.splice(i,1); else { if(F.compare.length>=3){ b.checked=false; toast('You can compare up to three careers.','info'); return; } F.compare.push(n); } save(); render(); }));
}
function compareBar(u){ if(!isFET(u)) return ''; const F=fetOf(u), c=F.compare||[]; if(!c.length && !F.favCareers.length) return '';
  return `<div class="glass cmpbar">${F.favCareers.length?`<span>${I('heart')} Saved: ${F.favCareers.map(n=>`<a class="tag rel" href="#/careers/view?c=${encodeURIComponent(n)}">${esc(n)}</a>`).join(' ')}</span>`:''}${c.length?`<span>Comparing ${c.length} of 3</span><a class="btn btn-purple btn-sm" href="#/careers/compare">Compare ${ARROW}</a>`:''}</div>`; }
function careerCompare(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), list=(F.compare||[]).map(n=>CAREERS.find(c=>c.name===n)).filter(Boolean);
    if(!list.length) return fetTop(u,initials,planTxt,'Career Explorer','Compare careers','') + `<p>Tick “Compare” on up to three career cards. <a class="link" href="#/careers">Career Explorer →</a></p>`;
    const row=(lab,fn)=>`<div class="cmprow"><span class="mlab">${lab}</span>${list.map(c=>`<p>${fn(c)}</p>`).join('')}</div>`;
    return fetTop(u,initials,planTxt,'Career Explorer','Compare careers','') + `<section class="glass cmp" style="--n:${list.length}"><div class="cmprow head"><span></span>${list.map(c=>`<b>${esc(c.name)}</b>`).join('')}</div>
      ${row('What it is',c=>esc(exInfo(c).desc))}${row('Typical subjects',c=>exSubjects(c).map(esc).join(' • '))}${row('Study routes',c=>esc(STUDY_ROUTES[c.family]||''))}${row('Useful skills',c=>esc((FAMILY_EXTRA[c.family]?.skills||[]).join(', ')))}
      <div class="cmprow"><span></span>${list.map(c=>`<p><a class="btn btn-ghost btn-sm" href="#/targets?career=${encodeURIComponent(c.name)}">Use for a course target</a></p>`).join('')}</div></section>
      <div class="actions"><button class="btn btn-ghost" id="cmpclear">Clear comparison</button><a class="btn btn-ghost" href="#/careers">${I('back')} Career Explorer</a></div>`; });
}
careerCompare.after = () => document.getElementById('cmpclear')?.addEventListener('click',()=>{ fetOf(me()).compare=[]; save(); go('#/careers'); });

/* Generated from the uploaded 2027 PATHWAY university workbooks (UP, UKZN, UFS, UCT, SU, NWU, NMU, UJ, Unisa, Wits, UL, WSU, RU, UNIVEN, UWC, CPUT, SMU, TUT, SPU, UMP, CUT, DUT, MUT, VUT). Do not edit by hand — re-run the import. */
const UNI_DB = window.UNI_DB || [];
/* APP_HUB:BEGIN — generated by import_apps.py from PATHWAY_University_Applications_Import.xlsx plus PATHWAY’s verification log. Re-run to refresh; matched to UNI_DB by id, never duplicated. Application info only — admission requirements stay in UNI_DB. */
const APP_HUB_META = {"source": "PATHWAY_University_Applications_Import.xlsx", "checked": "2026-10-11", "nsfas": {"url": "https://www.nsfas.org.za/content/", "status": "verified", "note": "Official NSFAS website (opened 11 October 2026). At the time of checking the page still headlined the 2026 funding cycle, so PATHWAY does not show an NSFAS application window — check NSFAS for the current one."}, "funding": [{"category": "NSFAS", "description": "National Student Financial Aid Scheme", "note": "Use the official NSFAS site for eligibility, applications, allowances, required documents and current application windows. NSFAS dates change annually; do not hard-code an old deadline."}, {"category": "Institutional funding", "description": "University-specific bursaries, scholarships and financial aid", "note": "Keep NSFAS separate from university bursaries/scholarships. Students may need to apply separately for institutional awards."}], "guide": {"Dates": "Application dates vary by intake, programme, applicant type and sometimes faculty. Store dates as intake-year records and show the official source plus last-verified date in PATHWAY.", "Fees": "Do not treat a third-party fee summary or an old fee as definitive. Confirm the amount, currency, domestic/international category, exemptions, refundability and payment method on the official university/CAO page before showing it to learners.", "Residences": "Applying to the university does not always mean the learner has applied for residence. Display a separate residence application link and deadline where the institution requires it.", "Campuses": "Campus lists are working summaries. Programme availability can vary by campus and year; link each campus to the institution's official campus/programme page after verification.", "NSFAS": "The same official NSFAS link applies across institutions, but learners must still check current eligibility and application dates. Do not imply NSFAS funding is guaranteed."}};
const APP_HUB = [{"id": "cput", "abbr": "CPUT", "name": "Cape Peninsula University of Technology", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: application and date sourced; fee/residence/campus details need verification", "source": {"url": "https://www.cput.ac.za/study-at-cput/undergraduate/apply", "status": "verified"}, "website": {"url": "https://www.cput.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.cput.ac.za/study-at-cput/undergraduate/apply", "status": "verified", "note": "Official “Apply to Study” page for the 2027 intake (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.cput.ac.za/students/financial-aid", "status": "review", "note": "The CPUT website blocked PATHWAY’s automated check — confirm this page yourself.", "from": "workbook"}, "residence": {"url": "https://www.cput.ac.za/study-at-cput/student-housing", "status": "review", "note": "The CPUT website blocked PATHWAY’s automated check — confirm this page yourself.", "from": "workbook"}}, "extra": [], "campuses": ["Cape Town", "Bellville", "Wellington", "Mowbray", "Granger Bay", "Athlone"], "campusNotes": ["Athlone: confirm current teaching-site status"], "campusStatus": "review", "timing": "2027 cycle opened 11 May 2026; many undergraduate programmes close 30 Sep 2026, with earlier programme-specific deadlines.", "dates": [{"kind": "open", "date": "2026-05-11", "label": "Applications open", "status": "verified", "note": "Official page: “Applications for the 2027 intake opens Monday, 11 May 2026.”"}, {"kind": "close", "date": "2026-09-30", "label": "Many undergraduate programmes close", "status": "partial", "note": "The official page lists a closing date per programme (some close earlier, e.g. Nursing on 30 June 2026). Check your programme on the official page."}], "fee": {"status": "review", "note": "No application fee is stated on the official Apply to Study page. Confirm on the CPUT website — don’t assume it is free.", "items": []}, "workbookFee": "Fee: verify on official application page for intake; don't assume no fee.", "cao": {"uses": null, "status": "na", "note": "The official application page does not mention the CAO."}, "residenceModel": null, "resNote": null}, {"id": "cut", "abbr": "CUT", "name": "Central University of Technology", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: application/date sourced; fee and residence direct page need verification", "source": {"url": "https://www.cut.ac.za/application-process/", "status": "verified"}, "website": {"url": "https://www.cut.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.cut.ac.za/application-process/", "status": "verified", "note": "Official CUT application page with steps, documents and fee information (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.cut.ac.za/financial-aid/", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": ["Bloemfontein", "Welkom"], "campusNotes": [], "campusStatus": "review", "timing": "2027 cycle opened April 2026; undergraduate and most listed programmes close 30 Sep 2026; research master's/doctoral dates differ.", "dates": [{"kind": "close", "date": null, "label": "Closing date", "status": "review", "note": "The workbook says the 2027 cycle opened April 2026 and most programmes close 30 September 2026, but the official page currently reads “Open: April 2027 | Closes: 30 September 2027” for the 2027 intake. These conflict, so PATHWAY does not show a deadline. Research master’s/doctoral dates differ."}], "fee": {"status": "verified", "items": [{"category": "All applicants", "amount": "No application fee currently", "status": "verified"}], "note": "Official page: “there is currently no application fee.” CUT warns applicants never to pay individuals."}, "workbookFee": "Fee: verify on official application process page.", "cao": {"uses": null, "status": "na", "note": "The official application page does not mention the CAO."}, "residenceModel": null, "resNote": null}, {"id": "mut", "abbr": "MUT", "name": "Mangosuthu University of Technology", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.mut.ac.za/", "status": "verified"}, "website": {"url": "https://www.mut.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.mut.ac.za/prospective-students/apply/", "status": "verified", "note": "Found on MUT’s official homepage and opened on 11 Oct 2026 (the workbook only gave the homepage).", "from": "official site", "workbook": null}, "funding": {"url": "https://www.mut.ac.za/fees-and-funding/bursaries/", "status": "partial", "note": "Linked from MUT’s official homepage as “Bursaries”; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://www.mut.ac.za/student-housing/", "status": "partial", "note": "Linked from MUT’s official homepage as “Student Housing”; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "Scholarships", "url": "https://www.mut.ac.za/prospective-students/study-at-mut/scholarships/", "kind": "funding", "status": "partial", "note": "Linked from MUT’s official homepage."}], "campuses": ["Umlazi (main campus)"], "campusNotes": [], "campusStatus": "review", "timing": "Typical cycle often opens in the first half of the year and closes around Sep; confirm current intake and CAO route.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "partial", "note": "MUT’s apply page says “Applications open in January and close on 30 September with late applications accepted until 30 November”, but gives no year — confirm for your intake. Faculties list their own dates."}], "fee": {"status": "review", "note": "MUT’s apply page mentions “a single application fee” paid through the CAO, and late applications “accumulate a fee determined by the CAO”. No amount is stated.", "payTo": "Central Applications Office (CAO)", "items": []}, "workbookFee": "Fee: verify; applications may use the CAO and fee can be charged by CAO.", "cao": {"uses": true, "status": "verified", "note": "MUT’s official apply page: “All first-year applications to study at MUT are submitted through the Central Applications Office (CAO).”"}, "residenceModel": null, "resNote": null}, {"id": "vut", "abbr": "VUT", "name": "Vaal University of Technology", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.vut.ac.za/", "status": "verified"}, "website": {"url": "https://www.vut.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://vut.ac.za/how-to-apply/", "status": "verified", "note": "Found on VUT’s official homepage (“Apply for 2027”) and opened on 11 Oct 2026.", "from": "official site", "workbook": null}, "funding": {"url": "https://vut.ac.za/financial-aid-bursaries/", "status": "partial", "note": "Linked from VUT’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://vut.ac.za/accommodation/", "status": "partial", "note": "Linked from VUT’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "Check application status", "url": "https://statuscheck.vut.ac.za/", "kind": "apply", "status": "partial", "note": "Linked from VUT’s official homepage."}], "campuses": ["Vanderbijlpark", "Ekurhuleni", "Secunda", "Upington"], "campusNotes": ["Upington: verify current programme availability"], "campusStatus": "review", "timing": "Typical cycle commonly opens mid-year and closes around Sep; confirm current intake and programme deadlines.", "dates": [{"kind": "open", "date": "2026-05-21", "label": "Applications open", "status": "partial", "note": "VUT’s How to apply page says applications for 2027 “will open on 21 May 2026”."}, {"kind": "close", "date": "2026-10-30", "label": "National applicants close", "status": "partial", "note": "The same page gives 30 October 2026 for national applicants and 30 September 2026 for international applicants, but a banner on the page says academic applications close 30 September. These conflict — confirm with VUT. Some programmes closed on 31 July 2026."}, {"kind": "resClose", "date": "2026-10-31", "label": "Residence applications close", "status": "partial", "note": "From a banner on VUT’s How to apply page (“Residences: 31 October”), year not stated in the banner."}], "fee": {"status": "verified", "items": [{"category": "All applicants", "amount": "R110", "status": "verified"}], "note": "Official page: “Application fee for all applicants is R110”, paid on the application portal.", "payTo": "VUT, on its online application portal"}, "workbookFee": "Fee: verify on official application page.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "dut", "abbr": "DUT", "name": "Durban University of Technology", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.dut.ac.za/", "status": "verified"}, "website": {"url": "https://www.dut.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://onlineapps.dut.ac.za/", "status": "partial", "note": "Linked from DUT’s official homepage as “Online Applications Form”; the portal itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://www.dut.ac.za/support_services/financial_aid/", "status": "partial", "note": "Linked from DUT’s official homepage as “Financial Aid and Scholarships”; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [{"label": "How to apply for 2027 (PDF)", "url": "https://www.dut.ac.za/wp-content/uploads/2026/06/How-to-Apply-2027.pdf", "kind": "apply", "status": "partial", "note": "Linked from DUT’s official homepage."}], "campuses": ["Durban: Steve Biko", "ML Sultan", "Ritson", "Brickfield", "City", "Indumiso (Pietermaritzburg)", "Riverside (Pietermaritzburg)"], "campusNotes": [], "campusStatus": "review", "timing": "Many programmes use the CAO; typical closing period is around 30 Sep, but programme deadlines vary.", "dates": [{"kind": "close", "date": null, "label": "Typical closing period", "status": "review", "note": "Workbook: many programmes use the CAO and typically close around 30 September, but programme deadlines vary. Not yet confirmed on an official page."}], "fee": {"status": "review", "note": "Workbook: verify the CAO fee and any DUT-specific charges for the intake.", "items": []}, "workbookFee": "Fee: verify CAO fee and any DUT-specific charges for the intake.", "cao": {"uses": null, "status": "partial", "note": "The workbook says many DUT programmes use the CAO, and DUT’s homepage links to the CAO’s application-status page. Check which route applies to your programme."}, "residenceModel": null, "resNote": null}, {"id": "tut", "abbr": "TUT", "name": "Tshwane University of Technology", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.tut.ac.za/", "status": "verified"}, "website": {"url": "https://www.tut.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://applications-prod.tut.ac.za/", "status": "partial", "note": "Linked from TUT’s official homepage as “Apply Now”; the portal itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://www.tut.ac.za/financial-aid/", "status": "partial", "note": "Linked from TUT’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://www.tut.ac.za/accommodation/", "status": "partial", "note": "Linked from TUT’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "Programme closing dates", "url": "https://www.tut.ac.za/programme-closing-dates/", "kind": "apply", "status": "partial", "note": "Linked from TUT’s official homepage."}, {"label": "Undergraduate funding", "url": "https://www.tut.ac.za/student-finance/undergraduate/", "kind": "funding", "status": "partial", "note": "Linked from TUT’s official homepage."}], "campuses": ["Pretoria", "Ga-Rankuwa", "Soshanguve South", "Soshanguve North", "eMalahleni", "Mbombela", "Polokwane"], "campusNotes": [], "campusStatus": "review", "timing": "Typical application window opens around April; many 2027 programmes close 30 Sep 2026, but exceptions apply.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: applications typically open around April and many 2027 programmes close 30 September 2026, with exceptions. Not yet confirmed — use TUT’s programme closing dates page."}], "fee": {"status": "review", "note": "Workbook: verify the current official fee and applicant category.", "items": []}, "workbookFee": "Fee: verify current official fee and applicant category.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "smu", "abbr": "SMU", "name": "Sefako Makgatho Health Sciences University", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official application dates sourced; fee needs official confirmation", "source": {"url": "https://www.smu.ac.za/students/apply/online-application/", "status": "verified"}, "website": {"url": "https://www.smu.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.smu.ac.za/students/apply/online-application/", "status": "verified", "note": "Official SMU online application page (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.smu.ac.za/students/financial-aid/", "status": "partial", "note": "Linked from SMU’s official homepage as “Financial Aid”; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://www.smu.ac.za/students/student-affairs/residence-and-catering/", "status": "partial", "note": "Linked from SMU’s official homepage as “Student Residences”; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [], "campuses": ["Ga-Rankuwa (single main campus)"], "campusNotes": [], "campusStatus": "review", "timing": "2027 applications opened 1 Apr 2026; undergraduate deadline listed as 31 Jul 2026.", "dates": [{"kind": "open", "date": "2026-04-01", "label": "Applications open (all programmes)", "status": "verified", "note": "Official page."}, {"kind": "close", "date": "2026-07-31", "label": "Undergraduate applications close", "status": "verified", "note": "Official page: “Friday, 31st July 2026 for undergraduate programmes”."}], "fee": {"status": "verified", "items": [{"category": "All applicants", "amount": "R300", "status": "verified"}], "refundable": false, "payTo": "Sefako Makgatho Health Sciences University (bank details on the official page)", "note": "Official page: “non-refundable application fee of R300.00”. Applying for both undergraduate and postgraduate study needs only one fee."}, "workbookFee": "R300 reported for 2027 applications; verify on official portal before publishing.", "cao": null, "residenceModel": null, "resNote": {"text": "SMU’s application page says residence places are limited and awarded on a first-come, first-served basis.", "status": "verified"}}, {"id": "spu", "abbr": "SPU", "name": "Sol Plaatje University", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.spu.ac.za/", "status": "verified"}, "website": {"url": "https://www.spu.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.spu.ac.za/index.php/how-to-apply/", "status": "partial", "note": "Linked from SPU’s official homepage as “How to apply”; the page itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://www.spu.ac.za/index.php/financial-aid/", "status": "partial", "note": "Linked from SPU’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": ["Kimberley (urban campus across multiple sites)"], "campusNotes": [], "campusStatus": "review", "timing": "Typical 2027 cycle opened around April; common closing period 30 Sep 2026; confirm programme-specific deadlines.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: the 2027 cycle opened around April with a common closing date of 30 September 2026. Not yet confirmed on an official page."}], "fee": {"status": "review", "note": "Workbook: verify on the official application page.", "items": []}, "workbookFee": "Fee: verify on official application page.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "ump", "abbr": "UMP", "name": "University of Mpumalanga", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official application dates and fee sourced; residence/campus direct pages need verification", "source": {"url": "https://www.ump.ac.za/Study-with-us/Application-Process/Online-Applications", "status": "verified"}, "website": {"url": "https://www.ump.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.ump.ac.za/Study-with-us/Application-Process/Online-Applications", "status": "verified", "note": "Official UMP online applications page (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.ump.ac.za/Study-with-us/Student-Funding.aspx", "status": "partial", "note": "Linked from UMP’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://www.ump.ac.za/Student-Life/Student-Housing.aspx", "status": "partial", "note": "Linked from UMP’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "On-campus accommodation", "url": "https://www.ump.ac.za/Student-Life/Student-Housing/On-Campus-Accommodation.aspx", "kind": "residence", "status": "partial", "note": "Linked from UMP’s official homepage."}, {"label": "Accredited private accommodation", "url": "https://www.ump.ac.za/Student-Life/Student-Housing/Accredited-Private-Accommodation.aspx", "kind": "private", "status": "partial", "note": "Linked from UMP’s official homepage."}], "campuses": ["Mbombela", "Siyabuswa"], "campusNotes": ["Other teaching sites/programme locations should be confirmed from the university."], "campusStatus": "review", "timing": "2027 applications opened 1 Jun 2026; undergraduate closing date listed as 30 Nov 2026.", "dates": [{"kind": "open", "date": "2026-06-01", "label": "Applications open", "status": "verified", "note": "Official page."}, {"kind": "close", "date": "2026-11-30", "label": "Undergraduate applications close", "status": "verified", "note": "Official page: “Undergraduate Programmes: 30 November 2026”."}], "fee": {"status": "verified", "items": [{"category": "South African applicants", "amount": "R200", "status": "verified"}, {"category": "SADC applicants", "amount": "R400", "status": "verified"}, {"category": "Other international applicants", "amount": "R550", "status": "verified"}], "refundable": false, "note": "Official page: “non-refundable application fee (RSA) R200, (SADC) 400 and International students other than SADC (R550)”."}, "workbookFee": "2027 application fee listed: RSA R200; SADC R400; other international R550.", "cao": null, "residenceModel": null, "resNote": {"text": "UMP’s online application guide says you add a residence application inside the same portal (“Add New Residence Application”) — it is a separate step from your academic application.", "status": "verified"}}, {"id": "wsu", "abbr": "WSU", "name": "Walter Sisulu University", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee/campus detail need confirmation", "source": {"url": "https://www.wsu.ac.za/", "status": "verified"}, "website": {"url": "https://www.wsu.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://applications.wsu.ac.za/", "status": "partial", "note": "Linked from WSU’s official homepage as “Apply Now”; the portal itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://www.wsu.ac.za/en/study-with-us/fees-financial-support", "status": "partial", "note": "Linked from WSU’s official homepage; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://www.wsu.ac.za/en/study-with-us/undergraduate-programmes/new-students/student-accommodation", "status": "partial", "note": "Linked from WSU’s official homepage (new undergraduate students); the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "How to apply: the process", "url": "https://www.wsu.ac.za/index.php/en/study-with-us/application-and-registration/how-to-apply-the-process", "kind": "apply", "status": "partial", "note": "Linked from WSU’s official homepage."}], "campuses": ["Mthatha", "Buffalo City/East London", "Butterworth", "Komani/Queenstown"], "campusNotes": ["Komani/Queenstown: verify current campus names and programmes"], "campusStatus": "review", "timing": "Typical application period often opens in the first half of the year and closes around Sep; verify current intake and faculty exceptions.", "dates": [{"kind": "close", "date": null, "label": "Typical closing period", "status": "review", "note": "Workbook: often opens in the first half of the year and closes around September. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: verify on the official application page.", "items": []}, "workbookFee": "Fee: verify on official application page.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "univen", "abbr": "UNIVEN", "name": "University of Venda", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.univen.ac.za/", "status": "verified"}, "website": {"url": "https://www.univen.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}, "funding": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": ["Thohoyandou (main campus)"], "campusNotes": [], "campusStatus": "review", "timing": "Typical cycle often closes around 30 Sep; verify current application opening and any programme exceptions.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: often closes around 30 September. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: verify on the official application page.", "items": []}, "workbookFee": "Fee: verify on official application page.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "ul", "abbr": "UL", "name": "University of Limpopo", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.ul.ac.za/", "status": "verified"}, "website": {"url": "https://www.ul.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://ulc-prod-webserver.ul.ac.za/pls/prodi41/gen.gw1pkg.gw1startup?x_processcode=ITS_OAP", "status": "partial", "note": "Linked from UL’s official homepage as “APPLY ONLINE”; the portal itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://www.ul.ac.za/admissions/undergraduate-studies/financial-support/", "status": "partial", "note": "Linked from UL’s official homepage as “Financial Support”; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": ["Turfloop", "Medunsa campus"], "campusNotes": ["Medunsa campus: health-sciences programmes, confirm current institutional arrangements"], "campusStatus": "review", "timing": "Typical cycle often opens around April and closes around Sep; programme exceptions apply.", "dates": [{"kind": "close", "date": null, "label": "Typical closing period", "status": "review", "note": "Workbook: often opens around April and closes around September; programme exceptions apply. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: third-party summaries report different fees by applicant category — confirm the official amount.", "items": []}, "workbookFee": "Fee: published third-party summaries report different fees by applicant category; confirm official amount before use.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "uwc", "abbr": "UWC", "name": "University of the Western Cape", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Partial: residence cycle sourced; academic dates/fee need confirmation", "source": {"url": "https://www.uwc.ac.za/admission-and-financial-aid/apply/residential-applications", "status": "review"}, "website": {"url": "https://www.uwc.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}, "funding": {"url": "https://www.uwc.ac.za/admission-and-financial-aid", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}, "residence": {"url": "https://www.uwc.ac.za/admission-and-financial-aid/apply/residential-applications", "status": "verified", "note": "Official UWC Residential Services page (opened 11 Oct 2026). Applications go through the Residence Portal.", "from": "workbook"}}, "extra": [], "campuses": ["Bellville (main campus)"], "campusNotes": [], "campusStatus": "review", "timing": "2027 residence page lists first-year applications opening 1 Apr 2026 and residence applications closing 31 Oct 2026; academic application deadlines vary by programme.", "dates": [{"kind": "resOpen", "date": "2026-04-01", "label": "First-year residence applications open", "status": "verified", "note": "Official residence page."}, {"kind": "resClose", "date": "2026-10-31", "label": "Residence applications close", "status": "verified", "note": "Official residence page. Allocation happens in January 2027; move-in in February 2027."}, {"kind": "close", "date": null, "label": "Academic closing dates", "status": "review", "note": "Workbook: academic application deadlines vary by programme. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: verify on the official application page; do not assume it is free.", "items": []}, "workbookFee": "Fee: verify on official application page; do not assume fee-free.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "ru", "abbr": "Rhodes", "name": "Rhodes University", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.ru.ac.za/", "status": "verified"}, "website": {"url": "https://www.ru.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://ross.ru.ac.za/ugadmissions", "status": "partial", "note": "Linked from Rhodes’ official homepage as “Apply Online”; the portal itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://www.ru.ac.za/studentfeesandfinancialaid/", "status": "partial", "note": "Linked from Rhodes’ official homepage as “Fees and Financial Aid”; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://www.ru.ac.za/residences/", "status": "partial", "note": "Linked from Rhodes’ official homepage as “Halls and Residences”; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "Admissions gateway", "url": "https://www.ru.ac.za/admissiongateway/", "kind": "apply", "status": "partial", "note": "Linked from Rhodes’ official homepage."}, {"label": "Oppidan (students living off campus)", "url": "https://www.ru.ac.za/oppidan/", "kind": "private", "status": "partial", "note": "Linked from Rhodes’ official homepage."}], "campuses": ["Makhanda (main campus)"], "campusNotes": [], "campusStatus": "review", "timing": "Typical undergraduate cycle opens around April and closes around 30 Sep; confirm current cycle and selected programme dates.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: typically opens around April and closes around 30 September. Not yet confirmed."}], "fee": {"status": "review", "items": [{"category": "Applicants (category not stated)", "amount": "R100 reported", "status": "review"}], "note": "Workbook: R100 reported for 2027 applications — not yet confirmed on an official page."}, "workbookFee": "R100 reported for 2027 applications; verify official current fee and exemptions.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "nmu", "abbr": "NMU", "name": "Nelson Mandela University", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: likely official section URLs; confirm page availability and fee/date exceptions", "source": {"url": "https://www.mandela.ac.za/Study-at-Mandela/Applications", "status": "review"}, "website": {"url": "https://www.mandela.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.mandela.ac.za/Study-at-Mandela/Application", "status": "verified", "note": "NMU’s official “Step 2: Application” page, linked from the homepage and opened on 11 Oct 2026. It links to online applications, closing dates, accommodation and funding.", "from": "official site", "workbook": {"url": "https://www.mandela.ac.za/Study-at-Mandela/Applications", "status": "review", "note": "The workbook’s link (…/Study-at-Mandela/Applications) did not load during PATHWAY’s check; NMU’s homepage links to …/Application instead."}}, "funding": {"url": "https://www.mandela.ac.za/Study-at-Mandela/Fees-and-Funding", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}, "residence": {"url": "https://www.mandela.ac.za/Study-at-Mandela/Accommodation", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}}, "extra": [{"label": "Online application portal", "url": "https://applyonline.mandela.ac.za/", "kind": "apply", "status": "partial", "note": "Linked from NMU’s official homepage."}], "campuses": ["Gqeberha: South Campus", "North Campus", "Second Avenue Campus", "Bird Street Campus", "George Campus"], "campusNotes": [], "campusStatus": "review", "timing": "Typical 2027 cycle opened 1 Apr 2026; many undergraduate programmes close 30 Sep 2026, with earlier exceptions possible.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: the 2027 cycle opened 1 April 2026 and many undergraduate programmes close 30 September 2026, with earlier exceptions. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: verify on the official application page for your applicant category.", "items": []}, "workbookFee": "Fee: verify on official application page for applicant category.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "unisa", "abbr": "UNISA", "name": "University of South Africa", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official dates and fee sourced; accommodation is not a standard residence-campus model", "source": {"url": "https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Undergraduate-qualifications", "status": "verified"}, "website": {"url": "https://www.unisa.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Undergraduate-qualifications", "status": "verified", "note": "Official Unisa undergraduate qualifications page (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Student-fees-and-funding-your-studies", "status": "verified", "note": "Official Unisa “Student fees and funding your studies” page (opened 11 Oct 2026). It covers bursaries and loans; the page was last modified in July 2025.", "from": "workbook"}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": [], "campusNotes": ["Primarily distance/online; regional service centres are not equivalent to residential campuses."], "campusStatus": "review", "timing": "2027 undergraduate applications: 17 Aug–9 Oct 2026 (official page).", "dates": [{"kind": "open", "date": "2026-08-17", "label": "Undergraduate applications open", "status": "verified", "note": "Official page."}, {"kind": "close", "date": "2026-10-09", "label": "Undergraduate applications close", "status": "verified", "note": "Official page: “between 17 August and 9 October 2026”."}], "fee": {"status": "partial", "items": [{"category": "First-time applicants", "amount": "R160 (from workbook)", "status": "review"}], "refundable": false, "note": "Unisa’s official fees page confirms the application fee is non-refundable but PATHWAY could not see the amount there. The workbook reports R160 — confirm it on Unisa’s site."}, "workbookFee": "R160 non-refundable online application fee for first-time applicants, according to official 2027 information.", "cao": null, "residenceModel": "distance", "resNote": null}, {"id": "nwu", "abbr": "NWU", "name": "North-West University", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.nwu.ac.za/", "status": "verified"}, "website": {"url": "https://www.nwu.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}, "funding": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": ["Potchefstroom", "Mahikeng", "Vanderbijlpark"], "campusNotes": [], "campusStatus": "review", "timing": "Typical cycle often opens around June and closes around 31 Aug; verify faculty-specific dates and current intake.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: typically opens around June and closes around 31 August. PATHWAY’s programme data for NWU lists a different opening date, so this needs confirming."}], "fee": {"status": "review", "note": "Workbook: verify on the official application portal; fee policies can differ by applicant category.", "items": []}, "workbookFee": "Fee: verify on official application portal; fee policies can differ by applicant category.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "uj", "abbr": "UJ", "name": "University of Johannesburg", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official admissions section URL; dates/fee/residence direct links need confirmation", "source": {"url": "https://www.uj.ac.za/admission-aid/undergraduate/", "status": "verified"}, "website": {"url": "https://www.uj.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.uj.ac.za/admission-aid/undergraduate/", "status": "verified", "note": "Official UJ undergraduate admissions page (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.uj.ac.za/admission-aid/", "status": "partial", "note": "UJ’s official Admissions + Aid page (opened 11 Oct 2026). It links to Student Finance rather than describing funding itself.", "from": "workbook"}, "residence": {"url": null, "status": "na", "note": "The workbook gave only the university’s homepage here. PATHWAY does not substitute the homepage for a dedicated page.", "from": null}}, "extra": [], "campuses": ["Auckland Park Kingsway", "Auckland Park Bunting Road", "Doornfontein", "Soweto"], "campusNotes": [], "campusStatus": "review", "timing": "Typical cycle opens around April and often closes around 31 Oct, but selected programmes may close earlier.", "dates": [{"kind": "open", "date": "2026-04-01", "label": "Undergraduate applications open", "status": "verified", "note": "Official page."}, {"kind": "close", "date": "2026-10-31", "label": "Undergraduate applications close (12:00)", "status": "verified", "note": "Official page: “Close: 31 October 2026 @ 12:00”. The page does not label the intake year in words."}, {"kind": "resOpen", "date": "2026-04-01", "label": "Student accommodation applications open", "status": "verified", "note": "Official Admissions + Aid page — first-time entering applicants only."}, {"kind": "resClose", "date": "2026-10-31", "label": "Student accommodation applications close (12:00)", "status": "verified", "note": "Official Admissions + Aid page."}], "fee": {"status": "review", "note": "No fee is stated on UJ’s undergraduate page. Workbook: verify on the official application page and applicant category.", "items": []}, "workbookFee": "Fee: verify on official application page and applicant category.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "wits", "abbr": "Wits", "name": "University of the Witwatersrand", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official dates/residence dates sourced; fee needs official confirmation", "source": {"url": "https://www.wits.ac.za/undergraduate/apply-to-wits/", "status": "verified"}, "website": {"url": "https://www.wits.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.wits.ac.za/undergraduate/apply-to-wits/", "status": "verified", "note": "Official “Apply to Wits” page (opened 11 Oct 2026). It currently says applications for the 2027 intake have closed.", "from": "workbook"}, "funding": {"url": "https://www.wits.ac.za/students/financial-aid-and-scholarships/", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}, "residence": {"url": "https://www.wits.ac.za/accommodation/applications/", "status": "verified", "note": "Official Wits residence applications page (opened 11 Oct 2026). Applications are made online through the Student Self-Service portal.", "from": "workbook"}}, "extra": [], "campuses": ["Braamfontein (main campus cluster)", "Wits Education Campus", "Parktown", "Medical School"], "campusNotes": [], "campusStatus": "review", "timing": "2027 undergraduate applications: most programmes closed 30 Sep 2026; selected Health Sciences, Architecture, Audiology, Speech-Language Pathology and Film/TV closed 30 Jun 2026. Residence applications opened 1 Apr and closed 30 Sep 2026.", "dates": [{"kind": "close", "date": "2026-06-30", "label": "Health Sciences, Architecture, Audiology, Speech-Language Pathology and Film & TV closed", "status": "verified", "note": "Official Apply to Wits page."}, {"kind": "close", "date": "2026-09-30", "label": "All other undergraduate programmes closed", "status": "verified", "note": "Official Apply to Wits page."}, {"kind": "resOpen", "date": "2026-04-01", "label": "Residence applications open", "status": "partial", "note": "The Apply to Wits page says 1 April 2026; the residence page says 17 April (no year). Confirm with Wits."}, {"kind": "resClose", "date": "2026-09-30", "label": "Residence applications close", "status": "verified", "note": "Official Apply to Wits page and residence page."}], "fee": {"status": "partial", "items": [{"category": "Applicants (category not stated)", "amount": "R100", "status": "verified"}, {"category": "International applicants", "amount": "R700 reported", "status": "review"}], "payTo": "Wits application fee account (details on the official page)", "note": "Official page: “An application fee of R100 is required.” It does not say whether this differs for international applicants — the workbook’s R700 figure is not confirmed. Refundability is not stated."}, "workbookFee": "R100 reported for SA applicants and R700 for international applicants; confirm official page before publishing.", "cao": null, "residenceModel": null, "resNote": {"text": "The Wits residence page says new students pay an initial instalment of R5 000 towards annual residence fees once placed (page refers to its 2026 policy).", "status": "partial"}}, {"id": "su", "abbr": "Stellenbosch", "name": "Stellenbosch University", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Partial: direct official section URLs should be checked; dates/fee need official confirmation", "source": {"url": "https://www.sun.ac.za/english/maties/apply", "status": "review"}, "website": {"url": "https://www.sun.ac.za/english", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.sun.ac.za/english/maties/apply", "status": "review", "note": "Stellenbosch’s website blocked PATHWAY’s automated check — confirm this page yourself.", "from": "workbook"}, "funding": {"url": "https://www.sun.ac.za/english/maties/fees", "status": "partial", "note": "Official SU fees page (opened 11 Oct 2026). It covers study and residence fees and payment, not bursaries in detail.", "from": "workbook"}, "residence": {"url": "https://www.sun.ac.za/english/maties/accommodation", "status": "review", "note": "Stellenbosch’s website blocked PATHWAY’s automated check — confirm this page yourself.", "from": "workbook"}}, "extra": [], "campuses": ["Stellenbosch", "Tygerberg", "Bellville Park (programme-specific)", "Saldanha (selected programmes)"], "campusNotes": [], "campusStatus": "review", "timing": "Typical 2027 undergraduate cycle opened 1 Apr and many programmes close 31 Jul 2026; check faculty/programme exceptions.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: the 2027 undergraduate cycle opened 1 April and many programmes close 31 July 2026, with faculty exceptions. Not yet confirmed."}], "fee": {"status": "review", "items": [{"category": "Applicants (category not stated)", "amount": "R100 reported", "status": "review"}], "note": "Workbook: R100 reported; applicants from quintile 1–4 schools may be exempt according to a third-party summary. Not confirmed — check SU’s official terms."}, "workbookFee": "R100 reported for applications; SA applicants from quintile 1–4 schools may be exempt according to third-party 2027 summary; verify official terms.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "uct", "abbr": "UCT", "name": "University of Cape Town", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official dates/fees sourced; residence/campus details should be checked", "source": {"url": "https://www.uct.ac.za/students/applications/key-dates", "status": "review"}, "website": {"url": "https://www.uct.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.uct.ac.za/students/applications-apply-undergraduate-qualifications", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself. UCT’s homepage links to the online application portal below.", "from": "workbook"}, "funding": {"url": "https://www.uct.ac.za/students/fees-funding", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}, "residence": {"url": "https://www.uct.ac.za/students/housing", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}}, "extra": [{"label": "Online application portal", "url": "https://applyonline.uct.ac.za", "kind": "apply", "status": "partial", "note": "Linked from UCT’s official homepage."}, {"label": "Key dates", "url": "https://www.uct.ac.za/students/applications/key-dates", "kind": "apply", "status": "verified", "note": "Official key dates page (opened 11 Oct 2026)."}, {"label": "Student financial aid", "url": "https://uct.ac.za/dsa/student-financial-aid", "kind": "funding", "status": "partial", "note": "Linked from UCT’s official homepage."}, {"label": "Campus life: housing", "url": "https://uct.ac.za/campus-life/housing", "kind": "residence", "status": "partial", "note": "Linked from UCT’s official homepage."}], "campuses": ["Upper Campus", "Middle Campus", "Lower Campus", "Hiddingh", "Health Sciences campus (Observatory)", "Breakwater (programme/site-specific)"], "campusNotes": [], "campusStatus": "review", "timing": "2027 undergraduate applications opened 1 Apr 2026 and closed 31 Jul 2026; no late applications stated on official key-dates page.", "dates": [{"kind": "open", "date": "2026-04-01", "label": "Applications open for the 2027 admission cycle", "status": "verified", "note": "Official key dates page."}, {"kind": "close", "date": "2026-07-31", "label": "Undergraduate applications close (no late applications)", "status": "verified", "note": "Official key dates page: “We do not consider late application requests.”"}, {"kind": "resClose", "date": "2026-07-31", "label": "Undergraduate housing applications close", "status": "verified", "note": "Official key dates page."}], "fee": {"status": "partial", "items": [{"category": "South African and SADC applicants", "amount": "R100", "status": "partial"}, {"category": "Applicants from outside SADC", "amount": "R300", "status": "partial"}], "note": "From the workbook, which cites UCT’s official application procedure. PATHWAY could not open that page to confirm."}, "workbookFee": "R100 for SA/SADC applicants; R300 for applicants outside SADC, per official application procedure.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "ukzn", "abbr": "UKZN", "name": "University of KwaZulu-Natal", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Official homepage only—direct links/date/fee need confirmation", "source": {"url": "https://www.ukzn.ac.za/", "status": "verified"}, "website": {"url": "https://www.ukzn.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://applications.ukzn.ac.za/", "status": "partial", "note": "Linked from UKZN’s official homepage as “How to apply” (it also covers financial aid and accommodation); the page itself was not opened.", "from": "official site", "workbook": null}, "funding": {"url": "https://applications.ukzn.ac.za/", "status": "partial", "note": "UKZN’s homepage links “Financial Aid” to its applications site; the page itself was not opened.", "from": "official site", "workbook": null}, "residence": {"url": "https://applications.ukzn.ac.za/", "status": "partial", "note": "UKZN’s homepage links “Accommodation” to its applications site; the page itself was not opened.", "from": "official site", "workbook": null}}, "extra": [{"label": "2027 online applications", "url": "https://ww1.applications.ukzn.ac.za/", "kind": "apply", "status": "partial", "note": "Linked from UKZN’s official homepage."}], "campuses": ["Howard College", "Westville", "Pietermaritzburg", "Edgewood", "Medical School (Durban)"], "campusNotes": [], "campusStatus": "review", "timing": "Many programmes use a cycle that closes around 30 Sep; some programmes have earlier deadlines. Confirm official dates and whether the programme is through CAO.", "dates": [{"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: many programmes close around 30 September, with earlier deadlines for some. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: verify the CAO or university fee for your applicant category.", "items": []}, "workbookFee": "Fee: verify CAO or university fee for applicant category.", "cao": {"uses": null, "status": "review", "note": "Workbook: confirm whether your programme is applied for through the CAO."}, "residenceModel": null, "resNote": null}, {"id": "ufs", "abbr": "UFS", "name": "University of the Free State", "intakeYear": 2027, "status": "review", "lastVerified": "2026-10-11", "workbookStatus": "Partial: official section links likely; confirm current application dates/fee", "source": {"url": "https://www.ufs.ac.za/prospective", "status": "partial"}, "website": {"url": "https://www.ufs.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.ufs.ac.za/prospective", "status": "partial", "note": "UFS’s official Student Recruitment page (opened 11 Oct 2026). It links onward to undergraduate applications and says “2027 online applications open 1 April”.", "from": "workbook"}, "funding": {"url": "https://www.ufs.ac.za/kovsielife/student-finance", "status": "review", "note": "This page loaded but is a general money-management page, not funding or bursary information — confirm UFS’s funding page yourself.", "from": "workbook"}, "residence": {"url": "https://www.ufs.ac.za/kovsielife/residences", "status": "review", "note": "The UFS website blocked PATHWAY’s automated check — confirm this page yourself.", "from": "workbook"}}, "extra": [], "campuses": ["Bloemfontein", "Qwaqwa", "South Campus (programme-specific"], "campusNotes": ["Confirm current offerings)"], "campusStatus": "review", "timing": "Typical 2027 cycle opened around April and closes around 31 Aug 2026 for many programmes; check programme exceptions.", "dates": [{"kind": "open", "date": "2026-04-01", "label": "Online applications open", "status": "partial", "note": "UFS recruitment page: “2027 online applications open 1 April”."}, {"kind": "close", "date": null, "label": "Typical closing date", "status": "review", "note": "Workbook: closes around 31 August 2026 for many programmes. Not yet confirmed."}], "fee": {"status": "review", "note": "Workbook: verify on the official prospective-student application page.", "items": []}, "workbookFee": "Fee: verify on official prospective-student application page.", "cao": null, "residenceModel": null, "resNote": null}, {"id": "up", "abbr": "UP", "name": "University of Pretoria", "intakeYear": 2027, "status": "partial", "lastVerified": "2026-10-11", "workbookStatus": "Partial: direct official section links likely; confirm programme dates and fee/exemption", "source": {"url": "https://www.up.ac.za/online-application", "status": "verified"}, "website": {"url": "https://www.up.ac.za/", "status": "verified", "note": "Official university website.", "from": "workbook"}, "links": {"apply": {"url": "https://www.up.ac.za/online-application", "status": "verified", "note": "Official UP online application page (opened 11 Oct 2026).", "from": "workbook"}, "funding": {"url": "https://www.up.ac.za/fees-and-funding", "status": "verified", "note": "Official UP Fees and Funding page (opened 11 Oct 2026) — bursaries, scholarships and loans.", "from": "workbook"}, "residence": {"url": "https://www.up.ac.za/residence-affairs", "status": "review", "note": "This page did not load during PATHWAY’s check — confirm it yourself.", "from": "workbook"}}, "extra": [{"label": "Student accommodation", "url": "https://www.up.ac.za/student-accommodation", "kind": "residence", "status": "partial", "note": "Linked from UP’s official homepage."}], "campuses": ["Hatfield", "Onderstepoort", "Prinshof", "Groenkloof", "Mamelodi", "Hillcrest sports campus"], "campusNotes": [], "campusStatus": "review", "timing": "2027 undergraduate cycle opened 1 Apr 2026; many programme applications closed 30 Jun 2026, with programme-specific differences.", "dates": [{"kind": "open", "date": "2026-04-01", "label": "Applications open for 2027", "status": "verified", "note": "Official page."}, {"kind": "close", "date": "2026-05-31", "label": "Veterinary Science closed", "status": "verified", "note": "Official page."}, {"kind": "close", "date": "2026-06-30", "label": "All other undergraduate programmes closed", "status": "verified", "note": "Official page."}], "fee": {"status": "review", "items": [{"category": "South African applicants", "amount": "R300 reported", "status": "review"}], "note": "UP’s online application page links to a separate fee page that PATHWAY did not open. Workbook: R300 reported for SA applicants, with a possible exemption for household income ≤ R150 000 — confirm the official terms."}, "workbookFee": "R300 reported for SA applicants; possible application-fee exemption for SA applicants with household income ≤R150,000; verify official terms.", "cao": null, "residenceModel": null, "resNote": {"text": "UP’s online application page says you indicate your residence preferences during your online application.", "status": "verified"}}];
/* APP_HUB:END */

/* ============================================================
   UNIVERSITY ENGINE — institution-specific scores and requirement checks (data: UNI_DB)
   ============================================================ */
const uniById = id => UNI_DB.find(x=>x.id===id);
const uniByName = n => UNI_DB.find(x=>x.name===n);
const courseById = id => { const [uid]=String(id||'').split('-'); return uniById(uid)?.courses.find(c=>c.id===id); };
const latestRec = u => { const k=latestKey(u); return k ? recOf(u)[k] : null; };
/* the learner's mark for a subject named in a requirement (null = the learner doesn't take it; undefined = can't tell) */
function subjectMark(rec, subject){
  const S=rec.subjects, M=rec.marks, isEng=n=>/english/i.test(n||'');
  if(/^English/.test(subject)){
    const hlE=isEng(S.hl), falE=isEng(S.fal);
    if(subject==='English Home Language') return hlE ? M.hl : (falE ? null : undefined);
    if(subject==='English First Additional Language') return falE ? M.fal : (hlE ? null : undefined);
    return hlE ? M.hl : falE ? M.fal : undefined;
  }
  if(subject==='Home Language') return M.hl;
  if(subject==='First Additional Language') return M.fal;
  const LANGS=['Afrikaans','isiNdebele','isiXhosa','isiZulu','Sepedi','Sesotho','Setswana','siSwati','Tshivenda','Xitsonga'];
  const lang=LANGS.find(l=>subject.startsWith(l));
  if(lang){ const inHL=(S.hl||'').startsWith(lang), inFAL=(S.fal||'').startsWith(lang);
    if(/Home Language$/.test(subject)) return inHL ? M.hl : null;
    if(/First Additional Language$/.test(subject)) return inFAL ? M.fal : null;
    return inHL ? M.hl : inFAL ? M.fal : null; }
  if(subject==='Technical Mathematics') return S.maths==='Technical Mathematics' ? M.maths : null;
  if(subject==='Mathematics') return S.maths==='Mathematics' ? M.maths : null;
  if(subject==='Mathematical Literacy') return S.maths==='Mathematical Literacy' ? M.maths : null;
  if(subject==='Life Orientation') return M.lo;
  const want=subject.replace(/Science$/,'Sciences');
  const k=['e1','e2','e3'].find(e=>(S[e]||'').replace(/Science$/,'Sciences')===want);
  return k ? M[k] : null;
}
const reqNeed = q => q.level!=null && q.pct!=null ? `Level ${q.level} (${q.pct}%)` : q.pct!=null ? `${q.pct}%` : `Level ${q.level}`;
const reqLabel = q => [q,...(q.alt||[])].map(x=>`${x.subject} ${reqNeed(x)}`).join(' or ');
/* status: meets · below · notTaken · unknown · notYet */
function evalReq(rec, q){
  if(!rec) return {status:'notYet'};
  const opts=[q,...(q.alt||[])]; let best=null, anyUnknown=false;
  for(const o of opts){ const m=subjectMark(rec,o.subject); if(m===undefined){ anyUnknown=true; continue; } if(m===null) continue;
    const ok = o.pct!=null ? m>=o.pct : level(m)>=o.level; const r={status: ok?'meets':'below', mark:m, opt:o};
    if(ok) return r; best=best||r; }
  if(best) return best;
  return {status: anyUnknown ? 'unknown' : 'notTaken'};
}
const STATUS_TXT = {notAccepted:'Not accepted for this programme', meets:'Meets published requirement', below:'Below published requirement', notTaken:'You don’t take this subject', unknown:'Not yet available', notYet:'Not yet available', na:'Not applicable'};
/* each university's own score, from the learner's latest results */
const levelOf8 = p => p>=90 ? 8 : level(p);
const ufsPts = p => p>=90?8 : p>=80?7 : p>=70?6 : p>=60?5 : p>=50?4 : p>=40?3 : p>=30?2 : 0;
function uniScore(u, uni, course){
  const method = course?.scoreMethod || uni?.score?.method;   /* a programme's own published method wins over the university default */
  const rec=latestRec(u); if(!rec || !method) return null;
  const M=rec.marks, six=APS_KEYS.map(k=>Number(M[k])||0);
  const eng = /english/i.test(rec.subjects.hl)?'hl':/english/i.test(rec.subjects.fal)?'fal':null;
  const r1 = v => Math.round(v*10)/10;
  switch(method){
    case 'cputM1': return r1(six.reduce((s,p)=>s+p,0)/10);   /* CPUT Method 1: six best subjects (LO excluded), percentages ÷ 10 */
    case 'cputM2': case 'cputM3': {   /* CPUT Method 2: 2×Maths + 2×Physical Sciences + English + next best · Method 3: 2×Maths + 2×Accounting + English + next three */
      const second = method==='cputM2' ? 'Physical Sciences' : 'Accounting', ek=['e1','e2','e3'].find(k=>(rec.subjects[k]||'').replace(/Science$/,'Sciences')===second);
      if(!eng || !ek || rec.subjects.maths==='Mathematical Literacy') return null;
      const rest=APS_KEYS.filter(k=>![eng,'maths',ek].includes(k)).map(k=>Number(M[k])||0).sort((a,b)=>b-a).slice(0, method==='cputM2'?1:3);
      return r1((2*(Number(M.maths)||0) + 2*(Number(M[ek])||0) + (Number(M[eng])||0) + rest.reduce((s,p)=>s+p,0))/10); }
    case 'cutAP': { const pts=p=>p>=90?8:p>=80?7:p>=70?6:p>=60?5:p>=50?4:p>=40?3:p>=30?2:0; return six.reduce((s,p)=>s+pts(p),0) + ((Number(M.lo)||0)>=50?1:0); }
    case 'mutPoints': { const pts=p=>p>=90?8:p>=80?7:p>=70?6:p>=60?5:p>=50?4:p>=40?3:0; return [...six].map(pts).sort((a,b)=>b-a).slice(0,5).reduce((s,x)=>s+x,0); }
    case 'levels7': return six.reduce((s,p)=>s+level(p),0);
    case 'levels8': return six.reduce((s,p)=>s+levelOf8(p),0);
    case 'nwuAPS':  return six.reduce((s,p)=>s+levelOf8(p),0);   /* NWU scale: 90–100% = 8 … 0–29% = 1 */
    case 'wsuAPS':  return six.reduce((s,p)=>s+levelOf8(p),0);   /* WSU 2027 conversion: 90–100% = 8 … 0–30% = 1 */
    case 'tutAPS':  return six.reduce((s,p)=>s+(level(p)>1?level(p):0),0);   /* TUT: LO and Level-1 subjects excluded */
    case 'spuAPS': { const bonus = p => p>=60?2 : p>=40?1 : 0, lo=Number(M.lo)||0;   /* SPU: levels (8 at 90–100%) + Maths/Home Language bonus + LO points */
      return six.reduce((s,p)=>s+levelOf8(p),0) + (rec.subjects.maths==='Mathematics' ? bonus(Number(M.maths)||0) : 0) + bonus(Number(M.hl)||0) + (lo>=90?4 : lo>=80?3 : lo>=70?2 : lo>=60?1 : 0); }
    case 'rhodesPct': case 'univenPct': return Math.round(six.reduce((s,p)=>s+(p>=40?p/10:0),0)*10)/10;   /* percentage ÷ 10 from 40%, LO excluded */
    case 'uwcPoints': { const eng = /english/i.test(rec.subjects.hl)?'hl':/english/i.test(rec.subjects.fal)?'fal':null; if(!eng) return null;
      const L = p => p>=90?8:level(p), EM={8:15,7:13,6:11,5:9,4:7,3:5,2:3,1:1}, LOt={8:3,7:3,6:2,5:2,4:2,3:1,2:1,1:1};
      const other = eng==='hl'?'fal':'hl';
      return EM[L(Number(M[eng])||0)] + L(Number(M[other])||0) + (rec.subjects.maths==='Mathematics' ? EM[L(Number(M.maths)||0)] : L(Number(M.maths)||0)) + LOt[L(Number(M.lo)||0)] + ['e1','e2','e3'].reduce((s,k)=>s+L(Number(M[k])||0),0); }
    case 'ufsAP':   return six.reduce((s,p)=>s+ufsPts(p),0) + ((Number(M.lo)||0)>=60?1:0);
    case 'witsAPS': { const eng = /english/i.test(rec.subjects.hl)?'hl':/english/i.test(rec.subjects.fal)?'fal':null; if(!eng) return null;
      const wp = p => p>=90?8 : p>=80?7 : p>=70?6 : p>=60?5 : p>=50?4 : p>=40?3 : 0;
      const bonus = k => ((k===eng) || (k==='maths' && rec.subjects.maths==='Mathematics')) && (Number(M[k])||0)>=60 ? 2 : 0;
      const lo = Number(M.lo)||0, loPts = lo>=90?4 : lo>=80?3 : lo>=70?2 : lo>=60?1 : 0;
      return APS_KEYS.reduce((s,k)=>s+wp(Number(M[k])||0)+bonus(k),0) + loPts; }
    case 'uctPct': { const eng = /english/i.test(rec.subjects.hl)?'hl':/english/i.test(rec.subjects.fal)?'fal':null; if(!eng) return null;
      const others=APS_KEYS.filter(k=>k!==eng).map(k=>Number(M[k])||0).sort((a,b)=>b-a).slice(0,5);
      return [Number(M[eng])||0, ...others].reduce((s,p)=>s+(p>=40?p:0),0); }
  }
  return null;
}
const uniScoreLabel = uni => uni?.score?.method ? `${uni.abbr} ${uni.score.label}` : 'score';
/* a Study Target's comparison — always against the target university's own method */
function targetAnalysis(u, c){
  const course=c.courseId ? courseById(c.courseId) : null, uni=c.uniId ? uniById(c.uniId) : uniByName(c.uni);
  const progMethod = course?.scoreMethod || null;
  const usesUni = !!(progMethod || uni?.score?.method);   /* always the target university's (or programme's) own method when Pathway knows it */
  const noMethod = !!(uni && !progMethod && !uni.score?.method);   /* e.g. Stellenbosch: no published programme scores in the data */
  const score = noMethod ? null : usesUni ? uniScore(u, uni, course) : currentAps(u);
  const rec0=latestRec(u), myMaths=rec0?.subjects?.maths;
  let min = course ? course.minScore : targetMin(c), minNote=null, generalMin=false;
  if(min==null && !course?.minByMaths && uni?.generalMin!=null){ min=uni.generalMin; generalMin=true; }   /* e.g. CUT's general AP threshold, when no programme minimum is known */
  if(course?.minByMaths){ if(!rec0) min=null; else if(course.minByMaths[myMaths]!=null) min=course.minByMaths[myMaths]; else { min=null; minNote=`${uni.abbr} publishes a minimum for ${Object.keys(course.minByMaths).join(' / ')} only.`; } }
  const label = uni?.score?.term && uni.score.term!=='score' ? uni.score.term : 'APS';
  const max = usesUni ? uni.score.max : 42;
  let st;
  if(noMethod) st={cls:'mute', t: uni.score.desc};
  else if(score==null) st={cls:'mute', t: !latestRec(u) ? 'Add your results to compare.' : ['uctPct','witsAPS','uwcPoints'].includes(uni?.score?.method) ? 'Name your English subject in your results so Pathway can estimate this score.' : /cputM[23]/.test(progMethod||'') ? `This programme’s ${course.scoreMethodName} needs ${progMethod==='cputM2'?'Mathematics and Physical Sciences':'Mathematics and Accounting'} (and English) in your subjects.` : 'Pathway can’t calculate this score from your current subjects.'};
  else if(min==null && minNote) st={cls:'mute', t:minNote};
  else if(min==null) st={cls:'mute', t: course ? (course.minText ? (/not in the workbook|Not published/i.test(course.minText) ? `${course.minText}, so there’s nothing to compare yet.` : `Published minimum: ${course.minText} — not a single number, so Pathway doesn’t compare it.`) : 'No published minimum score for this programme in Pathway yet.') : 'Add the published minimum from the prospectus to compare.'};
  else st = score>=min ? {cls:'ok', t:`Your projected ${label} meets the published minimum requirement.`} : {cls:'warn', t:(g=>`Your projected ${label} is currently ${g} point${g===1?'':'s'} below the published minimum requirement.`)(Math.round((min-score)*10)/10)};
  const rec=latestRec(u);
  const band = uni?.selectionBand && score!=null && (!course) ? (score>=uni.selectionBand[0] && score<=uni.selectionBand[1]) : false;
  const reqs = (course?.reqs||[]).map(q=>({q, ...evalReq(rec,q)}));
  (course?.notAccepted||[]).forEach(x=>{ if(rec && rec.subjects.maths===x) reqs.push({q:{subject:x, text:'not accepted'}, status:'notAccepted'}); });
  return {course, uni, score, min, label, max, st, reqs, generalMin, band, selection: course?.selectionReq || null};
}
/* application dates from the imported data */
const APPLICATION_DATES = UNI_DB.flatMap(uni=>uni.dates.map(d=>({uniId:uni.id, uni:uni.name, abbr:uni.abbr, ...d})));

/* ---------- MY THREE STUDY TARGETS — University → University information → Course → Requirements → Add (max 3) ---------- */
const uniMono = n => n.replace(/\(.*?\)/g,'').split(/\s+/).filter(w=>w && !['of','the','and'].includes(w.toLowerCase())).map(w=>w[0]).join('').slice(0,4).toUpperCase();
const uniBadge = (n,abbr,big) => `<span class="unibadge${big?' big':''}" aria-hidden="true">${esc(abbr||uniMono(n))}</span>`;
const minChip = (uni,c) => c.minByMaths ? `<span class="schip dna">Published minimum ${Object.entries(c.minByMaths).map(([m,v])=>`${v} (${m.replace('Mathematical Literacy','Maths Lit').replace('Technical Mathematics','Tech Maths')})`).join(' · ')}</span>` : c.minScore!=null ? `<span class="schip dna">Published minimum ${c.minScore}</span>` : c.minText ? `<span class="schip mute">${esc(c.minText)}</span>` : '<span class="schip mute">Minimum not published in Pathway</span>';
const reqChips = c => (c.reqs||[]).filter(q=>q.subject!=='Life Orientation').slice(0,4).map(q=>`<span class="tag">${esc(reqLabel(q))}</span>`).join('');
const MIN_DISCLAIMER = 'Meeting the published minimum does not guarantee admission. Universities may consider additional subject requirements, selection criteria, programme capacity and other factors.';
const PATHWAY_PURPOSE = 'Pathway uses your projected APS to help you track your progress against published minimum requirements. Aim higher where possible.';
/* score + status block (no "out of" — the projected APS stands on its own next to the published minimum) */
function scoreBlock(A){
  const st = A.score==null || A.min==null ? {cls:'mute', ic:'—', t:'Not yet available'} : A.score>=A.min ? {cls:'ok', ic:'✓', t:'Meets published minimum'} : {cls:'warn', ic:'⚠', t:'Does not yet meet published minimum'};
  return `<div class="scorepair"><div class="spbox"><small>Projected ${esc(A.label)}</small><b>${A.score!=null?A.score:'—'}</b>${A.uni?.score?.method&&A.uni.score.method!=='levels7'?`<em>calculated the ${esc(A.uni.abbr)} way</em>`:''}</div>
    <div class="spbox"><small>Published minimum</small><b>${A.min!=null?A.min:'—'}</b>${A.min==null&&A.course?.minText?`<em>${esc(A.course.minText)}</em>`:''}</div></div>
    <p class="standing ${st.cls}"><span class="sti">${st.ic}</span> ${st.t}${A.score==null||A.min==null?` <span class="hint">· ${esc(A.st.t)}</span>`:''}</p>`;
}
/* subject requirements — separate from APS, using the latest submitted results */
function subjectReqBlock(u, A){
  if(!A.reqs.length) return '';
  const lvl = r => r.opt && r.opt.pct!=null && r.opt.level==null ? `${r.mark}%` : `Level ${level(r.mark)}${r.opt?.pct!=null?` (${r.mark}%)`:''}`;
  const ST = {notAccepted:['warn','⚠ Not accepted for this programme'], meets:['ok','✓ Meets requirement'], below:['warn','⚠ Not yet met'], notTaken:['warn','⚠ You don’t take this subject'], unknown:['mute','— Not yet available'], notYet:['mute','— Not yet available']};
  return `<div class="subreq"><h4>Subject requirements</h4><p class="hint">These requirements are separate from your ${esc(A.label)}.</p>
    ${A.reqs.map(r=>{ const [cls,t]=ST[r.status]||ST.notYet; const sub=[r.q,...(r.q.alt||[])].map(x=>x.subject).join(' or '), need=[r.q,...(r.q.alt||[])].map(x=>reqNeed(x)).filter((v,i,a)=>a.indexOf(v)===i).join(' / ');
      if(r.status==='notAccepted') return `<div class="sreq ${cls}"><b>${esc(sub)}</b><span><small>Required</small>Not accepted</span><span><small>You take</small>${esc(sub)}</span><em>${t}</em></div>`;
      return `<div class="sreq ${cls}"><b>${esc(sub)}</b><span><small>Required</small>${esc(need)}</span><span><small>Your current level</small>${r.mark!=null?esc(lvl(r)):'—'}</span><em>${t}</em></div>`; }).join('')}
    ${gradeOf(u)==='10'&&latestRec(u)?`<p class="hint">Early indicator — universities use final Grade 11 and Grade 12 results.</p>`:''}${latestKey(u)?`<p class="hint">Based on your ${esc(rkLabel(latestKey(u)))} results.</p>`:''}</div>`;
}
function uniInfoPage(uni){
  const I_=uni.info||{}, dts=uni.dates||[];
  const facts=(I_.applyFacts||[]).map(([k,v])=>`<div class="ifact inner"><small>${esc(k)}</small><b>${esc(v)}</b></div>`).join('');
  return `<section class="glass fsec2 stbuild uniinfo">
    <div class="kicker2">Step 2 of 4 · University information</div>
    <div class="uihead">${uniBadge(uni.name,uni.abbr,true)}<div><h2>${esc(uni.name)}</h2><p class="hint">${esc(uni.abbr)} · ${esc(I_.year||uni.dataYear+' intake')}${uni.campuses?` · ${esc(uni.campuses)}`:''}</p></div></div>
    ${(I_.about||[]).length?`<div class="uisec"><h4>About ${esc(uni.abbr)}</h4>${I_.about.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`:''}
    <div class="uisec"><h4>How ${esc(uni.abbr)} calculates your admission score</h4><p>${esc(uni.score.desc||'')}</p>${uni.score.assumption?`<p class="hint">${I('info')} ${esc(uni.score.assumption)}</p>`:''}</div>
    ${(I_.admission||[]).length?`<div class="uisec"><h4>Admission information</h4><ul class="plist">${I_.admission.map(x=>`<li>${I('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>`:''}
    ${facts?`<div class="uisec"><h4>Applications (${uni.dataYear} intake)</h4><div class="ifacts">${facts}</div></div>`:''}
    ${(I_.nbt||[]).length?`<div class="uisec"><h4>National Benchmark Tests (NBT)</h4><ul class="plist">${I_.nbt.map(([g,r])=>`<li>${I('file')}<span><b>${esc(g)}:</b> ${esc(r)}</span></li>`).join('')}</ul></div>`:''}
    <div class="uisec"><h4>Faculties</h4>${(I_.facultyInfo||[]).length?`<div class="ifacts">${I_.facultyInfo.map(([f,d])=>`<div class="ifact inner"><b>${esc(f)}</b><small>${esc(d)}</small></div>`).join('')}</div>`:`<div class="tags">${uni.faculties.map(f=>`<span class="tag">${esc(f)}</span>`).join('')}</div>`}<p class="hint">${uni.courses.length} programme${uni.courses.length===1?'':'s'} in Pathway.</p></div>
    ${(I_.sources||[]).length?`<details class="xpand solo uisrc"><summary>Official sources ${I('down')}</summary><div class="whyb"><ul class="plist">${I_.sources.map(([t,url])=>`<li>${I('file')}<span>${/^https?:/.test(url)?`<a class="link" href="${esc(url)}" target="_blank" rel="noopener">${esc(t)}</a>`:esc(t+(url?' — '+url:''))}</span></li>`).join('')}</ul></div></details>`:''}
    <div class="actions"><button class="btn btn-ghost" id="stback1">${I('back')} Choose another university</button><button class="btn btn-purple" id="stproceed">Proceed to choose course ${ARROW}</button></div></section>`;
}
function studyTargetsPage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), T=F.courseTargets, full=T.length>=3, qs=new URLSearchParams(location.hash.split('?')[1]||''), preCareer=qs.get('career')||'';
    const step = VIEW.step||0, uniName = VIEW.uni||'', uni=uniByName(uniName);
    const cards = T.map((c,i)=>targetCardV2(u,c,i)).join('');
    let builder='';
    if(step===0) builder = full ? `<p class="hint">${I('info')} You have three Study Targets — the maximum. Remove one to add another.</p>` : `<button class="btn btn-purple" id="stnew">${I('plus')} ${T.length===0?'Create your first Study Target':T.length===1?'Add your second Study Target':'Add your third Study Target'}</button>`;
    if(step===1){ const q=(VIEW.uq||'').toLowerCase(), inDb=UNIVERSITIES.filter(x=>uniByName(x.name)), rest=UNIVERSITIES.filter(x=>!uniByName(x.name));
      const card = x => { const d=uniByName(x.name); if(q && !x.name.toLowerCase().includes(q) && !(d?.abbr||'').toLowerCase().includes(q)) return ''; return `<button class="unic pick glassy" data-pickuni="${esc(x.name)}">${uniBadge(x.name,d?.abbr)}<b>${esc(x.name)}</b><small>${d?`${d.courses.length} programmes · ${d.dataYear} intake data`:'Course list not in Pathway yet'}</small>${d?.campuses?`<small class="camp">${esc(d.campuses)}</small>`:''}</button>`; };
      builder = `<section class="glass fsec2 stbuild"><div class="kicker2">Step 1 of 4</div><h2>Choose your university</h2>
        <div class="fsearch" style="max-width:520px;margin:10px 0 14px">${I('search')}<label class="sr" for="uq">Search universities</label><input id="uq" type="search" placeholder="Search universities…" value="${esc(VIEW.uq||'')}"></div>
        <h4 class="fh">Universities with 2027 data in Pathway</h4><div class="unigrid">${inDb.map(card).join('')}</div>
        <h4 class="fh">Other public universities</h4><div class="unigrid">${rest.map(card).join('')}</div>
        <div class="actions"><button class="btn btn-ghost" id="stcancel">Cancel</button></div></section>`; }
    if(step===15 && uni) builder = uniInfoPage(uni);
    if(step===2 && uni){ const q=(VIEW.cq||'').toLowerCase(), fac=VIEW.fac||'';
      const list=uni.courses.filter(c=>(!fac||c.faculty===fac) && (!q || (c.name+' '+c.faculty).toLowerCase().includes(q)));
      builder = `<section class="glass fsec2 stbuild"><div class="kicker2">Step 3 of 4 · ${esc(uni.abbr)}</div><h2>Choose your course</h2>
        <div class="cfilter"><div class="fsearch">${I('search')}<label class="sr" for="cq">Search courses</label><input id="cq" type="search" placeholder="Search ${esc(uni.abbr)} courses…" value="${esc(VIEW.cq||'')}"></div>
          <label class="sr" for="cfac">Faculty</label><select class="input" id="cfac"><option value="">All faculties</option>${uni.faculties.map(f=>`<option ${f===fac?'selected':''}>${esc(f)}</option>`).join('')}</select></div>
        <p class="hint">${list.length} of ${uni.courses.length} ${esc(uni.abbr)} programmes · ${esc(uni.dataYear)} intake requirements</p>
        ${!uni.courses.length?`<div class="infonote inner">${I('info')}<span>${esc(uni.abbr)}’s individual 2027 programmes aren’t in Pathway’s data yet. Use “My course isn’t listed” to add your programme from ${esc(uni.abbr)}’s official information — Pathway will compare it with ${esc(uni.abbr)}’s own scoring rules.</span></div>`:''}
        <div class="clist">${list.map(c=>c.inactive?`<div class="ccourse inactive"><div><b>${esc(c.name)}</b><small>${esc(c.faculty)} · Not accepting applications for ${uni.dataYear}</small></div></div>`:`<button class="ccourse" data-pickcourse="${c.id}"><div><b>${esc(c.name)}</b><small>${esc(c.faculty)}${c.duration?` · ${esc(c.duration)}`:''}${c.selection?' · Selection programme':''}</small></div>${minChip(uni,c)}<div class="tags">${reqChips(c)}</div></button>`).join('')||'<p class="hint">No courses match.</p>'}</div>
        <div class="actions"><button class="btn btn-ghost" id="stbackinfo">${I('back')} University information</button><button class="link" id="stmanual">My course isn’t listed</button></div></section>`; }
    if(step===25 && uni && VIEW.course){ const co=courseById(VIEW.course), pseudo={uni:uni.name, uniId:uni.id, courseId:co.id, course:co.name, faculty:co.faculty}, A=targetAnalysis(u,pseudo);
      builder = `<section class="glass fsec2 stbuild"><div class="kicker2">Step 4 of 4 · Course requirements</div>
        <div class="confirm inner"><small>Study Target</small><div class="cfrow"><span>University</span><b>${esc(uni.name)}</b></div><div class="cfrow"><span>Course</span><b>${esc(co.name)}</b></div><div class="cfrow"><span>Faculty</span><b>${esc(co.faculty)}</b></div></div>
        ${latestRec(u)?fitBlock(u,pseudo,A,fitStatus(u,pseudo,A))+whySuit(u,pseudo,A):''}${scoreBlock(A)}${subjectReqBlock(u,A)}
        ${co.other?`<div class="uisec"><h4>Published requirements</h4><p>${esc(co.other)}</p></div>`:''}${co.notes?`<p class="hint">${esc(co.notes)}</p>`:''}${co.specialScore?`<p><b>${esc(co.specialScore)}</b></p>`:''}${co.nbt?`<p class="hint"><b>NBT:</b> ${esc(co.nbt)}</p>`:''}${co.portfolio?`<p class="hint"><b>Portfolio / audition:</b> ${esc(co.portfolio)}</p>`:''}${co.selection?'<p class="hint">Selection programme — additional selection criteria apply.</p>':''}${co.deadline?`<p class="hint">Programme closing date: ${fmtShort(co.deadline)}</p>`:''}
        <p class="mindisc">${I('info')} <span>${esc(MIN_DISCLAIMER)} ${esc(PATHWAY_PURPOSE)}</span></p>
        <div class="actions"><button class="btn btn-ghost" id="stbackcourse">${I('back')} Choose another course</button><button class="btn btn-gold" id="stadd" ${full?'disabled':''}>Add to My Three Study Targets ${ARROW}</button></div></section>`; }
    if(step===3){
      builder = `<form id="cf" class="glass fsec2 stbuild" novalidate><div class="kicker2">${uni?'Add a course that isn’t listed':'Step 2 of 2'} · ${esc(uniName)}</div><h2>${uni?'Add your course':`Choose a course at ${esc(uniName)}`}</h2>
        <div class="infonote inner">${I('info')}<span>${uni?'Type the course exactly as it appears in the official prospectus.':`Pathway doesn’t have ${esc(uniName)}’s course list yet. Type the course exactly as it appears in the official prospectus.`} Anything you add here is marked as entered by you.</span></div>
        <div class="subjset" style="margin-top:14px">
          <label>Course or qualification<input class="input" id="c-course" maxlength="80" placeholder="e.g. BCom Accounting"></label>
          <label>Faculty (optional)<input class="input" id="c-fac" maxlength="60"></label>
          <label>Published minimum APS (optional)<input class="input" id="c-min" inputmode="numeric" maxlength="3" placeholder="From the official prospectus"></label>
          <label>Career it connects to (optional)<select class="input" id="c-career"><option value="">None yet</option>${CAREERS.map(x=>`<option ${preCareer===x.name?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>
          <label class="wide">Subject and other requirements (optional)<input class="input" id="c-reqs" maxlength="160"></label>
        </div><div class="err" id="cf-e"></div><div class="actions"><button type="button" class="btn btn-ghost" id="stback">${I('back')} Back</button><button class="btn btn-purple" type="submit">Add to My Three Study Targets ${ARROW}</button></div></form>`; }
    return fetTop(u,initials,planTxt,'My targets','My Three Study Targets','A Study Target is a university and a course. Choose up to three — from one university or different ones.') + `
      <div class="qcnt" style="margin:14px 0 4px">${T.length} of 3 Study Targets</div>
      ${F.justTarget ? nextPanel('Study Target added.', [['Check its subject requirements','#/targets'],['What if I improve my results?','#/what-if?ctx=target'+(T.length?'&c='+T[T.length-1].id:'')],['See After Matric steps','#/after-matric']]) : ''}
      <div class="actions" style="margin:6px 0 4px"><a class="btn btn-ghost btn-sm" href="#/what-if?ctx=results">${I('spark')} What If?</a></div>
      ${WHY_THREE}
      ${T.length?`<p class="mindisc">${I('info')} <span>${esc(MIN_DISCLAIMER)} ${esc(PATHWAY_PURPOSE)}</span></p>`:''}
      ${cards}<div style="margin-top:16px">${builder}</div>${T.length?BEYOND_MIN:''}`; });
}
function targetDetails(u,c,A){
  const uni=A.uni, co=A.course; if(!uni) return `<div class="stdetail inner"><p>${c.reqs?`Requirements you noted: ${esc(c.reqs)}`:'No requirements added yet.'}</p></div>`;
  const dls=APPLICATION_DATES.filter(d=>d.uniId===uni.id && (!d.courses || d.courses.some(p=>(co?.name||c.course).includes(p) || (co?.faculty||'').includes(p))) && (!d.faculties || d.faculties.includes(co?.faculty||c.faculty)));
  return `<div class="stdetail inner">
    ${co?.other?`<h4>Published requirements</h4><p>${esc(co.other)}</p>`:''}
    ${co?.notes?`<p>${esc(co.notes)}</p>`:''}${co?.specialScore?`<p><b>${esc(co.specialScore)}</b></p>`:''}
    ${co?.nbt?`<p><b>NBT:</b> ${esc(co.nbt)}</p>`:''}${co?.portfolio?`<p><b>Portfolio / audition:</b> ${esc(co.portfolio)}</p>`:''}${co?.choice?`<p><b>Choice restrictions:</b> ${esc(co.choice)}</p>`:''}
    ${co?.status?`<p class="hint">Data status: ${esc(co.status)}</p>`:''}
    <h4>How ${esc(uni.abbr)} works out your score</h4><p>${esc(uni.score.desc||'')}</p>${uni.score.assumption?`<p class="hint">${I('info')} ${esc(uni.score.assumption)}</p>`:''}
    <h4>Applying to ${esc(uni.abbr)} (${uni.dataYear} intake)</h4><ul class="plist">${dls.map(d=>`<li>${I('calendar')}<span><b>${fmtShort(d.date)}</b> — ${esc(d.title)}${d0(d.date)<today()?' (passed)':''}</span></li>`).join('')}
      ${uni.apply.fee?`<li>${I('card')}<span>Application fee: ${esc(uni.apply.fee)}</span></li>`:''}${uni.apply.method?`<li>${I('file')}<span>${esc(uni.apply.method)}</span></li>`:''}${uni.apply.choices?`<li>${I('info')}<span>${esc(uni.apply.choices)} — ${esc(uni.abbr)}’s own application limit, separate from your three Pathway targets.</span></li>`:''}</ul>
    ${gradeOf(u)!=='12'?`<p class="hint">${I('info')} These are ${uni.dataYear}-intake requirements and dates. They can change by the time you apply.</p>`:''}
    <p class="hint">Source: ${co?.source&&/^https?:/.test(co.source)?`<a class="link" href="${esc(co.source)}" target="_blank" rel="noopener">${esc(uni.name)} official information</a>`:esc(co?.source||uni.sources[0]?.title||'')}</p></div>`;
}
studyTargetsPage.after = () => { if(fetOf(me()).justTarget){ fetOf(me()).justTarget=false; save(); } const F=fetOf(me()), top=()=>document.querySelector('.stbuild')?.scrollIntoView({behavior:'smooth',block:'start'});
  const keepFocus=(id,key)=>{ const el=document.getElementById(id); if(el) el.addEventListener('input',()=>{ VIEW[key]=el.value; const p=el.selectionStart; render(); const n=document.getElementById(id); n.focus(); n.setSelectionRange(p,p); }); };
  keepFocus('uq','uq'); keepFocus('cq','cq');
  const setV=(v)=>{ VIEW=v; render(); top(); };
  document.getElementById('cfac')?.addEventListener('change',e=>{ VIEW.fac=e.target.value; render(); });
  document.getElementById('stnew')?.addEventListener('click',()=>setV({step:1}));
  document.getElementById('stcancel')?.addEventListener('click',()=>{ VIEW={}; render(); });
  document.getElementById('stback1')?.addEventListener('click',()=>setV({step:1}));
  document.getElementById('stproceed')?.addEventListener('click',()=>setV({step:2, uni:VIEW.uni}));
  document.getElementById('stbackinfo')?.addEventListener('click',()=>setV({step:15, uni:VIEW.uni}));
  document.getElementById('stbackcourse')?.addEventListener('click',()=>setV({step:2, uni:VIEW.uni}));
  document.getElementById('stmanual')?.addEventListener('click',()=>setV({step:3, uni:VIEW.uni}));
  document.getElementById('stback')?.addEventListener('click',()=>setV(uniByName(VIEW.uni) ? {step:2, uni:VIEW.uni} : {step:1}));
  document.querySelectorAll('[data-pickuni]').forEach(b=>b.addEventListener('click',()=>setV({step:uniByName(b.dataset.pickuni)?15:3, uni:b.dataset.pickuni})));
  document.querySelectorAll('[data-pickcourse]').forEach(b=>b.addEventListener('click',()=>setV({step:25, uni:VIEW.uni, course:b.dataset.pickcourse})));
  document.getElementById('stadd')?.addEventListener('click',()=>{ if(F.courseTargets.length>=3) return; const co=courseById(VIEW.course), uni=uniById(co.id.split('-')[0]);
    const pre=(new URLSearchParams(location.hash.split('?')[1]||'')).get('career')||'';
    F.courseTargets.push({id:'c'+Date.now().toString(36), uniId:uni.id, courseId:co.id, uni:uni.name, course:co.name, faculty:co.faculty, career:pre, minAps:null, reqs:''}); F.justTarget=true; save(); VIEW={}; history.replaceState(null,'','#/targets'); render(); toast(`Study Target ${F.courseTargets.length} created.`,'check'); });
  document.querySelectorAll('[data-crm]').forEach(b=>b.addEventListener('click',()=>{ F.courseTargets=F.courseTargets.filter(c=>c.id!==b.dataset.crm); save(); render(); }));
  document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>{ VIEW.open = VIEW.open===b.dataset.open ? null : b.dataset.open; render(); }));
  document.getElementById('cf')?.addEventListener('submit',e=>{ e.preventDefault();
    const course=document.getElementById('c-course').value.trim(), min=document.getElementById('c-min').value.trim(), er=document.getElementById('cf-e');
    if(!course){ er.textContent='Type the course name.'; return; }
    if(min && (!/^\d+$/.test(min) || +min>600)){ er.textContent='Minimum should be a whole number.'; return; }
    if(F.courseTargets.length>=3) return;
    F.courseTargets.push({id:'c'+Date.now().toString(36), uni:VIEW.uni, uniId:uniByName(VIEW.uni)?.id, course, faculty:document.getElementById('c-fac').value.trim(), career:document.getElementById('c-career').value, minAps: min===''?null:+min, reqs:document.getElementById('c-reqs').value.trim()});
    save(); VIEW={}; history.replaceState(null,'','#/targets'); render(); toast('Study Target saved.','check'); });
};

/* ============================================================
   STUDY TARGET DETAIL · MATRIC OUTCOME POSITION · OVERALL PERFORMANCE · NOTIFICATIONS (Grades 10–12; notifications 9–12)
   ============================================================ */
const fmtDate = s => s ? fmtShort(s) : null;
/* score vs minimum: one scale that always shows clearly whether the score is above or below the minimum */
function compareViz(A){
  if(A.score==null || A.min==null) return '';
  const top=Math.max(A.score,A.min)*1.15, pct=v=>Math.min(100,v/top*100), above=A.score>=A.min, diff=Math.round(Math.abs(A.score-A.min)*10)/10;
  return `<div class="cmpviz ${above?'ok':'bad'}" role="img" aria-label="Your score ${A.score}, published minimum ${A.min}">
    <div class="cv-track"><i class="cv-fill" style="width:${pct(A.score)}%"></i><span class="cv-min" style="left:${pct(A.min)}%"><em>Minimum ${A.min}</em></span><span class="cv-you" style="left:${pct(A.score)}%"><em>You ${A.score}</em></span></div>
    <p class="cv-diff">${above?`${diff===0?'Exactly at':`${diff} point${diff===1?'':'s'} above`} the published minimum`:`${diff} point${diff===1?'':'s'} below the published minimum`}</p></div>`;
}
/* the subjects that matter for this target, term by term */
function subjectHistory(u, A){
  const keys=approvedKeys(u); if(!keys.length) return '<p>Not enough results yet.</p>';
  const subs=[...new Set(A.reqs.flatMap(r=>[r.q,...(r.q.alt||[])].map(x=>x.subject)))];
  const rows=subs.map(sub=>{ const cells=keys.map(k=>{ const m=subjectMark(recOf(u)[k],sub); return m==null?null:m; }); if(cells.every(x=>x==null)) return '';
    return `<tr><th>${esc(sub)}</th>${cells.map(m=>`<td>${m==null?'—':`${m}% ${lvChip(m)}`}</td>`).join('')}</tr>`; }).join('');
  return rows ? `<div class="src-table"><table><tr><th>Subject</th>${keys.map(k=>`<th>${rkLabel(k).replace('Grade ','Gr ')}</th>`).join('')}</tr>${rows}</table></div><p class="hint">Every submitted term stays in your record — nothing is replaced.</p>` : '<p>This programme has no subject requirements in Pathway’s data, so there’s no subject history to show.</p>';
}
const NBT_EXPLAIN = 'The National Benchmark Tests (NBT) are tests some universities use alongside your school results. They assess academic and quantitative literacy (AQL) and, for some programmes, mathematics (MAT). You register and write them through the official NBT website.';
function nbtBlock(A){
  const own=A.course?.nbt, uniN=(A.uni?.info?.nbt||[]).filter(([g])=>!A.course || g==='All programmes' || g==='Undergraduate admission' || g==='General admission' || (A.course.faculty||'').includes(g) || g.includes(A.course.faculty||'@'));
  return `${own?`<p><b>This programme:</b> ${esc(own)}</p>`:''}${uniN.map(([g,r])=>`<p><b>${esc(A.uni.abbr)} — ${esc(g)}:</b> ${esc(r)}</p>`).join('')}
    ${!own&&!uniN.length?`<p>Pathway’s data for this programme doesn’t list an NBT requirement. That doesn’t confirm one isn’t needed — check with ${esc(A.uni?.abbr||'the university')}.</p>`:''}
    <p class="hint">${I('info')} ${NBT_EXPLAIN}</p>`;
}
function datesBlock(u, c, A){
  const uni=A.uni, co=A.course, t=today();
  const open=uni?.apply?.open, closeDate = co?.deadline || (uni?.dates||[]).filter(d=>d.kind==='application' && /close/i.test(d.title) && !d.courses && !d.faculties).map(d=>d.date).sort().pop() || uni?.apply?.close;
  const status = !closeDate && !open ? 'Dates not in Pathway’s data yet' : open && t<d0(open) ? 'Not open yet' : closeDate && t>d0(closeDate) ? `The ${uni?.dataYear||''} closing date has passed` : 'Applications are open';
  return `<div class="ifacts">
    <div class="ifact inner"><small>Applications open</small><b>${fmtDate(open)||esc(uni?.apply?.openNote||'Not in Pathway’s data')}</b></div>
    <div class="ifact inner"><small>${co?.deadline?'Programme closes':'Applications close'}</small><b>${fmtDate(closeDate)||'Not in Pathway’s data'}</b></div>
    <div class="ifact inner"><small>Application fee</small><b>${esc(uni?.apply?.fee||'Not in Pathway’s data')}</b></div>
    <div class="ifact inner"><small>Current status</small><b class="${/passed/.test(status)?'warn':''}">${esc(status)}</b></div></div>
    ${uni?.apply?.choices?`<p class="hint">${esc(uni.abbr)} allows ${esc(uni.apply.choices)} — separate from your three Pathway targets.</p>`:''}
    ${gradeOf(u)!=='12'?`<p class="hint">${I('info')} These are ${uni?.dataYear||''}-intake dates. You’ll apply in a later cycle, so your own dates will be different.</p>`:''}
    <p class="planonly">${I('info')} PATHWAY helps you plan and track. It does not submit applications.</p>`;
}
function notesBlock(c, A){
  const co=A.course, parts=[co?.other, co?.notes, co?.specialScore, co?.portfolio&&('Portfolio / audition: '+co.portfolio), co?.choice&&('Choice restrictions: '+co.choice), co?.selection&&'This is a selection programme — additional selection criteria apply.', co?.status&&('Data status: '+co.status), !co&&c.reqs&&('Requirements you noted: '+c.reqs)].filter(Boolean);
  return (parts.length?parts.map(x=>`<p>${esc(x)}</p>`).join(''):'<p>No extra programme notes in Pathway’s data.</p>') + (co?.source&&/^https?:/.test(co.source)?`<p class="hint">Source: <a class="link" href="${esc(co.source)}" target="_blank" rel="noopener">${esc(A.uni.name)} official information</a></p>`:'');
}
function reqBlock2(u, A){
  if(!A.reqs.length) return '<p>No subject requirements for this programme are in Pathway’s data. Check the programme notes and the university’s prospectus.</p>';
  const ST={meets:['ok','Currently met'], below:['bad','Not currently met'], notTaken:['bad','Not currently met — you don’t take this subject'], notAccepted:['bad','Not accepted for this programme'], unknown:['mute','Not enough results yet'], notYet:['mute','Not enough results yet']};
  return A.reqs.map(r=>{ const [cls,t]=ST[r.status]||ST.notYet; const sub=[r.q,...(r.q.alt||[])].map(x=>x.subject).join(' or ');
    const need=r.status==='notAccepted'?'Not accepted':[r.q,...(r.q.alt||[])].map(x=>reqNeed(x)).filter((v,i,a)=>a.indexOf(v)===i).join(' / ');
    return `<div class="rq2 ${cls}"><span class="dot"></span><div><b>${esc(sub)}</b><small>Required: ${esc(need)}</small></div><div><small>Your current result</small><b>${r.mark!=null?`${r.mark}% / Level ${level(r.mark)}`:'—'}</b></div><em>${t}</em></div>`; }).join('')
    + (latestKey(u)?`<p class="hint">Compared with your ${esc(rkLabel(latestKey(u)))} results.${gradeOf(u)==='10'?' An early indicator — universities use final Grade 11 and 12 results.':''}</p>`:'');
}
function selectionBlock(A){
  const parts=[A.selection, A.course?.inactive && 'This programme is not accepting applications for this intake.', A.band && `${A.uni.abbr}: scores of ${A.uni.selectionBand.join('–')} points need a selection test.`].filter(Boolean);
  return (parts.length ? parts.map(x=>`<p>${esc(x)}</p>`).join('') : '<p>No additional selection requirements are listed in Pathway’s data for this programme.</p>')
    + '<p class="hint">These are separate from your academic results. Meeting the academic minimum doesn’t mean you have been accepted.</p>';
}
const sec = (id,title,body,open) => `<details class="tsec"${open?' open':''}><summary>${title}<span class="pm">${I('plus')}</span></summary><div class="tsb">${body}</div></details>`;
function targetCardV2(u, c, i){
  const A=targetAnalysis(u,c), g=gradeOf(u), above=A.score!=null&&A.min!=null&&A.score>=A.min, FS=fitStatus(u,c,A);
  const diff = A.score!=null&&A.min!=null ? Math.round(Math.abs(A.score-A.min)*10)/10 : null;
  const selStep = /test|portfolio|interview|audition|questionnaire|placement|ranking|ranked|screening|assessment|review component/i.test(A.selection||'');
  const st = A.score==null||A.min==null ? ['mute','—',A.score==null&&!latestRec(u)?'Not enough results yet':'Not yet available']
    : A.band ? ['amber','!',`You’re in ${A.uni.abbr}’s selection-test band (${A.uni.selectionBand.join('–')} points) — a selection test would be required.`]
    : above ? (selStep ? ['amber','✓',`Above the published minimum by ${diff} — a selection step still applies (see “Selection and additional requirements”).`] : ['ok','✓',`Above the published minimum${diff?` by ${diff} point${diff===1?'':'s'}`:''}.`])
    : ['bad','✕',`Below the published minimum — ${diff} point${diff===1?'':'s'} to go.`];
  return `<article class="glass stcard v2">
    <div class="sthead">${uniBadge(c.uni, A.uni?.abbr)}<div><small>Study Target ${i+1} · ${esc((c.uni||'').toUpperCase())}${A.uni?` • ${A.uni.dataYear}`:''}</small><h3>${esc(c.course)}</h3><p>${(A.course?.faculty||c.faculty)?`Faculty: ${esc(A.course?.faculty||c.faculty)}`:''}</p></div><div class="tact"><button class="btn btn-ghost btn-sm" data-crm="${c.id}">Remove</button></div></div>
    ${fitBlock(u,c,A,FS)}${whySuit(u,c,A)}
    <div class="scorepair"><div class="spbox"><small>Projected ${esc(A.label)}</small><b>${A.score!=null?A.score:'—'}</b>${A.uni?.score?.method&&A.uni.score.method!=='levels7'?`<em>calculated the ${esc(A.uni.abbr)} way</em>`:''}</div><div class="spbox"><small>${A.generalMin?`General ${esc(A.uni.abbr)} minimum`:'Published minimum'}</small><b>${A.min!=null?A.min:'—'}</b>${A.generalMin?'<em>no programme minimum in Pathway’s data</em>':A.min==null&&A.course?.minText?`<em>${esc(A.course.minText)}</em>`:''}${A.course?.scoreMethodName&&A.course.scoreMethod?`<em>${esc(A.course.scoreMethodName)}</em>`:''}</div></div>
    ${compareViz(A)}
    <p class="hint">Meeting the minimum published requirements does not guarantee admission.${g==='12'?' Final admission depends on your final NSC results and the university’s selection.':''}</p>
    ${sec('Subject requirements',`Subject requirements <small class="secmeta">${A.reqs.length?`${A.reqs.filter(r=>r.status==='meets').length} of ${A.reqs.length} currently met`:'none listed'}</small>`,reqBlock2(u,A), A.reqs.some(r=>r.status!=='meets'))}
    ${sec('Subject history','Subject history',subjectHistory(u,A))}
    ${sec('Selection','Selection and additional requirements',selectionBlock(A))}
    ${sec('NBT','NBT',nbtBlock(A))}
    ${sec('Dates and applying','Dates and applying',datesBlock(u,c,A))}
    ${sec('Programme notes','Programme notes',notesBlock(c,A))}
    <div class="actions"><a class="btn btn-ghost btn-sm" href="#/progress">View progress</a>${appsAllowed(u) && A.uni && APP_HUB.some(r=>r.id===A.uni.id) ? `<a class="btn btn-ghost btn-sm" href="#/apply/uni?id=${esc(A.uni.id)}">${esc(A.uni.abbr)} application info</a>` : ''}</div>
  </article>`;
}
const WHY_THREE = `<details class="glass whythree"><summary>${I('info')} Why only three? <span class="pm">${I('plus')}</span></summary><div class="tsb"><p>Three targets give you a manageable set of programmes to actively track in Pathway — enough to compare options without losing focus.</p><p><b>You are not limited to these three when you apply.</b> You can explore other universities and programmes at any time, swap a target for another, and change your plans as they develop. Each university also has its own limit on how many programmes you can apply for.</p></div></details>`;
const BEYOND_MIN = `<section class="glass beyond"><h3>${I('trend')} Look beyond the minimum</h3><p>A published minimum is a starting point, not the finish line. Stronger results can matter for opportunities such as bursaries, scholarships, academic awards and competitive programmes, where selection often looks well above the minimum.</p><p class="hint">Requirements for each opportunity are set by the organisation offering it — no particular mark guarantees any of them.</p></section>`;

/* ---------- overall academic performance (an average of your results — not an APS, not a university aggregate) ---------- */
function overallPerformance(u){
  const rec=latestRec(u); if(!rec) return '';
  const vals=FET_KEYS.map(k=>Number(rec.marks[k])||0), avg=Math.round(vals.reduce((s,x)=>s+x,0)/vals.length*10)/10;
  const ser=approvedKeys(u).map(k=>{ const m=recOf(u)[k].marks; return {k, avg:Math.round(FET_KEYS.reduce((s,x)=>s+(Number(m[x])||0),0)/FET_KEYS.length*10)/10}; });
  const prev=ser[ser.length-2];
  return `<section class="glass fsec2 overall"><h2>Overall academic performance</h2>
    <div class="ovrow"><div class="ovbig">${avg}%<small>average</small></div><div><p>The average of your seven subjects in your ${esc(rkLabel(latestKey(u)))} results${prev?` (${avg>=prev.avg?'up':'down'} from ${prev.avg}% in ${esc(rkLabel(prev.k))})`:''}. This is a simple average — it isn’t an APS and it isn’t an official university aggregate.</p>
    <p class="hint">Your overall results can matter for opportunities such as bursaries, scholarships and academic recognition. Specific requirements vary by programme or award.</p></div></div></section>`;
}

/* ---------- matric outcome position (Grades 11–12): DBE NSC achievement levels, as an indicator only ----------
   DBE: NSC = 40% in Home Language + 40% in two other subjects + 30% in three other subjects (six of seven subjects).
   Higher Certificate = NSC + 30% in the language of learning and teaching (LoLT) of the institution.
   Diploma = NSC + 40% in four recognised 20-credit subjects (Life Orientation is not a 20-credit subject) + 30% LoLT.
   Bachelor = NSC + 50% in four subjects from the designated list (not Life Orientation) + 30% LoLT. */
const DESIGNATED = ['Accounting','Agricultural Sciences','Business Studies','Consumer Studies','Dramatic Arts','Economics','Engineering Graphics and Design','Geography','History','Information Technology','Life Sciences','Mathematics','Mathematical Literacy','Music','Physical Sciences','Religion Studies','Visual Arts'];
function matricPosition(u){
  const rec=latestRec(u); if(!rec) return null;
  const S=rec.subjects, M=k=>Number(rec.marks[k])||0, all=FET_KEYS, nonLO=all.filter(k=>k!=='lo');
  const name=k=>subjName(S,k);
  const hl=M('hl'), others=all.filter(k=>k!=='hl').map(M).sort((a,b)=>b-a);
  const nsc = hl>=40 && others.filter(x=>x>=40).length>=2 && all.filter(k=>M(k)>=30).length>=6;   /* 40% HL + 40% in two others + 30% in three others */
  const lolt = ['hl','fal'].filter(k=>/English|Afrikaans/.test(S[k]||'')).map(M), loltOK = lolt.length ? Math.max(...lolt)>=30 : null;
  const dip40 = nonLO.filter(k=>M(k)>=40).length>=4;
  const desig = k => (k==='hl'||k==='fal') ? true : DESIGNATED.includes(k==='maths' ? S.maths : S[k]);   /* languages count; other subjects must be on the designated list */
  const bach50 = nonLO.filter(k=>M(k)>=50 && desig(k)).length, bachUnsure = nonLO.filter(k=>M(k)>=50 && !desig(k)).map(name);
  const lv = (ok,unsure) => ok===null ? 'check' : ok ? 'ok' : unsure ? 'check' : 'bad';
  const res = [
    {t:'Bachelor’s degree', st: !nsc ? 'bad' : loltOK===null ? 'check' : !loltOK ? 'bad' : bach50>=4 ? 'ok' : (bach50+bachUnsure.length>=4 ? 'check' : 'bad'),
      need: bach50<4 ? `${bach50} of 4 designated subjects at 50% or more${bachUnsure.length?` (check whether ${bachUnsure.join(', ')} count${bachUnsure.length===1?'s':''} as designated)`:''}` : null},
    {t:'Diploma', st: !nsc ? 'bad' : loltOK===null ? 'check' : (loltOK && dip40 ? 'ok' : 'bad'), need: !dip40 ? `${nonLO.filter(k=>M(k)>=40).length} of 4 subjects at 40% or more (not Life Orientation)` : null},
    {t:'Higher Certificate', st: !nsc ? 'bad' : lv(loltOK), need: loltOK===false ? 'Language of learning and teaching (English or Afrikaans) at 30% or more' : null},
    {t:'National Senior Certificate', st: nsc ? 'ok' : 'bad', need: nsc ? null : [hl<40?'Home Language at 40% or more':null, others.filter(x=>x>=40).length<2?'two other subjects at 40% or more':null, all.filter(k=>M(k)>=30).length<6?'six of seven subjects at 30% or more':null].filter(Boolean).join('; ')}
  ];
  return {res, loltOK, key:latestKey(u)};
}
function matricHTML(u){
  if(!['11','12'].includes(gradeOf(u))) return '';
  const P=matricPosition(u);
  if(!P) return `<section class="glass fsec2 matric"><h2>Your matric outcome position</h2><p>Add your results to see your current position.</p></section>`;
  const icon={ok:'🟢',bad:'🔴',check:'🟡'}, word={ok:'Currently meets the published minimum',bad:'Currently below the published minimum',check:'Check with your school'};
  return `<section class="glass fsec2 matric"><div class="jhead"><h2>Your matric outcome position</h2><span class="schip mute">Current indicator — not a final result</span></div>
    <p class="hint">Based on your ${esc(rkLabel(P.key))} results. Your results can change, and your final NSC outcome depends on your final Grade 12 results (including school-based assessment requirements).</p>
    <div class="mlist">${P.res.map(r=>`<div class="mrow2 ${r.st}"><span>${icon[r.st]}</span><div><b>${r.t}</b><small>${word[r.st]}${r.need?` — needs attention: ${esc(r.need)}`:''}</small></div></div>`).join('')}</div>
    ${P.loltOK===null?`<p class="hint">${I('info')} Higher education levels also need 30% in the institution’s language of learning and teaching (usually English or Afrikaans). Choose your languages in your results so Pathway can check this.</p>`:''}
    <p class="hint">${I('info')} These are the national minimums set by the Department of Basic Education. University and programme requirements can be higher — you can reach a Bachelor’s level and still not meet a particular programme’s requirements. <a class="link" href="#/pathway-101">Learn more in Pathway 101</a></p></section>`;
}

/* ============================================================
   APPLICATIONS HUB (Grades 11–12) — university application, funding and residence information.
   Data: APP_HUB (imported from the applications workbook + verification log). Admission requirements stay in UNI_DB.
   Any UNI_DB university without an APP_HUB record still appears, honestly marked "Not available".
   ============================================================ */
const APPS_GRADES = ['11','12'];
const appsAllowed = u => APPS_GRADES.includes(gradeOf(u));
const AH_ST = {verified:['ok','check','Verified'], partial:['blue','info','Partially verified'], review:['warn','flag','Needs review'], na:['mute','minus','Not available']};
const ahChip = (s, txt) => { const x=AH_ST[s]||AH_ST.na; return `<span class="schip ${x[0]} ahchip">${I(x[1])}${txt||x[2]}</span>`; };
const ahExt = (url, label, cls='link') => url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer external">${label}<span aria-hidden="true" class="ahx">↗</span><span class="sr"> (opens the university’s website in a new tab)</span></a>` : '';
const ahIntake = u => today().getFullYear() + (gradeOf(u)==='12' ? 1 : 2);   /* Grade 12 now → next year's intake; Grade 11 → the one after */
const ahDate = s => s ? fmtShort(s) : '';
function appHubList(){
  const have = new Set(APP_HUB.map(r=>r.id));
  const stub = x => ({id:x.id, abbr:x.abbr, name:x.name, stub:true, status:'na', intakeYear:x.dataYear, dates:[], campuses:[], campusNotes:[], extra:[],
    website:{url:'https://www.'+String(x.site).replace(/^www\./,'')+'/', status:'review', note:'Website address from PATHWAY’s university data; not yet checked for the Applications hub.'},
    links:{apply:{status:'na'},funding:{status:'na'},residence:{status:'na'}}, fee:{status:'na',items:[]}, source:{}});
  return [...APP_HUB, ...UNI_DB.filter(x=>!have.has(x.id)).map(stub)].map(r=>({...r, uni:uniById(r.id)})).sort((a,b)=>a.name.localeCompare(b.name));
}
const ahRec = id => appHubList().find(r=>r.id===id);
const ahTargets = u => fetOf(u).courseTargets.map(c=>({c, id:c.uniId || uniByName(c.uni)?.id})).filter(x=>x.id);
const ahIsUoT = r => /University of Technology/i.test(r.name);
/* application status for a card — only from verified dates that apply to this learner's intake */
function ahStatus(u, r){
  if(r.intakeYear!==ahIntake(u)) return null;
  const t=today(), V=(r.dates||[]).filter(d=>d.status==='verified' && d.date), at=d=>d0(d.date);
  const opens=V.filter(d=>d.kind==='open').map(at).sort((a,b)=>a-b)[0], closes=V.filter(d=>d.kind==='close').sort((a,b)=>at(a)-at(b));
  const next=closes.find(d=>at(d)>=t);
  if(next && (!opens || opens<=t)) return {tone:'ok', open:true, text:`Applications open · closes ${ahDate(next.date)}`};
  if(next && opens>t) return {tone:'blue', text:`Applications open ${fmtLong(opens)}`};
  if(closes.length) return {tone:'mute', text:`${r.intakeYear} applications closed ${ahDate(closes[closes.length-1].date)}`};
  const res=V.filter(d=>d.kind==='resClose' && at(d)>=t)[0];
  if(res) return {tone:'blue', text:`Residence applications close ${ahDate(res.date)}`};
  return null;
}
function ahLinkBlock(l, what, abbr){   /* a structured URL with its honest status */
  if(!l || !l.url) return `<div class="ahlink inner na"><div>${ahChip('na')}<p>${esc(l?.note||`No dedicated ${what} has been confirmed yet.`)}</p></div></div>`;
  return `<div class="ahlink inner"><div>${ahChip(l.status, l.status==='verified'?'Verified link':l.status==='partial'?'Awaiting full verification':'Awaiting verification')}<p>${esc(l.note||'')}</p></div>${ahExt(l.url, `Open ${esc(abbr)}’s ${what}`, 'btn btn-ghost btn-sm')}</div>`;
}
function ahDatesList(u, r, kinds){
  const D=(r.dates||[]).filter(d=>kinds.includes(d.kind)); if(!D.length) return '';
  const t=today();
  return `<ul class="ahdates">${D.map(d=>{ const past=d.date && d0(d.date)<t;
    return `<li class="inner"><div class="ahd">${d.date?`<b>${ahDate(d.date)}</b>`:'<b>Date not confirmed</b>'}${d.date?`<small>${past?'Passed':'Upcoming'}</small>`:''}</div><div><span>${esc(d.label)}</span><p class="hint">${esc(d.note||'')}</p></div>${ahChip(d.status)}</li>`; }).join('')}</ul>`;
}

function appsHubPage(){
  return shell((u,initials,planTxt)=>{ const g=gradeOf(u), list=appHubList(), mine=new Set(ahTargets(u).map(x=>x.id)), f=VIEW.ahf||'all';
    const filters=[['all','All universities'], ...(mine.size?[['mine','My Study Target universities']]:[]), ...(g==='12'?[['open','Open now']]:[]), ['uot','Universities of technology'], ['checked','Has verified details']];
    const card = r => { const st=g==='12'?ahStatus(u,r):null, loc=r.uni?.location || (r.campuses||[]).slice(0,3).join(' · ') || (r.campusNotes||[])[0] || '';
      return `<a class="ahcard glass" href="#/apply/uni?id=${esc(r.id)}" data-ah="${esc((r.name+' '+r.abbr+' '+(r.uni?.abbr||'')).toLowerCase())}" data-mine="${mine.has(r.id)?1:0}" data-open="${st?.open?1:0}" data-uot="${ahIsUoT(r)?1:0}" data-checked="${r.status!=='review'&&r.status!=='na'?1:0}" aria-label="${esc(r.name)} — view application details">
        <div class="ahtop">${uniBadge(r.name, r.abbr)}<div class="ahname"><b>${esc(r.name)}</b><small>${esc(r.abbr)}${mine.has(r.id)?' · In your Study Targets':''}</small></div></div>
        ${loc?`<p class="ahloc">${I('pin')}<span>${esc(loc)}</span></p>`:''}
        <div class="ahmeta">${ahChip(r.status, r.status==='na'?'Application info not added yet':null)}${st?`<span class="schip ${st.tone} ahchip">${I('calendar')}${esc(st.text)}</span>`:''}</div>
        <span class="ahview">View details ${ARROW}</span></a>`; };
    return fetTop(u,initials,planTxt,`Grade ${esc(u.grade)} · Plan`,'University Applications','Explore how to apply to South Africa’s public universities — official application portals, NSFAS and other funding, fees, dates, residences and campuses, in one place.') + `
      <section class="glass fsec2 ahintro">
        <div class="ahsearch"><div class="fsearch">${I('search')}<label class="sr" for="ahq">Search universities by name or acronym</label><input id="ahq" type="search" placeholder="Search by name or acronym, e.g. UJ or Pretoria" value="${esc(VIEW.ahq||'')}" autocomplete="off"></div></div>
        <div class="ahfilters" role="group" aria-label="Filter universities">${filters.map(([k,t])=>`<button class="chip ahf${f===k?' on':''}" data-ahf="${k}" aria-pressed="${f===k}">${t}</button>`).join('')}</div>
        <p class="hint ahcount" id="ahcount" aria-live="polite"></p>
        ${g==='11'?`<div class="infonote inner">${I('info')}<span><b>You’ll apply next year.</b> Grade 11 learners usually apply during Grade 12 for the following year’s intake. The dates and fees here are for the ${list[0]?.intakeYear||2027} intake — they show you what to expect and will change for your intake.</span></div>`:''}
        <div class="ahlegend">${['verified','partial','review'].map(s=>ahChip(s)).join('')}<span class="hint">PATHWAY checks details against official university websites and labels anything it could not confirm.</span></div>
      </section>
      <div class="ahgrid" id="ahgrid">${list.map(card).join('')}</div>
      <p class="hint ahnone" id="ahnone" hidden>No universities match. Try a different name or acronym.</p>
      <p class="planonly">${I('info')} PATHWAY helps you plan. It does not submit applications, and having access to an application portal does not mean you meet a programme’s admission requirements.</p>`;
  });
}
appsHubPage.after = () => {
  const q=document.getElementById('ahq'); if(!q) return;
  const apply=()=>{ const t=(VIEW.ahq||'').trim().toLowerCase(), f=VIEW.ahf||'all'; let n=0;
    document.querySelectorAll('.ahcard').forEach(c=>{ const ok=(!t || c.dataset.ah.includes(t)) && (f==='all' || c.dataset[f]==='1'); c.hidden=!ok; if(ok) n++; });
    document.getElementById('ahcount').textContent=`${n} universit${n===1?'y':'ies'}`; document.getElementById('ahnone').hidden=n>0; };
  q.addEventListener('input',()=>{ VIEW.ahq=q.value; apply(); });
  document.querySelectorAll('[data-ahf]').forEach(b=>b.addEventListener('click',()=>{ VIEW.ahf=b.dataset.ahf; document.querySelectorAll('[data-ahf]').forEach(x=>{ const on=x===b; x.classList.toggle('on',on); x.setAttribute('aria-pressed',on); }); apply(); }));
  apply();
};

function appsUniPage(){
  return shell((u,initials,planTxt)=>{ const id=new URLSearchParams(location.hash.split('?')[1]||'').get('id'), r=ahRec(id), g=gradeOf(u);
    if(!r) return fetTop(u,initials,planTxt,'Plan · Applications','University not found','') + `<section class="glass fsec2"><p>We couldn’t find that university.</p><div class="actions"><a class="btn btn-ghost" href="#/apply">${I('back')} All universities</a></div></section>`;
    const L=r.links, A=r.abbr, intake=ahIntake(u), applies=r.intakeYear===intake, tg=ahTargets(u).filter(x=>x.id===r.id), uni=r.uni;
    const st=g==='12'?ahStatus(u,r):null, extra=k=>(r.extra||[]).filter(x=>x.kind===k);
    const extraList = k => extra(k).length ? `<ul class="ahextra">${extra(k).map(x=>`<li>${ahExt(x.url, esc(x.label))} ${ahChip(x.status)}<small class="hint">${esc(x.note)}</small></li>`).join('')}</ul>` : '';
    const dates=r.dates||[], vd=k=>dates.filter(d=>d.kind===k && d.status==='verified' && d.date);
    const feeItems=(r.fee?.items||[]);
    const intakeNote = applies ? `These are for the ${r.intakeYear} intake — the one you’re applying for.` : `These are for the ${r.intakeYear} intake. You’ll apply for the ${intake} intake, so dates and fees will change — use them to plan, and check the official website when ${A}’s ${intake} cycle opens.`;
    const sec = (key,icon,title,body) => `<section class="glass fsec2 ahsec" id="ah-${key}" aria-labelledby="ah-${key}-h"><h2 id="ah-${key}-h"><span class="pub-ic">${I(icon)}</span>${title}</h2>${body}</section>`;
    const nav=[['overview','Overview'],['apply','Apply to Study'],['funding','NSFAS & Funding'],['fees','Fees & Dates'],['res','Residences'],['campuses','Campuses'],['faq','FAQs']];

    /* ---- A. Overview ---- */
    const overview = `<div class="ahov">${uniBadge(r.name,A,true)}<div><h3>${esc(r.name)}</h3><p class="hint">${esc(A)}${uni?.location?` · ${esc(uni.location)}`:''}</p></div></div>
      <div class="ifacts"><div class="ifact inner"><small>Official website</small><b>${ahExt(r.website?.url, esc(String(r.website?.url||'').replace(/^https:\/\//,'').replace(/\/$/,'')))}</b>${ahChip(r.website?.status||'review')}</div>
        <div class="ifact inner"><small>Campuses</small><b>${esc((r.campuses||[]).join(' · ') || (r.campusNotes||[])[0] || 'Not confirmed yet')}</b></div>
        <div class="ifact inner"><small>Information status</small><b>${ahChip(r.status)}</b><small>Last checked against official sources: ${r.lastVerified?fmtShort(r.lastVerified):'not yet'}</small></div></div>
      ${tg.length?`<div class="infonote inner">${I('target')}<span><b>In your Study Targets:</b> ${tg.map(x=>esc(x.c.course)).join(', ')}. <a class="link" href="#/targets">See how you’re tracking</a> — admission depends on ${esc(A)}’s requirements and selection, not on applying.</span></div>`
        : uni ? `<p class="hint ahtg">${I('target')} ${uni.courses.length?`${esc(A)} has ${uni.courses.length} programmes with ${uni.dataYear} requirements in PATHWAY. `:''}${fetOf(u).courseTargets.length<3?`<a class="link" href="#/targets">Add a Study Target</a> to track a programme here.`:`<a class="link" href="#/targets">My Three Study Targets</a>`}</p>` : ''}`;

    /* ---- B. Apply to Study ---- */
    const ap=L.apply||{};
    const applyBtn = ap.url ? (ap.status==='verified' ? ahExt(ap.url, `Apply on the Official Website`, 'btn btn-purple') : ahExt(ap.url, `Open ${esc(A)}’s application page`, 'btn btn-ghost')) : '';
    const applyBody = `${ap.url?`<div class="ahcta">${applyBtn}<div>${ahChip(ap.status, ap.status==='verified'?'Verified link':'Awaiting verification')}<p class="hint">${esc(ap.note||'')} This opens ${esc(A)}’s own website in a new tab.</p></div></div>`
        : `<div class="infonote inner">${I('info')}<span>A dedicated ${esc(A)} application page hasn’t been confirmed yet, so PATHWAY isn’t linking one. Start from ${esc(A)}’s official homepage: ${ahExt(r.website?.url, 'official website (homepage)')}.</span></div>`}
      ${ap.workbook?.url?`<p class="hint ahwb">${I('flag')} The workbook’s link is ${ahExt(ap.workbook.url,'this page')} — ${esc(ap.workbook.note)}</p>`:''}
      <div class="ifacts ahfacts">
        <div class="ifact inner"><small>Application opening</small><b>${vd('open').length?vd('open').map(d=>ahDate(d.date)).join(', '):dates.find(d=>d.kind==='open')?.date?`${ahDate(dates.find(d=>d.kind==='open').date)}`:'Not confirmed'}</b>${ahChip(vd('open').length?'verified':dates.find(d=>d.kind==='open')?.status||'review')}</div>
        <div class="ifact inner"><small>Application closing</small><b>${(vd('close').length?vd('close'):dates.filter(d=>d.kind==='close'&&d.date)).map(d=>`${ahDate(d.date)}`).join(' · ')||'Not confirmed'}</b>${ahChip(vd('close').length?'verified':dates.find(d=>d.kind==='close')?.status||'review')}</div>
        <div class="ifact inner"><small>Application fee</small><b>${feeItems.length?feeItems.map(x=>`${esc(x.amount)}`).join(' · '):'Not confirmed'}</b>${ahChip(r.fee?.status||'review')}</div>
        <div class="ifact inner"><small>Intake</small><b>${r.intakeYear} intake</b>${applies?'':`<small>You’ll apply for ${intake}</small>`}</div></div>
      ${st?`<p class="ahstate">${I('calendar')} <b>${esc(st.text)}</b></p>`:''}
      <p class="hint">${I('info')} Some programmes and faculties close earlier than the general date — always check your programme on ${esc(A)}’s website. Details are in Fees &amp; Dates below.</p>
      ${r.cao?`<div class="uisec"><h4>Central Applications Office (CAO)</h4><p>${esc(r.cao.note)}</p>${ahChip(r.cao.status)}</div>`:''}
      <div class="uisec"><h4>How to apply</h4><ol class="ahsteps">
        <li>Check the admission requirements for your programme${tg.length?' (your Study Target shows how you’re tracking)':''}.</li>
        <li>${ap.url?`Open ${esc(A)}’s application page and follow its instructions for first-year applicants.`:`Find the application section on ${esc(A)}’s official website.`}</li>
        <li>Pay the application fee if one applies${r.fee?.payTo?` (paid to ${esc(r.fee.payTo)})`:''}, and keep proof of payment.</li>
        <li>Upload the documents ${esc(A)} asks for — PATHWAY hasn’t confirmed ${esc(A)}’s document list, so use the official page.</li>
        <li>Apply for residence and funding separately where required (see below).</li></ol></div>
      ${extraList('apply')}`;

    /* ---- C. Funding ---- */
    const N=APP_HUB_META.nsfas, fu=L.funding||{};
    const funding = `<div class="ahfund">
        <div class="inner ahfc"><small>National funding</small><h4>NSFAS</h4><p>The National Student Financial Aid Scheme funds qualifying students at public universities and TVET colleges. Eligibility, the application window and required documents are set by NSFAS each year.</p>${ahChip(N.status,'Verified link')}<p class="hint">${esc(N.note)}</p>${ahExt(N.url,'Go to the official NSFAS website','btn btn-ghost btn-sm')}</div>
        <div class="inner ahfc"><small>${esc(A)} funding</small><h4>Bursaries, scholarships &amp; financial aid</h4><p>${esc(A)}’s own bursaries and scholarships are separate from NSFAS — you may need to apply for them separately, with their own criteria and dates.</p>
          ${fu.url?`${ahChip(fu.status, fu.status==='verified'?'Verified link':'Awaiting verification')}<p class="hint">${esc(fu.note||'')}</p>${ahExt(fu.url,`Open ${esc(A)}’s funding page`,'btn btn-ghost btn-sm')}`:`${ahChip('na')}<p class="hint">${esc(fu.note||'')} Look for “financial aid” or “bursaries” on ${ahExt(r.website?.url,`${esc(A)}’s official website`)}.</p>`}
          ${extraList('funding')}</div></div>
      <p class="hint">${I('info')} Funding is never guaranteed. Check eligibility, deadlines and requirements on the official funding source before you rely on it.</p>`;

    /* ---- D. Fees & Dates ---- */
    const fees = `<p class="ahintake">${ahChip(applies?'verified':'review', `${r.intakeYear} intake`)} <span class="hint">${esc(intakeNote)}</span></p>
      <div class="uisec"><h4>Application fee</h4>${feeItems.length?`<div class="ahtable" role="table" aria-label="Application fees"><div role="row" class="ahth"><span role="columnheader">Applicant</span><span role="columnheader">Fee</span><span role="columnheader">Status</span></div>${feeItems.map(x=>`<div role="row"><span role="cell">${esc(x.category)}</span><span role="cell"><b>${esc(x.amount)}</b></span><span role="cell">${ahChip(x.status)}</span></div>`).join('')}</div>`:`<p>${ahChip(r.fee?.status||'review')} Not confirmed — PATHWAY doesn’t show a fee until an official source supports it.</p>`}
        ${r.fee?.note?`<p class="hint">${esc(r.fee.note)}</p>`:''}
        <ul class="plist ahfeefacts">${r.fee?.refundable===false?`<li>${I('info')}<span>The application fee is <b>non-refundable</b>.</span></li>`:`<li>${I('info')}<span>Refund policy: not confirmed.</span></li>`}<li>${I('info')}<span>Paid to: ${r.fee?.payTo?esc(r.fee.payTo):'not confirmed'}.</span></li><li>${I('info')}<span>Fee exemptions: ${/exempt/i.test(r.fee?.note||'')?'see the note above — not confirmed':'none confirmed'}.</span></li></ul>
        ${uni?.apply?.fee?`<p class="hint">${I('file')} PATHWAY’s earlier ${esc(A)} programme data lists the fee as “${esc(uni.apply.fee)}” — not confirmed for the Applications hub.</p>`:''}${r.workbookFee?`<details class="xpand"><summary>What the import workbook says ${I('down')}</summary><div class="tsb"><p class="hint">${esc(r.workbookFee)}</p></div></details>`:''}</div>
      <div class="uisec"><h4>Application period</h4>${ahDatesList(u,r,['open','close'])||`<p class="hint">No dates confirmed yet.</p>`}
        ${r.timing?`<details class="xpand"><summary>Typical timing from the import workbook (not a guarantee) ${I('down')}</summary><div class="tsb"><p class="hint">${esc(r.timing)}</p></div></details>`:''}
        <p class="hint">${I('flag')} Certain programmes or faculties may have earlier closing dates. PATHWAY doesn’t list every course deadline here.</p></div>
      ${r.source?.url?`<p class="ahsrc">${I('file')} Confirm current dates and fees: ${ahExt(r.source.url, `${esc(A)}’s official source page`)} ${ahChip(r.source.status)} <span class="hint">Last checked ${r.lastVerified?fmtShort(r.lastVerified):'—'}</span></p>`:''}`;

    /* ---- E. Residences ---- */
    const re=L.residence||{}, resDates=ahDatesList(u,r,['resOpen','resClose']);
    const residence = r.residenceModel==='distance'
      ? `<div class="infonote inner">${I('info')}<span><b>${esc(A)} is a distance-learning university.</b> It doesn’t follow a residential-campus model, so there is no residence application. ${esc((r.campusNotes||[])[0]||'')} Arrange your own study space and check ${esc(A)}’s website for student support.</span></div>`
      : `${re.url ? `<div class="ahcta">${re.status==='verified'?ahExt(re.url,'Apply for Residence','btn btn-purple'):ahExt(re.url,`Open ${esc(A)}’s residence page`,'btn btn-ghost')}<div>${ahChip(re.status, re.status==='verified'?'Verified link':'Awaiting verification')}<p class="hint">${esc(re.note||'')}</p></div></div>`
          : `<div class="infonote inner">${I('info')}<span>${esc(re.note||'No residence page confirmed yet.')} Look for “accommodation” or “residences” on ${ahExt(r.website?.url,`${esc(A)}’s official website`)}.</span></div>`}
        <p class="ahsep"><b>Applying to study at ${esc(A)} does not automatically give you a residence place.</b> ${r.resNote?esc(r.resNote.text):`Residence usually involves its own application and dates — check ${esc(A)}’s instructions.`} ${r.resNote?ahChip(r.resNote.status):''}</p>
        ${resDates?`<div class="uisec"><h4>Residence application dates</h4>${resDates}</div>`:'<p class="hint">Residence application dates: not confirmed yet.</p>'}
        ${extraList('residence')}${extra('private').length?`<div class="uisec"><h4>Private and off-campus accommodation</h4>${extraList('private')}</div>`:''}
        <p class="hint">${I('info')} PATHWAY doesn’t list residence names, fees or availability until they’re confirmed by ${esc(A)}.</p>`;

    /* ---- F. Campuses ---- */
    const campuses = `${(r.campuses||[]).length?`<div class="ahcamps">${r.campuses.map(c=>`<div class="inner ahcamp">${I('pin')}<b>${esc(c)}</b></div>`).join('')}</div>`:''}
      ${(r.campusNotes||[]).map(n=>`<p class="hint">${I('info')} ${esc(n)}</p>`).join('')}
      <p class="hint">${ahChip(r.campusStatus||'review','Working summary')} Campus list from the import workbook. Not every programme is offered at every campus, and PATHWAY hasn’t confirmed which programmes or residences belong to each campus — check ${ahExt(r.website?.url,`${esc(A)}’s website`)}.</p>`;

    /* ---- G. FAQ (built from this university's own record) ---- */
    const openD=dates.filter(d=>d.kind==='open'&&d.date), closeD=dates.filter(d=>d.kind==='close'&&d.date);
    const faqs=[
      [`How do I apply to ${A}?`, `${r.cao?.uses?`First-year applications to ${A} go through the Central Applications Office (CAO). `:''}${ap.url?`Use ${A}’s application page in “Apply to Study” above${ap.status==='verified'?'':' (PATHWAY hasn’t fully verified it yet)'} and follow the steps there.`:`PATHWAY hasn’t confirmed ${A}’s application page yet — start from ${A}’s official website.`}`],
      [`Where do I find the application portal?`, ap.url?`Use the ${ap.status==='verified'?'“Apply on the Official Website”':'application page'} button in “Apply to Study”. ${ap.status==='verified'?'PATHWAY checked this link on '+fmtShort(r.lastVerified)+'.':'This link is still awaiting verification.'}`:`A dedicated portal link hasn’t been confirmed. ${A}’s official website is the safest starting point.`],
      [`What is the application fee?`, feeItems.length?`${feeItems.map(x=>`${x.category}: ${x.amount}${x.status==='verified'?'':' (not yet confirmed)'}`).join('; ')}. ${r.fee?.refundable===false?'It is non-refundable.':''}`:`PATHWAY hasn’t confirmed ${A}’s fee. Check the official application page — don’t assume it’s free.`],
      [`When do applications open and close?`, (openD.length||closeD.length)?`For the ${r.intakeYear} intake: ${openD.length?`opens ${openD.map(d=>ahDate(d.date)).join(', ')}`:'opening date not confirmed'}; ${closeD.length?closeD.map(d=>`${d.label.toLowerCase()} ${ahDate(d.date)}`).join('; '):'closing date not confirmed'}. ${applies?'':`Your intake (${intake}) will have new dates.`} Some programmes close earlier.`:`Not confirmed yet. ${r.timing?`The workbook’s typical timing is: “${r.timing}”`:''} Check ${A}’s official website.`],
      [`How do I apply for residence?`, r.residenceModel==='distance'?`${A} doesn’t offer a residential-campus model, so there is no residence application.`:re.url?`Use ${A}’s residence page in “Residences & Accommodation”${re.status==='verified'?'':' (awaiting verification)'}. ${r.resNote?r.resNote.text:''}`:`PATHWAY hasn’t confirmed ${A}’s residence page yet — look for “accommodation” on ${A}’s website.`],
      [`Do I need to apply separately for residence?`, r.residenceModel==='distance'?'No residence application applies.':`Applying to study doesn’t automatically secure a residence place. ${r.resNote?r.resNote.text:`Check ${A}’s instructions — residence normally has its own application and dates.`}`],
      [`Which campuses does ${A} have?`, (r.campuses||[]).length?`The workbook lists: ${r.campuses.join(', ')}. Programmes differ by campus — confirm yours on ${A}’s website.`:(r.campusNotes||[])[0]||'Not confirmed yet.'],
      [`Where can I find funding information?`, `NSFAS is national — use the official NSFAS website. ${fu.url?`${A}’s own funding page is linked in “NSFAS & Other Funding”${fu.status==='verified'?'':' (awaiting verification)'}.`:`${A}’s own funding page hasn’t been confirmed yet.`}`],
      [`Where can I check the admission requirements for my chosen course?`, `${uni?.courses?.length?`PATHWAY has ${A}’s ${uni.dataYear} programme requirements — choose a programme in My Three Study Targets to see how you’re tracking. `:''}${A}’s official prospectus or programme pages have the final word.`]];
    const faq = faqs.map(([q,a])=>`<details class="tsec"><summary>${esc(q)}<span class="pm">${I('plus')}</span></summary><div class="tsb"><p>${esc(a)}</p></div></details>`).join('') + (uni?.courses?.length?`<div class="actions"><a class="btn btn-ghost btn-sm" href="#/targets">My Three Study Targets</a></div>`:'');

    return fetTop(u,initials,planTxt,`Plan · Applications · ${esc(A)}`, esc(r.name), `How to apply, fund and find accommodation at ${esc(A)}.`) + `
      <div class="ahback"><a class="btn btn-ghost btn-sm" href="#/apply">${I('back')} All universities</a><nav class="ahnav" aria-label="Sections">${nav.map(([k,t])=>`<a class="chip" href="#/apply/uni?id=${esc(r.id)}" data-jump="ah-${k}">${t}</a>`).join('')}</nav></div>
      ${r.stub?`<div class="glass infonote">${I('info')}<span>Application information for ${esc(A)} hasn’t been added to PATHWAY yet. Use ${ahExt(r.website.url,'the official website')} to confirm everything.</span></div>`:''}
      ${sec('overview','grid','Overview',overview)}${sec('apply','file','Apply to Study',applyBody)}${sec('funding','card','NSFAS &amp; Other Funding',funding)}${sec('fees','calendar','Application Fees &amp; Dates',fees)}${sec('res','home','Residences &amp; Accommodation',residence)}${sec('campuses','pin','Campuses',campuses)}${sec('faq','chat',`Frequently asked questions about ${esc(A)}`,faq)}
      <section class="glass fsec2 ahsec ahfoot"><h2><span class="pub-ic">${I('shield')}</span>About this information</h2>
        <p class="hint">Source: ${esc(APP_HUB_META.source)}${r.lastVerified?`, checked against ${esc(A)}’s official website on ${fmtShort(r.lastVerified)}`:''}. Statuses: <b>Verified</b> — PATHWAY opened the official page and confirmed it; <b>Partially verified</b> — official link or value with partial confirmation; <b>Needs review</b> — not yet confirmed; <b>Not available</b> — not supplied.</p>
        ${r.workbookStatus?`<p class="hint">Workbook verification note: “${esc(r.workbookStatus)}”</p>`:''}
        <p class="planonly">${I('info')} PATHWAY does not submit applications or guarantee admission. Admission decisions are made by ${esc(A)}.</p></section>`;
  });
}
appsUniPage.after = () => {
  document.querySelectorAll('[data-jump]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); document.getElementById(a.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'}); }));
};
/* reminders through the existing notify() — Grade 12, Study Target universities, verified dates for their intake only */
function appHubReminders(u){
  if(gradeOf(u)!=='12') return;
  const ids=new Set(ahTargets(u).map(x=>x.id)), t=today();
  APP_HUB.filter(r=>ids.has(r.id) && r.intakeYear===ahIntake(u)).forEach(r=>{ const U=uniById(r.id);
    (r.dates||[]).filter(d=>d.status==='verified' && d.date && ['close','resClose'].includes(d.kind)).forEach(d=>{ const days=(d0(d.date)-t)/864e5;
      if(days<0 || days>30) return;
      if(d.kind==='close' && (U?.dates||[]).some(x=>x.date===d.date && x.kind==='application')) return;   /* already covered by the existing deadline reminder */
      notify(u,`ah-${r.id}-${d.kind}-${d.date}`,{title: d.kind==='resClose'?`${r.abbr} residence applications close soon`:`${r.abbr} applications close soon`, body:`${d.label} — ${ahDate(d.date)} (${r.intakeYear} intake). Confirm on ${r.abbr}’s official website.`, link:'#/apply/uni?id='+r.id}); }); });
}

/* ---------- notifications (in-app now; channels ready for push / WhatsApp once a backend exists) ---------- */
const NOTIFY_CHANNELS = { inApp:true, push:false, whatsapp:false };   /* push and WhatsApp need a backend integration and consent — not implemented */
function notify(u, key, n){
  u.notifications = u.notifications || [];
  if(key && u.notifications.some(x=>x.key===key)) return;
  const item={id:'n'+Date.now().toString(36)+Math.random().toString(36).slice(2,5), key, at:Date.now(), read:false, dismissed:false, ...n};
  u.notifications.unshift(item); u.notifications=u.notifications.slice(0,60);
  /* future: if(NOTIFY_CHANNELS.push) queuePush(u,item); if(NOTIFY_CHANNELS.whatsapp) queueWhatsApp(u,item); */
}
function targetSnapshot(u){ return fetOf(u).courseTargets.map(c=>{ const A=targetAnalysis(u,c); return {id:c.id, name:`${A.uni?.abbr||c.uni} ${c.course}`, above:A.score!=null&&A.min!=null&&A.score>=A.min, below:A.reqs.filter(r=>['below','notTaken','notAccepted'].includes(r.status)).length}; }); }
function notifyResults(u, key, before){
  const after=targetSnapshot(u), changed=after.filter(a=>{ const b=before.find(x=>x.id===a.id); return b && (b.above!==a.above || b.below!==a.below); });
  notify(u, 'res-'+key, {title:'Your PATHWAY has been updated', body:`PATHWAY has analysed your ${rkLabel(key)} results.${changed.length?` Your position changed for ${changed.map(c=>c.name).join(', ')}.`:''} See what’s changed.`, link:'#/targets'});
  if(after.some(a=>a.below)) notify(u, 'below-'+key, {title:'A subject is below a published requirement', body:'Your current subject performance is below the published requirement for one of your tracked programmes.', link:'#/targets'});
}
function notifyCheck(u){
  if(!u) return;
  if(isFET(u)){
    const req=requiredResultKey(u), C=learnerTerm(u);
    if(req && req!==firstKeyOf(u)) notify(u,'remind-'+req,{title:`Term ${C} has started`, body:`Remember to update your results — add your ${rkLabel(req)} report when you have it.`, link:'#/aps'});
    (u.notifications||[]).forEach(x=>{ if(x.key===`approach-${gradeOf(u)}-${C}`) x.dismissed=true; });   /* the term has started — the "approaching" reminder is no longer useful */
    const nxt=termOf(C+1); if(nxt){ const days=(d0(nxt.s)-today())/864e5; if(days>0 && days<=14) notify(u,'approach-'+gradeOf(u)+'-'+nxt.n,{title:`Term ${nxt.n} is approaching`, body:'Remember to update your results when your report is available.', link:'#/aps'}); }
    if(gradeOf(u)!=='10') fetOtherDates(u).filter(x=>x.prio===0 && (x.date-today())/864e5<=30).forEach(x=>notify(u,'dl-'+x.title+x.date.toISOString().slice(0,10),{title:'Your study target has an application deadline coming up', body:`${x.title} — ${fmtShort(x.date.toISOString().slice(0,10))}.`, link:gradeOf(u)==='12'?'#/applications':'#/targets'}));
    appHubReminders(u);
  }
  const si=subscriptionInfo(u);
  if(si && !si.demo && si.active){ const when = si.plan==='monthly' ? si.nextPayment : si.validUntil, days=(when-today())/864e5;
    if(days>=0 && days<=(si.plan==='monthly'?3:30)) notify(u,'sub-'+when.toISOString().slice(0,10),{title: si.plan==='monthly'?'Your monthly payment is coming up':'Your annual subscription ends soon', body: si.plan==='monthly'?`Your next payment of ${si.amount} is on ${fmtLong(when)}.`:`Your subscription is valid until ${fmtLong(when)}.`, link:'#/subscription'}); }
  if(gradeOf(u)==='9'){ (DNA_STAGE_DEFS||[]).forEach(d=>{ if(stagesOf(u)[d.key]?.status==='ready') notify(u,'dna-'+d.key,{title:`Your ${d.title} is ready`, body:'Pathway has brought your latest information together.', link:'#/dna/stage?k='+d.key}); }); }
}
function bellHTML(u){ const n=(u.notifications||[]).filter(x=>!x.read&&!x.dismissed).length; return `<button class="bell" data-act="bell" aria-label="Notifications${n?`, ${n} unread`:''}">${I('bell')}${n?`<span class="bdg">${n}</span>`:''}</button>`; }
function openNotifications(){
  const u=me(); if(!u) return; document.querySelector('.npanel')?.remove();
  const list=(u.notifications||[]).filter(x=>!x.dismissed), when=t=>new Date(t).toLocaleDateString('en-ZA',{day:'numeric',month:'short'});
  const el=document.createElement('div'); el.className='npanel glass'; el.setAttribute('role','dialog'); el.setAttribute('aria-label','Notifications');
  el.innerHTML=`<div class="nph"><b>Notifications</b><button class="link" id="nall">Mark all as read</button></div>
    ${list.length?`<ul>${list.map(x=>`<li class="${x.read?'':'unread'}"><div><b>${esc(x.title)}</b><p>${esc(x.body)}</p><small>${when(x.at)}</small></div><div class="nact"><button class="btn btn-purple btn-sm" data-nopen="${x.id}">Open</button><button class="btn btn-ghost btn-sm" data-ndis="${x.id}">Dismiss</button></div></li>`).join('')}</ul>`:'<p class="hint" style="padding:12px 4px">You’re all caught up.</p>'}`;
  document.body.appendChild(el);
  const find=id=>u.notifications.find(x=>x.id===id);
  el.querySelectorAll('[data-nopen]').forEach(b=>b.addEventListener('click',()=>{ const n=find(b.dataset.nopen); n.read=true; save(); el.remove(); go(n.link||'#/home'); render(); }));
  el.querySelectorAll('[data-ndis]').forEach(b=>b.addEventListener('click',()=>{ find(b.dataset.ndis).dismissed=true; save(); render(); openNotifications(); }));
  el.querySelector('#nall')?.addEventListener('click',()=>{ u.notifications.forEach(x=>x.read=true); save(); render(); openNotifications(); });
  setTimeout(()=>document.addEventListener('click',function off(e){ if(!el.contains(e.target) && !e.target.closest('.bell')){ el.remove(); document.removeEventListener('click',off); } }),0);
}

/* ============================================================
   CAREER EXPLORER — PROFESSIONAL PATHWAYS (Grade 11–12 layers)
   Kept separate from the career records so they can be updated without touching the explorer.
   verified: date the key steps were checked against an official/authoritative source; null = still to verify (learners are told to check the body’s website).
   ============================================================ */
const BODY = {
  SAICA:{abbr:'SAICA',name:'South African Institute of Chartered Accountants',type:'Professional body',what:'The professional body for Chartered Accountants in South Africa. It sets the route to the CA(SA) designation, including its board exams and training contract.',when:'You’d choose a SAICA-accredited degree at university, then meet SAICA again when you write its exams and sign a training contract.',url:'https://www.saica.org.za'},
  SAIPA:{abbr:'SAIPA',name:'South African Institute of Professional Accountants',type:'Professional body',what:'A professional body for Professional Accountants (SA), a designation focused on accounting and advisory work, especially for small and medium businesses.',when:'After a relevant qualification, during your practical training.',url:'https://www.saipa.co.za'},
  CIMA:{abbr:'CIMA',name:'Chartered Institute of Management Accountants',type:'Professional body (international)',what:'An international body for management accountants — people who use financial information to help businesses plan and make decisions. It awards the CGMA designation.',when:'Usually during or after university, alongside work experience.',url:'https://www.cimaglobal.com'},
  ACCA:{abbr:'ACCA',name:'Association of Chartered Certified Accountants',type:'Professional body (international)',what:'An international accounting body with its own exams and practical-experience requirements, recognised in many countries.',when:'You can start alongside or after university studies.',url:'https://www.accaglobal.com'},
  IRBA:{abbr:'IRBA',name:'Independent Regulatory Board for Auditors',type:'Regulator',what:'The statutory body that regulates registered auditors in South Africa — the people allowed to sign off company audits.',when:'After qualifying as an accountant, if you want to become a registered auditor.',url:'https://www.irba.co.za'},
  HPCSA:{abbr:'HPCSA',name:'Health Professions Council of South Africa',type:'Regulator',what:'The statutory council that registers and regulates health professionals such as doctors, dentists, psychologists and many therapists. You can’t practise these professions without registering.',when:'From your first year of study (student registration) through internship, community service and independent practice.',url:'https://www.hpcsa.co.za'},
  SAPC:{abbr:'SAPC',name:'South African Pharmacy Council',type:'Regulator',what:'The statutory council that registers pharmacists and pharmacy support staff.',when:'During your studies, internship and before you practise.',url:'https://www.pharmcouncil.co.za'},
  SANC:{abbr:'SANC',name:'South African Nursing Council',type:'Regulator',what:'The statutory council that registers nurses and midwives in South Africa.',when:'While you study and before you work as a registered nurse.',url:'https://www.sanc.co.za'},
  ECSA:{abbr:'ECSA',name:'Engineering Council of South Africa',type:'Regulator',what:'The statutory council that registers engineering practitioners — Professional Engineers, Technologists, Certificated Engineers and Technicians. Some engineering work legally requires professional registration.',when:'After your qualification, when you register as a candidate and later as a professional.',url:'https://www.ecsa.co.za'},
  LPC:{abbr:'LPC',name:'Legal Practice Council',type:'Regulator',what:'The statutory council that regulates attorneys and advocates in South Africa, sets the admission exams and keeps the roll of legal practitioners.',when:'After your LLB, during practical vocational training and when you are admitted and enrolled.',url:'https://lpc.org.za'},
  SACE:{abbr:'SACE',name:'South African Council for Educators',type:'Regulator',what:'The statutory council that registers teachers. Teachers must be registered with SACE to teach in South African schools.',when:'From your teaching studies (student registration) and before you teach.',url:'https://www.sace.org.za'},
  SACAP:{abbr:'SACAP',name:'South African Council for the Architectural Profession',type:'Regulator',what:'The statutory council that registers architectural professionals, from draughtspersons and technologists to professional architects.',when:'After your studies, as a candidate and then as a registered professional.',url:'https://www.sacapsa.com'},
  SACQSP:{abbr:'SACQSP',name:'South African Council for the Quantity Surveying Profession',type:'Regulator',what:'The statutory council that registers quantity surveyors.',when:'After your studies, while you gain experience towards professional registration.',url:'https://www.sacqsp.org.za'},
  SAGC:{abbr:'SAGC',name:'South African Geomatics Council',type:'Regulator',what:'The statutory council that registers land surveyors and other geomatics practitioners.',when:'After your studies, while you train towards professional registration.',url:'https://www.sagc.org.za'},
  SACPLAN:{abbr:'SACPLAN',name:'South African Council for Planners',type:'Regulator',what:'The statutory council that registers town and regional planners.',when:'After your studies, while you gain experience towards professional registration.',url:'https://www.sacplan.org.za'},
  ASSA:{abbr:'ASSA',name:'Actuarial Society of South Africa',type:'Professional body',what:'The professional body for actuaries in South Africa. Actuaries qualify mainly by passing a series of professional exams.',when:'Often during university (some university modules give exemptions) and while working.',url:'https://www.actuarialsociety.org.za'},
  SACSSP:{abbr:'SACSSP',name:'South African Council for Social Service Professions',type:'Regulator',what:'The statutory council that registers social workers. You must be registered to practise as a social worker.',when:'While studying and before you practise.',url:'https://www.sacssp.co.za'},
  SAVC:{abbr:'SAVC',name:'South African Veterinary Council',type:'Regulator',what:'The statutory council that registers veterinarians and veterinary para-professionals.',when:'Before you practise as a vet.',url:'https://www.savc.org.za'}
};
const PRO_PATHWAYS = [
  {careers:['Chartered Accountant','Accountant','Forensic Accountant'], title:'Becoming a Chartered Accountant — CA(SA)', bodies:['SAICA','SAIPA','CIMA','ACCA'],
   steps:['A SAICA-accredited undergraduate degree (usually a BCom Accounting “CA stream”)','A SAICA-accredited postgraduate qualification (often called the CTA or PGDA)','SAICA’s first board exam (the Initial Test of Competence, ITC)','A training contract (articles) of at least three years with a SAICA-accredited training office','A professional programme, then SAICA’s final board exam (the Assessment of Professional Competence, APC)','Register with SAICA as a CA(SA)'],
   varies:'Accounting has more than one professional route. SAICA leads to CA(SA); SAIPA, CIMA and ACCA lead to different designations with their own exams and experience requirements. SAICA occasionally renames its assessments, so check the current names.',
   after:'Newly qualified accountants often work in audit firms, corporate finance teams, the public sector or advisory roles, and some specialise in tax, forensic accounting or financial management.',
   verified:'2026-10-03', sources:[['SAQA — CA(SA) professional designation','https://pbdesig.saqa.org.za/viewProfessionalDesignation.php?id=8'],['UP — How do you become a CA(SA)?','https://www.up.ac.za/article_archive/438'],['Unisa — How to become a CA / Professional Accountant','https://www.unisa.ac.za/sites/corporate/default/Colleges/Accounting-Sciences/Schools,-departments-&-centre/School-of-Accountancy/Department-of-Financial-Accounting/How-to-become-a-CA']]},
  {careers:['Auditor'], title:'Becoming a registered auditor', bodies:['SAICA','IRBA'], steps:['Qualify as a Chartered Accountant (CA(SA)) — see the accounting route','Complete the additional training and assessment IRBA requires for registered auditors','Register with IRBA as a Registered Auditor (RA)'], varies:'External auditors who sign off audits must be registered with IRBA. Internal auditors follow different routes.', after:'Registered auditors usually work in audit firms or start their own practices.', verified:null, sources:[['IRBA','https://www.irba.co.za']]},
  {careers:['Management Accountant'], title:'Management accounting route', bodies:['CIMA'], steps:['A relevant degree or diploma (exemptions may apply)','CIMA’s professional exams','Relevant practical work experience','CIMA membership and the CGMA designation'], varies:'Many management accountants also qualify through SAICA or SAIPA.', after:'Management accountants usually work inside companies, helping with budgets, planning and decisions.', verified:null, sources:[['CIMA','https://www.cimaglobal.com']]},
  {careers:['Doctor'], title:'Becoming a medical doctor', bodies:['HPCSA'], steps:['MBChB degree — six years','Two-year internship at accredited hospitals','One year of compulsory community service','Register with the HPCSA as an independent medical practitioner','Optional: specialise through further postgraduate training (as a registrar)'],
   varies:'Becoming a specialist (for example a surgeon or paediatrician) takes several more years of postgraduate training after independent registration.', after:'Doctors work in public and private hospitals, clinics, private practice, research and the pharmaceutical or insurance sectors.',
   verified:'2026-10-03', sources:[['University of Pretoria — MBChB','https://www.up.ac.za/pdf/generator/study_programmes/67624'],['Stellenbosch University — MBChB','https://blogs.sun.ac.za/open-day/exhibitions/mbchb'],['HPCSA — internship and community service','https://www.hpcsa-blogs.co.za/?p=2658']]},
  {careers:['Dentist'], title:'Becoming a dentist', bodies:['HPCSA'], steps:['Bachelor of Dental Surgery (BDS)','One year of compulsory community service','Register with the HPCSA to practise independently'], varies:'Dental specialities need further postgraduate study.', after:'Dentists work in private practices, public clinics and hospitals.', verified:null, sources:[['HPCSA','https://www.hpcsa.co.za']]},
  {careers:['Physiotherapist','Occupational Therapist','Dietitian'], title:'Becoming a registered therapy professional', bodies:['HPCSA'], steps:['An accredited degree in the profession','One year of compulsory community service','Register with the HPCSA to practise independently'], varies:'Each profession has its own HPCSA professional board.', after:'These professionals work in hospitals, clinics, private practice, schools, sport and community health.', verified:'2026-10-03', sources:[['HPCSA — internship and community service','https://www.hpcsa-blogs.co.za/?p=2658']]},
  {careers:['Radiographer','Medical Technologist','Paramedic (Emergency Medical Care)'], title:'Registration for health professionals', bodies:['HPCSA'], steps:['An accredited qualification in the profession','Any internship or community-service period your profession requires','Register with the HPCSA in your profession’s category'], varies:'Requirements differ by profession and qualification — check the HPCSA board for your field.', after:'Hospitals, clinics, laboratories and emergency services.', verified:null, sources:[['HPCSA','https://www.hpcsa.co.za']]},
  {careers:['Pharmacist'], title:'Becoming a pharmacist', bodies:['SAPC'], steps:['Bachelor of Pharmacy (BPharm) — four years','A year of internship and the SAPC pre-registration exam','A year of community service','Register with the SAPC as a pharmacist'], varies:'Check the SAPC for the current internship and community-service rules.', after:'Community pharmacies, hospitals, the pharmaceutical industry and research.', verified:null, sources:[['SAPC','https://www.pharmcouncil.co.za']]},
  {careers:['Nurse'], title:'Becoming a professional nurse', bodies:['SANC'], steps:['An accredited nursing qualification (for example a Bachelor of Nursing)','Community service, where required','Register with SANC as a professional nurse (and midwife, where applicable)'], varies:'There are different nursing categories and qualifications — check SANC.', after:'Hospitals, clinics, schools, workplaces and community health.', verified:null, sources:[['SANC','https://www.sanc.co.za']]},
  {careers:['Psychologist','Clinical Psychologist','Counselling Psychologist','Educational Psychologist','Industrial Psychologist'], title:'Becoming a registered psychologist', bodies:['HPCSA'], steps:['A bachelor’s degree with psychology, then an Honours degree','A professional Master’s degree in your category (selection is very competitive)','A supervised internship','Community service where your category requires it','The HPCSA Professional Board for Psychology exam and registration'], varies:'Clinical, counselling, educational, industrial and research psychology each have their own route. Registered counsellors and psychometrists follow shorter routes.', after:'Hospitals, private practice, schools, companies and community organisations.', verified:null, sources:[['HPCSA — Psychology board','https://www.hpcsa.co.za']]},
  {careers:['Civil Engineer','Mechanical Engineer','Electrical Engineer','Electronic Engineer','Chemical Engineer','Industrial Engineer','Mining Engineer','Metallurgical Engineer','Computer Engineer','Aeronautical Engineer','Agricultural Engineer','Environmental Engineer','Mechatronics Engineer','Biomedical Engineer','Marine Engineer','Renewable Energy Engineer','Robotics Engineer'], title:'Becoming a Professional Engineer (Pr Eng)', bodies:['ECSA'],
   steps:['An accredited four-year BEng or BSc (Eng) degree','Register with ECSA as a Candidate Engineer','At least three years of structured training and experience, guided by a mentor','ECSA’s experience appraisal and professional review interview','Register as a Professional Engineer (Pr Eng)'],
   varies:'Engineering also has technologist (BEngTech → Pr Tech Eng), certificated engineer and technician (diploma → Pr Eng Techni) routes, each with candidate training before professional registration.',
   after:'Engineers work for consulting firms, construction companies, mines, manufacturers, utilities and government — and some later move into management or start their own firms.',
   verified:'2026-10-03', sources:[['ECSA — registration','https://www.ecsa.co.za/ecsa-registration/'],['SAQA — Pr Eng professional designation','https://pbdesig.saqa.org.za/viewProfessionalDesignation.php?id=304'],['gov.za — Register as a professional engineer','https://www.gov.za/services/services-residents/world-work/professional-registration/register-professional-engineer']]},
  {careers:['Engineering Technologist','Engineering Technician'], title:'Registering as an engineering technologist or technician', bodies:['ECSA'], steps:['An accredited BEngTech degree (technologist) or engineering diploma (technician)','Register with ECSA as a candidate','At least three years of training and experience','ECSA assessment and professional registration (Pr Tech Eng or Pr Eng Techni)'], varies:'Some technologists later study further towards Professional Engineer registration.', after:'Technical, design and operations roles across engineering industries.', verified:'2026-10-03', sources:[['ECSA — registration','https://www.ecsa.co.za/ecsa-registration/'],['gov.za — Register as a professional engineer','https://www.gov.za/services/services-residents/world-work/professional-registration/register-professional-engineer']]},
  {careers:['Lawyer','Attorney','Advocate'], title:'Becoming a legal practitioner (attorney or advocate)', bodies:['LPC'],
   steps:['An LLB degree — at least four years (or five if it follows another bachelor’s degree)','Practical vocational training as a candidate legal practitioner (a candidate attorney, or a pupil with an advocate)','A legal practice management course for those who will practise as attorneys (and some advocates)','Pass the LPC’s competency-based admission exam','Be admitted by the High Court and enrolled with the Legal Practice Council'],
   varies:'Attorneys and advocates follow different practical training. Advocates also train with a supervisor at a Bar. Attorneys can later qualify as conveyancers or notaries through extra exams.',
   after:'Law firms, the courts, government departments, companies (as legal advisers) and non-profit organisations.',
   verified:'2026-10-03', sources:[['Legal Practice Act 28 of 2014, section 26','https://www.acts.co.za/legal-practice-act-2014/26__minimum_legal_qualificatio.php'],['LSSA — Becoming a legal practitioner','https://www.lssa.org.za/about-us/about-the-attorneys-profession/becoming-a-legal-practitioner/']]},
  {careers:['Teacher','Foundation Phase Teacher','Intermediate Phase Teacher','Senior Phase Teacher','High School (FET) Teacher','Special Needs Educator'], title:'Becoming a qualified teacher', bodies:['SACE'], steps:['A Bachelor of Education (BEd) for your phase — or a degree followed by a Postgraduate Certificate in Education (PGCE)','Teaching practice in schools during your studies','Register with SACE before you teach'], varies:'Your teaching phase (Foundation, Intermediate, Senior/FET) and subjects shape which qualification you choose.', after:'Public and independent schools, special schools, and later school leadership or education support roles.', verified:null, sources:[['SACE','https://www.sace.org.za']]},
  {careers:['Architect','Architectural Technologist'], title:'Registering in the architectural profession', bodies:['SACAP'], steps:['An accredited architecture qualification for your category (from diploma to master’s level)','A period of practical experience as a registered candidate','SACAP’s professional assessment','Register in your professional category with SACAP'], varies:'SACAP has several categories — Professional Architect usually requires a master’s degree.', after:'Architectural practices, developers, government and construction companies.', verified:null, sources:[['SACAP','https://www.sacapsa.com']]},
  {careers:['Quantity Surveyor'], title:'Registering as a quantity surveyor', bodies:['SACQSP'], steps:['An accredited quantity surveying qualification','Practical experience as a candidate','SACQSP assessment and professional registration'], varies:'Check SACQSP for current categories.', after:'Construction companies, consulting firms, developers and government.', verified:null, sources:[['SACQSP','https://www.sacqsp.org.za']]},
  {careers:['Land Surveyor'], title:'Registering as a land surveyor', bodies:['SAGC'], steps:['An accredited geomatics or surveying qualification','Practical training as a candidate','SAGC exams and professional registration'], varies:'Check SAGC for the current categories and exams.', after:'Surveying firms, mining, construction and government.', verified:null, sources:[['SAGC','https://www.sagc.org.za']]},
  {careers:['Town Planner'], title:'Registering as a town and regional planner', bodies:['SACPLAN'], steps:['An accredited planning qualification','Practical experience as a candidate','SACPLAN registration'], varies:'Check SACPLAN for the current categories.', after:'Municipalities, planning consultancies, developers and government.', verified:null, sources:[['SACPLAN','https://www.sacplan.org.za']]},
  {careers:['Actuary'], title:'Becoming an actuary', bodies:['ASSA'], steps:['A degree in actuarial science or a strong mathematics/statistics degree','The Actuarial Society’s professional exams (some university modules may earn exemptions)','Work experience while writing exams','Qualify as a Fellow of the Actuarial Society'], varies:'Qualifying usually takes several years of exams while working.', after:'Insurance companies, banks, consulting firms, medical schemes and pension funds.', verified:null, sources:[['ASSA','https://www.actuarialsociety.org.za']]},
  {careers:['Social Worker'], title:'Becoming a social worker', bodies:['SACSSP'], steps:['A Bachelor of Social Work (BSW)','Register with the SACSSP before you practise'], varies:'Check the SACSSP for current registration requirements.', after:'Government departments, hospitals, schools, NGOs and community organisations.', verified:null, sources:[['SACSSP','https://www.sacssp.co.za']]},
  {careers:['Veterinarian'], title:'Becoming a veterinarian', bodies:['SAVC'], steps:['A veterinary degree (BVSc)','Any compulsory community service required by the SAVC','Register with the SAVC'], varies:'Check the SAVC for current rules.', after:'Animal clinics and hospitals, farming, wildlife, research and government.', verified:null, sources:[['SAVC','https://www.savc.org.za']]}
];
const pathwayFor = name => PRO_PATHWAYS.find(p=>p.careers.includes(name));
const isReturning = u => !!((u.gradeHistory||[]).length || (u.fetStart && +u.fetStart.grade < +gradeOf(u)) || Object.keys(u.progress?.dnaStages||{}).length);
function pathwayHTML(p, g){
  if(!p) return `<p>This career doesn’t follow one single regulated route in Pathway’s data — employers and qualifications vary. Check the study routes above and speak to people working in the field.</p>`;
  return `<ol class="ptl">${p.steps.map((s,i)=>`<li><span class="pn">${i+1}</span><span>${esc(s)}</span></li>`).join('')}</ol>
    ${p.varies?`<p class="hint">${I('info')} ${esc(p.varies)}</p>`:''}
    <div class="bodies">${p.bodies.map(k=>{ const b=BODY[k]; return `<details class="tsec body"><summary><b>${b.abbr}</b><span class="bt">${esc(b.name)} · ${esc(b.type)}</span><span class="pm">${I('plus')}</span></summary><div class="tsb"><p><b>What is it?</b> ${esc(b.what)}</p><p><b>When would I meet it?</b> ${esc(b.when)}</p><p><a class="link" href="${b.url}" target="_blank" rel="noopener">${esc(b.abbr)} official website</a></p></div></details>`; }).join('')}</div>
    <p class="hint srcline">${p.verified?`Key steps checked ${fmtShort(p.verified)} against: ${p.sources.map(([t,u])=>`<a class="link" href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`).join(' · ')}.`:`Requirements can change — check the latest rules on the official website (${p.sources.map(([t,u])=>`<a class="link" href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`).join(', ')}).`}</p>`;
}
const NEXT_AFTER_MATRIC = ['Check the exact subject and score requirements for the programmes you want — your Study Targets show them.','Apply before each institution’s closing date (some programmes close early).','Write the NBT if your programmes need it.','Apply for funding early — NSFAS, bursaries or scholarships.','Accept an offer, then register and arrange accommodation if you need it.'];

/* ============================================================
   PLANNING INTELLIGENCE — fit status · matching programmes · What If? · Decision Lab · After Matric · My Pathway Map
   Everything uses the verified university data already in Pathway (UNI_DB) and the learner’s own submitted results.
   Pathway projects; it never decides admission.
   ============================================================ */
const PROJ_NOTE = 'Projected APS is calculated by PATHWAY from the results you have entered or uploaded. Your official APS may differ and is determined using your official results and the institution’s calculation method.';
const FIT = {
  ontrack:{e:'🟢',t:'On track',cls:'ok'}, attention:{e:'🟡',t:'Needs attention',cls:'amber'}, subject:{e:'🟠',t:'Subject pathway issue',cls:'orange'},
  noteligible:{e:'🔴',t:'Currently not eligible',cls:'bad'}, partial:{e:'🔵',t:'Partly known',cls:'info'}, unknown:{e:'⚪',t:'Not enough information yet',cls:'mute'}
};
/* overall status across ALL compulsory requirements — a green APS never overrides a missing subject */
function fitStatus(u, c, A){
  A = A || targetAnalysis(u,c); const g=gradeOf(u), rec=latestRec(u);
  const missing=A.reqs.filter(r=>['notTaken','notAccepted'].includes(r.status)), below=A.reqs.filter(r=>r.status==='below');
  const apsOK = A.score!=null && A.min!=null ? A.score>=A.min : null;
  const names = rs => rs.map(r=>[r.q,...(r.q.alt||[])].map(x=>x.subject).join(' or '));
  let level;
  if(!rec) level='unknown';
  else if(missing.length) level = g==='12' ? 'noteligible' : 'subject';
  else if(apsOK===false || below.length) level='attention';
  else if(apsOK===true) level='ontrack';
  else level='partial';
  const miss=names(missing), bel=names(below), and=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
  let summary='';
  if(level==='unknown') summary='Add your results so Pathway can compare them with this programme’s requirements.';
  else if(missing.length) summary = `${apsOK?'Your Projected APS meets the published minimum, but this':'This'} programme also requires ${and(miss)}${missing.some(r=>r.status==='notAccepted')?' (your current Mathematics subject is not accepted)':''}. You currently do not take ${missing.length===1?'this subject':'these subjects'}.`;
  else if(level==='attention') summary = [apsOK===false?`Your Projected APS is ${Math.round((A.min-A.score)*10)/10} below the published minimum.`:'Your Projected APS meets the published minimum.', bel.length?`${and(bel)} ${bel.length===1?'is':'are'} below the required level.`:''].filter(Boolean).join(' ');
  else if(level==='ontrack') summary='Your Projected APS meets the published minimum and you currently meet the listed subject requirements.';
  else summary='You currently meet the listed subject requirements, but Pathway can’t compare a published minimum score for this programme yet.';
  const todo = level==='subject' ? (g==='10' ? 'If you’re serious about this career, speak to your school about whether changing subjects is possible and whether the required subjects are available.'
                                           : 'Subject changes may be possible only subject to your school’s policies, approval and deadlines. If this is still a serious goal, speak to your school as soon as possible.')
    : level==='noteligible' ? 'At Grade 12, subject changes may be highly restricted. Speak to your school and/or the institution before making any decisions — and explore programmes that match your current subjects.'
    : level==='attention' ? (g==='12' ? 'Focus on the subjects below the requirement before your final exams — every mark counts towards your final results.' : 'Focus on the subjects below the requirement. Use What If? to see which improvements would make the most difference.')
    : level==='ontrack' ? 'Keep it up — and look beyond the minimum: stronger results can open more opportunities.' : level==='unknown' ? '' : 'Check the programme’s published requirements and keep your results up to date.';
  const flags=[];
  if(apsOK && A.score-A.min<=2) flags.push(['🟠','Keep an eye on this','Your Projected APS is close to the published minimum.']);
  if(A.reqs.length && !missing.length) flags.push(['🔵','Information','This programme has subject requirements on top of the APS.']);
  if(A.selection) flags.push(['🔵','Information','This programme has additional selection requirements.']);
  return {level, ...FIT[level], summary, todo, apsOK, missing, below, flags};
}
function fitBlock(u, c, A, F){
  const g=gradeOf(u), row=(ok,t,sub)=>`<li class="${ok===true?'ok':ok===false?'bad':'mute'}"><span>${ok===true?'🟢':ok===false?'🔴':'⚪'}</span><div><b>${t}</b>${sub?`<small>${sub}</small>`:''}</div></li>`;
  const apsRow = A.score!=null&&A.min!=null ? row(F.apsOK, `Projected APS ${A.score} · published minimum ${A.min}`, F.apsOK?'Projected APS meets the published minimum.':'Projected APS is below the published minimum.') : row(null,'Projected APS vs published minimum','Not available for this programme yet.');
  const reqRows = A.reqs.map(r=>{ const sub=[r.q,...(r.q.alt||[])].map(x=>x.subject).join(' or '); const s=r.status;
    return row(s==='meets'?true:['below','notTaken','notAccepted'].includes(s)?false:null, sub, s==='meets'?`${r.mark}% / Level ${level(r.mark)} — requirement met`:s==='below'?`${r.mark}% / Level ${level(r.mark)} — below the required ${reqNeed(r.opt||r.q)}`:s==='notTaken'?'Not currently met — subject not taken':s==='notAccepted'?'Not accepted for this programme':'Not enough results yet'); }).join('');
  const actions = F.level==='noteligible' ? `<a class="btn btn-purple btn-sm" href="#/targets/matches?c=${c.id}">Explore programmes that match my current subjects ${ARROW}</a>`
    : F.level==='subject' ? `<a class="btn btn-ghost btn-sm" href="${c.career?`#/careers/view?c=${encodeURIComponent(c.career)}`:'#/careers'}">Explore this pathway ${ARROW}</a><a class="btn btn-ghost btn-sm" href="#/targets/matches?c=${c.id}">Programmes that match my current subjects</a>`
    : F.level==='attention' ? `<a class="btn btn-ghost btn-sm" href="#/what-if?c=${c.id}">What if I improve my results for this course? ${ARROW}</a>` : '';
  return `<div class="fit ${F.cls}"><div class="fithead"><small>Your fit for this programme</small><b>${F.e} ${F.t}</b></div>
    <ul class="fitwhy">${apsRow}${reqRows}</ul>
    <p class="fitsum">${esc(F.summary)}</p>
    ${F.flags.length?`<div class="fitflags">${F.flags.map(([e,t,d])=>`<span class="fflag" title="${esc(d)}">${e} ${esc(t)}: ${esc(d)}</span>`).join('')}</div>`:''}
    ${F.todo?`<div class="fittodo"><small>What can you do?</small><p>${esc(F.todo)}</p>${actions?`<div class="actions">${actions}</div>`:''}</div>`:''}
  </div>`;
}
/* "Why this course may suit you" — guidance from what Pathway already knows, never a prediction */
function whySuit(u, c, A){
  const rec=latestRec(u), out=[]; if(!rec) return '';
  const avg=FET_KEYS.reduce((s,k)=>s+(Number(rec.marks[k])||0),0)/FET_KEYS.length;
  const strong=A.reqs.filter(r=>r.status==='meets' && r.mark>=Math.max(60,avg)).map(r=>`${r.opt?.subject||r.q.subject} (${r.mark}%)`);
  if(strong.length) out.push(`You currently perform strongly in ${strong.slice(0,2).join(' and ')}, which this programme asks for.`);
  if(c.career) out.push(`You’ve linked it to your interest in becoming a ${c.career}.`);
  const fav=fetOf(u).favCareers.filter(n=>{ const cc=CAREERS.find(x=>x.name===n); return cc && A.course && (A.course.faculty||'').toLowerCase().includes(({finance:'commerce',business:'commerce',health:'health',engineering:'engineering',law:'law',education:'education',natural:'science',computing:'science'})[cc.family]||'@'); });
  if(fav.length) out.push(`It connects with careers you saved, such as ${fav.slice(0,2).join(' and ')}.`);
  return out.length ? `<div class="whysuit"><small>Why this course may suit you</small>${out.map(x=>`<p>${esc(x)}</p>`).join('')}<p class="hint">This is guidance to help you explore — not a prediction.</p></div>` : '';
}
/* programmes in Pathway’s data where the learner meets the published minimum AND every listed subject requirement */
function matchingProgrammes(u){
  const out=[];
  UNI_DB.forEach(uni=>uni.courses.forEach(co=>{ if(co.inactive) return;
    const A=targetAnalysis(u,{uniId:uni.id, courseId:co.id, uni:uni.name, course:co.name, faculty:co.faculty});
    if(A.score==null || A.min==null || A.score<A.min) return;
    if(A.reqs.some(r=>r.status!=='meets')) return;
    out.push({uni, co, A}); }));
  return out;
}
/* a copy of the learner with one simulated set of results (used by What If? — nothing is saved) */
function simUser(u, rec){ const F=fetOf(u); return {...u, progress:{...u.progress, fet:{...F, record:{...F.record, g99t9:{...rec, approved:true, grade:99, term:9}}}}}; }
function matchesPage(){
  return shell((u,initials,planTxt)=>{ const F=fetOf(u), qs=new URLSearchParams(location.hash.split('?')[1]||''), base=F.courseTargets.find(c=>c.id===qs.get('c')), q=(VIEW.mq||'').toLowerCase();
    const all = matchingProgrammes(u), baseA = base ? targetAnalysis(u,base) : null;
    const rank = m => (baseA && m.co.faculty===baseA.course?.faculty ? 0 : 2) + (base && m.uni.name===base.uni ? 0 : 1);
    const list = all.filter(m=>!q || (m.co.name+' '+m.uni.name+' '+m.co.faculty).toLowerCase().includes(q)).sort((a,b)=>rank(a)-rank(b) || (b.A.score-b.A.min)-(a.A.score-a.A.min));
    return fetTop(u,initials,planTxt,'My targets','Programmes that match your current subjects', base?`Alternatives to ${esc(base.course)} at ${esc(base.uni)}, using your current subjects and Projected APS.`:'Using your current subjects and Projected APS.') + `
      <p class="mindisc">${I('info')} <span>These programmes are in Pathway’s university data, and your latest results currently meet their published minimum and listed subject requirements. This is not an offer or a guarantee of admission — other requirements and selection may apply.</span></p>
      <div class="fsearch" style="max-width:520px;margin:12px 0">${I('search')}<label class="sr" for="mq">Search matching programmes</label><input id="mq" type="search" placeholder="Search programmes or universities…" value="${esc(VIEW.mq||'')}"></div>
      <p class="hint">${list.length} programme${list.length===1?'':'s'} across ${new Set(list.map(m=>m.uni.id)).size} universities.</p>
      <div class="clist">${list.slice(0,40).map(m=>`<div class="ccourse static"><div><b>${esc(m.co.name)}</b><small>${esc(m.uni.abbr)} · ${esc(m.co.faculty)}</small></div><span class="schip ok">Projected ${esc(m.A.label)} ${m.A.score} · min ${m.A.min}</span>${F.courseTargets.length<3?`<button class="btn btn-ghost btn-sm" data-addm="${m.co.id}">Add as a Study Target</button>`:''}</div>`).join('') || '<p class="hint">No programmes in Pathway’s data match yet. As more universities are added and your results change, this list can grow.</p>'}</div>
      ${list.length>40?`<p class="hint">Showing 40 — search to narrow the list.</p>`:''}`; });
}
matchesPage.after = () => { const F=fetOf(me());
  const q=document.getElementById('mq'); if(q) q.addEventListener('input',()=>{ VIEW.mq=q.value; const p=q.selectionStart; render(); const n=document.getElementById('mq'); n.focus(); n.setSelectionRange(p,p); });
  document.querySelectorAll('[data-addm]').forEach(b=>b.addEventListener('click',()=>{ if(F.courseTargets.length>=3) return; const co=courseById(b.dataset.addm), uni=uniById(co.id.split('-')[0]);
    F.courseTargets.push({id:'c'+Date.now().toString(36), uniId:uni.id, courseId:co.id, uni:uni.name, course:co.name, faculty:co.faculty, career:'', minAps:null, reqs:''}); F.justTarget=true; save(); go('#/targets'); toast('Study Target added.','check'); }));
};

/* ---------- WHAT IF? (Grades 10–12) ---------- */
function whatIfPage(){
  return shell((u,initials,planTxt)=>{
    const rec=latestRec(u), qs=new URLSearchParams(location.hash.split('?')[1]||''), ctxT=fetOf(u).courseTargets.find(c=>c.id===qs.get('c')), ctx=qs.get('ctx')||(ctxT?'target':'results');
    const title = ctx==='target' ? 'What if I improve my results for this course?' : ctx==='subject' ? 'What if I change a subject?' : 'What if my Projected APS changes?';
    if(!rec) return fetTop(u,initials,planTxt,'Plan','What If?',title)+`<div class="caughtup inner"><span class="cu-ic">🧪</span><div><b>Add your results first</b><p>What If? starts from your latest submitted results. <a class="link" href="#/aps">My Results &amp; Projected APS →</a></p></div></div>`;
    if(!VIEW.wi || VIEW.wiFor!==latestKey(u)){ VIEW.wi={marks:{...rec.marks}, subjects:{...rec.subjects}}; VIEW.wiFor=latestKey(u); }
    const W=VIEW.wi, simRec={...rec, marks:{...W.marks}, subjects:{...W.subjects}}, us=simUser(u,simRec);
    const focus = ctxT ? new Set(targetAnalysis(u,ctxT).reqs.flatMap(r=>[r.q,...(r.q.alt||[])].map(x=>x.subject))) : null;
    const isFocus = k => !focus || [...focus].some(s=>subjectMark(rec,s)!==null && subjectMark(rec,s)!==undefined && ((k==='maths'&&/Math/.test(s))||subjName(rec.subjects,k).includes(s.replace(/s$/,''))||(k==='hl'||k==='fal')&&/English|Language/.test(s)));
    const rows = FET_KEYS.map(k=>{ const cur=Number(rec.marks[k])||0, nv=Number(W.marks[k])||0;
      return `<div class="wirow ${isFocus(k)?'focus':''}"><label for="wi-${k}">${esc(formLabel(W.subjects,k))}${W.subjects[k]!==rec.subjects[k]?' <em>(changed)</em>':''}</label>
        <input type="range" id="wi-${k}" data-wi="${k}" min="0" max="100" step="1" value="${nv}" aria-valuetext="${nv}%">
        <span class="wival" id="wv-${k}">${nv}% <small>L${level(nv)}</small>${nv!==cur?` <em class="${nv>cur?'up':'down'}">${nv>cur?'+':''}${nv-cur}</em>`:''}</span></div>`; }).join('');
    const swaps = `<details class="tsec"><summary>What if I change a subject? <span class="pm">${I('plus')}</span></summary><div class="tsb">
      <div class="subjset"><label>Mathematics subject<select class="input" data-wis="maths">${FET_MATHS.map(m=>`<option ${W.subjects.maths===m?'selected':''}>${m}</option>`).join('')}</select></label>
      ${['e1','e2','e3'].map((e,i)=>`<label>Elective ${i+1}<select class="input" data-wis="${e}">${FET_ELECTIVES.map(x=>`<option ${W.subjects[e]===x?'selected':''}>${x}</option>`).join('')}</select></label>`).join('')}</div>
      <p class="hint">A changed subject keeps the mark set by its slider. Whether a subject change is possible depends on your school and your grade.</p></div></details>`;
    const before=currentAps(u), after=apsOf(simRec), T=fetOf(u).courseTargets;
    const tRows=T.map(c=>{ const A0=targetAnalysis(u,c), F0=fitStatus(u,c,A0), A1=targetAnalysis(us,c), F1=fitStatus(us,c,A1), out=A1.reqs.filter(r=>r.status!=='meets').map(r=>[r.q,...(r.q.alt||[])].map(x=>x.subject).join(' or '));
      return `<div class="witarget ${ctxT&&ctxT.id===c.id?'ctx':''}"><div><b>${esc(c.course)}</b><small>${esc(A0.uni?.abbr||c.uni)}</small></div>
        <div class="wichg"><span>${F0.e} ${F0.t}</span><span class="arr">→</span><span><b>${F1.e} ${F1.t}</b></span></div>
        <small>Projected ${esc(A1.label)} ${A0.score??'—'} → <b>${A1.score??'—'}</b>${A1.min!=null?` · published minimum ${A1.min}`:''}${out.length?` · still outstanding: ${esc(out.join(', '))}`:''}</small></div>`; }).join('');
    const m0=VIEW.wiM0 ?? (VIEW.wiM0=matchingProgrammes(u).length), m1=matchingProgrammes(us), newly=m1.length-m0;
    return fetTop(u,initials,planTxt,'Plan','What If?',title) + `
      <p class="mindisc">${I('info')} <span>What If? shows projections based on your latest submitted results (${esc(rkLabel(latestKey(u)))}) and the published requirements in Pathway’s data. Nothing here is saved, and it doesn’t predict or guarantee admission.</span></p>
      <div class="wigrid"><section class="glass fsec2"><h2>Adjust your results</h2>${rows}${swaps}<div class="actions"><button class="btn btn-ghost btn-sm" id="wireset">${I('refresh')} Reset to my results</button></div></section>
      <section class="glass fsec2 wiout"><h2>What could change</h2>
        <div class="pstats"><div class="pstat"><small>Projected APS now</small><b>${before}</b></div><div class="pstat"><small>What-if Projected APS</small><b>${after}</b></div><div class="pstat"><small>Difference</small><b class="${after>=before?'up':'down'}">${after-before>0?'+':''}${after-before}</b></div></div>
        ${T.length?`<h3 class="h3s">Your Study Targets</h3>${tRows}`:`<p class="hint">Add Study Targets to see how this would affect them.</p>`}
        <h3 class="h3s">Programmes in Pathway’s data</h3>
        <p>You currently meet the published minimum and listed subject requirements for <b>${m0}</b> programmes. With these changes it would be <b>${m1.length}</b>.</p>
        ${newly>0?`<p class="okline">This could increase the number of programmes for which you meet the published minimum. These may open additional options, for example:</p><ul class="plist">${m1.filter(m=>!matchingProgrammes(u).some(x=>x.co.id===m.co.id)).slice(0,5).map(m=>`<li>${I('star')}<span>${esc(m.co.name)} — ${esc(m.uni.abbr)}</span></li>`).join('')}</ul>`:newly<0?'<p class="hint">With these changes, fewer programmes would currently match.</p>':''}
        <p class="hint">${I('info')} Meeting the published minimum does not guarantee admission. A stronger academic profile may also help with bursaries, scholarships and competitive programmes — depending on the institution.</p>
      </section></div>`; });
}
whatIfPage.after = () => { const W=VIEW.wi; if(!W) return;
  document.querySelectorAll('[data-wi]').forEach(r=>{ r.addEventListener('input',()=>{ const v=document.getElementById('wv-'+r.dataset.wi); if(v) v.firstChild.textContent=r.value+'% '; });
    r.addEventListener('change',()=>{ W.marks[r.dataset.wi]=+r.value; const y=window.scrollY; render(); window.scrollTo(0,y); }); });
  document.querySelectorAll('[data-wis]').forEach(s=>s.addEventListener('change',()=>{ W.subjects[s.dataset.wis]=s.value; const y=window.scrollY; render(); window.scrollTo(0,y); }));
  document.getElementById('wireset')?.addEventListener('click',()=>{ VIEW.wi=null; render(); });
};

/* ---------- DECISION LAB (Grades 9–11; Grade 12 is pointed to After Matric) ---------- */
const FIELD_OF = f => { const x=f.toLowerCase(); return /health|medic|nurs|pharm|dent/.test(x)?'Health sciences':/engineer|built|architect|construct/.test(x)?'Engineering & built environment':/commerce|econom|management|business|account|financ/.test(x)?'Commerce & management':/law/.test(x)?'Law':/educat/.test(x)?'Education':/natural|science|comput|math|ict|information/.test(x)?'Science & technology':/agri/.test(x)?'Agriculture':/art|design|music|drama|creative/.test(x)?'Arts & design':/human|social|theolog|psych/.test(x)?'Humanities & social sciences':'Other'; };
const LANGUAGE_LIKE = s => /English|Language|Afrikaans|isi|Sepedi|Sesotho|Setswana|siSwati|Tshivenda|Xitsonga|Life Orientation/.test(s);
function scenarioCompat(sc){
  const set=new Set([sc.maths, ...sc.el].filter(Boolean)), ok=[], blockers={};
  UNI_DB.forEach(uni=>uni.courses.forEach(co=>{ if(co.inactive || !co.reqs?.length && co.minScore==null) return;
    if((co.notAccepted||[]).includes(sc.maths)){ blockers[`${sc.maths} not accepted`]=(blockers[`${sc.maths} not accepted`]||0)+1; return; }
    const miss=co.reqs.filter(q=>![q,...(q.alt||[])].some(x=>LANGUAGE_LIKE(x.subject)||set.has(x.subject)||set.has(x.subject.replace(/Science$/,'Sciences'))));
    if(miss.length) miss.forEach(q=>{ const k=[q,...(q.alt||[])].map(x=>x.subject).join(' or '); blockers[k]=(blockers[k]||0)+1; });
    else ok.push({uni,co}); }));
  const fields={}; ok.forEach(({co})=>{ const f=FIELD_OF(co.faculty); fields[f]=(fields[f]||0)+1; });
  const fam = CAREER_FAMILIES.map(f=>{ const mathsOK = f.maths==='required'||f.maths==='preferred' ? sc.maths==='Mathematics' : f.maths==='technical' ? sc.maths!=='Mathematical Literacy' : true;
    const has=(f.subjects||[]).filter(s=>set.has(s)); return {f, mathsOK, has}; });
  return {ok, fields:Object.entries(fields).sort((a,b)=>b[1]-a[1]), blockers:Object.entries(blockers).sort((a,b)=>b[1]-a[1]).slice(0,4),
    opens:fam.filter(x=>x.mathsOK && (x.has.length || !(x.f.subjects||[]).length)).map(x=>x.f), mayRestrict:fam.filter(x=>!x.mathsOK).map(x=>x.f)};
}
function decisionLabPage(){
  return shell((u,initials,planTxt)=>{ const g=gradeOf(u);
    const intro = g==='9'?'Compare subject combinations for Grade 10 and see what each may open up.':g==='10'?'See how your current subjects — and other combinations — connect to future courses and careers.':g==='11'?'Check what your subjects keep open, and which requirements you may still need to meet.':'At Grade 12 the focus moves to realistic course and application decisions.';
    if(g==='12') return fetTop(u,initials,planTxt,'Explore','Decision Lab',intro)+`<section class="glass fsec2"><p>Your subjects are set for matric, so Pathway focuses on your options with the subjects you have.</p><div class="actions"><a class="btn btn-purple" href="#/targets/matches">Programmes that match my current subjects ${ARROW}</a><a class="btn btn-ghost" href="#/after-matric">After Matric ${ARROW}</a></div></section>`;
    if(!VIEW.dl){ const rec=isFET(u)?latestRec(u):null, st=g==='9'?latestReady(u):null, dna=st?stagesOf(u)[st.key]?.dna:null;
      const A = rec ? {maths:rec.subjects.maths, el:[rec.subjects.e1,rec.subjects.e2,rec.subjects.e3], label:'My current subjects'}
              : dna ? {maths:dna.math.route, el:[...dna.electives.subjects].slice(0,3), label:'Pathway DNA suggestion'} : {maths:'Mathematics', el:['Physical Sciences','Life Sciences','Geography'], label:'Scenario A'};
      VIEW.dl=[A, {maths:'Mathematical Literacy', el:['Business Studies','Accounting','Geography'], label:'Scenario B'}]; }
    const S=VIEW.dl, res=S.map(scenarioCompat);
    const col=(sc,i,r)=>`<section class="glass fsec2 dlcol"><div class="dlhead"><input class="input dlname" data-dln="${i}" value="${esc(sc.label)}" aria-label="Scenario name" maxlength="30">${S.length>1?`<button class="ob" data-dlrm="${i}" aria-label="Remove scenario">✕</button>`:''}</div>
      <label class="dll">Mathematics<select class="input" data-dlm="${i}">${FET_MATHS.map(m=>`<option ${sc.maths===m?'selected':''}>${m}</option>`).join('')}</select></label>
      ${[0,1,2].map(j=>`<label class="dll">Elective ${j+1}<select class="input" data-dle="${i}-${j}">${FET_ELECTIVES.filter(x=>x!=='Other elective').map(x=>`<option ${sc.el[j]===x?'selected':''}>${x}</option>`).join('')}</select></label>`).join('')}
      <div class="dlres"><p class="dlbig"><b>${r.ok.length}</b> programmes in Pathway’s university data list subject requirements that these subjects can cover.</p>
        ${r.fields.length?`<p class="hint">These subjects may open pathways in:</p><div class="tags">${r.fields.slice(0,5).map(([f,n])=>`<span class="tag">${esc(f)} · ${n}</span>`).join('')}</div>`:''}
        <p class="hint" style="margin-top:10px">Career areas this combination is commonly connected to:</p><div class="tags">${r.opens.slice(0,6).map(f=>`<a class="tag rel" href="#/careers">${esc(f.name)}</a>`).join('')}</div>
        ${r.blockers.length?`<p class="hint" style="margin-top:10px">Some courses may require:</p><ul class="plist">${r.blockers.map(([k,n])=>`<li>${I('info')}<span>${esc(k)} — ${n} programme${n===1?'':'s'}</span></li>`).join('')}</ul>`:''}
        ${r.mayRestrict.length?`<p class="hint">Areas that usually ask for Mathematics (not Maths Literacy): ${esc(r.mayRestrict.slice(0,4).map(f=>f.name).join(', '))}.</p>`:''}
      </div></section>`;
    return fetTop(u,initials,planTxt,'Explore','Decision Lab',intro) + `
      <p class="mindisc">${I('info')} <span>Decision Lab doesn’t tell you which subjects to choose. It shows what different combinations may connect to, using the subject requirements in Pathway’s university data (marks aren’t considered here). More options isn’t automatically better — what matters is what fits you. Subject availability depends on your school.</span></p>
      <div class="dlgrid">${S.map((sc,i)=>col(sc,i,res[i])).join('')}</div>
      ${S.length<3?`<div class="actions"><button class="btn btn-ghost" id="dladd">${I('plus')} Add a scenario</button></div>`:''}`; });
}
decisionLabPage.after = () => { const S=VIEW.dl; if(!S) return; const re=()=>{ const y=window.scrollY; render(); window.scrollTo(0,y); };
  document.querySelectorAll('[data-dlm]').forEach(s=>s.addEventListener('change',()=>{ S[+s.dataset.dlm].maths=s.value; re(); }));
  document.querySelectorAll('[data-dle]').forEach(s=>s.addEventListener('change',()=>{ const [i,j]=s.dataset.dle.split('-').map(Number); S[i].el[j]=s.value; re(); }));
  document.querySelectorAll('[data-dln]').forEach(s=>s.addEventListener('change',()=>{ S[+s.dataset.dln].label=s.value.trim()||`Scenario ${+s.dataset.dln+1}`; }));
  document.querySelectorAll('[data-dlrm]').forEach(b=>b.addEventListener('click',()=>{ S.splice(+b.dataset.dlrm,1); re(); }));
  document.getElementById('dladd')?.addEventListener('click',()=>{ S.push({maths:'Mathematics', el:['Accounting','Business Studies','Economics'], label:`Scenario ${String.fromCharCode(65+S.length)}`}); re(); });
};

/* ---------- AFTER MATRIC (Grades 10–12; most detailed in Grade 12) ---------- */
const AFTER_ROUTES = [
  ['University','Degrees and some diplomas and higher certificates. Admission uses your NSC results, programme requirements and selection.'],
  ['University of technology','Career-focused diplomas and degrees, often with practical work experience built in.'],
  ['TVET college','Practical, work-focused qualifications and trades at public colleges.'],
  ['Learnerships','Structured learning that combines work experience with study towards a recognised qualification.'],
  ['Apprenticeships','Training in a trade under a qualified artisan, leading to a trade test.'],
  ['Work','Starting work can build experience and income — some people study part-time alongside.'],
  ['Gap year','A planned year to work, volunteer or improve results — with a clear plan for what comes next.']
];
const AFTER_FUNDING = [['NSFAS','The National Student Financial Aid Scheme funds eligible students at public universities and TVET colleges. Check the official NSFAS website for current criteria and dates.'],['Bursaries','Funding from companies, government or organisations — sometimes with a work-back agreement.'],['Scholarships','Awards usually based on academic, sporting or other achievement.'],['University financial aid','Many universities offer their own bursaries and merit awards — check each financial aid office.']];
function afterMatricPage(){
  return shell((u,initials,planTxt)=>{ const g=gradeOf(u), T=fetOf(u).courseTargets, An=T.map(c=>({c, A:targetAnalysis(u,c)}));
    const nbt=An.filter(x=>x.A.course?.nbt || (x.A.uni?.info?.nbt||[]).some(([gr,r])=>!/not required/i.test(r))).map(x=>x.A.uni?.abbr||x.c.uni);
    const dates=g==='10'?[]:fetOtherDates(u).filter(x=>x.prio===0);
    const steps = T.length ? [
      `Check your final NSC results.`,
      `Confirm that you meet the requirements for ${An.map(x=>`${x.c.course} (${x.A.uni?.abbr||x.c.uni})`).join(', ')}.`,
      nbt.length ? `Complete the NBT — it’s listed for ${[...new Set(nbt)].join(', ')}.` : `Check whether your programmes need the NBT.`,
      `Apply to your selected institutions before their closing dates${dates.length?` — next: ${dates[0].title}, ${fmtShort(dates[0].date.toISOString().slice(0,10))}`:''}.`,
      'Apply for funding (NSFAS, bursaries, scholarships).',
      'Track your applications.',
      'Accept an offer and register.',
      'Arrange accommodation if you need it.'] : ['Choose up to three Study Targets so Pathway can personalise your next steps.','Check the requirements for each one.','Note application and funding dates.'];
    const sec2=(t,body,open)=>sec(t,t,body,open);
    return fetTop(u,initials,planTxt,'Plan','After Matric', g==='12'?'What you actually do after Grade 12 to get where you want to go.':'Looking ahead: what happens after Grade 12 — so you can plan early.') + `
      <section class="glass fsec2"><h2>${g==='12'?'Your next steps after matric':'Your next steps, looking ahead'}</h2>
        <ol class="ptl">${steps.map((s,i)=>`<li><span class="pn">${i+1}</span><span>${esc(s)}</span></li>`).join('')}</ol>
        <p class="planonly">${I('info')} PATHWAY helps you plan and track your journey. It does not submit applications on your behalf.</p>
        <div class="actions"><a class="btn btn-ghost btn-sm" href="#/targets">My Three Study Targets</a>${g==='12'?'<a class="btn btn-ghost btn-sm" href="#/applications">My Applications &amp; Deadlines</a>':''}</div></section>
      <section class="glass fsec2" style="margin-top:14px">
        ${sec2('Routes after matric',`<div class="termgrid">${AFTER_ROUTES.map(([t,d])=>`<div class="inner term"><b>${t}</b><p>${d}</p></div>`).join('')}</div>`, g==='12')}
        ${sec2('Funding: NSFAS, bursaries and scholarships',`<div class="termgrid">${AFTER_FUNDING.map(([t,d])=>`<div class="inner term"><b>${t}</b><p>${d}</p></div>`).join('')}</div>`)}
        ${sec2('Applications and the NBT',`<p>Apply through each institution’s official system (some KwaZulu-Natal institutions use the Central Applications Office). Many universities make early decisions using your final Grade 11 results.</p><p>${NBT_EXPLAIN}</p>${nbt.length?`<p><b>Your targets:</b> the NBT is listed for ${esc([...new Set(nbt)].join(', '))}.</p>`:''}`)}
        ${sec2('Accommodation and registration',`<p>Apply for residence early if you need it — some universities close residence applications with their main applications. After accepting an offer, registration is how you officially enrol; each institution sets its own dates and steps.</p>`)}
        ${sec2('Important dates',dates.length?`<ul class="plist">${dates.map(x=>`<li>${I('calendar')}<span><b>${fmtShort(x.date.toISOString().slice(0,10))}</b> — ${esc(x.title)}</span></li>`).join('')}</ul>`:`<p>${g==='10'?'Application dates become relevant from Grade 11.':'No upcoming dates for your target universities in Pathway’s data.'}</p>`)}
      </section>`; });
}

/* ---------- MY PATHWAY MAP + STORY + MILESTONES (all grades) ---------- */
function myPathwayPage(){
  return shell((u,initials,planTxt)=>{ const g=gradeOf(u), fet=isFET(u), F=fet?fetOf(u):null, rec=fet?latestRec(u):null, st=latestReady(u), dna=st?stagesOf(u)[st.key]?.dna:null;
    const subjects = rec ? FET_KEYS.filter(k=>k!=='lo').map(k=>subjName(rec.subjects,k)) : dna ? [dna.math.route, ...dna.electives.subjects] : [];
    const interests = [...new Set([...(F?.favCareers||[]), ...(F?.courseTargets||[]).map(c=>c.career).filter(Boolean)])];
    const courses = (F?.courseTargets||[]).map(c=>c.course), unis=[...new Set((F?.courseTargets||[]).map(c=>c.uni))];
    const alts = [...new Set(interests.flatMap(n=>altCareersFor(n).slice(0,3)))].slice(0,5);
    const node=(t,items,empty,link)=>`<div class="pmnode glass"><small>${t}</small>${items.length?`<div class="tags">${items.slice(0,6).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>`:`<p class="hint">${empty}</p>`}${link?`<a class="link" href="${link[1]}">${link[0]}</a>`:''}</div>`;
    const map = `<div class="pmap">${node('You',[`${u.first} · Grade ${g}`],'')}
      ${node('Subjects',subjects, g==='9'?'Your Pathway DNA suggests a subject direction once it’s ready.':'Add your results to show your subjects.', g==='9'?['Pathway DNA →','#/dna']:['My results →','#/aps'])}
      ${node('Career interests',interests,'Save careers in Career Explorer to see them here.',['Career Explorer →','#/careers'])}
      ${fet?node('Courses',courses,'Add Study Targets to see your courses.',['Study Targets →','#/targets']):''}
      ${fet?node('Universities',unis,'Your target universities appear here.',null):''}
      ${node('Alternative pathways',alts,'Related routes appear once you’ve saved careers.',null)}
      ${node('Future opportunities',[...new Set(interests.map(n=>(CAREERS.find(c=>c.name===n)||{}).family).filter(Boolean).map(f=>familyOf(f).name))],'Your options grow as you explore.',null)}</div>`;
    /* story: dated events Pathway already knows */
    const ev=[]; const P=u.progress||{};
    ev.push([u.createdAt,`You joined Pathway in Grade ${u.fetStart?.grade && !Object.keys(P.dnaStages||{}).length ? u.fetStart.grade : (u.gradeHistory?.[0]?.from||g)}.`]);
    if(P.a1?.completedAt) ev.push([P.a1.completedAt,'Completed Pathway Assessment 1.']);
    if(P.a2?.completedAt) ev.push([P.a2.completedAt,'Completed Pathway Assessment 2.']);
    Object.values(P.dnaStages||{}).forEach(s=>{ if(s.readyAt && s.readyAt<=Date.now()) ev.push([s.readyAt, `${DNA_STAGE_DEFS.find(d=>d.key===s.key)?.title||'Pathway DNA'} created.`]); });
    if(F) Object.entries(F.record).forEach(([k,r])=>{ if(r.approved && r.approvedAt) ev.push([r.approvedAt,`Uploaded ${rkLabel(k)} results.`]); });
    (u.gradeHistory||[]).forEach(h=>ev.push([h.at,`Moved into Grade ${h.to}.`]));
    ev.sort((a,b)=>a[0]-b[0]);
    const ms = [['Pathway Assessment completed', !!(P.a1?.completedAt&&P.a2?.completedAt)],['Pathway DNA created', Object.values(P.dnaStages||{}).some(s=>s.status==='ready'||s.readyAt<=Date.now())],
      ['Results uploaded', fet?approvedKeys(u).length>0:!!P.g8?.done],['First career explored', !!F?.visited?.careers || (F?.favCareers||[]).length>0],
      ...(fet?[['First Study Target added', F.courseTargets.length>0],['Published minimum reached', F.courseTargets.some(c=>fitStatus(u,c).apsOK)],['On track for a Study Target', F.courseTargets.some(c=>fitStatus(u,c).level==='ontrack')]]:[]),
      ...(g==='11'||g==='12'?[['Application ready', readinessItems(u).every(x=>x.done)]]:[]),
      ...(g==='12'?[['Application submitted', Object.values(F.applications||{}).some(a=>['Submitted','Provisional offer','Accepted','Waitlisted'].includes(a.status))]]:[])];
    return fetTop(u,initials,planTxt,'My Pathway','My Pathway Map','How your subjects, interests, courses and options connect.') + `
      <section class="glass fsec2"><h2>My options</h2>${map}<p class="pmnote">${I('compass')} One decision does not determine your entire future — there is more than one route to where you want to go.</p></section>
      <div class="pmcols"><section class="glass fsec2"><h2>My Pathway story</h2><ol class="story">${ev.map(([t,x])=>`<li><small>${new Date(t).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})}</small><span>${esc(x)}</span></li>`).join('')}</ol><p class="hint">You’ve been building your pathway over time.</p></section>
      <section class="glass fsec2"><h2>Milestones</h2><ul class="mstones">${ms.map(([t,d])=>`<li class="${d?'done':''}"><span>${d?I('check'):''}</span>${t}</li>`).join('')}</ul></section></div>`; });
}

/* ---------- ALTERNATIVE PATHWAYS (Career Explorer) — curated, related routes; never framed as lesser ---------- */
const ALT_CAREERS = {
  'Doctor':['Pharmacist','Physiotherapist','Medical Technologist','Radiographer','Biomedical Engineer','Paramedic (Emergency Medical Care)','Occupational Therapist','Nurse'],
  'Dentist':['Dental Therapist','Oral Hygienist','Doctor','Pharmacist'],
  'Chartered Accountant':['Management Accountant','Auditor','Accountant','Forensic Accountant','Financial Planner','Actuary'],
  'Accountant':['Chartered Accountant','Management Accountant','Auditor','Forensic Accountant','Financial Planner'],
  'Lawyer':['Attorney','Advocate'], 'Attorney':['Advocate','Lawyer'], 'Advocate':['Attorney','Lawyer'],
  'Architect':['Architectural Technologist','Interior Architect','Landscape Architect','Quantity Surveyor','Town Planner'],
  'Psychologist':['Clinical Psychologist','Counselling Psychologist','Educational Psychologist','Industrial Psychologist','Social Worker'],
  'Teacher':['Foundation Phase Teacher','Intermediate Phase Teacher','Senior Phase Teacher','High School (FET) Teacher','Special Needs Educator']
};
function altCareersFor(name){
  const c=CAREERS.find(x=>x.name===name); if(!c) return [];
  let list=ALT_CAREERS[name]; if(!list){ const P=pathwayFor(name); if(P && /Engineer/.test(name)) list=['Engineering Technologist','Engineering Technician',...P.careers.filter(x=>x!==name).slice(0,3)]; }
  if(!list) list=CAREERS.filter(x=>x.family===c.family && x.name!==name).slice(0,5).map(x=>x.name);
  return list.filter(n=>n!==name && CAREERS.some(x=>x.name===n));
}
function altPathwaysHTML(c, g){
  const alts=altCareersFor(c.name).slice(0,6); if(!alts.length) return '';
  return `<p class="hint">Your first choice isn’t your only option. These are related routes into this career area — different, not lesser.</p><div class="altgrid">${alts.map(n=>{ const a=CAREERS.find(x=>x.name===n), P=pathwayFor(n), info=exInfo(a);
    return `<div class="inner altcard"><b>${esc(n)}</b><p>${esc(info.desc)}</p>${g>=10?`<small><b>Study route:</b> ${esc(P?.steps?.[0]||STUDY_ROUTES[a.family]||'')}</small>`:''}${g>=11&&P?`<small><b>Professional body:</b> ${P.bodies.map(k=>BODY[k].abbr).join(', ')}</small>`:''}<small><b>School subjects:</b> ${esc(exSubjects(a).join(', '))}</small><a class="link" href="#/careers/view?c=${encodeURIComponent(n)}">Explore this pathway →</a></div>`; }).join('')}</div>`;
}
/* "What happens next?" — shown after major actions */
const nextPanel = (title, items) => `<section class="glass fsec2 nextpanel"><small>What’s next?</small><h3>${esc(title)}</h3><div class="actions">${items.map(([t,l])=>`<a class="btn btn-ghost btn-sm" href="${l}">${esc(t)} ${ARROW}</a>`).join('')}</div></section>`;

/* ============================================================
   HOME
   ============================================================ */
function nextAction(u){
  const p=u.progress;
  for(const n of [1,2]){
    const st=aStatus(u,n); if(st==='complete') continue;
    const nx=nextSection(u,n), d=doneCount(u,n), t=sectionsOf(n).length;
    if(p['a'+n].active){ const s=sectionsOf(n).find(x=>x.id===p['a'+n].active); return {ic:n===1?'compass':'clipboard', t:`Finish ${secLabel(n,s)} of Pathway Assessment ${n}`, d:'You started this section. Finish it to save your progress — then you can take a break.', btn:'Continue section', go:'#/assessment/'+n, note:`${d} of ${t} sections complete`}; }
    if(n===1) return {ic:'compass', t: st==='new'?'Complete Pathway Assessment 1':'Continue Pathway Assessment 1', d:'The first step in getting to know you. Answer honestly and as well as you can — there’s no pass or fail, and you won’t see a mark.', btn: st==='new'?'Start Assessment':'Continue Assessment', go:'#/assessment/1', note: st==='new'?'7 sections · about an hour · save and exit after any section':`${d} of ${t} sections complete · next: ${secLabel(1,nx)}`};
    return {ic:'clipboard', t: st==='new'?'Complete Pathway Assessment 2':'Continue Pathway Assessment 2', d:'Help Pathway get to know you even better — including a section all about you. Just answer naturally.', btn: st==='new'?'Start Assessment':'Continue Assessment', go:'#/assessment/2', note: st==='new'?'9 sections · about 55 minutes · save and exit after any section':`${d} of ${t} sections complete · next: ${secLabel(2,nx)}`};
  }
  if(!isApproved(p.g8)) return {ic:'upload', t:'Upload your Grade 8 results', d:'Both Pathway Assessments are complete. Add and confirm your final Grade 8 marks — this is the last step before Pathway builds your Pathway DNA.', btn:'Upload your Grade 8 results', go:'#/results/add?set=g8', note:'Have your Grade 8 Term 4 report card nearby.'};
  /* newest stage that is taking shape or ready but not yet opened */
  for(const d of [...DNA_STAGE_DEFS].reverse()){ const st=stageState(u,d.key), S=stagesOf(u)[d.key];
    if(st==='processing') return {ic:'dna', t:'Your Pathway DNA is taking shape…', d:`Pathway is carefully looking at your information to build your ${d.title}. You can come back later — it will open as soon as it’s ready.`, btn:'See progress', go:'#/dna/stage?k='+d.key, note:'Nothing needs to be restarted.'};
    if(st==='ready' && !S.viewed) return {ic:'dna', t:`Your ${d.title} is ready`, d:'Pathway has brought your assessments and results together into your personalised guidance.', btn:'Explore your Pathway DNA', go:'#/dna/stage?k='+d.key, note:'Ready now'};
  }
  const nt = G9_TERMS.find(t=>!isApproved(p.g9?.[t]));
  if(nt) return {ic:'chart', t:`Upload Grade 9 Term ${nt} Results`, d:`When your Term ${nt} report comes out, add and confirm it in My Results. Pathway will then build your Pathway DNA — Post Grade 9 Term ${nt}.`, btn:`Go to My Results`, go:'#/results', note:'Your earlier Pathway DNA stays available.'};
  return {ic:'dna', t:'Revisit your Pathway DNA', d:'All four Grade 9 terms are in. Your Pathway DNA journey reflects your full Grade 9 year.', btn:'My Pathway DNA', go:'#/dna', note:'Keep exploring your options.'};
}
/* ============================================================
   HOME (Grade 9) — Where am I? What's next? Anything important?
   ============================================================ */
/* Upcoming dates come ONLY from real sources. Official school/province term dates, university dates and application
   deadlines are added to these lists when they're confirmed; until then nothing is invented. */
const DATE_SOURCES = { schoolTerms:[], university:[], deadlines:[] };   /* each entry: {date:'YYYY-MM-DD', title, sub, grades:['9',...]} */
const addMonths = (d,n) => { const x=new Date(d); const day=x.getDate(); x.setMonth(x.getMonth()+n); if(x.getDate()<day) x.setDate(0); return x; };
function subscriptionInfo(u){
  if(!u) return null;
  if(u.paymentRequired===false && !u.sub) return {demo:true};
  const s=u.sub; if(!s) return null;
  const start=new Date(s.paidAt||u.createdAt||Date.now()), now=new Date();
  if(s.plan==='annual'){ const until=addMonths(start,12); return {plan:'annual', active: now<until, validUntil:until, amount:'R199 / year'}; }
  let next=addMonths(start,1), k=1; while(next<=now){ k++; next=addMonths(start,k); }
  return {plan:'monthly', active:true, nextPayment:next, amount:'R20 / month'};
}
const fmtLong = d => d.toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'});
function upcomingDates(u){
  const t=today(), g=gradeOf(u), out=[];
  TERMS.forEach(tm=>{ [[tm.s,`Term ${tm.n} starts`,'School opens'],[tm.e,`Term ${tm.n} ends`,'Last school day of the term']].forEach(([ds,title,sub])=>{ const d=d0(ds); if(d>=t) out.push({date:d, title, sub, c:'purple', icon:'calendar'}); }); });
  Object.values(DATE_SOURCES).flat().forEach(x=>{ const d=d0(x.date); if(d>=t && (!x.grades || x.grades.includes(g))) out.push({date:d, title:x.title, sub:x.sub||'', c:x.c||'purple', icon:x.icon}); });
  if(isFET(u) && gradeOf(u)==='12') (fetOf(u).deadlines||[]).forEach(x=>{ const d=d0(x.date); if(d>=t) out.push({date:d, title:x.title||x.type, sub:`${x.type}${x.uni?' · '+x.uni:''}`, c:'gold', icon:'calendar'}); });
  const si=subscriptionInfo(u);
  if(si?.plan==='monthly') out.push({date:si.nextPayment, title:'Subscription renewal', sub:'R20 monthly subscription', c:'gold', icon:'card'});
  if(si?.plan==='annual' && si.active && (si.validUntil - t) < 60*864e5) out.push({date:si.validUntil, title:'Annual subscription renewal', sub:'Your 12 months of access end on this date', c:'gold', icon:'card'});
  return out.sort((a,b)=>a.date-b.date);
}
function datesHTML(u, all){
  const list=upcomingDates(u), show= all?list:list.slice(0,3);
  if(!list.length) return `<div class="caughtup inner"><span class="cu-ic">📅</span><div><b>No upcoming dates</b><p>There are no upcoming dates for you right now.</p></div></div>`;
  return `<ul class="dlist">${show.map(x=>`<li><div class="dbox inner"><b>${String(x.date.getDate()).padStart(2,'0')}</b><span>${MON[x.date.getMonth()]}</span></div><div class="ditem inner"><span class="dt ${x.c}"></span><div><b>${x.icon?I(x.icon)+' ':''}${esc(x.title)}</b><small>${esc(x.sub)}</small></div></div></li>`).join('')}</ul>`;
}
function subscriptionCard(u){
  const si=subscriptionInfo(u); if(!si) return '';
  if(si.demo) return `<section class="glass subcard"><div class="subh"><b>Your Pathway Subscription</b><span class="schip mute">Demo access</span></div><p class="hint">Demo account — no payment required (testing only).</p></section>`;
  return `<section class="glass subcard"><div class="subh"><b>Your Pathway Subscription</b><span class="schip ${si.active?'ok':'warn'}">${si.active?'● Active':'Ended'}</span></div>
    ${si.plan==='annual' ? `<p>Valid until: <b>${fmtLong(si.validUntil)}</b></p><p class="hint">R199 · one payment for 12 months</p>` : `<p>Next payment: <b>${fmtLong(si.nextPayment)}</b></p><p class="hint">R20 / month</p>`}
    <a class="link" href="#/subscription">Manage subscription →</a></section>`;
}
function exploreLearn(u){
  return `<section class="glass explore"><h2>Explore &amp; Learn</h2><p class="sub">Resources for you to explore whenever you like — not tasks you have to complete.</p>
    <div class="exgrid">
      <a class="inner excard" href="#/careers"><span class="exic">🎯</span><span><b>Understand Careers</b><small>Explore careers and discover what different paths could look like.</small><em>Career Explorer →</em></span></a>
      <a class="inner excard" href="#/pathway-101"><span class="exic">📖</span><span><b>Learn the Jargon</b><small>Understand the terms and concepts you’ll meet in Grade ${esc(u.grade)}.</small><em>Pathway 101 →</em></span></a>
    </div></section>`;
}
/* journey dependencies: each step knows why it is locked */
function stepInfo(u,k){
  const p=u.progress, st=stageState(u,'initial');
  switch(k){
    case 'a1': return {done:p.a1.done};
    case 'a2': return {done:p.a2.done, lock: !p.a1.done && 'Complete Pathway Assessment 1 first.'};
    case 'g8': return {done:isApproved(p.g8), lock: !p.a2.done && 'Complete Pathway Assessment 2 first.'};
    case 'dna': return {done: st==='ready' && !!stagesOf(u).initial?.viewed, lock: !isApproved(p.g8) && 'Confirm your Grade 8 results first.', note: st==='processing' ? 'Taking shape…' : null};
    case 'g9': { const nt=G9_TERMS.find(t=>!isApproved(p.g9?.[t])); return {done:!nt, lock: st!=='ready' && 'Available after your Initial Pathway DNA.', note: nt && st==='ready' ? `Next: Term ${nt} results` : null}; }
  }
  return {};
}
function home(){
  return shell((u,initials,planTxt)=>{
    const tl = isFET(u) ? {main:`Term ${learnerTerm(u)}`} : termLabel();
    const top = `<div class="topbar">
      <div>
        <div class="today">${longDate()}</div>
        <h1 class="greet">${greeting()}, <span class="nm">${esc(u.first)}.</span></h1>
        <p class="greet-sub">${gradeOf(u)==='9' ? 'Here\'s what\'s happening on your Pathway.' : `Welcome to Grade ${esc(u.grade)} — the chapter where you ${gradeTheme(u).chapter.toLowerCase()}.`}</p>
        <div class="chips"><span class="chip grade">Grade ${esc(u.grade)} · ${gradeTheme(u).chapter}</span><span class="dot"></span><span class="chip">${tl.main}${tl.note?` <span style="color:var(--muted)">· ${tl.note}</span>`:''}</span></div>
      </div>
      <div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div>
    </div>`;
    if(String(u.grade)!=='9') return top + fetHome(u);
    const info = Object.fromEntries(STEPS.map(s=>[s.k, stepInfo(u,s.k)]));
    const cur = STEPS.findIndex(s=>!info[s.k].done), curI = cur<0 ? STEPS.length : cur;
    const doneN = STEPS.filter(s=>info[s.k].done).length;
    const steps = STEPS.map((s,i)=>{ const f=info[s.k];
      const st = f.done ? 'done' : i===curI ? 'current' : f.lock ? 'locked' : 'upcoming';
      const attrs = st==='locked' ? `data-act="soon" data-msg="${esc(f.lock)}" aria-disabled="true"` : `data-go="${s.go}"`;
      const aria = `${s.t}. ${st==='done'?'Completed':st==='current'?'Current step':st==='locked'?'Locked. '+f.lock:'Available'}`;
      return `<li class="step ${st}"><button ${attrs} aria-label="${esc(aria)}"><span class="node">${I(st==='done'?'check':st==='locked'?'lock':s.ic)}</span><span class="num">${i+1}</span><span class="txt"><span class="tt">${s.t}</span><span class="dd">${st==='done'?'Completed':s.d}</span>${st==='locked'?`<span class="whylock">${I('lock')} ${esc(f.lock)}</span>`:f.note?`<span class="stepnote">${esc(f.note)}</span>`:''}</span></button></li>`; }).join('');
    const n=nextAction(u), N=STEPS.length;
    const dates = `<section class="glass dates" aria-labelledby="dh">
      <div class="panel-h"><h2 id="dh">Upcoming Dates</h2>${upcomingDates(u).length>3?`<button class="viewall" id="viewall" aria-expanded="false">View All ${ARROW}</button>`:''}</div>
      <p class="sub">Based on your profile and study targets</p>
      <div id="dl">${datesHTML(u,false)}</div>
    </section>`;
    return top + `
    <section class="glass panel" aria-labelledby="jh">
      <div class="panel-h"><h2 id="jh">Your Journey</h2><span class="meta">${curI<N?`Step ${curI+1} of ${N}`:'All steps complete'} · ${doneN} completed</span></div>
      <div class="journey-scroll"><ol class="steps" style="--n:${N}"><span class="track"></span><span class="fill" style="width:calc((100% - 100% / ${N}) * ${Math.min(curI,N-1)/(N-1)})"></span>${steps}</ol></div>
    </section>
    <div class="lower">
      <section class="glass next" aria-labelledby="nh">
        <h2 id="nh" style="font-size:clamp(1.7rem,2.4vw,2.2rem)">What's Next?</h2>
        <div class="next-body inner">
          <div class="next-ic">${I(n.ic)}</div>
          <div><h3>${n.t}</h3><p>${n.d}</p><a class="btn btn-purple" href="${n.go}">${n.btn} ${ARROW}</a><p class="progress-note">${n.note}</p></div>
        </div>
      </section>
      <div class="rightcol">${dates}${subscriptionCard(u)}</div>
    </div>
    `;
  });
}
home.after = () => {
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
  const va=document.getElementById('viewall');
  if(va) va.addEventListener('click',()=>{ const open=va.getAttribute('aria-expanded')!=='true'; va.setAttribute('aria-expanded',open); va.innerHTML=(open?'Show less ':'View All ')+ARROW; document.getElementById('dl').innerHTML=datesHTML(me(),open); });
};

/* ---------- Manage subscription ---------- */
function subscriptionPage(){
  return shell((u,initials,planTxt)=>{
    const si=subscriptionInfo(u);
    const body = !si ? '<p>No active subscription.</p>' : si.demo ? '<p>This is a demo account used for testing. It has access without a payment.</p>' : `
      <ul class="rlist"><li><span>Plan</span><b>${si.plan==='annual'?'Annual — one payment for 12 months':'Monthly'}</b></li>
      <li><span>Status</span><b class="${si.active?'okc':'warnc'}">${si.active?'Active':'Ended'}</b></li>
      <li><span>Last payment</span><b>${u.sub?.paidAt?`Paid ${fmtLong(new Date(u.sub.paidAt))}`:'—'}</b></li>
      <li><span>Amount</span><b>${si.amount}</b></li>
      ${si.plan==='annual'?`<li><span>Valid until</span><b>${fmtLong(si.validUntil)}</b></li>`:`<li><span>Next payment</span><b>${fmtLong(si.nextPayment)}</b></li>`}
      ${u.sub?.last4?`<li><span>Card</span><b>ending ${esc(u.sub.last4)}</b></li>`:''}</ul>
      <div class="infonote inner">${I('bell')}<span>${si.plan==='monthly'?'Pathway reminds you a few days before each monthly payment.':'Pathway reminds you 30 days before your annual subscription ends.'}</span></div>
      <div class="infonote inner">${I('card')}<span>If a payment doesn’t go through, Pathway lets you know so you can update your payment details. Your results, targets and Pathway DNA stay saved.</span></div>
      <div class="infonote inner">${I('info')}<span>${si.plan==='monthly'?'You can cancel your monthly subscription anytime. ':''}To make a change to your subscription, contact Support and we’ll help you.</span></div>
      <div class="actions"><a class="btn btn-ghost" href="#/help/support">Contact Support ${ARROW}</a></div>`;
    return `<div class="topbar"><div><div class="today">Account</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">Your Pathway Subscription</h1></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>
      <section class="glass infocard" style="max-width:720px;margin-top:22px">${body}</section>`;
  });
}

/* ============================================================
   EXPLORE & LEARN — Career Explorer (all grades) and Pathway 101 (grade-specific)
   ============================================================ */
/* Pathway 101 — grade-specific explanations (general information; learners should confirm details with their school) */
const PATHWAY_101 = {
  9: [
    ['Senior Phase and FET Phase','Grades 7 to 9 are the Senior Phase. Grades 10 to 12 are the FET (Further Education and Training) Phase, which ends with the National Senior Certificate (matric).'],
    ['Subject choice','Near the end of Grade 9, you choose the subjects you’ll take from Grade 10 to Grade 12. These choices can affect which courses you can study later, so it’s worth exploring before you decide.'],
    ['Compulsory subjects','In Grades 10–12 everyone takes a Home Language, a First Additional Language, a Mathematics subject and Life Orientation.'],
    ['Elective subjects','On top of the compulsory subjects, you choose three electives — for example Physical Sciences, Accounting, Geography or Visual Arts. Which ones you can take depends on what your school offers.'],
    ['Mathematics, Mathematical Literacy and Technical Mathematics','From Grade 10 you take one of these. Mathematics goes deeper into algebra and reasoning; Mathematical Literacy focuses on maths in everyday life; Technical Mathematics is offered at technical schools. Many university programmes ask for Mathematics.'],
    ['Home Language and First Additional Language','Your Home Language is studied at the highest level; your First Additional Language is your second language. You’ll usually continue with the languages you take now.'],
    ['Life Orientation','A compulsory subject about personal development, health, citizenship and careers.'],
    ['Achievement levels','Marks are grouped into levels from 1 to 7: Level 7 is 80–100%, Level 6 is 70–79%, Level 5 is 60–69%, Level 4 is 50–59%, Level 3 is 40–49%, Level 2 is 30–39% and Level 1 is 0–29%.'],
    ['Term report','The report you get at the end of each term. You add these to Pathway so your Pathway DNA stays up to date.'],
    ['Aggregate','Your average across all your subjects. It gives a broad picture of how you’re doing overall.'],
    ['CAPS','The Curriculum and Assessment Policy Statement — the national curriculum that sets what you learn in each subject and grade.'],
    ['Pathway DNA','Pathway’s guide to your strengths, interests and possible subject directions, built from your assessments and results. It’s a guide, not a decision.']
  ],
  10: [
    ['FET Phase','Grades 10 to 12. Everything you do in these three years builds towards your National Senior Certificate (NSC).'],
    ['National Senior Certificate (NSC)','The qualification you receive when you pass matric. Your Grade 12 results on the NSC are what most universities and colleges look at.'],
    ['Your seven subjects','Home Language, First Additional Language, a Mathematics subject, Life Orientation and three electives.'],
    ['School-Based Assessment (SBA)','Tasks, tests and assignments done during the year. In Grades 10–12 they count towards your final mark alongside exams.'],
    ['Practical Assessment Task (PAT)','A practical project required in some subjects, such as Technology subjects, Visual Arts or Computer Applications Technology.'],
    ['Changing subjects','Some schools allow subject changes early in Grade 10. Rules differ between schools, so ask your school if you’re thinking about it.'],
    ['Career research','Grade 10 is a good time to start connecting your subjects to careers and courses you might want later.'],
    ['Achievement levels','Levels 1 to 7 describe your marks: Level 7 is 80–100% down to Level 1 at 0–29%.']
  ],
  11: [
    ['Admission Point Score (APS)','A score universities work out from your school results to see whether you meet a course’s minimum requirements. Each university calculates APS in its own way.'],
    ['Why Grade 11 results matter','Many universities use your final Grade 11 results when you apply during Grade 12, and may offer provisional places based on them.'],
    ['University, university of technology and TVET college','Universities offer mostly degrees; universities of technology focus on career-focused diplomas and degrees; TVET colleges offer technical and vocational qualifications.'],
    ['Minimum requirements','The lowest results a course will consider. Meeting them doesn’t guarantee a place, because many courses have more applicants than spaces.'],
    ['National Benchmark Tests (NBT)','Tests some universities ask applicants to write to assess academic literacy and mathematics readiness.'],
    ['Bursaries and funding','Money to help pay for studies. Many bursaries and funding schemes open applications during Grade 12, so it helps to start looking in Grade 11.'],
    ['Portfolio or audition','Some creative and performance courses ask for examples of your work or an audition as part of applying.']
  ],
  12: [
    ['NSC final exams','The national exams at the end of Grade 12 that lead to your National Senior Certificate.'],
    ['Preliminary exams (prelims)','Trial exams during Grade 12 that help you and your school see where you stand before the finals.'],
    ['Types of NSC passes','There are different levels of pass — Higher Certificate, Diploma and Bachelor’s — each opening different study options. The official requirements are set nationally; your school can explain exactly what each needs.'],
    ['Applications and closing dates','Universities and colleges set their own application periods and closing dates, often during the middle of Grade 12. Check each institution’s dates early.'],
    ['Admission Point Score (APS)','The score institutions work out from your results to check whether you meet a course’s minimum requirements. Each institution calculates it in its own way.'],
    ['NSFAS','The National Student Financial Aid Scheme, government funding for eligible students at public universities and TVET colleges. Check its website for current criteria and dates.'],
    ['Provisional and final acceptance','A provisional offer is often based on earlier results; the final decision usually depends on your final Grade 12 results.'],
    ['Supplementary exams','A chance, under certain conditions, to rewrite some exams after the final results. Your school can explain who qualifies.']
  ]
};
/* ============================================================
   CAREER EXPLORER CONTENT — short, learner-friendly descriptions for every career in CAREER_FAMILIES.
   Format: 'Career': 'What is it? | what people do; what people do; what people do'
   ============================================================ */
const CAREER_INFO = {
 /* health */
 'Doctor':'Doctors diagnose and treat illness and injury, and help people stay healthy.|Examine patients and ask about symptoms;Order tests and interpret the results;Prescribe treatment and follow up on progress',
 'Surgeon':'A surgeon is a doctor who treats illness or injury by performing operations.|Plan and carry out operations;Work closely with anaesthetists and theatre nurses;Check on patients as they recover',
 'Paediatrician':'A paediatrician is a doctor who specialises in the health of babies, children and teenagers.|Check that children are growing and developing well;Diagnose and treat childhood illnesses;Guide parents on their child’s health',
 'Psychiatrist':'A psychiatrist is a medical doctor who diagnoses and treats mental health conditions.|Assess people’s mental health;Prescribe medication and plan treatment;Work with psychologists and other health workers',
 'Anaesthetist':'An anaesthetist is a doctor who keeps patients safe and pain-free during operations.|Put patients to sleep or numb areas before surgery;Monitor breathing and heart rate during operations;Manage pain after surgery',
 'Dentist':'Dentists look after people’s teeth, gums and mouths.|Check teeth and find problems early;Fill cavities, fit crowns and remove teeth;Teach patients how to care for their teeth',
 'Dental Therapist':'Dental therapists provide basic dental care, often in clinics and communities.|Clean and fill teeth;Extract teeth that can’t be saved;Run oral health programmes in schools and communities',
 'Oral Hygienist':'Oral hygienists help prevent gum disease and tooth decay.|Clean and polish teeth;Take X-rays of the mouth;Teach people about brushing, flossing and diet',
 'Pharmacist':'Pharmacists are medicine experts who make sure people use medicines safely.|Check and dispense prescriptions;Advise people on how to take their medicine;Work in pharmacies, hospitals or the medicine industry',
 'Physiotherapist':'Physiotherapists help people move better and recover from injury or illness.|Assess how people move;Plan exercises and hands-on treatment;Help athletes, patients and older people regain strength',
 'Occupational Therapist':'Occupational therapists help people do everyday activities after illness, injury or with a disability.|Assess what a person finds difficult day to day;Plan activities and adapt environments;Help people return to school, work and independence',
 'Speech-Language Therapist':'Speech-language therapists help people who struggle with speaking, language or swallowing.|Assess speech, language and swallowing;Run therapy sessions for children and adults;Work with families and teachers',
 'Audiologist':'Audiologists test hearing and help people with hearing and balance problems.|Test people’s hearing;Fit and adjust hearing aids;Help people manage hearing loss',
 'Nurse':'Nurses care for patients and help them recover, in hospitals, clinics and communities.|Monitor patients and give medication;Assist doctors with treatment;Support and educate patients and families',
 'Midwife':'Midwives care for mothers and babies during pregnancy, birth and just after.|Check on mothers during pregnancy;Help deliver babies;Care for mothers and newborns after birth',
 'Radiographer':'Radiographers use imaging machines to see inside the body.|Take X-rays, CT and MRI scans;Position patients safely;Work with doctors who interpret the images',
 'Dietitian':'Dietitians use the science of food and nutrition to help people eat well and manage health conditions.|Assess people’s eating habits;Plan healthy eating programmes;Advise hospitals, schools and communities',
 'Optometrist':'Optometrists test eyesight and look after eye health.|Test vision and prescribe glasses or contact lenses;Check for eye diseases;Refer patients to eye doctors when needed',
 'Paramedic (Emergency Medical Care)':'Paramedics give emergency medical care at the scene and on the way to hospital.|Respond to emergencies;Stabilise injured or ill patients;Transport patients safely to hospital',
 'Medical Technologist':'Medical technologists test samples in laboratories to help doctors diagnose disease.|Analyse blood and tissue samples;Run and maintain laboratory equipment;Report accurate results to doctors',
 'Clinical Technologist':'Clinical technologists operate specialised medical equipment used to diagnose and treat patients.|Run equipment such as heart and lung machines;Perform specialised tests;Support doctors during procedures',
 'Biomedical Scientist':'Biomedical scientists research how the human body works and how diseases develop.|Run laboratory experiments;Study diseases and how to detect them;Help develop new tests and treatments',
 'Chiropractor':'Chiropractors treat problems with bones, muscles and joints, especially the spine.|Assess back, neck and joint pain;Use hands-on treatment to improve movement;Advise on posture and exercise',
 'Podiatrist':'Podiatrists look after the health of people’s feet and lower legs.|Treat foot pain and injuries;Care for people with diabetes-related foot problems;Recommend supportive footwear and insoles',
 'Orthotist and Prosthetist':'Orthotists and prosthetists design and fit braces and artificial limbs.|Assess patients’ needs;Design and fit braces and prosthetic limbs;Adjust devices as patients grow or recover',
 'Environmental Health Practitioner':'Environmental health practitioners protect communities from health risks in their surroundings.|Inspect food outlets and water supplies;Investigate pollution and disease outbreaks;Educate communities about health and hygiene',
 'Biokineticist':'Biokineticists use exercise to improve health, recovery and performance.|Assess fitness and movement;Design exercise programmes for rehabilitation;Work with athletes and people with health conditions',
 'Medical Researcher':'Medical researchers study diseases and treatments to improve health care.|Design and run research studies;Analyse health data;Share findings that improve treatment',
 /* engineering */
 'Civil Engineer':'Civil engineers design and build the structures we rely on, like roads, bridges, dams and water systems.|Design structures and infrastructure;Manage building projects on site;Make sure structures are safe and last',
 'Mechanical Engineer':'Mechanical engineers design and improve machines, engines and mechanical systems.|Design machines and parts;Test and improve how they work;Solve problems in factories and plants',
 'Electrical Engineer':'Electrical engineers design systems that generate, move and use electricity.|Design power and electrical systems;Plan electricity networks;Keep systems safe and efficient',
 'Electronic Engineer':'Electronic engineers design circuits and devices, from phones to medical equipment.|Design electronic circuits;Build and test prototypes;Improve devices and communication systems',
 'Chemical Engineer':'Chemical engineers turn raw materials into useful products on a large scale.|Design processes for making fuels, food, medicines and materials;Improve safety and efficiency in plants;Reduce waste and pollution',
 'Industrial Engineer':'Industrial engineers make systems and organisations work more efficiently.|Study how work is done;Improve processes, layouts and workflows;Reduce waste and cost',
 'Mechatronics Engineer':'Mechatronics engineers combine mechanical, electronic and computer engineering to build smart machines.|Design automated systems and robots;Program controllers;Test and maintain automated equipment',
 'Mining Engineer':'Mining engineers plan how minerals are safely and responsibly extracted from the earth.|Plan mines and extraction methods;Keep mining operations safe;Manage the impact on the environment',
 'Metallurgical Engineer':'Metallurgical engineers work with metals, from extracting them to making them stronger and more useful.|Develop ways to process metals;Test the strength and quality of materials;Solve problems in smelters and factories',
 'Aeronautical Engineer':'Aeronautical engineers design, build and test aircraft and their systems.|Design aircraft parts and systems;Test performance and safety;Improve fuel efficiency and reliability',
 'Agricultural Engineer':'Agricultural engineers apply engineering to farming and food production.|Design farm machinery and irrigation;Improve storage and processing of crops;Develop more sustainable farming systems',
 'Biomedical Engineer':'Biomedical engineers combine engineering and medicine to create health technology.|Design medical devices and equipment;Test technology used in hospitals;Develop artificial limbs and implants',
 'Computer Engineer':'Computer engineers design computer hardware and the systems that connect it to software.|Design processors, circuits and devices;Build and test computer systems;Improve performance and reliability',
 'Environmental Engineer':'Environmental engineers design solutions that protect people and the environment.|Design water and waste treatment systems;Reduce pollution;Plan for environmentally responsible projects',
 'Marine Engineer':'Marine engineers design and maintain ships, boats and offshore equipment.|Design ship engines and systems;Maintain equipment at sea or in ports;Solve technical problems on vessels',
 'Robotics Engineer':'Robotics engineers design and program robots that perform tasks.|Design robots and their parts;Program robot behaviour;Test robots in real settings',
 'Renewable Energy Engineer':'Renewable energy engineers design systems that produce energy from sources like the sun and wind.|Design solar, wind and storage systems;Plan energy projects;Improve efficiency and reliability',
 'Engineering Technologist':'Engineering technologists apply engineering knowledge to practical projects and technology.|Plan and manage technical projects;Test and improve systems;Work between engineers and technicians',
 'Engineering Technician':'Engineering technicians support engineers with hands-on technical work.|Install, test and maintain equipment;Draw up technical plans;Collect data and report on performance',
 /* built environment */
 'Architect':'Architects design buildings and spaces that are safe, useful and good to be in.|Create designs and plans for buildings;Work with clients, engineers and builders;Make sure designs meet regulations',
 'Architectural Technologist':'Architectural technologists turn architectural designs into detailed technical drawings.|Prepare detailed building plans;Use CAD software;Check that designs can be built',
 'Landscape Architect':'Landscape architects design outdoor spaces such as parks, gardens and public areas.|Design outdoor spaces;Choose plants, materials and layouts;Plan for the environment and people who use the space',
 'Quantity Surveyor':'Quantity surveyors manage the costs of building projects.|Estimate the cost of building projects;Track spending during construction;Prepare contracts and budgets',
 'Construction Manager':'Construction managers run building projects from start to finish.|Plan and schedule building work;Manage teams and budgets on site;Keep work safe and on time',
 'Town Planner':'Town planners decide how land in towns and cities should be used.|Plan where homes, roads, schools and businesses go;Consult communities;Make sure development follows the law',
 'Land Surveyor':'Land surveyors measure land and map its features and boundaries.|Measure land and boundaries;Create maps and plans;Help with construction and property transfers',
 'Property Developer':'Property developers plan and finance new buildings and developments.|Find land and plan projects;Raise money and manage risk;Oversee building and sales',
 'Building Inspector':'Building inspectors check that buildings are safe and follow building regulations.|Inspect building work;Check plans against regulations;Approve buildings for use',
 'Draughtsperson':'Draughtspeople prepare the technical drawings used to build things.|Produce detailed technical drawings;Use CAD software;Update drawings as designs change',
 'Interior Architect':'Interior architects design and change the inside spaces of buildings.|Plan interior layouts;Choose materials, lighting and finishes;Work with builders and clients',
 'Urban Designer':'Urban designers shape how neighbourhoods and city spaces look and work.|Design streets, public spaces and neighbourhoods;Consider how people move and live;Work with planners and architects',
 /* computing */
 'Software Developer':'Software developers write the code that makes apps and programs work.|Write and test code;Fix bugs;Build new features with a team',
 'Software Engineer':'Software engineers design and build large, reliable software systems.|Plan how software systems fit together;Write and review code;Make systems fast, secure and reliable',
 'Web Developer':'Web developers build websites and web applications.|Build web pages and features;Make sites work on phones and computers;Keep websites fast and secure',
 'Mobile App Developer':'Mobile app developers create apps for phones and tablets.|Design and code apps;Test apps on different devices;Update apps based on user feedback',
 'Game Developer':'Game developers build the code and systems that make video games work.|Program gameplay and features;Work with artists and designers;Test and improve games',
 'Data Scientist':'Data scientists find patterns in large amounts of data to answer questions and make predictions.|Collect and clean data;Build models to find patterns;Explain findings to others',
 'Data Engineer':'Data engineers build the systems that collect, store and move data.|Build data pipelines;Design databases and storage;Keep data accurate and available',
 'Cybersecurity Specialist':'Cybersecurity specialists protect computer systems and data from attacks.|Find and fix security weaknesses;Monitor systems for threats;Respond when attacks happen',
 'Network Engineer':'Network engineers design and maintain the networks that connect computers.|Set up and manage networks;Fix connection problems;Keep networks secure',
 'Systems Administrator':'Systems administrators keep an organisation’s computers and servers running.|Install and update systems;Manage user accounts;Solve technical problems',
 'Cloud Engineer':'Cloud engineers build and manage systems that run on cloud computing platforms.|Set up cloud services;Move systems to the cloud;Manage cost, performance and security',
 'DevOps Engineer':'DevOps engineers help software teams build, test and release software smoothly.|Automate testing and releases;Monitor systems in use;Improve how teams deliver software',
 'Machine Learning Engineer':'Machine learning engineers build systems that learn from data, like recommendation or recognition tools.|Train and test models;Put models into real products;Monitor how well they work',
 'Information Systems Specialist':'Information systems specialists connect technology with how an organisation works.|Analyse what a business needs from its systems;Help choose and set up software;Train and support users',
 'Database Administrator':'Database administrators look after an organisation’s databases.|Set up and maintain databases;Back up and protect data;Make sure data can be found quickly',
 'IT Support Technician':'IT support technicians help people solve problems with computers and technology.|Set up computers and devices;Troubleshoot problems;Help users with software and hardware',
 'IT Project Manager':'IT project managers lead technology projects from plan to delivery.|Plan timelines and budgets;Coordinate technical teams;Keep projects on track',
 'Computer Scientist':'Computer scientists study how computers and algorithms work and create new ways of solving problems with them.|Research and design algorithms;Explore new areas of computing;Build and test new ideas',
 'UX Designer':'UX designers make sure apps and websites are easy and pleasant to use.|Research how people use products;Design user journeys and layouts;Test designs with real users',
 'UI Designer':'UI designers create the look of apps and websites — buttons, screens and visuals.|Design screens and interface elements;Choose colours, type and layout;Work with developers to build designs',
 /* data & economics */
 'Economist':'Economists study how people, businesses and governments use resources and make choices.|Analyse economic data and trends;Forecast things like inflation and growth;Advise on policy and business decisions',
 'Data Analyst':'Data analysts turn data into clear information that helps people make decisions.|Collect and organise data;Create charts and reports;Explain what the numbers mean',
 'Statistician':'Statisticians design ways to collect data and use statistics to draw reliable conclusions.|Plan surveys and experiments;Analyse data with statistical methods;Report findings accurately',
 'Econometrician':'Econometricians use mathematics and statistics to test economic ideas and make forecasts.|Build economic models;Test theories with real data;Forecast economic trends',
 'Business Intelligence Analyst':'Business intelligence analysts help organisations use data to improve decisions.|Build dashboards and reports;Spot trends in business data;Recommend improvements',
 'Market Research Analyst':'Market research analysts study what customers want and how markets are changing.|Design surveys and research;Analyse customer data;Advise on products and marketing',
 'Mathematician':'Mathematicians use advanced mathematics to solve problems and develop new theories.|Develop mathematical models;Solve complex problems;Work in research, finance or technology',
 'Quantitative Analyst':'Quantitative analysts use mathematics and programming to analyse financial markets.|Build financial models;Analyse risk and pricing;Write code to test strategies',
 /* finance */
 'Actuary':'Actuaries use mathematics and statistics to measure risk, often for insurance and retirement funds.|Calculate the chance of future events;Help set insurance prices;Advise on long-term financial planning',
 'Chartered Accountant':'Chartered accountants are highly qualified accountants who advise on finances, audits and business decisions.|Prepare and audit financial statements;Advise businesses on finance and tax;Lead finance teams',
 'Accountant':'Accountants keep track of an organisation’s money and help it make good financial decisions.|Record and check financial transactions;Prepare financial reports and budgets;Advise on tax and spending',
 'Auditor':'Auditors check that financial records are accurate and follow the rules.|Examine financial records;Test controls and processes;Report on what they find',
 'Internal Auditor':'Internal auditors check an organisation’s own processes to reduce risk and prevent mistakes.|Review systems and controls;Find risks and weaknesses;Recommend improvements',
 'Forensic Accountant':'Forensic accountants investigate financial records to uncover fraud and financial crime.|Trace money and transactions;Gather financial evidence;Assist in legal cases',
 'Management Accountant':'Management accountants provide financial information that helps managers plan and make decisions.|Prepare budgets and forecasts;Analyse costs;Advise managers on decisions',
 'Financial Analyst':'Financial analysts study financial information to help organisations and investors make decisions.|Analyse company finances;Build financial models;Recommend investments or plans',
 'Credit Analyst':'Credit analysts decide how risky it is to lend money to a person or business.|Review financial information;Assess ability to repay loans;Recommend whether to approve credit',
 'Investment Analyst':'Investment analysts research investments such as shares and bonds.|Research companies and markets;Evaluate investment options;Advise fund managers and clients',
 'Risk Analyst':'Risk analysts identify and measure risks that could affect an organisation.|Identify financial and business risks;Measure and model risk;Recommend ways to reduce risk',
 'Financial Planner':'Financial planners help people plan and manage their money for the future.|Understand clients’ goals;Create savings and investment plans;Advise on insurance and retirement',
 'Tax Consultant':'Tax consultants help people and businesses understand and meet their tax responsibilities.|Prepare tax returns;Advise on tax rules;Help clients plan legally and efficiently',
 'Banker':'Bankers work in banks, helping people and businesses save, borrow and manage money.|Advise clients on banking products;Assess loan applications;Manage client relationships',
 'Stockbroker':'Stockbrokers buy and sell shares and other investments on behalf of clients.|Trade shares for clients;Research markets;Advise clients on investments',
 'Insurance Underwriter':'Insurance underwriters decide whether to insure something and on what terms.|Assess applications for insurance;Evaluate risk;Set terms and premiums',
 'Bookkeeper':'Bookkeepers keep accurate day-to-day financial records for businesses.|Record income and expenses;Reconcile bank statements;Prepare records for accountants',
 /* business */
 'Entrepreneur':'Entrepreneurs start and grow their own businesses.|Spot opportunities and develop ideas;Plan, fund and launch a business;Lead a team and manage risk',
 'Business Manager':'Business managers make sure a business or department runs well and meets its goals.|Plan and set goals;Manage people and budgets;Solve problems and make decisions',
 'Marketing Specialist':'Marketing specialists help organisations understand customers and promote products and services.|Research customers and markets;Plan campaigns;Measure what works',
 'Brand Manager':'Brand managers shape how people see and feel about a product or company.|Develop the brand’s identity;Plan campaigns;Track how the brand is performing',
 'Digital Marketer':'Digital marketers promote products and services online.|Run online and social media campaigns;Create content;Use data to improve results',
 'Social Media Manager':'Social media managers run an organisation’s social media presence.|Plan and post content;Engage with followers;Track and report results',
 'Human Resources Specialist':'HR specialists help organisations find, support and develop their people.|Recruit and onboard staff;Handle workplace policies and relations;Plan training and development',
 'Recruiter':'Recruiters find and match the right people with the right jobs.|Advertise jobs and find candidates;Interview and screen applicants;Match people with employers',
 'Sales Manager':'Sales managers lead sales teams and plan how to grow sales.|Set sales targets;Train and manage a sales team;Build relationships with key customers',
 'Supply Chain Manager':'Supply chain managers make sure products move smoothly from suppliers to customers.|Plan buying, storage and delivery;Work with suppliers;Reduce delays and costs',
 'Logistics Manager':'Logistics managers organise how goods are stored and transported.|Plan transport and deliveries;Manage warehouses;Solve delivery problems',
 'Procurement Specialist':'Procurement specialists buy the goods and services an organisation needs.|Find and compare suppliers;Negotiate prices and contracts;Make sure buying follows the rules',
 'Project Manager':'Project managers plan and lead projects so they finish on time and within budget.|Plan tasks, time and budgets;Coordinate people;Track progress and manage risks',
 'Business Analyst':'Business analysts study how an organisation works and recommend improvements.|Understand business needs;Analyse processes and data;Recommend solutions',
 'Management Consultant':'Management consultants advise organisations on how to solve problems and improve.|Analyse business challenges;Recommend strategies;Help put changes in place',
 'Operations Manager':'Operations managers make sure the day-to-day running of an organisation is efficient.|Oversee daily operations;Improve processes;Manage resources and teams',
 'Retail Manager':'Retail managers run shops and stores.|Manage staff and stock;Look after customers;Meet sales targets',
 'Real Estate Agent':'Real estate agents help people buy, sell and rent property.|List and show properties;Advise on prices;Negotiate sales and rentals',
 'Office Administrator':'Office administrators keep an office organised and running smoothly.|Manage schedules and records;Handle communication;Support managers and teams',
 'Industrial Psychologist':'Industrial psychologists apply psychology to the workplace to support people and organisations.|Assess and select staff;Improve wellbeing and teamwork;Advise on training and development',
 /* law */
 'Lawyer':'Lawyers give legal advice and represent people and organisations.|Advise clients on the law;Draft legal documents;Represent clients in disputes',
 'Attorney':'Attorneys advise clients, draft legal documents and can represent clients in court.|Consult with clients;Prepare contracts and legal papers;Represent clients in some courts',
 'Advocate':'Advocates are specialist courtroom lawyers who argue cases in court.|Prepare legal arguments;Present cases in court;Give expert legal opinions',
 'Prosecutor':'Prosecutors present cases in court on behalf of the state against people accused of crimes.|Review evidence from police;Present cases in court;Work towards justice for victims',
 'Magistrate':'Magistrates hear cases and make decisions in lower courts.|Listen to evidence and arguments;Apply the law;Make judgements and rulings',
 'Judge':'Judges preside over court cases and make legal decisions in higher courts.|Oversee trials and hearings;Interpret the law;Hand down judgements',
 'Legal Adviser':'Legal advisers help organisations understand and follow the law.|Advise on legal risks;Review contracts;Keep organisations compliant',
 'Paralegal':'Paralegals support lawyers with legal research and paperwork.|Research laws and cases;Prepare documents;Organise case files',
 'Conveyancer':'Conveyancers are attorneys who handle the legal transfer of property.|Prepare property transfer documents;Register transfers at the Deeds Office;Guide buyers and sellers',
 'Compliance Officer':'Compliance officers make sure organisations follow laws and regulations.|Monitor rules and policies;Train staff;Report and fix problems',
 'Criminologist':'Criminologists study crime, its causes and how to prevent it.|Research crime patterns;Study offender behaviour;Advise on crime prevention',
 /* education */
 'Teacher':'Teachers help learners understand new ideas and develop skills.|Plan and teach lessons;Assess learners’ progress;Support learners to reach their potential',
 'Foundation Phase Teacher':'Foundation Phase teachers teach Grade R to Grade 3, building early reading, writing and numeracy.|Teach reading, writing and maths basics;Create a caring classroom;Track each child’s development',
 'Intermediate Phase Teacher':'Intermediate Phase teachers teach Grades 4 to 6 across several subjects.|Teach a range of subjects;Help learners build study skills;Assess and support progress',
 'Senior Phase Teacher':'Senior Phase teachers teach Grades 7 to 9, usually specialising in certain subjects.|Teach their subject specialisations;Prepare learners for subject choices;Assess and give feedback',
 'High School (FET) Teacher':'FET teachers teach Grades 10 to 12 in specific subjects.|Teach subject content in depth;Prepare learners for final exams;Guide learners towards their next steps',
 'Early Childhood Development Practitioner':'ECD practitioners care for and teach young children before they start school.|Plan play-based learning;Support early development;Work with families',
 'Special Needs Educator':'Special needs educators teach learners who need extra or different support.|Adapt lessons to learners’ needs;Create individual support plans;Work with families and therapists',
 'Lecturer':'Lecturers teach and do research at universities and colleges.|Teach students in their field;Research and publish;Supervise student projects',
 'School Counsellor':'School counsellors support learners’ wellbeing, learning and future planning.|Talk with learners about challenges;Support subject and career decisions;Work with teachers and parents',
 'Librarian':'Librarians help people find, use and enjoy information and books.|Organise collections;Help people find information;Run reading and learning programmes',
 'Educational Psychologist':'Educational psychologists help learners with learning, emotional and developmental challenges.|Assess learning difficulties;Plan support with schools and families;Offer therapy and guidance',
 /* social */
 'Psychologist':'Psychologists study how people think, feel and behave, and help them with difficulties.|Assess people’s thoughts and behaviour;Provide therapy and support;Research human behaviour',
 'Clinical Psychologist':'Clinical psychologists assess and treat mental health difficulties.|Assess and diagnose mental health conditions;Provide therapy;Work in hospitals, clinics or private practice',
 'Counselling Psychologist':'Counselling psychologists help people cope with life’s challenges and grow.|Provide counselling and therapy;Help with stress, relationships and change;Run support programmes',
 'Social Worker':'Social workers support people, families and communities facing difficult situations.|Assess people’s needs;Connect people with support and services;Protect vulnerable children and adults',
 'Sociologist':'Sociologists study society, groups and how people live together.|Research social issues;Analyse data about communities;Advise on social policy',
 'Political Scientist':'Political scientists study government, politics and how decisions affect society.|Research political systems;Analyse policies and elections;Advise organisations and governments',
 'Anthropologist':'Anthropologists study people, cultures and societies, past and present.|Study cultures and ways of life;Do fieldwork and interviews;Share insights about communities',
 'Historian':'Historians research and explain the past.|Study sources and records;Write and teach about history;Work in museums, archives or education',
 'Archaeologist':'Archaeologists study the past by finding and analysing objects and sites.|Excavate sites;Analyse artefacts;Record and share discoveries',
 'Development Worker':'Development workers help improve living conditions in communities.|Plan and run community projects;Work with organisations and funders;Measure the impact of projects',
 'Community Development Practitioner':'Community development practitioners help communities identify needs and build solutions together.|Work alongside community members;Plan local projects;Connect communities with resources',
 'Youth Worker':'Youth workers support young people’s personal and social development.|Run youth programmes;Mentor young people;Connect them with opportunities and support',
 'Researcher':'Researchers investigate questions to discover new knowledge in their field.|Plan and carry out research;Analyse information;Share findings',
 /* media */
 'Journalist':'Journalists research and report news and stories.|Investigate and interview people;Write or present stories;Check facts carefully',
 'Editor':'Editors check, improve and shape written or recorded content before it is published.|Review and improve content;Check accuracy and style;Decide what gets published',
 'Author':'Authors write books and other works for readers.|Develop ideas and stories;Write and revise;Work with editors and publishers',
 'Copywriter':'Copywriters write the words used in advertising and marketing.|Write adverts and website text;Create slogans and campaigns;Work with designers and marketers',
 'Content Creator':'Content creators make videos, posts and other content for online audiences.|Plan and create content;Grow an audience;Work with brands',
 'Radio Presenter':'Radio presenters host radio shows and keep listeners engaged.|Present shows and interviews;Research topics;Connect with listeners',
 'TV Presenter':'TV presenters host television programmes.|Present programmes;Interview guests;Work with production teams',
 'Broadcaster':'Broadcasters create and present content for radio and television.|Present and produce programmes;Research stories;Work with technical teams',
 'Translator':'Translators turn written text from one language into another.|Translate documents accurately;Keep meaning and tone;Specialise in fields like law or medicine',
 'Interpreter':'Interpreters translate spoken or signed language as people communicate.|Interpret conversations and speeches;Work in courts, hospitals and meetings;Stay accurate under pressure',
 'Public Relations Specialist':'PR specialists manage how an organisation communicates with the public and media.|Write media releases;Build relationships with journalists;Manage an organisation’s reputation',
 'Communications Specialist':'Communications specialists plan and share an organisation’s messages.|Plan internal and external communication;Write and edit content;Manage channels',
 'Publisher':'Publishers produce and distribute books, magazines and digital content.|Choose what to publish;Manage editing and design;Market and sell publications',
 'Linguist':'Linguists study language — how it works and how people use it.|Analyse language structure and use;Research languages;Work in education, technology or translation',
 'Photojournalist':'Photojournalists tell news stories through photographs.|Photograph events and people;Tell stories visually;Work to deadlines',
 /* creative */
 'Graphic Designer':'Graphic designers create visual designs that communicate ideas.|Design logos, posters and layouts;Use design software;Work with clients on their ideas',
 'Interior Designer':'Interior designers plan how the inside of homes and buildings look and feel.|Design layouts and choose finishes;Select furniture and colours;Work with clients and contractors',
 'Fashion Designer':'Fashion designers design clothing, footwear and accessories.|Sketch and develop designs;Choose fabrics and materials;Create collections',
 'Product Designer':'Product designers design everyday objects so they work well and look good.|Research user needs;Sketch, model and test products;Work with manufacturers',
 'Illustrator':'Illustrators create drawings and images for books, media and products.|Create illustrations;Develop a personal style;Work to clients’ briefs',
 'Animator':'Animators bring characters and images to life through movement.|Create 2D or 3D animation;Work on films, games and adverts;Collaborate with creative teams',
 'Photographer':'Photographers capture images for people, businesses and publications.|Plan and take photographs;Edit images;Work with clients',
 'Filmmaker':'Filmmakers create films, from idea to finished production.|Develop stories and scripts;Direct and shoot scenes;Edit and produce films',
 'Video Editor':'Video editors assemble footage into finished videos.|Cut and arrange footage;Add sound, effects and graphics;Shape the story',
 'Actor':'Actors perform roles in theatre, film, television and other media.|Rehearse and perform roles;Audition for parts;Develop their craft',
 'Musician':'Musicians perform, record and create music.|Perform and record music;Practise and rehearse;Collaborate with other artists',
 'Music Producer':'Music producers guide the creation and recording of music.|Shape songs and sound;Work with artists in studio;Mix and finalise recordings',
 'Sound Engineer':'Sound engineers record, mix and manage sound for music, film and live events.|Set up and operate sound equipment;Record and mix audio;Manage sound at live events',
 'Dancer':'Dancers perform dance in shows, productions and events.|Train and rehearse;Perform for audiences;Work with choreographers',
 'Choreographer':'Choreographers create and direct dance routines.|Create dance movement;Teach and direct dancers;Work on stage, film and events',
 'Fine Artist':'Fine artists create original artworks such as paintings and sculptures.|Create artworks;Exhibit and sell work;Develop ideas and techniques',
 'Jewellery Designer':'Jewellery designers design and make jewellery.|Design pieces;Work with metals and stones;Make and sell collections',
 'Game Designer':'Game designers create the ideas, rules and experiences of games.|Design gameplay and levels;Write rules and stories;Test and improve the player experience',
 'Art Director':'Art directors lead the visual style of a project or campaign.|Set the visual direction;Guide designers and photographers;Work with clients',
 'Set Designer':'Set designers create the stage and film settings where stories take place.|Design sets;Choose materials and props;Work with directors',
 'Make-up Artist':'Make-up artists apply make-up for film, TV, theatre, events and fashion.|Design and apply looks;Create special effects make-up;Work with productions and clients',
 'Museum Curator':'Museum curators look after collections and create exhibitions.|Research and care for collections;Plan exhibitions;Share knowledge with the public',
 /* natural sciences */
 'Biologist':'Biologists study living things and how they interact.|Study plants, animals and micro-organisms;Run experiments and fieldwork;Share findings',
 'Microbiologist':'Microbiologists study tiny organisms like bacteria and viruses.|Study micro-organisms;Test samples;Help develop medicines and food safety',
 'Biochemist':'Biochemists study the chemistry of living things.|Research chemical processes in cells;Run laboratory experiments;Help develop medicines and products',
 'Chemist':'Chemists study substances and how they react.|Run experiments;Develop new materials and products;Test quality and safety',
 'Physicist':'Physicists study matter, energy and how the universe works.|Research physical laws;Run experiments and models;Apply physics in technology and industry',
 'Astronomer':'Astronomers study stars, planets and the universe.|Observe space with telescopes;Analyse data;Research how the universe works',
 'Geneticist':'Geneticists study genes and how traits are passed on.|Research DNA and inheritance;Study genetic conditions;Work in health, agriculture or research',
 'Biotechnologist':'Biotechnologists use living systems to develop useful products.|Develop medicines, food or materials;Run experiments;Improve processes',
 'Zoologist':'Zoologists study animals and their behaviour.|Study animals in the wild or labs;Research behaviour and habitats;Support conservation',
 'Botanist':'Botanists study plants.|Study plant life and ecosystems;Identify and classify plants;Support conservation and agriculture',
 'Marine Biologist':'Marine biologists study life in oceans and seas.|Study marine plants and animals;Do fieldwork at sea;Support ocean conservation',
 'Oceanographer':'Oceanographers study the ocean — its water, currents, life and floor.|Measure ocean conditions;Study currents and climate;Analyse ocean data',
 'Geologist':'Geologists study the earth, its rocks and how it changes.|Study rocks and landforms;Find minerals and water;Assess ground conditions',
 'Geophysicist':'Geophysicists use physics to study the earth beneath the surface.|Measure the earth using physical methods;Find resources;Study earthquakes',
 'Meteorologist':'Meteorologists study the atmosphere and forecast the weather.|Analyse weather data;Create forecasts;Study climate patterns',
 'Forensic Scientist':'Forensic scientists analyse evidence to help solve crimes.|Examine evidence in labs;Record findings;Give evidence in court',
 'Materials Scientist':'Materials scientists study and develop materials like metals, plastics and ceramics.|Test material properties;Develop new materials;Solve problems in manufacturing',
 'Hydrologist':'Hydrologists study water — where it comes from and how it moves.|Measure rivers and groundwater;Plan water resources;Study floods and droughts',
 'Laboratory Technician':'Laboratory technicians run tests and look after equipment in labs.|Prepare and test samples;Maintain equipment;Record results',
 'Research Scientist':'Research scientists investigate scientific questions to create new knowledge.|Design experiments;Analyse results;Publish and share findings',
 /* environment */
 'Environmental Scientist':'Environmental scientists study the environment and how to protect it.|Measure pollution and environmental health;Study ecosystems;Recommend solutions',
 'Environmental Manager':'Environmental managers help organisations reduce their impact on the environment.|Develop environmental plans;Monitor compliance;Reduce waste and pollution',
 'Environmental Consultant':'Environmental consultants advise on the environmental impact of projects.|Assess project impacts;Prepare reports;Advise clients and government',
 'Conservation Scientist':'Conservation scientists protect natural areas and wildlife.|Study species and habitats;Plan conservation projects;Monitor ecosystems',
 'Nature Conservationist':'Nature conservationists manage and protect natural areas.|Manage reserves and habitats;Protect wildlife;Educate the public',
 'Game Ranger':'Game rangers protect wildlife and manage game reserves.|Patrol reserves;Monitor animals;Guide visitors',
 'Ecologist':'Ecologists study how living things interact with each other and their environment.|Study ecosystems;Do fieldwork;Advise on land use',
 'Climate Scientist':'Climate scientists study the earth’s climate and how it is changing.|Analyse climate data;Build climate models;Advise on adaptation',
 'Waste Management Specialist':'Waste management specialists plan how waste is reduced, recycled and disposed of safely.|Plan waste and recycling systems;Ensure safe disposal;Find ways to reduce waste',
 'Geographer':'Geographers study places, people and the environment.|Study landscapes and communities;Analyse spatial data;Advise on planning',
 'GIS Specialist':'GIS specialists use mapping technology to analyse places and data.|Create digital maps;Analyse spatial data;Support planning and research',
 'Park Manager':'Park managers run parks and protected areas.|Manage staff and budgets;Protect natural resources;Oversee visitor services',
 /* agriculture */
 'Veterinarian':'Veterinarians diagnose and treat illness and injury in animals.|Examine and treat animals;Perform surgery;Advise on animal health',
 'Veterinary Nurse':'Veterinary nurses care for animals and support veterinarians.|Care for sick animals;Assist in surgery;Advise owners',
 'Animal Scientist':'Animal scientists study farm animals to improve health and production.|Research animal nutrition and breeding;Improve animal welfare;Advise farmers',
 'Agricultural Scientist':'Agricultural scientists research ways to improve farming.|Research crops, soils and livestock;Develop better farming methods;Advise farmers',
 'Agronomist':'Agronomists help farmers grow better crops.|Advise on soil and crops;Plan planting and fertiliser use;Improve yields sustainably',
 'Farm Manager':'Farm managers run the day-to-day operations of a farm.|Plan crops and livestock;Manage staff and budgets;Sell produce',
 'Farmer':'Farmers produce food, fibre and other products from land and livestock.|Grow crops or raise animals;Manage land and equipment;Run a farming business',
 'Horticulturist':'Horticulturists grow and care for plants, gardens and landscapes.|Grow and care for plants;Design and maintain gardens;Work in nurseries and parks',
 'Soil Scientist':'Soil scientists study soil and how to keep it healthy.|Test and analyse soil;Advise on soil health;Research erosion and fertility',
 'Agricultural Economist':'Agricultural economists study the business and economics of farming and food.|Analyse agricultural markets;Advise on farm finances;Research food policy',
 'Viticulturist':'Viticulturists grow and manage grapevines.|Manage vineyards;Monitor vine health;Decide when to harvest',
 'Winemaker':'Winemakers turn grapes into wine.|Oversee fermentation and ageing;Test and blend wines;Manage production',
 'Food Scientist':'Food scientists study food to make it safe, nutritious and tasty.|Research food ingredients and processes;Develop new products;Test safety and quality',
 'Food Technologist':'Food technologists develop and improve food products and the way they are made.|Develop recipes and products;Improve production processes;Ensure quality and safety',
 'Forester':'Foresters manage forests and plantations.|Plan planting and harvesting;Protect forests from fire and disease;Balance industry and conservation',
 'Aquaculturist':'Aquaculturists farm fish and other water animals and plants.|Run fish and shellfish farms;Monitor water quality;Manage feeding and health',
 /* tourism */
 'Tourism Professional':'Tourism professionals help people travel, explore and enjoy destinations.|Plan and sell travel experiences;Look after tourists;Promote destinations',
 'Tour Operator':'Tour operators put together and run travel packages and tours.|Design tour packages;Book transport and accommodation;Manage tours',
 'Travel Agent':'Travel agents help people plan and book trips.|Advise on destinations;Book flights and accommodation;Solve travel problems',
 'Tour Guide':'Tour guides show visitors around and share knowledge about places.|Lead tours;Share history and stories;Look after visitors',
 'Hotel Manager':'Hotel managers run hotels and make sure guests have a good stay.|Manage staff and operations;Look after guests;Manage budgets',
 'Hospitality Manager':'Hospitality managers run hotels, restaurants, lodges and similar businesses.|Manage teams and services;Keep standards high;Handle customer needs',
 'Chef':'Chefs plan, prepare and cook food in kitchens.|Create menus;Cook and present dishes;Run a kitchen team',
 'Pastry Chef':'Pastry chefs specialise in baking and desserts.|Bake breads, pastries and desserts;Create new recipes;Manage a pastry kitchen',
 'Event Manager':'Event managers plan and run events such as conferences, weddings and festivals.|Plan budgets and logistics;Coordinate suppliers;Run events on the day',
 'Restaurant Manager':'Restaurant managers run restaurants and make sure customers are happy.|Manage staff and service;Control stock and costs;Keep standards high',
 /* aviation */
 'Pilot':'Pilots fly aircraft to transport people or goods safely.|Plan flights;Fly and navigate aircraft;Respond to changing conditions',
 'Air Traffic Controller':'Air traffic controllers guide aircraft safely through the sky and at airports.|Direct aircraft;Keep safe distances;Communicate with pilots',
 'Aircraft Maintenance Engineer':'Aircraft maintenance engineers inspect and repair aircraft.|Inspect aircraft;Repair and service systems;Certify aircraft as safe',
 'Flight Attendant':'Flight attendants look after passengers’ safety and comfort on flights.|Explain safety procedures;Serve passengers;Respond to emergencies',
 'Maritime Officer':'Maritime officers help navigate and run ships.|Navigate vessels;Manage crew and cargo;Keep ships safe',
 /* public service */
 'Police Officer':'Police officers help keep communities safe and uphold the law.|Respond to incidents;Investigate crimes;Support communities',
 'Detective':'Detectives investigate crimes to find out what happened.|Gather evidence;Interview witnesses;Build cases for court',
 'Firefighter':'Firefighters respond to fires and emergencies to protect people and property.|Fight fires;Rescue people;Teach fire safety',
 'Soldier':'Soldiers serve in the defence force to protect the country.|Train for defence operations;Support peacekeeping;Help during disasters',
 'Military Officer':'Military officers lead and manage teams in the defence force.|Lead troops;Plan operations;Manage resources',
 'Diplomat':'Diplomats represent their country in other countries and international organisations.|Represent South Africa abroad;Negotiate agreements;Support citizens overseas',
 'Public Servant':'Public servants work in government to deliver services to the public.|Deliver public services;Implement policies;Support communities',
 'Intelligence Analyst':'Intelligence analysts study information to identify threats and support decisions.|Collect and analyse information;Identify risks;Write reports',
 'Correctional Officer':'Correctional officers supervise and support people in correctional facilities.|Maintain safety and order;Supervise offenders;Support rehabilitation',
 /* trades */
 'Electrician':'Electricians install and repair electrical systems in homes and buildings.|Install wiring and fittings;Find and fix faults;Work safely to regulations',
 'Plumber':'Plumbers install and repair water and drainage systems.|Install pipes and fittings;Fix leaks and blockages;Install geysers and fixtures',
 'Fitter and Turner':'Fitters and turners make and repair machine parts.|Machine parts on lathes;Assemble and repair machinery;Read technical drawings',
 'Boilermaker':'Boilermakers build and repair large metal structures and equipment.|Cut, shape and weld metal;Build tanks and structures;Read technical plans',
 'Welder':'Welders join metal parts together using heat.|Weld metal parts;Read plans;Check welds for quality',
 'Motor Mechanic':'Motor mechanics service and repair cars.|Diagnose faults;Service and repair vehicles;Use diagnostic equipment',
 'Diesel Mechanic':'Diesel mechanics repair trucks, buses and heavy machinery.|Service diesel engines;Repair heavy vehicles;Diagnose faults',
 'Millwright':'Millwrights install and maintain industrial machinery with mechanical and electrical parts.|Install machinery;Maintain and repair equipment;Find electrical and mechanical faults',
 'Carpenter':'Carpenters build and install structures made of wood.|Build frames, roofs and fittings;Read plans;Measure and cut accurately',
 'Bricklayer':'Bricklayers build walls and structures with bricks and blocks.|Lay bricks and blocks;Read plans;Build accurately and safely',
 'Refrigeration and Air-conditioning Technician':'Refrigeration and air-conditioning technicians install and repair cooling systems.|Install cooling systems;Repair faults;Service equipment',
 'Solar PV Installer':'Solar PV installers fit solar panels and systems that produce electricity.|Install solar panels and inverters;Connect systems safely;Maintain installations',
 'Instrumentation Technician':'Instrumentation technicians install and maintain instruments that measure and control industrial processes.|Install and calibrate instruments;Find faults;Maintain control systems',
 'Auto Electrician':'Auto electricians repair the electrical systems in vehicles.|Diagnose vehicle electrical faults;Repair wiring and components;Fit accessories',
 'Mechatronics Technician':'Mechatronics technicians maintain automated machines that combine mechanics, electronics and computing.|Maintain automated systems;Troubleshoot faults;Program controllers',
 'Panel Beater':'Panel beaters repair damaged vehicle bodies.|Repair dents and damage;Replace panels;Prepare vehicles for painting',
 /* sport */
 'Sport Scientist':'Sport scientists use science to improve athletes’ performance and health.|Test fitness and performance;Plan training;Advise on recovery and nutrition',
 'Professional Athlete':'Professional athletes compete in sport at a high level.|Train and compete;Look after their fitness;Represent teams and sponsors',
 'Sports Coach':'Sports coaches train athletes and teams to improve.|Plan training sessions;Develop skills and tactics;Motivate players',
 'Personal Trainer':'Personal trainers help people reach their fitness goals.|Assess fitness;Plan workouts;Motivate clients',
 'Sports Manager':'Sports managers run the business side of sport.|Manage teams, events or facilities;Handle budgets and sponsors;Organise competitions',
 'Sports Journalist':'Sports journalists report on sport for media outlets.|Cover matches and events;Interview players;Write or present stories'
};
/* Explorer categories group the career families (a career appears under one category, but search finds it anywhere) */
const EXPLORER_CATEGORIES = [
  {id:'healthcat', name:'Health & Medicine', icon:'heart', families:['health']},
  {id:'engcat', name:'Engineering & Technology', icon:'wrench', families:['engineering']},
  {id:'buildcat', name:'Architecture & Construction', icon:'shapes', families:['built']},
  {id:'compcat', name:'Computing & Data', icon:'monitor', families:['computing','data']},
  {id:'fincat', name:'Business & Finance', icon:'briefcase', families:['finance','business']},
  {id:'educat', name:'Education', icon:'book', families:['education']},
  {id:'lawcat', name:'Law, Justice & Public Service', icon:'shield', families:['law','public']},
  {id:'scicat', name:'Science & Research', icon:'bulb', families:['natural']},
  {id:'envcat', name:'Environment & Agriculture', icon:'leaf', families:['environment','agri']},
  {id:'artcat', name:'Arts, Media & Design', icon:'palette', families:['creative','media']},
  {id:'peoplecat', name:'People & Society', icon:'users', families:['social']},
  {id:'tourcat', name:'Tourism & Hospitality', icon:'pin', families:['tourism']},
  {id:'transcat', name:'Aviation & Transport', icon:'compass', families:['aviation']},
  {id:'tradecat', name:'Trades & Technical', icon:'wrench', families:['trades']},
  {id:'sportcat', name:'Sport & Fitness', icon:'trend', families:['sport']}
];
/* family-level skills and settings (short and general) */
const FAMILY_EXTRA = {
  health:{skills:['Caring for people','Careful attention to detail','Communication','Staying calm under pressure'], where:'Hospitals, clinics, private practices, community health, research and the health industry.'},
  engineering:{skills:['Problem solving','Mathematical thinking','Teamwork','Design and planning'], where:'Engineering firms, construction, mining, manufacturing, energy, government and your own consultancy.'},
  built:{skills:['Spatial thinking','Drawing and design','Planning','Working with clients and teams'], where:'Design and property firms, construction companies, municipalities and your own practice.'},
  computing:{skills:['Logical thinking','Problem solving','Learning new tools','Teamwork'], where:'Tech companies, banks, start-ups, government, research and remote or freelance work.'},
  data:{skills:['Working with numbers','Analytical thinking','Explaining findings clearly','Curiosity'], where:'Banks, government, research institutes, consultancies and companies of every kind.'},
  finance:{skills:['Working with numbers','Accuracy','Analytical thinking','Honesty and integrity'], where:'Accounting and audit firms, banks, insurers, investment companies and every kind of business.'},
  business:{skills:['Communication','Organisation','Leadership','Problem solving'], where:'Companies of every size, start-ups, government and your own business.'},
  law:{skills:['Reading and writing carefully','Building arguments','Analytical thinking','Integrity'], where:'Law firms, courts, government, businesses and non-profit organisations.'},
  education:{skills:['Explaining ideas clearly','Patience','Organisation','Caring about others'], where:'Schools, ECD centres, colleges, universities, libraries and education organisations.'},
  social:{skills:['Listening','Empathy','Research and analysis','Communication'], where:'Hospitals, schools, NGOs, government, research institutions and private practice.'},
  media:{skills:['Writing and speaking','Creativity','Curiosity','Meeting deadlines'], where:'Newsrooms, broadcasters, agencies, publishers, businesses and freelance work.'},
  creative:{skills:['Creativity','Visual or performance skills','Building a portfolio','Taking feedback'], where:'Studios, agencies, theatres, film and TV, galleries, businesses and freelance work.'},
  natural:{skills:['Curiosity','Careful observation','Analytical thinking','Patience'], where:'Laboratories, universities, research councils, industry and fieldwork.'},
  environment:{skills:['Care for the environment','Fieldwork','Analysing data','Communication'], where:'Reserves and parks, consultancies, government, NGOs and research.'},
  agri:{skills:['Practical problem solving','Science knowledge','Working outdoors','Business thinking'], where:'Farms, agricultural companies, food producers, laboratories and government.'},
  tourism:{skills:['Customer service','Communication','Organisation','Knowledge of places'], where:'Hotels, lodges, travel companies, restaurants, events and tourism organisations.'},
  aviation:{skills:['Focus and responsibility','Following procedures','Teamwork','Calm under pressure'], where:'Airlines, airports, aviation maintenance organisations and shipping.'},
  public:{skills:['Integrity','Teamwork','Physical and mental resilience','Communication'], where:'Police services, defence force, emergency services, government departments and embassies.'},
  trades:{skills:['Working with your hands','Reading technical drawings','Safety awareness','Problem solving'], where:'Construction, mining, manufacturing, workshops, maintenance teams and your own business.'},
  sport:{skills:['Fitness and discipline','Motivating others','Teamwork','Communication'], where:'Sports clubs, gyms, schools, sports organisations and media.'}
};

/* ============================================================
   CAREER EXPLORER — "Help me discover and learn about careers." (all grades; neutral — never limited by Pathway DNA)
   ============================================================ */
const EX_SYNONYMS = { doctor:['doctor','medic','medicine','physician','gp'], vet:['veterinarian'], it:['information','software','computer','network','systems administrator','it support'], coding:['software','web developer','app developer','game developer','computer scientist'], programmer:['software','web developer','app developer','game developer'], lawyer:['lawyer','attorney','advocate'], teacher:['teacher','educator','lecturer'], nurse:['nurse','midwife'], engineer:['engineer'], designer:['design'], money:['accountant','finance','banker','actuary','financial'], cars:['mechanic','motor','auto','panel'], animals:['veterinarian','zoologist','animal','game ranger'], police:['police','detective'], chef:['chef','cook','pastry'], cook:['chef'], pilot:['pilot','aviation'] };
function exMathsLabel(f){ return {required:'Mathematics', preferred:'Mathematics', either:'Mathematics or Maths Literacy', technical:'Mathematics or Technical Maths'}[f.maths]; }
function exSubjects(c){ const f=familyOf(c.family); return [exMathsLabel(f), ...f.subjects.slice(0,2)]; }
const exCatOf = fam => EXPLORER_CATEGORIES.find(c=>c.families.includes(fam));
function exInfo(c){ const [d,does]=(CAREER_INFO[c.name]||'').split('|'); return {desc:d||`${c.name} is a career in ${familyOf(c.family).name.toLowerCase()}.`, does:(does||'').split(';').filter(Boolean)}; }
/* forgiving search: word starts, synonyms, category words and one-letter typos */
function lev1(a,b){ if(Math.abs(a.length-b.length)>1) return false; let i=0,j=0,e=0; while(i<a.length&&j<b.length){ if(a[i]===b[j]){i++;j++;continue;} if(++e>1) return false; if(a.length>b.length) i++; else if(b.length>a.length) j++; else {i++;j++;} } return e+(a.length-i)+(b.length-j)<=1; }
function exSearch(q){
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]+/g,' ').trim();
  const words = norm(q).split(/\s+/).filter(Boolean); if(!words.length) return null;
  return CAREERS.map(c=>{
    const info=exInfo(c), cat=exCatOf(c.family), title=norm(c.name), hay=norm(`${c.name} ${cat.name} ${familyOf(c.family).name} ${info.desc}`), tw=title.split(' ');
    let score=0;
    for(const w of words){
      const alts=[w, ...(EX_SYNONYMS[w]||[]).map(norm)];
      let best=0;
      alts.forEach((a,k)=>{ const pen = k ? 3 : 0;   /* the learner's own word ranks above a synonym */
        let sc=0;
        if(title===a) sc=12;
        else if(tw.some(t=>t.startsWith(a))) sc=8;
        else if(title.includes(a)) sc=6;
        else if(a.length>=4 && tw.some(t=>lev1(t,a) || (t.length>a.length && lev1(t.slice(0,a.length),a)))) sc=5;
        else if(hay.includes(a) && a.length>2) sc=3;
        if(sc) best=Math.max(best, sc-pen);
      });
      if(!best) return null; score+=best;
    }
    return {c, score};
  }).filter(Boolean).sort((a,b)=>b.score-a.score || a.c.name.localeCompare(b.c.name)).map(x=>x.c);
}
function exCard(c){
  const info=exInfo(c), key=encodeURIComponent(c.name);
  const u=me(), fet=u&&isFET(u), cmpOn=fet && (fetOf(u).compare||[]).includes(c.name);
  return `<article class="glass ccard"><div class="cchead"><span class="pub-ic">${I(exCatOf(c.family).icon)}</span><div><h3>${esc(c.name)}</h3><small>${esc(exCatOf(c.family).name)}</small></div>${fet?favBtn(u,c.name):''}</div>
    <p>${esc(info.desc)}</p>
    <div class="ccsub"><small>Typical subjects</small><span>${exSubjects(c).map(esc).join(' • ')}</span></div>
    <div class="ccact"><a class="btn btn-ghost btn-sm" href="#/careers/view?c=${key}">Explore Career ${ARROW}</a>${fet?`<label class="cmpck"><input type="checkbox" data-cmp="${esc(c.name)}" ${cmpOn?'checked':''}> Compare</label>`:''}</div></article>`;
}
function careersPage(){
  const q = VIEW.cq||'', cat = VIEW.ccat||'';
  return shell((u,initials,planTxt)=>{
    const found = exSearch(q);
    let body;
    if(found){ body = found.length ? `<p class="exres">${found.length} career${found.length===1?'':'s'} found</p><div class="cgrid3">${found.slice(0,60).map(exCard).join('')}</div>` : `<div class="caughtup inner"><span class="cu-ic">🔎</span><div><b>No careers match “${esc(q)}”.</b><p>Try a shorter word, or browse the categories below.</p></div></div>`; }
    else if(cat){ const C=EXPLORER_CATEGORIES.find(x=>x.id===cat), list=CAREERS.filter(c=>C.families.includes(c.family));
      body = `<button class="link backlink" id="exback">${I('back')} All career fields</button><h2 class="exh">${I(C.icon)} ${esc(C.name)} <small>${list.length} careers</small></h2><div class="cgrid3">${list.map(exCard).join('')}</div>`; }
    else { body = `<h2 class="exh">Browse by career field</h2><div class="catgrid">${EXPLORER_CATEGORIES.map(C=>{ const n=CAREERS.filter(c=>C.families.includes(c.family)).length; return `<button class="glass catcard" data-cat="${C.id}"><span class="pub-ic">${I(C.icon)}</span><b>${esc(C.name)}</b><small>${n} careers</small></button>`; }).join('')}</div>`; }
    return `<div class="topbar"><div><div class="today">Explore &amp; Learn</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">Career Explorer</h1><p class="greet-sub">Discover careers and what different paths could look like. Explore anything that interests you.</p></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>
      ${isFET(u)?compareBar(u):''}
      <div class="fsearch exsearch">${I('search')}<label class="sr" for="cx">Search careers</label><input id="cx" type="search" placeholder="Search careers…" value="${esc(q)}" autocomplete="off"></div>
      <div id="exbody">${body}</div>
      <p class="hint" style="margin-top:20px">${I('info')} Subjects shown are commonly useful for each career. Requirements vary between universities, colleges and programmes — always check the specific institution’s current requirements.</p>`;
  });
}
careersPage.after = () => {
  const cu=me(); if(cu && isFET(cu)){ fetOf(cu).visited.careers=true; save(); } bindCareerExtras();
  const i=document.getElementById('cx'); if(!i) return;
  let t; i.addEventListener('input',()=>{ clearTimeout(t); t=setTimeout(()=>{ VIEW.cq=i.value; VIEW.ccat=''; const pos=i.selectionStart; render(); const j=document.getElementById('cx'); j.focus(); j.setSelectionRange(pos,pos); },120); });
  document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{ VIEW.ccat=b.dataset.cat; VIEW.cq=''; render(); window.scrollTo(0,0); }));
  document.getElementById('exback')?.addEventListener('click',()=>{ VIEW.ccat=''; render(); });
};
careerView.after = () => { const u=me(); if(u&&isFET(u)){ fetOf(u).visited.careers=true; save(); } bindCareerExtras();
  document.querySelectorAll('a[href="#alts"]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); document.getElementById('alts')?.scrollIntoView({behavior:'smooth'}); })); };
function careerView(){
  const name=decodeURIComponent((new URLSearchParams(location.hash.split('?')[1]||'')).get('c')||''), c=CAREERS.find(x=>x.name===name);
  return shell((u,initials,planTxt)=>{
    if(!c) return `<div class="caughtup inner" style="margin-top:30px"><span class="cu-ic">🔎</span><div><b>We couldn’t find that career.</b><p><a class="link" href="#/careers">Back to Career Explorer</a></p></div></div>`;
    const f=familyOf(c.family), info=exInfo(c), ex=FAMILY_EXTRA[c.family]||{skills:[],where:''}, cat=exCatOf(c.family);
    const related = CAREERS.filter(x=>x.family===c.family && x.name!==c.name).slice(0,6);
    const g=+gradeOf(u), P=pathwayFor(c.name), returning=isReturning(u), routes=STUDY_ROUTES[c.family]||'';
    const head=`<div class="topbar"><div><a class="link backlink" href="#/careers">${I('back')} Career Explorer</a><div class="today" style="margin-top:10px">${esc(cat.name)}</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">${esc(c.name)}</h1></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>`;
    const card=(ic,t,body,wide)=>`<section class="glass cvs${wide?' wide':''}"><h2>${I(ic)} ${t}</h2>${body}</section>`;
    const basics=`<p>${esc(info.desc)}</p><ul class="plist">${info.does.map(d=>`<li>${I('check')}<span>${esc(d)}</span></li>`).join('')}</ul>`;
    const subjects=`<div class="tags">${exSubjects(c).map(s=>`<span class="tag gold">${esc(s)}</span>`).join('')}</div><p class="hint" style="margin-top:10px">${esc(f.needs)} Always check each institution’s current requirements.</p>`;
    const rel=related.length?card('users','Related careers',`<div class="tags">${related.map(r=>`<a class="tag rel" href="#/careers/view?c=${encodeURIComponent(r.name)}">${esc(r.name)}</a>`).join('')}</div>`,true):'';
    const fetBar=isFET(u)?`<div class="actions cvactions"><a class="btn btn-purple btn-sm" href="#/targets?career=${encodeURIComponent(c.name)}">Use for a Study Target ${ARROW}</a>${favBtn(u,c.name)}</div>`:'';
    const levelTag=['','','','','','','','','','Discover','Connect','Pathway','Next steps'][g]||'';
    let body='';
    if(g<=9){   /* Layer 1 — foundation */
      body=card('info','What is this career?',`<p>${esc(info.desc)}</p>`)+card('briefcase','What do people in this career do?',`<ul class="plist">${info.does.map(d=>`<li>${I('check')}<span>${esc(d)}</span></li>`).join('')}</ul>`)
        +card('compass','Where might you work?',`<p>${esc(ex.where)}</p>`)+card('book','Subjects that can help',subjects)
        +card('cap','What could you study after school?',`<p>${esc(routes)}</p>`)+card('star','Skills that can be useful',`<div class="tags">${ex.skills.map(s=>`<span class="tag">${esc(s)}</span>`).join('')}</div>`)+rel;
    } else if(g===10){   /* Layers 1–2 — foundation recap + connection */
      body=`<section class="glass cvs wide ctxcard"><p>${returning?`You already know the basics of this career. Now let’s look at how your subjects and studies connect to it.`:`<b>In short:</b> ${esc(info.desc)}`}</p>${sec('basics','Refresh the basics',basics)}</section>`
        +card('book','How your subjects connect',subjects)+card('cap','What you could study',`<p>${esc(routes)}</p><p class="hint">Different qualifications (degree, diploma, higher certificate) can lead into this field at different levels.</p>`)
        +card('star','What the work involves',`<div class="tags">${ex.skills.map(s=>`<span class="tag">${esc(s)}</span>`).join('')}</div>`)+card('compass','Where it can lead',`<p>${esc(ex.where)}</p>`)+rel;
    } else {   /* Grade 11: layers 2–4 · Grade 12: layers 3–5 */
      body=`<section class="glass cvs wide ctxcard"><p><b>${returning?'Quick reminder':'Before we go further'}:</b> ${esc(info.desc)}</p>${sec('basics','Refresh the basics',basics)}</section>`
        +card('cap','Qualifications that lead here',`<p>${esc(routes)}</p>`)
        +card('shield',P?esc(P.title):'Professional pathway',(P?`<p class="realityline">Before you choose this pathway, here’s what you should know.</p>`:'')+pathwayHTML(P,g),true)
        +(g===12?card('target','After matric',`<p>Your personal next steps — applications, NBT, funding, accommodation and dates — are in After Matric.</p><div class="actions"><a class="btn btn-ghost btn-sm" href="#/after-matric">Open After Matric ${ARROW}</a></div>`)
                 +card('briefcase','After you qualify',`<p>${esc(P?.after||ex.where)}</p>`):'')
        +card('compass','Where can you work?',g===12?`<p>${esc(ex.where)}</p>`:sec('where','Explore where this career can take you',`<p>${esc(ex.where)}</p>`))
        +card('book','Subjects that support this pathway',subjects)+rel;
    }
    const alt=altPathwaysHTML(c,g);
    const lite = g<=10 && P ? card('shield','Reality check',`<p class="realityline">Before you choose this pathway, here’s what you should know.</p><p>${esc(P.steps[0])} is usually the first step${P.steps.length>2?`, followed by ${P.steps.length-1} more stages such as ${esc(P.steps[1].toLowerCase())}`:''}. You’ll see the full route in Grade 11.</p>`) : '';
    const nxt = nextPanel('Keep exploring', [['Explore related pathways','#alts'], ...(isFET(u)?[['See university courses',`#/targets?career=${encodeURIComponent(c.name)}`]]:[['Try Decision Lab','#/decision-lab']]), ['Check subject requirements', g<=9?'#/pathway-101':'#/targets']]);
    return head+`<p class="layerline">${I('compass')} ${esc(levelTag)} · Grade ${g} view</p><div class="cview">${body}${lite}${alt?`<section class="glass cvs wide" id="alts"><h2>${I('layers')} Alternative routes into this career area</h2>${alt}</section>`:''}</div>${fetBar}${nxt}`;
  });
}

/* ============================================================
   PATHWAY 101 — "Help me understand my subjects and my Grade 9 decisions." (grade-specific; no careers, no university content for Grade 9)
   ============================================================ */
const G9_SUBJECT_GROUPS = [
  {group:'Mathematics', items:[
    ['Mathematics','Algebra, graphs, geometry, trigonometry, statistics and probability. You learn why methods work and use them to solve unfamiliar problems.'],
    ['Mathematical Literacy','Maths for real life — budgets, bills, interest, measurement, maps and plans, and reading data in everyday documents.'],
    ['Technical Mathematics','Maths for technical fields — algebra, graphs, trigonometry and geometry applied to machines, circuits and building. Offered at schools with technical subjects.']]},
  {group:'Sciences', items:[
    ['Physical Sciences','Physics and chemistry: forces and motion, electricity, waves and light, matter and chemical reactions. Lots of experiments and calculations.'],
    ['Life Sciences','How living things work: cells, the human body, plants, genetics, evolution and ecosystems. You investigate, observe and explain.'],
    ['Technical Sciences','Physics and chemistry applied to technical work, such as mechanics, electricity and materials. Offered at technical schools.'],
    ['Agricultural Sciences','Soil, plants, animals and how food is produced — plus farming methods and looking after the land.']]},
  {group:'Commerce', items:[
    ['Accounting','Recording what a business earns and spends, preparing financial statements and working out whether a business is doing well.'],
    ['Business Studies','How businesses start and run: management, marketing, entrepreneurship and writing business plans.'],
    ['Economics','How economies work: supply and demand, prices, markets, jobs and the role of government — with graphs and real-world examples.']]},
  {group:'Humanities', items:[
    ['Geography','The physical world (weather, climate, landforms) and the human world (population, cities, economies) — with map work and fieldwork.'],
    ['History','South African and world history. You read and question sources, build arguments and write essays.'],
    ['Tourism','The tourism industry: South African attractions, maps and time zones, foreign exchange, customer service and marketing.']]},
  {group:'Technology', items:[
    ['Information Technology (IT)','Programming — writing code to solve problems — plus databases and how computers and networks work.'],
    ['Computer Applications Technology (CAT)','Using software well: word processing, spreadsheets, databases and presentations, and understanding computers and the internet.'],
    ['Engineering Graphics & Design (EGD)','Technical drawing by hand and on computer: drawing objects from different views, building plans and mechanical and electrical drawings. You learn to read and create the plans used to make things.'],
    ['Civil, Electrical or Mechanical Technology','Practical workshop subjects at technical schools: building and construction, electrical circuits and electronics, or machines and fitting.']]},
  {group:'Arts & Life Skills', items:[
    ['Visual Arts','Making art — drawing, painting, sculpture and more — and learning to look at and discuss artworks. You build a portfolio.'],
    ['Design','Solving problems through design: research, sketching ideas and making products, graphics or spaces.'],
    ['Dramatic Arts','Acting, voice and movement, theatre history and analysing plays — and performing in productions.'],
    ['Music','Music theory, performing on an instrument or with your voice, composing and music history. It usually builds on music you already play or sing.'],
    ['Consumer Studies','Food and nutrition, clothing, housing and being a smart consumer — with practical work such as preparing food products.']]}
];
const MATHS_COMPARE = [
  ['Focus','Understanding maths deeply — patterns, structure and why methods work.','Using maths confidently in everyday life and work.','Using maths in technical and practical settings.'],
  ['Kind of work','Algebra, functions and graphs, geometry, trigonometry, statistics and probability.','Budgets, tariffs, interest, measurement, maps, plans and reading data.','Algebra, graphs, trigonometry and geometry applied to machines, circuits and building.'],
  ['How problems look','Mostly mathematical problems, some abstract, including proofs.','Real documents and situations — a payslip, a map, a bill.','Technical situations — a gear, a circuit, a construction plan.'],
  ['Where it’s offered','Most schools.','Most schools.','Schools that offer technical subjects.']
];
const CHOICE_TERMS = [
  ['Compulsory subject','A subject every learner has to take. From Grade 10 these are your Home Language, First Additional Language, one Mathematics subject and Life Orientation.'],
  ['Elective subject','A subject you choose from the options your school offers. From Grade 10 you choose three.'],
  ['Subject combination','The full group of subjects you take together — your compulsory subjects plus your electives.'],
  ['Subject stream','A group of subjects that often go together because they use similar skills, such as sciences, commerce or humanities. Schools often organise electives this way.'],
  ['School offering','The subjects your school can offer. Not every school offers every subject, so your choices depend partly on your school.']
];
const ANALYSIS_TERMS = [
  ['Strength','Something you did well in, compared with your other areas — in your assessment answers, your results or both.'],
  ['Area to improve','An area where improving could make a useful difference — for example, a subject that connects to the direction you’re exploring.'],
  ['Subject alignment','How closely your current results, assessment responses and strengths connect with the skills commonly used in a particular subject.'],
  ['Academic progress','How your school results are developing over time, term by term.'],
  ['Aggregate','Your average across all your subjects in a set of results. It gives a broad picture of how you’re doing overall.']
];
const FUTURE_TERMS = [
  ['Career','The kind of work you build up over time, often across several jobs — for example a career in accounting or nursing.'],
  ['Occupation','A specific type of job, such as bookkeeper, electrician or teacher.'],
  ['Qualification','What you earn when you complete a course of study — for example a certificate, diploma or degree.'],
  ['Study after school','Options include university, universities of technology, TVET colleges, apprenticeships and learnerships. Career Explorer shows typical study routes for each career.']
];
function p101Grade9(){
  const sec = (id,icon,title,body) => `<section class="glass dsec p101sec" id="${id}"><button aria-expanded="false"><span class="pub-ic">${icon}</span><span class="dsh">${title}</span><span class="pm">${I('plus')}</span></button><div class="dsb">${body}</div></section>`;
  const subjects = G9_SUBJECT_GROUPS.map(g=>`<h4>${esc(g.group)}</h4><div class="subjgrid">${g.items.map(([n,d])=>`<div class="why2 inner"><button aria-expanded="false"><span class="wi">${I('book')}</span>${esc(n)}<span class="pm">${I('plus')}</span></button><div class="w2b"><p>${esc(d)}</p></div></div>`).join('')}</div>`).join('');
  const maths = `<p class="lead">From Grade 10 everyone takes one of these three. They’re different, not better or worse — each suits different interests and ways of working.</p>
    <div class="mcomp"><div class="mrowh"><span></span><b>Mathematics</b><b>Mathematical Literacy</b><b>Technical Mathematics</b></div>${MATHS_COMPARE.map(r=>`<div class="mrowc"><span class="mlab">${esc(r[0])}</span>${r.slice(1).map((x,i)=>`<p><small class="mmob">${['Mathematics','Mathematical Literacy','Technical Mathematics'][i]}</small>${esc(x)}</p>`).join('')}</div>`).join('')}</div>
    <p class="hint" style="margin-top:12px">${I('info')} Which ones you can choose depends on your school. Your teachers can help you understand what each involves at your school.</p>`;
  const terms = list => `<div class="termgrid">${list.map(([t,d])=>`<div class="inner term"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>`;
  const journey = `<ol class="g9steps">${[['compass','Explore your strengths'],['book','Understand your subjects'],['heart','Learn more about yourself'],['trend','Start thinking about Grade 10']].map(([i,t])=>`<li class="inner"><span class="pub-ic">${I(i)}</span><b>${t}</b></li>`).join('')}</ol>
    <p style="margin-top:14px">Grade 9 is a time to explore. Near the end of the year you’ll choose your subjects for Grade 10, so it helps to understand them now.</p>
    <p class="reassure"><b>You don’t have to have everything figured out yet.</b></p>`;
  return sec('p1','📚','Understanding Your Subjects', `<p class="lead">What will you actually learn and do in each subject? Tap a subject to find out.</p>${subjects}<p class="hint" style="margin-top:12px">${I('info')} Subjects on offer differ between schools.</p>`)
    + sec('p2','🔢','Mathematics Options', maths)
    + sec('p3','📝','Understanding Subject Choices', terms(CHOICE_TERMS))
    + sec('p4','🧬','Understanding Your Pathway Analysis', `<p class="lead">Terms you’ll see in your Pathway DNA, and what Pathway means by them.</p>${terms(ANALYSIS_TERMS)}`)
    + sec('p6','🧭','Words About Your Future', `<p class="lead">A few words you’ll hear when people talk about careers.</p>${terms(FUTURE_TERMS)}`)
    + sec('p5','🛤️','Your Grade 9 Journey', journey);
}
function pathway101Page(){
  return shell((u,initials,planTxt)=>{ const g=gradeOf(u);
    const head = `<div class="topbar"><div><div class="today">Explore &amp; Learn · Grade ${esc(g)}</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">${esc(P101_TITLE[g]||'Pathway 101')}</h1><p class="greet-sub">${g==='9'?'Understand your subjects and the decisions you’re starting to make in Grade 9.':esc(P101_PURPOSE[g])}</p></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>`;
    if(g==='9') return head + `<div class="p101">${p101Grade9()}</div>`;
    if(P101_FET[g]){ fetOf(u).visited.p101=true; save(); return head + `<div class="p101">${p101FetHTML(g)}</div>`; }
    const list=PATHWAY_101[g]||[];
    return head + `<div class="p101">${list.map(([t,d])=>`<details class="glass xpand"><summary>${esc(t)} ${I('down')}</summary><div class="whyb"><p>${esc(d)}</p></div></details>`).join('')}</div>`; });
}
pathway101Page.after = () => {
  document.querySelectorAll('.p101sec>button').forEach(b=>b.addEventListener('click',()=>{ const sec=b.parentElement, open=!sec.classList.contains('open');
    document.querySelectorAll('.p101sec').forEach(x=>{ x.classList.remove('open'); x.querySelector(':scope>button').setAttribute('aria-expanded','false'); x.querySelector(':scope>button .pm').innerHTML=I('plus'); });
    if(open){ sec.classList.add('open'); b.setAttribute('aria-expanded','true'); b.querySelector('.pm').innerHTML=I('minus'); } }));
  document.querySelectorAll('.p101 .why2>button').forEach(b=>b.addEventListener('click',()=>{ const w=b.parentElement, o=!w.classList.contains('open'); w.classList.toggle('open',o); b.setAttribute('aria-expanded',o); b.querySelector('.pm').innerHTML=I(o?'minus':'plus'); }));
};

/* ============================================================
   ASSESSMENT EXPERIENCE — sections, save & exit, locking, timing
   ============================================================ */
function focusTop(title, exit='Save &amp; exit', exitHref='#/home'){ return `<div class="focus-top"><div class="ttl"><img src="${MARK}" alt="PATHWAY"><span>${title}</span></div><div style="display:flex;gap:10px;align-items:center">${themeBtn()}${exit?`<a class="btn btn-ghost btn-sm" href="${exitHref}">${exit}</a>`:''}</div></div>`; }
let VIEW = {}; let TICK = null;
const A_NAME = n => `Pathway Assessment ${n}`;
/* learner-facing section names are neutral: they never reveal what a section measures */
const secLabel = (n,s) => n===1 ? `Section ${s.id}` : (s.about ? 'About You' : `Section ${sectionsOf(2).indexOf(s)+1}`);
function aStatus(u,n){
  const p=u.progress['a'+n];
  if(n===2 && !u.progress.a1.done) return 'locked';
  if(p.done) return 'complete';
  if(p.active || Object.values(p.sections).some(s=>s.status==='complete')) return 'progress';
  return 'new';
}
function g8Status(u){ return !u.progress.a2.done ? 'locked' : isApproved(u.progress.g8) ? 'complete' : 'new'; }
const doneCount = (u,n) => sectionsOf(n).filter(s=>u.progress['a'+n].sections[s.id]?.status==='complete').length;
const nextSection = (u,n) => sectionsOf(n).find(s=>u.progress['a'+n].sections[s.id]?.status!=='complete');
function activeAssessment(u){ if(!u||!u.progress) return null; if(u.progress.a1.active) return 1; if(u.progress.a2.active) return 2; return null; }
const mmss = ms => { const s=Math.max(0,Math.ceil(ms/1000)); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); };
const qCount = s => s.qs.length;

function lockCard(title, body, btn){ return `<div class="focus-wrap"><div class="glass qcard lockcard"><div class="lockic">${I('lock')}</div><h1>${title}</h1><p class="qhint" style="font-size:1.02rem">${body}</p>${btn?`<div class="actions">${btn}</div>`:''}</div></div>`; }

function calcGuide(s){
  return s.calc
    ? '<b>Calculator:</b> You may use a calculator for this section.'
    : '<b>Calculator:</b> Please do not use a calculator for this section. We trust you to answer honestly. The purpose of this section is to help Pathway understand your natural reasoning and problem-solving skills. We cannot tell whether you have used a calculator, so please try your best to work through the questions without one.<br><br>You may use paper and a pen or pencil to work things out on the side if you need to.';
}
function assessmentPage(n){
  const u=me(), p=u.progress['a'+n], S=sectionsOf(n);
  if(n===2 && !u.progress.a1.done) return focusTop(A_NAME(2),'Back to Home') + lockCard('Complete Pathway Assessment 1 first.','Pathway Assessment 2 opens as soon as you have completed Pathway Assessment 1.',`<a class="btn btn-purple" href="#/assessment/1">Go to Pathway Assessment 1 ${ARROW}</a>`);
  if(p.active) return sectionView(n);
  if(p.done && !VIEW.justDone) return focusTop(A_NAME(n),'Back to Home') + completeCard(n);
  if(VIEW.justDone) return focusTop(A_NAME(n),'Save &amp; Exit') + sectionDoneCard(n, VIEW.justDone);
  return focusTop(A_NAME(n),'Back to Home') + overview(n);
}
function completeCard(n){
  const body = n===1
    ? `<h1>Pathway Assessment 1 complete ${I('check','tickinline')}</h1><p>Your answers have been saved and will be used to build your Pathway DNA. Next is Pathway Assessment 2.</p><div class="actions"><a class="btn btn-gold" href="#/assessment/2">Continue to Pathway Assessment 2 ${ARROW}</a><a class="btn btn-ghost" href="#/answers/1">See My Answers</a></div>`
    : `<h1>Pathway Assessment 2 complete ${I('check','tickinline')}</h1><p>Your answers have been saved. Both Pathway Assessments are done — the last step is to upload your Grade 8 results. Then Pathway builds your Pathway DNA.</p><div class="actions"><a class="btn btn-gold" href="#/results/add?set=g8">Next: Upload your Grade 8 results ${ARROW}</a><a class="btn btn-ghost" href="#/answers/2">See My Answers</a></div>`;
  return `<div class="focus-wrap"><div class="glass done-card"><div class="tickbig">${I('check')}</div>${body}<p class="hint" style="margin-top:22px">${I('lock')} Completed assessments are locked so your answers stay exactly as you gave them. You can look back at your own answers anytime.</p></div></div>`;
}
function sectionDoneCard(n, secId){
  const u=me(), S=sectionsOf(n), s=S.find(x=>x.id===secId), nx=nextSection(u,n), done=doneCount(u,n);
  return `<div class="focus-wrap"><div class="glass done-card">
    <div class="tickbig">${I('check')}</div>
    <h1>${secLabel(n,s)} complete.</h1>
    <p>${done} of ${S.length} sections complete. Your answers are saved.</p>
    <div class="aprog"><div class="bar"><i style="width:${Math.round(done/S.length*100)}%"></i></div></div>
    <div class="actions">${nx?`<button class="btn btn-purple" data-view="overview">Continue to ${secLabel(n,nx)} ${ARROW}</button>`:''}<button class="btn btn-ghost" data-act="saveexit">Save &amp; Exit</button></div>
    <p class="hint" style="margin-top:14px">You can leave now and come back anytime — you'll continue from the next section.</p>
  </div></div>`;
}
function overview(n){
  const u=me(), p=u.progress['a'+n], S=sectionsOf(n), nx=nextSection(u,n), done=doneCount(u,n);
  const intro = n===1
    ? 'Pathway Assessment 1 is the first step in getting to know you. Read each question carefully and answer as well as you can. There’s no pass or fail, and you won’t see a mark.'
    : 'Pathway Assessment 2 helps Pathway get to know you even better. It ends with a section all about you. Answer naturally — there’s no pass or fail, and you won’t see a mark.';
  const rows = S.map((s,i)=>{ const st=p.sections[s.id]?.status; const isNext=nx&&nx.id===s.id;
    const meta = s.about ? `${qCount(s)} questions · no time limit · no right or wrong answers` : `${qCount(s)} questions · ${s.mins}-minute time limit${n===1?` · ${s.calc?'calculator allowed':'no calculator'}`:''}`;
    return `<li class="srow ${st==='complete'?'done':isNext?'next':'later'}"><span class="snum">${st==='complete'?I('check'):n===1?s.id:(s.about?I('heart'):i+1)}</span><span class="stxt"><b>${secLabel(n,s)}</b><small>${meta}</small></span><span class="sstat">${st==='complete'?'Complete':isNext?'Next':''}</span></li>`; }).join('');
  const s = nx;
  const pre = s ? `<div class="glass prestart">
      <div class="kicker">Before you start</div>
      <h2>${secLabel(n,s)}</h2>
      <p class="lead2">${s.about?'There are no right or wrong answers here — just tell us about yourself.':'Read each question carefully and answer as well as you can.'}</p>
      <ul class="rules">
        <li>${I('lock')}<span><b>Finish what you start.</b> You’ll need to complete this section once you start. You can save and exit after you finish it.</span></li>
        ${s.about?`<li>${I('clock')}<span>No time limit — take your time.</span></li>`:`<li>${I('clock')}<span><b>${s.mins}-minute time limit.</b> A timer shows how much time is left. If it reaches zero, you can still finish the section.</span></li>`}
        ${n===1?`<li>${I('card')}<span>${calcGuide(s)}</span></li>`:''}
        <li>${I('heart')}<span>Do your best — if something feels tricky, have a go anyway.</span></li>
      </ul>
      <button class="btn btn-gold" data-start="${s.id}">Start ${secLabel(n,s)} ${ARROW}</button>
    </div>` : '';
  return `<div class="focus-wrap wide">
    <div class="ahead"><h1>${A_NAME(n)}</h1><p>${intro}</p>
      <div class="aprog"><span>${done} of ${S.length} sections complete</span><div class="bar"><i style="width:${Math.round(done/S.length*100)}%"></i></div></div></div>
    <div class="agrid"><ol class="slist glass">${rows}</ol>${pre}</div>
    <details class="glass xpand solo arules"${done===0?' open':''}><summary>Before you begin — the assessment rules ${I('down')}</summary><div class="whyb">${rulesList()}</div></details>
  </div>`;
}

/* ---------- active section ---------- */
function sectionView(n){
  const u=me(), p=u.progress['a'+n], S=sectionsOf(n), s=S.find(x=>x.id===p.active), st=p.sections[s.id];
  const i=Math.min(st.idx||0, s.qs.length-1), q=s.qs[i];
  const timed = !s.about && st.deadline;
  const pos = S.indexOf(s)+1;
  return `<div class="focus-top"><div class="ttl"><img src="${MARK}" alt="PATHWAY"><span>${A_NAME(n)}<small class="subttl">${secLabel(n,s)} · ${pos} of ${S.length} sections</small></span></div>
      <div style="display:flex;gap:10px;align-items:center">${timed?`<span class="timer" id="timer" aria-live="off">${I('clock')}<span id="tval">${mmss(st.deadline-Date.now())}</span></span>`:''}${themeBtn()}</div></div>
    <div class="focus-wrap">
      <div id="timeup" class="timeup${timed && Date.now()>st.deadline?' show':''}" role="status">${I('clock')} Your time is up. You can still finish this section.</div>
      ${n===1?`<p class="calcnote">${I('card')} ${s.calc?'You may use a calculator for this section.':'Please work without a calculator in this section — paper and a pen or pencil are fine.'}</p>`:''}
      <div class="qprog"><div class="bar"><i style="width:${Math.max(3,Math.round(i/s.qs.length*100))}%"></i></div><span>Question ${i+1} of ${s.qs.length}</span></div>
      <div class="glass qcard" id="qcard">${qBody(n,s,q,st)}</div>
      <p class="hint center" style="margin-top:16px">${I('lock')} Completing this section saves your progress. You can take a break after you finish it.</p>
    </div>`;
}
/* Typed-answer limits — configured per question (q.limit / q.limitLabel / q.workLimit), with sensible defaults by type.
   maxlength stops typing at the limit, and a live counter shows what's left, so nothing is ever cut off unexpectedly. */
function limitsFor(q){
  const ansMax = q.limit || ({short:20, working:20, explain:20, open:400, rubric:400, text:300})[q.type] || 300;
  const ansLabel = q.limitLabel || (['short','working','explain'].includes(q.type) ? `Your answer (maximum ${ansMax} characters)` : `Your answer (maximum ${ansMax} characters)`);
  const workMax = q.workLimit || (q.type==='working' ? 600 : 400);
  return {ansMax, ansLabel, workMax};
}
const counter = (id,val,max) => `<span class="charcount" id="${id}">${String(val||'').length} / ${max} characters</span>`;
function isAnswered(q, st){
  const a=st.ans[q.id];
  if(q.type==='career') return !!(a && (a.status==='unsure' || (a.status==='yes' && a.career)));
  if(q.type==='match') return !!(a && q.pairs.every((_,k)=>a[k]));
  if(q.type==='order') return Array.isArray(a) && !!st.orderSet?.[q.id];
  return !(a==null || (typeof a==='string'&&!a.trim()) || (Array.isArray(a)&&!a.length));
}
function qBody(n,s,q,st){
  const a = st.ans[q.id], last = s.qs.indexOf(q)===s.qs.length-1;
  let body='';
  const ask = q.ask ? `<p class="ask">${q.ask}</p>` : '';
  const src = q.src==='net' ? cubeNet() : (q.src||'');
  if(q.type==='mc'){
    const ord = shuffleIdx(q.opts.length, q.id);
    body = `${src}${ask}<div class="opts" role="radiogroup">${ord.map(j=>`<button class="opt" role="radio" aria-checked="${a===j}" data-o="${j}"><span class="mk">${I('check')}</span><span>${q.opts[j]}</span></button>`).join('')}</div>`;
  } else if(q.type==='short'){
    const L=limitsFor(q);
    body = `${src}${ask}<div class="field" style="margin-top:18px"><label for="ans">${L.ansLabel}</label><div class="ansrow"><input class="input ansinput" id="ans" autocomplete="off" maxlength="${L.ansMax}" placeholder="${q.ph||'Type your answer'}" value="${esc(a||'')}">${q.unit?`<span class="unit">${q.unit}</span>`:''}</div>${L.ansMax>=30?counter('cnt-ans',a,L.ansMax):''}</div>`;
  } else if(q.type==='working' || q.type==='explain'){
    const L=limitsFor(q);
    body = `${src}${ask}<div class="field" style="margin-top:20px"><label for="ans">${L.ansLabel}</label><div class="ansrow"><input class="input ansinput" id="ans" autocomplete="off" maxlength="${L.ansMax}" placeholder="${q.ph||'Type your answer'}" value="${esc(a||'')}">${q.unit?`<span class="unit">${q.unit}</span>`:''}</div></div>
      <div class="field" style="margin-top:16px"><label for="work">${q.workLabel || (q.type==='working'?'Show your working':'Explain your thinking')}</label><textarea class="input" id="work" maxlength="${L.workMax}" placeholder="${q.type==='working'?'Write each step on a new line…':'In your own words…'}">${esc(st.work?.[q.id]||'')}</textarea>${counter('cnt-work',st.work?.[q.id],L.workMax)}</div>`;
  } else if(q.type==='open' || q.type==='rubric' || q.type==='text'){
    const L=limitsFor(q);
    body = `${src}${ask}<div class="field" style="margin-top:20px"><label for="ans">${L.ansLabel}</label><textarea class="input" id="ans" maxlength="${L.ansMax}" placeholder="${q.ph||'Write your answer in your own words…'}">${esc(a||'')}</textarea>${counter('cnt-ans',a,L.ansMax)}</div>`;
  } else if(q.type==='order'){
    const cur = Array.isArray(a) ? a : orderStart(q), set = !!st.orderSet?.[q.id];
    body = `${ask}<p class="qhint">Use the arrows to move each item into place.</p><ol class="olist">${cur.map((j,k)=>`<li class="inner"><span class="onum">${k+1}</span><span class="otxt">${q.items[j]}</span><span class="obtns"><button class="ob" data-mv="${k}:-1" ${k===0?'disabled':''} aria-label="Move up">${I('down','up')}</button><button class="ob" data-mv="${k}:1" ${k===cur.length-1?'disabled':''} aria-label="Move down">${I('down')}</button></span></li>`).join('')}</ol>${set?'':`<button class="btn btn-ghost btn-sm" id="keeporder" style="margin-top:12px">${I('check')} Keep this order</button>`}`;
  } else if(q.type==='match'){
    const rights=[...new Set(q.pairs.map(p=>p[1]))]; const ord=shuffleIdx(rights.length,q.id+'m');
    body = `${src}<div class="mlist">${q.pairs.map((p,k)=>`<div class="mitem inner"><label for="m${k}">${p[0]}</label><select class="input" id="m${k}" data-mk="${k}"><option value="">Choose…</option>${ord.map(j=>`<option ${a&&a[k]===rights[j]?'selected':''}>${esc(rights[j])}</option>`).join('')}</select></div>`).join('')}</div>`;
  } else if(q.type==='pref' || q.type==='multi'){
    const multi=q.type==='multi', sel=multi?(a||[]):a;
    body = `<div class="opts ${q.opts.length>5?'two':''}" role="${multi?'group':'radiogroup'}">${q.opts.map((o,j)=>{ const on=multi?sel.includes(j):sel===j; return `<button class="opt ${multi?'multi':''}" role="${multi?'checkbox':'radio'}" aria-checked="${on}" data-o="${j}"><span class="mk">${I('check')}</span><span>${esc(o[0])}</span></button>`; }).join('')}</div>`;
  } else if(q.type==='career'){
    body = careerBody(a);
  }
  const kicker = s.about ? 'About You · no right or wrong answers' : `${A_NAME(n)} · ${secLabel(n,s)}`;
  if(isFractionAnswer(q)) body += `<p class="fraction-hint">${I('info')}<span>To type a fraction like ${frac(3,4)}, use a slash: <code>3/4</code></span></p>`;
  return mathify(`<div class="kicker2">${kicker}</div><h1 class="qtext">${q.q}</h1>${q.hint?`<p class="qhint">${q.hint}</p>`:''}${body}
    <p class="needans" id="needans" role="alert" hidden>${I('info')} Please answer this question before you continue.</p>
    <div class="qnav"><button class="btn btn-ghost" id="prev" ${s.qs.indexOf(q)===0?'disabled':''}>${I('back')} Previous</button>
    <button class="btn ${last?'btn-gold':'btn-purple'}" id="next">${last?'Finish section':'Next'} ${ARROW}</button></div>`);
}
function cubeNet(){
  const c=(x,y,t)=>`<rect x="${x}" y="${y}" width="46" height="46" rx="4"/><text x="${x+23}" y="${y+30}">${t}</text>`;
  return `<div class="netfig"><svg viewBox="0 0 200 150" role="img" aria-label="A cube net: A above C; B, C, D and E in a row; F below C">${c(52,4,'A')}${c(6,52,'B')}${c(52,52,'C')}${c(98,52,'D')}${c(144,52,'E')}${c(52,100,'F')}</svg></div>`;
}
function careerBody(a){
  a = a||{};
  const yes=a.status==='yes', unsure=a.status==='unsure';
  let extra='';
  if(yes){
    extra = a.career
      ? `<div class="picked inner">${I('briefcase')}<div><small>You chose</small><b>${esc(a.career)}</b>${a.family?`<small>${esc(familyOf(a.family).name)}</small>`:''}</div><button class="link" id="cchange">Change</button></div>`
      : `<div class="csearch"><div class="fsearch" style="margin-top:14px;max-width:none">${I('search')}<label class="sr" for="csq">Search for a career</label><input id="csq" type="search" autocomplete="off" placeholder="Start typing a career, e.g. engineer, nurse, designer…"></div><div id="cres" class="cres"></div></div>`;
  }
  if(unsure) extra = `<div class="reassure-note inner">${I('heart')}<span>That’s okay. You don’t have to know your future yet. PATHWAY will help you explore.</span></div>`;
  return `<div class="opts" role="radiogroup" style="margin-top:18px">
    <button class="opt" role="radio" aria-checked="${yes}" data-car="yes"><span class="mk">${I('check')}</span><span>Yes, I have an idea</span></button>
    <button class="opt" role="radio" aria-checked="${unsure}" data-car="unsure"><span class="mk">${I('check')}</span><span>I’m not sure yet — I’m open to exploring</span></button></div>${extra}`;
}
function careerResults(qs){
  const t=qs.trim().toLowerCase();
  let list = t ? CAREERS.filter(c=>c.name.toLowerCase().includes(t) || familyOf(c.family).name.toLowerCase().includes(t)) : [];
  list = list.sort((a,b)=>(a.name.toLowerCase().startsWith(t)?0:1)-(b.name.toLowerCase().startsWith(t)?0:1)).slice(0,8);
  if(!t) return `<p class="hint">PATHWAY’s list includes ${CAREERS.length} careers across ${CAREER_FAMILIES.length} career families.</p>`;
  return list.map(c=>`<button class="cpick" data-cname="${esc(c.name)}" data-cfam="${c.family}"><b>${esc(c.name)}</b><small>${esc(familyOf(c.family).name)}</small></button>`).join('')
    + `<button class="cpick ghost" data-cname="${esc(qs.trim())}" data-cfam=""><b>Use “${esc(qs.trim())}”</b><small>Not on the list? That’s fine — we’ll save it as you typed it.</small></button>`;
}

/* ---------- behaviour ---------- */
function flushTime(st, q){ if(!VIEW.qStart||!q) return; st.time=st.time||{}; st.time[q.id]=(st.time[q.id]||0)+(Date.now()-VIEW.qStart); VIEW.qStart=Date.now(); }
function markAnswered(st, q){ const now=Date.now(); st.firstAt=st.firstAt||{}; st.after=st.after||{}; if(!st.firstAt[q.id]) st.firstAt[q.id]=now; if(st.deadline && now>st.deadline) st.after[q.id]=true; }
function assessAfter(n){
  const u=me(); if(!u) return; const p=u.progress['a'+n];
  clearInterval(TICK); TICK=null;
  document.querySelectorAll('[data-start]').forEach(b=>b.addEventListener('click',()=>{
    const s=sectionsOf(n).find(x=>x.id===b.dataset.start), now=Date.now();
    p.sections[s.id] = {status:'active', startedAt:now, deadline: s.about?null:now+s.mins*60000, idx:0, ans:{}, work:{}, time:{}, firstAt:{}, after:{}};
    p.active = s.id; save(); VIEW={}; render();
  }));
  document.querySelectorAll('[data-view="overview"]').forEach(b=>b.addEventListener('click',()=>{ VIEW={}; render(); }));
  if(!p.active) return;
  const S=sectionsOf(n), s=S.find(x=>x.id===p.active), st=p.sections[s.id];
  const q = () => s.qs[Math.min(st.idx||0, s.qs.length-1)];
  VIEW.qStart = Date.now();
  if(st.deadline){
    const tick=()=>{ const left=st.deadline-Date.now(), el=document.getElementById('tval'); if(!el){ clearInterval(TICK); return; }
      el.textContent=mmss(left); const t=document.getElementById('timer'); t.classList.toggle('low', left<60000 && left>0); t.classList.toggle('over', left<=0);
      if(left<=0){ document.getElementById('timeup').classList.add('show'); if(!st.timeUpAt){ st.timeUpAt=Date.now(); save(); } } };
    tick(); TICK=setInterval(tick,1000);
  }
  const redraw = (focusSel) => { document.getElementById('qcard').innerHTML = qBody(n,s,q(),st); bindQ(); if(focusSel) document.querySelector(focusSel)?.focus(); };
  const bindQ = () => {
    const Q=q(), card=document.getElementById('qcard');
    card.querySelectorAll('.opt[data-o]').forEach(b=>b.addEventListener('click',()=>{
      const j=+b.dataset.o;
      if(Q.type==='multi'){ let cur=new Set(st.ans[Q.id]||[]); if(cur.has(j)) cur.delete(j); else { if(Q.none!=null){ if(j===Q.none) cur=new Set(); else cur.delete(Q.none); } cur.add(j); } st.ans[Q.id]=[...cur]; }
      else st.ans[Q.id]=j;
      markAnswered(st,Q); save(); redraw(`.opt[data-o="${j}"]`);
    }));
    const hideNeed=()=>{ const m=card.querySelector('#needans'); if(m) m.hidden=true; };
    const ans=card.querySelector('#ans'); if(ans) ans.addEventListener('input',()=>{ st.ans[Q.id]=ans.value; markAnswered(st,Q); save(); hideNeed(); const c=card.querySelector('#cnt-ans'); if(c) c.textContent=`${ans.value.length} / ${ans.maxLength} characters`; });
    const work=card.querySelector('#work'); if(work) work.addEventListener('input',()=>{ st.work[Q.id]=work.value; save(); const c=card.querySelector('#cnt-work'); if(c) c.textContent=`${work.value.length} / ${work.maxLength} characters`; });
    card.querySelector('#keeporder')?.addEventListener('click',()=>{ st.ans[Q.id]=orderStart(Q); st.orderSet=st.orderSet||{}; st.orderSet[Q.id]=true; markAnswered(st,Q); save(); redraw(); });
    card.querySelectorAll('[data-mv]').forEach(b=>b.addEventListener('click',()=>{ const [k,d]=b.dataset.mv.split(':').map(Number); const a=[...(Array.isArray(st.ans[Q.id])?st.ans[Q.id]:orderStart(Q))]; st.orderSet=st.orderSet||{}; st.orderSet[Q.id]=true; [a[k],a[k+d]]=[a[k+d],a[k]]; st.ans[Q.id]=a; markAnswered(st,Q); save(); redraw(`[data-mv="${k+d}:${d}"]`); }));
    card.querySelectorAll('[data-mk]').forEach(sel=>sel.addEventListener('change',()=>{ const a={...(st.ans[Q.id]||{})}; a[sel.dataset.mk]=sel.value||undefined; st.ans[Q.id]=a; markAnswered(st,Q); save(); }));
    card.querySelectorAll('[data-car]').forEach(b=>b.addEventListener('click',()=>{ st.ans[Q.id] = b.dataset.car==='yes' ? {status:'yes', career:(st.ans[Q.id]||{}).career||null, family:(st.ans[Q.id]||{}).family||null} : {status:'unsure'}; markAnswered(st,Q); save(); redraw(b.dataset.car==='yes'?'#csq':null); }));
    const csq=card.querySelector('#csq'); if(csq){ const res=card.querySelector('#cres'); res.innerHTML=careerResults('');
      csq.addEventListener('input',()=>{ res.innerHTML=careerResults(csq.value); });
      res.addEventListener('click',e=>{ const b=e.target.closest('.cpick'); if(!b||!b.dataset.cname) return; st.ans[Q.id]={status:'yes', career:b.dataset.cname, family:b.dataset.cfam||null, custom:!b.dataset.cfam}; save(); redraw('#cchange'); }); }
    const ch=card.querySelector('#cchange'); if(ch) ch.addEventListener('click',()=>{ st.ans[Q.id]={status:'yes'}; save(); redraw('#csq'); });
    card.querySelector('#prev').addEventListener('click',()=>{ flushTime(st,Q); st.idx=Math.max(0,(st.idx||0)-1); save(); render(); window.scrollTo({top:0}); });
    card.querySelector('#next').addEventListener('click',()=>{
      if(!isAnswered(Q,st)){ const m=card.querySelector('#needans'); m.hidden=false; (card.querySelector('#ans,.opt,[data-mk],#keeporder,[data-car]'))?.focus(); return; }
      flushTime(st,Q);
      if((st.idx||0) < s.qs.length-1){ st.idx=(st.idx||0)+1; save(); render(); window.scrollTo({top:0}); return; }
      finishSection(n,s,st);
    });
  };
  bindQ();
}
function unansweredIn(n,s,st){ return s.qs.filter(q=>!isAnswered(q,st)); }   /* every question must be answered */
function finishSection(n,s,st){
  const miss = unansweredIn(n,s,st);
  const doFinish = () => {
    const u=me(), p=u.progress['a'+n];
    st.status='complete'; st.finishedAt=Date.now(); st.overTime = !!(st.deadline && st.finishedAt>st.deadline);
    st.results = scoreSection(n, s.id, st);
    p.active=null;
    if(sectionsOf(n).every(x=>p.sections[x.id]?.status==='complete')){ p.done=true; p.completedAt=Date.now(); u.progress.dnaStale=true; }
    save(); clearInterval(TICK); VIEW={justDone:p.done?null:s.id}; render(); window.scrollTo({top:0});
  };
  if(!miss.length) return doFinish();
  /* can't finish with an unanswered question: take the learner straight to it */
  st.idx=s.qs.indexOf(miss[0]); save(); render(); window.scrollTo({top:0});
  setTimeout(()=>{ const m=document.getElementById('needans'); if(m){ m.hidden=false; } },50);
}
document.addEventListener('visibilitychange',()=>{ if(document.hidden){ const u=me(); const n=activeAssessment(u); if(n){ const p=u.progress['a'+n], s=sectionsOf(n).find(x=>x.id===p.active), st=p.sections[s.id]; flushTime(st, s.qs[st.idx||0]); save(); } } });

/* ============================================================
   MY ASSESSMENT (Grade 9)
   ============================================================ */
/* ============================================================
   MY PATHWAY ASSESSMENT (Grade 9) — explains the process in neutral, learner-friendly language.
   It never says what the assessments measure; the analysis happens behind the scenes.
   ============================================================ */
const ASSESSMENT_RULES = [
  'Read each question carefully.',
  'Answer honestly — there’s no pass or fail.',
  'Some questions may have different answer formats.',
  'Some sections may have a time limit.',
  'You may save your progress and return later.',
  'Once you begin a section, you must complete that section before leaving it.',
  'You cannot save and exit halfway through a section.',
  'You can return to an unfinished assessment later if you have completed the section you were working on.',
  'Complete Pathway Assessment 1 before moving to Pathway Assessment 2.',
  'Once an assessment has been fully completed, it cannot be retaken.'
];
const rulesList = () => `<ul class="rulelist">${ASSESSMENT_RULES.map(r=>`<li>${I('check')}<span>${r}</span></li>`).join('')}</ul>`;
function myAssessment(){
  return shell((u,initials,planTxt)=>{
    const s1=aStatus(u,1), s2=aStatus(u,2), s3=g8Status(u), all=s1==='complete'&&s2==='complete'&&s3==='complete';
    const soon = `<span class="answersoon">Your answers will become available after you complete this assessment.</span>`;
    const A = (n,st) => {
      if(st==='complete') return {label:'Completed', cls:'st-done', ic:'✓', act:`<a class="btn btn-ghost btn-sm" href="#/answers/${n}">${I('file')} See My Answers</a>`};
      if(st==='locked')   return {label:'Locked', cls:'st-lock', ic:'🔒', act:`<span class="lockmsg">Complete Pathway Assessment 1 first.</span>`};
      if(st==='progress') return {label:'In progress', cls:'st-prog', ic:'◐', act:`<a class="btn btn-purple btn-sm" href="#/assessment/${n}">Continue Assessment ${ARROW}</a>${soon}`, meta:`${doneCount(u,n)} of ${sectionsOf(n).length} sections complete`};
      return {label: n===2?'Ready to begin':'Not started', cls:'st-new', ic:'○', act:`<a class="btn btn-purple btn-sm" href="#/assessment/${n}">Start Assessment ${ARROW}</a>${soon}`, meta:`${sectionsOf(n).length} sections`};
    };
    const G = s3==='complete' ? {label:'Confirmed', cls:'st-done', ic:'✓', act:`<a class="btn btn-ghost btn-sm" href="#/results/add?set=g8">${I('lock')} View</a>`}
      : s3==='locked' ? {label:'Locked', cls:'st-lock', ic:'🔒', act:`<span class="lockmsg">Complete Pathway Assessment 2 first.</span>`}
      : {label:'Ready', cls:'st-new', ic:'○', act:`<a class="btn btn-purple btn-sm" href="#/results/add?set=g8">Upload results ${ARROW}</a>`};
    const dst = stageState(u,'initial');
    const D = dst==='ready' ? {label:'Ready', cls:'st-done', ic:'✓', act:`<a class="btn btn-gold btn-sm" href="#/dna/stage?k=initial">View my Pathway DNA ${ARROW}</a>`}
      : dst==='processing' ? {label:'Taking shape…', cls:'st-prog', ic:'◐', act:`<a class="btn btn-ghost btn-sm" href="#/dna/stage?k=initial">See progress</a>`}
      : {label:'Waiting', cls:'st-lock', ic:'○', act:`<span class="lockmsg">Generated after steps 1–3</span>`};
    const row = (num,title,desc,x) => `<li class="mstep glass ${x.cls}"><span class="mnum">${num}</span><div class="mtxt"><h3>${title}</h3><p>${desc}</p>${x.meta?`<small>${x.meta}</small>`:''}</div><span class="mstat"><span class="sico">${x.ic}</span>${x.label}</span><div class="mact">${x.act}</div></li>`;
    return `<div class="topbar"><div><div class="today">Grade 9</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">My Pathway Assessment</h1><p class="greet-sub">Pathway is getting to know you. Answer honestly, and Pathway will use what you share to build your personalised Pathway DNA.</p></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>
      <ol class="msteps">
        ${row(1,'Pathway Assessment 1','The first step in getting to know you.',A(1,s1))}
        <li class="marrow" aria-hidden="true">${I('down')}</li>
        ${row(2,'Pathway Assessment 2','Getting to know you even better — including a section all about you.',A(2,s2))}
        <li class="marrow" aria-hidden="true">${I('down')}</li>
        ${row(3,'Upload Grade 8 Results','Add your Grade 8 Term 4 report.',G)}
        <li class="marrow" aria-hidden="true">${I('down')}</li>
        ${row(4,'Pathway DNA','Pathway brings everything together into your personalised guidance.',D)}
      </ol>
      <div class="infogrid">
        <section class="glass infocard"><div class="kicker">What it is</div><h2>What is My Pathway Assessment?</h2>
          <p>My Pathway Assessment is how Pathway gets to know you. It has two parts — Pathway Assessment 1 and Pathway Assessment 2 — followed by your Grade 8 results.</p>
          <p>There’s no pass or fail, and you won’t see a mark. Just read carefully and answer honestly. There’s nothing to prepare or study for.</p></section>
        <section class="glass infocard"><div class="kicker">Before you begin</div><h2>The rules</h2>${rulesList()}</section>
        <section class="glass infocard"><div class="kicker">How it works</div><h2>Your steps</h2>
          <ol class="howsteps"><li><b>Pathway Assessment 1</b><span>Work through the sections one at a time.</span></li><li><b>Pathway Assessment 2</b><span>Opens when Pathway Assessment 1 is complete.</span></li><li><b>Upload your Grade 8 results</b><span>Opens when both assessments are complete.</span></li><li><b>Pathway DNA is generated</b><span>Pathway brings everything together for you.</span></li></ol></section>
        <section class="glass infocard"><div class="kicker">Saving and coming back</div><h2>When you can leave</h2>
          <p><b>Within a section:</b> once you start a section, you need to finish it. You can’t save and exit halfway through.</p>
          <p><b>Between sections:</b> after you finish a section, you can choose <b>Save &amp; Exit</b>. When you come back, you’ll continue from the next unfinished section.</p>
          <p><b>Timed sections:</b> a timer shows how much time is left. If it reaches zero, you can still finish the section.</p></section>
        <section class="glass infocard wide"><div class="kicker">What happens next</div><h2>After each step</h2>
          <ul class="plist"><li>${I('check')}<span><b>After Pathway Assessment 1:</b> your answers are saved and Pathway Assessment 2 opens.</span></li>
          <li>${I('check')}<span><b>After Pathway Assessment 2:</b> your answers are saved and you can upload your Grade 8 results.</span></li>
          <li>${I('check')}<span><b>After both assessments:</b> each assessment is locked so your answers stay exactly as you gave them. You can look back at them anytime with <b>See My Answers</b>.</span></li>
          <li>${I('check')}<span><b>After your Grade 8 results:</b> Pathway gets to know your results and builds your Pathway DNA.</span></li></ul></section>
      </div>`;
  });
}

/* ============================================================
   MY RESULTS — upload → review → confirm → locked snapshot
   Confirmed results can never be edited through the learner interface; each confirmation starts a new Pathway DNA stage.
   ============================================================ */
const RESULT_SETS = [
  {key:'g8', label:'Grade 8 Term 4 results', short:'Grade 8', stage:'initial'},
  {key:'t1', term:1, label:'Grade 9 Term 1 results', short:'Term 1', stage:'t1'},
  {key:'t2', term:2, label:'Grade 9 Term 2 results', short:'Term 2', stage:'t2'},
  {key:'t3', term:3, label:'Grade 9 Term 3 results', short:'Term 3', stage:'t3'},
  {key:'t4', term:4, label:'Grade 9 Term 4 results', short:'Term 4', stage:'t4'}
];
const rsDef = k => RESULT_SETS.find(x=>x.key===k);
function rsGet(u,k){ const P=u.progress; if(k==='g8') return P.g8; P.g9=P.g9||{}; return P.g9[rsDef(k).term]; }
function rsPut(u,k,v){ const P=u.progress; if(k==='g8') P.g8=v; else { P.g9=P.g9||{}; P.g9[rsDef(k).term]=v; } }
function rsStatus(u,k){
  const r=rsGet(u,k); if(isApproved(r)) return 'confirmed';
  if(k==='g8') return !(u.progress.a1.done && u.progress.a2.done) ? 'locked' : (r?.draft ? 'draft' : 'open');
  const prev = RESULT_SETS[RESULT_SETS.findIndex(x=>x.key===k)-1];
  return rsStatus(u,prev.key)!=='confirmed' ? 'locked' : (r?.draft ? 'draft' : 'open');
}
const rsLockReason = k => k==='g8' ? 'Complete Pathway Assessment 1 and Pathway Assessment 2 first.' : `Confirm your ${rsDef(RESULT_SETS[RESULT_SETS.findIndex(x=>x.key===k)-1].key).label.replace(' results','')} results first.`;
function resultsHub(){
  return shell((u,initials,planTxt)=>{
    const row = d => { const st=rsStatus(u,d.key), r=rsGet(u,d.key);
      const chip = {confirmed:`<span class="schip ok">${I('lock')} Confirmed</span>`, draft:'<span class="schip warn">Waiting for your review</span>', open:'<span class="schip blue">Ready to add</span>', locked:'<span class="schip mute">Not yet available</span>'}[st];
      const act = st==='confirmed' ? `<a class="btn btn-ghost btn-sm" href="#/results/add?set=${d.key}">View</a>` : st==='locked' ? `<span class="lockmsg">${rsLockReason(d.key)}</span>` : `<a class="btn btn-purple btn-sm" href="#/results/add?set=${d.key}">${st==='draft'?'Review and confirm':'Add results'} ${ARROW}</a>`;
      return `<li class="rsrow glass ${st}"><span class="pub-ic">${I(st==='confirmed'?'check':st==='locked'?'lock':'upload')}</span><div class="rstxt"><h3>${d.label}</h3>${d.term?`<span class="termline">${I('calendar')} Term ${d.term}: ${fmtShort(termOf(d.term).s)} – ${fmtShort(termOf(d.term).e)} · report after the term ends</span>`:`<span class="termline">${I('calendar')} Your final Grade 8 report from last year</span>`}<small>${st==='confirmed'?`Confirmed ${new Date(r.approvedAt||r.savedAt||Date.now()).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})} · starts ${DNA_STAGE_DEFS.find(x=>x.key===d.stage).title}`:`Starts ${DNA_STAGE_DEFS.find(x=>x.key===d.stage).title}`}</small></div>${chip}<div class="mact">${act}</div></li>`; };
    return `<div class="topbar"><div><div class="today">Grade 9</div><h1 class="greet" style="font-size:clamp(2rem,3.6vw,3rem)">My Results</h1><p class="greet-sub">Add each set of results when your report comes out. Once you confirm them, they’re locked — so every Pathway DNA stage is based on a fixed snapshot of your results.</p></div><div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>
      <ol class="rslist">${RESULT_SETS.map(row).join('')}</ol>
      <div class="glass infonote">${I('info')}<span>Confirmed results can’t be changed. If something is genuinely wrong on a confirmed result, contact Support.</span></div>`;
  });
}
function resultsAdd(){
  const u=me(), k=(new URLSearchParams(location.hash.split('?')[1]||'')).get('set')||'g8', d=rsDef(k);
  if(!d) return lockCard('We couldn’t find those results.','',`<a class="btn btn-purple" href="#/results">Go to My Results ${ARROW}</a>`);
  const st=rsStatus(u,k), r=rsGet(u,k)||{};
  const back = k==='g8' ? '#/my-assessment' : '#/results';
  if(st==='locked') return focusTop(d.label,'Back',back) + lockCard(`${d.label} aren’t available yet.`, rsLockReason(k), `<a class="btn btn-purple" href="${back}">Back ${ARROW}</a>`);
  const table = marks => `<div class="src-table"><table><tr><th>Subject</th><th>Mark</th><th>Level</th></tr>${G8.map(([id,name])=>`<tr><th>${name}</th><td>${marks[id]}%</td><td>Level ${level(marks[id])}</td></tr>`).join('')}</table></div>`;
  if(st==='confirmed') return focusTop(d.label,'Back',back) + `<div class="focus-wrap"><div class="glass qcard"><div class="kicker2">${I('lock')} Confirmed and locked</div><h1>${d.label}</h1><p class="qhint">Confirmed ${new Date(r.approvedAt||r.savedAt||Date.now()).toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'})}. These results are locked so your Pathway DNA stays based on a fixed snapshot.</p>${table(r.marks)}${r.file?`<p class="hint" style="margin-top:12px">${I('file')} Report attached: ${esc(r.file)}</p>`:''}</div></div>`;
  if(VIEW.review || (st==='draft' && !VIEW.edit)){ const dr=r.draft;
    return focusTop(d.label,'Back',back) + `<div class="focus-wrap"><div class="glass qcard">
      <div class="kicker2">Step 2 of 2 · Review</div><h1>Check your ${d.label}</h1>
      <p class="qhint">Make sure every mark matches your report.</p>${table(dr.marks)}${dr.file?`<p class="hint" style="margin-top:12px">${I('file')} Report attached: ${esc(dr.file)}</p>`:''}
      <div class="warnnote">${I('lock')}<span><b>Once you confirm, these results are locked.</b> You won’t be able to change the marks, subjects or report afterwards. Pathway will then use them for your ${DNA_STAGE_DEFS.find(x=>x.key===d.stage).title}.</span></div>
      <div class="qnav"><button class="btn btn-ghost" id="edit">${I('back')} Edit</button><button class="btn btn-gold" id="confirm">Confirm results ${ARROW}</button></div></div></div>`; }
  const cur = r.draft?.marks || {};
  return focusTop(d.label,'Back',back) + `<div class="focus-wrap"><div class="glass qcard">
    <div class="kicker2">Step 1 of 2 · Add your results</div><h1>${d.label}</h1>
    <p class="qhint" style="font-size:1rem">Type in the final percentage for each subject from your report. Your school might name subjects slightly differently — use the closest match.</p>
    <form id="f" novalidate>
      <div class="marks">${G8.map(([id,name])=>{ const v=cur[id]??''; return `<div class="mrow inner"><label for="m-${id}">${name}</label><div class="pct"><input class="input" id="m-${id}" data-m="${id}" inputmode="numeric" maxlength="3" placeholder="—" value="${esc(v)}"></div><span class="lvl ${v!==''?'on':''}" id="l-${id}">${v!==''?'Level '+level(+v):'Level –'}</span></div>`; }).join('')}</div>
      <div class="err" id="marks-e" style="margin-top:10px"></div>
      <label class="drop" id="drop">${I('upload')}<span><b id="fname">${r.draft?.file?esc(r.draft.file):'Attach your report (optional)'}</b><small>PDF, JPG or PNG, up to 10 MB.</small></span><input type="file" id="file" accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf" class="sr"></label>
      <div class="qnav"><a class="btn btn-ghost" href="${back}">${I('back')} Back</a><button class="btn btn-purple" type="submit">Review results ${ARROW}</button></div>
    </form></div></div>`;
}
resultsAdd.after = () => {
  const u=me(), k=(new URLSearchParams(location.hash.split('?')[1]||'')).get('set')||'g8'; if(!rsDef(k)) return;
  const r = rsGet(u,k) || {}; let file = r.draft?.file||null;
  document.querySelectorAll('[data-m]').forEach(inp=>inp.addEventListener('input',()=>{
    inp.value=inp.value.replace(/\D/g,'').slice(0,3); const l=document.getElementById('l-'+inp.dataset.m), v=inp.value, ok=v!==''&&+v<=100;
    inp.setAttribute('aria-invalid', v!=='' && +v>100 ? 'true':'false'); l.textContent = ok ? 'Level '+level(+v) : 'Level –'; l.classList.toggle('on',ok); }));
  const fileIn=document.getElementById('file'), drop=document.getElementById('drop');
  if(fileIn){ const take=f=>{ if(!f) return; if(f.size>10*1024*1024){ toast('That file is larger than 10 MB. Try a smaller photo or PDF.','file'); return; } file=f.name; document.getElementById('fname').textContent=f.name; };
    fileIn.addEventListener('change',()=>take(fileIn.files[0]));
    ['dragover','dragenter'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over');}));
    ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over');}));
    drop.addEventListener('drop',e=>take(e.dataTransfer.files[0])); }
  document.getElementById('f')?.addEventListener('submit',e=>{
    e.preventDefault(); const marks={}, missing=[], bad=[];
    document.querySelectorAll('[data-m]').forEach(inp=>{ const v=inp.value, name=G8_NAME[inp.dataset.m]; if(v===''){missing.push(name); inp.setAttribute('aria-invalid','true');} else if(+v>100) bad.push(name); else marks[inp.dataset.m]=+v; });
    const er=document.getElementById('marks-e');
    if(missing.length||bad.length){ er.textContent = missing.length ? `Add a percentage for: ${missing.join(', ')}.` : `Percentages can't be more than 100: ${bad.join(', ')}.`; document.querySelector('[aria-invalid="true"]')?.focus(); return; }
    rsPut(u,k,{...(rsGet(u,k)||{}), draft:{marks, file, savedAt:Date.now()}}); save(); VIEW={review:true}; render(); window.scrollTo(0,0);
  });
  document.getElementById('edit')?.addEventListener('click',()=>{ VIEW={edit:true}; render(); });
  document.getElementById('confirm')?.addEventListener('click',()=>{
    const cur=rsGet(u,k), dr=cur.draft;
    rsPut(u,k,{marks:dr.marks, file:dr.file||null, done:true, approved:true, locked:true, savedAt:dr.savedAt, approvedAt:Date.now()});
    notify(u,'res9-'+k,{title:'Your PATHWAY has been updated', body:`Your ${rsDef(k).label} have been saved. Your Pathway DNA is being updated.`, link:'#/dna'});
    const stage = rsDef(k).stage; requestStage(u, stage); save(); VIEW={};
    go('#/dna/stage?k='+stage); toast('Results confirmed and locked. Your Pathway DNA is taking shape.','check');
  });
};

/* ============================================================
   PATHWAY DNA — a living journey of preserved stages
   Initial → Post Term 1 → Post Term 2 → Post Term 3 → Post Term 4. A stage is created once, from a fixed snapshot of
   approved data, when its milestone is confirmed. It is never recalculated or overwritten.
   ============================================================ */
const DNA_PROCESSING_MS = 30000;   /* prototype: time a new stage spends "taking shape" before it opens (the real backend sets this) */
const GUIDE_TEXT = 'This is a guide based on the information you’ve shared with Pathway. It does not mean you have to follow this direction. You can explore other options, change your mind and discover new interests. Your Pathway DNA will also be revisited as you continue to upload your results.';
const DNA_STAGE_DEFS = [
  {key:'initial', upto:0, title:'Initial Pathway DNA', uses:['Pathway Assessment 1','Pathway Assessment 2','Grade 8 results']},
  {key:'t1', term:1, upto:1, title:'Pathway DNA — Post Grade 9 Term 1'},
  {key:'t2', term:2, upto:2, title:'Pathway DNA — Post Grade 9 Term 2'},
  {key:'t3', term:3, upto:3, title:'Pathway DNA — Post Grade 9 Term 3'},
  {key:'t4', term:4, upto:4, title:'Pathway DNA — Post Grade 9 Term 4'}
];
DNA_STAGE_DEFS.forEach(d=>{ if(d.term) d.uses=['Pathway Assessment 1','Pathway Assessment 2','Grade 8 results',...G9_TERMS.filter(t=>t<=d.term).map(t=>`Grade 9 Term ${t} results`)]; });
const dnaInputsReady = u => u.progress.a1.done && u.progress.a2.done && isApproved(u.progress.g8);
const stagesOf = u => (u.progress.dnaStages = u.progress.dnaStages || {});
function requestStage(u, key){
  const S=stagesOf(u); if(S[key]) return S[key];               /* never overwrite an existing stage */
  const def=DNA_STAGE_DEFS.find(x=>x.key===key), now=Date.now();
  const prevDef=[...DNA_STAGE_DEFS].reverse().find(x=>x.upto<def.upto && S[x.key]);
  const dna=buildDNA(u, def.upto); dna.changes = prevDef ? dnaChanges(S[prevDef.key].dna, dna) : null; dna.stage=key;
  S[key]={key, status:'processing', requestedAt:now, readyAt:now+DNA_PROCESSING_MS, dna};
  return S[key];
}
function stageState(u,key){
  const s=stagesOf(u)[key];
  if(s){ if(s.status==='processing' && Date.now()>=s.readyAt){ s.status='ready'; s.readyAtActual=Date.now(); save(); } return s.status; }
  return key==='initial' && !dnaInputsReady(u) ? 'waiting' : 'locked';
}
const latestReady = u => [...DNA_STAGE_DEFS].reverse().find(d=>stageState(u,d.key)==='ready');
function helix(cls=''){
  let s=''; for(let i=0;i<14;i++){ const y=20+i*20, x=Math.sin(i*.55)*60; const c=['var(--acc)','#F2C46D','var(--acc-hi)'][i%3];
    s+=`<line x1="${150-x}" y1="${y}" x2="${150+x}" y2="${y}" style="stroke:${c}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/><circle cx="${150-x}" cy="${y}" r="6" style="fill:${c}"/><circle cx="${150+x}" cy="${y}" r="6" style="fill:${c}" fill-opacity=".7"/>`; }
  return `<svg class="helix ${cls}" viewBox="0 0 300 300" aria-hidden="true">${s}</svg>`;
}
const joinWords = joinList;
const TRAIT_LABEL = {strong:['Strong alignment','ok'], good:['Good alignment','blue'], developing:['Developing','warn'], told:['From what you told us','dna']};
const FOUNDATION = l => l>=7?'an excellent foundation':l>=6?'a strong foundation':l>=5?'a solid foundation':l>=4?'a steady foundation to build on':'a foundation with room to grow — and Grade 9 is a great time to build it';
const MATHS_NEED = {required:'Mathematics is commonly asked for.', preferred:'Mathematics keeps the most options open; some programmes accept Mathematical Literacy.', either:'Mathematics or Mathematical Literacy is often accepted.', technical:'Mathematics or Technical Mathematics is commonly asked for.'};
const SUBJ_ICON = s => ({'Physical Sciences':'target','Life Sciences':'leaf','Technical Sciences':'wrench','Accounting':'grid','Economics':'chart','Business Studies':'briefcase','History':'book','Geography':'pin','Tourism':'pin','Engineering Graphics and Design':'shapes','Information Technology':'monitor','Computer Applications Technology':'monitor','Civil, Electrical or Mechanical Technology':'wrench','Agricultural Sciences':'leaf','Visual Arts':'palette','Design':'palette'})[s]||'book';

/* ---------- overview ---------- */
function dnaOverview(){
  return shell((u,initials,planTxt)=>{
    const g9 = gradeOf(u)==='9';
    const item = d => { const st=stageState(u,d.key), s=stagesOf(u)[d.key];
      const chip = {ready:'<span class="schip ok">Available</span>', processing:'<span class="schip dna pulse">Taking shape…</span>', locked:'<span class="schip mute">Not yet available</span>', waiting:'<span class="schip mute">Not yet available</span>'}[st];
      const sub = st==='ready' ? `Built ${new Date(s.readyAtActual||s.readyAt).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})} · ${d.key==='initial'?'Assessment 1 + Assessment 2 + Grade 8 results':`Adds your Grade 9 Term ${d.term} results`}`
        : st==='processing' ? 'Pathway is working on this now'
        : d.key==='initial' ? 'Assessment 1 + Assessment 2 + Grade 8 results' : `Upload and confirm your Term ${d.term} results`;
      return `<li><a class="dstage ${st}" href="#/dna/stage?k=${d.key}"><span class="dico">${st==='locked'||st==='waiting'?I('lock'):I('dna')}</span><span class="dtxt"><b>${d.title}</b><small>${sub}</small></span>${chip}${I('arrow')}</a></li>`; };
    const L = latestReady(u), D = L && stagesOf(u)[L.key].dna;
    const now = D ? `<section class="glass dnanow"><div class="kicker">What Pathway currently understands</div><h2>From your ${L.title}</h2>
        <div class="nowgrid">
          <div class="inner nowc"><small>Mathematics route</small><b>${D.math.route}</b></div>
          <div class="inner nowc"><small>Subject direction</small><b>${esc(D.electives.subjects.join(' · '))}</b></div>
          <div class="inner nowc"><small>Key strengths</small><b>${esc((D.traits||[]).filter(t=>t.level==='strong').slice(0,3).map(t=>t.name).join(' · ')||'Still taking shape')}</b></div>
        </div><a class="btn btn-purple" href="#/dna/stage?k=${L.key}">Open ${L.title} ${ARROW}</a></section>` : '';
    return `<div class="dnahead"><div><h1 class="greet" style="font-size:clamp(2.2rem,4vw,3.2rem)">${I('dna')} My Pathway DNA</h1><p class="greet-sub">A guide built around you.</p></div>${helix('headhelix')}<div class="top-actions">${themeBtn()}${meButton(u,initials,planTxt)}</div></div>
      <div class="glass infocard2">${I('info')}<div><p>We’ve looked at your answers from Pathway Assessment 1, Pathway Assessment 2 and your Grade 8 results to better understand your strengths, interests and possible subject directions.</p><p>Your Pathway DNA is a guide, not a decision. You can explore, change your mind and discover new interests as you grow.</p></div></div>
      ${now}
      <section class="dnajourney"><h2>Your Pathway DNA journey</h2><p class="sub">As you add your Grade 9 results, we’ll revisit your Pathway DNA so that it continues to reflect your journey.</p>
        <ol class="dstages">${DNA_STAGE_DEFS.map(item).join('')}</ol></section>
      <p class="philo">${I('star')} Pathway doesn’t decide your future. It helps you understand your options. <b>Your Pathway DNA grows as you grow.</b></p>`;
  });
}
dnaOverview.after = () => { if(document.querySelector('.schip.pulse')) setTimeout(()=>{ if(location.hash.startsWith('#/dna') && !location.hash.includes('stage')) render(); }, 3000); };

/* ---------- a single stage ---------- */
function dnaStagePage(){
  const u=me(), key=(new URLSearchParams(location.hash.split('?')[1]||'')).get('k')||'initial', def=DNA_STAGE_DEFS.find(x=>x.key===key);
  if(!def) return focusTop('My Pathway DNA','Back','#/dna') + lockCard('We couldn’t find that Pathway DNA stage.','',`<a class="btn btn-purple" href="#/dna">My Pathway DNA ${ARROW}</a>`);
  const st=stageState(u,key), top=focusTop('My Pathway DNA','Back','#/dna');
  if(st==='waiting') return top + `<div class="focus-wrap"><div class="glass qcard lockstage">${lockArt()}<h1>${def.title}</h1><span class="schip mute">Pathway DNA not yet available</span><p class="qhint">Your Initial Pathway DNA will become available once you’ve completed Pathway Assessment 1, Pathway Assessment 2 and confirmed your Grade 8 results.</p><a class="btn btn-purple" href="#/my-assessment">Go to My Pathway Assessment ${ARROW}</a>${includesList(def)}</div></div>`;
  if(st==='locked') return top + `<div class="focus-wrap"><div class="glass qcard lockstage">${lockArt()}<h1>${def.title}</h1><span class="schip mute">Pathway DNA not yet available</span><p class="qhint">Your Term ${def.term} Pathway DNA will become available once you’ve uploaded and confirmed your Grade 9 Term ${def.term} results. Term ${def.term} ends on ${fmtShort(termOf(def.term).e)}.</p><a class="btn btn-purple" href="#/results">Go to My Results ${ARROW}</a>${includesList(def)}
      <div class="infonote inner">${I('info')}<span>Each Pathway DNA stage is based on your approved results, which are locked once submitted. This helps us give you a clear and consistent analysis.</span></div></div></div>`;
  if(st==='processing'){ const s=stagesOf(u)[key], frac=Math.min(1,(Date.now()-s.requestedAt)/(s.readyAt-s.requestedAt));
    const steps=['Reading your results','Analysing your assessment responses','Identifying your strengths and patterns','Building your recommendations','Finalising your Pathway DNA'], on=Math.min(steps.length-1,Math.floor(frac*steps.length));
    return top + `<div class="focus-wrap"><div class="glass dnabuild">
      <div class="dnapulse">${helix()}</div>
      <h1>Your Pathway DNA is taking shape…</h1>
      <h2 class="gettoknow">${key==='initial'?'We’re getting to know you.':'We’re getting to know you a little better.'}</h2>
      <p class="buildp">${key==='initial'?'Pathway is carefully looking at your assessment responses and academic results to build your personalised Pathway DNA.':'We’re carefully looking at your latest information to update your Pathway DNA.'}</p>
      <p class="buildp">${key==='initial'?'This may take a little time because we want to give you a thoughtful analysis rather than a quick generic result.':'We want to give you a thoughtful analysis based on your individual responses and results, rather than a quick generic answer.'}</p>
      <ol class="stages2">${steps.map((t,i)=>`<li class="${i<on?'ok':i===on?'now':''}"><span class="sdot">${i<on?I('check'):''}</span>${t}</li>`).join('')}</ol>
      <div class="infonote inner" style="margin-top:22px;text-align:left">${I('info')}<span>You can leave this page and come back later — nothing needs to be restarted. Your ${def.title} will open here as soon as it’s ready.</span></div>
    </div></div>`; }
  return top + stageReady(u, def, stagesOf(u)[key]);
}
dnaStagePage.after = () => {
  const u=me(), key=(new URLSearchParams(location.hash.split('?')[1]||'')).get('k')||'initial', s=stagesOf(u)[key];
  if(s && s.status==='processing'){ clearTimeout(window.__dnaPoll); window.__dnaPoll=setTimeout(()=>{ if(location.hash.includes('/dna/stage')) render(); }, 1500); return; }
  if(s && s.status==='ready' && !s.viewed){ s.viewed=Date.now(); save(); }
  document.querySelectorAll('.dsec>button').forEach(b=>b.addEventListener('click',()=>{ const sec=b.parentElement, open=!sec.classList.contains('open');
    document.querySelectorAll('.dsec').forEach(x=>{ x.classList.remove('open'); x.querySelector(':scope>button').setAttribute('aria-expanded','false'); x.querySelector(':scope>button .pm').innerHTML=I('plus'); });
    if(open){ sec.classList.add('open'); b.setAttribute('aria-expanded','true'); b.querySelector('.pm').innerHTML=I('minus'); sec.scrollIntoView({behavior:'smooth',block:'start'}); } }));
  document.querySelectorAll('[data-open]').forEach(c=>c.addEventListener('click',()=>{ const t=document.getElementById(c.dataset.open); if(t && !t.classList.contains('open')) t.querySelector(':scope>button').click(); else t?.scrollIntoView({behavior:'smooth'}); }));
  document.querySelectorAll('.why2>button').forEach(b=>b.addEventListener('click',()=>{ const w=b.parentElement, o=!w.classList.contains('open'); w.classList.toggle('open',o); b.setAttribute('aria-expanded',o); b.querySelector('.pm').innerHTML=I(o?'minus':'plus'); }));
};
const lockArt = () => `<div class="lockart"><span>${I('lock')}</span></div>`;
const includesList = def => `<div class="includes inner"><b>What this will include</b><ul>${def.uses.map(x=>`<li>${I('check')}${x}</li>`).join('')}</ul></div>`;
const dsec = (id,num,title,icon,body) => `<section class="glass dsec" id="${id}"><button aria-expanded="false"><span class="pub-ic">${I(icon)}</span><span class="dsh"><small>${num}</small>${title}</span><span class="pm">${I('plus')}</span></button><div class="dsb">${body}</div></section>`;
const why2 = (title,icon,body) => `<div class="why2 inner"><button aria-expanded="false"><span class="wi">${I(icon)}</span>${title}<span class="pm">${I('plus')}</span></button><div class="w2b">${body}</div></div>`;

function mathEvidence(D){
  const m=D.math, parts=[];
  parts.push(`<h4>Your assessment responses</h4><p>In Pathway Assessment 1, we looked at things such as problem solving, patterns, reasoning and working with numbers. ${m.strongTags.length?`You showed stronger responses in ${esc(joinWords(m.strongTags.map(t=>A1_TAG_WORDS[t])))}.`:'Your responses were fairly even across these areas, without one standing out yet.'}${m.handledHard?' You also held up well on the longer, more challenging questions.':''}${m.growTags.length?` Areas still developing include ${esc(joinWords(m.growTags.map(t=>A1_TAG_WORDS[t])))}.`:''}</p>`);
  if(m.school){ const g8=m.school.g8, same=g8.label===m.school.from;
    parts.push(`<h4>Your results</h4><p>${same?`You achieved Level ${m.school.lvl} in Mathematics in Grade 8.`:`You achieved Level ${level(g8.pct)} in Mathematics in Grade 8, and Level ${m.school.lvl} in your ${esc(m.school.from)} results${m.school.trend>0?' — an improvement':m.school.trend<0?' — a little lower than before':''}.`}</p>`); }
  parts.push(`<h4>What this means</h4><p>${{agree:'Your assessment responses and your results point in a similar direction.',differ:'Your assessment responses and your results point in slightly different directions, so Pathway will keep watching this as your Grade 9 results come in.'}[m.agreement]||''} Together, they show why ${m.route} currently has a stronger alignment with your Pathway.${m.closeSecond?` Your evidence was also quite close to ${m.closeSecond} — worth discussing with your teacher.`:''}</p>`);
  return parts.join('');
}
function electiveEvidence(D, d){
  const parts=[], ev=d.areas.map(a=>({a, sk:D.areaSkills?.[a.id]||{shown:[],grow:[]}}));
  const shown=[...new Set(ev.flatMap(x=>x.sk.shown))].slice(0,3);
  parts.push(`<h4>Your assessment responses</h4><p>${shown.length?`In the Pathway Assessment 2 questions connected to ${esc(joinWords([...new Set(d.areas.map(a=>AREA_SUBJECT_NAME[a.id]))]))}, you showed strength in ${esc(joinWords(shown))}.`:`This subject’s connected questions in Pathway Assessment 2 are still a developing area for you, but it fits well with the other subjects in this direction.`}</p>`);
  if(['Engineering Graphics and Design','Civil, Electrical or Mechanical Technology'].includes(d.subject)) parts.push('<p>Your work with shapes and space in Pathway Assessment 1 also counts here.</p>');
  if(d.subject==='Accounting') parts.push('<p>Your everyday money calculations in Pathway Assessment 1 also count here.</p>');
  if(['Information Technology','Physical Sciences'].includes(d.subject) && D.math.strongTags.some(t=>['logical','abstract','patterns','method'].includes(t))) parts.push('<p>Your logical, step-by-step thinking in Pathway Assessment 1 also counts here.</p>');
  const res=[...new Map(d.areas.filter(a=>a.latest).map(a=>[a.schoolKey,a])).values()];
  if(res.length) parts.push(`<h4>Your results</h4><p>${res.map(a=>`You achieved Level ${level(a.latest.pct)} in ${esc(a.schoolName)} (${esc(a.latest.label)}).`).join(' ')}</p>`);
  parts.push(`<h4>What this means</h4><p>These patterns are some of the reasons ${esc(d.subject)} currently aligns with your Pathway.</p>`);
  return parts.join('');
}
function stageReady(u, def, S){
  const D=S.dna, e=D.electives, fam=D.career.family?familyOf(D.career.family):null, AP=D.academicPicture||{};
  const tiles = `<div class="stiles"><div class="stile maths"><span>${I('grid')}</span><b>${D.math.route}</b><small>Mathematics route</small></div>${e.subjects.map(s=>`<div class="stile"><span>${I(SUBJ_ICON(s))}</span><b>${esc(s)}</b></div>`).join('')}</div>`;
  const traits = D.traits||[], strong=traits.filter(t=>t.level==='strong'||t.level==='good').slice(0,4);
  const bar = t => { const [lab,cls]=TRAIT_LABEL[t.level]; return `<div class="trow"><span class="tic">${I(t.icon)}</span><b>${esc(t.name)}</b><span class="tbar ${cls}"><i style="width:${Math.max(12,Math.round(t.score))}%"></i></span><span class="tlab ${cls}">${lab}</span></div>`; };
  const keySubj = (AP.relevantKeys||['math']).filter(k=>D.results[k]);
  const trend = r => r.points.length<2 ? '' : r.trend>0 ? `<span class="tr up">${I('trend')}</span>` : r.trend<0 ? `<span class="tr down">${I('down')}</span>` : '<span class="tr flat">—</span>';
  const subjRow = k => { const r=D.results[k], l=level(r.latest.pct); return `<div class="srow2"><b>${G8_NAME[k]}</b><span class="tbar ${l>=5?'ok':l>=4?'blue':'warn'}"><i style="width:${Math.round(l/7*100)}%"></i></span><span class="lv">Level ${l}</span>${trend(r)}</div>`; };
  const careerSec = D.career.status==='yes' ? `
      <div class="told"><span class="pub-ic">${I('target')}</span><div><small>Your career interest</small><p>You told us you’d like to explore <b>${esc(D.career.name)}</b>.</p></div></div>
      <div class="infonote inner">${I('info')}<span>Your goal and your Pathway direction don’t have to be exactly the same. We’re using both your interests and your responses to help you explore what may suit you.</span></div>
      <h4>What you may need to consider</h4>
      ${fam?`<div class="tags">${fam.subjects.map(x=>`<span class="tag gold">${esc(x)}</span>`).join('')}</div><p>${esc(MATHS_NEED[fam.maths])} ${esc(fam.needs)}</p>`:'<p>Pathway doesn’t have this career in its list yet, so it can’t show the subjects commonly associated with it. Your Life Orientation teacher or school counsellor can help you look these up.</p>'}
      <p class="hint">${I('info')} Requirements vary between universities, colleges and programmes, and they can change. Always check the specific institution’s current requirements.</p>
      ${D.career.aligned.length?`<h4>Where you’re aligned</h4><ul class="plist">${D.career.aligned.map(x=>`<li>${I('check')}<span>${esc(x)}</span></li>`).join('')}</ul>`:''}
      ${D.career.grow.length?`<h4>Areas to keep building</h4><ul class="plist grow">${D.career.grow.map(x=>`<li>${I('trend')}<span>${esc(x)}</span></li>`).join('')}</ul>`:''}`
    : `<div class="told"><span class="pub-ic">${I('compass')}</span><div><small>Your career interest</small><h3>You’re still exploring</h3><p>You told us that you don’t have a specific career in mind yet — and that’s completely okay. Grade 9 is a good time to explore your interests and discover what suits you.</p></div></div>`;
  const enjoy = D.interests.topSignals.length ? `<h4>What you enjoy</h4><div class="tags">${D.interests.topSignals.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';
  const words = D.interests.words.AY10 ? `<h4>In your own words</h4><p class="quote">${esc(D.interests.words.AY10)}</p>` : '';
  return `<div class="dna-wrap">
    <section class="glass stagehead">
      <div><div class="shtitle">${I('dna')}<h1>${def.title}</h1><span class="schip ok">${I('check')} Completed</span></div>
        <p class="gen">Based on: ${esc(def.uses.join(' + '))}</p></div>${helix('stagehelix')}
    </section>
    ${D.changes?`<section class="glass changes"><div class="kicker">Since your last Pathway DNA</div><ul class="plist">${D.changes.map(c=>`<li>${I('refresh')}<span>${esc(c)}</span></li>`).join('')}</ul></section>`:''}
    <div class="sumgrid">
      <button class="glass sumc wide" data-open="sec4"><div class="sumh">${I('compass')}<b>Your current subject direction</b>${I('arrow')}</div>${tiles}</button>
      <button class="glass sumc wide" data-open="sec3"><div class="sumh">${I('star')}<b>Your key strengths</b>${I('arrow')}</div><div class="kstr">${strong.map(t=>`<div class="kst"><span>${I(t.icon)}</span><b>${esc(t.name)}</b><span class="tbar ${TRAIT_LABEL[t.level][1]}"><i style="width:${Math.max(12,Math.round(t.score))}%"></i></span></div>`).join('')||'<p class="hint">Your strengths are still taking shape.</p>'}</div></button>
      <button class="glass sumc" data-open="sec6"><div class="sumh">${I('chart')}<b>Your academic progress</b>${I('arrow')}</div><p>Your ${esc(AP.latestSet||'results')} results give us a picture of where you are now and help us understand your subject direction.</p></button>
      <button class="glass sumc" data-open="sec6"><div class="sumh">${I('target')}<b>What to focus on</b>${I('arrow')}</div><p>${AP.focus?.length?`Simple areas to focus on — ${esc(joinWords(AP.focus.map(f=>f.name)))} — that could strengthen your results and keep more options open.`:'Your key subjects are in a good place — keep building on them.'}</p></button>
    </div>
    <div class="glass remember">${I('star')}<span><b>Remember:</b> your Pathway DNA is not a prediction of your future. It is a guide based on the information you’ve shared with us so far. ${GUIDE_TEXT.split('. ').slice(1).join('. ')}</span></div>

    ${dsec('sec1','1','What you told us','target', careerSec + enjoy + words)}
    ${dsec('sec2','2','A note about your subjects','book', `<p class="lead">Some subjects weren’t included when we looked at your possible subject direction.</p>
      <div class="excl inner"><b>${I('book')} Home Language &amp; First Additional Language</b><p>We didn’t use these subjects to decide your subject direction because we expect you to continue with the language choices already shown on your Grade 8 results.</p></div>
      <div class="excl inner"><b>${I('heart')} Life Orientation</b><p>Life Orientation is compulsory, so it isn’t used to decide which elective subjects may suit you.</p></div>
      <div class="excl inner"><b>${I('grid')} Mathematics</b><p>Mathematics was explored separately in Pathway Assessment 1 because we wanted to understand which Mathematics route may currently suit you.</p></div>`)}
    ${dsec('sec3','3','What Pathway discovered','search', `<p class="lead">Based on your assessment responses and your results, we noticed some key patterns.</p><div class="traits">${traits.map(bar).join('')}</div><div class="infonote inner">${I('info')}<span>These patterns are based on your own assessment responses and results, compared with each other — not with other learners.</span></div>`)}
    ${dsec('sec4','4','Your subject direction','compass', `<p class="lead">These subjects currently show the strongest alignment with the information you’ve shared with Pathway.</p>${tiles}
      <p style="margin-top:16px"><b>${esc(e.name)}.</b> ${esc(e.why)}</p>
      ${e.maths==='Mathematics'&&D.math.route!=='Mathematics'?`<p class="warnnote">${I('info')}<span>This direction is usually taken with Mathematics, while your mathematics evidence currently leans towards ${D.math.route}. It’s worth talking this through with your teacher — your Grade 9 results can change this picture.</span></p>`:''}
      ${e.alt?`<p class="also">${I('compass')}<span>Also worth exploring: <b>${esc(e.alt.name)}</b> — ${esc(joinWords(e.alt.subjects))}.</span></p>`:''}
      <p class="hint" style="margin-top:12px">Check which of these subjects your school offers.</p>`)}
    ${dsec('sec5','5','Why we suggested this','bulb', why2(`Why ${D.math.route}?`,'grid',mathEvidence(D)) + e.detail.map(d=>why2(`Why ${esc(d.subject)}?`, SUBJ_ICON(d.subject), electiveEvidence(D,d))).join('') + why2('Why these subjects together?','star',`<p>${esc(e.why)}</p><p>They connect with the strengths you’ve shown and can keep several future study and career options open.</p>`))}
    ${dsec('sec6','6','Your academic progress','chart', `
      <div class="aggr"><div class="ring" style="--p:${AP.aggregate||0}"><b>${AP.aggregate!=null?AP.aggregate+'%':'—'}</b><small>Current aggregate</small></div><div><h4>Overall academic picture</h4><p>Your aggregate gives you a broader picture of how you’re performing across your subjects. It’s the average of all your subjects in your ${esc(AP.latestSet||'latest')} results.</p></div></div>
      <h4>Key subjects</h4><div class="srows">${keySubj.map(subjRow).join('')}</div>
      ${D.results.math?`<p>You’re currently showing ${FOUNDATION(level(D.results.math.latest.pct))} in Mathematics.</p>`:''}
      <h4>What to focus on</h4>${AP.focus?.length?AP.focus.map(f=>`<div class="focusc inner"><span class="schip warn">Focus area</span><b>${esc(f.name)} · Level ${f.lvl}</b><p>${esc(f.reason)}</p></div>`).join(''):'<p>Your key subjects are all at or above your overall average — keep building on them.</p>'}
      <div class="grow2 inner">${I('trend')}<div><b>Where improving could make the biggest difference</b><p>${AP.focus?.length?`Improving ${esc(joinWords(AP.focus.map(f=>f.name)))} could strengthen your overall performance and help keep more subject options open.`:'Keeping your key subjects steady will keep your options open.'}</p></div></div>
      <p class="hint" style="margin-top:10px">${I('lock')} These results are confirmed and locked, so this stage always shows the same snapshot.</p>`)}

    <p class="philo">${I('star')} Pathway doesn’t decide your future. It helps you understand your options. <b>Your Pathway DNA grows as you grow.</b></p>
    <div class="actions" style="justify-content:center"><a class="btn btn-ghost" href="#/dna">${I('back')} Your Pathway DNA journey</a>${gradeOf(u)==='9'&&def.key!=='t4'?`<a class="btn btn-purple" href="#/results">My Results ${ARROW}</a>`:''}</div>
  </div>`;
}

/* ============================================================
   SEE MY ANSWERS — the learner's own answers only (never marks, correctness, keys or scores)
   ============================================================ */
function answerText(q, a, st){
  const none = '<span class="noans">No answer given</span>';
  if(a==null || (typeof a==='string' && !a.trim()) || (Array.isArray(a)&&!a.length)) { if(q.type==='text') return '<span class="noans">Left blank</span>'; return none; }
  switch(q.type){
    case 'mc': return q.opts[a]!=null ? q.opts[a] : none;
    case 'short': return mathifyTyped(a)+(q.unit&&!String(a).includes(q.unit)?` <span class="unitmute">${q.unit}</span>`:'');
    case 'working': case 'explain': { const w=st.work?.[q.id]; return `${mathifyTyped(a)}${q.unit?` <span class="unitmute">${q.unit}</span>`:''}${w?`<div class="mywork"><small>${q.workLabel||(q.type==='working'?'Your working':'Your explanation')}</small><p>${esc(w).replace(/\n/g,'<br>')}</p></div>`:''}`; }
    case 'open': case 'rubric': case 'text': return `<p class="mytext">${esc(a).replace(/\n/g,'<br>')}</p>`;
    case 'order': return `<ol class="myorder">${a.map(j=>`<li>${q.items[j]}</li>`).join('')}</ol>`;
    case 'match': return `<ul class="mymatch">${q.pairs.map((p,k)=>`<li><span>${p[0]}</span>${I('arrow')}<b>${a[k]?esc(a[k]):'<span class="noans">—</span>'}</b></li>`).join('')}</ul>`;
    case 'pref': return q.opts[a] ? esc(q.opts[a][0]) : none;
    case 'multi': return a.map(i=>esc(q.opts[i]?.[0])).join(', ');
    case 'career': return a.status==='yes' ? `Yes, I have an idea — <b>${esc(a.career||'')}</b>` : 'I’m not sure yet — I’m open to exploring';
  }
  return esc(String(a));
}
function answersPage(n){
  const u=me(), p=u.progress['a'+n];
  if(!p.done) return focusTop(`${A_NAME(n)} · My Answers`,'Back') + lockCard('Your answers aren’t available yet.',`Your answers will become available after you complete ${A_NAME(n)}.`,`<a class="btn btn-purple" href="#/assessment/${n}">Go to ${A_NAME(n)} ${ARROW}</a>`);
  const secs = sectionsOf(n).map((s,si)=>{ const st=p.sections[s.id]||{ans:{}};
    return `<details class="glass ansec xpand"${si===0?' open':''}><summary><span>${secLabel(n,s)} <small class="qcnt">${s.qs.length} questions</small></span>${I('down')}</summary><div class="ansbody">${s.qs.map((q,i)=>`<div class="ansq inner"><div class="kicker2">Question ${i+1}</div><div class="ansqq">${q.q}</div>${q.src&&q.src!=='net'?q.src:''}${q.src==='net'?cubeNet():''}${q.ask?`<p class="ask">${q.ask}</p>`:''}<div class="myans"><small>Your answer</small><div>${answerText(q, st.ans?.[q.id], st)}</div></div></div>`).map(mathify).join('')}</div></details>`; }).join('');
  return focusTop(`${A_NAME(n)} · My Answers`,'Back','#/my-assessment') + `<div class="focus-wrap wide"><div class="ahead"><h1>My Answers</h1><p>Here is what you told Pathway in ${A_NAME(n)}. Your answers are saved exactly as you submitted them and can’t be changed.</p></div>${secs}</div>`;
}

const _render = render;
render = function(){
  _render();
  const path=(location.hash.replace(/^#/,'')||'/').split('?')[0];
  if(path==='/assessment/1') assessAfter(1);
  if(path==='/assessment/2') assessAfter(2);
};
window.removeEventListener('hashchange', _render);
window.addEventListener('hashchange', ()=>{ VIEW={}; clearInterval(TICK); TICK=null; render(); });   /* page-level view state never leaks between pages */
seedDemoAccounts().then(()=>{ migrateProgress(); save(); render(); }, render);
