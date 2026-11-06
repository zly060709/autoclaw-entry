/* 共享：阅读进度、章节高亮、指令复制 */
(function(){
  var bar=document.getElementById('prog');
  if(bar){
    var tick=function(){
      var h=document.documentElement.scrollHeight-innerHeight;
      bar.style.width=(h>0?scrollY/h*100:0)+'%';
    };
    addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);tick();
  }

  var links=[].slice.call(document.querySelectorAll('#rail a'));
  if(links.length&&'IntersectionObserver'in window){
    var map={};
    links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(a){a.classList.remove('on');});
          var a=map[e.target.id];if(a)a.classList.add('on');
        }
      });
    },{rootMargin:'-12% 0px -72% 0px'});
    Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)io.observe(s);});
  }

  document.querySelectorAll('[data-script]').forEach(function(box){
    var btn=box.querySelector('.copy'),pre=box.querySelector('pre');
    if(!btn||!pre)return;
    btn.addEventListener('click',function(){
      var t=pre.innerText;
      var done=function(){btn.textContent='已复制';btn.classList.add('done');setTimeout(function(){btn.textContent='复制';btn.classList.remove('done');},1600);};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,done);}
      else{
        var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();
        try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();
      }
    });
  });
})();
