/* 投研底稿：可编辑数据 → 实时图表与测算 · 存本机 localStorage */
var KEY="autoclaw-fin-draft-v1";
var DEMO={
 years:["2021","2022","2023","2024","2025"],
 rows:[
  {rev:"7.4",np:"0.8",gm:"27.3",ocf:"0.6",rd:"5.8",src:"2021年报 · 合并利润表 P91"},
  {rev:"9.9",np:"1.3",gm:"28.6",ocf:"1.1",rd:"6.1",src:"2022年报 · 合并利润表 P91"},
  {rev:"13.0",np:"1.9",gm:"30.1",ocf:"1.7",rd:"6.4",src:"2023年报 · 合并利润表 P92"},
  {rev:"15.1",np:"2.4",gm:"31.0",ocf:"2.2",rd:"6.6",src:"2024年报 · 合并利润表 P93"},
  {rev:"18.6",np:"3.0",gm:"31.4",ocf:"2.8",rd:"6.8",src:"2025年报 · 合并利润表 P94"}
 ],
 scen:[
  {name:"保守",note:"行业装机增速回落、毛利率承压",g:"12",nm:"14",pe:"18"},
  {name:"基准",note:"在手订单正常交付，毛利率维持",g:"20",nm:"16",pe:"22"},
  {name:"乐观",note:"海外产能爬坡，收入结构改善",g:"28",nm:"17",pe:"26"}
 ],
 audit:[
  {item:"2023 营业收入",mv:"13.0 亿元",rv:"13.0 亿元（合并利润表 P92）",st:"d",res:"一致",act:"直接采用"},
  {item:"2024 归母净利润",mv:"2.40 亿元",rv:"2.36 亿元（主要会计数据 P8）",st:"m",res:"差异 1.7%",act:"模型误取含少数股东口径，退回重取后以合并利润表为准"},
  {item:"2022 毛利率",mv:"28.6%",rv:"28.6%（合并利润表 P91）",st:"d",res:"一致",act:"—"},
  {item:"2025 研发费用率",mv:"6.8%",rv:"年报仅披露研发费用金额，未直接披露比率",st:"w",res:"需换算",act:"按研发费用／营业收入推算，并在底稿注明为推算值"},
  {item:"2021 经营现金流净额",mv:"0.6 亿元",rv:"0.6 亿元（合并现金流量表 P95）",st:"d",res:"一致",act:"—"}
 ]
};
var EMPTY={
 years:["","","","",""],
 rows:[0,1,2,3,4].map(function(){return {rev:"",np:"",gm:"",ocf:"",rd:"",src:""};}),
 scen:[{name:"保守",note:"",g:"",nm:"",pe:""},{name:"基准",note:"",g:"",nm:"",pe:""},{name:"乐观",note:"",g:"",nm:"",pe:""}],
 audit:[]
};
var S=load();
function load(){try{var r=localStorage.getItem(KEY);if(r)return JSON.parse(r);}catch(e){}return JSON.parse(JSON.stringify(DEMO));}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function num(v){var n=parseFloat(String(v).replace(/[,，\s]/g,""));return isNaN(n)?null:n;}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

var grid=document.querySelector("#grid tbody"),val=document.querySelector("#val tbody"),aud=document.querySelector("#audit tbody");

