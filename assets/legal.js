/* 条款数据（自建模拟样本）+ 客户端逐字差异计算 */
var CLAUSES=[
{no:"2.1",t:"投前估值与增资额",type:"数值修改",lv:"h",
 imp:"投前由 1.2 亿降到 1.05 亿（−12.5%），投后 1.8 亿→1.65 亿。原文写甲方投后持股 36.42%，按 6,000÷16,500 复算实为 36.36%，创始股东 66.67%→63.64%",
 act:"接受：10-09 邮件里这次降价换来董事会 2 席，V3 第 7.1 条已兑现；转增调整一并接受，但要求把 36.42% 改写成可复算的公式",
 v:["本次增资以投前估值人民币1.2亿元为基础，甲方以现金6,000万元认购公司新增注册资本，对应投后持股比例为33.33%。",
    "本次增资以投前估值人民币1.05亿元为基础，甲方以现金6,000万元认购公司新增注册资本，对应投后持股比例为36.42%。",
    "本次增资以投前估值人民币1.05亿元为基础，甲方以现金6,000万元认购公司新增注册资本，对应投后持股比例为36.42%；如公司在交割日前完成资本公积转增，甲方持股比例按转增后注册资本同比例调整。"]},
{no:"3.1",t:"交割先决条件（关键员工）",type:"表述收紧",lv:"m",
 imp:"留任要求由「另行协商」变为附录 B 名单的 80%，V3 进一步要求 5 人全部签署，任一离职即构成甲方拒交理由",
 act:"接受名单制，但把「全部签署」改为「不少于 4 名」，拒交权限定为 CTO 一人",
 v:["交割前，公司应完成核心技术人员留任安排，具体名单由双方另行协商确定。",
    "交割前，公司应与附录B所列关键员工签署留任协议及竞业限制协议，且签署比例不低于附录B名单人数的80%。",
    "交割前，公司应与附录B所列全部5名关键员工（含CTO及3名核心研发）签署留任协议及竞业限制协议；上述人员任一人离职，构成甲方拒绝交割的正当理由。"]},
{no:"5.2",t:"业绩承诺与补偿",type:"指标口径变更",lv:"h",
 imp:"承诺净利润由 3,000 万元提至 3,600 万元且补偿改为差额两倍，V3 回到收入加净利双指标并设 20% 补偿上限",
 act:"保留 V3 的补偿上限，删除「孰低口径」，改按实际完成率线性补偿",
 v:["公司承诺2027年度经审计净利润不低于人民币3,000万元；未达承诺的，创始股东按差额比例以股权补偿。",
    "公司承诺2027年度经审计净利润不低于人民币3,600万元，2028年度不低于人民币5,000万元；未达承诺的，创始股东按差额的两倍对应估值进行股权补偿。",
    "公司承诺2027年度经审计营业收入不低于人民币1.1亿元且净利润不低于人民币3,000万元；未达标的按实际值与承诺值孰低口径计算补偿，补偿上限为创始股东所持公司股权的20%。"]},
{no:"6.3",t:"反稀释",type:"机制变更",lv:"d",
 imp:"由完全棘轮改为广义加权平均，后续折价融资时创始方稀释压力明显下降；期权池排除条款同样对我方有利",
 act:"接受，无需再谈",
 v:["公司后续融资价格低于本轮的，甲方有权要求创始股东无偿转让股权，使其持股成本调整至新一轮价格（完全棘轮）。",
    "公司后续融资价格低于本轮的，甲方有权要求创始股东无偿转让股权，使其持股成本调整至新一轮价格（完全棘轮）。",
    "公司后续融资价格低于本轮的，按广义加权平均法调整甲方持股成本；员工期权池的行权价格低于本轮的，不适用反稀释调整。"]},
{no:"7.1",t:"董事会构成与保留事项",type:"新增权利",lv:"h",
 imp:"甲方席位由 1 名增至 2 名（共 5 席），并新增 300 万元以上预算外支出的书面同意权，日常经营决策权实质外移",
 act:"席位可让，否决门槛提至 800 万元且限定为非经营性支出",
 v:["公司董事会由3名董事组成，甲方委派1名董事。",
    "公司董事会由3名董事组成，甲方委派1名董事，并有权委派1名无表决权的董事会观察员。",
    "公司董事会由5名董事组成，甲方委派2名董事；公司单项超出年度预算的支出超过人民币300万元的，须经甲方委派董事书面同意。"]},
{no:"8.2",t:"清算优先权",type:"倍数与结构",lv:"h",
 imp:"V2 出现 1.2 倍加参与分配的双重不利结构；V3 回调至 1.1 倍不参与，按 6,000 万元实缴测算，优先受偿额由 6,000 万元变为 6,600 万元",
 act:"继续争取 1.0 倍不参与；若甲方坚持 1.1 倍，要求同步删除第 18.4 条领售权",
 v:["公司清算时，甲方有权按其实缴出资额的1.0倍优先受偿，且不参与剩余财产分配。",
    "公司清算时，甲方有权按其实缴出资额的1.2倍优先受偿，并有权按持股比例参与剩余财产分配。",
    "公司清算时，甲方有权按其实缴出资额的1.1倍优先受偿，不参与剩余财产分配。"]},
{no:"9.4",t:"创始人股份锁定",type:"期限修改",lv:"m",
 imp:"锁定期由 36 个月改为 48 个月，V3 两案并陈；与期权四年成熟期错配会放大创始人中途离场的个人风险",
 act:"以 36 个月加分期解锁（每年 25%）作为折中方案",
 v:["创始人所持公司股权自交割日起36个月内不得转让。",
    "创始人所持公司股权自交割日起48个月内不得转让；向创始人直系亲属设立的家族信托转让的除外。",
    "创始人所持公司股权自交割日起36个月／48个月（两案并陈，待第四轮商定）内不得转让。"]},
{no:"10.2",t:"知情权与报告频次",type:"表述修改",lv:"l",
 imp:"月报改为季报，公司财务口径整理工作量下降；年报与预算执行说明仍需按期提供",
 act:"已达成，无进一步动作",
 v:["甲方有权按月获取公司未经审计的财务报表，并按季度获取经营报告。",
    "甲方有权按月获取公司财务报表、按季度获取经营报告及年度预算执行情况说明。",
    "甲方有权按季度获取公司财务报表，按年度获取经审计的财务报告及预算执行情况说明。"]},
{no:"11.3",t:"回购权触发与利率",type:"触发条件扩张",lv:"h",
 imp:"V2 新增收入低于预算 70% 即可触发，利率由单利 8% 改为复利 10%；V3 放宽到 2030 年 6 月、恢复单利并给 6 个月宽限期，但保留收入触发",
 act:"触发口径改为经审计营业收入连续两年低于上一年度，并删除预算值参照",
 v:["若公司未能在2029年12月31日前完成合格IPO，甲方有权要求公司或创始股东按实缴出资额加年化8%单利回购其全部股权。",
    "若公司未能在2029年12月31日前完成合格IPO，或任一会计年度合并报表营业收入低于当年预算值的70%，甲方有权要求按实缴出资额加年化10%复利回购其全部股权。",
    "若公司未能在2030年6月30日前完成合格IPO，或任一会计年度经审计营业收入低于上一年度的70%（因不可抗力或经甲方书面同意的业务调整导致的除外），甲方有权要求按实缴出资额加年化8%单利回购，并给予6个月宽限期。"]},
{no:"15.1",t:"竞业禁止范围与期限",type:"范围扩张（模型初判为无实质变化）",lv:"h",
 imp:"V3 加入「且不短于竞业补偿实际支付期」与「正在研发的方向」，可主张范围从附录 C 扩到未成形的研发管线，实际约束期可能超过 24 个月",
 act:"删除「正在研发的方向」，期限固定 24 个月且不随补偿支付期延展",
 v:["创始人及核心员工离职后24个月内不得从事与公司主营业务存在竞争的业务。",
    "创始人离职后24个月内不得从事与公司主营业务存在竞争的业务，竞业范围以附录C列举的产品线为限。",
    "创始人及核心研发人员离职后24个月且不短于竞业补偿实际支付期内，不得从事与公司主营业务存在竞争的业务，竞业范围以附录C列举的产品线及公司届时正在研发的方向为限。"]},
{no:"17.2",t:"优先认购与共同出售",type:"新增权利",lv:"m",
 imp:"V3 将甲方优先认购权提高到超额认购的 1.5 倍并叠加优先购买权，创始方引入新股东的空间被压缩",
 act:"接受共同出售权；1.5 倍降回 1.0 倍，优先购买权限定为同等条件 30 日内行使",
 v:["公司增资时，甲方按持股比例享有优先认购权。",
    "公司增资时，甲方按持股比例享有优先认购权；创始股东对外转让股权的，甲方享有共同出售权。",
    "公司增资时，甲方享有相当于超额认购权1.5倍的优先认购权；创始股东对外转让股权的，甲方享有共同出售权及同等条件下的优先购买权。"]},
{no:"18.4",t:"领售权（拖售）",type:"新增条款",lv:"h",
 imp:"V2 新增，董事会多数即可强制创始股东出售公司；按甲方 2 席加上其可影响的中立董事，触发门槛实际低于我方可控范围",
 act:"必须改为股东会三分之二特别决议且估值不低于投后 1.5 倍，否则整条删除",
 v:["",
    "若公司未能在约定时限内实现合格IPO，经董事会多数同意，甲方有权要求创始股东按同等条件向第三方出售其持有的公司全部股权。",
    "若公司未能在约定时限内实现合格IPO，经董事会多数同意，甲方有权要求创始股东按同等条件向第三方出售其持有的公司全部股权。我方要求增加「须经股东会三分之二同意且交易估值不低于投后估值1.5倍」的修改未被采纳。"]}
];
var LVL={h:"高风险",m:"中风险",l:"低风险",d:"对我方有利"};
/* 模型导出的「风险分级」工作表里这 12 条的等级，取自项目内 增资协议三版条款对照.xlsx */
var MGRD={"2.1":"中","3.1":"高","5.2":"高","6.3":"低","7.1":"高","8.2":"中","9.4":"中","10.2":"低","11.3":"高","15.1":"高","17.2":"中","18.4":"高"};
var PAIRS={"1-2":[0,1],"2-3":[1,2],"1-3":[0,2]};

