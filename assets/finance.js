/* 投研底稿：可编辑数据 → 实时图表与测算 · 存本机 localStorage */
var KEY="autoclaw-fin-draft-v2";
var DEMO={
 years:["2021","2022","2023","2024","2025"],
 rows:[
  {rev:"2210.36",np:"259.61",gm:"28.84",ocf:"626.99",rd:"4.80",src:"2022年报 合并利润表 P103／P104（2021 重述后列）"},
  {rev:"1784.14",np:"75.41",gm:"11.70",ocf:"430.22",rd:"6.22",src:"2022年报 P103／P109 · 归母取 2023年报 P110（重述后）"},
  {rev:"1745.43",np:"25.47",gm:"11.50",ocf:"383.02",rd:"6.49",src:"2023年报 P109／P115 · 成本取 2024年报 P108（解释18号重述）"},
  {rev:"1983.81",np:"53.23",gm:"15.20",ocf:"477.38",rd:"6.62",src:"2024年报 合并利润表 P108／P109 · 现金流 P114"},
  {rev:"2045.90",np:"58.57",gm:"15.64",ocf:"488.25",rd:"6.76",src:"2025年报 合并利润表 P100／P101 · 现金流 P104"}
 ],
 scen:[
  {name:"保守",note:"面板价格进入下行段，参照 2022 年 −19.3% 与净利率 1.46% 的低点",g:"0",nm:"1.5",pe:"20"},
  {name:"基准",note:"取近三年营收增速均值 4.9%、归母净利率均值 2.3%",g:"5",nm:"2.5",pe:"25"},
  {name:"乐观",note:"参照 2024 年 +13.7% 的补涨年份，毛利率回到 15% 以上",g:"12",nm:"3.5",pe:"30"}
 ],
 audit:[
  {item:"2021 营业收入",mv:"2,210.36 亿<br>（2022年报 P103 重述后列）",rv:"221,035,718,012 元 · 2022年报 合并利润表 P103<br>2021年报自披露 2,193.10 亿 · P116",st:"d",res:"一致",act:"按已确认口径取重述后值；原披露数保留在 CSV「原披露数」列"},
  {item:"2022 扣非归母",mv:"−22.38 亿<br>（2023年报 P11 调整后列）",rv:"同一页双列：调整前 −22.29 亿／调整后 −22.38 亿",st:"h",res:"模型对 · 我错",act:"我第一版复算脚本抓了「调整前」列，判成 −22.29。改判以调整后为准——这一页的列名顺序是这套底稿最容易翻车的地方"},
  {item:"2022 归母同比",mv:"−70.95%（采出口径）<br>并注年报披露 −70.91%",rv:"−70.91% · 2022年报 P10 增减列，分母是 2021 年调整后 25,960,751,646",st:"m",res:"基期不同",act:"0.04pp 差在取数版本不在算术；底稿统一用重述后基期，避免两种同比混用"},
  {item:"2023 销售毛利率",mv:"11.50%<br>（按 2024年报 P108 重述成本推算）",rv:"12.55% · 2023年报 P18 直销行披露，对应成本 152,633,061,367 元",st:"m",res:"两个都对",act:"解释 18 号只重述到 2023，2021—2022 没有可比版本。不判对错，标口径断裂，趋势图分段解读"},
  {item:"五年毛利率（推算）",mv:"28.84／11.70／11.50／15.20／15.64%",rv:"年报 MD&A 直销行独立披露：28.87%（2021 P19）·11.70%（2022 P16）·12.55%（2023 P18）·15.20%（2024 P18）·15.64%（2025 P20）",st:"d",res:"一致",act:"推算值与披露值对撞，除 2021（重述基）与 2023（重述成本）外逐位相同，这条自检最硬"},
  {item:"归母 − 扣非",mv:"18.93／97.80／31.80／14.86／16.27 亿",rv:"各年报第二节「非经常性损益项目及金额」合计行，元位逐笔相等",st:"d",res:"一致",act:"勾稽通过；2025 年报另在附注明细表内部勾平（小计 − 所得税影响 − 少数股东影响）"},
  {item:"应收账款周转天数",mv:"未披露 × 5",rv:"五份 PDF 全文检索「周转天数」0 命中",st:"l",res:"一致留空",act:"没有挑一个计算约定凑数。要用这一项得先定 365／360、平均／期末、是否含应收票据与应收款项融资"},
  {item:"2023 研发投入（关联披露）",mv:"口径轮即报出「2024 年报调减 2023 对比数且未说明原因」",rv:"125.63 亿、资本化 21.00 亿（2023年报 P24）→ 113.63 亿、资本化 0.44 亿（2024年报 P24）",st:"m",res:"披露无解释",act:"本轮用利润表「研发费用」行（五年口径一致）绕开；若改用「研发投入」口径，此处必须人工裁定"},
  {item:"30 个有源数值的页码",mv:"每行都给 PDF 页码 + 表名",rv:"逐行回到所指 PDF 页面扫描金额字符串比对",st:"d",res:"30/30 命中",act:"页码一律是 PDF 物理页，与页脚印刷页不同（见第 07 节），核对时以表格名称定位"}
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
function br(s){return esc(s).replace(/&lt;br&gt;/g,"<br>");}

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
  if(!S.audit.length){aud.innerHTML='<tr><td colspan="5" style="color:var(--ink-3);font-size:12.5px">尚无记录 — 点右上「还原为提取值」回到本次运行结果，或把你实际抽查的条目填进来。</td></tr>';return;}
  var L={d:"一致",m:"有差异",w:"需处理"};
  aud.innerHTML=S.audit.map(function(a){
    return "<tr><td>"+esc(a.item)+"</td><td>"+br(a.mv)+"</td><td>"+br(a.rv)+"</td>"+
      '<td><span class="lvl '+esc(a.st)+'">'+esc(a.res||L[a.st]||'—')+"</span></td><td>"+esc(a.act)+"</td></tr>";
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
  var isReal=JSON.stringify(S)===JSON.stringify(DEMO);
  if(tag){tag.textContent=isReal?"真实提取 · 已独立复核":"已编辑（请重核出处）";tag.className="st "+(isReal?"ok":"warn");}
  if(src)src.textContent=isReal?"京东方A（000725）2021—2025 年报 · AutoClaw 提取，45 项已独立复算":"见第 03 节出处列 · 内容已被本地编辑";
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