function paintGrid(){
  if(!grid)return;
  grid.innerHTML=S.years.map(function(y,i){
    var r=S.rows[i]||{};
    return "<tr><td><input data-k=\"year\" data-i=\""+i+"\" value=\""+esc(y)+"\" style=\"font:inherit;font-family:var(--mono);width:56px;background:transparent;border:none;border-bottom:1px solid var(--rule)\"></td>"+
      ["rev","np","gm","ocf","rd"].map(function(k){
        return '<td class="num"><input data-k="'+k+'" data-i="'+i+'" value="'+esc(r[k]||"")+'" style="font:inherit;font-family:var(--mono);font-size:13px;width:64px;text-align:right;background:transparent;border:none;border-bottom:1px solid var(--rule);color:var(--ink)">';
      }).join("")+
      '<td><input data-k="src" data-i="'+i+'" value="'+esc(r.src||"")+'" placeholder="年报 · 表名 · 页码" style="font:inherit;font-size:12.5px;width:100%;min-width:170px;background:transparent;border:none;border-bottom:1px solid var(--rule);color:var(--ink-2)"></td></tr>';
  }).join("");
  [].forEach.call(grid.querySelectorAll("input"),function(el){
    el.addEventListener("input",function(){
      var i=+el.getAttribute("data-i"),k=el.getAttribute("data-k");
      if(k==="year")S.years[i]=el.value;else S.rows[i][k]=el.value;
      save();recalc();
    });
  });
}
function paintVal(){
  if(!val)return;
  val.innerHTML=S.scen.map(function(s,i){
    return '<tr><td><b>'+esc(s.name)+'</b></td>'+
      '<td><input data-s="'+i+'" data-k="note" value="'+esc(s.note)+'" placeholder="假设依据" style="font:inherit;font-size:12.5px;width:100%;min-width:190px;background:transparent;border:none;border-bottom:1px solid var(--rule);color:var(--ink-2)"></td>'+
      ["g","nm","pe"].map(function(k){
        return '<td class="num"><input data-s="'+i+'" data-k="'+k+'" value="'+esc(s[k])+'" style="font:inherit;font-family:var(--mono);font-size:13px;width:52px;text-align:right;background:transparent;border:none;border-bottom:1px solid var(--rule);color:var(--ink)">';
      }).join("")+
      '<td class="num" data-out="'+i+'">—</td></tr>';
  }).join("");
  [].forEach.call(val.querySelectorAll("input"),function(el){
    el.addEventListener("input",function(){
      S.scen[+el.getAttribute("data-s")][el.getAttribute("data-k")]=el.value;save();recalc();
    });
  });
}
function paintAud(){
  if(!aud)return;
  if(!S.audit.length){aud.innerHTML='<tr><td colspan="5" style="color:var(--ink-3);font-size:12.5px">尚无记录 — 点右上「载入示例」看结构，或把你实际抽查的条目填进来。</td></tr>';return;}
  var L={d:"一致",m:"有差异",w:"需处理"};
  aud.innerHTML=S.audit.map(function(a){
    return "<tr><td>"+esc(a.item)+"</td><td class=\"num\">"+esc(a.mv)+"</td><td>"+esc(a.rv)+"</td>"+
      '<td><span class="lvl '+esc(a.st)+'">'+(L[a.st]||esc(a.res))+"</span></td><td>"+esc(a.act)+"</td></tr>";
  }).join("");
}

/* 实时计算 */
function lastIdx(){
  for(var i=S.rows.length-1;i>=0;i--)if(num(S.rows[i].rev)!=null)return i;
  return -1;
}
function recalc(){
  var li=lastIdx(),base=li>=0?S.rows[li]:null;
  var figs=document.getElementById("figs");
  if(figs){
    var f=[];
    if(base){
      var rev=num(base.rev),np=num(base.np),ocf=num(base.ocf),gm=num(base.gm);
      var prev=li>0?num(S.rows[li-1].rev):null;
      f.push({v:(rev==null?"—":rev.toFixed(1))+"<span>亿元</span>",k:"<b>"+esc(S.years[li]||"—")+" 营业收入</b>最近有数年份"});
      if(rev!=null&&prev) f.push({v:((rev/prev-1)*100).toFixed(1)+"<span>%</span>",k:"<b>同比增速</b>较 "+esc(S.years[li-1])});
      if(np!=null&&rev!=null) f.push({v:(np/rev*100).toFixed(1)+"<span>%</span>",k:"<b>净利率</b>归母净利润／营业收入"});
      if(np!=null&&ocf!=null) f.push({v:(ocf/np).toFixed(2),k:"<b>现金流／净利</b>小于 1 需回看应收与存货"});
    }else{
      f.push({v:"—",k:"<b>尚无数据</b>在上方表格填入年份与数值后自动生成"});
    }
    figs.innerHTML=f.map(function(x){return '<div class="fig"><div class="v">'+x.v+'</div><div class="k">'+x.k+"</div></div>";}).join("");
  }
  chartA();chartB();
  var li2=lastIdx(),rev=li2>=0?num(S.rows[li2].rev):null;
  [].forEach.call(document.querySelectorAll("#val td[data-out]"),function(td){
    var s=S.scen[+td.getAttribute("data-out")],g=num(s.g),nm=num(s.nm),pe=num(s.pe);
    td.textContent=(rev==null||g==null||nm==null||pe==null)?"—":(rev*(1+g/100)*(nm/100)*pe).toFixed(1);
  });
  var tag=document.getElementById("mode-tag"),src=document.getElementById("src-mode");
  var isDemo=JSON.stringify(S)===JSON.stringify(DEMO);
  if(tag){tag.textContent=isDemo?"示例数据（虚构，待替换）":"已编辑（请核对出处）";tag.className="st "+(isDemo?"demo":"todo");}
  if(src)src.textContent=isDemo?"示例样本，待替换为真实公司":"见第 03 节出处列";
}

