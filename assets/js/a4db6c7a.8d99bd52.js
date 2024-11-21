"use strict";(self.webpackChunkkubedoop=self.webpackChunkkubedoop||[]).push([[191],{2465:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"core-concepts/resources/resource-manage","title":"Resource Management","description":"datastack deploys product component programs through operator in the form of StatefulSets or DaemonSets.","source":"@site/docs/core-concepts/resources/resource-manage.md","sourceDirName":"core-concepts/resources","slug":"/core-concepts/resources/resource-manage","permalink":"/docs/core-concepts/resources/resource-manage","draft":false,"unlisted":false,"editUrl":"https://github.com/zncdatadev/docs/docs/core-concepts/resources/resource-manage.md","tags":[],"version":"current","lastUpdatedBy":"whg517","lastUpdatedAt":1732190430000,"frontMatter":{},"sidebar":"docs","previous":{"title":"Database","permalink":"/docs/core-concepts/resources/database"},"next":{"title":"S3","permalink":"/docs/core-concepts/resources/s3"}}');var s=n(4848),t=n(8453);const a={},i="Resource Management",c={},l=[{value:"Terminology",id:"terminology",level:2},{value:"CPU",id:"cpu",level:3},{value:"min",id:"min",level:4},{value:"max",id:"max",level:4},{value:"Memory",id:"memory",level:3},{value:"limit",id:"limit",level:4},{value:"Storage",id:"storage",level:3},{value:"Resource Requests",id:"resource-requests",level:2},{value:"CPU and Memory",id:"cpu-and-memory",level:3},{value:"Storage Configuration",id:"storage-configuration",level:3},{value:"Storage Class",id:"storage-class",level:4}];function d(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.header,{children:(0,s.jsx)(r.h1,{id:"resource-management",children:"Resource Management"})}),"\n",(0,s.jsx)(r.p,{children:"datastack deploys product component programs through operator in the form of StatefulSets or DaemonSets.\nTo meet different scenarios and needs, you can manage the CPU and memory resources requested by the specified program at runtime through resource management,\nand you can also limit its usage."}),"\n",(0,s.jsx)(r.h2,{id:"terminology",children:"Terminology"}),"\n",(0,s.jsx)(r.p,{children:"Resource management defines three types of resources: CPU, memory (RAM), and storage."}),"\n",(0,s.jsx)(r.h3,{id:"cpu",children:"CPU"}),"\n",(0,s.jsx)(r.h4,{id:"min",children:"min"}),"\n",(0,s.jsx)(r.p,{children:"CPU request is the CPU resource requested by the program at runtime. The CPU request is the minimum CPU resource requirement for the program to run.\nIf the CPU resources requested by the program exceed the CPU resources of the node, the program will not be able to run."}),"\n",(0,s.jsx)(r.h4,{id:"max",children:"max"}),"\n",(0,s.jsx)(r.p,{children:"CPU limit is the upper limit of CPU resources for the program at runtime. If the CPU resources used by the program exceed the limit, the program will be restricted by Kubernetes but will not be terminated."}),"\n",(0,s.jsx)(r.h3,{id:"memory",children:"Memory"}),"\n",(0,s.jsx)(r.h4,{id:"limit",children:"limit"}),"\n",(0,s.jsx)(r.p,{children:"Memory limit is the upper limit of memory resources for the program at runtime. If the memory resources used by the program exceed the limit,\nthe program will be restricted by Kubernetes and the program will be terminated. To avoid the program being terminated,\nit is necessary to set a reasonable memory limit based on the actual memory usage of the program."}),"\n",(0,s.jsx)(r.h3,{id:"storage",children:"Storage"}),"\n",(0,s.jsx)(r.p,{children:"Storage is the storage space requested by the program at runtime. The specified storage size is allocated to the program through PVC (Persistent Volume Claim) as the maximum available storage space."}),"\n",(0,s.jsx)(r.h2,{id:"resource-requests",children:"Resource Requests"}),"\n",(0,s.jsxs)(r.p,{children:["In roles and role groups, you can use ",(0,s.jsx)(r.code,{children:"resource"})," to define resource configurations. The resource configuration at the role level will override the\nresource configuration at the role group level. The resource configuration at the role group level will override the resource configuration at the role level."]}),"\n",(0,s.jsx)(r.h3,{id:"cpu-and-memory",children:"CPU and Memory"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-yaml",children:'apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\n  name: hdfscluster-sample\nspec:\n  nameNode:\n    config:\n      resources:\n        cpu:\n          min: "1"\n          max: "2"\n        memory:\n          limit: "1Gi"\n    roleGroups:\n      rg-1:\n        replicas: 2\n      rg-2:\n        replicas: 2\n        config:\n          resources:\n            cpu:\n              min: "2"\n              max: "4"\n            memory:\n              limit: "2Gi"\n'})}),"\n",(0,s.jsx)(r.p,{children:"In the above example, we defined:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"An HDFS cluster, which includes a NameNode role."}),"\n",(0,s.jsx)(r.li,{children:"The NameNode has two role groups, rg-1 and rg-2."}),"\n",(0,s.jsx)(r.li,{children:"The NameNode role defines a minimum CPU of 1, a maximum of 2, and a memory limit of 1Gi for each instance."}),"\n",(0,s.jsx)(r.li,{children:"The rg-1 role group contains two instances, each with a minimum CPU of 1, a maximum of 2, and a memory limit of 1Gi. Inherited from the role configuration."}),"\n",(0,s.jsx)(r.li,{children:"The rg-2 role group contains two instances, each with a minimum CPU of 2, a maximum of 4, and a memory limit of 2Gi. Uses the role group configuration, overriding the role configuration."}),"\n"]}),"\n",(0,s.jsx)(r.h3,{id:"storage-configuration",children:"Storage Configuration"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-yaml",children:"apiVersion: hdfs.kubedoop.dev/v1alpha1\nkind: HdfsCluster\n  name: hdfscluster-sample\nspec:\n  nameNode:\n    config:\n      resources:\n        storage:\n          data:\n            capacity: 10Gi\n    roleGroups:\n      rg-1:\n        replicas: 2\n      rg-2:\n        replicas: 2\n        config:\n          resources:\n            storage:\n              data:\n                capacity: 20Gi\n"})}),"\n",(0,s.jsx)(r.p,{children:"In the above example, we defined:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"An HDFS cluster, which includes a NameNode role."}),"\n",(0,s.jsx)(r.li,{children:"The NameNode has two role groups, rg-1 and rg-2."}),"\n",(0,s.jsxs)(r.li,{children:["The NameNode role defines a ",(0,s.jsx)(r.code,{children:"data"})," storage capacity of 10Gi for each instance."]}),"\n",(0,s.jsxs)(r.li,{children:["The rg-1 role group contains two instances, each with a ",(0,s.jsx)(r.code,{children:"data"})," storage capacity of 10Gi. Inherited from the role configuration."]}),"\n",(0,s.jsxs)(r.li,{children:["The rg-2 role group contains two instances, each with a ",(0,s.jsx)(r.code,{children:"data"})," storage capacity of 20Gi. Uses the role group configuration, overriding the role configuration."]}),"\n"]}),"\n",(0,s.jsx)(r.h4,{id:"storage-class",children:"Storage Class"}),"\n",(0,s.jsx)(r.p,{children:"The underlying technology of storage is implemented through Kubernetes' StorageClass. Different types of storage classes can be configured\nto flexibly allocate storage space for programs, such as using SSD storage, HDD storage, or NFS storage classes."}),"\n",(0,s.jsxs)(r.p,{children:["In ",(0,s.jsx)(r.code,{children:"storage"}),", StorageClass is not mandatory. If not configured, the default StorageClass in the cluster will be used."]}),"\n",(0,s.jsx)(r.p,{children:"Configuration example:"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-yaml",children:"...\nresources:\n  storage:\n    data: # name of the storage\n      capacity: 4Gi\n      storageClass: ssd-storage-class\n"})})]})}function u(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>i});var o=n(6540);const s={},t=o.createContext(s);function a(e){const r=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(t.Provider,{value:r},e.children)}}}]);