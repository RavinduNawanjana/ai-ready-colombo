import { animate as motionAnimate, hover } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm";
import { animate as animeAnimate, stagger } from "https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm";

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) {
  document.querySelectorAll('.journey-card,.tool-card,.content-card,.guide-card,.check-step,.decision-grid article,.definition-grid article,.risk-grid article').forEach(card => {
    hover(card, () => {
      motionAnimate(card,{scale:1.012},{duration:.16});
      return () => motionAnimate(card,{scale:1},{duration:.2});
    });
  });

  const observeGroup = (selector, options={}) => {
    document.querySelectorAll(selector).forEach(group => {
      const children = [...group.children];
      if (!children.length) return;
      const io = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        animeAnimate(children,{
          opacity:[0,1],
          y:[options.y ?? 18,0],
          scale: options.scale ? [options.scale,1] : undefined,
          delay:stagger(options.stagger ?? 70),
          duration:options.duration ?? 620,
          ease:options.ease ?? 'outExpo'
        });
      },{threshold:.12});
      io.observe(group);
    });
  };

  observeGroup('.checklist-grid',{y:20,stagger:85,duration:700});
  observeGroup('.guide-grid',{y:18,stagger:90});
  observeGroup('.toolkit-grid',{y:18,stagger:80});
  observeGroup('.decision-grid',{y:16,stagger:85});
  observeGroup('.definition-grid',{y:16,stagger:80});
  observeGroup('.risk-grid',{y:16,stagger:70});
  observeGroup('.ctco-visual',{y:20,stagger:95,scale:.97});
  observeGroup('.workflow-builder',{y:18,stagger:80,scale:.98});

  const rows = document.querySelectorAll('.comparison-table tbody tr');
  if (rows.length) {
    const table = rows[0].closest('.comparison-wrap');
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      animeAnimate(rows,{opacity:[0,1],x:[-14,0],delay:stagger(80),duration:520,ease:'outQuad'});
    },{threshold:.15});
    io.observe(table);
  }

  const stat = document.querySelector('[data-stat-number]');
  if (stat) {
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const state = {value:0};
      animeAnimate(state,{value:39,duration:1200,ease:'outExpo',onUpdate:()=>{stat.textContent=`${Math.round(state.value)}%`;}});
    },{threshold:.4});
    io.observe(stat);
  }

  document.querySelectorAll('.brand-mark').forEach(mark => {
    animeAnimate(mark,{scale:[.85,1],rotate:['-8deg','0deg'],duration:700,ease:'outBack'});
  });
}
