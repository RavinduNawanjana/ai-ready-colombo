(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap) return;
  document.documentElement.classList.add('motion-ready');
  gsap.registerPlugin(ScrollTrigger);

  const onHome = document.querySelector('.hero-shell');
  if (onHome) {
    const tl = gsap.timeline({defaults:{ease:'power3.out'}});
    tl.from('.hero-copy .eyebrow',{y:16,opacity:0,duration:.45})
      .from('.hero-title',{y:34,opacity:0,duration:.8},'-=.2')
      .from('.hero-lead',{y:20,opacity:0,duration:.55},'-=.45')
      .from('.hero-actions',{y:16,opacity:0,duration:.45},'-=.32')
      .from('.hero-meta',{y:10,opacity:0,duration:.4},'-=.25')
      .from('.hero-core',{scale:.78,opacity:0,duration:.85,ease:'back.out(1.5)'},'-=.75');
    gsap.to('.orb-1',{rotate:360,duration:24,ease:'none',repeat:-1});
    gsap.to('.orb-2',{rotate:-360,duration:34,ease:'none',repeat:-1});
    gsap.to('.orbit-dot',{rotate:360,transformOrigin:'50% 410%',duration:12,ease:'none',repeat:-1});
  }

  gsap.utils.toArray('.reveal').forEach(el => {
    if (el.closest('.hero-copy')) return;
    gsap.from(el,{y:24,opacity:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
  });

  gsap.utils.toArray('.lesson-section').forEach(section => {
    const title = section.querySelector('h2');
    const label = section.querySelector('.lesson-label');
    if (label) gsap.from(label,{x:-18,opacity:0,duration:.45,scrollTrigger:{trigger:section,start:'top 86%',once:true}});
    if (title) gsap.from(title,{y:22,opacity:0,duration:.62,delay:.05,scrollTrigger:{trigger:section,start:'top 84%',once:true}});
  });

  if (document.querySelector('.journey-line-fill')) {
    gsap.to('.journey-line-fill',{height:'100%',ease:'none',scrollTrigger:{trigger:'.journey-track',start:'top 65%',end:'bottom 65%',scrub:true}});
  }

  const word = document.querySelector('#rotating-word');
  if (word) {
    const words = ['learn','research','write','question','verify','decide'];
    let i = 0;
    setInterval(() => {
      gsap.to(word,{y:-12,opacity:0,duration:.2,onComplete:()=>{
        i=(i+1)%words.length; word.textContent=words[i];
        gsap.fromTo(word,{y:12,opacity:0},{y:0,opacity:1,duration:.3,ease:'power2.out'});
      }});
    },1900);
  }

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.07,y:(e.clientY-r.top-r.height/2)*.07,duration:.22,overwrite:true});
    });
    el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.35,ease:'power2.out'}));
  });
})();