/* SVG 图 */
function svgWrap(inner,w,h){
  return '<svg viewBox="0 0 '+w+" "+h+'" width="100%" height="'+h+'" role="img" style="display:block;margin-top:6px;overflow:visible">'+inner+"</svg>";
}
function chartA(){
  var box=document.getElementById("chart-a");if(!box)return;
  var W=Math.max(320,box.clientWidth||640),H=190,pad=26;
  var pts=S.years.map(function(y,i){return {y:y||("第"+(i+1)+"年"),rev:num(S.rows[i].rev),np:num(S.rows[i].np)};}).filter(function(d){return d.rev!=null;});
  if(!pts.length){box.innerHTML='<p style="font-size:12.5px;color:var(--ink-3)">填入营收与净利后生成。</p>';return;}
  var max=Math.max.apply(null,pts.map(function(d){return d.rev;}))*1.15;
  var bw=Math.min(30,(W-pad*2)/pts.length/2-6),out="";
  out+='<line x1="'+pad+'" y1="'+(H-28)+'" x2="'+(W-6)+'" y2="'+(H-28)+'" stroke="var(--rule-2)"/>';
  pts.forEach(function(d,i){
    var cx=pad+((W-pad*2)/pts.length)*(i+0.5);
    var h1=(H-40)*d.rev/max,h2=d.np==null?0:(H-40)*d.np/max;
    out+='<rect x="'+(cx-bw-2)+'" y="'+(H-28-h1)+'" width="'+bw+'" height="'+h1+'" fill="var(--accent)" opacity=".85"/>';
    out+='<rect x="'+(cx+2)+'" y="'+(H-28-h2)+'" width="'+bw+'" height="'+h2+'" fill="var(--ink)" opacity=".48"/>';
    out+='<text x="'+(cx+bw/2+2)+'" y="'+(H-32-h2)+'" font-size="10" font-family="var(--mono)" fill="var(--ink-2)" text-anchor="middle">'+(d.np==null?"":d.np.toFixed(1))+"</text>";
    out+='<text x="'+(cx-bw/2-2)+'" y="'+(H-32-h1)+'" font-size="10" font-family="var(--mono)" fill="var(--ink)" text-anchor="middle">'+d.rev.toFixed(1)+"</text>";
    out+='<text x="'+cx+'" y="'+(H-12)+'" font-size="10.5" fill="var(--ink-3)" text-anchor="middle">'+esc(d.y)+"</text>";
  });
  out+='<g font-size="10.5" font-family="var(--mono)"><rect x="'+(W-150)+'" y="4" width="9" height="9" fill="var(--accent)"/><text x="'+(W-137)+'" y="12" fill="var(--ink-2)">营业收入</text><rect x="'+(W-76)+'" y="4" width="9" height="9" fill="var(--ink)" opacity=".48"/><text x="'+(W-63)+'" y="12" fill="var(--ink-2)">归母净利</text></g>';
  box.innerHTML=svgWrap(out,W,H);
}
function chartB(){
  var box=document.getElementById("chart-b");if(!box)return;
  var W=Math.max(320,box.clientWidth||640),H=170,pad=26;
  var pts=S.years.map(function(y,i){return {y:y||("第"+(i+1)+"年"),gm:num(S.rows[i].gm),rd:num(S.rows[i].rd)};})
    .filter(function(d){return d.gm!=null||d.rd!=null;});
  if(!pts.length){box.innerHTML='<p style="font-size:12.5px;color:var(--ink-3)">填入毛利率或研发费用率后生成。</p>';return;}
  var vals=[];pts.forEach(function(d){if(d.gm!=null)vals.push(d.gm);if(d.rd!=null)vals.push(d.rd);});
  var max=Math.max.apply(null,vals)||10;
  max=Math.ceil(max/10)*10;
  var ticks=[max,max*.75,max*.5,max*.25].map(function(v){return Math.round(v*10)/10;});
  var x0=pad+20,step=(W-pad-x0)/Math.max(1,pts.length-1);
  var out='<line x1="'+x0+'" y1="'+(H-26)+'" x2="'+(W-6)+'" y2="'+(H-26)+'" stroke="var(--rule-2)"/>';
  ticks.forEach(function(g){
    var yy=(H-26)-(H-46)*g/max;
    out+='<line x1="'+x0+'" y1="'+yy+'" x2="'+(W-6)+'" y2="'+yy+'" stroke="var(--rule)" stroke-dasharray="2 4"/><text x="'+(pad+8)+'" y="'+(yy+3)+'" font-size="9.5" fill="var(--ink-3)" text-anchor="end">'+g+"</text>";
  });
  var line=function(key,color){
    var d="",dots="";
    pts.forEach(function(p,i){
      var v=p[key];if(v==null)return;
      var x=x0+step*i,y=(H-26)-(H-46)*Math.min(v,max)/max;
      d+=(d?" L":"M")+x+" "+y;
      dots+='<circle cx="'+x+'" cy="'+y+'" r="3" fill="'+color+'"/><text x="'+x+'" y="'+(y-8)+'" font-size="10" font-family="var(--mono)" fill="'+color+'" text-anchor="middle">'+v.toFixed(1)+"</text>";
    });
    return (d?'<path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="1.6"/>':"")+dots;
  };
  out+=line("gm","var(--accent)")+line("rd","#8a7a52");
  pts.forEach(function(p,i){
    out+='<text x="'+(x0+step*i)+'" y="'+(H-9)+'" font-size="10.5" fill="var(--ink-3)" text-anchor="middle">'+esc(p.y)+"</text>";
  });
  out+='<g font-size="10.5"><rect x="'+(W-160)+'" y="2" width="9" height="9" fill="var(--accent)"/><text x="'+(W-147)+'" y="10" fill="var(--ink-2)">毛利率</text><rect x="'+(W-86)+'" y="2" width="9" height="9" fill="#8a7a52"/><text x="'+(W-73)+'" y="10" fill="var(--ink-2)">研发费用率</text></g>';
  box.innerHTML=svgWrap(out,W,H);
}

if(grid){
  paintGrid();paintVal();paintAud();recalc();
  addEventListener("resize",function(){clearTimeout(window.__rt);window.__rt=setTimeout(recalc,180);});
  var bd=document.getElementById("btn-demo"),bc=document.getElementById("btn-clear");
  if(bd)bd.addEventListener("click",function(){S=JSON.parse(JSON.stringify(DEMO));save();paintGrid();paintVal();paintAud();recalc();});
  if(bc)bc.addEventListener("click",function(){S=JSON.parse(JSON.stringify(EMPTY));save();paintGrid();paintVal();paintAud();recalc();});
}
