"use strict";(self.webpackChunkkubedoop=self.webpackChunkkubedoop||[]).push([[917],{8517:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"quick-start/installation","title":"Quick Start","description":"In this quick start, we will use Kubedoop\'s hive-operator as an example to show how to deploy a Hive Metastore in a Kubernetes cluster.","source":"@site/docs/quick-start/installation.md","sourceDirName":"quick-start","slug":"/quick-start/installation","permalink":"/docs/quick-start/installation","draft":false,"unlisted":false,"editUrl":"https://github.com/zncdatadev/docs/docs/quick-start/installation.md","tags":[],"version":"current","lastUpdatedBy":"whg517","lastUpdatedAt":1732264107000,"frontMatter":{},"sidebar":"docs","previous":{"title":"Introduction","permalink":"/docs/"},"next":{"title":"Advanced: Configuration Overrides","permalink":"/docs/core-concepts/common-configuration-mechanisms/overrides"}}');var n=s(4848),r=s(8453);const l={},i="Quick Start",o={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Install OLM",id:"install-olm",level:2},{value:"Install hive-operator",id:"install-hive-operator",level:2},{value:"Create Namespace",id:"create-namespace",level:2},{value:"Deploy a Hive Cluster",id:"deploy-a-hive-cluster",level:2},{value:"Access Hive Metastore",id:"access-hive-metastore",level:2},{value:"Clean Up Resources",id:"clean-up-resources",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"quick-start",children:"Quick Start"})}),"\n",(0,n.jsx)(t.p,{children:"In this quick start, we will use Kubedoop's hive-operator as an example to show how to deploy a Hive Metastore in a Kubernetes cluster."}),"\n",(0,n.jsx)(t.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,n.jsx)(t.p,{children:"To start using Kubedoop, you need to meet the following requirements:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Install ",(0,n.jsx)(t.a,{href:"https://kubernetes.io/docs/tasks/tools/#kubectl",children:"kubectl"})]}),"\n",(0,n.jsx)(t.li,{children:"Prepare a Kubernetes cluster"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"install-olm",children:"Install OLM"}),"\n",(0,n.jsx)(t.p,{children:"Kubedoop relies on the Operator Lifecycle Manager (OLM) to manage Operators. If OLM is not installed in your cluster, you can install it with the following command:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/v0.25.0/install.sh | bash -s v0.25.0\n"})}),"\n",(0,n.jsx)(t.h2,{id:"install-hive-operator",children:"Install hive-operator"}),"\n",(0,n.jsxs)(t.p,{children:["OLM manages the installation of Operators through ",(0,n.jsx)(t.a,{href:"https://olm.operatorframework.io/docs/concepts/subscriptions/",children:"Subscription"}),". We can install the hive-metastore-operator by creating a Subscription:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:"kubectl apply -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/olm-subscriptions.yaml\n"})}),"\n",(0,n.jsx)(t.p,{children:"Verify that the operator's pod is running normally:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"kubectl get pods -n operator\n"})}),"\n",(0,n.jsx)(t.h2,{id:"create-namespace",children:"Create Namespace"}),"\n",(0,n.jsx)(t.p,{children:"Create a namespace for hive to deploy the hive cluster:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"kubectl create ns hive\n"})}),"\n",(0,n.jsx)(t.h2,{id:"deploy-a-hive-cluster",children:"Deploy a Hive Cluster"}),"\n",(0,n.jsx)(t.p,{children:"The Hive cluster is managed by the hive-operator. We can deploy a Hive Metastore by creating a HiveCluster object:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",children:"kubectl apply -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/hive-metastore.yaml\n"})}),"\n",(0,n.jsx)(t.h2,{id:"access-hive-metastore",children:"Access Hive Metastore"}),"\n",(0,n.jsx)(t.p,{children:"After the Hive cluster is deployed, we can access the Hive Metastore with the following command:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"kubectl exec -it hive-metastore-0 -n hive -- bash\n"})}),"\n",(0,n.jsx)(t.h2,{id:"clean-up-resources",children:"Clean Up Resources"}),"\n",(0,n.jsx)(t.p,{children:"Run the following command to clean up the hive cluster:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"kubectl delete -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/hive-cluster.yaml\n"})}),"\n",(0,n.jsx)(t.p,{children:"Run the following command to clean up the operator:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"kubectl delete -f https://raw.githubusercontent.com/kubedoop.dev/kubedatastack/main/examples/hive/olm-subscriptions.yaml\n"})})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>l,x:()=>i});var a=s(6540);const n={},r=a.createContext(n);function l(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);