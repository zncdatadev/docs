"use strict";(self.webpackChunkkubedoop=self.webpackChunkkubedoop||[]).push([[493],{8827:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>l,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"core-concepts/resources/resource-manage","title":"\u8d44\u6e90\u7ba1\u7406","description":"Kubedoop \u901a\u8fc7 operator \u4ee5 StatefulSets \u6216\u8005 DaemonSets \u7684\u65b9\u5f0f\u90e8\u7f72\u4ea7\u54c1\u7ec4\u4ef6\u7a0b\u5e8f\u3002\u4e3a\u4e86\u6ee1\u8db3\u4e0d\u540c\u573a\u666f\u548c\u9700\u6c42\uff0c\u53ef\u4ee5\u901a\u8fc7\u8d44\u7ba1\u7ba1\u7406\u6307\u5b9a\u7a0b\u5e8f\u8fd0\u884c\u65f6\u8bf7\u6c42\u7684 CPU \u548c\u5185\u5b58\u8d44\u6e90\uff0c\u4e5f\u53ef\u4ee5\u9650\u5236\u5176\u4f7f\u7528\u4e0a\u9650\u3002","source":"@site/i18n/zh/docusaurus-plugin-content-docs/current/core-concepts/resources/resource-manage.md","sourceDirName":"core-concepts/resources","slug":"/core-concepts/resources/resource-manage","permalink":"/zh/docs/core-concepts/resources/resource-manage","draft":false,"unlisted":false,"editUrl":"https://github.com/zncdatadev/docs/docs/core-concepts/resources/resource-manage.md","tags":[],"version":"current","lastUpdatedBy":"whg517","lastUpdatedAt":1732190430000,"frontMatter":{},"sidebar":"docs","previous":{"title":"Database","permalink":"/zh/docs/core-concepts/resources/database"},"next":{"title":"S3","permalink":"/zh/docs/core-concepts/resources/s3"}}');var c=s(4848),i=s(8453);const l={},a="\u8d44\u6e90\u7ba1\u7406",d={},o=[{value:"\u540d\u8bcd\u89e3\u91ca",id:"\u540d\u8bcd\u89e3\u91ca",level:2},{value:"CPU",id:"cpu",level:3},{value:"min",id:"min",level:4},{value:"max",id:"max",level:4},{value:"\u5185\u5b58",id:"\u5185\u5b58",level:3},{value:"limit",id:"limit",level:4},{value:"\u5b58\u50a8",id:"\u5b58\u50a8",level:3},{value:"\u8d44\u6e90\u8bf7\u6c42",id:"\u8d44\u6e90\u8bf7\u6c42",level:2},{value:"CPU \u548c\u5185\u5b58",id:"cpu-\u548c\u5185\u5b58",level:3},{value:"\u5b58\u50a8\u914d\u7f6e",id:"\u5b58\u50a8\u914d\u7f6e",level:3},{value:"\u5b58\u50a8\u7d2f",id:"\u5b58\u50a8\u7d2f",level:4}];function t(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"\u8d44\u6e90\u7ba1\u7406",children:"\u8d44\u6e90\u7ba1\u7406"})}),"\n",(0,c.jsx)(n.p,{children:"Kubedoop \u901a\u8fc7 operator \u4ee5 StatefulSets \u6216\u8005 DaemonSets \u7684\u65b9\u5f0f\u90e8\u7f72\u4ea7\u54c1\u7ec4\u4ef6\u7a0b\u5e8f\u3002\u4e3a\u4e86\u6ee1\u8db3\u4e0d\u540c\u573a\u666f\u548c\u9700\u6c42\uff0c\u53ef\u4ee5\u901a\u8fc7\u8d44\u7ba1\u7ba1\u7406\u6307\u5b9a\u7a0b\u5e8f\u8fd0\u884c\u65f6\u8bf7\u6c42\u7684 CPU \u548c\u5185\u5b58\u8d44\u6e90\uff0c\u4e5f\u53ef\u4ee5\u9650\u5236\u5176\u4f7f\u7528\u4e0a\u9650\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u540d\u8bcd\u89e3\u91ca",children:"\u540d\u8bcd\u89e3\u91ca"}),"\n",(0,c.jsx)(n.p,{children:"\u8d44\u6e90\u7ba1\u7406\u662f\u5b9a\u4e49 CPU \u3001 \u5185\u5b58\uff08RAM\uff09\u3001\u5b58\u50a8\uff08storage\uff09\u4e09\u79cd\u8d44\u6e90\u7c7b\u578b\u3002"}),"\n",(0,c.jsx)(n.h3,{id:"cpu",children:"CPU"}),"\n",(0,c.jsx)(n.h4,{id:"min",children:"min"}),"\n",(0,c.jsx)(n.p,{children:"CPU \u8bf7\u6c42\u662f\u7a0b\u5e8f\u8fd0\u884c\u65f6\u8bf7\u6c42\u7684 CPU \u8d44\u6e90\u3002CPU \u8bf7\u6c42\u662f\u7a0b\u5e8f\u8fd0\u884c\u65f6\u7684\u6700\u5c0f CPU \u8d44\u6e90\u9700\u6c42\u3002\u5982\u679c\u7a0b\u5e8f\u8bf7\u6c42\u7684 CPU \u8d44\u6e90\u8d85\u8fc7\u8282\u70b9\u7684 CPU \u8d44\u6e90\uff0c\u7a0b\u5e8f\u5c06\u65e0\u6cd5\u8fd0\u884c\u3002"}),"\n",(0,c.jsx)(n.h4,{id:"max",children:"max"}),"\n",(0,c.jsx)(n.p,{children:"CPU \u9650\u5236\u662f\u7a0b\u5e8f\u8fd0\u884c\u65f6\u7684 CPU \u8d44\u6e90\u4e0a\u9650\u3002\u5982\u679c\u7a0b\u5e8f\u4f7f\u7528\u7684 CPU \u8d44\u6e90\u8d85\u8fc7\u9650\u5236\uff0c\u7a0b\u5e8f\u5c06\u88ab Kubernetes \u9650\u5236\uff0c\u4f46\u4e0d\u4f1a\u88ab\u7ec8\u6b62\u3002"}),"\n",(0,c.jsx)(n.h3,{id:"\u5185\u5b58",children:"\u5185\u5b58"}),"\n",(0,c.jsx)(n.h4,{id:"limit",children:"limit"}),"\n",(0,c.jsx)(n.p,{children:"\u5185\u5b58\u9650\u5236\u662f\u7a0b\u5e8f\u8fd0\u884c\u65f6\u7684\u5185\u5b58\u8d44\u6e90\u4e0a\u9650\u3002\u5982\u679c\u7a0b\u5e8f\u4f7f\u7528\u7684\u5185\u5b58\u8d44\u6e90\u8d85\u8fc7\u9650\u5236\uff0c\u7a0b\u5e8f\u5c06\u88ab Kubernetes \u9650\u5236\uff0c\u7a0b\u5e8f\u4f1a\u88ab\u7ec8\u6b62\u3002\u4e3a\u4e86\u907f\u514d\u7a0b\u5e8f\u88ab\u7ec8\u6b62\uff0c\u9700\u8981\u6839\u636e\u7a0b\u5e8f\u7684\u5b9e\u9645\u5185\u5b58\u4f7f\u7528\u60c5\u51b5\u8bbe\u7f6e\u5408\u7406\u7684\u5185\u5b58\u9650\u5236\u3002"}),"\n",(0,c.jsx)(n.h3,{id:"\u5b58\u50a8",children:"\u5b58\u50a8"}),"\n",(0,c.jsx)(n.p,{children:"\u5b58\u50a8\u662f\u7a0b\u5e8f\u8fd0\u884c\u65f6\u8bf7\u6c42\u7684\u5b58\u50a8\u7a7a\u95f4\u3002\u6307\u5b9a\u7684\u5b58\u50a8\u5927\u5c0f\u662f\u901a\u8fc7 PVC\uff08Persistent Volume Claim\uff09\u6765\u4e3a\u7a0b\u5e8f\u5206\u914d\u4e00\u4e2a\u6700\u5927\u53ef\u7528\u7684\u5b58\u50a8\u7a7a\u95f4\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u8d44\u6e90\u8bf7\u6c42",children:"\u8d44\u6e90\u8bf7\u6c42"}),"\n",(0,c.jsxs)(n.p,{children:["\u5728\u89d2\u8272\u548c\u89d2\u8272\u7ec4\u4e2d\uff0c\u90fd\u53ef\u4ee5\u4f7f\u7528 ",(0,c.jsx)(n.code,{children:"resource"})," \u5b9a\u4e49\u8d44\u6e90\u914d\u7f6e\u3002\u5176\u4e2d\u89d2\u8272\u7ea7\u522b\u7684\u8d44\u6e90\u914d\u7f6e\u4f1a\u8986\u76d6\u89d2\u8272\u7ec4\u7ea7\u522b\u7684\u8d44\u6e90\u914d\u7f6e\u3002\u800c\u89d2\u8272\u7ec4\u7ea7\u522b\u7684\u8d44\u6e90\u914d\u7f6e\u4f1a\u8986\u76d6\u89d2\u8272\u7ea7\u522b\u7684\u8d44\u6e90\u914d\u7f6e\u3002"]}),"\n",(0,c.jsx)(n.h3,{id:"cpu-\u548c\u5185\u5b58",children:"CPU \u548c\u5185\u5b58"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-yaml",children:'apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\n  name: hdfscluster-sample\nspec:\n  nameNode:\n    config:\n      resources:\n        cpu:\n          min: "1"\n          max: "2"\n        memory:\n          limit: "1Gi"\n    roleGroups:\n      rg-1:\n        replicas: 2\n      rg-2:\n        replicas: 2\n        config:\n          resources:\n            cpu:\n              min: "2"\n              max: "4"\n            memory:\n              limit: "2Gi"\n'})}),"\n",(0,c.jsx)(n.p,{children:"\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u5b9a\u4e49\u4e86\uff1a"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u4e00\u4e2a HDFS \u96c6\u7fa4\uff0c\u5305\u542b\u4e86 NameNode \u4e00\u4e2a\u89d2\u8272\u3002"}),"\n",(0,c.jsx)(n.li,{children:"NameNode \u6709\u4e24\u4e2a\u89d2\u8272\u7ec4\uff0crg-1 \u548c rg-2\u3002"}),"\n",(0,c.jsx)(n.li,{children:"Namenode \u89d2\u8272\u5b9a\u4e49\u6bcf\u4e2a\u5b9e\u4f8b\u7684 CPU \u6700\u5c0f 1\uff0c\u6700\u5927 2\uff0c\u5185\u5b58\u9650\u5236 1Gi\u3002"}),"\n",(0,c.jsx)(n.li,{children:"rg-1 \u89d2\u8272\u7ec4\u5305\u542b\u4e24\u4e2a\u5b9e\u4f8b\uff0c\u6bcf\u4e2a\u5b9e\u4f8b\u7684 CPU \u6700\u5c0f 1\uff0c\u6700\u5927 2\uff0c\u5185\u5b58\u9650\u5236 1Gi\u3002\u7ee7\u627f\u81ea\u89d2\u8272\u7684\u914d\u7f6e\u3002"}),"\n",(0,c.jsx)(n.li,{children:"rg-2 \u89d2\u8272\u7ec4\u5305\u542b\u4e24\u4e2a\u5b9e\u4f8b\uff0c\u6bcf\u4e2a\u5b9e\u4f8b\u7684 CPU \u6700\u5c0f 2\uff0c\u6700\u5927 4\uff0c\u5185\u5b58\u9650\u5236 2Gi\u3002\u4f7f\u7528\u89d2\u8272\u7ec4\u7684\u914d\u7f6e\uff0c\u8986\u76d6\u4e86\u89d2\u8272\u7684\u914d\u7f6e\u3002"}),"\n"]}),"\n",(0,c.jsx)(n.h3,{id:"\u5b58\u50a8\u914d\u7f6e",children:"\u5b58\u50a8\u914d\u7f6e"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-yaml",children:"apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\n  name: hdfscluster-sample\nspec:\n  nameNode:\n    config:\n      resources:\n        storage:\n          data:\n            capacity: 10Gi\n    roleGroups:\n      rg-1:\n        replicas: 2\n      rg-2:\n        replicas: 2\n        config:\n          resources:\n            storage:\n              data:\n                capacity: 20Gi\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u5728\u4e0a\u8ff0\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u5b9a\u4e49\u4e86\uff1a"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:"\u4e00\u4e2a HDFS \u96c6\u7fa4\uff0c\u5305\u542b\u4e86 NameNode \u4e00\u4e2a\u89d2\u8272\u3002"}),"\n",(0,c.jsx)(n.li,{children:"NameNode \u6709\u4e24\u4e2a\u89d2\u8272\u7ec4\uff0crg-1 \u548c rg-2\u3002"}),"\n",(0,c.jsxs)(n.li,{children:["Namenode \u89d2\u8272\u5b9a\u4e49\u6bcf\u4e2a\u5b9e\u4f8b\u7684 ",(0,c.jsx)(n.code,{children:"data"})," \u5b58\u50a8\u5bb9\u91cf 10Gi\u3002"]}),"\n",(0,c.jsxs)(n.li,{children:["rg-1 \u89d2\u8272\u7ec4\u5305\u542b\u4e24\u4e2a\u5b9e\u4f8b\uff0c\u6bcf\u4e2a\u5b9e\u4f8b\u7684 ",(0,c.jsx)(n.code,{children:"data"})," \u5b58\u50a8\u5bb9\u91cf 10Gi\u3002\u7ee7\u627f\u81ea\u89d2\u8272\u7684\u914d\u7f6e\u3002"]}),"\n",(0,c.jsxs)(n.li,{children:["rg-2 \u89d2\u8272\u7ec4\u5305\u542b\u4e24\u4e2a\u5b9e\u4f8b\uff0c\u6bcf\u4e2a\u5b9e\u4f8b\u7684 ",(0,c.jsx)(n.code,{children:"data"})," \u5b58\u50a8\u5bb9\u91cf 20Gi\u3002\u4f7f\u7528\u89d2\u8272\u7ec4\u7684\u914d\u7f6e\uff0c\u8986\u76d6\u4e86\u89d2\u8272\u7684\u914d\u7f6e\u3002"]}),"\n"]}),"\n",(0,c.jsx)(n.h4,{id:"\u5b58\u50a8\u7d2f",children:"\u5b58\u50a8\u7d2f"}),"\n",(0,c.jsx)(n.p,{children:"\u5b58\u50a8\u7684\u5e95\u5c42\u6280\u672f\u662f\u901a\u8fc7 kubernetes \u7684 StorageClass \u6765\u5b9e\u73b0\u7684\u3002\u53ef\u4ee5\u914d\u7f6e\u4e0d\u540c\u7279\u6027\u7684\u7684\u5b58\u50a8\u7c7b\uff0c\u7075\u6d3b\u7684\u4e3a\u7a0b\u5e8f\u5206\u914d\u5b58\u50a8\u7a7a\u95f4\u3002\u5982\u4f7f\u7528 SSD \u5b58\u50a8\uff0cHDD \u5b58\u50a8\uff0c\u6216\u8005 NFS \u5b58\u50a8\u7684\u5b58\u50a8\u7c7b\u3002"}),"\n",(0,c.jsxs)(n.p,{children:["\u5728 ",(0,c.jsx)(n.code,{children:"storage"})," \u4e2d StorageClass \u4e0d\u662f\u5f3a\u5236\u7684\uff0c\u5982\u679c\u6ca1\u6709\u914d\u7f6e\uff0c\u5219\u4f7f\u7528\u96c6\u7fa4\u4e2d\u9ed8\u8ba4\u7684 StorageClass \u3002"]}),"\n",(0,c.jsx)(n.p,{children:"\u914d\u7f6e\u793a\u4f8b\uff1a"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-yaml",children:"...\nresources:\n  storage:\n    data: # name of the storage\n      capacity: 4Gi\n      storageClass: ssd-storage-class\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(t,{...e})}):t(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var r=s(6540);const c={},i=r.createContext(c);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);