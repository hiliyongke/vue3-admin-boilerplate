import{d as e,c as d,a as o,y as n,x as l,P as t,o as a,K as i,w as c,bA as s,t as r,s as p,g as u,m as N,e as h,u as v,A as y,I as m,R as b,C as f,E as x,G as I,F as k,r as g,X as _,n as w,H as V}from"./.pnpm-e6c61d32.js";const C={class:"add-node-btn-box"},O={class:"add-node-btn"},M={class:"popover-inner-content"},j=o("button",{class:"btn"},[o("span",null,"+")],-1),F=e({__name:"add-node-btn",props:{node:{type:Object,default:()=>{}},addNode:{type:Function,default:()=>null}},setup(e){const i=e,c=e=>{i.addNode({nodeId:i.node.nodeId,type:e})};return(e,i)=>{const s=t;return a(),d("div",C,[o("div",O,[n(s,null,{content:l(()=>[o("div",M,[o("div",{onClick:i[0]||(i[0]=e=>c("approver"))},"审批人"),o("div",{onClick:i[1]||(i[1]=e=>c("notifier"))},"抄送人"),o("div",{onClick:i[2]||(i[2]=e=>c("branch"))},"条件分支")])]),default:l(()=>[j]),_:1})])])}}}),J={class:"col-box"},S={key:0,class:"top-left-cover-line"},B={key:1,class:"bottom-left-cover-line"},z={class:"condition-node"},L={class:"condition-node-box"},U={class:"auto-judge"},A={class:"title-wrapper"},D={class:"editable-title"},E={class:"priority-title"},G=[o("div",{class:"content"},"请设置条件",-1)],H={key:3,class:"top-right-cover-line"},K={key:4,class:"bottom-right-cover-line"},P=e({__name:"col-box",props:{node:{type:Object,default:()=>null},index:{type:Number},parentLength:{type:Number},addNode:{type:Function,default:()=>null},deleteNode:{type:Function,default:()=>null}},emits:["delBranch"],setup(e,{emit:l}){const t=()=>{};return(u,N)=>(a(),d("div",J,[0===e.index?(a(),d("div",S)):i("",!0),0===e.index?(a(),d("div",B)):i("",!0),o("div",z,[o("div",L,[o("div",U,[o("div",A,[o("span",D,[c(o("input",{"onUpdate:modelValue":N[0]||(N[0]=d=>e.node.name=d),type:"text"},null,512),[[s,e.node.name]])]),o("span",E,"优先级"+r(e.index+1),1),o("span",{class:"svg-icon close",onClick:N[1]||(N[1]=d=>l("delBranch",e.index))}," 删除 ")]),o("div",{class:"content-wrapper",onClick:t},G)]),n(F,{node:e.node,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])])]),e.node&&e.node.childNode?(a(),p(oe,{key:2,node:e.node.childNode,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])):i("",!0),e.index===e.parentLength-1?(a(),d("div",H)):i("",!0),e.index===e.parentLength-1?(a(),d("div",K)):i("",!0)]))}}),R={class:"node-wrap-box"},X=e({__name:"node-wrap-box",props:{node:{type:Object,default:()=>null},deleteNode:{type:Function,default:()=>null}},setup(e){const t=u(!1),c=u({}),s=()=>{t.value=!0,c.value={}};return(u,k)=>{const g=b,_=f,w=x,V=I,C=m;return a(),d("div",R,[o("div",null,[o("div",{class:N(["title",[e.node.type]])},[h(r(e.node.name)+" ",1),o("span",{onClick:k[0]||(k[0]=d=>e.deleteNode(e.node.nodeId))},"删除")],2),o("div",{class:"content",onClick:s}," 所有人 > ")]),n(C,{visible:v(t),"onUpdate:visible":k[1]||(k[1]=e=>y(t)?t.value=e:null),header:e.node.name,width:520,onClose:k[2]||(k[2]=()=>{t.value=!1})},{default:l(()=>[n(V,{ref_key:"ruleForm",ref:c,model:v(c)},{default:l(()=>[n(w,{ref:"name",label:"approver"===e.node.type?"审批人":"抄送人",name:"xx"},{default:l(()=>[n(_,null,{default:l(()=>[n(g,{value:1},{default:l(()=>[h("指定成员")]),_:1}),"notifier"!==e.node.type?(a(),p(g,{key:0,value:2},{default:l(()=>[h(" 指定岗位 ")]),_:1})):i("",!0),n(g,{value:3},{default:l(()=>[h("发起人主管")]),_:1})]),_:1})]),_:1},8,["label"]),n(w,{ref:"name",label:"审批方式",name:"name"},{default:l(()=>[n(_,null,{default:l(()=>[n(g,{value:"a"},{default:l(()=>[h("会审")]),_:1}),n(g,{value:"b"},{default:l(()=>[h("或审")]),_:1})]),_:1})]),_:1},512)]),_:1},8,["model"])]),_:1},8,["visible","header"])])}}}),$={key:0,class:"branch-and-node-wrap"},q={class:"branch-wrap"},Q={class:"branch-wrap-box"},T={class:"branch-box"},W={key:0},Y={key:1,class:"node-wrap"},Z={key:0,class:"branch-wrap-box"},ee={class:"branch-wrap-box"},de={class:"branch-box"},oe=e({__name:"node-main",props:{node:{type:Object,default:()=>null},addNode:{type:Function,default:()=>null},deleteNode:{type:Function,default:()=>null}},setup(e){const l=e,t=e=>{e.conditionNodes.push({name:"条件"+(e.conditionNodes.length+1),type:"condition",prevId:e.nodeId,nodeId:Math.floor((Math.random()+Math.floor(9*Math.random()+1))*Math.pow(10,9))})},c=(e,d)=>{if(e.conditionNodes.length<=2)l.deleteNode(e.nodeId);else if(e.conditionNodes.splice(d,1),e.conditionNodes[d].childNode){const o=e.conditionNodes[d].childNode||null;e.conditionNodes.splice(d,1),!e.conditionNodes[0].childNode&&o&&(e.conditionNodes[0].childNode=o)}};return(l,s)=>{const r=_("node-main",!0);return e.node&&e.node.nodeId&&e.node.childNode&&e.node.conditionNodes?(a(),d("div",$,[o("div",q,[o("div",Q,[o("div",T,[o("button",{class:"add-branch",onClick:s[0]||(s[0]=d=>t(e.node))}," 添加条件 "),(a(!0),d(k,null,g(e.node.conditionNodes,(d,o)=>(a(),p(P,{key:d.nodeId,index:o,node:d,"add-node":e.addNode,"delete-node":e.deleteNode,"parent-length":e.node.conditionNodes.length,onDelBranch:s[1]||(s[1]=d=>c(e.node,d))},null,8,["index","node","add-node","delete-node","parent-length"]))),128))]),n(F,{node:e.node,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])])]),"branch"===e.node.childNode.type?(a(),d("div",W,[n(r,{node:e.node.childNode,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])])):(a(),d("div",Y,[n(X,{node:e.node.childNode,"delete-node":e.deleteNode},null,8,["node","delete-node"]),n(F,{node:e.node.childNode,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"]),e.node.childNode.childNode?(a(),p(r,{key:0,node:e.node.childNode.childNode,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])):i("",!0)]))])):e.node&&e.node.nodeId?(a(),d("div",{key:1,class:N(["branch"===e.node.type?"branch-wrap":"node-wrap"])},["branch"===e.node.type?(a(),d("div",Z,[o("div",ee,[o("div",de,[o("button",{class:"add-branch",onClick:s[2]||(s[2]=d=>t(e.node))}," 添加条件 "),(a(!0),d(k,null,g(e.node.conditionNodes,(d,o)=>(a(),p(P,{key:d.nodeId,index:o,node:d,"parent-length":e.node.conditionNodes.length,"add-node":e.addNode,"delete-node":e.deleteNode,onDelBranch:s[3]||(s[3]=d=>c(e.node,d))},null,8,["index","node","parent-length","add-node","delete-node"]))),128))]),n(F,{node:e.node,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])])])):(a(),p(X,{key:1,node:e.node,"delete-node":e.deleteNode},null,8,["node","delete-node"])),"branch"!==e.node.type?(a(),p(F,{key:2,node:e.node,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])):i("",!0),e.node.childNode?(a(),p(r,{key:3,node:e.node.childNode,"add-node":e.addNode,"delete-node":e.deleteNode},null,8,["node","add-node","delete-node"])):i("",!0)],2)):i("",!0)}}}),ne={class:"container"},le={style:{position:"absolute",right:"40px","z-index":"100"}},te={class:"node-wrap"},ae={class:"node-wrap-box"},ie={class:"title"},ce=o("div",{class:"content"},"所有人 >",-1),se=o("div",{class:"end-node"},[o("div",{class:"end-node-circle"}),o("div",{class:"end-node-text"},"流程结束")],-1),re={class:"submit"},pe=e({__name:"index",props:{modelValue:{type:Object,default:()=>{}}},emits:["input"],setup(e,{emit:t}){const c=e,s=()=>Math.floor((Math.random()+Math.floor(9*Math.random()+1))*Math.pow(10,9)),N=u(100),y=u("5"),m=e=>{let d=N.value+e;d>0&&d<=200&&(N.value=d)},b=()=>{g(c.modelValue)},f=e=>{I(c.modelValue,e.nodeId,d=>{if("branch"===e.type){const o=s(),n=[];for(let e=0;e<2;e++)n.push({name:"条件"+(e+1),type:"condition",prevId:o,nodeId:s()});d.childNode={type:e.type,prevId:d.nodeId,nodeId:o,conditionNodes:n},t("input",JSON.parse(JSON.stringify(c.modelValue)))}else{const o={type:e.type,name:"approver"===e.type?"审批人":"抄送人",prevId:d.nodeId,nodeId:s()};d.childNode&&(o.childNode=Object.assign({},d.childNode)),d.childNode=o,t("input",JSON.parse(JSON.stringify(c.modelValue)))}})},x=e=>{k(c.modelValue,e),t("input",JSON.parse(JSON.stringify(c.modelValue)))},I=(e,d,o)=>{"branch"===e.type?(e.nodeId===d?o(e):e.childNode&&I(e.childNode,d,o),e.conditionNodes.map(e=>{e.nodeId===d?o(e):e.childNode&&I(e.childNode,d,o)})):e.nodeId===d?o(e):e.childNode&&I(e.childNode,d,o)},k=(e,d)=>{if(e.childNode){if(e.childNode.conditionNodes)for(let o in e.childNode.conditionNodes)k(e.childNode.conditionNodes[o],d);if(e.childNode.nodeId===d){var o=e.childNode.childNode||null;delete e.childNode,o&&(e.childNode=o)}else k(e.childNode,d)}},g=e=>{if(e.childNode){if(e.childNode.conditionNodes)for(let d in e.childNode.conditionNodes)g(e.childNode.conditionNodes[d]);g(e.childNode)}};return(t,c)=>{const s=V;return a(),d("div",null,[o("div",ne,[o("div",le,[o("button",{style:{width:"50px",height:"50px","font-size":"30px","background-color":"grey","border-radius":"25px"},onClick:c[0]||(c[0]=e=>m(+v(y)))}," + "),o("button",{style:{width:"50px",height:"50px","font-size":"30px","background-color":"grey","border-radius":"25px"},onClick:c[1]||(c[1]=e=>m(-v(y)))}," - ")]),o("div",{style:w(`transform: scale(${v(N)/100})`)},[o("div",te,[o("div",ae,[o("div",null,[o("div",ie,r(e.modelValue&&e.modelValue.name),1),ce])]),n(F,{node:e.modelValue,"add-node":f},null,8,["node"])]),e.modelValue&&e.modelValue.childNode?(a(),p(oe,{key:0,node:e.modelValue.childNode,"add-node":f,"delete-node":x},null,8,["node"])):i("",!0),se,o("div",re,[n(s,{onClick:b},{default:l(()=>[h("预览")]),_:1})])],4)])])}}}),ue=e({__name:"index",setup(e){const d=u({name:"发起人",type:"start",nodeId:-1,childNode:{type:"branch",prevId:-1,nodeId:1962370654,conditionNodes:[{name:"条件1",type:"condition",prevId:1962370654,nodeId:8724388758},{name:"条件2",type:"condition",prevId:1962370654,nodeId:6955647539,childNode:{type:"branch",prevId:6955647539,nodeId:6579100235,conditionNodes:[{name:"条件1",type:"condition",prevId:6579100235,nodeId:7943358411},{name:"条件2",type:"condition",prevId:6579100235,nodeId:9245914757}],childNode:{type:"approver",name:"审批人",prevId:6579100235,nodeId:2573062896}}}]}});return(e,o)=>(a(),p(pe,{modelValue:v(d),"onUpdate:modelValue":o[0]||(o[0]=e=>y(d)?d.value=e:null)},null,8,["modelValue"]))}});export{ue as default};
//# sourceMappingURL=index-318b2122.js.map