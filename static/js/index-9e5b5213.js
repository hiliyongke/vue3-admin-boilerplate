var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,u=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(a,l,t)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[l]=t,i=(e,a)=>{for(var l in a||(a={}))u.call(a,l)&&o(e,l,a[l]);if(t)for(var l of t(a))s.call(a,l)&&o(e,l,a[l]);return e},r=(e,t)=>a(e,l(t));import{P as n}from"./index-3f218acc.js";import{d,g as v,a7 as p,s as c,x as m,u as b,A as f,a_ as y,o as g,y as h,e as _,c as V,r as x,t as w,F as z,M as S,U,E as j,b$ as k,C as O,aR as P,aS as C,aY as M,H as E,G as I,k as D,h as $,a as q,K as A,aW as B,c5 as F,c4 as G,aQ as H,a8 as K}from"./.pnpm-e6c61d32.js";import{a as L}from"./list-066b90e9.js";import{_ as N}from"./index-4900769b.js";const Q=d({__name:"dialog-form",props:{visible:{type:Boolean,default:!1},data:{type:Object,default:()=>({})}},emits:["update:visible"],setup(e,{emit:a}){const l=e,t={name:"",status:"",description:"",type:"",mark:"",amount:0},u=[{label:"网关",value:"1"},{label:"人工智能",value:"2"},{label:"CVM",value:"3"}],s=v(!1),o=v(l.data),r=v(""),n=({result:e,firstError:a})=>{a?S.warning(a):(S.success("提交成功"),s.value=!1)},d=()=>{s.value=!1,o.value=i({},t)};p(()=>s.value,e=>{a("update:visible",e)}),p(()=>l.visible,e=>{s.value=e}),p(()=>l.data,e=>{o.value=e});const D={name:[{required:!0,message:"请输入产品名称",type:"error"}]};return(e,a)=>{const l=U,t=j,i=k,v=O,p=P,S=C,$=M,q=E,A=I,B=y;return g(),c(B,{visible:b(s),"onUpdate:visible":a[5]||(a[5]=e=>f(s)?s.value=e:null),header:"新建产品",width:680,footer:!1},{body:m(()=>[h(A,{ref:"form",data:b(o),rules:D,"label-width":100,onSubmit:n},{default:m(()=>[h(t,{label:"产品名称",name:"name"},{default:m(()=>[h(l,{modelValue:b(o).name,"onUpdate:modelValue":a[0]||(a[0]=e=>b(o).name=e),style:{width:"480px"},placeholder:"请输入产品名称"},null,8,["modelValue"])]),_:1}),h(t,{label:"产品状态",name:"status"},{default:m(()=>[h(v,{modelValue:b(o).status,"onUpdate:modelValue":a[1]||(a[1]=e=>b(o).status=e)},{default:m(()=>[h(i,{value:"0"},{default:m(()=>[_("已停用")]),_:1}),h(i,{value:"1"},{default:m(()=>[_("已启用")]),_:1})]),_:1},8,["modelValue"])]),_:1}),h(t,{label:"产品描述",name:"description"},{default:m(()=>[h(l,{modelValue:b(o).description,"onUpdate:modelValue":a[2]||(a[2]=e=>b(o).description=e),style:{width:"480px"},placeholder:"请输入产品描述"},null,8,["modelValue"])]),_:1}),h(t,{label:"产品类型",name:"type"},{default:m(()=>[h(S,{modelValue:b(o).type,"onUpdate:modelValue":a[3]||(a[3]=e=>b(o).type=e),clearable:"",style:{width:"480px"}},{default:m(()=>[(g(),V(z,null,x(u,(e,a)=>h(p,{key:a,value:e.value,label:e.label},{default:m(()=>[_(w(e.label),1)]),_:2},1032,["value","label"])),64))]),_:1},8,["modelValue"])]),_:1}),h(t,{label:"备注",name:"mark"},{default:m(()=>[h($,{modelValue:b(r),"onUpdate:modelValue":a[4]||(a[4]=e=>f(r)?r.value=e:null),style:{width:"480px"},placeholder:"请输入内容",name:"description"},null,8,["modelValue"])]),_:1}),h(t,{style:{float:"right"}},{default:m(()=>[h(q,{variant:"outline",onClick:d},{default:m(()=>[_(" 取消 ")]),_:1}),h(q,{theme:"primary",type:"submit"},{default:m(()=>[_(" 确定 ")]),_:1})]),_:1})]),_:1},8,["data"])]),_:1},8,["visible"])}}}),R={class:"list-card-operation"},W={class:"search-input"},Y={class:"list-card-items"},J={class:"list-card-pagination"},T={key:1,class:"list-card-loading"},X=N(d(r(i({},{name:"ListCard"}),{setup(e){const a={name:"",status:"",description:"",type:"",mark:"",amount:0},l=v({current:1,pageSize:12,total:0}),t=v(void 0),u=v([]),s=v(!0),o=()=>{return e=this,a=null,t=function*(){try{const{list:e}=yield L();u.value=e,l.value=r(i({},l.value),{total:e.length})}catch(e){}finally{s.value=!1}},new Promise((l,u)=>{var s=e=>{try{i(t.next(e))}catch(a){u(a)}},o=e=>{try{i(t.throw(e))}catch(a){u(a)}},i=e=>e.done?l(e.value):Promise.resolve(e.value).then(s,o);i((t=t.apply(e,a)).next())});var e,a,t},d=D(()=>t.value?`确认删除后${t.value.name}的所有产品信息将被清空, 且无法恢复`:"");$(()=>{o()});const p=v(!1),f=v(""),w=v(!1),j=v(i({},a)),k=e=>{l.value.pageSize=e,l.value.current=1},O=e=>{l.value.current=e},P=e=>{w.value=!0,t.value=e},C=()=>{const{index:e}=t.value;u.value.splice(e-1,1),w.value=!1,S.success("删除成功")},M=()=>{t.value=void 0,j.value=i({},a)},I=e=>{p.value=!0,j.value=r(i({},e),{status:(null==e?void 0:e.isSetup)?"1":"0"})};return(e,a)=>{const t=E,o=U,i=H,r=B,v=F,S=K,D=y;return g(),V("div",null,[q("div",R,[h(t,{onClick:a[0]||(a[0]=e=>p.value=!0)},{default:m(()=>[_("新建产品")]),_:1}),q("div",W,[h(o,{modelValue:f.value,"onUpdate:modelValue":a[1]||(a[1]=e=>f.value=e),placeholder:"请输入你需要搜索的内容",clearable:""},{"suffix-icon":m(()=>[""===f.value?(g(),c(b(G),{key:0,size:"20px"})):A("",!0)]),_:1},8,["modelValue"])])]),h(Q,{visible:p.value,"onUpdate:visible":a[2]||(a[2]=e=>p.value=e),data:j.value},null,8,["visible","data"]),l.value.total>0&&!s.value?(g(),V(z,{key:0},[q("div",Y,[h(r,{gutter:[16,12]},{default:m(()=>[(g(!0),V(z,null,x(u.value.slice(l.value.pageSize*(l.value.current-1),l.value.pageSize*l.value.current),e=>(g(),c(i,{key:e.index,lg:4,xs:6,xl:3},{default:m(()=>[h(n,{class:"list-card-item",product:e,onDeleteItem:P,onManageProduct:I},null,8,["product"])]),_:2},1024))),128))]),_:1})]),q("div",J,[h(v,{modelValue:l.value.current,"onUpdate:modelValue":a[3]||(a[3]=e=>l.value.current=e),"page-size":l.value.pageSize,"onUpdate:pageSize":a[4]||(a[4]=e=>l.value.pageSize=e),total:l.value.total,"page-size-options":[12,24,36],onPageSizeChange:k,onCurrentChange:O},null,8,["modelValue","page-size","total"])])],64)):s.value?(g(),V("div",T,[h(S,{size:"large",text:"加载数据中..."})])):A("",!0),h(D,{visible:w.value,"onUpdate:visible":a[5]||(a[5]=e=>w.value=e),header:"确认删除所选产品？",body:b(d),"on-cancel":M,onConfirm:C},null,8,["visible","body"])])}}})),[["__scopeId","data-v-003a87f4"]]);export{X as default};
//# sourceMappingURL=index-9e5b5213.js.map