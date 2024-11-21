"use strict";(self.webpackChunkkubedoop=self.webpackChunkkubedoop||[]).push([[488],{5768:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>i,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>t});const o=JSON.parse('{"id":"core-concepts/common-configuration-mechanisms/overrides","title":"\u9ad8\u7ea7\uff1a \u914d\u7f6e\u8986\u76d6","description":"\u4e3a\u4e86 Kubedoop \u4e2d\u6240\u6709\u4ea7\u54c1\u80fd\u5feb\u901f\u5b89\u5168\u7684\u8fd0\u884c\uff0c\u6240\u6709\u4ea7\u54c1\u90fd\u63d0\u4f9b\u4e86\u76f8\u5e94\u7684\u9ed8\u8ba4\u914d\u7f6e\u3002\u4f46\u662f\uff0c\u6709\u65f6\u5019\u4f60\u53ef\u80fd\u9700\u8981\u8986\u76d6\u8fd9\u4e9b\u9ed8\u8ba4\u914d\u7f6e\u3002\u8fd9\u4e2a\u6587\u6863\u5c06\u4f1a\u4ecb\u7ecd\u5982\u4f55\u8986\u76d6 Kubedoop \u4e2d\u7684\u914d\u7f6e\u3002","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/core-concepts/common-configuration-mechanisms/overrides.md","sourceDirName":"core-concepts/common-configuration-mechanisms","slug":"/core-concepts/common-configuration-mechanisms/overrides","permalink":"/zh/docs/core-concepts/common-configuration-mechanisms/overrides","draft":false,"unlisted":false,"editUrl":"https://github.com/zncdatadev/docs/docs/core-concepts/common-configuration-mechanisms/overrides.md","tags":[],"version":"current","lastUpdatedBy":"whg517","lastUpdatedAt":1732190430000,"frontMatter":{},"sidebar":"docs","previous":{"title":"\u5feb\u901f\u5f00\u59cb","permalink":"/zh/docs/quick-start/installation"},"next":{"title":"\u89d2\u8272\u548c\u89d2\u8272\u7ec4","permalink":"/zh/docs/core-concepts/common-configuration-mechanisms/roles-and-role-groups"}}');var r=s(4848),d=s(8453);const a={},c="\u9ad8\u7ea7\uff1a \u914d\u7f6e\u8986\u76d6",i={},t=[{value:"\u914d\u7f6e\u8986\u76d6",id:"\u914d\u7f6e\u8986\u76d6",level:2},{value:"\u73af\u5883\u53d8\u91cf\u8986\u76d6",id:"\u73af\u5883\u53d8\u91cf\u8986\u76d6",level:2},{value:"\u547d\u4ee4\u884c\u53c2\u6570\u8986\u76d6",id:"\u547d\u4ee4\u884c\u53c2\u6570\u8986\u76d6",level:2},{value:"pod \u6a21\u677f\u8986\u76d6",id:"pod-\u6a21\u677f\u8986\u76d6",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"\u9ad8\u7ea7-\u914d\u7f6e\u8986\u76d6",children:"\u9ad8\u7ea7\uff1a \u914d\u7f6e\u8986\u76d6"})}),"\n",(0,r.jsx)(n.p,{children:"\u4e3a\u4e86 Kubedoop \u4e2d\u6240\u6709\u4ea7\u54c1\u80fd\u5feb\u901f\u5b89\u5168\u7684\u8fd0\u884c\uff0c\u6240\u6709\u4ea7\u54c1\u90fd\u63d0\u4f9b\u4e86\u76f8\u5e94\u7684\u9ed8\u8ba4\u914d\u7f6e\u3002\u4f46\u662f\uff0c\u6709\u65f6\u5019\u4f60\u53ef\u80fd\u9700\u8981\u8986\u76d6\u8fd9\u4e9b\u9ed8\u8ba4\u914d\u7f6e\u3002\u8fd9\u4e2a\u6587\u6863\u5c06\u4f1a\u4ecb\u7ecd\u5982\u4f55\u8986\u76d6 Kubedoop \u4e2d\u7684\u914d\u7f6e\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u6240\u6709\u4ea7\u54c1\u90fd\u652f\u6301\u8986\u76d6\u673a\u5236\uff0c\u4ee5\u63d0\u4f9b\u7b80\u5355\u7075\u6d3b\u7684\u65b9\u5f0f\u66f4\u6539\u7a0b\u5e8f\u914d\u7f6e\uff0c\u73af\u5883\u53d8\u91cf\u548c operator \u914d\u7f6e\u3002"}),"\n",(0,r.jsx)(n.h2,{id:"\u914d\u7f6e\u8986\u76d6",children:"\u914d\u7f6e\u8986\u76d6"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u89d2\u8272\u548c\u89d2\u8272\u7ec4\u4e2d\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"configOverrides"})," \u5b57\u6bb5\u8986\u76d6\u9ed8\u8ba4\u914d\u7f6e\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\nmetadata:\n  labels:\n    app.kubernetes.io/name: hdfscluster\n    app.kubernetes.io/instance: hdfscluster-sample\n    app.kubernetes.io/part-of: hdfs-operator\n    app.kubernetes.io/managed-by: kustomize\n    app.kubernetes.io/created-by: hdfs-operator\n  name: hdfscluster-sample\nspec:\n  image:\n    repository: qury.io/zncdatadev/hadoop\n    tag: 3.3.4\n  clusterConfig:\n    zookeeperDiscoveryZNode: sample-hdfs\n  nameNode:\n    configOverrides:\n      hdfs-site.xml:\n        fs.trash.interval: "5"\n    roleGroups:\n      default:\n        replicas: 2\n        configOverrides:\n          hdfs-site.xml:\n            dfs.namenode.num.checkpoints.retained: "3"\n'})}),"\n",(0,r.jsx)(n.p,{children:"\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u5b9a\u4e49\u4e86\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["namenode \u7684 ",(0,r.jsx)(n.code,{children:"hdfs-site.xml"})," \u914d\u7f6e\u8986\u76d6\u4e86 ",(0,r.jsx)(n.code,{children:"fs.trash.interval"})," \u4e3a 5\u3002"]}),"\n",(0,r.jsxs)(n.li,{children:["namenode \u7684\u89d2\u8272\u7ec4 ",(0,r.jsx)(n.code,{children:"default"})," \u7684 ",(0,r.jsx)(n.code,{children:"hdfs-site.xml"})," \u914d\u7f6e\u8986\u76d6\u4e86 ",(0,r.jsx)(n.code,{children:"dfs.namenode.num.checkpoints.retained"})," \u4e3a 3\u3002"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u73af\u5883\u53d8\u91cf\u8986\u76d6",children:"\u73af\u5883\u53d8\u91cf\u8986\u76d6"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u89d2\u8272\u548c\u89d2\u8272\u7ec4\u4e2d\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"envOverrides"})," \u5b57\u6bb5\u8986\u76d6\u9ed8\u8ba4\u73af\u5883\u53d8\u91cf\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\nmetadata:\n  labels:\n    app.kubernetes.io/name: hdfscluster\n    app.kubernetes.io/instance: hdfscluster-sample\n    app.kubernetes.io/part-of: hdfs-operator\n    app.kubernetes.io/managed-by: kustomize\n    app.kubernetes.io/created-by: hdfs-operator\n  name: hdfscluster-sample\nspec:\n  image:\n    repository: qury.io/zncdatadev/hadoop\n    tag: 3.3.4\n  clusterConfig:\n    zookeeperDiscoveryZNode: sample-hdfs\n  nameNode:\n    configOverrides:\n      hdfs-site.xml:\n        fs.trash.interval: "5"\n    roleGroups:\n      default:\n        replicas: 2\n        envOverrides:\n          FOO: "bar"\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u901a\u8fc7\u5728 namenode \u7684\u89d2\u8272\u7ec4 ",(0,r.jsx)(n.code,{children:"default"})," \u4e2d\u6dfb\u52a0 ",(0,r.jsx)(n.code,{children:"envOverrides"})," \u5b57\u6bb5\uff0c\u6211\u4eec\u5c06\u73af\u5883\u53d8\u91cf ",(0,r.jsx)(n.code,{children:"FOO"})," \u7684\u503c\u8986\u76d6\u4e3a ",(0,r.jsx)(n.code,{children:"bar"}),"\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"\u547d\u4ee4\u884c\u53c2\u6570\u8986\u76d6",children:"\u547d\u4ee4\u884c\u53c2\u6570\u8986\u76d6"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u89d2\u8272\u548c\u89d2\u8272\u7ec4\u4e2d\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"commandOverrides"})," \u5b57\u6bb5\u8986\u76d6\u9ed8\u8ba4\u547d\u4ee4\u884c\u53c2\u6570\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\nmetadata:\n  labels:\n    app.kubernetes.io/name: hdfscluster\n    app.kubernetes.io/instance: hdfscluster-sample\n    app.kubernetes.io/part-of: hdfs-operator\n    app.kubernetes.io/managed-by: kustomize\n    app.kubernetes.io/created-by: hdfs-operator\n  name: hdfscluster-sample\nspec:\n  image:\n    repository: qury.io/zncdata/hadoop\n    tag: 3.3.4\n  clusterConfig:\n    zookeeperDiscoveryZNode: sample-hdfs\n  nameNode:\n    roleGroups:\n      default:\n        replicas: 2\n        commandOverrides:\n          - "-Dfoo=bar"\n'})}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u901a\u8fc7\u5728 namenode \u7684\u89d2\u8272\u7ec4 ",(0,r.jsx)(n.code,{children:"default"})," \u4e2d\u6dfb\u52a0 ",(0,r.jsx)(n.code,{children:"commandOverrides"})," \u5b57\u6bb5\uff0c\u6211\u4eec\u5c06\u547d\u4ee4\u884c\u53c2\u6570 ",(0,r.jsx)(n.code,{children:"-Dfoo=bar"})," \u6dfb\u52a0\u5230 namenode \u7684\u542f\u52a8\u547d\u4ee4\u4e2d\u3002"]}),"\n",(0,r.jsx)(n.h2,{id:"pod-\u6a21\u677f\u8986\u76d6",children:"pod \u6a21\u677f\u8986\u76d6"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u89d2\u8272\u548c\u89d2\u8272\u7ec4\u4e2d\uff0c\u53ef\u4ee5\u4f7f\u7528 ",(0,r.jsx)(n.code,{children:"podTemplateOverrides"})," \u5b57\u6bb5\u8986\u76d6\u9ed8\u8ba4 pod \u6a21\u677f\u3002"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\nmetadata:\n  labels:\n    app.kubernetes.io/name: hdfscluster\n    app.kubernetes.io/instance: hdfscluster-sample\n    app.kubernetes.io/part-of: hdfs-operator\n    app.kubernetes.io/managed-by: kustomize\n    app.kubernetes.io/created-by: hdfs-operator\n  name: hdfscluster-sample\nspec:\n  image:\n    repository: qury.io/zncdatadev/hadoop\n    tag: 3.3.4\n  clusterConfig:\n    zookeeperDiscoveryZNode: sample-hdfs\n  nameNode:\n    podOverrides:\n      spec:\n        tolerations:\n          - key: "key"\n            operator: "Equal"\n            value: "value"\n            effect: "NoSchedule"\n    roleGroups:\n      default:\n        replicas: 2\n        podOverrides:\n          metadata:\n            labels:\n              foo: bar\n'})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"podOverrides"})," \u662f\u901a\u8fc7 ",(0,r.jsx)(n.code,{children:"PodTemplateSpec"})," \u6765\u8986\u76d6\u9ed8\u8ba4 pod \u6a21\u677f\u7684\u5b57\u6bb5\u3002\u5408\u6cd5\u7684 ",(0,r.jsx)(n.code,{children:"PodTemplateSpec"})," \u914d\u7f6e\u90fd\u53ef\u4ee5\u5728 ",(0,r.jsx)(n.code,{children:"podOverrides"})," \u4e2d\u4f7f\u7528\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u4e3a namenode \u89d2\u8272\u589e\u52a0\u4e86 ",(0,r.jsx)(n.code,{children:"tolerations"})," \uff0c\u6240\u6709 namenode \u7684\u89d2\u8272\u7ec4\u90fd\u4f1a\u7ee7\u627f\u8fd9\u4e2a ",(0,r.jsx)(n.code,{children:"tolerations"}),"\u3002\u540c\u65f6\uff0c\u4e3a namenode \u7684\u89d2\u8272\u7ec4 ",(0,r.jsx)(n.code,{children:"default"})," \u6dfb\u52a0\u4e86 ",(0,r.jsx)(n.code,{children:"metadata.labels"})," \u5b57\u6bb5\uff0c\u6240\u6709 namenode \u7684\u89d2\u8272\u7ec4\u90fd\u4f1a\u7ee7\u627f\u8fd9\u4e2a ",(0,r.jsx)(n.code,{children:"metadata.labels"}),"\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"pod \u7684\u914d\u7f6e\u8986\u76d6\u7ea7\u522b\u5982\u4e0b(\u7531\u4f4e\u5230\u9ad8)\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"operator \u751f\u6210\u7684 PodTemplateSpec"}),"\n",(0,r.jsx)(n.li,{children:"\u89d2\u8272\u7ea7\u522b\u7684 PodTemplateSpec"}),"\n",(0,r.jsx)(n.li,{children:"\u89d2\u8272\u7ec4\u7ea7\u522b\u7684 PodTemplateSpec"}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>c});var o=s(6540);const r={},d=o.createContext(r);function a(e){const n=o.useContext(d);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(d.Provider,{value:n},e.children)}}}]);