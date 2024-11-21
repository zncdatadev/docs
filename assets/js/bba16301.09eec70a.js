"use strict";(self.webpackChunkkubedoop=self.webpackChunkkubedoop||[]).push([[241],{2319:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"developer-manual/first-commiter","title":"\u7b2c\u4e00\u6b21\u8d21\u732e","description":"\u5982\u679c\u4f60\u662f\u7b2c\u4e00\u6b21\u5728 Github \u4e0a\u8d21\u732e\u4ee3\u7801\uff0c\u8bf7\u53c2\u8003\u5982\u4e0b\u6b65\u9aa4\u5feb\u901f\u5f00\u59cb\uff1a","source":"@site/docs/developer-manual/first-commiter.md","sourceDirName":"developer-manual","slug":"/developer-manual/first-commiter","permalink":"/docs/developer-manual/first-commiter","draft":false,"unlisted":false,"editUrl":"https://github.com/zncdatadev/docs/docs/developer-manual/first-commiter.md","tags":[],"version":"current","lastUpdatedBy":"whg517","lastUpdatedAt":1732180193000,"frontMatter":{},"sidebar":"docs","previous":{"title":"\u6587\u6863\u7f16\u5199\u6307\u5357","permalink":"/docs/developer-manual/document-guideline"},"next":{"title":"operator-sdk","permalink":"/docs/reference/operator-sdk"}}');var c=s(4848),l=s(8453);const i={},d="\u7b2c\u4e00\u6b21\u8d21\u732e",t={},a=[{value:"Fork \u9879\u76ee",id:"fork-\u9879\u76ee",level:2},{value:"\u83b7\u53d6\u6700\u65b0\u6e90\u4ee3\u7801",id:"\u83b7\u53d6\u6700\u65b0\u6e90\u4ee3\u7801",level:2},{value:"\u521b\u5efa\u5206\u652f",id:"\u521b\u5efa\u5206\u652f",level:2},{value:"\u5408\u5e76\u4fee\u6539",id:"\u5408\u5e76\u4fee\u6539",level:2},{value:"\u63d0\u4ea4 Pull Request",id:"\u63d0\u4ea4-pull-request",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"\u7b2c\u4e00\u6b21\u8d21\u732e",children:"\u7b2c\u4e00\u6b21\u8d21\u732e"})}),"\n",(0,c.jsx)(n.p,{children:"\u5982\u679c\u4f60\u662f\u7b2c\u4e00\u6b21\u5728 Github \u4e0a\u8d21\u732e\u4ee3\u7801\uff0c\u8bf7\u53c2\u8003\u5982\u4e0b\u6b65\u9aa4\u5feb\u901f\u5f00\u59cb\uff1a"}),"\n",(0,c.jsx)(n.h2,{id:"fork-\u9879\u76ee",children:"Fork \u9879\u76ee"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u9996\u5148\u9700\u8981fork\u8fd9\u4e2a\u9879\u76ee, \u8fdb\u5165\u9879\u76ee\u9875\u9762, \u70b9\u51fb\u53f3\u4e0a\u89d2\u7684Fork\u6309\u94ae"}),"\n",(0,c.jsxs)(n.li,{children:["\u4f60\u7684 github \u5e10\u53f7\u4e2d\u4f1a\u51fa\u73b0\u76f8\u5e94\u540d\u79f0\u7684\u9879\u76ee, \u4f8b\u5982: ",(0,c.jsx)(n.code,{children:"zncdata-stack"})]}),"\n",(0,c.jsx)(n.li,{children:"\u5728\u672c\u5730\u7535\u8111(Linux)\u4e0a\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u514b\u9686\u9879\u76ee\u5230\u672c\u5730"}),"\n"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/<your_name>/zncdata-stack\n"})}),"\n",(0,c.jsx)(n.h2,{id:"\u83b7\u53d6\u6700\u65b0\u6e90\u4ee3\u7801",children:"\u83b7\u53d6\u6700\u65b0\u6e90\u4ee3\u7801"}),"\n",(0,c.jsx)(n.p,{children:"\u5c06\u672c\u5730\u4e2a\u4eba\u4ed3\u5e93\u548c\u4e0a\u6e38\u4ed3\u5e93\u5173\u8054"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git remote add upstream https://github.com/zncdata.dev/zncdata-stack\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u540c\u6b65\u6700\u65b0\u6e90\u4ee3\u7801"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git pull upstream main\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u73b0\u5728\u6211\u4eec\u5728 fork \u6765\u7684 ",(0,c.jsx)(n.code,{children:"main"})," \u5206\u652f\u4e0a, \u8fd9\u4e2a ",(0,c.jsx)(n.code,{children:"main"})," \u7559\u4f5c\u8ddf\u8e2a ",(0,c.jsx)(n.code,{children:"upstream"})," \u7684\u8fdc\u7a0b\u4ee3\u7801"]}),"\n",(0,c.jsx)(n.h2,{id:"\u521b\u5efa\u5206\u652f",children:"\u521b\u5efa\u5206\u652f"}),"\n",(0,c.jsx)(n.p,{children:"\u73b0\u5728\u5f00\u59cb\u5728\u672c\u5730\u5f00\u53d1\uff0c\u5e76\u51c6\u5907\u8d21\u732e\u4ee3\u7801\u3002"}),"\n",(0,c.jsxs)(n.p,{children:["\u6309\u7167\u56fd\u9645\u60ef\u4f8b\uff0c\u6211\u4eec\u4e00\u822c\u4e0d\u5728 ",(0,c.jsx)(n.code,{children:"main"})," \u5206\u652f\u4e0a\u5f00\u53d1\uff0c\u800c\u662f\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5206\u652f\uff0c\u7136\u540e\u5728\u65b0\u7684\u5206\u652f\u4e0a\u5f00\u53d1\uff0c\u5f00\u53d1\u5b8c\u6210\u540e\u518d\u5408\u5e76\u5230 ",(0,c.jsx)(n.code,{children:"main"})," \u5206\u652f\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u9996\u5148\u660e\u786e\u6211\u4eec\u8981\u4e0d\u8d21\u732e\u7684\u4ee3\u7801\u662f\u4e00\u4e2a\u65b0\u7684\u529f\u80fd\u7279\u6027\u8fd8\u662f\u4fee\u590d\u4e00\u4e2a bug \u3002\u5982\u679c\u662f\u65b0\u589e\u4e00\u4e2a\u529f\u80fd\u7279\u6027\uff0c\u9700\u8981\u521b\u5efa\u4e00\u4e2a\u57fa\u4e8e ",(0,c.jsx)(n.code,{children:"feature/"})," \u5f00\u5934\u7684\n\u5206\u652f\uff0c\u5982\u679c\u662f\u4fee\u590d\u4e00\u4e2a bug \uff0c\u5728\u521b\u5efa\u4e00\u4e2a\u57fa\u4e8e ",(0,c.jsx)(n.code,{children:"fix/"})," \u5f00\u5934\u7684\u5206\u652f\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git checkout -b fix/foo-error\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u7136\u540e\u5728\u8fd9\u4e2a\u5206\u652f\u4e0a\u8fdb\u884c\u4ee3\u7801\u5f00\u53d1\uff0c\u5e76\u5728\u5f00\u53d1\u5b8c\u6210\u540e\u63d0\u4ea4\u4ee3\u7801\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'git commit -a -m "fix: foo error"\n'})}),"\n",(0,c.jsx)(n.h2,{id:"\u5408\u5e76\u4fee\u6539",children:"\u5408\u5e76\u4fee\u6539"}),"\n",(0,c.jsx)(n.p,{children:"\u4e00\u4e2a\u5e38\u89c1\u7684\u95ee\u9898\u662f\u8fdc\u7a0b\u7684 upstream (swoole/swoole-src) \u6709\u4e86\u65b0\u7684\u66f4\u65b0, \u4ece\u800c\u4f1a\u5bfc\u81f4\u6211\u4eec\u63d0\u4ea4\u7684 Pull Request \u65f6\u4f1a\u5bfc\u81f4\u51b2\u7a81, \u56e0\u6b64\u6211\u4eec\u53ef\u4ee5\u5728\u63d0\u4ea4\u524d\u5148\u628a\u8fdc\u7a0b\u5176\u4ed6\u5f00\u53d1\u8005\u7684commit\u548c\u6211\u4eec\u7684commit\u5408\u5e76."}),"\n",(0,c.jsxs)(n.p,{children:["\u9996\u5148\u6211\u4eec\u9700\u8981\u5207\u6362\u5230 ",(0,c.jsx)(n.code,{children:"main"})," \u5206\u652f, \u7136\u540e\u540c\u6b65\u6700\u65b0\u7684\u4ee3\u7801"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git checkout main\ngit pull upstream main\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u7136\u540e\u5207\u6362\u56de\u6211\u4eec\u7684\u5f00\u53d1\u5206\u652f, \u5e76\u5408\u5e76 ",(0,c.jsx)(n.code,{children:"main"})," \u5206\u652f"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git checkout fix/foo-error\ngit rebase main\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u5982\u679c\u6709\u51b2\u7a81, \u8bf7\u89e3\u51b3\u51b2\u7a81, \u7136\u540e\u7ee7\u7eed\u5408\u5e76"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git add .\ngit rebase --continue\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u6700\u540e\u63d0\u4ea4\u4ee3\u7801"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"git push origin fix/foo-error\n"})}),"\n",(0,c.jsx)(n.h2,{id:"\u63d0\u4ea4-pull-request",children:"\u63d0\u4ea4 Pull Request"}),"\n",(0,c.jsxs)(n.p,{children:["\u5728 Github \u7684\u9879\u76ee\u4e2d\uff0c\u5207\u6362\u5230\u521a\u521a\u63a8\u9001\u7684\u5206\u652f\uff0c\u70b9\u51fb ",(0,c.jsx)(n.code,{children:"Pull Request"})," \u6309\u94ae\uff0c\u586b\u5199\u76f8\u5e94\u7684\u4fe1\u606f\uff0c\u7136\u540e\u63d0\u4ea4 Pull Request\u3002"]})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>d});var r=s(6540);const c={},l=r.createContext(c);function i(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);