/* 逐字差异：中日韩按字切分，英数成词，LCS 回溯 */
function tok(s){
  var out=[],buf="";
  var push=function(){if(buf){out.push(buf);buf="";}};
  for(var i=0;i<s.length;i++){
    var c=s[i],cc=s.charCodeAt(i);
    if((cc>=0x4e00&&cc<=0x9fff)||(cc>=0x3000&&cc<=0x303f)){push();out.push(c);}
    else if(/[A-Za-z0-9.,%]/.test(c)){buf+=c;}
    else{push();out.push(c);}
  }
  push();return out;
}
function diff(a,b){
  var A=tok(a),B=tok(b),n=A.length,m=B.length,dp=[],i,j;
  for(i=0;i<=n;i++)dp[i]=new Int32Array(m+1);
  for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)
    dp[i][j]=A[i]===B[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  var oa=[],ob=[];i=0;j=0;
  while(i<n&&j<m){
    if(A[i]===B[j]){oa.push({s:A[i]});ob.push({s:B[j]});i++;j++;}
    else if(dp[i+1][j]>=dp[i][j+1]){oa.push({s:A[i],d:1});i++;}
    else{ob.push({s:B[j],a:1});j++;}
  }
  while(i<n){oa.push({s:A[i],d:1});i++;}
  while(j<m){ob.push({s:B[j],a:1});j++;}
  return[oa,ob];
}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function render(segs,mode){
  var html="",run=null,buf="";
  var flush=function(){
    if(!buf)return;
    html+=run?"<"+(run==="d"?"del":"ins")+' class="ins">'+esc(buf)+"</"+(run==="d"?"del":"ins")+">":esc(buf);
    buf="";
  };
  segs.forEach(function(s){
    var mark=mode==="old"?(s.d?"d":null):(s.a?"a":null);
    if(mark!==run){flush();run=mark;}
    buf+=s.s;
  });
  flush();
  return html||'<span style="color:var(--ink-3)">（本版无此条款）</span>';
}

