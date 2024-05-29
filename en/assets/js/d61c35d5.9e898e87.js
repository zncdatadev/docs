"use strict";(self.webpackChunkzncdata_stack=self.webpackChunkzncdata_stack||[]).push([[476],{8585:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>c,metadata:()=>t,toc:()=>o});var s=l(4848),i=l(8453);const c={},r="\u534f\u4f5c\u6307\u5357",t={id:"developer-manual/collaboration",title:"\u534f\u4f5c\u6307\u5357",description:"\u672c\u6587\u4f1a\u6307\u5bfc\u4f60\u5982\u4f55\u4e3a ZNCData Labs \u8d21\u732e\u4e00\u4efd\u81ea\u5df1\u7684\u529b\u91cf\uff0c\u5728\u8d21\u732e\u4ee3\u7801\u4e4b\u524d\uff0c\u8bf7\u82b1\u70b9\u65f6\u95f4\u9605\u8bfb\u4e00\u4e0b\u7ec6\u8282\u3002",source:"@site/docs/developer-manual/collaboration.md",sourceDirName:"developer-manual",slug:"/developer-manual/collaboration",permalink:"/en/docs/developer-manual/collaboration",draft:!1,unlisted:!1,editUrl:"https://github.com/zncdatadev/docs/docs/developer-manual/collaboration.md",tags:[],version:"current",lastUpdatedBy:"whg517",lastUpdatedAt:1716979514e3,frontMatter:{},sidebar:"docs",previous:{title:"spark-k8s-operator",permalink:"/en/docs/operators/spark-k8s-operator"},next:{title:"\u5f00\u53d1\u6307\u5357",permalink:"/en/docs/developer-manual/develop-guideline"}},d={},o=[{value:"\u884c\u4e3a\u51c6\u5219",id:"\u884c\u4e3a\u51c6\u5219",level:2},{value:"\u5206\u652f\u7ba1\u7406",id:"\u5206\u652f\u7ba1\u7406",level:2},{value:"\u7b2c\u4e00\u6b21\u8d21\u732e",id:"\u7b2c\u4e00\u6b21\u8d21\u732e",level:2},{value:"Pull Request",id:"pull-request",level:2},{value:"\u63d0\u4ea4\u4fe1\u606f\u89c4\u8303",id:"\u63d0\u4ea4\u4fe1\u606f\u89c4\u8303",level:2},{value:"\u63d0\u4ea4\u4fe1\u606f\u683c\u5f0f",id:"\u63d0\u4ea4\u4fe1\u606f\u683c\u5f0f",level:3},{value:"\u8303\u56f4\uff08scope\uff09",id:"\u8303\u56f4scope",level:4},{value:"\u7c7b\u578b\uff08type\uff09",id:"\u7c7b\u578btype",level:4},{value:"\u4e3b\u9898 \uff08subject\uff09",id:"\u4e3b\u9898-subject",level:4},{value:"\u6b63\u6587\uff08body\uff09",id:"\u6b63\u6587body",level:4},{value:"\u9875\u811a\uff08footer\uff09",id:"\u9875\u811afooter",level:4}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"\u534f\u4f5c\u6307\u5357",children:"\u534f\u4f5c\u6307\u5357"}),"\n",(0,s.jsx)(n.p,{children:"\u672c\u6587\u4f1a\u6307\u5bfc\u4f60\u5982\u4f55\u4e3a ZNCData Labs \u8d21\u732e\u4e00\u4efd\u81ea\u5df1\u7684\u529b\u91cf\uff0c\u5728\u8d21\u732e\u4ee3\u7801\u4e4b\u524d\uff0c\u8bf7\u82b1\u70b9\u65f6\u95f4\u9605\u8bfb\u4e00\u4e0b\u7ec6\u8282\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u884c\u4e3a\u51c6\u5219",children:"\u884c\u4e3a\u51c6\u5219"}),"\n",(0,s.jsxs)(n.p,{children:["\u6211\u4eec\u6709\u4e00\u4efd",(0,s.jsx)(n.a,{href:"https://github.com/zncdata.dev/zncdata-stack.git/CODE_OF_CONDUCT.md",children:"\u884c\u4e3a\u51c6\u5219"}),"\uff0c\u5e0c\u671b\u6240\u6709\u7684\u8d21\u732e\u8005\u90fd\u80fd\u9075\u5b88\uff0c\u8bf7\u82b1\u65f6\u95f4\u9605\u8bfb\u4e00\u904d\u5168\u6587\u4ee5\u786e\u4fdd\u4f60\u80fd\u660e\u767d\u54ea\u4e9b\u662f\u53ef\u4ee5\u505a\u7684\uff0c\u54ea\u4e9b\u662f\u4e0d\u53ef\u4ee5\u505a\u7684\u3002"]}),"\n",(0,s.jsx)(n.h2,{id:"\u5206\u652f\u7ba1\u7406",children:"\u5206\u652f\u7ba1\u7406"}),"\n",(0,s.jsxs)(n.p,{children:["\u6211\u4eec\u957f\u671f\u7ef4\u62a4\u4e3b\u5206\u652f\uff08",(0,s.jsx)(n.code,{children:"main"}),"\uff09\u548c\u53d1\u5e03\u5206\u652f\uff08",(0,s.jsx)(n.code,{children:"release-x.x"}),"\uff09\u3002\u4e3b\u5206\u652f\u662f\u6700\u65b0\u7684\u4ee3\u7801\uff0c\u6211\u4eec\u4f1a\u4e0d\u5b9a\u671f\u5c06\u65b0\u7279\u6027\u548c\u529f\u80fd\u5408\u5e76\u5230\u4e3b\u5206\u652f\uff0c\u6240\u4ee5\u4e3b\u5206\u652f\u4f1a\u6709\u4e00\u4e9b BUG \u548c\u4e0d\u7a33\u5b9a\u7684\u5730\u65b9\u3002\n\u5f53\u4e3b\u5206\u652f\u7ecf\u5386\u4e00\u4e2a\u9636\u6bb5\u7684\u529f\u80fd\u79ef\u7d2f\u65f6\uff0c\u6216\u8005\u5728\u53d1\u5e03\u8def\u7ebf\u56fe\u4e2d\u7684\u67d0\u4e2a\u65f6\u673a\u70b9\uff0c\u6211\u4eec\u4f1a\u4ece\u4e3b\u5206\u652f\u5207\u51fa\u4e00\u4e2a\u65b0\u7684\u53d1\u5e03\u5206\u652f\uff0c\u5e76\u5728\u53d1\u5e03\u5206\u652f\u4e0a\u8fdb\u884c\u6d4b\u8bd5\u548c\u4fee\u590d BUG\uff0c\u76f4\u5230\u53d1\u5e03\u5206\u652f\u7a33\u5b9a\u540e\uff0c\n\u6211\u4eec\u4f1a\u5c06\u53d1\u5e03\u5206\u652f\u5408\u5e76\u5230\u4e3b\u5206\u652f\uff0c\u5e76\u53d1\u5e03\u4e00\u4e2a\u65b0\u7684\u7248\u672c\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u5728\u8d21\u732e\u4ee3\u7801\u4e4b\u524d\u8bf7\u786e\u5b9a\u4f60\u662f\u4fee\u590d\u67d0\u4e00\u4e2a\u7248\u672c\u7684 BUG\uff0c\u8fd8\u662f\u5728\u5f00\u53d1\u65b0\u7684\u529f\u80fd\u3002\u5982\u679c\u4fee\u590d BUG\uff0c\u8bf7\u57fa\u4e8e ",(0,s.jsx)(n.code,{children:"fix/"})," \u524d\u7f00\u5206\u652f\u5f00\u53d1\u540e\u5408\u5e76\u5230\u8be5\u7248\u672c\u7684\u53d1\u5e03\u5206\u652f\u3002\u6211\u4eec\u4f1a\u5728\u5408\u9002\u7684\u65f6\u95f4\u53d1\u5e03 ",(0,s.jsx)(n.code,{children:"patch"})," \u7248\u672c\u3002\n\u5982\u679c\u662f\u5f00\u53d1\u65b0\u7684\u529f\u80fd\uff0c\u8bf7\u57fa\u4e8e ",(0,s.jsx)(n.code,{children:"feature/"})," \u524d\u7f00\u5206\u652f\u5f00\u53d1\u540e\u5408\u5e76\u5230\u4e3b\u5206\u652f\u3002"]}),"\n",(0,s.jsx)(n.h2,{id:"\u7b2c\u4e00\u6b21\u8d21\u732e",children:"\u7b2c\u4e00\u6b21\u8d21\u732e"}),"\n",(0,s.jsxs)(n.p,{children:["\u5982\u679c\u4f60\u662f\u7b2c\u4e00\u6b21\u8d21\u732e\u4ee3\u7801\uff0c\u8bf7\u53c2\u8003",(0,s.jsx)(n.a,{href:"/en/docs/developer-manual/first-commiter",children:"\u7b2c\u4e00\u6b21\u8d21\u732e"})," \u5feb\u901f\u5f00\u59cb\u3002"]}),"\n",(0,s.jsx)(n.h2,{id:"pull-request",children:"Pull Request"}),"\n",(0,s.jsxs)(n.p,{children:["\u6211\u4eec\u4f7f\u7528 Pull Request \u6765\u8fdb\u884c\u4ee3\u7801\u7684\u5408\u5e76\uff0c\u5982\u679c\u4f60\u4e0d\u719f\u6089 Pull Request \u7684\u4f7f\u7528\uff0c\u8bf7\u53c2\u8003 ",(0,s.jsx)(n.a,{href:"https://docs.github.com/cn/github/collaborating-with-issues-and-pull-requests/about-pull-requests",children:"Github \u5b98\u65b9\u6587\u6863"}),"\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"\u6211\u4eec\u4f1a\u53ca\u65f6\u5173\u6ce8 Pull Request\uff0c\u5e76\u5408\u5e76\uff0c\u4e5f\u6709\u53ef\u80fd\u5728\u4ee3\u7801\u8bc4\u5ba1\u540e\u8981\u6c42\u4f60\u6700\u4e00\u4e9b\u4fee\u6539\u518d\u5408\u5e76\u3002\u5982\u679c\u4f60\u7684 Pull Request \u6ca1\u6709\u53ca\u65f6\u5f97\u5230\u56de\u590d\uff0c\u8bf7\u5728\u6211\u4eec\u7684\u793e\u533a\u4e2d\u63d0\u51fa\u6765\uff0c\u6211\u4eec\u4f1a\u5c3d\u5feb\u5904\u7406\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u5728\u63d0\u4ea4 Pull Request \u4e4b\u524d\uff0c\u8bf7\u68c0\u67e5\u4e00\u4e0b\u6e05\u5355\uff1a"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u57fa\u4e8e\u6b63\u786e\u7684\u5206\u652f\u5f00\u53d1"}),"\n",(0,s.jsxs)(n.li,{children:["\u6267\u884c ",(0,s.jsx)(n.code,{children:"pre-commit"})," \u5e76\u786e\u4fdd\u6ca1\u6709\u5f02\u5e38"]}),"\n",(0,s.jsx)(n.li,{children:"\u4ee3\u7801\u63d0\u4ea4\u4fe1\u606f\u9075\u5faa\u63d0\u4ea4\u89c4\u8303"}),"\n",(0,s.jsx)(n.li,{children:"\u786e\u4fdd\u6240\u6709 Github CI \u68c0\u67e5\u901a\u8fc7\uff0c\u5982\u679c\u5931\u8d25\uff0c\u8bf7\u67e5\u770b\u539f\u56e0\u5e76\u4fee\u6539\u3002"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u5728\u6240\u6709\u95ee\u9898\u90fd\u89e3\u51b3\u540e\uff0c\u53d1\u8d77 Pull Request\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u63d0\u4ea4\u4fe1\u606f\u89c4\u8303",children:"\u63d0\u4ea4\u4fe1\u606f\u89c4\u8303"}),"\n",(0,s.jsx)(n.p,{children:"\u6e05\u6670\u6613\u8bfb\u7684\u63d0\u4ea4\u4fe1\u606f\u6709\u52a9\u4e8e\u95ee\u9898\u6392\u67e5\uff0c\u4e5f\u6709\u5229\u4e8e\u81ea\u52a8\u751f\u6210 CHANGELOG\uff0c\u6240\u4ee5\u6211\u4eec\u8981\u6c42\u6240\u6709\u7684\u63d0\u4ea4\u4fe1\u606f\u90fd\u9075\u5faa\u4ee5\u4e0b\u89c4\u8303\uff1a"}),"\n",(0,s.jsx)(n.h3,{id:"\u63d0\u4ea4\u4fe1\u606f\u683c\u5f0f",children:"\u63d0\u4ea4\u4fe1\u606f\u683c\u5f0f"}),"\n",(0,s.jsx)(n.p,{children:"\u6bcf\u6761\u63d0\u4ea4\u6d88\u606f\u5747\u7531\u6807\u9898\u3001\u6b63\u6587\u548c\u9875\u811a\u7ec4\u6210\u3002\u6807\u5934\u5177\u6709\u7279\u6b8a\u683c\u5f0f\uff0c\u5305\u62ec\u7c7b\u578b\u3001\u8303\u56f4\u548c\u4e3b\u9898\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"<type>(<scope>): <subject>\n<BLANK LINE>\n<body>\n<BLANK LINE>\n<footer>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5176\u4e2d\uff0c",(0,s.jsx)(n.strong,{children:"\u6807\u9898\u662f\u5fc5\u9700\u7684\uff0c\u6b63\u6587\u548c\u9875\u811a\u662f\u53ef\u9009\u7684"}),"\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"\u63d0\u4ea4\u6d88\u606f\u7684\u4efb\u4f55\u884c\u90fd\u4e0d\u80fd\u8d85\u8fc7 100 \u4e2a\u5b57\u7b26\uff01\u8fd9\u4f7f\u5f97\u8be5\u6d88\u606f\u5728 GitHub \u4ee5\u53ca\u5404\u79cd git \u5de5\u5177\u4e2d\u66f4\u5bb9\u6613\u9605\u8bfb\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u793a\u4f8b\u63d0\u4ea4\uff1a"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"docs(changelog): update changelog to beta.5\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:"fix(release): need to depend on latest rxjs and zone.js\n\nThe version in our package.json gets copied to the one we publish, and users need the latest of these.\n"})}),"\n",(0,s.jsx)(n.h4,{id:"\u8303\u56f4scope",children:"\u8303\u56f4\uff08scope\uff09"}),"\n",(0,s.jsx)(n.p,{children:"\u8303\u56f4\u65f6\u53ef\u9009\u7684\uff0c\u7528\u4e8e\u6807\u8bc6\u63d0\u4ea4\u7684\u5f71\u54cd\u8303\u56f4\u3002\u4f8b\u5982\uff0c\u53d8\u66f4\u5185\u5bb9\u662f\u67d0\u4e2a\u6a21\u5757\uff0c\u6216\u8005\u67d0\u79cd\u7c7b\u578b\u7684\u4efb\u52a1\u7b49\u3002"}),"\n",(0,s.jsx)(n.h4,{id:"\u7c7b\u578btype",children:"\u7c7b\u578b\uff08type\uff09"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["build: \u5f71\u54cd\u6784\u5efa\u7cfb\u7edf\u6216\u5916\u90e8\u4f9d\u8d56\u7684\u66f4\u6539(\u793a\u4f8b\u8303\u56f4",":gulp","\u3001broccoli\u3001npm)"]}),"\n",(0,s.jsxs)(n.li,{children:["ci: \u66f4\u6539CI\u914d\u7f6e\u6587\u4ef6\u548c\u811a\u672c(\u793a\u4f8b\u8303\u56f4",":Travis",", Circle, BrowserStack, SauceLabs)"]}),"\n",(0,s.jsx)(n.li,{children:"docs: \u4ec5\u6587\u6863\u66f4\u6539"}),"\n",(0,s.jsx)(n.li,{children:"feat: \u65b0\u529f\u80fd"}),"\n",(0,s.jsx)(n.li,{children:"fix: \u4fee\u590dbug"}),"\n",(0,s.jsx)(n.li,{children:"perf: \u6539\u8fdb\u6027\u80fd\u7684\u4ee3\u7801\u66f4\u6539"}),"\n",(0,s.jsx)(n.li,{children:"refactor: \u4ee3\u7801\u66f4\u6539\u65e2\u4e0d\u4fee\u590d\u9519\u8bef\u4e5f\u4e0d\u6dfb\u52a0\u529f\u80fd"}),"\n",(0,s.jsx)(n.li,{children:"style: \u4e0d\u5f71\u54cd\u4ee3\u7801\u542b\u4e49\u7684\u66f4\u6539(\u7a7a\u683c\u3001\u683c\u5f0f\u3001\u7f3a\u5c11\u5206\u53f7\u7b49)"}),"\n",(0,s.jsx)(n.li,{children:"test: \u6dfb\u52a0\u7f3a\u5931\u6d4b\u8bd5\u6216\u66f4\u6b63\u73b0\u6709\u6d4b\u8bd5"}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"\u4e3b\u9898-subject",children:"\u4e3b\u9898 \uff08subject\uff09"}),"\n",(0,s.jsx)(n.p,{children:"\u8be5\u4e3b\u9898\u5305\u542b\u5bf9\u66f4\u6539\u7684\u7b80\u6d01\u63cf\u8ff0\uff1a"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u4f7f\u7528\u7948\u4f7f\u53e5\u3001\u73b0\u5728\u65f6\uff1a\u201cchange\u201d\u800c\u4e0d\u662f\u201cchanged\u201d\u6216\u201cchanges\u201d"}),"\n",(0,s.jsx)(n.li,{children:"\u4e0d\u8981\u5c06\u7b2c\u4e00\u4e2a\u5b57\u6bcd\u5927\u5199"}),"\n",(0,s.jsx)(n.li,{children:"\u672b\u5c3e\u6ca1\u6709\u70b9 (.)"}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"\u6b63\u6587body",children:"\u6b63\u6587\uff08body\uff09"}),"\n",(0,s.jsx)(n.p,{children:"\u6b63\u5982\u5728\u4e3b\u8bed\u4e2d\u4e00\u6837\uff0c\u4f7f\u7528\u7948\u4f7f\u5f0f\u3001\u73b0\u5728\u65f6\uff1a\u201cchange\u201d\u800c\u4e0d\u662f\u201cchanged\u201d\u6216\u201cchanges\u201d\u3002\u6b63\u6587\u5e94\u5305\u62ec\u6539\u53d8\u7684\u52a8\u673a\uff0c\u5e76\u5c06\u5176\u4e0e\u4ee5\u524d\u7684\u884c\u4e3a\u8fdb\u884c\u5bf9\u6bd4\u3002"}),"\n",(0,s.jsx)(n.h4,{id:"\u9875\u811afooter",children:"\u9875\u811a\uff08footer\uff09"}),"\n",(0,s.jsx)(n.p,{children:"\u9875\u811a\u5e94\u5305\u542b\u6709\u5173\u91cd\u5927\u66f4\u6539\u7684\u6240\u6709\u4fe1\u606f\uff0c\u4e5f\u662f\u5f15\u7528\u6b64\u63d0\u4ea4\u5173\u95ed\u7684GitHub \u95ee\u9898\u7684\u4f4d\u7f6e\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u91cd\u5927\u53d8\u66f4BREAKING CHANGE:\u5e94\u4ee5\u5e26\u6709\u7a7a\u683c\u6216\u4e24\u4e2a\u6362\u884c\u7b26\u7684\u5355\u8bcd\u5f00\u5934\u3002\u7136\u540e\uff0c\u63d0\u4ea4\u6d88\u606f\u7684\u5176\u4f59\u90e8\u5206\u5c06\u7528\u4e8e\u6b64\u76ee\u7684\u3002"}),"\n",(0,s.jsx)(n.p,{children:"\u8be6\u7ec6\u7684\u89e3\u91ca\u53ef\u4ee5\u5728\u8fd9\u4e2a\u6587\u6863\u4e2d\u627e\u5230\u3002"})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8453:(e,n,l)=>{l.d(n,{R:()=>r,x:()=>t});var s=l(6540);const i={},c=s.createContext(i);function r(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);