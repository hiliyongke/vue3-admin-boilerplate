var a=Object.defineProperty,e=Object.defineProperties,l=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(e,l,s)=>l in e?a(e,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[l]=s;import{o as r,c as i,a as u,d as c,g as d,as as p,k as v,l as m,x as g,u as y,am as f,aP as b,a9 as h,F as M,r as _,m as j,t as k,y as x,e as O,bO as w,H as D,aD as P,at as Z,au as C,aO as L,p as V,b as z}from"./.pnpm-23496a1a.js";import{N as E}from"./index-3f67debd.js";import{j as q}from"./user-91c86330.js";import{_ as I}from"./_plugin-vue_export-helper-1b428a4d.js";import"./index-cf7ca57d.js";import"./index-9322a30f.js";const S={xmlns:"http://www.w3.org/2000/svg",width:"64",height:"64",fill:"none"},U=[u("path",{fill:"currentcolor","fill-opacity":".26","fill-rule":"evenodd",d:"m32 10.69 26.248 15.155v22.31L32 63.308 5.75 48.155v-22.31L32 10.69ZM9.75 30.464v15.381L32 58.69l22.248-12.845V30.464L32 43.309 9.75 30.464ZM52.248 27 40.66 33.69l-8.66-5-8.66 5L11.75 27 32 15.31 52.248 27ZM27.34 36 32 38.69 36.66 36 32 33.31 27.34 36ZM30 8V0h4v8h-4ZM44.268 10.751l4-6.928 3.464 2-4 6.928-3.464-2ZM16.268 12.751l-4-6.928 3.464-2 4 6.928-3.464 2Z","clip-rule":"evenodd"},null,-1)];const F={render:function(a,e){return r(),i("svg",S,U)}},H={class:"secondary-notification"},N=["onClick"],$={class:"msg-date"},A={class:"msg-action"},B=["onClick"],G=["onClick"],J={key:1,class:"secondary-msg-list__empty-list"},K=(a=>(V("data-v-720a2671"),a=a(),z(),a))(()=>u("p",null,"暂无通知",-1)),Q=I(c(((a,s)=>e(a,l(s)))(((a,e)=>{for(var l in e||(e={}))t.call(e,l)&&o(a,l,e[l]);if(s)for(var l of s(e))n.call(e,l)&&o(a,l,e[l]);return a})({},{name:"DetailSecondary"}),{setup(a){const e=[{label:"全部通知",value:"msgData"},{label:"未读通知",value:"unreadMsg"},{label:"已读通知",value:"readMsg"}],l=d("msgData"),s=d(!1),t=d(),n=q(),{msgData:o,unreadMsg:c,readMsg:V}=p(n),z=v(()=>"msgData"===l.value?o.value:"unreadMsg"===l.value?c.value:"readMsg"===l.value?V.value:[]),I=a=>{const e=o.value;e.forEach(e=>{e.id===a.id&&e.status&&(e.status=!1)}),n.setMsgData(e)},S=()=>{const a=t.value,e=o.value;e.forEach((l,s)=>{l.id===(null==a?void 0:a.id)&&e.splice(s,1)}),s.value=!1,n.setMsgData(e)};return(a,n)=>{const o=w,c=D,d=P,p=Z,v=C,V=L,q=b,U=h;return r(),i("div",null,[u("div",H,[m(q,{modelValue:y(l),"onUpdate:modelValue":n[0]||(n[0]=a=>f(l)?l.value=a:null)},{default:g(()=>[(r(),i(M,null,_(e,(a,e)=>m(V,{key:e,value:a.value,label:a.label},{default:g(()=>[y(z).length>0?(r(),j(v,{key:0,class:"secondary-msg-list",split:!0},{default:g(()=>[(r(!0),i(M,null,_(y(z),(a,e)=>(r(),j(p,{key:e},{action:g(()=>[u("span",$,k(a.date),1),u("div",A,[m(d,{class:"set-read-icon","overlay-style":{margin:"6px"},content:a.status?"设为已读":"设为未读"},{default:g(()=>[u("span",{class:"msg-action-icon",onClick:e=>I(a)},[a.status?(r(),j(c,{key:0,name:"queue",size:"16px"})):(r(),j(c,{key:1,name:"chat"}))],8,B)]),_:2},1032,["content"]),m(d,{content:"删除通知","overlay-style":{margin:"6px"}},{default:g(()=>[u("span",{onClick:e=>(a=>{s.value=!0,t.value=a})(a)},[m(c,{name:"delete",size:"16px"})],8,G)]),_:2},1024)])]),default:g(()=>[u("p",{class:x(["content",{unread:a.status}]),onClick:e=>I(a)},[m(o,{size:"small",theme:y(E)[a.quality],variant:"light"},{default:g(()=>[O(k(a.type),1)]),_:2},1032,["theme"]),O(" "+k(a.content),1)],10,N)]),_:2},1024))),128))]),_:1})):(r(),i("div",J,[m(y(F)),K]))]),_:2},1032,["value","label"])),64))]),_:1},8,["modelValue"])]),m(U,{visible:y(s),"onUpdate:visible":n[1]||(n[1]=a=>f(s)?s.value=a:null),header:"删除通知",body:`确认删除通知：${y(t)&&y(t).content}吗？`,"on-confirm":S},null,8,["visible","body"])])}}})),[["__scopeId","data-v-720a2671"]]);export{Q as default};
//# sourceMappingURL=index-7a77d891.js.map