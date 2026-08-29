// constants
const PHI = (1 + Math.sqrt(5)) / 2;
const defaultQI = 0.65, defaultIQQ = 0.35;
const AXES = [
  {name:'conceptual', keywords:['theory','idea','concept','axiom']},
  {name:'technical', keywords:['code','implementation','api','function']},
  {name:'repro', keywords:['example','reproduce','dataset','script','seed']},
  {name:'usability', keywords:['guide','readme','usage','install']},
  {name:'privacy', keywords:['email','personal','pii','secret','key']},
  {name:'performance', keywords:['perf','speed','optimiz']},
  {name:'tests', keywords:['test','unit','assert','expected']},
  {name:'ethics', keywords:['ethic','bias','impact']},
  {name:'integration', keywords:['integrate','api','plugin','module']}
];

function evalRespo(confArr, QI=defaultQI, IQQ=defaultIQQ) {
  const base = confArr.reduce((a,b)=>a+b,0)/confArr.length;
  const maxc = Math.max(...confArr), minc = Math.min(...confArr);
  const variance = maxc - minc;
  const combined = Math.max(0, Math.min(1, QI*base + (1 - IQQ)*maxc));
  const arg = combined;
  const xarg = variance;
  const arg3te = +(combined * (1 - xarg)).toFixed(6);
  return { base, maxc, minc, variance, arg, xarg, arg3te };
}

function axisCoverage(text){
  const t = (text||'').toLowerCase();
  let matched=0;
  for(const a of AXES){
    for(const k of a.keywords){
      if(t.includes(k)){ matched++; break; }
    }
  }
  return matched / AXES.length; // 0..1
}

// example per-respo ranking
function scoreRespo(respo){
  const confs = respo.confs || [0.5,0.5,0.5];
  const e = evalRespo(confs, respo.QI || defaultQI, respo.IQQ || defaultIQQ);
  const axis = axisCoverage(respo.text||'');
  const geom = { theta: 2*Math.PI*e.arg3te, rho: 50 + 150*axis }; // cx/canvas use separately
  const final = 0.6*e.arg3te + 0.4*axis;
  return Object.assign({}, respo, e, { axis, geom, final });
}
// Engine config
const FRAME_MS = 16;           // target frame interval (~60fps)
const ANIM_SPEED = 0.8;        // orbit speed factor
const JUGGLE_MS = 1800;        // juggle interval
const PLOT_LIMIT = 200;        // max plotted points
const DEBOUNCE_MS = 50;
// schnitt.js
const BATCH_SIZE = 9;         // process 9 respos per animation tick
let processIndex = 0;

function processChunk(items, processFn, onDone){
  const n = items.length;
  const end = Math.min(processIndex + BATCH_SIZE, n);
  for(let i = processIndex; i < end; i++){
    processFn(items[i], i);
  }
  processIndex = end >= n ? 0 : end;
  if(processIndex === 0 && typeof onDone === 'function') onDone();
}

// call from RAF loop or setInterval
function tick(){
  // update animation, visuals (fast)
  // then process scoring chunk
  processChunk(allItems, (it, idx) => {
    // scoreRespo(it, QI, IQQ) — keep lightweight
  }, ()=> {
    // optional: once full pass done, update top-list / multiscale
  });
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
// adaptive: if frameCost > FRAME_MS, reduce batch on the fly
let currentBatch = BATCH_SIZE;
function tickAdaptive(){
  const start = performance.now();
  // do animation & processing for currentBatch
  processChunkWithSize(currentBatch);
  const frameTime = performance.now() - start;
  if(frameTime > FRAME_MS) currentBatch = Math.max(1, Math.floor(currentBatch * 0.7)); // reduce
  else if(frameTime < FRAME_MS * 0.6) currentBatch = Math.min(64, Math.ceil(currentBatch * 1.25)); // increase
  requestAnimationFrame(tickAdaptive);
}
