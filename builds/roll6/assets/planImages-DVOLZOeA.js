const s="roll6-image:",c=(t,n="")=>`![${n.replace(/[[\]]/g,"")}](${s}${t})`,h=(t,n)=>!t||!t.startsWith(s)?t:n[t.slice(s.length)],g=(t,n,o)=>{const l=Math.max(0,Math.min(n,t.length)),e=t.slice(0,l),a=t.slice(l),r=e.length===0||e.endsWith(`
`)?"":`
`,i=a.length===0||a.startsWith(`
`)?"":`
`;return`${e}${r}${o}${i}${a}`};export{g as i,c as p,h as r};
