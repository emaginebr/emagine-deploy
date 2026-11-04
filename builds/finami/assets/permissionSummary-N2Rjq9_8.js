import{s as a,d as i,bm as o}from"./index-BGhcEdBo.js";/**
 * @license lucide-react v1.66.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t={name:"user-check",size:24,node:[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};t.node;const u=a(t);/**
 * @license lucide-react v1.66.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r={name:"user-plus",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]};r.node;const y=a(r),m=()=>{const e=i.useContext(o);if(!e)throw new Error("useInvitation must be used within an InvitationProvider");return e},p=(e,n)=>{const s=[];return n.canCreateTransactions&&s.push(e("groups.permissions.create")),n.canReverse&&s.push(e("groups.permissions.reverse")),s.length>0?s:[e("groups.permissions.readOnly")]},v=(e,n)=>!n.canCreateTransactions&&!n.canReverse?[e("notifications.permissionSummary.readOnly")]:[e(n.canCreateTransactions?"notifications.permissionSummary.canCreate":"notifications.permissionSummary.cannotCreate"),e(n.canReverse?"notifications.permissionSummary.canReverse":"notifications.permissionSummary.cannotReverse")];export{u as U,y as a,v as n,p,m as u};