var cur="1-2",idx=0;
var clist=document.getElementById("clist"),vbody=document.getElementById("riskBody");
function changed(p,c){
  var d=diff(c.v[p[0]],c.v[p[1]]);
  return d[0].filter(function(s){return s.d;}).length+d[1].filter(function(s){return s.a;}).length;
}
function paintList(){
  if(!clist)return;
  var p=PAIRS[cur];
  clist.innerHTML=CLAUSES.map(function(c,i){
    var ch=changed(p,c);
    return '<li><button data-i="'+i+'"'+(i===idx?' class="on"':"")+'><span class="c">'+c.no+" "+c.t+
      '</span><span class="r">'+(ch?ch+" 处字面变动":"无字面变动")+" · "+LVL[c.lv]+"</span></button></li>";
  }).join("");
  [].forEach.call(clist.querySelectorAll("button"),function(b){
    b.addEventListener("click",function(){idx=+b.getAttribute("data-i");paintList();paint();});
  });
}
function paint(){
  var c=CLAUSES[idx],p=PAIRS[cur],d=diff(c.v[p[0]],c.v[p[1]]);
  var set=function(id,v){var e=document.getElementById(id);if(e)e.innerHTML=v;};
  set("lab-a","V"+(p[0]+1)+"　第 "+c.no+" 条 "+esc(c.t));
  set("lab-b","V"+(p[1]+1)+"　第 "+c.no+" 条 "+esc(c.t));
  set("txt-a",render(d[0],"old"));
  set("txt-b",render(d[1],"new"));
  set("verdict","<b>对我方影响：</b>"+esc(c.imp)+"<br><b>建议动作：</b>"+esc(c.act));
  var fn=document.getElementById("foot-note");
  if(fn)fn.textContent="第 "+(idx+1)+" / "+CLAUSES.length+" 条 · "+LVL[c.lv];
}
if(clist){
  [].forEach.call(document.querySelectorAll("#vchips button"),function(b){
    b.addEventListener("click",function(){
      cur=b.getAttribute("data-pair");
      [].forEach.call(document.querySelectorAll("#vchips button"),function(x){x.classList.remove("on");});
      b.classList.add("on");paintList();paint();
    });
  });
  document.addEventListener("keydown",function(e){
    if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){
      e.preventDefault();idx=(idx+(e.key==="ArrowDown"?1:-1)+CLAUSES.length)%CLAUSES.length;paintList();paint();
    }else if(e.key==="1"||e.key==="2"||e.key==="3"){
      var k=e.key==="1"?"1-2":e.key==="2"?"2-3":"1-3";
      var b=document.querySelector('#vchips button[data-pair="'+k+'"]');if(b)b.click();
    }
  });
  paintList();paint();
}
if(vbody){
  vbody.innerHTML=CLAUSES.map(function(c){
    var m=MGRD[c.no]||"—";
    var same=m==="高"&&c.lv==="h"||m==="中"&&c.lv==="m"||m==="低"&&(c.lv==="l"||c.lv==="d");
    return "<tr><td><b>"+c.no+"</b> "+esc(c.t)+"</td><td>"+esc(c.type)+'</td><td><span class="lvl '+c.lv+'">'+LVL[c.lv]+
      "</span></td><td>"+(m==="—"?"—":'<span class="lvl '+(m==="高"?"h":m==="中"?"m":"l")+'">'+m+"风险</span>")+(same?"":" <span style=\"font-size:11.5px;color:var(--ink-3)\">不同判</span>")+
      "</td><td>"+esc(c.imp)+"</td><td>"+esc(c.act)+"</td></tr>";
  }).join("");
}
