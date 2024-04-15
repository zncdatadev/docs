"use strict";(self.webpackChunkzncdata_stack=self.webpackChunkzncdata_stack||[]).push([[602],{7917:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>t,toc:()=>d});var o=r(5893),a=r(1151);const s={},i="operator-sdk",t={id:"reference/operator-sdk",title:"operator-sdk",description:"operator-sdk \u662f\u6784\u5efa kubernetes \u6269\u5c55\u7684\u7684\u547d\u4ee4\u884c\u5de5\u5177\u3002",source:"@site/docs/reference/operator-sdk.md",sourceDirName:"reference",slug:"/reference/operator-sdk",permalink:"/docs/reference/operator-sdk",draft:!1,unlisted:!1,editUrl:"https://github.com/zncdata-labs/docs/docs/reference/operator-sdk.md",tags:[],version:"current",lastUpdatedBy:"whg517",lastUpdatedAt:1713164336,formattedLastUpdatedAt:"2024\u5e744\u670815\u65e5",frontMatter:{},sidebar:"docs",previous:{title:"\u7b2c\u4e00\u6b21\u8d21\u732e",permalink:"/docs/developer-manual/first-commiter"},next:{title:"OPM",permalink:"/docs/reference/opm"}},l={},d=[{value:"\u57fa\u672c\u547d\u4ee4",id:"\u57fa\u672c\u547d\u4ee4",level:2},{value:"operator-sdk init",id:"operator-sdk-init",level:3},{value:"operator-sdk create api",id:"operator-sdk-create-api",level:3}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"operator-sdk",children:"operator-sdk"}),"\n",(0,o.jsx)(n.p,{children:"operator-sdk \u662f\u6784\u5efa kubernetes \u6269\u5c55\u7684\u7684\u547d\u4ee4\u884c\u5de5\u5177\u3002"}),"\n",(0,o.jsx)(n.h2,{id:"\u57fa\u672c\u547d\u4ee4",children:"\u57fa\u672c\u547d\u4ee4"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"operator-sdk [flags]\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u8f93\u51fa\uff1a"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-text",children:'CLI tool for building Kubernetes extensions and tools.\n\nUsage:\n  operator-sdk [flags]\n  operator-sdk [command]\n\nExamples:\nThe first step is to initialize your project:\n    operator-sdk init [--plugins=<PLUGIN KEYS> [--project-version=<PROJECT VERSION>]]\n\n<PLUGIN KEYS> is a comma-separated list of plugin keys from the following table\nand <PROJECT VERSION> a supported project version for these plugins.\n\n                                   Plugin keys | Supported project versions\n-----------------------------------------------+----------------------------\n           ansible.sdk.operatorframework.io/v1 |                          3\n              declarative.go.kubebuilder.io/v1 |                       2, 3\n       deploy-image.go.kubebuilder.io/v1-alpha |                          3\n                          go.kubebuilder.io/v2 |                       2, 3\n                          go.kubebuilder.io/v3 |                          3\n                          go.kubebuilder.io/v4 |                          3\n               grafana.kubebuilder.io/v1-alpha |                          3\n              helm.sdk.operatorframework.io/v1 |                          3\n hybrid.helm.sdk.operatorframework.io/v1-alpha |                          3\n           quarkus.javaoperatorsdk.io/v1-alpha |                          3\n\nFor more specific help for the init command of a certain plugins and project version\nconfiguration please run:\n    operator-sdk init --help --plugins=<PLUGIN KEYS> [--project-version=<PROJECT VERSION>]\n\nDefault plugin keys: "go.kubebuilder.io/v4"\nDefault project version: "3"\n\n\nAvailable Commands:\n  alpha            Alpha-stage subcommands\n  bundle           Manage operator bundle metadata\n  cleanup          Clean up an Operator deployed with the \'run\' subcommand\n  completion       Load completions for the specified shell\n  create           Scaffold a Kubernetes API or webhook\n  edit             Update the project configuration\n  generate         Invokes a specific generator\n  help             Help about any command\n  init             Initialize a new project\n  olm              Manage the Operator Lifecycle Manager installation in your cluster\n  pkgman-to-bundle Migrates packagemanifests to bundles\n  run              Run an Operator in a variety of environments\n  scorecard        Runs scorecard\n  version          Print the operator-sdk version\n\nFlags:\n  -h, --help                     help for operator-sdk\n      --plugins strings          plugin keys to be used for this subcommand execution\n      --project-version string   project version (default "3")\n      --verbose                  Enable verbose logging\n\nUse "operator-sdk [command] --help" for more information about a command.\n'})}),"\n",(0,o.jsx)(n.h3,{id:"operator-sdk-init",children:"operator-sdk init"}),"\n",(0,o.jsx)(n.p,{children:"\u8fd9\u662f\u4e00\u4e2a\u521d\u59cb\u5316 operator \u9879\u76ee\u7684\u811a\u624b\u67b6\u547d\u4ee4\uff0c\u4f1a\u521b\u5efa\u4e00\u4e2a\u5b8c\u6574 operator \u9879\u76ee\u7ed3\u6784\uff0c\u5e76\u5305\u542b\u4e00\u4e9b\u9ed8\u8ba4\u7684\u914d\u7f6e\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"operator-sdk init [flags]\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u793a\u4f8b\uff1a"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'# \u521b\u5efa\u4e00\u4e2a operator \u9879\u76ee\uff0c\u4f7f\u7528 go.kubebuilder.io/v4 \u63d2\u4ef6\noperator-sdk init --domain example.org --owner "john" --repo "github.com/john/example-operator" --plugins go/v4\n'})}),"\n",(0,o.jsx)(n.p,{children:"\u9879\u76ee\u5305\u542b\u5982\u4e0b\u5185\u5bb9\uff1a"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"Dockerfile"}),"\uff1a\u7528\u4e8e\u6784\u5efa operator \u955c\u50cf\u7684 Dockerfile"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"Makefile"}),"\uff1a\u7528\u4e8e\u6784\u5efa\u3001\u90e8\u7f72 operator \u7684 Makefile"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"PROJECT"}),": \u9879\u76ee\u914d\u7f6e\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"README.md"}),": \u9879\u76ee\u8bf4\u660e\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"go.mod"}),": \u9879\u76ee\u4f9d\u8d56\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"cmd/main.go"}),": \u8fd0\u884c\u63a7\u5236\u5668\u7684\u4e3b\u5165\u53e3\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"config/"}),": \u4e00\u4e9b\u4e0e\u9879\u76ee\u90e8\u7f72\u76f8\u5173\u7684 yaml \u8d44\u6e90\u6587\u4ef6"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"operator-sdk-create-api",children:"operator-sdk create api"}),"\n",(0,o.jsx)(n.p,{children:"\u8fd9\u662f\u4e00\u4e2a\u521b\u5efa kubernetes API \u7684\u811a\u624b\u67b6\u547d\u4ee4\u3002\u6267\u884c\u547d\u4ee4\u4f1a\u521b\u5efa\u4e00\u4e2a\u65b0\u7684 kubernetes API \uff0c\u5e76\u751f\u6210\u76f8\u5e94\u7684\u4ee3\u7801\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# \u521b\u5efa\u4e00\u4e2a\u65b0\u7684 kubernetes API \uff0c\u6307\u5b9a\u7c7b\u578b\u4e3a Memcached \uff0c\u5e76\u751f\u6210\u8d44\u6e90\u548c\u63a7\u5236\u5668\u4ee3\u7801\noperator-sdk create api --version v1alpha1 --kind Memcached --resource --controller\n\n# \u751f\u6210 API \u5b9a\u4e49\u76f8\u5173\u4ee3\u7801\nmake generate\n\n# \u751f\u6210 API \u7684 CRD \u8d44\u6e90\u6587\u4ef6\nmake manifests\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u751f\u6210\u5982\u4e0b\u5185\u5bb9\uff1a"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"api/"}),": \u751f\u6210 API \u8d44\u6e90\u5b9a\u4e49\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"internal/"}),": \u751f\u6210\u63a7\u5236\u5668\u4ee3\u7801"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"config/crd"}),": \u751f\u6210 CRD \u8d44\u6e90\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"config/samples"}),": \u751f\u6210 CRD \u793a\u4f8b\u6587\u4ef6"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"config/rbac"}),": \u751f\u6210\u8d44\u6e90\u7684 RBAC \u89c4\u5219\u6587\u4ef6\u3002"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>t,a:()=>i});var o=r(7294);const a={},s=o.createContext(a);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);