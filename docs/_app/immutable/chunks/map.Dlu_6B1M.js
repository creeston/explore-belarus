import{s as ei,e as ri,S as Bn,A as fn,d as oi,f as En,T as On,i as K,v as D,k as sn,l as Ln,n as ct,w as st,C as ui,t as Xt,h as Yt,x as Ft}from"./scheduler.DOpcSeZu.js";import{e as Pn}from"./InfiniteScroll.CLNH3uex.js";import{S as li,i as fi}from"./index.D4x3fX1m.js";class tn{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const e=this._partials;let i=0;for(let r=0;r<this._n&&r<32;r++){const u=e[r],f=t+u,a=Math.abs(t)<Math.abs(u)?t-(f-u):u-(f-t);a&&(e[i++]=a),t=f}return e[i]=t,this._n=i+1,this}valueOf(){const t=this._partials;let e=this._n,i,r,u,f=0;if(e>0){for(f=t[--e];e>0&&(i=f,r=t[--e],f=i+r,u=r-(f-i),!u););e>0&&(u<0&&t[e-1]<0||u>0&&t[e-1]>0)&&(r=u*2,i=f+r,r==i-f&&(f=i))}return f}}function*ai(n){for(const t of n)yield*t}function qt(n){return Array.from(ai(n))}var L=1e-6,ci=1e-12,N=Math.PI,Z=N/2,ht=N/4,H=N*2,G=180/N,F=N/180,C=Math.abs,Bt=Math.atan,yn=Math.atan2,X=Math.cos,si=Math.exp,hi=Math.log,Y=Math.sin,pi=Math.sign||function(n){return n>0?1:n<0?-1:0},rn=Math.sqrt,gi=Math.tan;function vi(n){return n>1?0:n<-1?N:Math.acos(n)}function wn(n){return n>1?Z:n<-1?-Z:Math.asin(n)}function J(){}function Tn(n,t){n&&gt.hasOwnProperty(n.type)&&gt[n.type](n,t)}var pt={Feature:function(n,t){Tn(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,i=-1,r=e.length;++i<r;)Tn(e[i].geometry,t)}},gt={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)n=e[i],t.point(n[0],n[1],n[2])},LineString:function(n,t){Vn(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)Vn(e[i],t,0)},Polygon:function(n,t){vt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)vt(e[i],t)},GeometryCollection:function(n,t){for(var e=n.geometries,i=-1,r=e.length;++i<r;)Tn(e[i],t)}};function Vn(n,t,e){var i=-1,r=n.length-e,u;for(t.lineStart();++i<r;)u=n[i],t.point(u[0],u[1],u[2]);t.lineEnd()}function vt(n,t){var e=-1,i=n.length;for(t.polygonStart();++e<i;)Vn(n[e],t,1);t.polygonEnd()}function un(n,t){n&&pt.hasOwnProperty(n.type)?pt[n.type](n,t):Tn(n,t)}function Jn(n){return[yn(n[1],n[0]),wn(n[2])]}function an(n){var t=n[0],e=n[1],i=X(e);return[i*X(t),i*Y(t),Y(e)]}function Nn(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function Cn(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Zn(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function kn(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Kn(n){var t=rn(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Qn(n,t){function e(i,r){return i=n(i,r),t(i[0],i[1])}return n.invert&&t.invert&&(e.invert=function(i,r){return i=t.invert(i,r),i&&n.invert(i[0],i[1])}),e}function Un(n,t){return C(n)>N&&(n-=Math.round(n/H)*H),[n,t]}Un.invert=Un;function Ot(n,t,e){return(n%=H)?t||e?Qn(_t(n),St(t,e)):_t(n):t||e?St(t,e):Un}function dt(n){return function(t,e){return t+=n,C(t)>N&&(t-=Math.round(t/H)*H),[t,e]}}function _t(n){var t=dt(n);return t.invert=dt(-n),t}function St(n,t){var e=X(n),i=Y(n),r=X(t),u=Y(t);function f(a,s){var p=X(s),o=X(a)*p,l=Y(a)*p,c=Y(s),g=c*e+o*i;return[yn(l*r-g*u,o*e-c*i),wn(g*r+l*u)]}return f.invert=function(a,s){var p=X(s),o=X(a)*p,l=Y(a)*p,c=Y(s),g=c*r-l*u;return[yn(l*r+c*u,o*e+g*i),wn(g*e-o*i)]},f}function di(n){n=Ot(n[0]*F,n[1]*F,n.length>2?n[2]*F:0);function t(e){return e=n(e[0]*F,e[1]*F),e[0]*=G,e[1]*=G,e}return t.invert=function(e){return e=n.invert(e[0]*F,e[1]*F),e[0]*=G,e[1]*=G,e},t}function _i(n,t,e,i,r,u){if(e){var f=X(t),a=Y(t),s=i*e;r==null?(r=t+i*H,u=t-s/2):(r=Et(f,r),u=Et(f,u),(i>0?r<u:r>u)&&(r+=i*H));for(var p,o=r;i>0?o>u:o<u;o-=s)p=Jn([f,-a*X(o),-a*Y(o)]),n.point(p[0],p[1])}}function Et(n,t){t=an(t),t[0]-=n,Kn(t);var e=vi(-t[1]);return((-t[2]<0?-e:e)+H-L)%H}function Zt(){var n=[],t;return{point:function(e,i,r){t.push([e,i,r])},lineStart:function(){n.push(t=[])},lineEnd:J,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function An(n,t){return C(n[0]-t[0])<L&&C(n[1]-t[1])<L}function In(n,t,e,i){this.x=n,this.z=t,this.o=e,this.e=i,this.v=!1,this.n=this.p=null}function Gt(n,t,e,i,r){var u=[],f=[],a,s;if(n.forEach(function(v){if(!((y=v.length-1)<=0)){var y,d=v[0],R=v[y],S;if(An(d,R)){if(!d[2]&&!R[2]){for(r.lineStart(),a=0;a<y;++a)r.point((d=v[a])[0],d[1]);r.lineEnd();return}R[0]+=2*L}u.push(S=new In(d,v,null,!0)),f.push(S.o=new In(d,null,S,!1)),u.push(S=new In(R,v,null,!1)),f.push(S.o=new In(R,null,S,!0))}}),!!u.length){for(f.sort(t),yt(u),yt(f),a=0,s=f.length;a<s;++a)f[a].e=e=!e;for(var p=u[0],o,l;;){for(var c=p,g=!0;c.v;)if((c=c.n)===p)return;o=c.z,r.lineStart();do{if(c.v=c.o.v=!0,c.e){if(g)for(a=0,s=o.length;a<s;++a)r.point((l=o[a])[0],l[1]);else i(c.x,c.n.x,1,r);c=c.n}else{if(g)for(o=c.p.z,a=o.length-1;a>=0;--a)r.point((l=o[a])[0],l[1]);else i(c.x,c.p.x,-1,r);c=c.p}c=c.o,o=c.z,g=!g}while(!c.v);r.lineEnd()}}}function yt(n){if(t=n.length){for(var t,e=0,i=n[0],r;++e<t;)i.n=r=n[e],r.p=i,i=r;i.n=r=n[0],r.p=i}}function Gn(n){return C(n[0])<=N?n[0]:pi(n[0])*((C(n[0])+N)%H-N)}function Si(n,t){var e=Gn(t),i=t[1],r=Y(i),u=[Y(e),-X(e),0],f=0,a=0,s=new tn;r===1?i=Z+L:r===-1&&(i=-Z-L);for(var p=0,o=n.length;p<o;++p)if(c=(l=n[p]).length)for(var l,c,g=l[c-1],v=Gn(g),y=g[1]/2+ht,d=Y(y),R=X(y),S=0;S<c;++S,v=_,d=M,R=z,g=w){var w=l[S],_=Gn(w),m=w[1]/2+ht,M=Y(m),z=X(m),k=_-v,I=k>=0?1:-1,T=I*k,E=T>N,B=d*M;if(s.add(yn(B*I*Y(T),R*z+B*X(T))),f+=E?k+I*H:k,E^v>=e^_>=e){var x=Cn(an(g),an(w));Kn(x);var A=Cn(u,x);Kn(A);var h=(E^k>=0?-1:1)*wn(A[2]);(i>h||i===h&&(x[0]||x[1]))&&(a+=E^k>=0?1:-1)}}return(f<-L||f<L&&s<-ci)^a&1}function Ht(n,t,e,i){return function(r){var u=t(r),f=Zt(),a=t(f),s=!1,p,o,l,c={point:g,lineStart:y,lineEnd:d,polygonStart:function(){c.point=R,c.lineStart=S,c.lineEnd=w,o=[],p=[]},polygonEnd:function(){c.point=g,c.lineStart=y,c.lineEnd=d,o=qt(o);var _=Si(p,i);o.length?(s||(r.polygonStart(),s=!0),Gt(o,yi,_,e,r)):_&&(s||(r.polygonStart(),s=!0),r.lineStart(),e(null,null,1,r),r.lineEnd()),s&&(r.polygonEnd(),s=!1),o=p=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function g(_,m){n(_,m)&&r.point(_,m)}function v(_,m){u.point(_,m)}function y(){c.point=v,u.lineStart()}function d(){c.point=g,u.lineEnd()}function R(_,m){l.push([_,m]),a.point(_,m)}function S(){a.lineStart(),l=[]}function w(){R(l[0][0],l[0][1]),a.lineEnd();var _=a.clean(),m=f.result(),M,z=m.length,k,I,T;if(l.pop(),p.push(l),l=null,!!z){if(_&1){if(I=m[0],(k=I.length-1)>0){for(s||(r.polygonStart(),s=!0),r.lineStart(),M=0;M<k;++M)r.point((T=I[M])[0],T[1]);r.lineEnd()}return}z>1&&_&2&&m.push(m.pop().concat(m.shift())),o.push(m.filter(Ei))}}return c}}function Ei(n){return n.length>1}function yi(n,t){return((n=n.x)[0]<0?n[1]-Z-L:Z-n[1])-((t=t.x)[0]<0?t[1]-Z-L:Z-t[1])}const wt=Ht(function(){return!0},wi,Mi,[-N,-Z]);function wi(n){var t=NaN,e=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(u,f){var a=u>0?N:-N,s=C(u-t);C(s-N)<L?(n.point(t,e=(e+f)/2>0?Z:-Z),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(a,e),n.point(u,e),r=0):i!==a&&s>=N&&(C(t-i)<L&&(t-=i*L),C(u-a)<L&&(u-=a*L),e=mi(t,e,u,f),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(a,e),r=0),n.point(t=u,e=f),i=a},lineEnd:function(){n.lineEnd(),t=e=NaN},clean:function(){return 2-r}}}function mi(n,t,e,i){var r,u,f=Y(n-e);return C(f)>L?Bt((Y(t)*(u=X(i))*Y(e)-Y(i)*(r=X(t))*Y(n))/(r*u*f)):(t+i)/2}function Mi(n,t,e,i){var r;if(n==null)r=e*Z,i.point(-N,r),i.point(0,r),i.point(N,r),i.point(N,0),i.point(N,-r),i.point(0,-r),i.point(-N,-r),i.point(-N,0),i.point(-N,r);else if(C(n[0]-t[0])>L){var u=n[0]<t[0]?N:-N;r=e*u/2,i.point(-u,r),i.point(0,r),i.point(u,r)}else i.point(t[0],t[1])}function Ri(n){var t=X(n),e=2*F,i=t>0,r=C(t)>L;function u(o,l,c,g){_i(g,n,e,c,o,l)}function f(o,l){return X(o)*X(l)>t}function a(o){var l,c,g,v,y;return{lineStart:function(){v=g=!1,y=1},point:function(d,R){var S=[d,R],w,_=f(d,R),m=i?_?0:p(d,R):_?p(d+(d<0?N:-N),R):0;if(!l&&(v=g=_)&&o.lineStart(),_!==g&&(w=s(l,S),(!w||An(l,w)||An(S,w))&&(S[2]=1)),_!==g)y=0,_?(o.lineStart(),w=s(S,l),o.point(w[0],w[1])):(w=s(l,S),o.point(w[0],w[1],2),o.lineEnd()),l=w;else if(r&&l&&i^_){var M;!(m&c)&&(M=s(S,l,!0))&&(y=0,i?(o.lineStart(),o.point(M[0][0],M[0][1]),o.point(M[1][0],M[1][1]),o.lineEnd()):(o.point(M[1][0],M[1][1]),o.lineEnd(),o.lineStart(),o.point(M[0][0],M[0][1],3)))}_&&(!l||!An(l,S))&&o.point(S[0],S[1]),l=S,g=_,c=m},lineEnd:function(){g&&o.lineEnd(),l=null},clean:function(){return y|(v&&g)<<1}}}function s(o,l,c){var g=an(o),v=an(l),y=[1,0,0],d=Cn(g,v),R=Nn(d,d),S=d[0],w=R-S*S;if(!w)return!c&&o;var _=t*R/w,m=-t*S/w,M=Cn(y,d),z=kn(y,_),k=kn(d,m);Zn(z,k);var I=M,T=Nn(z,I),E=Nn(I,I),B=T*T-E*(Nn(z,z)-1);if(!(B<0)){var x=rn(B),A=kn(I,(-T-x)/E);if(Zn(A,z),A=Jn(A),!c)return A;var h=o[0],P=l[0],q=o[1],O=l[1],W;P<h&&(W=h,h=P,P=W);var hn=P-h,$=C(hn-N)<L,nn=$||hn<L;if(!$&&O<q&&(W=q,q=O,O=W),nn?$?q+O>0^A[1]<(C(A[0]-h)<L?q:O):q<=A[1]&&A[1]<=O:hn>N^(h<=A[0]&&A[0]<=P)){var j=kn(I,(-T+x)/E);return Zn(j,z),[A,Jn(j)]}}}function p(o,l){var c=i?n:N-n,g=0;return o<-c?g|=1:o>c&&(g|=2),l<-c?g|=4:l>c&&(g|=8),g}return Ht(f,a,u,i?[0,-n]:[-N,n-N])}function Pi(n,t,e,i,r,u){var f=n[0],a=n[1],s=t[0],p=t[1],o=0,l=1,c=s-f,g=p-a,v;if(v=e-f,!(!c&&v>0)){if(v/=c,c<0){if(v<o)return;v<l&&(l=v)}else if(c>0){if(v>l)return;v>o&&(o=v)}if(v=r-f,!(!c&&v<0)){if(v/=c,c<0){if(v>l)return;v>o&&(o=v)}else if(c>0){if(v<o)return;v<l&&(l=v)}if(v=i-a,!(!g&&v>0)){if(v/=g,g<0){if(v<o)return;v<l&&(l=v)}else if(g>0){if(v>l)return;v>o&&(o=v)}if(v=u-a,!(!g&&v<0)){if(v/=g,g<0){if(v>l)return;v>o&&(o=v)}else if(g>0){if(v<o)return;v<l&&(l=v)}return o>0&&(n[0]=f+o*c,n[1]=a+o*g),l<1&&(t[0]=f+l*c,t[1]=a+l*g),!0}}}}}var pn=1e9,zn=-pn;function Ni(n,t,e,i){function r(p,o){return n<=p&&p<=e&&t<=o&&o<=i}function u(p,o,l,c){var g=0,v=0;if(p==null||(g=f(p,l))!==(v=f(o,l))||s(p,o)<0^l>0)do c.point(g===0||g===3?n:e,g>1?i:t);while((g=(g+l+4)%4)!==v);else c.point(o[0],o[1])}function f(p,o){return C(p[0]-n)<L?o>0?0:3:C(p[0]-e)<L?o>0?2:1:C(p[1]-t)<L?o>0?1:0:o>0?3:2}function a(p,o){return s(p.x,o.x)}function s(p,o){var l=f(p,1),c=f(o,1);return l!==c?l-c:l===0?o[1]-p[1]:l===1?p[0]-o[0]:l===2?p[1]-o[1]:o[0]-p[0]}return function(p){var o=p,l=Zt(),c,g,v,y,d,R,S,w,_,m,M,z={point:k,lineStart:B,lineEnd:x,polygonStart:T,polygonEnd:E};function k(h,P){r(h,P)&&o.point(h,P)}function I(){for(var h=0,P=0,q=g.length;P<q;++P)for(var O=g[P],W=1,hn=O.length,$=O[0],nn,j,Rn=$[0],on=$[1];W<hn;++W)nn=Rn,j=on,$=O[W],Rn=$[0],on=$[1],j<=i?on>i&&(Rn-nn)*(i-j)>(on-j)*(n-nn)&&++h:on<=i&&(Rn-nn)*(i-j)<(on-j)*(n-nn)&&--h;return h}function T(){o=l,c=[],g=[],M=!0}function E(){var h=I(),P=M&&h,q=(c=qt(c)).length;(P||q)&&(p.polygonStart(),P&&(p.lineStart(),u(null,null,1,p),p.lineEnd()),q&&Gt(c,a,h,u,p),p.polygonEnd()),o=p,c=g=v=null}function B(){z.point=A,g&&g.push(v=[]),m=!0,_=!1,S=w=NaN}function x(){c&&(A(y,d),R&&_&&l.rejoin(),c.push(l.result())),z.point=k,_&&o.lineEnd()}function A(h,P){var q=r(h,P);if(g&&v.push([h,P]),m)y=h,d=P,R=q,m=!1,q&&(o.lineStart(),o.point(h,P));else if(q&&_)o.point(h,P);else{var O=[S=Math.max(zn,Math.min(pn,S)),w=Math.max(zn,Math.min(pn,w))],W=[h=Math.max(zn,Math.min(pn,h)),P=Math.max(zn,Math.min(pn,P))];Pi(O,W,n,t,e,i)?(_||(o.lineStart(),o.point(O[0],O[1])),o.point(W[0],W[1]),q||o.lineEnd(),M=!1):q&&(o.lineStart(),o.point(h,P),M=!1)}S=h,w=P,_=q}return z}}const $n=n=>n;var Hn=new tn,jn=new tn,Wt,Vt,bn,nt,b={point:J,lineStart:J,lineEnd:J,polygonStart:function(){b.lineStart=ki,b.lineEnd=zi},polygonEnd:function(){b.lineStart=b.lineEnd=b.point=J,Hn.add(C(jn)),jn=new tn},result:function(){var n=Hn/2;return Hn=new tn,n}};function ki(){b.point=Ii}function Ii(n,t){b.point=Jt,Wt=bn=n,Vt=nt=t}function Jt(n,t){jn.add(nt*n-bn*t),bn=n,nt=t}function zi(){Jt(Wt,Vt)}var cn=1/0,xn=cn,mn=-cn,Dn=mn,Xn={point:Ai,lineStart:J,lineEnd:J,polygonStart:J,polygonEnd:J,result:function(){var n=[[cn,xn],[mn,Dn]];return mn=Dn=-(xn=cn=1/0),n}};function Ai(n,t){n<cn&&(cn=n),n>mn&&(mn=n),t<xn&&(xn=t),t>Dn&&(Dn=t)}var tt=0,it=0,gn=0,Yn=0,Fn=0,ln=0,et=0,rt=0,vn=0,Kt,Qt,Q,U,V={point:en,lineStart:mt,lineEnd:Mt,polygonStart:function(){V.lineStart=Ci,V.lineEnd=xi},polygonEnd:function(){V.point=en,V.lineStart=mt,V.lineEnd=Mt},result:function(){var n=vn?[et/vn,rt/vn]:ln?[Yn/ln,Fn/ln]:gn?[tt/gn,it/gn]:[NaN,NaN];return tt=it=gn=Yn=Fn=ln=et=rt=vn=0,n}};function en(n,t){tt+=n,it+=t,++gn}function mt(){V.point=Li}function Li(n,t){V.point=Ti,en(Q=n,U=t)}function Ti(n,t){var e=n-Q,i=t-U,r=rn(e*e+i*i);Yn+=r*(Q+n)/2,Fn+=r*(U+t)/2,ln+=r,en(Q=n,U=t)}function Mt(){V.point=en}function Ci(){V.point=Di}function xi(){Ut(Kt,Qt)}function Di(n,t){V.point=Ut,en(Kt=Q=n,Qt=U=t)}function Ut(n,t){var e=n-Q,i=t-U,r=rn(e*e+i*i);Yn+=r*(Q+n)/2,Fn+=r*(U+t)/2,ln+=r,r=U*n-Q*t,et+=r*(Q+n),rt+=r*(U+t),vn+=r*3,en(Q=n,U=t)}function $t(n){this._context=n}$t.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(n,t){switch(this._point){case 0:{this._context.moveTo(n,t),this._point=1;break}case 1:{this._context.lineTo(n,t);break}default:{this._context.moveTo(n+this._radius,t),this._context.arc(n,t,this._radius,0,H);break}}},result:J};var ot=new tn,Wn,jt,bt,dn,_n,Mn={point:J,lineStart:function(){Mn.point=Xi},lineEnd:function(){Wn&&ni(jt,bt),Mn.point=J},polygonStart:function(){Wn=!0},polygonEnd:function(){Wn=null},result:function(){var n=+ot;return ot=new tn,n}};function Xi(n,t){Mn.point=ni,jt=dn=n,bt=_n=t}function ni(n,t){dn-=n,_n-=t,ot.add(rn(dn*dn+_n*_n)),dn=n,_n=t}let Rt,qn,Pt,Nt;class kt{constructor(t){this._append=t==null?ti:Yi(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(t,e){switch(this._point){case 0:{this._append`M${t},${e}`,this._point=1;break}case 1:{this._append`L${t},${e}`;break}default:{if(this._append`M${t},${e}`,this._radius!==Pt||this._append!==qn){const i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,Pt=i,qn=this._append,Nt=this._,this._=r}this._+=Nt;break}}}result(){const t=this._;return this._="",t.length?t:null}}function ti(n){let t=1;this._+=n[0];for(const e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function Yi(n){const t=Math.floor(n);if(!(t>=0))throw new RangeError(`invalid digits: ${n}`);if(t>15)return ti;if(t!==Rt){const e=10**t;Rt=t,qn=function(r){let u=1;this._+=r[0];for(const f=r.length;u<f;++u)this._+=Math.round(arguments[u]*e)/e+r[u]}}return qn}function Fi(n,t){let e=3,i=4.5,r,u;function f(a){return a&&(typeof i=="function"&&u.pointRadius(+i.apply(this,arguments)),un(a,r(u))),u.result()}return f.area=function(a){return un(a,r(b)),b.result()},f.measure=function(a){return un(a,r(Mn)),Mn.result()},f.bounds=function(a){return un(a,r(Xn)),Xn.result()},f.centroid=function(a){return un(a,r(V)),V.result()},f.projection=function(a){return arguments.length?(r=a==null?(n=null,$n):(n=a).stream,f):n},f.context=function(a){return arguments.length?(u=a==null?(t=null,new kt(e)):new $t(t=a),typeof i!="function"&&u.pointRadius(i),f):t},f.pointRadius=function(a){return arguments.length?(i=typeof a=="function"?a:(u.pointRadius(+a),+a),f):i},f.digits=function(a){if(!arguments.length)return e;if(a==null)e=null;else{const s=Math.floor(a);if(!(s>=0))throw new RangeError(`invalid digits: ${a}`);e=s}return t===null&&(u=new kt(e)),f},f.projection(n).digits(e).context(t)}function lt(n){return function(t){var e=new ut;for(var i in n)e[i]=n[i];return e.stream=t,e}}function ut(){}ut.prototype={constructor:ut,point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function ft(n,t,e){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),un(e,n.stream(Xn)),t(Xn.result()),i!=null&&n.clipExtent(i),n}function ii(n,t,e){return ft(n,function(i){var r=t[1][0]-t[0][0],u=t[1][1]-t[0][1],f=Math.min(r/(i[1][0]-i[0][0]),u/(i[1][1]-i[0][1])),a=+t[0][0]+(r-f*(i[1][0]+i[0][0]))/2,s=+t[0][1]+(u-f*(i[1][1]+i[0][1]))/2;n.scale(150*f).translate([a,s])},e)}function qi(n,t,e){return ii(n,[[0,0],t],e)}function Bi(n,t,e){return ft(n,function(i){var r=+t,u=r/(i[1][0]-i[0][0]),f=(r-u*(i[1][0]+i[0][0]))/2,a=-u*i[0][1];n.scale(150*u).translate([f,a])},e)}function Oi(n,t,e){return ft(n,function(i){var r=+t,u=r/(i[1][1]-i[0][1]),f=-u*i[0][0],a=(r-u*(i[1][1]+i[0][1]))/2;n.scale(150*u).translate([f,a])},e)}var It=16,Zi=X(30*F);function zt(n,t){return+t?Hi(n,t):Gi(n)}function Gi(n){return lt({point:function(t,e){t=n(t,e),this.stream.point(t[0],t[1])}})}function Hi(n,t){function e(i,r,u,f,a,s,p,o,l,c,g,v,y,d){var R=p-i,S=o-r,w=R*R+S*S;if(w>4*t&&y--){var _=f+c,m=a+g,M=s+v,z=rn(_*_+m*m+M*M),k=wn(M/=z),I=C(C(M)-1)<L||C(u-l)<L?(u+l)/2:yn(m,_),T=n(I,k),E=T[0],B=T[1],x=E-i,A=B-r,h=S*x-R*A;(h*h/w>t||C((R*x+S*A)/w-.5)>.3||f*c+a*g+s*v<Zi)&&(e(i,r,u,f,a,s,E,B,I,_/=z,m/=z,M,y,d),d.point(E,B),e(E,B,I,_,m,M,p,o,l,c,g,v,y,d))}}return function(i){var r,u,f,a,s,p,o,l,c,g,v,y,d={point:R,lineStart:S,lineEnd:_,polygonStart:function(){i.polygonStart(),d.lineStart=m},polygonEnd:function(){i.polygonEnd(),d.lineStart=S}};function R(k,I){k=n(k,I),i.point(k[0],k[1])}function S(){l=NaN,d.point=w,i.lineStart()}function w(k,I){var T=an([k,I]),E=n(k,I);e(l,c,o,g,v,y,l=E[0],c=E[1],o=k,g=T[0],v=T[1],y=T[2],It,i),i.point(l,c)}function _(){d.point=R,i.lineEnd()}function m(){S(),d.point=M,d.lineEnd=z}function M(k,I){w(r=k,I),u=l,f=c,a=g,s=v,p=y,d.point=w}function z(){e(l,c,o,g,v,y,u,f,r,a,s,p,It,i),d.lineEnd=_,_()}return d}}var Wi=lt({point:function(n,t){this.stream.point(n*F,t*F)}});function Vi(n){return lt({point:function(t,e){var i=n(t,e);return this.stream.point(i[0],i[1])}})}function Ji(n,t,e,i,r){function u(f,a){return f*=i,a*=r,[t+n*f,e-n*a]}return u.invert=function(f,a){return[(f-t)/n*i,(e-a)/n*r]},u}function At(n,t,e,i,r,u){if(!u)return Ji(n,t,e,i,r);var f=X(u),a=Y(u),s=f*n,p=a*n,o=f/n,l=a/n,c=(a*e-f*t)/n,g=(a*t+f*e)/n;function v(y,d){return y*=i,d*=r,[s*y-p*d+t,e-p*y-s*d]}return v.invert=function(y,d){return[i*(o*y-l*d+c),r*(g-l*y-o*d)]},v}function Ki(n){return Qi(function(){return n})()}function Qi(n){var t,e=150,i=480,r=250,u=0,f=0,a=0,s=0,p=0,o,l=0,c=1,g=1,v=null,y=wt,d=null,R,S,w,_=$n,m=.5,M,z,k,I,T;function E(h){return k(h[0]*F,h[1]*F)}function B(h){return h=k.invert(h[0],h[1]),h&&[h[0]*G,h[1]*G]}E.stream=function(h){return I&&T===h?I:I=Wi(Vi(o)(y(M(_(T=h)))))},E.preclip=function(h){return arguments.length?(y=h,v=void 0,A()):y},E.postclip=function(h){return arguments.length?(_=h,d=R=S=w=null,A()):_},E.clipAngle=function(h){return arguments.length?(y=+h?Ri(v=h*F):(v=null,wt),A()):v*G},E.clipExtent=function(h){return arguments.length?(_=h==null?(d=R=S=w=null,$n):Ni(d=+h[0][0],R=+h[0][1],S=+h[1][0],w=+h[1][1]),A()):d==null?null:[[d,R],[S,w]]},E.scale=function(h){return arguments.length?(e=+h,x()):e},E.translate=function(h){return arguments.length?(i=+h[0],r=+h[1],x()):[i,r]},E.center=function(h){return arguments.length?(u=h[0]%360*F,f=h[1]%360*F,x()):[u*G,f*G]},E.rotate=function(h){return arguments.length?(a=h[0]%360*F,s=h[1]%360*F,p=h.length>2?h[2]%360*F:0,x()):[a*G,s*G,p*G]},E.angle=function(h){return arguments.length?(l=h%360*F,x()):l*G},E.reflectX=function(h){return arguments.length?(c=h?-1:1,x()):c<0},E.reflectY=function(h){return arguments.length?(g=h?-1:1,x()):g<0},E.precision=function(h){return arguments.length?(M=zt(z,m=h*h),A()):rn(m)},E.fitExtent=function(h,P){return ii(E,h,P)},E.fitSize=function(h,P){return qi(E,h,P)},E.fitWidth=function(h,P){return Bi(E,h,P)},E.fitHeight=function(h,P){return Oi(E,h,P)};function x(){var h=At(e,0,0,c,g,l).apply(null,t(u,f)),P=At(e,i-h[0],r-h[1],c,g,l);return o=Ot(a,s,p),z=Qn(t,P),k=Qn(o,z),M=zt(z,m),A()}function A(){return I=T=null,E}return function(){return t=n.apply(this,arguments),E.invert=t.invert&&B,x()}}function at(n,t){return[n,hi(gi((Z+t)/2))]}at.invert=function(n,t){return[n,2*Bt(si(t))-Z]};function Ui(){return $i(at).scale(961/H)}function $i(n){var t=Ki(n),e=t.center,i=t.scale,r=t.translate,u=t.clipExtent,f=null,a,s,p;t.scale=function(l){return arguments.length?(i(l),o()):i()},t.translate=function(l){return arguments.length?(r(l),o()):r()},t.center=function(l){return arguments.length?(e(l),o()):e()},t.clipExtent=function(l){return arguments.length?(l==null?f=a=s=p=null:(f=+l[0][0],a=+l[0][1],s=+l[1][0],p=+l[1][1]),o()):f==null?null:[[f,a],[s,p]]};function o(){var l=N*i(),c=t(di(t.rotate()).invert([0,0]));return u(f==null?[[c[0]-l,c[1]-l],[c[0]+l,c[1]+l]]:n===at?[[Math.max(c[0]-l,f),a],[Math.min(c[0]+l,s),p]]:[[f,Math.max(c[1]-l,a)],[s,Math.min(c[1]+l,p)]])}return o()}function Sn(n,t,e){this.k=n,this.x=t,this.y=e}Sn.prototype={constructor:Sn,scale:function(n){return n===1?this:new Sn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new Sn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Sn.prototype;function Lt(n,t,e){const i=n.slice();return i[8]=t[e],i[10]=e,i}function Tt(n,t,e){const i=n.slice();return i[11]=t[e],i[10]=e,i}function Ct(n){let t,e;return{c(){t=Bn("path"),this.h()},l(i){t=On(i,"path",{d:!0,class:!0,stroke:!0,fill:!0,"stroke-width":!0}),En(t).forEach(K),this.h()},h(){D(t,"d",e=n[5](n[11])),D(t,"class","state"),D(t,"stroke","rgb(522, 201, 207 / 90%)"),D(t,"fill","rgb(182, 201, 207)"),D(t,"stroke-width","1px")},m(i,r){sn(i,t,r)},p(i,r){r&8&&e!==(e=i[5](i[11]))&&D(t,"d",e)},d(i){i&&K(t)}}}function xt(n){let t;function e(u,f){return u[2]===u[10]?bi:ji}let i=e(n),r=i(n);return{c(){r.c(),t=fn()},l(u){r.l(u),t=fn()},m(u,f){r.m(u,f),sn(u,t,f)},p(u,f){i===(i=e(u))&&r?r.p(u,f):(r.d(1),r=i(u),r&&(r.c(),r.m(t.parentNode,t)))},d(u){u&&K(t),r.d(u)}}}function ji(n){let t,e,i,r;return{c(){t=Bn("text"),e=Xt(`⭐\r
                    `),this.h()},l(u){t=On(u,"text",{x:!0,y:!0,style:!0,class:!0});var f=En(t);e=Yt(f,`⭐\r
                    `),f.forEach(K),this.h()},h(){D(t,"x",i=n[8][0]-8),D(t,"y",r=n[8][1]+4),Ft(t,"font-size","10px"),D(t,"class","svelte-126iubx")},m(u,f){sn(u,t,f),Ln(t,e)},p(u,f){f&16&&i!==(i=u[8][0]-8)&&D(t,"x",i),f&16&&r!==(r=u[8][1]+4)&&D(t,"y",r)},d(u){u&&K(t)}}}function bi(n){let t,e,i,r;return{c(){t=Bn("text"),e=Xt(`🌟\r
                    `),this.h()},l(u){t=On(u,"text",{x:!0,y:!0,style:!0,class:!0});var f=En(t);e=Yt(f,`🌟\r
                    `),f.forEach(K),this.h()},h(){D(t,"x",i=n[8][0]-16),D(t,"y",r=n[8][1]+8),Ft(t,"font-size","20px"),D(t,"class","svelte-126iubx")},m(u,f){sn(u,t,f),Ln(t,e)},p(u,f){f&16&&i!==(i=u[8][0]-16)&&D(t,"x",i),f&16&&r!==(r=u[8][1]+8)&&D(t,"y",r)},d(u){u&&K(t)}}}function Dt(n){let t,e=n[8]&&xt(n);return{c(){e&&e.c(),t=fn()},l(i){e&&e.l(i),t=fn()},m(i,r){e&&e.m(i,r),sn(i,t,r)},p(i,r){i[8]?e?e.p(i,r):(e=xt(i),e.c(),e.m(t.parentNode,t)):e&&(e.d(1),e=null)},d(i){i&&K(t),e&&e.d(i)}}}function ne(n){let t,e,i,r=Pn(n[3]),u=[];for(let s=0;s<r.length;s+=1)u[s]=Ct(Tt(n,r,s));let f=Pn(n[4]),a=[];for(let s=0;s<f.length;s+=1)a[s]=Dt(Lt(n,f,s));return{c(){t=ri("div"),e=Bn("svg");for(let s=0;s<u.length;s+=1)u[s].c();i=fn();for(let s=0;s<a.length;s+=1)a[s].c();this.h()},l(s){t=oi(s,"DIV",{});var p=En(t);e=On(p,"svg",{width:!0,height:!0,class:!0});var o=En(e);for(let l=0;l<u.length;l+=1)u[l].l(o);i=fn();for(let l=0;l<a.length;l+=1)a[l].l(o);o.forEach(K),p.forEach(K),this.h()},h(){D(e,"width",n[1]),D(e,"height",n[0]),D(e,"class","svelte-126iubx")},m(s,p){sn(s,t,p),Ln(t,e);for(let o=0;o<u.length;o+=1)u[o]&&u[o].m(e,null);Ln(e,i);for(let o=0;o<a.length;o+=1)a[o]&&a[o].m(e,null)},p(s,[p]){if(p&40){r=Pn(s[3]);let o;for(o=0;o<r.length;o+=1){const l=Tt(s,r,o);u[o]?u[o].p(l,p):(u[o]=Ct(l),u[o].c(),u[o].m(e,i))}for(;o<u.length;o+=1)u[o].d(1);u.length=r.length}if(p&20){f=Pn(s[4]);let o;for(o=0;o<f.length;o+=1){const l=Lt(s,f,o);a[o]?a[o].p(l,p):(a[o]=Dt(l),a[o].c(),a[o].m(e,null))}for(;o<a.length;o+=1)a[o].d(1);a.length=f.length}p&2&&D(e,"width",s[1]),p&1&&D(e,"height",s[0])},i:ct,o:ct,d(s){s&&K(t),st(u,s),st(a,s)}}}function te(n,t,e){let i,{height:r=500}=t,{width:u=500}=t,{coords:f=null}=t,{highlighedCoordIndex:a=null}=t;const s=Ui().center([28,54]).scale(r*6).translate([r/2,u/2]),p=Fi().projection(s);let o=[];return ui(async()=>{const c=await(await fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")).json();e(3,o=c.features.filter(function(g){return g.properties.name=="Belarus"}))}),n.$$set=l=>{"height"in l&&e(0,r=l.height),"width"in l&&e(1,u=l.width),"coords"in l&&e(6,f=l.coords),"highlighedCoordIndex"in l&&e(2,a=l.highlighedCoordIndex)},n.$$.update=()=>{n.$$.dirty&64&&e(4,i=f?f.map(l=>s([l[1],l[0]])):[])},[r,u,a,o,i,p,f]}class oe extends li{constructor(t){super(),fi(this,t,te,ne,ei,{height:0,width:1,coords:6,highlighedCoordIndex:2})}}export{oe as M};