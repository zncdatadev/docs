"use strict";(self.webpackChunkzncdata_stack=self.webpackChunkzncdata_stack||[]).push([[446],{9720:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var s=a(5893),n=a(1151);const r={},i="\u5feb\u901f\u5f00\u59cb",c={id:"quick-start/installation",title:"\u5feb\u901f\u5f00\u59cb",description:"datastack \u662f\u4e00\u4e2a\u57fa\u4e8e Kubernetes \u7684\u6570\u636e\u5e73\u53f0\uff0c\u5b83\u63d0\u4f9b\u4e86\u4e00\u5957\u5b8c\u6574\u7684\u6570\u636e\u5904\u7406\u5de5\u5177\uff0c\u5305\u62ec\u6570\u636e\u91c7\u96c6\u3001\u6570\u636e\u5b58\u50a8\u3001\u6570\u636e\u5904\u7406\u3001\u6570\u636e\u5206\u6790\u7b49\u529f\u80fd\u3002datastack \u901a\u8fc7 Operator \u7684\u65b9\u5f0f\u90e8\u7f72\u5728 Kubernetes \u96c6\u7fa4\u4e2d\uff0c\u7528\u6237\u53ef\u4ee5\u901a\u8fc7\u7b80\u5355\u7684\u914d\u7f6e\u6587\u4ef6\u6765\u90e8\u7f72\u548c\u7ba1\u7406\u6570\u636e\u5904\u7406\u4efb\u52a1\u3002",source:"@site/docs/quick-start/installation.md",sourceDirName:"quick-start",slug:"/quick-start/installation",permalink:"/docs/quick-start/installation",draft:!1,unlisted:!1,editUrl:"https://github.com/zncdata-labs/docs/docs/quick-start/installation.md",tags:[],version:"current",lastUpdatedBy:"whg517",lastUpdatedAt:1713164336,formattedLastUpdatedAt:"2024\u5e744\u670815\u65e5",frontMatter:{},sidebar:"docs",previous:{title:"\u4ecb\u7ecd",permalink:"/docs/"},next:{title:"\u9ad8\u7ea7\uff1a \u914d\u7f6e\u8986\u76d6",permalink:"/docs/core-concepts/common-configuration-mechanisms/overrides"}},l={},o=[{value:"\u73af\u5883\u51c6\u5907",id:"\u73af\u5883\u51c6\u5907",level:2},{value:"\u5b89\u88c5 OLM",id:"\u5b89\u88c5-olm",level:2},{value:"\u5b89\u88c5 hive-operator",id:"\u5b89\u88c5-hive-operator",level:2},{value:"\u521b\u5efa\u547d\u540d\u7a7a\u95f4",id:"\u521b\u5efa\u547d\u540d\u7a7a\u95f4",level:2},{value:"\u90e8\u7f72\u4e00\u4e2a Hive \u96c6\u7fa4",id:"\u90e8\u7f72\u4e00\u4e2a-hive-\u96c6\u7fa4",level:2},{value:"\u67e5\u770b Hive Metastore",id:"\u67e5\u770b-hive-metastore",level:2},{value:"\u6e05\u7406\u8d44\u6e90",id:"\u6e05\u7406\u8d44\u6e90",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"\u5feb\u901f\u5f00\u59cb",children:"\u5feb\u901f\u5f00\u59cb"}),"\n",(0,s.jsx)(t.p,{children:"datastack \u662f\u4e00\u4e2a\u57fa\u4e8e Kubernetes \u7684\u6570\u636e\u5e73\u53f0\uff0c\u5b83\u63d0\u4f9b\u4e86\u4e00\u5957\u5b8c\u6574\u7684\u6570\u636e\u5904\u7406\u5de5\u5177\uff0c\u5305\u62ec\u6570\u636e\u91c7\u96c6\u3001\u6570\u636e\u5b58\u50a8\u3001\u6570\u636e\u5904\u7406\u3001\u6570\u636e\u5206\u6790\u7b49\u529f\u80fd\u3002datastack \u901a\u8fc7 Operator \u7684\u65b9\u5f0f\u90e8\u7f72\u5728 Kubernetes \u96c6\u7fa4\u4e2d\uff0c\u7528\u6237\u53ef\u4ee5\u901a\u8fc7\u7b80\u5355\u7684\u914d\u7f6e\u6587\u4ef6\u6765\u90e8\u7f72\u548c\u7ba1\u7406\u6570\u636e\u5904\u7406\u4efb\u52a1\u3002"}),"\n",(0,s.jsx)(t.p,{children:"\u5728\u8fd9\u7bc7\u5feb\u901f\u5f00\u59cb\u4e2d\uff0c\u6211\u4eec\u4ee5 datastack \u7684 hive-operator \u4e3a\u4f8b\uff0c\u4ecb\u7ecd\u5982\u4f55\u5728 Kubernetes \u96c6\u7fa4\u4e2d\u90e8\u7f72\u4e00\u4e2a Hive Metastore\u3002"}),"\n",(0,s.jsx)(t.h2,{id:"\u73af\u5883\u51c6\u5907",children:"\u73af\u5883\u51c6\u5907"}),"\n",(0,s.jsx)(t.p,{children:"\u8981\u5f00\u59cb\u4f7f\u7528 datastack \uff0c\u9700\u8981\u6ee1\u8db3\u4e00\u4e0b\u6761\u4ef6\uff1a"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["\u5b89\u88c5 ",(0,s.jsx)(t.a,{href:"https://kubernetes.io/docs/tasks/tools/#kubectl",children:"kubectl"})]}),"\n",(0,s.jsx)(t.li,{children:"\u51c6\u5907\u4e00\u4e2a Kubernetes \u96c6\u7fa4"}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"\u5b89\u88c5-olm",children:"\u5b89\u88c5 OLM"}),"\n",(0,s.jsx)(t.p,{children:"datastack \u4f9d\u8d56\u4e8e Operator Lifecycle Manager (OLM) \u6765\u7ba1\u7406 Operator\u3002\u5982\u679c\u4f60\u7684\u96c6\u7fa4\u4e2d\u6ca1\u6709\u5b89\u88c5 OLM\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5b89\u88c5\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.25.0/install.sh | bash -s v0.25.0\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\u5b89\u88c5-hive-operator",children:"\u5b89\u88c5 hive-operator"}),"\n",(0,s.jsxs)(t.p,{children:["OLM \u901a\u8fc7 ",(0,s.jsx)(t.a,{href:"https://olm.operatorframework.io/docs/concepts/subscriptions/",children:"Subscription"})," \u6765\u7ba1\u7406 Operator \u7684\u5b89\u88c5\u3002\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u521b\u5efa\u4e00\u4e2a Subscription \u6765\u5b89\u88c5 hive-metastore-operator\uff1a"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:"kubectl apply -f https://raw.githubusercontent.com/zncdata-labs/kubedatastack/main/examples/hive/olm-subscriptions.yaml\n"})}),"\n",(0,s.jsx)(t.p,{children:"\u9a8c\u8bc1 operator \u7684 pod \u662f\u5426\u6b63\u5e38\u8fd0\u884c\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl get pods -n operator\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\u521b\u5efa\u547d\u540d\u7a7a\u95f4",children:"\u521b\u5efa\u547d\u540d\u7a7a\u95f4"}),"\n",(0,s.jsx)(t.p,{children:"\u521b\u5efa\u4e00\u4e2a hive \u7684\u547d\u540d\u7a7a\u95f4\uff0c\u7528\u4e8e\u90e8\u7f72 hive \u96c6\u7fa4\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl create ns hive\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\u90e8\u7f72\u4e00\u4e2a-hive-\u96c6\u7fa4",children:"\u90e8\u7f72\u4e00\u4e2a Hive \u96c6\u7fa4"}),"\n",(0,s.jsx)(t.p,{children:"Hive \u96c6\u7fa4\u662f\u901a\u8fc7 hive-operator \u6765\u7ba1\u7406\u7684\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u521b\u5efa\u4e00\u4e2a HiveCluster \u5bf9\u8c61\u6765\u90e8\u7f72\u4e00\u4e2a Hive Metastore\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-yaml",children:"kubectl apply -f https://raw.githubusercontent.com/zncdata-labs/kubedatastack/main/examples/hive/hive-metastore.yaml\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\u67e5\u770b-hive-metastore",children:"\u67e5\u770b Hive Metastore"}),"\n",(0,s.jsx)(t.p,{children:"Hive \u96c6\u7fa4\u90e8\u7f72\u5b8c\u6210\u540e\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u6765\u8bbf\u95ee Hive Metastore\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl exec -it hive-metastore-0 -n hive -- bash\n"})}),"\n",(0,s.jsx)(t.h2,{id:"\u6e05\u7406\u8d44\u6e90",children:"\u6e05\u7406\u8d44\u6e90"}),"\n",(0,s.jsx)(t.p,{children:"\u8fd0\u884c\u4e0b\u9762\u547d\u4ee4\uff0c\u6e05\u7406 hive \u96c6\u7fa4\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl delete -f https://raw.githubusercontent.com/zncdata-labs/kubedatastack/main/examples/hive/hive-cluster.yaml\n"})}),"\n",(0,s.jsx)(t.p,{children:"\u8fd0\u884c\u4e0b\u9762\u547d\u4ee4\uff0c\u6e05\u7406 operator\uff1a"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"kubectl delete -f https://raw.githubusercontent.com/zncdata-labs/kubedatastack/main/examples/hive/olm-subscriptions.yaml\n"})})]})}function h(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,t,a)=>{a.d(t,{Z:()=>c,a:()=>i});var s=a(7294);const n={},r=s.createContext(n);function i(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);