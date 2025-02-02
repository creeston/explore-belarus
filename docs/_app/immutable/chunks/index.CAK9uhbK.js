import{v as y}from"./scheduler.CK6oJh7_.js";function m(t){const o=t-1;return o*o*o+1}function $(t){return--t*t*t*t*t+1}function g(t,{delay:o=0,duration:n=400,easing:s=y}={}){const c=+getComputedStyle(t).opacity;return{delay:o,duration:n,easing:s,css:r=>`opacity: ${r*c}`}}function q(t,{delay:o=0,duration:n=400,easing:s=m,start:c=0,opacity:r=0}={}){const e=getComputedStyle(t),a=+e.opacity,u=e.transform==="none"?"":e.transform,f=1-c,p=a*(1-r);return{delay:o,duration:n,easing:s,css:(d,i)=>`
			transform: ${u} scale(${1-f*i});
			opacity: ${a-p*i}
		`}}export{g as f,$ as q,q as s};
