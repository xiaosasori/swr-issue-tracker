import{Q as w,i as O,h as R,a as E,u as U,t as Q,b as D,o,c as l,d as i,F as P,e as d,f as v,g as $,r as j,p as A,j as C,n as I,k,l as x,m as y,_ as F,q as L,s as B,v as N,w as S,x as T,y as z,z as H,A as V,B as q,C as J,D as G,E as K,G as W,H as X,I as Y,L as Z}from"./index.4b3ec211.js";import{u as M}from"./useMutation.esm.a0bf0af9.js";class ee extends w{constructor(e,s){super(e,s)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,s){super.setOptions({...e,behavior:O()},s)}getOptimisticResult(e){return e.behavior=O(),super.getOptimisticResult(e)}fetchNextPage({pageParam:e,...s}={}){return this.fetch({...s,meta:{fetchMore:{direction:"forward",pageParam:e}}})}fetchPreviousPage({pageParam:e,...s}={}){return this.fetch({...s,meta:{fetchMore:{direction:"backward",pageParam:e}}})}createResult(e,s){var a,u,t,h,_,f;const{state:c}=e,b=super.createResult(e,s),{isFetching:r,isRefetching:m}=b,g=r&&((a=c.fetchMeta)==null||(u=a.fetchMore)==null?void 0:u.direction)==="forward",p=r&&((t=c.fetchMeta)==null||(h=t.fetchMore)==null?void 0:h.direction)==="backward";return{...b,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:R(s,(_=c.data)==null?void 0:_.pages),hasPreviousPage:E(s,(f=c.data)==null?void 0:f.pages),isFetchingNextPage:g,isFetchingPreviousPage:p,isRefetching:m&&!g&&!p}}}function se(n,e,s){const a=U(ee,n,e,s);return{...a,fetchNextPage:a.fetchNextPage.value,fetchPreviousPage:a.fetchPreviousPage.value,refetch:a.refetch.value,remove:a.remove.value}}const te={class:"comment"},ne={key:0},ae=d("div",{class:"comment-header"},"Loading...",-1),ie=[ae],re=["src"],oe={class:"comment-header"},ue={class:"comment-body"},ce={__name:"Comment",props:{comment:String,createdBy:String,createdDate:String},setup(n){const s=Q(n,"createdBy"),{isLoading:a,data:u}=D(s);return(t,h)=>(o(),l("div",te,[i(a)?(o(),l("div",ne,ie)):(o(),l(P,{key:1},[d("img",{src:i(u).profilePictureUrl,alt:"Commenter Avatar"},null,8,re),d("div",null,[d("div",oe,[d("span",null,v(i(u).name),1),$(" commented\xA0 "),d("span",null,v(i(j)(n.createdDate)),1)]),d("div",ue,v(n.comment),1)])],64))]))}},le={class:"created-by"},de={__name:"IssueHeader",props:{title:String,number:Number,status:{type:String,default:"todo"},createdBy:String,createdDate:String,comments:Array},setup(n){const e=n,s=A.find(h=>h.id===e.status),a=Q(e,"createdBy"),{isLoading:u,data:t}=D(a);return(h,_)=>{var c;const f=C("Icon");return o(),l("header",null,[d("h2",null,[$(v(n.title)+" ",1),d("span",null,"#"+v(n.number),1)]),d("div",null,[d("span",{class:I([n.status==="done"||n.status==="cancelled"?"closed":"open"])},[n.status==="done"||n.status==="cancelled"?(o(),k(f,{key:0,icon:"octicon:issue-closed-16"})):(o(),k(f,{key:1,icon:"octicon:issue-opened-16"})),$(" "+v(i(s).label),1)],2),d("span",le,v(i(u)?"...":(c=i(t))==null?void 0:c.name),1),$(" opened this issue "+v(i(j)(n.createdDate))+" \xB7 "+v(n.comments.length)+" comments ",1)])])}}},me={class:"issue-options"},he=d("span",null,"Status",-1),ge={__name:"IssueStatus",props:{status:String,issueNumber:String},setup(n){const e=n,s=x(),{mutate:a}=M(u=>fetch(`/api/issues/${e.issueNumber}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({status:u})}).then(t=>t.json()),{onMutate:u=>{const t=s.getQueryData(["issues",e.issueNumber]).status;return s.setQueryData(["issues",e.issueNumber],h=>({...h,status:u})),function(){s.setQueryData(["issues",e.issueNumber],_=>({..._,status:t}))}},onError:(u,t,h)=>{h()},onSettled:()=>{s.invalidateQueries(["issues",e.issueNumber],{exact:!0})}});return(u,t)=>(o(),l("div",me,[d("div",null,[he,y(F,{noEmptyOption:"",value:n.status,onChange:t[0]||(t[0]=h=>i(a)(h.target.value))},null,8,["value"])])]))}},fe={class:"issue-options"},be=d("span",null,"Assignment",-1),pe={key:0},_e=["src"],ve={key:0,class:"picker-menu"},ye=["onClick"],Pe=["src"],$e={__name:"IssueAssignment",props:{assignee:String,issueNumber:String},setup(n){const e=n,s=Q(e,"assignee"),{data:a,isSuccess:u}=D(s),t=L(!1),{data:h,isLoading:_}=B(["users"],()=>fetch("/api/users").then(r=>r.json())),f=x(),{mutate:c}=M(r=>fetch(`/api/issues/${e.issueNumber}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({assignee:r})}).then(m=>m.json()),{onMutate:r=>{const m=f.getQueryData(["issues",e.issueNumber]).assignee;return f.setQueryData(["issues",e.issueNumber],g=>({...g,assignee:r})),function(){f.setQueryData(["issues",e.issueNumber],p=>({...p,assignee:m}))}},onError:(r,m,g)=>{g()},onSettled:()=>{f.invalidateQueries(["issues",e.issueNumber],{exact:!0})}});function b(){_.value||(t.value=!t.value)}return(r,m)=>{const g=C("Icon");return o(),l("div",fe,[d("div",null,[be,i(u)?(o(),l("div",pe,[d("img",{src:i(a).profilePictureUrl},null,8,_e),$(" "+v(i(a).name),1)])):N("",!0)]),y(g,{icon:"ep:setting",onClick:b}),t.value?(o(),l("div",ve,[(o(!0),l(P,null,S(i(h),p=>(o(),l("div",{key:p.id,onClick:Be=>i(c)(p.id)},[d("img",{src:p.profilePictureUrl},null,8,Pe),$(" "+v(p.name),1)],8,ye))),128))])):N("",!0)])}}},Ne={class:"issue-options"},ke=d("span",null,"Labels",-1),Se=["set"],Le={key:0,class:"picker-menu labels"},Ie=["set","onClick"],Qe={__name:"IssueLabels",props:{labels:Array,issueNumber:String},setup(n){const e=n,{data:s,isLoading:a}=T(),u=L(!1),t=x(),{mutate:h}=M(c=>{const b=e.labels.includes(c)?e.labels.filter(r=>r!==c):[...e.labels,c];return t.setQueryData(["issues",e.issueNumber],r=>({...r,labels:b})),fetch(`/api/issues/${e.issueNumber}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({labels:b})}).then(r=>r.json())},{onMutate:()=>{const c=t.getQueryData(["issues",e.issueNumber]).labels;return function(){t.setQueryData(["issues",e.issueNumber],r=>({...r,labels:c}))}},onError:(c,b,r)=>{r()},onSettled:()=>{}});function _(c){return s.value.find(b=>b.id===c)}function f(){a.value||(u.value=!u.value)}return(c,b)=>{const r=C("Icon");return o(),l("div",Ne,[d("div",null,[ke,i(a)?N("",!0):(o(!0),l(P,{key:0},S(n.labels,m=>(o(),l("div",{key:m,set:c.labelObject=_(m)},[c.labelObject?(o(),l("span",{key:0,class:I(["label",c.labelObject.color])},v(c.labelObject.name),3)):N("",!0)],8,Se))),128))]),y(r,{icon:"ep:setting",onClick:f}),u.value?(o(),l("div",Le,[(o(!0),l(P,null,S(i(s),m=>(o(),l("div",{key:m.id,set:c.selected=n.labels.includes(m.id),class:I({selected:c.selected}),onClick:g=>i(h)(m.id)},[d("span",{class:"label-dot",style:z({backgroundColor:m.color})},null,4),$(" "+v(m.name),1)],10,Ie))),128))])):N("",!0)])}}},De=(n,e={},s)=>{let a=null;const u=L(!1);return H(()=>{const t=i(n);if(!(t instanceof HTMLElement))throw new Error("useIntersectionObserver: ref.value is not an HTMLElement");const h=_=>{_.forEach(f=>{u.value=f.isIntersecting,typeof s=="function"&&s(f)})};a=new IntersectionObserver(h,e),a.observe(t)}),V(()=>{a==null||a.disconnect()}),{isIntersecting:u,observer:a}},Ce=q({name:"InfiniteLoad",emits:["infinite-load"],setup(n,{emit:e}){const s=L(),{isIntersecting:a}=De(s);return J(a,u=>{u&&e("infinite-load")}),()=>G("div",{ref:s})}}),xe={class:"issue-details"},Me={key:0},Oe={key:0},je={__name:"IssueDetails",setup(n){function e(r){return B(["issues",r],({signal:m})=>fetch(`/api/issues/${r}`,{signal:m}).then(g=>g.json()))}function s(r){return se(["issues",r,"comments"],({signal:m,pageParam:g=1})=>fetch(`/api/issues/${r}/comments?page=${g}`,{signal:m}).then(p=>p.json()),{getNextPageParam:(m,g)=>{if(m.length!==0)return g.length+1}})}const u=K().params.id,{data:t,isLoading:h}=e(u),{data:_,isLoading:f,isFetchingNextPage:c,fetchNextPage:b}=s(u);return(r,m)=>(o(),l("div",xe,[i(h)?(o(),l("p",Me,"Loading issue...")):(o(),l(P,{key:1},[y(de,W(X({...i(t)})),null,16),d("main",null,[d("section",null,[i(f)?(o(),l("p",Oe,"Loading...")):(o(!0),l(P,{key:1},S(i(_).pages,g=>(o(),l(P,null,[(o(!0),l(P,null,S(g,p=>(o(),k(ce,Y({key:p.id},{...p}),null,16))),128))],64))),256)),y(Ce,{class:"fixed bottom-20",onInfiniteLoad:i(b)},null,8,["onInfiniteLoad"]),i(c)?(o(),k(Z,{key:2})):N("",!0)]),d("aside",null,[y(ge,{status:i(t).status,issueNumber:i(t).number.toString()},null,8,["status","issueNumber"]),y($e,{assignee:i(t).assignee,issueNumber:i(t).number.toString()},null,8,["assignee","issueNumber"]),y(Qe,{labels:i(t).labels,issueNumber:i(t).number.toString()},null,8,["labels","issueNumber"])])])],64))]))}},Ee={__name:"Issue",setup(n){return(e,s)=>(o(),k(je))}};export{Ee as default};